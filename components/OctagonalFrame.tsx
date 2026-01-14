
import React from 'react';

const CornerDecoration: React.FC<{ top?: string; left?: string; bottom?: string; right?: string; }> = (props) => (
  <div 
    className="absolute w-3 h-3 bg-[#D4AF37]/60" 
    style={{ ...props, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', transform: 'translate(-50%, -50%)' }} 
  />
);

export const OctagonalFrame: React.FC<{style: React.CSSProperties}> = ({style}) => {
  const vertices = [
    { top: '0%', left: '30%' }, { top: '0%', left: '70%' },
    { top: '30%', left: '100%' }, { top: '70%', left: '100%' },
    { top: '100%', left: '70%' }, { top: '100%', left: '30%' },
    { top: '70%', left: '0%' }, { top: '30%', left: '0%' },
  ];

  return (
    <div className="absolute inset-0 m-auto w-[46%] h-[46%] transition-all duration-1000" style={{...style, transformStyle: 'preserve-3d'}}>
      {/* Base Surface and Outer Shadow/Thickness */}
      <div 
          className="absolute inset-0 border-[14px] border-[#3a211a] shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_0_0_12px_rgba(0,0,0,0.6)] bg-[#2a211a]" 
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', transform: 'translateZ(-5px)' }}
      />
      {/* Mid-layer decoration */}
      <div 
          className="absolute inset-[10px] border-[4px] border-[#5d3a2a]" 
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', transform: 'translateZ(2px)' }}
      />
      {/* Inner gold rim and gradient overlay */}
      <div 
          className="absolute inset-[20px] border-[1px] border-[#D4AF37]/50" 
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', transform: 'translateZ(8px)' }}
      >
          <div className="w-full h-full bg-gradient-to-br from-[#8B2C2C]/5 to-transparent" />
      </div>
      {/* Corner Inlays */}
      <div className="absolute inset-0" style={{transform: 'translateZ(9px)'}}>
        {vertices.map((v, i) => <CornerDecoration key={i} {...v} />)}
      </div>
    </div>
  );
};