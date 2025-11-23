import React, { useState } from 'react';
import { SystemState, AppId } from './types';
import StatusBar from './components/StatusBar';
import ControlCenter from './components/ControlCenter';
import LockScreen from './components/LockScreen';
import NavigationBar from './components/NavigationBar';
import Recents from './components/Recents';
import { APPS, WALLPAPERS } from './constants';

const App: React.FC = () => {
  const [systemState, setSystemState] = useState<SystemState>({
    isLocked: true,
    activeAppId: null,
    openApps: [],
    // Default installed apps (Music, Calendar, Weather are excluded to demonstrate App Store)
    installedAppIds: [
        AppId.Assistant, AppId.AppStore, AppId.ThemeStore, AppId.Settings, 
        AppId.Gallery, AppId.Camera, AppId.Browser, AppId.Clock, 
        AppId.Notes, AppId.Calculator
    ],
    isControlCenterOpen: false,
    isRecentsOpen: false,
    brightness: 100,
    volume: 50,
    wifi: true,
    bluetooth: true,
    flashlight: false,
    wallpaperIndex: 0
  });

  const launchApp = (id: string) => {
    setSystemState(prev => ({
      ...prev,
      activeAppId: id,
      isRecentsOpen: false,
      isControlCenterOpen: false,
      openApps: prev.openApps.includes(id) ? prev.openApps : [...prev.openApps, id]
    }));
  };

  const closeApp = (id: string) => {
    setSystemState(prev => ({
      ...prev,
      // If we are closing the currently active app, go home
      activeAppId: prev.activeAppId === id ? null : prev.activeAppId,
      openApps: prev.openApps.filter(appId => appId !== id)
    }));
  };

  const clearAllApps = () => {
    setSystemState(prev => ({
        ...prev,
        openApps: [],
        activeAppId: null,
        isRecentsOpen: false
    }));
  }

  // Virtual Key Handlers
  const handleBack = () => {
    setSystemState(prev => {
        if (prev.isRecentsOpen) return { ...prev, isRecentsOpen: false };
        if (prev.isControlCenterOpen) return { ...prev, isControlCenterOpen: false };
        if (prev.activeAppId) return { ...prev, activeAppId: null };
        return prev;
    });
  };

  const handleHome = () => {
    setSystemState(prev => ({
        ...prev,
        activeAppId: null,
        isRecentsOpen: false,
        isControlCenterOpen: false
    }));
  };

  const handleRecents = () => {
    setSystemState(prev => ({
        ...prev,
        isRecentsOpen: !prev.isRecentsOpen,
        isControlCenterOpen: false,
        activeAppId: null // Hide active app to show recents overlay clearly
    }));
  };

  const activeAppConfig = APPS.find(app => app.id === systemState.activeAppId);
  const installedApps = APPS.filter(app => systemState.installedAppIds.includes(app.id));

  return (
    <div className={`relative h-full w-full overflow-hidden ${WALLPAPERS[systemState.wallpaperIndex]} transition-all duration-500 flex flex-col`}>
      <StatusBar />

      {/* Main Desktop Container (takes available space above nav bar) */}
      <div className="flex-1 relative overflow-hidden">
        
        {/* Desktop Grid */}
        <div className={`h-full w-full pt-16 px-4 pb-24 grid grid-cols-4 gap-6 content-start overflow-y-auto no-scrollbar transition-all duration-500 
            ${(systemState.activeAppId || systemState.isRecentsOpen || systemState.isLocked) ? 'scale-90 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
            
            {/* Date Widget */}
            <div className="col-span-2 h-32 rounded-3xl bg-white/10 backdrop-blur-md flex flex-col justify-center px-6 text-white shadow-lg border border-white/5">
                <span className="text-4xl font-light">{new Date().getDate()}</span>
                <span className="text-sm uppercase tracking-wider opacity-80">{new Date().toLocaleDateString('zh-CN', {weekday: 'long'})}</span>
            </div>

            {/* Weather Widget */}
            <div className="col-span-2 h-32 rounded-3xl bg-gradient-to-br from-blue-500/80 to-blue-700/80 backdrop-blur-md flex flex-col justify-between p-4 text-white shadow-lg border border-white/5">
                <div className="text-right text-xs">北京</div>
                <div>
                    <span className="text-3xl font-bold">24°</span>
                    <div className="text-xs opacity-80">晴朗</div>
                </div>
            </div>

            {installedApps.map((app) => (
            <div 
                key={app.id} 
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => launchApp(app.id)}
            >
                <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center text-white shadow-xl group-active:scale-90 transition-transform duration-200 border border-white/10 relative overflow-hidden`}>
                  <app.icon size={32} strokeWidth={1.5} className="relative z-10" />
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-xs text-white font-medium drop-shadow-md">{app.name}</span>
            </div>
            ))}
        </div>

        {/* Dock */}
        <div className={`absolute bottom-4 left-4 right-4 h-24 bg-white/10 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-around px-2 border border-white/5 transition-transform duration-300 z-10 
            ${(systemState.activeAppId || systemState.isRecentsOpen || systemState.isLocked) ? 'translate-y-40' : 'translate-y-0'}`}>
            {installedApps.slice(0, 4).map((app) => (
                <div 
                    key={`dock-${app.id}`} 
                    className="flex flex-col items-center justify-center cursor-pointer w-16 h-16 rounded-2xl hover:bg-white/10 transition-colors"
                    onClick={() => launchApp(app.id)}
                >
                    <div className={`w-12 h-12 rounded-xl ${app.color} flex items-center justify-center text-white shadow-lg`}>
                        <app.icon size={24} />
                    </div>
                </div>
            ))}
        </div>

        {/* Active App Window */}
        {systemState.activeAppId && activeAppConfig && !systemState.isRecentsOpen && (
            <div className="absolute inset-0 bg-black z-20 animate-in slide-in-from-bottom duration-300 flex flex-col shadow-2xl">
                {/* Fake System Bar Background for app consistency */}
                <div className="h-8 w-full bg-black/20 absolute top-0 z-50 pointer-events-none"></div>

                <div className="flex-1 relative overflow-hidden bg-black">
                    <activeAppConfig.component 
                        systemState={systemState} 
                        setSystemState={setSystemState} 
                    />
                </div>
            </div>
        )}

        {/* Recents Overlay */}
        <Recents 
            isOpen={systemState.isRecentsOpen}
            openApps={systemState.openApps}
            appsConfig={APPS}
            onAppSelect={launchApp}
            onAppClose={closeApp}
            onClearAll={clearAllApps}
        />

        {/* Control Center Trigger Area */}
        <div 
            className="absolute top-0 right-0 w-1/2 h-8 z-50 cursor-s-resize"
            onClick={() => setSystemState(p => ({...p, isControlCenterOpen: true}))}
        ></div>

        <ControlCenter 
            isOpen={systemState.isControlCenterOpen} 
            onClose={() => setSystemState(p => ({...p, isControlCenterOpen: false}))}
            state={systemState}
            setState={setSystemState}
        />

        {systemState.isLocked && (
            <LockScreen onUnlock={() => setSystemState(p => ({ ...p, isLocked: false }))} />
        )}
      </div>

      {/* Virtual Navigation Bar */}
      {!systemState.isLocked && (
        <NavigationBar 
            onBack={handleBack} 
            onHome={handleHome} 
            onRecents={handleRecents} 
        />
      )}
    </div>
  );
};

export default App;
