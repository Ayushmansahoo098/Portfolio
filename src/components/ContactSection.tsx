import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 sm:space-y-16">
      {/* Dramatic Header */}
      <div className="space-y-4 sm:space-y-6 text-left">
        <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
          <Mail className="w-4 h-4" />
          <span>CHAPTER 07 // INITIATE CONTACT</span>
        </div>

        <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-tight sm:leading-none">
          LET&apos;S BUILD
          <br />
          <span className="text-gradient">SOMETHING</span>
          <br />
          INTERESTING.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Links */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Whether you&apos;re building an AI/ML team, looking for an ambitious SDE candidate, or wanting to discuss 5G network reasoning or macOS systems, I&apos;m always ready to talk.
          </p>

          <div className="space-y-3 font-mono text-xs">
            <a
              href={PORTFOLIO_DATA.personal.socials.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN GITHUB"
              className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl glass-panel hover:border-[#990026] hover:bg-[#120508] text-slate-200 transition-all group bg-[#080305]"
            >
              <div className="flex items-center space-x-3 truncate">
                <Github className="w-5 h-5 text-[#E01E43] group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">github.com/Ayushmansahoo098</span>
              </div>
              <span className="text-slate-500 shrink-0 ml-2">→</span>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN LINKEDIN"
              className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl glass-panel hover:border-[#990026] hover:bg-[#120508] text-slate-200 transition-all group bg-[#080305]"
            >
              <div className="flex items-center space-x-3 truncate">
                <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">linkedin.com/in/ayush-man-sahoo</span>
              </div>
              <span className="text-slate-500 shrink-0 ml-2">→</span>
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.socials.email}`}
              data-cursor="SEND MESSAGE"
              className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl glass-panel hover:border-[#990026] hover:bg-[#120508] text-slate-200 transition-all group bg-[#080305]"
            >
              <div className="flex items-center space-x-3 truncate">
                <Mail className="w-5 h-5 text-[#B8002E] group-hover:scale-110 transition-transform shrink-0" />
                <span className="truncate">{PORTFOLIO_DATA.personal.socials.email}</span>
              </div>
              <span className="text-slate-500 shrink-0 ml-2">→</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-2xl border border-white/10 space-y-6 bg-[#080305]">
          <h3 className="text-lg sm:text-xl font-bold text-white font-mono flex items-center space-x-2">
            <span>DIRECT MESSAGE</span>
          </h3>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 sm:p-8 rounded-xl bg-[#4A0012]/40 border border-[#990026] text-center space-y-3 font-mono text-xs"
            >
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#E01E43] mx-auto" />
              <h4 className="text-base sm:text-lg font-bold text-white">MESSAGE TRANSMITTED</h4>
              <p className="text-slate-300 text-xs">
                Thank you for reaching out! I will respond to your message promptly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase tracking-wider block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Mercer"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#990026] transition-colors text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#990026] transition-colors text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 text-[10px] uppercase tracking-wider block">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hi Ayushman, let's discuss an engineering opportunity..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-[#990026] transition-colors text-xs"
                />
              </div>

              <button
                type="submit"
                data-cursor="SEND MESSAGE"
                className="w-full py-3.5 rounded-xl bg-[#6D001A] hover:bg-[#8E0022] active:scale-95 text-white font-bold text-xs font-mono flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#6D001A]/30 border border-[#990026]"
              >
                <span>TRANSMIT MESSAGE</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
