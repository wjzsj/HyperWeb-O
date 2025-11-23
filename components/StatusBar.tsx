import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

const StatusBar: React.FC = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 w-full flex justify-between items-center px-4 text-white text-xs font-medium z-50 fixed top-0 left-0 bg-transparent backdrop-blur-[1px]">
      <div className="flex-1">
        <span>{time}</span>
      </div>
      
      {/* Dynamic Island / Camera Notch Simulation */}
      <div className="w-24 h-5 bg-black rounded-b-xl absolute left-1/2 -translate-x-1/2 top-0"></div>

      <div className="flex items-center gap-2 flex-1 justify-end">
        <Signal size={12} />
        <Wifi size={12} />
        <Battery size={14} />
      </div>
    </div>
  );
};

export default StatusBar;