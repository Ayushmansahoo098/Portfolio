import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, ExternalLink, Code, Layers, Database, Cloud, Wrench } from 'lucide-react';
import { PORTFOLIO_DATA, SkillNode } from '../data/portfolioData';

interface TechConstellationProps {
  onSelectProject?: (projectId: string) => void;
}

export const TechConstellation: React.FC<TechConstellationProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const categories = [
    'ALL',
    'Programming',
    'Frontend',
    'Backend',
    'AI / ML',
    'Databases',
    'Cloud / DevOps',
    'Tools',
  ];

  const filteredNodes = PORTFOLIO_DATA.skillsConstellation.filter((node) => {
    if (selectedCategory === 'ALL') return true;
    return node.category === selectedCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming': return Code;
      case 'Frontend': return Layers;
      case 'Backend': return Cpu;
      case 'AI / ML': return Cpu;
      case 'Databases': return Database;
      case 'Cloud / DevOps': return Cloud;
      default: return Wrench;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
          <Cpu className="w-4 h-4" />
          <span>CHAPTER 02 // TECH CONSTELLATION</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          INTERACTIVE STACK
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl font-sans">
          Click any node to explore technical depth and surface connected real-world projects.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            data-cursor="FILTER"
            className={`px-4 py-2 rounded-full font-mono text-xs transition-all border ${
              selectedCategory === cat
                ? 'bg-[#6D001A] text-white font-bold border-[#990026] shadow-lg shadow-[#6D001A]/30'
                : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-[#990026]/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Constellation Grid Showcase */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredNodes.map((node) => {
          const IconComponent = getCategoryIcon(node.category);
          const isSelected = selectedNode?.id === node.id;

          return (
            <motion.button
              key={node.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedNode(node)}
              data-cursor="INSPECT NODE"
              className={`p-4 rounded-xl glass-panel text-left flex flex-col justify-between space-y-3 transition-all relative group border bg-[#080305] ${
                isSelected
                  ? 'border-[#990026] bg-[#4A0012]/60 shadow-xl shadow-[#6D001A]/30 ring-1 ring-[#B8002E]'
                  : 'border-white/10 hover:border-[#990026]/60 hover:bg-[#120508]'
              }`}
            >
              <div className="flex items-center justify-between">
                <IconComponent className="w-5 h-5 text-[#E01E43] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-white">
                  Lvl {node.level}
                </span>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold text-white group-hover:text-[#E01E43] transition-colors">
                  {node.name}
                </h4>
                <span className="text-[10px] text-slate-500 font-sans block truncate mt-0.5">
                  {node.category}
                </span>
              </div>

              {/* Related project pill */}
              {node.relatedProjects.length > 0 && (
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#B8002E] font-mono">
                  <span>{node.relatedProjects.length} Project(s)</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Node Details Panel Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#990026]/60 bg-[#0c0407] shadow-2xl relative space-y-4 font-sans"
          >
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-mono font-bold text-white">{selectedNode.name}</h3>
              <span className="px-3 py-1 rounded-full bg-[#6D001A] text-white border border-[#990026] text-xs font-mono">
                {selectedNode.category}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">How I Use It</h4>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">{selectedNode.howIUseIt}</p>
            </div>

            {selectedNode.relatedProjects.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider">Related Projects</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.relatedProjects.map((pId) => {
                    const projectObj = PORTFOLIO_DATA.projects.find((p) => p.id === pId);
                    if (!projectObj) return null;
                    return (
                      <button
                        key={pId}
                        onClick={() => {
                          setSelectedNode(null);
                          if (onSelectProject) onSelectProject(pId);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#4A0012]/60 hover:bg-[#6D001A] text-white border border-[#990026] text-xs font-mono flex items-center space-x-1.5 transition-all"
                      >
                        <span>{projectObj.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
