import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, ChevronDown } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { DeveloperTerminal } from './DeveloperTerminal';

interface HeroProps {
  onExploreWork: () => void;
  onContactMe: () => void;
  onSudoHireSuccess?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onContactMe,
  onSudoHireSuccess,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive Hero Particle Network Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const particleCount = Math.min(Math.floor(width / 25), 45);
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 1,
      baseAlpha: Math.random() * 0.4 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & render particles with burgundy tones
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += (dx / dist) * 0.2;
          p.y += (dy / dist) * 0.2;
        }

        ctx.fillStyle = `rgba(184, 0, 46, ${p.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distance < 120) {
            ctx.strokeStyle = `rgba(109, 0, 26, ${0.25 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden max-w-full bg-[#000000]">
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 max-w-full" />

      {/* Deep Burgundy Lighting Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[700px] h-[300px] sm:h-[700px] bg-[#6D001A]/20 rounded-full blur-[90px] sm:blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center overflow-x-hidden">
        {/* Left Column: Hero Copy */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left max-w-full overflow-hidden">
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#4A0012]/40 border border-[#990026]/40 text-white font-mono text-[10px] sm:text-xs shadow-lg max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#E01E43] animate-pulse shrink-0" />
            <span className="tracking-wide truncate">{PORTFOLIO_DATA.personal.status}</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-1 max-w-full overflow-hidden"
          >
            <h1 className="text-[28px] xs:text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight sm:leading-none">
              <span className="block whitespace-nowrap">AYUSHMAN</span>
              <span className="text-gradient block whitespace-nowrap">SAHOO</span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-full overflow-hidden"
          >
            <h2 className="text-xs xs:text-sm sm:text-xl lg:text-2xl font-mono font-semibold text-[#E01E43] tracking-wider uppercase leading-snug">
              {PORTFOLIO_DATA.personal.title}
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xs sm:text-lg text-slate-300 max-w-xl leading-relaxed font-sans"
          >
            {PORTFOLIO_DATA.personal.subtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 max-w-full"
          >
            <button
              onClick={onExploreWork}
              data-cursor="EXPLORE"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#6D001A] hover:bg-[#8E0022] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-[#6D001A]/40 flex items-center justify-center space-x-2 border border-[#990026] group"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onContactMe}
              data-cursor="CONTACT"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel hover:bg-[#4A0012]/40 active:scale-95 text-white font-semibold text-xs sm:text-sm border border-white/10 hover:border-[#990026] transition-all flex items-center justify-center"
            >
              GET IN TOUCH
            </button>
          </motion.div>
        </div>

        {/* Right Column: Floating Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-5 max-w-full overflow-hidden"
        >
          <DeveloperTerminal onSudoHireSuccess={onSudoHireSuccess} />
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 flex-col items-center space-y-1 cursor-pointer"
        onClick={onExploreWork}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4 text-[#B8002E]" />
      </motion.div>
    </section>
  );
};
