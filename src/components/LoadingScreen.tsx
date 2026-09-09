import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const loadingSteps = [
    { text: "INITIALIZING AYUSHMAN.OS", delay: 200 },
    { text: "LOADING PROJECTS ........ OK", delay: 500 },
    { text: "LOADING SKILLS .......... OK", delay: 800 },
    { text: "LOADING EXPERIENCE ...... OK", delay: 1100 },
    { text: "SYSTEM READY", delay: 1400 },
  ];

  useEffect(() => {
    loadingSteps.forEach(({ text, delay }) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, text]);
      }, delay);
      return () => clearTimeout(timer);
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#000000] font-mono text-xs sm:text-sm text-white select-none p-6 noise-overlay"
    >
      <div className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden bg-[#080305]">
        {/* Glow header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 text-slate-400">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#B8002E]" />
            <span className="font-semibold text-white tracking-wider text-xs">AYUSHMAN.OS // BOOT SEQUENCE</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6D001A]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#990026]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
          </div>
        </div>

        {/* Logs */}
        <div className="space-y-2 font-mono min-h-[140px] text-slate-300">
          {logs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <span className="text-[#B8002E]">$</span>
              <span className={log.includes("SYSTEM READY") ? "text-white font-bold" : ""}>
                {log}
              </span>
              {log.includes("SYSTEM READY") && <ShieldCheck className="w-4 h-4 text-[#B8002E] inline ml-1" />}
            </motion.div>
          ))}
          {progress < 100 && (
            <div className="flex items-center space-x-2 text-slate-500">
              <span className="text-[#B8002E] animate-pulse">&gt;</span>
              <span className="animate-blink">_</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>MEM: 64GB / BOOTING</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6D001A] via-[#990026] to-[#E01E43]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onComplete}
            className="text-xs text-slate-500 hover:text-white transition-colors tracking-wide underline underline-offset-4"
          >
            SKIP [ESC]
          </button>
        </div>
      </div>
    </motion.div>
  );
};
