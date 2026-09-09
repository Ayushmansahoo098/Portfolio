import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Cpu, Globe, Rocket, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Globe': return Globe;
      case 'Rocket': return Rocket;
      default: return Award;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
        <Trophy className="w-4 h-4" />
        <span>UNLOCKED MILESTONES</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PORTFOLIO_DATA.achievements.map((ach, idx) => {
          const IconComp = getIcon(ach.iconName);
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 relative overflow-hidden group hover:border-[#990026]/60 transition-all bg-[#080305]"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#4A0012]/60 border border-[#990026]/40 flex items-center justify-center text-[#E01E43]">
                  <IconComp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                {ach.metric && (
                  <span className="font-mono text-xs font-bold text-white bg-[#6D001A] px-2.5 py-1 rounded-full border border-[#990026]">
                    {ach.metric}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  {ach.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#E01E43] transition-colors">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
