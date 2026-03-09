"use client"; // 这一行必须是文件的第一行

import React, { useState } from "react"; // 导入 useState Hook

// VideoCard 组件：用于展示单个视频推荐
// 接收视频数据作为 props
function VideoCard({ thumbnail, title, description, videoUrl }) {
  return (
    // 视频卡片容器，使用 Tailwind CSS 样式
    // 响应式宽度，圆角，阴影，以及悬停效果
    <div
      className="
      bg-white rounded-xl shadow-md overflow-hidden 
      transform transition-transform duration-200 hover:scale-105 hover:shadow-lg
      cursor-pointer
      flex flex-col
    "
    >
      {/* 视频缩略图 */}
      {/* 使用 placeholder.co 提供占位图，实际应用中替换为真实视频缩略图 */}
      {/* 调整缩略图高度为 h-40，在所有屏幕尺寸上保持一致，使其更紧凑 */}
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-40 overflow-hidden"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          // 错误处理：如果图片加载失败，显示一个简单的背景色
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400/E0E0E0/A0A0A0?text=Video";
            e.currentTarget.alt = "Placeholder Video Thumbnail";
          }}
        />
      </a>

      {/* 视频信息区域 */}
      {/* 保持 p-4 的内边距，但文字大小调整后整体会更小 */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        {/* 视频标题 */}
        {/* 调整标题字体大小为 text-lg，使其更小 */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {title}
          </a>
        </h3>
        {/* 视频描述 */}
        {/* 描述字体大小保持 text-sm，确保可读性 */}
        <p className="text-gray-600 text-sm flex-grow mb-3">{description}</p>
      </div>
    </div>
  );
}

// App 组件：主应用容器
export default function App() {
  // 模拟的默认视频推荐数据，共10篇
  const defaultRecommendedVideos = [
    {
      id: 1,
      thumbnail: "https://placehold.co/600x400/FFDDC1/FF8C00?text=AI+推荐+1",
      title: "AI 推荐算法的奥秘",
      description:
        "深入浅出地解析现代智能推荐系统的工作原理，带你了解背后的逻辑。",
      videoUrl: "https://www.youtube.com/results?search_query=AI+推荐算法", // 替换为实际视频链接或搜索链接
    },
    {
      id: 2,
      thumbnail: "https://placehold.co/600x400/C1FFDD/008000?text=机器学习+2",
      title: "机器学习：从入门到实践",
      description:
        "本视频将引导你从零开始学习机器学习基础，并通过案例进行实践。",
      videoUrl: "https://www.youtube.com/results?search_query=机器学习入门",
    },
    {
      id: 3,
      thumbnail: "https://placehold.co/600x400/D1C1FF/8A2BE2?text=数据科学+3",
      title: "数据科学在视频分析中的应用",
      description: "探索数据科学如何帮助我们理解视频内容和用户行为，优化推荐。",
      videoUrl: "https://www.youtube.com/results?search_query=数据科学视频分析",
    },
    {
      id: 4,
      thumbnail: "https://placehold.co/600x400/FFC1C1/FF0000?text=智能体+4",
      title: "AI 智能体：构建你的专属助手",
      description: "手把手教你如何设计和实现一个能够智能推荐的 AI 代理。",
      videoUrl: "https://www.youtube.com/results?search_query=AI智能体构建",
    },
    {
      id: 5,
      thumbnail: "https://placehold.co/600x400/C1E1FF/0000FF?text=未来科技+5",
      title: "未来科技趋势：AI 与媒体融合",
      description: "展望人工智能与媒体行业结合的未来，以及视频推荐的演变。",
      videoUrl: "https://www.youtube.com/results?search_query=AI媒体融合",
    },
    {
      id: 6,
      thumbnail: "https://placehold.co/600x400/FFFFC1/FFA500?text=算法+6",
      title: "推荐算法的伦理与挑战",
      description: "探讨推荐算法在社会中的影响，以及如何应对潜在的偏见和挑战。",
      videoUrl: "https://www.youtube.com/results?search_query=推荐算法伦理",
    },
    {
      id: 7,
      thumbnail: "https://placehold.co/600x400/D0E0D0/4CAF50?text=深度学习+7",
      title: "深度学习在计算机视觉中的突破",
      description: "了解卷积神经网络如何识别和理解图像与视频内容。",
      videoUrl:
        "https://www.youtube.com/results?search_query=深度学习计算机视觉",
    },
    {
      id: 8,
      thumbnail: "https://placehold.co/600x400/E0D0E0/800080?text=自然语言+8",
      title: "自然语言处理与视频字幕分析",
      description: "探索 NLP 技术如何从视频字幕中提取信息并用于推荐。",
      videoUrl: "https://www.youtube.com/results?search_query=NLP视频字幕",
    },
    {
      id: 9,
      thumbnail: "https://placehold.co/600x400/D0E0E0/607D8B?text=云计算+9",
      title: "云计算在视频存储和分发中的作用",
      description: "了解云服务如何支持大规模视频内容的存储、处理和高效分发。",
      videoUrl: "https://www.youtube.com/results?search_query=云计算视频存储",
    },
    {
      id: 10,
      thumbnail: "https://placehold.co/600x400/E0F0F0/00BCD4?text=用户体验+10",
      title: "优化视频推荐的用户体验",
      description:
        "从用户角度出发，探讨如何设计更直观、更个性化的视频推荐界面。",
      videoUrl: "https://www.youtube.com/results?search_query=视频推荐用户体验",
    },
  ];

  // 状态管理
  const [userQuery, setUserQuery] = useState(""); // 用户输入的查询
  const [llmRecommendations, setLlmRecommendations] = useState([]); // LLM 返回的推荐视频
  const [isLoading, setIsLoading] = useState(false); // 加载状态
  const [errorMessage, setErrorMessage] = useState(""); // 错误信息

  // 根据是否有 LLM 推荐来决定显示哪个视频列表
  const displayedVideos =
    llmRecommendations.length > 0
      ? llmRecommendations
      : defaultRecommendedVideos;

  // 每页显示的视频数量
  const videosPerPage = 6;
  // 当前页码状态，默认为第一页
  const [currentPage, setCurrentPage] = useState(1);

  // 计算总页数 (基于当前显示的视频列表)
  const totalPages = Math.ceil(displayedVideos.length / videosPerPage);

  // 计算当前页视频的起始和结束索引
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  // 获取当前页的视频数据
  const currentVideos = displayedVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  // 处理“上一页”点击事件
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  // 处理“下一页”点击事件
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  // 处理用户输入变化
  const handleQueryChange = (e) => {
    setUserQuery(e.target.value);
    setErrorMessage(""); // 清除错误信息
  };

  // 处理获取推荐按钮点击事件
  const handleAskRecommendations = async () => {
    if (!userQuery.trim()) {
      setErrorMessage("请输入您的推荐需求！");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setLlmRecommendations([]); // 清空之前的 LLM 推荐

    try {
      const prompt = `根据用户的请求: '${userQuery}'，提供 6 个视频推荐。每个推荐包括 'title' (字符串) 和 'description' (字符串)。只返回一个包含这些对象的 JSON 数组。`;

      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = {
        contents: chatHistory,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                description: { type: "STRING" },
              },
              propertyOrdering: ["title", "description"],
            },
          },
        },
      };

      // 注意：apiKey 留空，Canvas 会自动提供
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.statusText}`);
      }

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const jsonString = result.candidates[0].content.parts[0].text;
        const parsedJson = JSON.parse(jsonString);

        // 为 LLM 推荐的视频添加 ID 和占位符图片/链接
        const formattedRecommendations = parsedJson.map((rec, index) => ({
          id: `llm-${index + 1}`, // 确保 ID 唯一
          thumbnail: `https://placehold.co/600x400/D3D3D3/696969?text=${encodeURIComponent(
            rec.title.substring(0, 10)
          )}`, // 基于标题的占位图
          title: rec.title,
          description: rec.description,
          videoUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(
            rec.title
          )}`, // 默认搜索链接
        }));
        setLlmRecommendations(formattedRecommendations);
        setCurrentPage(1); // LLM 推荐后重置到第一页
      } else {
        setErrorMessage("未能从大模型获取有效的推荐。请重试。");
      }
    } catch (error) {
      console.error("获取推荐时发生错误:", error);
      setErrorMessage(`获取推荐失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 整体页面容器，设置最小高度，背景色，居中显示
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* 网站标题和副标题 */}
      <header className="text-center mb-10 mt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          AI 智能视频推荐
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-3">
          为您精选的最新内容
        </p>
      </header>

      {/* 询问式推荐输入区域 */}
      <div className="w-full max-w-xl mb-8 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          告诉我你感兴趣的内容
        </h2>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-4 text-gray-700"
          rows="3"
          placeholder="例如：关于人工智能最新进展的视频，或者关于健康饮食的科普视频..."
          value={userQuery}
          onChange={handleQueryChange}
          disabled={isLoading}
        ></textarea>
        {errorMessage && (
          <p className="text-red-600 text-sm mb-3">{errorMessage}</p>
        )}
        <button
          onClick={handleAskRecommendations}
          disabled={isLoading}
          className={`
            w-full px-6 py-3 rounded-full font-semibold text-lg
            transition-colors duration-200
            ${
              isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
            flex items-center justify-center
          `}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              获取中...
            </>
          ) : (
            "获取推荐"
          )}
        </button>
      </div>

      {/* 视频推荐网格区域 */}
      {/* 使用 CSS Grid 实现响应式布局：小屏幕单列，中等屏幕两列，大屏幕三列 */}
      <main className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {currentVideos.length > 0 ? (
          currentVideos.map((video) => (
            <VideoCard
              key={video.id} // 唯一的 key 属性，React 列表渲染所需
              thumbnail={video.thumbnail}
              title={video.title}
              description={video.description}
              videoUrl={video.videoUrl}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">
            {isLoading
              ? "正在加载推荐..."
              : "暂无推荐视频，请输入您的需求以获取推荐。"}
          </div>
        )}
      </main>

      {/* 翻页控制区域 */}
      {displayedVideos.length > videosPerPage && ( // 只有当视频数量超过一页时才显示翻页
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1 || isLoading} // 第一页或加载中时禁用
            className={`
              px-6 py-3 rounded-full font-semibold text-lg
              transition-colors duration-200
              ${
                currentPage === 1 || isLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            上一页
          </button>
          <span className="text-lg font-medium text-gray-700">
            第 {currentPage} 页 / 共 {totalPages} 页
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || isLoading} // 最后一页或加载中时禁用
            className={`
              px-6 py-3 rounded-full font-semibold text-lg
              transition-colors duration-200
              ${
                currentPage === totalPages || isLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }
            `}
          >
            下一页
          </button>
        </div>
      )}

      {/* 页面底部版权信息 */}
      <footer className="mt-16 mb-8 text-center text-gray-500 text-sm">
        &copy; 2025 您的网站名称. All rights reserved.
      </footer>
    </div>
  );
}
