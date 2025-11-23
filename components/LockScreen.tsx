import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

interface Props {
  onUnlock: () => void;
}

const LockScreen: React.FC<Props> = ({ onUnlock }) => {
  const [date, setDate] = useState(new Date());
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    if (e.movementY < 0) {
        setOffsetY(prev => Math.min(0, prev + e.movementY));
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (offsetY < -150) {
      onUnlock();
    } else {
      setOffsetY(0);
    }
  };

  return (
    <div 
      className="absolute inset-0 z-50 flex flex-col items-center pt-32 pb-10 text-white backdrop-blur-none transition-transform duration-300 ease-out select-none touch-none"
      style={{ transform: `translateY(${offsetY}px)`, backgroundColor: 'rgba(0,0,0,0.2)' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div className="flex flex-col items-center drop-shadow-lg">
        <div className="text-8xl font-thin tracking-tighter">
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="text-xl font-medium mt-2">
          {date.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="flex-1"></div>

      <div className="flex flex-col items-center gap-4 opacity-80 animate-pulse">
        <Lock size={20} />
        <span className="text-sm font-medium">上滑解锁</span>
      </div>
      
      <div className="w-1/3 h-1 bg-white rounded-full mt-8 opacity-50"></div>
    </div>
  );
};

export default LockScreen;