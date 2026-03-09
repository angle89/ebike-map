'use client'

import { useState, useEffect, useCallback } from 'react'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

const STATUS_OPTIONS = ['使用中', '充电中']

const STATUS_STYLE: Record<string, string> = {
  '使用中': 'bg-blue-100 text-blue-700',
  '充电中': 'bg-orange-100 text-orange-700',
}

type Bike = {
  id: number
  user_name: string
  location: string
  status: string
  update_time: string
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

async function fetchAll(): Promise<Bike[]> {
  const res = await fetch(
    `${URL}/rest/v1/bikes?select=*&order=update_time.desc`,
    { headers: { apikey: KEY!, Authorization: `Bearer ${KEY}` } }
  )
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

async function upsertBike(data: { user_name: string; location: string; status: string }) {
  const res = await fetch(`${URL}/rest/v1/bikes?on_conflict=user_name`, {
    method: 'POST',
    headers: {
      apikey: KEY!,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify({ ...data, update_time: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error(await res.text())
}

export default function BikesPage() {
  const [bikes, setBikes] = useState<Bike[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [userName, setUserName] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState(STATUS_OPTIONS[0])

  const load = useCallback(async () => {
    try {
      const data = await fetchAll()
      setBikes(data)
    } catch (e: unknown) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const timer = setInterval(load, 15000)
    return () => clearInterval(timer)
  }, [load])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!userName.trim()) { setError('请填写使用人姓名'); return }
    if (!location.trim()) { setError('请填写停车地点'); return }

    setSubmitting(true)
    try {
      await upsertBike({ user_name: userName.trim(), location: location.trim(), status })
      setSuccess(`✅ 已提交：${userName.trim()} — ${location.trim()} — ${status}`)
      setUserName('')
      setLocation('')
      setStatus(STATUS_OPTIONS[0])
      await load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      setError('提交失败：' + msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto space-y-6">

        {/* 标题 */}
        <h1 className="text-2xl font-bold text-center text-gray-800 pt-4">
          🚲 电动车停车登记
        </h1>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">使用人</label>
            <input
              type="text"
              placeholder="请输入您的姓名"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 text-base focus:outline-none focus:border-blue-500 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">停车地点</label>
            <input
              type="text"
              placeholder="例如：南门旁 / 北楼门口"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 text-base focus:outline-none focus:border-blue-500 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">停车状态</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 text-base focus:outline-none focus:border-blue-500 bg-gray-50"
            >
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg">{success}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-xl text-base transition-colors"
          >
            {submitting ? '提交中…' : '提交'}
          </button>
        </form>

        {/* 记录列表 */}
        <div className="bg-white rounded-2xl shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-700">📋 当前停车记录</h2>
            <button
              onClick={load}
              className="text-sm text-blue-500 border border-blue-300 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              刷新
            </button>
          </div>

          {loading ? (
            <p className="text-gray-400 text-center py-6">加载中…</p>
          ) : bikes.length === 0 ? (
            <p className="text-gray-400 text-center py-6">暂无记录</p>
          ) : (
            <ul className="space-y-3">
              {bikes.map(bike => (
                <li key={bike.id} className="flex items-center justify-between gap-2 py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <span className="font-semibold text-gray-800">{bike.user_name}</span>
                    <span className="text-gray-400 mx-1">·</span>
                    <span className="text-gray-600 text-sm">{bike.location}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_STYLE[bike.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {bike.status}
                    </span>
                    <span className="text-xs text-gray-400">{formatTime(bike.update_time)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
