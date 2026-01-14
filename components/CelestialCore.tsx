
import React from 'react';
import { Constellation, Star } from './constellations';

interface CelestialCoreProps {
  style: React.CSSProperties;
  isDateConfirmed: boolean;
  zodiac: Constellation | undefined;
  hoveredStar: Star | null;
  onConfirmDate: () => void;
  onGetInterpretation: () => void;
  onHoverStar: (star: Star | null) => void;
}

export const CelestialCore: React.FC<CelestialCoreProps> = (
    { style, isDateConfirmed, zodiac, hoveredStar, onConfirmDate, onGetInterpretation, onHoverStar }
) => {
  return (
    <div 
      onClick={() => isDateConfirmed ? onGetInterpretation() : onConfirmDate()}
      onMouseLeave={() => onHoverStar(null)}
      className="absolute inset-0 m-auto w-[28%] h-[28%] rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-pointer group flex items-center justify-center transition-all duration-1000"
      style={{ ...style, transformStyle: 'preserve-3d', background: 'radial-gradient(circle at center, #2a211a 0%, #0a0807 70%)' }}
    >
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]" />
      <div 
        className={`absolute inset-0 border transition-all duration-500 ${!isDateConfirmed ? 'animate-cosmic-glow' : 'border-[#D4AF37]/40'}`} 
        style={isDateConfirmed ? {boxShadow: '0 0 25px rgba(212, 175, 55, 0.4), 0 0 10px rgba(251, 229, 180, 0.3) inset'} : {}}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#FF6464_0%,_transparent_70%)] opacity-30 group-hover:opacity-60 transition-opacity" />
      
      {!isDateConfirmed ? (
        <div className="flex flex-col items-center gap-1">
            <span className="text-[#FBE5B4]/90 text-[10px] tracking-[0.4em] font-serif">启迪星象</span>
            <div className="w-8 h-px bg-[#D4AF37]/50" />
        </div>
      ) : (
        <svg viewBox="0 0 100 100" className="w-full h-full p-3 overflow-visible animate-subtle-pulse">
           {zodiac?.lines.map(([s1, s2], i) => {
             const p1 = zodiac.stars.find(s => s.id === s1);
             const p2 = zodiac.stars.find(s => s.id === s2);
             return p1 && p2 && <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(212, 175, 55,0.2)" strokeWidth="0.4" strokeDasharray="1 1" />
           })}
           {zodiac?.stars.map(s => (
             <g key={s.id} onMouseEnter={() => onHoverStar(s)}>
                <circle cx={s.x} cy={s.y} r={hoveredStar?.id === s.id ? 2.8 : 1.4} fill={hoveredStar?.id === s.id ? "#fff" : "#FBE5B4"} className="transition-all duration-300" />
                {hoveredStar?.id === s.id && (
                    <text x={s.x+4} y={s.y+1.5} fill="#fff" fontSize="5" className="font-serif select-none pointer-events-none drop-shadow-md">{s.name}</text>
                )}
             </g>
           ))}
        </svg>
      )}
    </div>
  );
};