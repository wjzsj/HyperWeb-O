import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { AppConfig, SystemState } from '../types';

interface Props {
  isOpen: boolean;
  openApps: string[];
  appsConfig: AppConfig[];
  onAppSelect: (appId: string) => void;
  onAppClose: (appId: string) => void;
  onClearAll: () => void;
}

const Recents: React.FC<Props> = ({ isOpen, openApps, appsConfig, onAppSelect, onAppClose, onClearAll }) => {
  if (!isOpen) return null;

  const runningApps = openApps.map(id => appsConfig.find(app => app.id === id)).filter(Boolean) as AppConfig[];

  return (
    <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xl flex flex-col animate-in fade-in duration-200">
      <div className="flex-1 flex gap-6 overflow-x-auto p-8 items-center snap-x snap-mandatory no-scrollbar">
        {runningApps.length === 0 ? (
          <div className="w-full text-center text-gray-400">
            <p className="text-xl">暂无最近使用的应用</p>
          </div>
        ) : (
          runningApps.map((app) => (
            <div 
              key={app.id} 
              className="relative group shrink-0 w-64 h-96 bg-gray-800 rounded-3xl overflow-hidden shadow-2xl snap-center transition-transform active:scale-95 border border-white/10 flex flex-col"
              onClick={() => onAppSelect(app.id)}
            >
              {/* App Header */}
              <div className="p-4 bg-gray-900 flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${app.color}`}>
                  <app.icon size={16} className="text-white" />
                </div>
                <span className="text-white font-medium">{app.name}</span>
              </div>
              
              {/* App Preview Mock */}
              <div className="flex-1 bg-gray-700 flex items-center justify-center relative">
                 <app.icon size={64} className="text-white/20" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Close Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); onAppClose(app.id); }}
                className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Clear All Button */}
      {runningApps.length > 0 && (
        <div className="h-24 flex items-center justify-center">
          <button 
            onClick={onClearAll}
            className="px-6 py-3 bg-gray-800 rounded-full flex items-center gap-2 text-white hover:bg-red-900/80 transition-colors"
          >
            <Trash2 size={18} />
            <span>清除全部</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Recents;
