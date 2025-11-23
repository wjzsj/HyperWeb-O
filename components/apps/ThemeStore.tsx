import React from 'react';
import { Check, Palette, Image as ImageIcon } from 'lucide-react';
import { SystemState } from '../../types';
import { WALLPAPERS } from '../../constants';

interface Props {
  systemState: SystemState;
  setSystemState: React.Dispatch<React.SetStateAction<SystemState>>;
}

const ThemeStore: React.FC<Props> = ({ systemState, setSystemState }) => {
  const currentWpIndex = systemState.wallpaperIndex;

  const handleApply = (index: number) => {
    setSystemState(prev => ({
      ...prev,
      wallpaperIndex: index
    }));
  };

  // Helper to get a preview color/style from the tailwind class string
  const getPreviewStyle = (twClass: string) => {
    if (twClass.includes('url')) return { backgroundImage: twClass.match(/url\("([^"]+)"\)/)?.[1] ? `url("${twClass.match(/url\("([^"]+)"\)/)?.[1]}")` : undefined, backgroundSize: 'cover' };
    
    // Simple color extraction for gradient classes
    if (twClass.includes('from-blue')) return { background: 'linear-gradient(to bottom right, #1e3a8a, #000)' };
    if (twClass.includes('from-emerald')) return { background: 'linear-gradient(to top right, #064e3b, #000)' };
    if (twClass.includes('from-rose')) return { background: 'linear-gradient(to bottom left, #881337, #000)' };
    if (twClass.includes('bg-black')) return { backgroundColor: '#000' };
    
    return { background: '#333' };
  };

  return (
    <div className="h-full bg-white text-slate-900 flex flex-col">
      <div className="p-6 pb-2">
        <h1 className="text-3xl font-light mb-1">主题商店</h1>
        <p className="text-gray-400 text-sm">个性化你的设备</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
                <Palette size={20} className="text-purple-600" />
                <h2 className="font-bold text-lg">推荐壁纸</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {WALLPAPERS.map((wp, idx) => (
                    <div 
                        key={idx} 
                        className="flex flex-col gap-2 group cursor-pointer"
                        onClick={() => handleApply(idx)}
                    >
                        <div 
                            className="aspect-[9/16] rounded-2xl shadow-md border-4 border-transparent group-hover:border-purple-500 transition-all overflow-hidden relative"
                            style={getPreviewStyle(wp)}
                        >
                            {/* Inner Preview Content */}
                            {wp.includes('url') && <img src={wp.match(/url\("([^"]+)"\)/)?.[1]} alt="preview" className="w-full h-full object-cover" />}
                            
                            {/* Current Active Indicator */}
                            {currentWpIndex === idx && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="bg-white rounded-full p-2">
                                        <Check size={20} className="text-purple-600" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className="text-sm font-medium text-center text-gray-600">
                            {idx === 0 ? "深空蓝" : idx === 1 ? "翡翠绿" : idx === 2 ? "玫瑰红" : idx === 3 ? "自然风光" : "纯黑极致"}
                        </span>
                    </div>
                ))}
            </div>
        </section>

        <div className="p-4 bg-gray-100 rounded-xl text-center mb-8">
             <p className="text-gray-500 text-sm">更多主题敬请期待...</p>
        </div>
        
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default ThemeStore;
