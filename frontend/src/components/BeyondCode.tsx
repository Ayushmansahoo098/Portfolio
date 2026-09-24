import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film, Palette, Terminal, BrainCircuit } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const BeyondCode: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'motion-design': return Palette;
      case 'video-editing': return Film;
      case 'dsa-practice': return Terminal;
      default: return BrainCircuit;
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>CHAPTER 06 // PERSONALITY</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          BEYOND CODE
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
          Where technical precision meets creative storytelling and continuous exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.beyondCode.map((item, idx) => {
          const IconComp = getIcon(item.id);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover p-8 rounded-2xl border border-white/10 space-y-4 relative overflow-hidden group bg-[#080305]"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#4A0012]/60 border border-[#990026]/40 flex items-center justify-center text-[#E01E43]">
                  <IconComp className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#6D001A] text-white font-mono text-[10px] border border-[#990026]">
                  {item.tag}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white group-hover:text-[#E01E43] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
