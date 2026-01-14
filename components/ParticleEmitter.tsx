
import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
}

interface ParticleEmitterProps {
  isActive: boolean;
}

export const ParticleEmitter: React.FC<ParticleEmitterProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createParticle = () => {
      // Emit from a circle slightly larger than the disassembled device
      const angle = Math.random() * Math.PI * 2;
      const deviceRadius = Math.min(width, height) * 0.44 * 1.1; // 88vmin diameter -> 44vmin radius. 1.1 scale for disassembled.
      
      const x = width / 2 + Math.cos(angle) * deviceRadius;
      const y = height / 2 + Math.sin(angle) * deviceRadius;

      // Velocity is outward from the center
      const speed = Math.random() * 0.5 + 0.2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      particles.current.push({
        x,
        y,
        vx,
        vy,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.3,
        decay: Math.random() * 0.005 + 0.005,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Add glow effect to particles
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';

      // Create new particles if active and under the limit
      if (isActive && particles.current.length < 250) {
        // Add 1-2 particles per frame for a steady flow
        for(let i = 0; i < 2; i++) {
            createParticle();
        }
      }

      // Update and draw existing particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
          ctx.fill();
        }
      }
      
      // Keep animating if we need to (either creating new particles or fading out old ones)
      if (isActive || particles.current.length > 0) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, width, height); // Final clear when done
      }
    };

    // Start the animation loop
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isActive]); // Rerun effect if isActive changes

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[5]" />;
};