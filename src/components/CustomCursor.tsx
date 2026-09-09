import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const clickableAttr = target.closest('a, button, [role="button"]');

      if (cursorAttr) {
        setCursorText(cursorAttr);
        setIsHovered(true);
      } else if (clickableAttr) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#E01E43] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Glowing aura / text badge */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center font-mono text-[10px] font-semibold uppercase tracking-wider text-white border border-[#990026]/60 bg-[#4A0012]/80 backdrop-blur-md hidden md:flex"
        animate={{
          x: position.x - (cursorText ? 55 : isHovered ? 24 : 16),
          y: position.y - (cursorText ? 18 : isHovered ? 24 : 16),
          width: cursorText ? 110 : isHovered ? 48 : 32,
          height: cursorText ? 36 : isHovered ? 48 : 32,
          borderRadius: cursorText ? 18 : 9999,
          boxShadow: isHovered
            ? '0 0 30px rgba(109, 0, 26, 0.6)'
            : '0 0 10px rgba(109, 0, 26, 0.2)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
      >
        {cursorText && (
          <span className="whitespace-nowrap px-2 text-center text-white drop-shadow">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};
