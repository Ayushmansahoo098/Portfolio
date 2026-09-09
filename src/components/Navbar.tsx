import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Terminal, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: 'hero' },
    { label: 'ABOUT', href: 'about' },
    { label: 'SKILLS', href: 'skills' },
    { label: 'PROJECTS', href: 'projects' },
    { label: 'CERTIFICATES', href: 'certificates' },
    { label: 'CONTACT', href: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      const sections = navItems.map((item) => item.href);
      for (const sectionId of sections) {
        const elem = document.getElementById(sectionId);
        if (elem) {
          const rect = elem.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-2 sm:top-4 inset-x-0 z-40 flex justify-center px-2 sm:px-4 pointer-events-none max-w-full overflow-hidden"
        >
          <div className="pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-4 px-2.5 sm:px-4 py-2 sm:py-2.5 glass-panel rounded-full border border-white/10 shadow-2xl backdrop-blur-xl max-w-5xl w-full bg-[#080305]/90 overflow-hidden">
            {/* Logo / OS Indicator */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center space-x-1.5 text-white hover:text-[#B8002E] transition-colors group px-1 shrink-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#4A0012]/60 border border-[#990026]/40 flex items-center justify-center group-hover:border-[#B8002E] transition-colors shrink-0">
                <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E01E43]" />
              </div>
              <span className="font-mono text-xs font-bold tracking-wider text-white">
                AYUSHMAN.OS
              </span>
            </button>

            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center space-x-1 font-mono text-[11px]">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={`relative px-3 py-1.5 rounded-full transition-colors ${
                      isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 bg-[#6D001A]/80 rounded-full border border-[#990026] shadow-lg shadow-[#6D001A]/40"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
              {/* Status Pill */}
              <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#4A0012]/40 border border-[#990026]/40 text-[10px] font-mono text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E01E43] animate-pulse"></span>
                <span>AVAILABLE</span>
              </div>

              {/* Command Palette Trigger */}
              <button
                onClick={onOpenCommandPalette}
                data-cursor="COMMANDS"
                className="flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-[#6D001A]/60 border border-white/10 text-white text-xs transition-all hover:border-[#990026]"
              >
                <Command className="w-3.5 h-3.5 text-[#E01E43]" />
                <span className="font-mono text-[10px]">⌘K</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-white/10 shrink-0"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.header>
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 inset-x-2 sm:inset-x-3 z-30 lg:hidden glass-panel p-3 sm:p-4 rounded-2xl border border-[#990026]/60 bg-[#080305]/95 shadow-2xl font-mono text-xs space-y-1.5 max-w-full"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                  activeSection === item.href
                    ? 'bg-[#6D001A] text-white font-bold border border-[#990026]'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-slate-500">#{item.href}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
