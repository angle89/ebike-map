# 🚲 电动车停车登记系统

一个简单的电动车停车状态登记 Web 应用，支持多人实时共享停车信息，适配手机端使用。

## 功能

- 填写使用人姓名、停车地点、停车状态（使用中 / 充电中）
- 提交后实时显示所有人的停车记录
- 同名用户提交会自动更新记录（不重复）
- 每 15 秒自动刷新列表
- 移动端友好

## 在线访问

👉 https://ebike-map-0.vercel.app/bikes

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | Next.js 15 + React 19 |
| 样式 | Tailwind CSS |
| 数据库 | Supabase (PostgreSQL) |
| 部署 | Vercel |

## 数据库结构

Supabase 中的 `bikes` 表：

```sql
create table bikes (
  id          bigserial primary key,
  user_name   text unique not null,
  location    text not null,
  status      text not null,
  update_time timestamptz default now()
);
```

## 本地开发

1. 克隆仓库

```bash
git clone https://github.com/angle89/ebike-map-0.git
cd ebike-map-0
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量，新建 `.env.local`：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_KEY=your-anon-key
```

4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000/bikes

## 部署

项目已连接 Vercel，推送到 `main` 分支后自动部署。  
需在 Vercel 项目的 **Settings → Environment Variables** 中配置上述两个环境变量。
