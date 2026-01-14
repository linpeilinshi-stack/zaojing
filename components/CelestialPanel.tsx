
import React from 'react';
import { InterpretationData } from '../App';
import { RadarChart } from './RadarChart';

interface CelestialPanelProps {
  data: InterpretationData | null;
  isLoading: boolean;
  isVisible: boolean;
  constellationName?: string;
  onClose: () => void;
}

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center gap-4 pt-10 animate-pulse">
        <svg viewBox="0 0 100 100" className="w-48 h-48 opacity-20">
            <polygon points="50,10 95,40 80,90 20,90 5,40" stroke="#FBE5B4" strokeWidth="1" fill="none" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="50" y2="10" stroke="#FBE5B4" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="95" y2="40" stroke="#FBE5B4" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="80" y2="90" stroke="#FBE5B4" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="20" y2="90" stroke="#FBE5B4" strokeWidth="0.5" />
            <line x1="50" y1="50" x2="5" y2="40" stroke="#FBE5B4" strokeWidth="0.5" />
        </svg>
        <p className="text-[#D4AF37]/40 text-xs tracking-widest">正在推演天命...</p>
    </div>
);

export const CelestialPanel: React.FC<CelestialPanelProps> = ({ data, isLoading, isVisible, constellationName, onClose }) => {
  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />
      <div 
        className={`relative w-[90vmin] max-w-2xl aspect-square rounded-full border border-[#D4AF37]/20 bg-gradient-to-br from-[#4a1d1d]/90 to-[#3a110a]/90 p-8 flex flex-col items-center justify-center text-center transition-transform duration-1000 ${isVisible ? 'scale-100' : 'scale-75'}`}
        onClick={e => e.stopPropagation()}
        style={{ boxShadow: '0 0 100px rgba(212, 175, 55, 0.25), inset 0 0 50px rgba(0,0,0,0.6)'}}
      >
        <button onClick={onClose} className="absolute top-10 text-[#D4AF37]/50 hover:text-[#D4AF37] uppercase text-[10px] tracking-widest z-10">CLOSE / 关闭</button>
        <h2 className="text-3xl text-[#FBE5B4] font-serif mb-2 tracking-widest drop-shadow-[0_0_10px_rgba(251,229,180,0.5)]">{constellationName}</h2>
        
        <div className="w-full flex-grow flex flex-col items-center justify-center">
            {isLoading && <LoadingState />}
            {!isLoading && data && (
                <div className="w-full h-full flex flex-col items-center justify-around animate-in fade-in duration-1000">
                    <RadarChart attributes={data.attributes} />
                    <div className="flex items-center gap-8 my-4">
                        {data.keywords.map((kw, i) => (
                           <React.Fragment key={i}>
                             <span className="text-stone-300 font-serif text-lg">{kw}</span>
                             { i < data.keywords.length - 1 && <div className="w-1 h-1 bg-[#D4AF37]/20 rounded-full" />}
                           </React.Fragment>
                        ))}
                    </div>
                    <p className="text-stone-400 font-serif leading-relaxed text-sm max-w-md px-4 border-t border-[#D4AF37]/10 pt-4">{data.summary}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};