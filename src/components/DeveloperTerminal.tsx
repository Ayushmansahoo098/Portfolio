import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, CheckCircle2, CornerDownLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface DeveloperTerminalProps {
  initialCommand?: string;
  onSudoHireSuccess?: () => void;
}

export const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({
  initialCommand,
  onSudoHireSuccess,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string; isSecret?: boolean }>>([
    {
      cmd: 'whoami',
      output: PORTFOLIO_DATA.terminalCommands.whoami,
    },
  ]);
  const [isSudoGranted, setIsSudoGranted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCommand) {
      handleRunCommand(initialCommand);
    }
  }, [initialCommand]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRunCommand = (rawCmd: string) => {
    const cleanCmd = rawCmd.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output = '';
    let isSecret = false;

    if (cleanCmd === 'whoami') {
      output = PORTFOLIO_DATA.terminalCommands.whoami;
    } else if (cleanCmd === 'skills') {
      output = PORTFOLIO_DATA.terminalCommands.skills;
    } else if (cleanCmd === 'projects') {
      output = PORTFOLIO_DATA.terminalCommands.projects;
    } else if (cleanCmd === 'journey') {
      output = PORTFOLIO_DATA.terminalCommands.journey;
    } else if (cleanCmd === 'contact') {
      output = PORTFOLIO_DATA.terminalCommands.contact;
    } else if (cleanCmd === 'sudo hire ayushman') {
      output = `[ACCESS GRANTED]
---------------------------------------------------
STATUS      :: PRIORITY CANDIDATE UNLOCKED
ROLE FIT    :: Software Developer / AI ML Engineer
NEXT STEP   :: Scheduling Interview & Initial Contact
CONTACT     :: ayushmansahoo098@gmail.com
---------------------------------------------------
"Let's build intelligent systems together."`;
      isSecret = true;
      setIsSudoGranted(true);
      if (onSudoHireSuccess) onSudoHireSuccess();
    } else if (cleanCmd === 'help') {
      output = `Available commands:
  whoami    - Brief overview of Ayushman
  skills    - Core technical stack
  projects  - Featured systems & AI projects
  journey   - Career timeline milestones
  contact   - Links & contact details
  clear     - Clear terminal logs
  sudo hire ayushman - Try it!`;
    } else {
      output = `command not found: ${cleanCmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { cmd: cleanCmd, output, isSecret }]);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunCommand(inputVal);
  };

  const presetButtons = ['whoami', 'skills', 'projects', 'journey', 'contact', 'sudo hire ayushman'];

  return (
    <div className="w-full glass-panel rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-xs text-slate-200 bg-[#080305]">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#120508] border-b border-white/10">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-[#B8002E]" />
          <span className="text-white font-semibold text-xs tracking-wider">
            AYUSHMAN // TERMINAL
          </span>
          {isSudoGranted && (
            <span className="flex items-center space-x-1 bg-[#6D001A] text-white border border-[#990026] text-[10px] px-2 py-0.5 rounded-full font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>ACCESS GRANTED</span>
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setHistory([])}
            className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
          >
            clear
          </button>
          <div className="flex space-x-1.5 ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6D001A] inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#990026] inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white inline-block"></span>
          </div>
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="p-2.5 bg-[#050103] border-b border-white/5 flex flex-wrap gap-1.5">
        <span className="text-[10px] text-slate-500 self-center mr-1">PRESETS:</span>
        {presetButtons.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            data-cursor="RUN CMD"
            className={`px-2 py-1 rounded text-[11px] transition-all border ${
              cmd === 'sudo hire ayushman'
                ? 'bg-[#6D001A] hover:bg-[#8E0022] text-white border-[#990026]'
                : 'bg-slate-900/80 hover:bg-[#4A0012] text-slate-200 border-white/10 hover:border-[#990026]'
            }`}
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 max-h-[300px] overflow-y-auto space-y-3 font-mono text-slate-300">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[#B8002E]">
              <span className="text-slate-500">ayushman@os:~$</span>
              <span className="font-bold text-white">{item.cmd}</span>
            </div>
            <pre
              className={`whitespace-pre-wrap leading-relaxed p-2.5 rounded-lg border text-[11px] ${
                item.isSecret
                  ? 'bg-[#6D001A]/40 text-white border-[#990026] font-semibold'
                  : 'bg-slate-950/80 text-slate-200 border-white/5'
              }`}
            >
              {item.output}
            </pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Line */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center px-4 py-2.5 bg-[#120508] border-t border-white/10"
      >
        <span className="text-[#B8002E] mr-2">ayushman@os:~$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type 'whoami', 'projects', 'sudo hire ayushman'..."
          className="w-full bg-transparent text-white placeholder-slate-600 focus:outline-none text-xs font-mono"
        />
        <button type="submit" className="text-slate-500 hover:text-white ml-2">
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
