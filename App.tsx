
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { CelestialPanel } from './components/CelestialPanel';
import { constellations, Constellation, Star } from './components/constellations';
import { OrreryRing } from './components/OrreryRing';
import { RingPatterns } from './components/RingPatterns';
import { OctagonalFrame } from './components/OctagonalFrame';
import { StarryBackground } from './components/StarryBackground';
import { StructuralConnectors } from './components/StructuralConnectors';
import { DateDisplay } from './components/DateDisplay';
import { DecorativePlate } from './components/DecorativePlate';
import { CelestialCore } from './components/CelestialCore';
import { ParticleEmitter } from './components/ParticleEmitter';

interface LayerState {
  id: number;
  rotation: number;
  scale: number;
  z: number;
  opacity: number;
}

export interface InterpretationData {
  attributes: { name: string; value: number }[];
  keywords: string[];
  summary: string;
}

const ASSEMBLED_LAYERS: LayerState[] = [
  { id: 0, rotation: 0, scale: 1, z: 0, opacity: 1 },
  { id: 1, rotation: 0, scale: 1, z: 50, opacity: 1 },
  { id: 2, rotation: 0, scale: 1, z: 100, opacity: 1 },
  { id: 3, rotation: 0, scale: 1, z: 115, opacity: 1 },
  { id: 4, rotation: 0, scale: 1, z: 130, opacity: 1 },
  { id: 5, rotation: 0, scale: 1, z: 160, opacity: 1 },
];

const DISASSEMBLED_LAYERS: LayerState[] = [
  { id: 0, rotation: -15, scale: 1.1, z: -200, opacity: 0.8 },
  { id: 1, rotation: -5, scale: 1.05, z: -80, opacity: 0.85 },
  { id: 2, rotation: 0, scale: 1, z: 80, opacity: 1 },
  { id: 3, rotation: 2, scale: 0.98, z: 150, opacity: 0.9 },
  { id: 4, rotation: 5, scale: 0.95, z: 220, opacity: 0.9 },
  { id: 5, rotation: 15, scale: 0.9, z: 350, opacity: 0.8 },
];

export const YEAR_RANGE = { min: 1950, max: 2024 };
export const PARALLAX_FACTOR = 55;

const ERROR_INTERPRETATION: InterpretationData = {
    attributes: [
        { name: "命格", value: 50 }, { name: "才智", value: 50 },
        { name: "气运", value: 50 }, { name: "情缘", value: 50 },
        { name: "风骨", value: 50 },
    ],
    keywords: ["星轨紊乱", "天机暂隐"],
    summary: "星辰迷离，前路未明，请待天清气朗时再探究竟。"
};

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState({ year: 1990, month: 1, day: 1 });
  const [isAssembled, setIsAssembled] = useState(true);
  const [isDialing, setIsDialing] = useState(false);
  const [activeSelector, setActiveSelector] = useState<number | null>(null);
  const [isDateConfirmed, setIsDateConfirmed] = useState(false);
  const [isInterpretationVisible, setIsInterpretationVisible] = useState(false);
  const [interpretation, setInterpretation] = useState<InterpretationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [hoveredStar, setHoveredStar] = useState<Star | null>(null);
  const [ringRotations, setRingRotations] = useState({ year: 0, month: 0, day: 0 });

  const aiRef = useRef<GoogleGenAI | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const appCenterRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const updateCenter = () => {
      appCenterRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    };
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => {
        window.removeEventListener('resize', updateCenter);
    }
  }, []);

  const playTickSound = useCallback(() => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    
    const thud = ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(100, now);
    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(0.5, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    thud.connect(thudGain).connect(ctx.destination);
    thud.start(now);
    thud.stop(now + 0.1);
    
    const click = ctx.createOscillator();
    click.type = 'square';
    click.frequency.setValueAtTime(1200, now);
    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.2, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    click.connect(clickGain).connect(ctx.destination);
    click.start(now);
    click.stop(now + 0.05);
  }, []);

  const handleDialMouseDown = (e: React.MouseEvent | React.TouchEvent, id: number) => {
    e.stopPropagation();
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    setActiveSelector(id);
    setIsDialing(true);
    setIsDateConfirmed(false);
  };
  
  const handleDialMouseUp = () => {
    setIsDialing(false);
  };

  const handleMouseMove = (e: any) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    
    if (isDialing && activeSelector !== null) {
      const angle = Math.atan2(y - appCenterRef.current.y, x - appCenterRef.current.x) * (180 / Math.PI) + 90;
      const normAngle = (angle < 0 ? angle + 360 : angle);
      
      let newDate = { ...selectedDate };
      let changed = false;

      if (activeSelector === 0) {
        const year = Math.round((normAngle / 360) * (YEAR_RANGE.max - YEAR_RANGE.min)) + YEAR_RANGE.min;
        if (newDate.year !== year) { newDate.year = year; changed = true; setRingRotations(r => ({...r, year: normAngle})); }
      } else if (activeSelector === 1) {
        const month = Math.floor(normAngle / 30) + 1;
        if (newDate.month !== month) { newDate.month = month; changed = true; setRingRotations(r => ({...r, month: normAngle})); }
      } else if (activeSelector === 2) {
        const maxD = new Date(newDate.year, newDate.month, 0).getDate();
        const day = Math.max(1, Math.min(maxD, Math.floor(normAngle / (360 / maxD)) + 1));
        if (newDate.day !== day) { newDate.day = day; changed = true; setRingRotations(r => ({...r, day: normAngle})); }
      }

      if (changed) { 
        setSelectedDate(newDate); 
        playTickSound();
      }
    } else {
      setParallaxOffset({
        x: (x - appCenterRef.current.x) / appCenterRef.current.x,
        y: (y - appCenterRef.current.y) / appCenterRef.current.y
      });
    }
  };

  const getInterpretation = async () => {
    setIsLoading(true);
    setInterpretation(null);
    setIsInterpretationVisible(true);
    const sign = zodiac?.name;
    const prompt = `占星解读：生日${selectedDate.year}年${selectedDate.month}月${selectedDate.day}日，星座${sign}。请分析其命格、才智、气运、情缘、风骨五项，并给出诗意判词与总纲。`;
    
    try {
      if (!aiRef.current) throw new Error("AI not initialized");
      const resp = await aiRef.current.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              attributes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { name: { type: Type.STRING }, value: { type: Type.INTEGER } },
                  required: ['name', 'value']
                }
              },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              summary: { type: Type.STRING }
            },
            required: ['attributes', 'keywords', 'summary']
          },
          systemInstruction: "你是一位隐居山林的古风占星师，擅长用周易与星象结合的方式解读命运。请严格按照JSON格式返回解读结果。" 
        }
      });
      setInterpretation(JSON.parse(resp.text || '{}'));
    } catch(e) {
      console.error(e);
      setInterpretation(ERROR_INTERPRETATION);
    } finally {
      setIsLoading(false);
    }
  };

  const zodiac = constellations.find(c => {
    const { month: m, day: d } = selectedDate;
    let s = '';
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) s = 'Aries';
    else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) s = 'Taurus';
    else if ((m === 5 && d >= 21) || (m === 6 && d <= 21)) s = 'Gemini';
    else if ((m === 6 && d >= 22) || (m === 7 && d <= 22)) s = 'Cancer';
    else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) s = 'Leo';
    else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) s = 'Virgo';
    else if ((m === 9 && d >= 23) || (m === 10 && d <= 23)) s = 'Libra';
    else if ((m === 10 && d >= 24) || (m === 11 && d <= 22)) s = 'Scorpio';
    else if ((m === 11 && d >= 23) || (m === 12 && d <= 21)) s = 'Sagittarius';
    else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) s = 'Capricorn';
    else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) s = 'Aquarius';
    else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) s = 'Pisces';
    return c.name.includes(s);
  });

  const layers = isAssembled ? ASSEMBLED_LAYERS : DISASSEMBLED_LAYERS;
  const maxZ = 350;

  return (
    <main 
      className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, #110f0e 60%)' }}
      onMouseMove={handleMouseMove} onMouseUp={handleDialMouseUp}
      onTouchMove={handleMouseMove} onTouchEnd={handleDialMouseUp}
    >
      <StarryBackground />
      <RingPatterns />

      <DateDisplay date={selectedDate} activeSelector={activeSelector} />

      <div 
        className="relative w-[88vmin] h-[88vmin]" 
        style={{ 
            perspective: '2500px', 
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 0 25px rgba(212, 175, 55, 0.3))'
        }}
      >
        <ParticleEmitter isActive={!isAssembled} />
        <StructuralConnectors isAssembled={isAssembled} parallaxOffset={parallaxOffset} />
        {layers.map(layer => {
          const zProgress = (layer.z + 200) / (maxZ + 200); 
          const brightness = 0.7 + (zProgress * 0.3);
          const parallax = { x: parallaxOffset.x * PARALLAX_FACTOR * (layer.z / 200), y: parallaxOffset.y * PARALLAX_FACTOR * (layer.z / 200) };
          const baseTransform = `translate3d(${parallax.x}px, ${parallax.y}px, ${layer.z}px) rotate(${layer.rotation}deg) scale(${layer.scale})`;
          const isActive = activeSelector === layer.id;

          const layerStyle: React.CSSProperties = {
            transform: baseTransform,
            opacity: layer.opacity,
            filter: `brightness(${isActive ? 1.25 : brightness})`,
            transition: 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1), filter 0.5s ease',
            zIndex: Math.round(layer.z)
          };
          
          if (layer.id === 0) return <OrreryRing key={0} type="year" size="100%" rotation={ringRotations.year} onMouseDown={(e) => handleDialMouseDown(e,0)} selectedValue={selectedDate.year} style={layerStyle} />;
          if (layer.id === 1) return <OrreryRing key={1} type="month" size="82%" rotation={ringRotations.month} onMouseDown={(e) => handleDialMouseDown(e,1)} selectedValue={selectedDate.month} style={layerStyle} />;
          if (layer.id === 2) return <OrreryRing key={2} type="day" size="62%" rotation={ringRotations.day} onMouseDown={(e) => handleDialMouseDown(e,2)} selectedValue={selectedDate.day} style={layerStyle} />;
          if (layer.id === 3) return <DecorativePlate key={3} style={layerStyle} />;
          if (layer.id === 4) return <OctagonalFrame key={4} style={layerStyle} />;
          if (layer.id === 5) return (
            <CelestialCore 
              key={5}
              style={layerStyle}
              isDateConfirmed={isDateConfirmed}
              zodiac={zodiac}
              hoveredStar={hoveredStar}
              onConfirmDate={() => setIsDateConfirmed(true)}
              onGetInterpretation={getInterpretation}
              onHoverStar={setHoveredStar}
            />
          );
          return null;
        })}
      </div>

      <div className="absolute bottom-10 flex gap-6 z-50">
        <button 
            onClick={() => setIsAssembled(!isAssembled)} 
            className="px-8 py-2.5 border border-[#D4AF37]/20 text-[#D4AF37]/70 text-[10px] tracking-[0.3em] hover:bg-[#D4AF37]/5 hover:text-[#D4AF37] transition-all rounded backdrop-blur-sm"
        >
          {isAssembled ? 'DECONSTRUCT / 解构' : 'ASSEMBLE / 聚合'}
        </button>
      </div>

      <CelestialPanel 
        data={interpretation} isLoading={isLoading} isVisible={isInterpretationVisible} 
        constellationName={zodiac?.name} onClose={() => setIsInterpretationVisible(false)} 
      />
    </main>
  );
};

export default App;
