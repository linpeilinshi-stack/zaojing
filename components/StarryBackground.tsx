
import React from 'react';

export const StarryBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none opacity-60">
    {Array.from({length: 80}).map((_, i) => (
      <div 
        key={i} 
        className="absolute bg-white rounded-full"
        style={{
          width: Math.random() * 2 + 'px',
          height: Math.random() * 2 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animation: `twinkle ${Math.random() * 5 + 3}s infinite ease-in-out`
        }}
      />
    ))}
  </div>
);