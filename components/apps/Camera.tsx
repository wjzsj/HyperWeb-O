import React, { useEffect, useRef, useState } from 'react';
import { Camera as CameraIcon, RefreshCw, Zap } from 'lucide-react';

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' }, 
            audio: false 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        setError('无法访问相机，请检查权限。');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-full w-full bg-black relative flex flex-col">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 text-white bg-black/80 p-6 text-center">
          {error}
        </div>
      )}
      
      <div className="flex-1 relative overflow-hidden bg-gray-900">
        <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover" 
        />
        
        {/* Camera UI Overlay */}
        <div className="absolute top-4 w-full flex justify-between px-6 z-10">
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-md"><Zap size={24} className="text-white" /></button>
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-md"><RefreshCw size={24} className="text-white" /></button>
        </div>
      </div>

      <div className="h-32 bg-black flex items-center justify-around pb-4">
        <div className="w-12 h-12 rounded-lg bg-gray-800 border border-gray-600"></div>
        <button className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full active:scale-90 transition-transform"></div>
        </button>
        <button className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
            <RefreshCw size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Camera;