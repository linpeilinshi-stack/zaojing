
import React from 'react';

interface RadarChartProps {
  attributes: { name: string; value: number }[];
}

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

export const RadarChart: React.FC<RadarChartProps> = ({ attributes }) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;
  const numLevels = 4;
  const numSides = attributes.length;
  const angleSlice = 360 / numSides;

  const dataPoints = attributes.map((attr, i) => {
    const valueRadius = (attr.value / 100) * radius;
    const { x, y } = polarToCartesian(center, center, valueRadius, angleSlice * i);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="60%" height="60%" className="drop-shadow-[0_0_20px_rgba(251,229,180,0.3)]">
      <defs>
        <radialGradient id="data-fill-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBE5B4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* Grid Levels */}
      {Array.from({ length: numLevels }).map((_, levelIndex) => (
        <polygon
          key={levelIndex}
          points={Array.from({ length: numSides }).map((_, i) => {
            const levelRadius = (radius / numLevels) * (levelIndex + 1);
            const { x, y } = polarToCartesian(center, center, levelRadius, angleSlice * i);
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="#FBE5B4"
          strokeWidth="0.5"
          opacity={(levelIndex + 1) / (numLevels * 2)}
        />
      ))}

      {/* Axis Lines and Labels */}
      {attributes.map((attr, i) => {
        const { x, y } = polarToCartesian(center, center, radius, angleSlice * i);
        const labelPos = polarToCartesian(center, center, radius * 1.25, angleSlice * i);
        return (
          <g key={attr.name}>
            <line
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#FBE5B4"
              strokeWidth="0.5"
              opacity="0.3"
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              fill="#D4AF37"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-serif"
            >
              {attr.name}
            </text>
          </g>
        );
      })}

      {/* Data Polygon */}
      <polygon
        points={dataPoints}
        fill="url(#data-fill-grad)"
        stroke="#FBE5B4"
        strokeWidth="1.5"
        className="animate-chart-draw"
      />
      <style>{`
        .animate-chart-draw {
          animation: draw 1.5s ease-out forwards;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

    </svg>
  );
};
