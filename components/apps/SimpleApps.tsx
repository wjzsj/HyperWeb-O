import React from 'react';
import { CloudRain, Music, Calendar as CalendarIcon, Play, SkipForward, SkipBack } from 'lucide-react';

// --- Weather App ---
export const WeatherApp: React.FC = () => (
  <div className="h-full bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 flex flex-col items-center justify-between">
    <div className="w-full text-center mt-10">
      <h2 className="text-2xl font-light">北京市</h2>
      <div className="flex flex-col items-center mt-8">
        <CloudRain size={80} className="mb-4 text-white/90" />
        <h1 className="text-8xl font-thin ml-4">24°</h1>
        <p className="text-xl mt-2 font-medium">多云转小雨</p>
      </div>
    </div>
    
    <div className="w-full bg-white/20 backdrop-blur-md rounded-3xl p-6 mb-10">
      <div className="flex justify-between text-sm opacity-90 mb-4">
        <span>周一</span>
        <span>周二</span>
        <span>周三</span>
        <span>周四</span>
        <span>周五</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>22°</span>
        <span>25°</span>
        <span>21°</span>
        <span>19°</span>
        <span>23°</span>
      </div>
    </div>
  </div>
);

// --- Music App ---
export const MusicApp: React.FC = () => (
  <div className="h-full bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
    <div className="p-6 pt-12">
      <h1 className="text-3xl font-bold">音乐</h1>
    </div>
    
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="w-64 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 flex items-center justify-center">
        <Music size={64} className="text-white/50" />
      </div>
      
      <div className="w-full mb-8">
        <h2 className="text-2xl font-bold truncate">Dreaming of WebOS</h2>
        <p className="text-gray-400">HyperBand</p>
      </div>
      
      <div className="w-full bg-gray-800 h-1 rounded-full mb-8 overflow-hidden">
        <div className="w-1/3 h-full bg-white"></div>
      </div>
      
      <div className="flex items-center justify-between w-full px-4">
        <SkipBack size={32} />
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black">
          <Play size={28} fill="black" className="ml-1"/>
        </div>
        <SkipForward size={32} />
      </div>
    </div>
  </div>
);

// --- Calendar App ---
export const CalendarApp: React.FC = () => {
  const days = Array.from({length: 30}, (_, i) => i + 1);
  return (
    <div className="h-full bg-white text-black flex flex-col">
      <div className="p-4 pt-8 border-b">
        <h2 className="text-red-500 font-bold text-xl">2024年</h2>
        <h1 className="text-4xl font-bold">5月</h1>
      </div>
      
      <div className="grid grid-cols-7 gap-y-8 p-4 pt-6 text-center">
        {['日','一','二','三','四','五','六'].map(d => (
          <div key={d} className="text-gray-400 text-xs font-medium">{d}</div>
        ))}
        {days.map(d => (
          <div key={d} className={`h-10 w-10 flex items-center justify-center rounded-full text-lg
            ${d === 20 ? 'bg-red-500 text-white font-bold' : ''}
          `}>
            {d}
          </div>
        ))}
      </div>
      
      <div className="mt-auto p-6 bg-gray-50 m-4 rounded-2xl">
        <h3 className="font-bold text-lg mb-2">今日日程</h3>
        <div className="flex items-center gap-3 py-2">
            <div className="w-1 h-10 bg-blue-500 rounded-full"></div>
            <div>
                <p className="font-medium">WebOS 发布会</p>
                <p className="text-sm text-gray-500">10:00 - 11:30</p>
            </div>
        </div>
      </div>
    </div>
  );
};
