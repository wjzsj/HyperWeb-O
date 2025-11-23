import React from 'react';
import { ChevronLeft, Circle, Square } from 'lucide-react';

interface Props {
  onBack: () => void;
  onHome: () => void;
  onRecents: () => void;
}

const NavigationBar: React.FC<Props> = ({ onBack, onHome, onRecents }) => {
  return (
    <div className="h-14 bg-black flex justify-around items-center px-10 z-[60] relative border-t border-white/10 shrink-0">
      <button 
        onClick={onBack} 
        className="w-16 h-full flex items-center justify-center active:bg-white/10 rounded-xl transition-colors"
      >
        <ChevronLeft size={26} className="text-white" />
      </button>
      
      <button 
        onClick={onHome} 
        className="w-16 h-full flex items-center justify-center active:bg-white/10 rounded-xl transition-colors"
      >
        <Circle size={20} className="text-white" fill="white" />
      </button>
      
      <button 
        onClick={onRecents} 
        className="w-16 h-full flex items-center justify-center active:bg-white/10 rounded-xl transition-colors"
      >
        <Square size={20} className="text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default NavigationBar;
