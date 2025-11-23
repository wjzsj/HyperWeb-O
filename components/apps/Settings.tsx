import React from 'react';
import { Wifi, Bluetooth, Battery, Smartphone, Moon, Sun, Monitor, Bell, Info } from 'lucide-react';
import { SystemState } from '../../types';

interface SettingsProps {
  systemState: SystemState;
  setSystemState: React.Dispatch<React.SetStateAction<SystemState>>;
}

const Settings: React.FC<SettingsProps> = ({ systemState, setSystemState }) => {
  const toggleWifi = () => setSystemState(prev => ({ ...prev, wifi: !prev.wifi }));
  const toggleBluetooth = () => setSystemState(prev => ({ ...prev, bluetooth: !prev.bluetooth }));

  const SettingItem = ({ icon: Icon, label, value, onClick, color }: any) => (
    <div onClick={onClick} className="flex items-center justify-between p-4 bg-white/5 active:bg-white/10 transition-colors cursor-pointer border-b border-white/5 last:border-0">
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${color}`}>
            <Icon size={20} className="text-white" />
        </div>
        <span className="text-lg">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        {value}
      </div>
    </div>
  );

  return (
    <div className="h-full bg-black text-white overflow-y-auto pb-10">
      <div className="p-6 pb-2">
        <h1 className="text-4xl font-thin mb-6">设置</h1>
        
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 mb-8 flex items-center gap-4 shadow-lg shadow-blue-900/20">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                HW
            </div>
            <div>
                <h2 className="text-xl font-semibold">HyperWeb OS</h2>
                <p className="text-blue-100 opacity-80">版本 1.0.0 (Gemini 版)</p>
            </div>
        </div>
      </div>

      <div className="px-4 space-y-6">
        <section className="rounded-2xl overflow-hidden bg-[#1c1c1e]">
            <SettingItem icon={Wifi} label="无线局域网" value={systemState.wifi ? "HyperNet 5G" : "未连接"} onClick={toggleWifi} color="bg-blue-500" />
            <SettingItem icon={Bluetooth} label="蓝牙" value={systemState.bluetooth ? "开启" : "关闭"} onClick={toggleBluetooth} color="bg-blue-500" />
            <SettingItem icon={Smartphone} label="移动网络" value="5G" color="bg-green-500" />
        </section>

        <section className="rounded-2xl overflow-hidden bg-[#1c1c1e]">
            <SettingItem icon={Sun} label="显示与亮度" value="" color="bg-yellow-500" />
            <SettingItem icon={Monitor} label="壁纸与个性化" value="" onClick={() => setSystemState(p => ({...p, wallpaperIndex: (p.wallpaperIndex + 1) % 5}))} color="bg-purple-500" />
            <SettingItem icon={Bell} label="声音与触感" value="" color="bg-red-500" />
        </section>

        <section className="rounded-2xl overflow-hidden bg-[#1c1c1e]">
            <SettingItem icon={Battery} label="电池" value="84%" color="bg-green-500" />
            <SettingItem icon={Info} label="关于本机" value="HyperWeb OS" color="bg-gray-500" />
        </section>
      </div>
    </div>
  );
};

export default Settings;