
import React from 'react';

interface DateDisplayProps {
  date: {
    year: number;
    month: number;
    day: number;
  };
  activeSelector: number | null;
}

const DateDisplayNumber: React.FC<{ value: number; label: string; isActive: boolean }> = ({ value, label, isActive }) => (
  <div className="flex flex-col items-center relative">
    <span className="text-[10px] text-[#D4AF37]/60 tracking-widest">{label}</span>
    <div className={`
      relative mt-1 w-28 h-16 flex items-center justify-center bg-black/30 
      border border-t-[#D4AF37]/40 border-x-[#D4AF37]/20 border-b-black/30
      transition-all duration-300
      ${isActive ? 'shadow-[0_0_25px_rgba(251,229,180,0.6)] bg-black/50' : 'shadow-inner'}
    `}>
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
      <span className={`
        font-serif text-5xl text-stone-100 transition-all duration-300
        ${isActive ? 'text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'opacity-80 drop-shadow-[0_0_10px_rgba(251,229,180,0.3)]'}
      `}>
        {value}
      </span>
    </div>
  </div>
);

export const DateDisplay: React.FC<DateDisplayProps> = ({ date, activeSelector }) => {
  return (
    <div className="absolute top-8 text-center z-50 pointer-events-none flex items-center justify-center gap-2 p-4 bg-[#3a211a]/50 border border-t-[#D4AF37]/30 border-x-transparent border-b-transparent backdrop-blur-sm"
         style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.2)' }}>
      
      <DateDisplayNumber value={date.year} label="岁" isActive={activeSelector === 0} />
      
      <div className="flex flex-col mt-6">
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30 mt-2" />
      </div>

      <DateDisplayNumber value={date.month} label="月" isActive={activeSelector === 1} />

      <div className="flex flex-col mt-6">
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
        <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30 mt-2" />
      </div>

      <DateDisplayNumber value={date.day} label="日" isActive={activeSelector === 2} />

    </div>
  );
};