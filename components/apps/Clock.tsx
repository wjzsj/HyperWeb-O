import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'clock' | 'stopwatch'>('clock');
  
  // Stopwatch state
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (swRunning) {
      interval = setInterval(() => setSwTime(prev => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [swRunning]);

  const formatSw = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {activeTab === 'clock' ? (
          <>
            <div className="text-6xl font-light tracking-wider">
               {time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
            <div className="text-gray-400 mt-2 text-xl">
               {time.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
            </div>
            <div className="mt-12 text-center text-gray-500">
                <p>北京时间</p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="text-6xl font-variant-numeric tabular-nums font-light mb-12">
                {formatSw(swTime)}
            </div>
            <div className="flex gap-8 w-full justify-center">
                <button 
                    onClick={() => {setSwRunning(false); setSwTime(0);}}
                    className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center active:bg-gray-700"
                >
                    <RotateCcw size={24} />
                </button>
                <button 
                    onClick={() => setSwRunning(!swRunning)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center active:opacity-80 ${swRunning ? 'bg-red-900/50 text-red-500' : 'bg-green-900/50 text-green-500'}`}
                >
                    {swRunning ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div className="h-20 bg-gray-900/50 flex justify-around items-center pb-4 text-sm">
        <div 
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'clock' ? 'text-orange-400' : 'text-gray-500'}`}
            onClick={() => setActiveTab('clock')}
        >
            <span className="text-xl">CLOCK</span>
            <span>时钟</span>
        </div>
        <div 
            className={`flex flex-col items-center gap-1 cursor-pointer ${activeTab === 'stopwatch' ? 'text-orange-400' : 'text-gray-500'}`}
            onClick={() => setActiveTab('stopwatch')}
        >
            <span className="text-xl">⏱</span>
            <span>秒表</span>
        </div>
      </div>
    </div>
  );
};

export default Clock;