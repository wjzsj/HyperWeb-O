import React from 'react';
import { Wifi, Bluetooth, Zap, Moon, Sun, Volume2 } from 'lucide-react';
import { SystemState } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  state: SystemState;
  setState: React.Dispatch<React.SetStateAction<SystemState>>;
}

const ControlCenter: React.FC<Props> = ({ isOpen, onClose, state, setState }) => {
  if (!isOpen) return null;

  const toggle = (key: keyof SystemState) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="absolute inset-0 z-40" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div 
        className="absolute top-4 right-4 left-4 bg-gray-900/90 backdrop-blur-2xl rounded-3xl p-4 shadow-2xl border border-white/10 flex flex-col gap-4 animate-in slide-in-from-top-10 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#2c2c2e] rounded-2xl p-4 flex flex-col justify-between h-32">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${state.wifi ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'}`} onClick={() => toggle('wifi')}>
                <Wifi size={20} />
            </div>
            <span className="text-white font-medium">无线网络</span>
          </div>
          <div className="bg-[#2c2c2e] rounded-2xl p-4 flex flex-col justify-between h-32">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${state.bluetooth ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-400'}`} onClick={() => toggle('bluetooth')}>
                <Bluetooth size={20} />
            </div>
            <span className="text-white font-medium">蓝牙</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
             <div className="aspect-square bg-[#2c2c2e] rounded-2xl flex items-center justify-center" onClick={() => toggle('flashlight')}>
                <Zap className={state.flashlight ? "text-yellow-400 fill-current" : "text-white"} />
             </div>
             <div className="aspect-square bg-[#2c2c2e] rounded-2xl flex items-center justify-center">
                <Moon className="text-white" />
             </div>
             <div className="col-span-2 bg-[#2c2c2e] rounded-2xl flex items-center px-4 gap-3">
                <Sun size={20} className="text-gray-400" />
                <input type="range" className="w-full accent-white h-1 bg-gray-600 rounded-full appearance-none" />
             </div>
        </div>

        <div className="bg-[#2c2c2e] rounded-2xl p-4 flex items-center gap-3">
             <Volume2 size={24} className="text-gray-400" />
             <input type="range" className="w-full accent-white h-1 bg-gray-600 rounded-full appearance-none" />
        </div>
      </div>
    </div>
  );
};

export default ControlCenter;