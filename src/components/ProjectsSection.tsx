import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ExternalLink, Github, X, ChevronRight, Layers, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  selectedProjectId?: string | null;
  onClearSelectedProject?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  selectedProjectId,
  onClearSelectedProject,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'AI' | 'WEB' | 'SYSTEMS' | 'EXPERIMENTS'>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  React.useEffect(() => {
    if (selectedProjectId) {
      const found = PORTFOLIO_DATA.projects.find((p) => p.id === selectedProjectId);
      if (found) setActiveModalProject(found);
    }
  }, [selectedProjectId]);

  const categories: Array<'ALL' | 'AI' | 'WEB' | 'SYSTEMS' | 'EXPERIMENTS'> = [
    'ALL',
    'AI',
    'WEB',
    'SYSTEMS',
    'EXPERIMENTS',
  ];

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (filter === 'ALL') return true;
    return p.category === filter;
  });

  const closeModal = () => {
    setActiveModalProject(null);
    if (onClearSelectedProject) onClearSelectedProject();
  };

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
          <Rocket className="w-4 h-4" />
          <span>CHAPTER 03 // FEATURED OPERATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
          FEATURED OPERATIONS
        </h2>
        <p className="text-slate-400 text-xs sm:text-base max-w-2xl font-sans">
          Production systems, AI agents, high-frequency scrapers, and macOS operating layers.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            data-cursor="FILTER"
            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs transition-all border ${
              filter === cat
                ? 'bg-[#6D001A] text-white font-bold border-[#990026] shadow-lg shadow-[#6D001A]/30'
                : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-[#990026]/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            onClick={() => setActiveModalProject(project)}
            data-cursor="VIEW OPERATION"
            className="glass-panel glass-panel-hover p-5 sm:p-8 rounded-2xl border border-white/10 space-y-4 sm:space-y-6 cursor-pointer group relative overflow-hidden flex flex-col justify-between bg-[#080305]"
          >
            {/* Top Bar: Badge + Year */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#4A0012]/80 text-white border border-[#990026]/40 text-[10px] sm:text-xs font-mono font-semibold">
                OPERATIONAL // {project.category}
              </span>
              <span className="font-mono text-xs text-slate-500">{project.year}</span>
            </div>

            {/* Project Title & Short Description */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#E01E43] transition-colors flex items-center justify-between">
                <span>{project.name}</span>
                <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#E01E43] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans line-clamp-3">
                {project.shortDescription}
              </p>
            </div>

            {/* Metrics pills if present */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-[10px] sm:text-[11px]">
                {project.metrics.slice(0, 2).map((m, idx) => (
                  <div key={idx} className="bg-[#120508] p-2 rounded-lg border border-white/5">
                    <span className="text-slate-500 block text-[9px]">{m.label}</span>
                    <span className="text-white font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 text-[10px] font-mono border border-white/5"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-500 text-[10px] font-mono">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Immersive Case Study Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto p-5 sm:p-10 rounded-2xl border border-[#990026]/60 bg-[#080305] shadow-2xl space-y-6 sm:space-y-8 relative font-sans my-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-white p-2 rounded-xl bg-[#4A0012]/60 hover:bg-[#6D001A] transition-colors border border-[#990026]/40"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-3 sm:space-y-4 pr-10 sm:pr-12">
                <div className="flex items-center space-x-3 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#6D001A] text-white border border-[#990026] font-bold text-[10px] sm:text-xs">
                    OPERATIONAL RECORD // {activeModalProject.category}
                  </span>
                  <span className="text-slate-500 text-xs">Year {activeModalProject.year}</span>
                </div>
                <h3 className="text-2xl sm:text-5xl font-black text-white tracking-tight">
                  {activeModalProject.name}
                </h3>
                <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                  {activeModalProject.shortDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                {activeModalProject.liveDemoUrl && (
                  <a
                    href={activeModalProject.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="LIVE DEMO"
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#6D001A] hover:bg-[#8E0022] active:scale-95 text-white font-mono font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-[#6D001A]/30 border border-[#990026]"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {activeModalProject.sourceCodeUrl && (
                  <a
                    href={activeModalProject.sourceCodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="GITHUB"
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 border border-white/10 font-mono font-semibold text-xs flex items-center space-x-2 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>SOURCE CODE</span>
                  </a>
                )}
              </div>

              {/* Key Metrics Grid */}
              {activeModalProject.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-[#120508] border border-white/10 font-mono">
                  {activeModalProject.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-1 text-left">
                      <span className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider block">
                        {m.label}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Structured Case Study Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-xs sm:text-sm leading-relaxed">
                {/* Problem & Solution */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#120508] border border-white/5 space-y-2">
                    <h4 className="font-mono text-xs font-bold text-[#E01E43] uppercase tracking-wider">
                      PROBLEM
                    </h4>
                    <p className="text-slate-300">{activeModalProject.problem}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#120508] border border-white/5 space-y-2">
                    <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      SOLUTION
                    </h4>
                    <p className="text-slate-300">{activeModalProject.solution}</p>
                  </div>
                </div>

                {/* Architecture Breakdown */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#120508] border border-white/5 space-y-3">
                  <h4 className="font-mono text-xs font-bold text-[#B8002E] uppercase tracking-wider flex items-center space-x-2">
                    <Layers className="w-4 h-4" />
                    <span>ARCHITECTURE HIGHLIGHTS</span>
                  </h4>
                  <ul className="space-y-2 text-[11px] sm:text-xs font-mono text-slate-300">
                    {activeModalProject.architecture.map((arch, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#E01E43] font-bold">›</span>
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Implementation & Result */}
              <div className="space-y-3 sm:space-y-4 border-t border-white/10 pt-6">
                <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Implementation & Result
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {activeModalProject.implementation}
                </p>
                <div className="p-4 rounded-xl bg-[#4A0012]/40 border border-[#990026] text-white text-xs sm:text-sm font-sans flex items-start space-x-3">
                  <ShieldCheck className="w-5 h-5 text-[#E01E43] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold font-mono text-xs text-[#E01E43] block mb-1">
                      VERIFIED RESULT
                    </span>
                    {activeModalProject.result}
                  </div>
                </div>
              </div>

              {/* Tech Stack List */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeModalProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 sm:px-3 py-1 rounded bg-[#120508] border border-white/10 text-white font-mono text-[10px] sm:text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
