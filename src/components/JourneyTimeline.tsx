import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
          <Milestone className="w-4 h-4" />
          <span>CHAPTER 04 // TIMELINE</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          MY TECH JOURNEY
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
          From computer science fundamentals to shipping agentic AI & macOS systems.
        </p>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative border-l border-[#6D001A]/40 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
        {PORTFOLIO_DATA.timeline.map((item, idx) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#000000] border-2 border-[#E01E43] flex items-center justify-center group-hover:scale-125 group-hover:bg-[#6D001A] transition-all shadow-lg shadow-[#6D001A]/50">
              <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-white"></div>
            </div>

            {/* Card Content */}
            <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 bg-[#080305]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-sm font-black text-white px-3 py-1 rounded-full bg-[#6D001A] border border-[#990026]">
                  {item.year}
                </span>
                <span className="text-xs font-mono text-slate-500">{item.subtitle}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#E01E43] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Key Highlights */}
              <ul className="space-y-2 pt-2 border-t border-white/5 text-xs font-mono text-slate-400">
                {item.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-[#B8002E] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded bg-[#120508] text-slate-300 font-mono text-[10px] border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
