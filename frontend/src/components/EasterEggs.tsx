import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const EasterEggs: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
    ];
    let keyIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[keyIndex]) {
        keyIndex++;
        if (keyIndex === konamiCode.length) {
          triggerSecret();
          keyIndex = 0;
        }
      } else {
        keyIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerSecret = () => {
    setUnlocked(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#6D001A', '#990026', '#E01E43', '#ffffff']
    });

    setTimeout(() => {
      setUnlocked(false);
    }, 6000);
  };

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-[9999] glass-panel p-4 rounded-xl border border-[#990026] bg-[#6D001A] shadow-2xl text-white font-mono text-xs flex items-center space-x-3"
        >
          <Trophy className="w-6 h-6 text-white animate-bounce" />
          <div>
            <span className="font-bold text-white block">EASTER EGG UNLOCKED!</span>
            <span className="text-[10px] text-slate-200">Konami Code Activated — Welcome Developer!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
