
import React from 'react';

export const RingPatterns: React.FC = () => (
  <svg className="absolute w-0 h-0">
    <defs>
      {/* Year Ring: Imperial Brocade Pattern */}
      <pattern id="pattern-year" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="scale(1)">
        <rect width="80" height="80" fill="#483a22"/>
        <path d="M40 0 L50 10 L40 20 L30 10Z M0 40 L10 50 L20 40 L10 30Z M80 40 L70 50 L60 40 L70 30Z M40 80 L50 70 L40 60 L30 70Z" 
              fill="#9B3C3C" opacity="0.5" />
        <path d="M20 20 L60 20 L60 60 L20 60Z" 
              fill="none" stroke="#9B3C3C" strokeWidth="1" opacity="0.4"/>
        <circle cx="40" cy="40" r="15" fill="none" stroke="#9B3C3C" strokeWidth="0.5" opacity="0.4" />
      </pattern>

      {/* Month Ring: Celestial Clouds Pattern */}
      <pattern id="pattern-month" patternUnits="userSpaceOnUse" width="200" height="200">
        <rect width="200" height="200" fill="#004d39"/>
        <path d="M 50 50 Q 70 30, 90 50 T 130 50" fill="none" stroke="#FBE5B4" strokeWidth="2" opacity="0.4" strokeLinecap="round"/>
        <path d="M 120 110 Q 140 90, 160 110 T 200 110" fill="none" stroke="#FBE5B4" strokeWidth="2" opacity="0.4" strokeLinecap="round"/>
        <path d="M 30 150 Q 50 130, 70 150 T 110 150" fill="none" stroke="#FBE5B4" strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
        <circle cx="80" cy="140" r="25" fill="#FBE5B4" opacity="0.04" />
        <circle cx="150" cy="60" r="30" fill="#FBE5B4" opacity="0.05" />
      </pattern>

      {/* Day Ring: Stardust Lacquer Pattern */}
      <pattern id="pattern-day" patternUnits="userSpaceOnUse" width="150" height="150">
        <rect width="150" height="150" fill="#8a2a2a"/>
        <circle cx="25" cy="50" r="0.8" fill="#FBE5B4" opacity="0.8"/>
        <circle cx="100" cy="30" r="0.5" fill="#FBE5B4" opacity="0.6"/>
        <circle cx="75" cy="110" r="1" fill="#FBE5B4" opacity="0.9"/>
        <circle cx="130" cy="130" r="0.6" fill="#FBE5B4" opacity="0.7"/>
        <circle cx="15" cy="100" r="0.7" fill="#FBE5B4" opacity="0.8"/>
      </pattern>
    </defs>
  </svg>
);