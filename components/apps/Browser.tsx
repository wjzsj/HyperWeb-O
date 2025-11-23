import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Search, X } from 'lucide-react';

const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://m.bilibili.com'); // Defaulting to a site that often allows embedding or is popular in CN
  const [inputUrl, setInputUrl] = useState('https://m.bilibili.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);
    let target = inputUrl;
    if (!target.startsWith('http')) {
      target = `https://${target}`;
    }
    setUrl(target);
    // Simple mock loading delay
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="px-4 py-2 bg-[#f0f0f0] flex items-center gap-2 border-b border-gray-300">
        <div className="flex gap-4 text-gray-600">
            <ArrowLeft size={20} />
            <ArrowRight size={20} className="opacity-50" />
            <RotateCcw size={20} onClick={handleNavigate} className="cursor-pointer" />
        </div>
        <form onSubmit={handleNavigate} className="flex-1">
            <div className="bg-[#e0e0e0] rounded-full px-4 py-1.5 flex items-center gap-2 text-sm">
                {isLoading ? <X size={14} className="animate-spin" /> : <Search size={14} className="text-gray-500" />}
                <input 
                    type="text" 
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-gray-800"
                    placeholder="搜索或输入网址"
                />
            </div>
        </form>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative bg-gray-100 overflow-hidden">
        {isLoading && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse z-10"></div>
        )}
        <iframe 
            src={url} 
            className="w-full h-full border-0"
            title="Browser Content"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onError={() => alert('无法加载此页面 (可能是由于跨域限制)')}
        />
        
        {/* Helper overlay for iframe limitations */}
        <div className="absolute bottom-0 w-full bg-yellow-100 p-2 text-xs text-yellow-800 text-center opacity-80 pointer-events-none">
            注意：由于浏览器安全策略(CORS/X-Frame-Options)，部分网站(如Google/Baidu)无法在模拟器中加载。
        </div>
      </div>
    </div>
  );
};

export default Browser;