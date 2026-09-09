import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { PORTFOLIO_DATA, Certificate } from '../data/portfolioData';

export const CertificatesGallery: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>('ALL');

  const categories = ['ALL', 'Programming Languages', 'AI / ML'];

  const filteredCerts = PORTFOLIO_DATA.certificates.filter((cert) => {
    if (selectedCat === 'ALL') return true;
    return cert.category === selectedCat;
  });

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
          <Award className="w-4 h-4" />
          <span>CHAPTER 05 // CERTIFICATIONS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          CREDENTIAL WALL
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
          Verified industry credentials across autonomous agentic AI and programming paradigms.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            data-cursor="FILTER"
            className={`px-4 py-2 rounded-full font-mono text-xs transition-all border ${
              selectedCat === cat
                ? 'bg-[#6D001A] text-white font-bold border-[#990026] shadow-lg shadow-[#6D001A]/30'
                : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-[#990026]/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Floating Perspective Wall Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <motion.div
            key={cert.id}
            layout
            whileHover={{ scale: 1.03, rotateY: 5, rotateX: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setActiveCert(cert)}
            data-cursor="VERIFY CREDENTIAL"
            className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 cursor-pointer group relative overflow-hidden flex flex-col justify-between bg-[#080305]"
            style={{ perspective: 1000 }}
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#6D001A] text-white border border-[#990026] text-xs font-mono font-bold">
                {cert.badge}
              </span>
              <span className="font-mono text-xs text-slate-500">{cert.date}</span>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-[#E01E43] transition-colors">
                {cert.title}
              </h3>
              <p className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8002E]" />
                <span>{cert.issuer}</span>
              </p>
            </div>

            {/* Click preview callout */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#E01E43] group-hover:underline">
              <span>VIEW PREVIEW</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {activeCert && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-[#990026]/60 bg-[#080305] shadow-2xl relative space-y-6 font-sans"
            >
              <button
                onClick={() => setActiveCert(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-[#6D001A] text-white border border-[#990026] text-xs font-mono">
                  {activeCert.category}
                </span>
                <h3 className="text-2xl font-bold text-white pt-2">{activeCert.title}</h3>
                <p className="text-slate-400 text-sm font-mono">{activeCert.issuer} — Issued {activeCert.date}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#120508] border border-white/10 font-mono text-xs text-slate-300 space-y-2">
                <div className="flex items-center space-x-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#E01E43]" />
                  <span className="font-bold">VERIFIED AUTHENTICITY</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Official completion credential issued by {activeCert.issuer}. Verified for technical competency.
                </p>
              </div>

              {activeCert.verificationUrl && (
                <a
                  href={activeCert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-[#6D001A] hover:bg-[#8E0022] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#6D001A]/30 border border-[#990026]"
                >
                  <span>VERIFY CREDENTIAL LINK</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
