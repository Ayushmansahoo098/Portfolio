import React from 'react';
import { Terminal, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#000000] py-16 px-4 sm:px-6 lg:px-8 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-white font-bold tracking-wider text-sm">
            <Terminal className="w-4 h-4 text-[#B8002E]" />
            <span>AYUSHMAN SAHOO</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            {PORTFOLIO_DATA.personal.title}
          </p>
          <p className="text-[#E01E43] text-[10px] tracking-widest uppercase font-bold">
            BUILD. LEARN. EXPERIMENT.
          </p>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <a
            href={PORTFOLIO_DATA.personal.socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub</span>
          </a>
          <a
            href={PORTFOLIO_DATA.personal.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center space-x-1.5"
          >
            <Linkedin className="w-4 h-4 text-white" />
            <span>LinkedIn</span>
          </a>
        </div>

        <div className="text-center md:text-right text-[11px] text-slate-500">
          <p>© 2026 AYUSHMAN SAHOO. ALL RIGHTS RESERVED.</p>
          <p className="mt-1 text-[10px] text-slate-600">DESIGNED AS AYUSHMAN.OS</p>
        </div>
      </div>
    </footer>
  );
};
