import React from 'react';
import { Download, Check, Search } from 'lucide-react';
import { SystemState } from '../../types';
import { APPS } from '../../constants';

interface Props {
  systemState: SystemState;
  setSystemState: React.Dispatch<React.SetStateAction<SystemState>>;
}

const AppMarket: React.FC<Props> = ({ systemState, setSystemState }) => {
  const isInstalled = (id: string) => systemState.installedAppIds.includes(id);

  const handleInstall = (id: string) => {
    if (!isInstalled(id)) {
      setSystemState(prev => ({
        ...prev,
        installedAppIds: [...prev.installedAppIds, id]
      }));
    }
  };

  return (
    <div className="h-full bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <div className="p-4 pt-6 bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-black text-blue-600 tracking-tight">App Store</h1>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
        <div className="bg-gray-100 rounded-xl p-2.5 flex items-center gap-2 text-gray-500">
            <Search size={18} />
            <span className="text-sm">搜索应用...</span>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="p-4 pb-0">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/30">
            <h2 className="text-xl font-bold mb-1">本周推荐</h2>
            <p className="text-blue-100 text-sm mb-4">探索无限可能</p>
            <button className="bg-white text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold">查看详情</button>
        </div>
      </div>

      {/* App List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h3 className="font-bold text-lg px-1">热门应用</h3>
        
        {APPS.filter(app => app.id !== 'appstore' && app.id !== 'themestore' && app.id !== 'settings').map((app) => (
          <div key={app.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className={`w-14 h-14 rounded-xl ${app.color} flex items-center justify-center text-white shadow-sm shrink-0`}>
              <app.icon size={28} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-slate-800 truncate">{app.name}</h4>
              <p className="text-xs text-slate-500 truncate">{app.category || '效率工具'}</p>
            </div>

            <button 
              onClick={() => handleInstall(app.id)}
              disabled={isInstalled(app.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all
                ${isInstalled(app.id) 
                  ? 'bg-gray-100 text-gray-400 cursor-default' 
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200 active:scale-95'}`}
            >
              {isInstalled(app.id) ? '已安装' : '获取'}
            </button>
          </div>
        ))}
        
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default AppMarket;
