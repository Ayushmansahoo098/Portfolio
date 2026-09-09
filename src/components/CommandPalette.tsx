import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, FileText, Github, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTerminalCommand?: (cmd: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTerminalCommand,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navCommands = [
    { label: 'Go to Home', section: 'hero', icon: ArrowRight },
    { label: 'Go to About', section: 'about', icon: ArrowRight },
    { label: 'View Skills', section: 'skills', icon: ArrowRight },
    { label: 'View Projects', section: 'projects', icon: ArrowRight },
    { label: 'View Journey', section: 'journey', icon: ArrowRight },
    { label: 'View Certificates', section: 'certificates', icon: ArrowRight },
    { label: 'Contact Ayushman', section: 'contact', icon: ArrowRight },
  ];

  const actionCommands = [
    {
      label: 'Download Resume',
      icon: FileText,
      action: () => window.open(PORTFOLIO_DATA.personal.socials.resume, '_blank'),
    },
    {
      label: 'Open GitHub Profile',
      icon: Github,
      action: () => window.open(PORTFOLIO_DATA.personal.socials.github, '_blank'),
    },
    {
      label: 'Open LinkedIn Profile',
      icon: Linkedin,
      action: () => window.open(PORTFOLIO_DATA.personal.socials.linkedin, '_blank'),
    },
    {
      label: 'Send Email',
      icon: Mail,
      action: () => window.open(`mailto:${PORTFOLIO_DATA.personal.socials.email}`),
    },
  ];

  const terminalCmds = [
    { label: 'Run $ whoami in Terminal', cmd: 'whoami', icon: Terminal },
    { label: 'Run $ skills in Terminal', cmd: 'skills', icon: Terminal },
    { label: 'Run $ projects in Terminal', cmd: 'projects', icon: Terminal },
    { label: 'Run $ contact in Terminal', cmd: 'contact', icon: Terminal },
  ];

  const scrollToSection = (id: string) => {
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTerminalSelection = (cmd: string) => {
    onClose();
    if (onSelectTerminalCommand) {
      onSelectTerminalCommand(cmd);
    }
    const elem = document.getElementById('hero');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredNav = navCommands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredActions = actionCommands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredTerminal = terminalCmds.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-xl glass-panel rounded-xl border border-[#990026]/40 shadow-2xl overflow-hidden font-sans bg-[#080305]"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3 border-b border-white/10 bg-[#120508]">
            <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-medium"
            />
            <kbd className="hidden sm:inline-block text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-1 rounded border border-white/10 ml-2">
              ESC
            </kbd>
          </div>

          {/* Results Container */}
          <div className="max-h-[360px] overflow-y-auto p-2 space-y-4 font-mono text-xs">
            {/* Nav Commands */}
            {filteredNav.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Navigation
                </div>
                {filteredNav.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToSection(item.section)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#6D001A]/40 transition-colors text-left group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <item.icon className="w-4 h-4 text-[#B8002E] group-hover:translate-x-0.5 transition-transform" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-sans"># {item.section}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            {filteredActions.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </div>
                {filteredActions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onClose();
                      item.action();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#6D001A]/40 transition-colors text-left group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <item.icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300" />
                  </button>
                ))}
              </div>
            )}

            {/* Terminal Commands */}
            {filteredTerminal.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Terminal Commands
                </div>
                {filteredTerminal.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTerminalSelection(item.cmd)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#6D001A]/40 transition-colors text-left group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <item.icon className="w-4 h-4 text-[#E01E43]" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] text-[#B8002E] font-mono">${item.cmd}</span>
                  </button>
                ))}
              </div>
            )}

            {filteredNav.length === 0 && filteredActions.length === 0 && filteredTerminal.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No commands matching &quot;{query}&quot;
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
