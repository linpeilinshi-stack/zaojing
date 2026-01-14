
import React from 'react';
import { PARALLAX_FACTOR } from '../App';

interface StructuralConnectorsProps {
  isAssembled: boolean;
  parallaxOffset: { x: number; y: number };
}

export const StructuralConnectors: React.FC<StructuralConnectorsProps> = ({ isAssembled, parallaxOffset }) => {
  const numConnectors = 4;
  const radius = 180; 
  const angleStep = 360 / numConnectors;

  const parallax = {
    x: parallaxOffset.x * PARALLAX_FACTOR * 0.8, 
    y: parallaxOffset.y * PARALLAX_FACTOR * 0.8,
  };

  const baseTransform = `translate3d(${parallax.x}px, ${parallax.y}px, 150px)`;

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ transformStyle: 'preserve-3d', transform: baseTransform }}
    >
      {Array.from({ length: numConnectors }).map((_, i) => {
        const angle = angleStep * i;
        const connectorStyle: React.CSSProperties = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '20px',
          height: '250px',
          marginTop: '-125px',
          marginLeft: '-10px',
          background: 'linear-gradient(to right, #1a110a, #4a371c 40%, #4a371c 60%, #1a110a)',
          borderLeft: '1px solid #D4AF3720',
          borderRight: '1px solid #D4AF3720',
          transformOrigin: 'center',
          transition: 'transform 1s cubic-bezier(0.2, 0, 0.2, 1), opacity 1s ease',
          transform: `
            rotateY(${angle}deg)
            translateZ(${radius}px)
            rotateX(75deg)
            scaleY(${isAssembled ? 0 : 1})
          `,
          opacity: isAssembled ? 0 : 0.6,
        };
        return <div key={i} style={connectorStyle} />;
      })}
    </div>
  );
};
