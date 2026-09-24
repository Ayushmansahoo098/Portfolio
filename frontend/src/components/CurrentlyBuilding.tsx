import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const CurrentlyBuilding: React.FC = () => {
  const cb = PORTFOLIO_DATA.currentlyBuilding;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 sm:p-10 rounded-2xl border border-[#990026]/50 bg-[#080305] shadow-2xl relative overflow-hidden space-y-8"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#6D001A]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E01E43] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6D001A]"></span>
            </span>
            <span className="font-mono text-xs font-bold text-[#E01E43] uppercase tracking-widest">
              CURRENTLY BUILDING // LIVE RADAR
            </span>
          </div>

          <span className="font-mono text-xs text-slate-400">
            {cb.projectName} — ACTIVE SYSTEM
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="text-white font-bold tracking-wider">
              PROJECT STATUS — {cb.projectName}
            </span>
            <span className="text-white font-bold">{cb.progressPercent}% COMPLETE</span>
          </div>

          <div className="w-full h-3 bg-slate-950 rounded-full p-0.5 border border-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${cb.progressPercent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#6D001A] via-[#990026] to-[#E01E43] rounded-full shadow-lg shadow-[#6D001A]/50"
            />
          </div>

          <p className="text-xs text-slate-400 font-sans pt-1">
            {cb.statusText}
          </p>
        </div>

        {/* Exploring Topics Grid */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block">
            Active Exploration & Research Domains
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {cb.exploringTopics.map((topic, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#120508] border border-white/5 font-mono text-xs text-white flex items-center justify-between group hover:border-[#990026]/60 transition-colors"
              >
                <span>{topic}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#E01E43] transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
