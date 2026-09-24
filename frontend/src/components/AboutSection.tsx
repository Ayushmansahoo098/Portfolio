import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      {/* Section Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
          <User className="w-4 h-4" />
          <span>CHAPTER 01 // STORY</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
          WHO AM I?
        </h2>
      </div>

      {/* Main Bio & Developer Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Story Paragraphs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 glass-panel p-5 sm:p-8 rounded-2xl border border-white/10 space-y-4 sm:space-y-6 bg-[#080305]"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[#B8002E] shrink-0" />
            <span>Driven by Curiosity & Systematic Execution</span>
          </h3>

          <div className="space-y-3 sm:space-y-4 text-slate-300 text-xs sm:text-base leading-relaxed">
            {PORTFOLIO_DATA.personal.bioStory.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-1 xs:grid-cols-2 gap-4 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 block text-[10px] sm:text-xs">PRIMARY FOCUS</span>
              <span className="text-[#E01E43] font-semibold">Full-Stack + Agentic AI</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 block text-[10px] sm:text-xs">CORE INTERESTS</span>
              <span className="text-white font-semibold">UI/UX & Systems Architecture</span>
            </div>
          </div>
        </motion.div>

        {/* Developer Profile Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 glass-panel p-5 sm:p-8 rounded-2xl border border-white/10 space-y-4 sm:space-y-6 font-mono text-xs bg-[#080305]"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
            <span className="text-slate-400 font-bold tracking-wider text-xs">DEVELOPER_PROFILE.SYS</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#E01E43] animate-pulse"></span>
          </div>

          <div className="space-y-3 divide-y divide-white/5">
            {Object.entries(PORTFOLIO_DATA.profilePanel).map(([key, val]) => (
              <div key={key} className="pt-2.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-slate-500 font-semibold tracking-wider text-[10px] sm:text-[11px] uppercase">
                  {key}
                </span>
                <span className="text-slate-200 font-medium text-left sm:text-right text-xs">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
