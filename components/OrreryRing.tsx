
import React from 'react';
import { YEAR_RANGE } from '../App';

interface OrreryRingProps {
  type: 'year' | 'month' | 'day';
  size: string;
  rotation: number;
  selectedValue: number;
  onMouseDown: (e: any) => void;
  style: React.CSSProperties;
}

const SYMBOLS = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

export const OrreryRing: React.FC<OrreryRingProps> = ({ type, size, rotation, selectedValue, onMouseDown, style }) => {
  const getMarks = () => {
    if (type === 'month') return SYMBOLS.map((s, i) => ({ val: i + 1, label: s }));
    if (type === 'year') return [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2024].map(v => ({ val: v, label: v.toString() }));
    return [1, 5, 10, 15, 20, 25, 31].map(v => ({ val: v, label: v.toString() }));
  };

  const marks = getMarks();

  const ringStyles = {
    year: { 
      pattern: 'url(#pattern-year)',
      shadow: 'inset 0 4px 12px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(0,0,0,0.2)',
      rim1: '#603818',
      rim2: '#FDEE9480',
      textColor: 'text-amber-100/80'
    },
    month: { 
      pattern: 'url(#pattern-month)',
      shadow: 'inset 0 2px 8px rgba(0,0,0,0.3), inset 0 0 25px rgba(212, 175, 55, 0.15)',
      rim1: '#d0d0d0',
      rim2: '#ffffffA0',
      textColor: 'text-green-200/90'
    },
    day: { 
      pattern: 'url(#pattern-day)',
      shadow: 'inset 0 6px 10px rgba(0,0,0,0.5)',
      rim1: '#5a0a0a',
      rim2: '#FDEE9450',
      textColor: 'text-red-200/90'
    },
  };
  const currentStyle = ringStyles[type];

  return (
    <div 
      className="absolute inset-0 m-auto rounded-full transition-all duration-700 pointer-events-none"
      style={{ ...style, width: size, height: size, transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.6)]" style={{ transform: 'translateZ(-10px)' }} />
      
      <div 
        className={`w-full h-full rounded-full relative pointer-events-auto cursor-grab active:cursor-grabbing`}
        onMouseDown={onMouseDown} onTouchStart={onMouseDown}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Base texture layer */}
        <div className="absolute inset-0 rounded-full" style={{ background: currentStyle.pattern }} />

        {/* Carved/inlaid shadow effect */}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: currentStyle.shadow }} />
        
        {/* Glossy overlay for Day Ring */}
        {type === 'day' && (
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25) 0%, transparent 50%)'
          }} />
        )}

        {/* Outer Rims */}
        <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: currentStyle.rim1 }} />
        <div className="absolute inset-[6px] rounded-full border" style={{ borderColor: currentStyle.rim2 }}/>

        {/* Markings */}
        {marks.map((m, i) => {
            const angle = type === 'year' 
                ? (m.val - YEAR_RANGE.min) * (360 / (YEAR_RANGE.max - YEAR_RANGE.min)) 
                : (m.val - 1) * (type === 'month' ? 30 : 360 / 31);
            
            return (
                <div key={i} className="absolute top-0 left-1/2 -translate-x-1/2 h-full origin-bottom" style={{ transform: `rotate(${angle}deg)` }}>
                    <div className="flex flex-col items-center">
                        <div className={`w-px h-4 ${type === 'year' ? 'bg-amber-400/40' : type === 'month' ? 'bg-green-300/40' : 'bg-red-300/40'}`} />
                        <span 
                            className={`mt-2 text-[9px] font-serif ${currentStyle.textColor}`} 
                            style={{ 
                                transform: `rotate(${-rotation - angle}deg) translateZ(1px)`,
                                textShadow: '0 0 6px rgba(251, 229, 180, 0.7)'
                            }}>
                            {m.label}
                        </span>
                    </div>
                </div>
            );
        })}
        
        {/* Selector Indicator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 flex flex-col items-center">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-[#FBE5B4] drop-shadow-[0_0_15px_rgba(251,229,180,1)]" />
            <div className="w-px h-8 bg-gradient-to-b from-[#FBE5B4] to-transparent opacity-60" />
        </div>
      </div>
    </div>
  );
};