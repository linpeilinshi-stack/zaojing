
import React from 'react';

export const DecorativePlate: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
  return (
    <div 
      className="absolute inset-0 m-auto w-[54%] h-[54%] transition-all duration-1000 pointer-events-none" 
      style={{ ...style, transformStyle: 'preserve-3d' }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]">
        <defs>
          <radialGradient id="plate-metal-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#8a6a3c', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: '#5a4a2c', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#2a211a', stopOpacity: 1 }} />
          </radialGradient>
          <mask id="plate-mask">
            <rect width="100" height="100" fill="white" />
            <circle cx="50" cy="50" r="40" fill="black" />
            {/* Spokes */}
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x="48.5"
                y="10"
                width="3"
                height="28"
                fill="black"
                transform={`rotate(${i * 45}, 50, 50)`}
              />
            ))}
          </mask>
        </defs>
        {/* Main Plate */}
        <circle cx="50" cy="50" r="50" fill="url(#plate-metal-grad)" />
        {/* Cutouts */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="#3a2a1a" strokeWidth="4" mask="url(#plate-mask)" />
        {/* Inner Ring */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.4" />
        <circle cx="50" cy="50" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.2" />
      </svg>
    </div>
  );
};