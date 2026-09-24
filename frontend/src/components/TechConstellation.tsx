import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  X,
  ExternalLink,
  Code,
  Layers,
  Database,
  Cloud,
  Wrench,
  Terminal,
  Search,
  Sparkles,
  Zap,
  LayoutGrid,
  Grid,
  Bot,
  Flame,
  Globe,
  GitBranch,
  ShieldCheck,
  Activity,
  ArrowRight
} from 'lucide-react';
import { PORTFOLIO_DATA, SkillNode } from '../data/portfolioData';

interface TechConstellationProps {
  onSelectProject?: (projectId: string) => void;
}

export const TechConstellation: React.FC<TechConstellationProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [viewMode, setViewMode] = useState<'bento' | 'grid'>('bento');

  const categories = [
    { name: 'ALL', icon: Terminal },
    { name: 'AI / ML', icon: Bot },
    { name: 'Frontend', icon: Layers },
    { name: 'Backend', icon: Cpu },
    { name: 'Programming', icon: Code },
    { name: 'Databases', icon: Database },
    { name: 'Cloud / DevOps', icon: Cloud },
    { name: 'Tools', icon: Wrench },
  ];

  const filteredNodes = PORTFOLIO_DATA.skillsConstellation.filter((node) => {
    const matchesCategory = selectedCategory === 'ALL' || node.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.howIUseIt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming': return Code;
      case 'Frontend': return Layers;
      case 'Backend': return Cpu;
      case 'AI / ML': return Bot;
      case 'Databases': return Database;
      case 'Cloud / DevOps': return Cloud;
      case 'Tools': return Wrench;
      default: return Sparkles;
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'AI / ML': return 'text-[#E01E43] border-[#E01E43]/40 bg-[#E01E43]/10';
      case 'Frontend': return 'text-sky-400 border-sky-500/40 bg-sky-500/10';
      case 'Backend': return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 'Programming': return 'text-purple-400 border-purple-500/40 bg-purple-500/10';
      case 'Databases': return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      case 'Cloud / DevOps': return 'text-indigo-400 border-indigo-500/40 bg-indigo-500/10';
      default: return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
    }
  };

  // Group nodes by category for Bento View when specific category is chosen
  const groupedCategories = ['AI / ML', 'Frontend', 'Backend', 'Programming', 'Databases', 'Cloud / DevOps', 'Tools'];

  // All nodes array split for top/bottom marquee tracks
  const allNodes = PORTFOLIO_DATA.skillsConstellation;
  const marqueeTrack1 = allNodes.slice(0, Math.ceil(allNodes.length / 2));
  const marqueeTrack2 = allNodes.slice(Math.ceil(allNodes.length / 2));

  // Render Tech Brand Logos (Clean White/SVG icons)
  const renderTechLogo = (nodeId: string) => {
    switch (nodeId) {
      case 'python':
        return (
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M11.927 0C6.136 0 6.502 2.518 6.502 2.518v2.607h5.53v.778H4.27S0 5.378 0 11.233c0 5.857 3.73 5.658 3.73 5.658h2.23v-3.136s-.12-3.734 3.655-3.734h5.58v-5.59S15.655 0 11.927 0zM8.88 1.764a1.002 1.002 0 1 1 0 2.004 1.002 1.002 0 0 1 0-2.004zM12.073 24c5.79 0 5.425-2.518 5.425-2.518v-2.607h-5.53v-.778h7.763s4.27.478 4.27-5.377c0-5.856-3.73-5.658-3.73-5.658h-2.23v3.136s.12 3.734-3.655 3.734h-5.58v5.59s-.46 4.478 3.267 4.478zm3.047-1.764a1.002 1.002 0 1 1 0-2.004 1.002 1.002 0 0 1 0 2.004z"/>
          </svg>
        );
      case 'typescript':
        return (
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.432 17.518c.677.37 1.398.673 2.164.877-.253 1.108-.85 1.944-1.789 2.508-1.004.606-2.186.73-3.546.372-1.36-.358-2.316-1.128-2.868-2.31-.383-.822-.447-2.09-.191-3.805.277-1.854.945-3.238 2.005-4.153.978-.844 2.16-1.173 3.548-.987 1.258.17 2.222.756 2.89 1.76.29.435.474.96.55 1.576h-2.333c-.044-.316-.145-.572-.303-.768-.266-.33-.666-.5-1.202-.51-.676-.01-1.253.255-1.73.795-.478.54-.766 1.342-.865 2.406-.118 1.284-.002 2.22.348 2.808.35.588.882.89 1.597.905.6.012 1.187-.14 1.761-.455z"/>
          </svg>
        );
      case 'react':
        return (
          <svg className="w-7 h-7 fill-current animate-spin-slow" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="2.1"/>
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <ellipse cx="12" cy="12" rx="10" ry="4.2"/>
              <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/>
              <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/>
            </g>
          </svg>
        );
      case 'next':
        return (
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.83 17.51-5.33-7.58v7.58H10.4V6.49h2.1l5.33 7.58V6.49h2.1v11.02h-2.1z"/>
          </svg>
        );
      case 'tailwind':
        return (
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
          </svg>
        );
      case 'node':
        return (
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12 1.5a1.5 1.5 0 0 0-.75.2L2.75 6.45a1.5 1.5 0 0 0-.75 1.3v9.5a1.5 1.5 0 0 0 .75 1.3l8.5 4.75a1.5 1.5 0 0 0 1.5 0l8.5-4.75a1.5 1.5 0 0 0 .75-1.3v-9.5a1.5 1.5 0 0 0-.75-1.3L12.75 1.7A1.5 1.5 0 0 0 12 1.5zm-1 3.5v7.2l-5.5 3.1V8.5L11 5zm2 0 5.5 3.5v6.8l-5.5-3.1V5z"/>
          </svg>
        );
      case 'fastapi':
        return <Zap className="w-7 h-7 text-emerald-400" />;
      case 'groq':
      case 'llms':
        return <Bot className="w-7 h-7 text-[#E01E43]" />;
      case 'docker':
        return (
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M13.98 11.08h-2.14v-2.1h2.14v2.1zm-3.21 0H8.62v-2.1h2.15v2.1zm-3.22 0H5.41v-2.1h2.14v2.1zm6.43-3.18h-2.14V5.8h2.14v2.1zm-3.21 0H8.62V5.8h2.15v2.1zm-3.22 0H5.41V5.8h2.14v2.1zm9.64 3.18h-2.14v-2.1h2.14v2.1zm0-3.18h-2.14V5.8h2.14v2.1zm3.22 3.18h-2.14v-2.1h2.14v2.1zM.5 13.92c.6 3.1 3.42 5.58 6.8 5.58 5.75 0 9.77-3.9 10.63-7.5h.92c.87 0 1.63-.35 2.15-.92-.6-.28-1.28-.42-1.98-.42.27-.47.42-1.02.42-1.6 0-.25-.03-.5-.08-.74-.75.48-1.64.76-2.6.76h-.88c-.96-2.48-3.4-4.24-6.28-4.24H.5v9.06z"/>
          </svg>
        );
      case 'firebase':
        return <Flame className="w-7 h-7 text-amber-400" />;
      case 'vercel':
        return (
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12 1L24 22H0L12 1Z"/>
          </svg>
        );
      case 'playwright':
        return <Globe className="w-7 h-7 text-sky-400" />;
      case 'git':
        return <GitBranch className="w-7 h-7 text-rose-400" />;
      case 'vite':
        return <Zap className="w-7 h-7 text-purple-400" />;
      default:
        return <Code className="w-7 h-7 text-slate-300" />;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>CHAPTER 02 // ARCHITECTURE MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-6xl font-extrabold text-white tracking-tight">
            TECH STACK & SKILLS
          </h2>
          <p className="text-slate-400 text-xs sm:text-base max-w-2xl font-sans leading-relaxed">
            Interactive breakdown of core engineering domains, frameworks, and agentic AI architectures. Click any node to inspect real-world project links.
          </p>
        </div>

        {/* View Mode Toggle & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Live Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tech stack..."
              className="w-full bg-[#080305] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#990026] transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-[#080305] border border-white/10 p-1 rounded-xl shrink-0 font-mono text-xs">
            <button
              onClick={() => setViewMode('bento')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'bento'
                  ? 'bg-[#6D001A] text-white font-bold border border-[#990026]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SECTORS</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#6D001A] text-white font-bold border border-[#990026]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">MATRIX</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const IconComp = cat.icon;
          const count =
            cat.name === 'ALL'
              ? PORTFOLIO_DATA.skillsConstellation.length
              : PORTFOLIO_DATA.skillsConstellation.filter((n) => n.category === cat.name).length;

          return (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              data-cursor="FILTER MATRIX"
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl font-mono text-xs transition-all border ${
                selectedCategory === cat.name
                  ? 'bg-[#6D001A] text-white font-bold border-[#990026] shadow-lg shadow-[#6D001A]/30'
                  : 'bg-[#080305] text-slate-400 border-white/10 hover:border-[#990026]/50 hover:text-white'
              }`}
            >
              <IconComp className={`w-3.5 h-3.5 ${selectedCategory === cat.name ? 'text-white' : 'text-[#E01E43]'}`} />
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* ALL CATEGORY VIEW: INFINITE SCROLLING TECH MARQUEE + STACK RADAR SUMMARY */}
      {/* ========================================================================= */}
      {selectedCategory === 'ALL' && (
        <div className="space-y-8">
          {/* Tech Stack Distribution Summary Bar */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#080305] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#E01E43]" />
                <span className="font-bold text-white tracking-wider">FULL STACK COVERAGE GRAPH</span>
              </span>
              <span className="text-[10px] text-slate-500">24 ACTIVE MODULES</span>
            </div>

            {/* Segmented Skill Density Bar */}
            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden flex p-0.5 gap-1 border border-white/5">
              <div className="h-full bg-[#E01E43] rounded-xs" style={{ width: '20%' }} title="AI / ML (20%)" />
              <div className="h-full bg-sky-400 rounded-xs" style={{ width: '25%' }} title="Frontend (25%)" />
              <div className="h-full bg-emerald-400 rounded-xs" style={{ width: '20%' }} title="Backend (20%)" />
              <div className="h-full bg-purple-400 rounded-xs" style={{ width: '15%' }} title="Programming (15%)" />
              <div className="h-full bg-amber-400 rounded-xs" style={{ width: '10%' }} title="Databases (10%)" />
              <div className="h-full bg-indigo-400 rounded-xs" style={{ width: '10%' }} title="Cloud / Tools (10%)" />
            </div>

            <div className="flex flex-wrap gap-4 text-[10px] text-slate-400 pt-1">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E01E43]" />
                <span>AI / ML</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Frontend</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Backend</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>Languages</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Databases</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>DevOps & Tools</span>
              </span>
            </div>
          </div>

          {/* INFINITE TECH TICKER BAR CONTAINER */}
          <div className="glass-panel py-6 sm:py-8 rounded-2xl border border-white/10 bg-[#050103] space-y-6 relative overflow-hidden">
            <div className="px-6 flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-white/10">
              <span className="flex items-center space-x-2 text-white font-bold">
                <Activity className="w-4 h-4 text-[#E01E43] animate-pulse" />
                <span>INFINITE TECH STACK TICKER // PAUSE ON HOVER</span>
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">CLICK LOGO TO INSPECT</span>
            </div>

            {/* MARQUEE ROW 1: LEFT SCROLLING */}
            <div className="relative overflow-hidden py-1">
              {/* Fade Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#050103] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#050103] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee-left flex items-center">
                {[...marqueeTrack1, ...marqueeTrack1, ...marqueeTrack1, ...marqueeTrack1].map((node, idx) => (
                  <React.Fragment key={`track1-${node.id}-${idx}`}>
                    <div
                      onClick={() => setSelectedNode(node)}
                      className="flex items-center space-x-3 px-6 sm:px-8 py-2 cursor-pointer group shrink-0 transition-all hover:scale-105"
                    >
                      <div className="text-white group-hover:text-[#E01E43] transition-colors">
                        {renderTechLogo(node.id)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs sm:text-sm font-bold text-white group-hover:text-[#E01E43] transition-colors whitespace-nowrap">
                          {node.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                          {node.category} • Lvl {node.level}/5
                        </span>
                      </div>
                    </div>
                    {/* Vertical White Separator Line */}
                    <div className="h-7 sm:h-8 w-[1px] bg-white/20 shrink-0" />
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* MARQUEE ROW 2: RIGHT SCROLLING */}
            <div className="relative overflow-hidden py-1 pt-2 border-t border-white/5">
              {/* Fade Edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#050103] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#050103] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee-right flex items-center">
                {[...marqueeTrack2, ...marqueeTrack2, ...marqueeTrack2, ...marqueeTrack2].map((node, idx) => (
                  <React.Fragment key={`track2-${node.id}-${idx}`}>
                    <div
                      onClick={() => setSelectedNode(node)}
                      className="flex items-center space-x-3 px-6 sm:px-8 py-2 cursor-pointer group shrink-0 transition-all hover:scale-105"
                    >
                      <div className="text-white group-hover:text-[#E01E43] transition-colors">
                        {renderTechLogo(node.id)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-xs sm:text-sm font-bold text-white group-hover:text-[#E01E43] transition-colors whitespace-nowrap">
                          {node.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                          {node.category} • Lvl {node.level}/5
                        </span>
                      </div>
                    </div>
                    {/* Vertical White Separator Line */}
                    <div className="h-7 sm:h-8 w-[1px] bg-white/20 shrink-0" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SPECIFIC CATEGORY VIEW: BENTO DOMAIN GRID FOR INDIVIDUAL CATEGORIES */}
      {/* ========================================================================= */}
      {selectedCategory !== 'ALL' && viewMode === 'bento' && (
        <div className="space-y-8">
          {groupedCategories
            .filter((c) => c === selectedCategory)
            .map((catName) => {
              const nodesInCat = filteredNodes.filter((node) => node.category === catName);
              if (nodesInCat.length === 0) return null;

              const CategoryIcon = getCategoryIcon(catName);
              const badgeStyle = getCategoryBadgeColor(catName);

              return (
                <motion.div
                  key={catName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel p-5 sm:p-7 rounded-2xl border border-white/10 bg-[#080305] space-y-4 relative overflow-hidden"
                >
                  {/* Sector Header Banner */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-lg bg-[#6D001A]/40 border border-[#990026]/50 text-[#E01E43]">
                        <CategoryIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h3 className="font-mono text-sm sm:text-base font-bold text-white tracking-wide">
                          {catName.toUpperCase()} DOMAIN
                        </h3>
                        <span className="text-[10px] font-mono text-slate-500 block">
                          {nodesInCat.length} ACTIVE MODULE(S)
                        </span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold ${badgeStyle}`}>
                      {catName}
                    </span>
                  </div>

                  {/* Cards Grid inside Sector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {nodesInCat.map((node) => {
                      const isSelected = selectedNode?.id === node.id;

                      return (
                        <motion.div
                          key={node.id}
                          whileHover={{ y: -3, scale: 1.01 }}
                          onClick={() => setSelectedNode(node)}
                          className={`p-4 rounded-xl text-left flex flex-col justify-between space-y-3 cursor-pointer transition-all border relative overflow-hidden group bg-[#0d0508] ${
                            isSelected
                              ? 'border-[#E01E43] bg-[#4A0012]/70 shadow-xl ring-1 ring-[#E01E43]'
                              : 'border-white/10 hover:border-[#990026] hover:bg-[#15070c]'
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#6D001A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                          <div className="flex items-start justify-between gap-2 relative z-10">
                            <div className="flex items-center space-x-3">
                              <div className="text-white group-hover:text-[#E01E43] transition-colors">
                                {renderTechLogo(node.id)}
                              </div>
                              <div>
                                <h4 className="font-mono text-sm font-bold text-white group-hover:text-[#E01E43] transition-colors">
                                  {node.name}
                                </h4>
                                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                                  {node.category}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end shrink-0">
                              <span className="text-[10px] font-mono font-bold text-[#E01E43]">
                                Lvl {node.level}/5
                              </span>
                              <div className="flex space-x-0.5 mt-1">
                                {[1, 2, 3, 4, 5].map((lvl) => (
                                  <span
                                    key={lvl}
                                    className={`w-1.5 h-3 rounded-xs transition-all ${
                                      lvl <= node.level
                                        ? 'bg-[#E01E43] shadow-sm shadow-[#E01E43]/50'
                                        : 'bg-slate-800'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans relative z-10">
                            {node.howIUseIt}
                          </p>

                          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono relative z-10">
                            {node.relatedProjects.length > 0 ? (
                              <span className="text-[#E01E43] font-semibold flex items-center space-x-1">
                                <Zap className="w-3 h-3 inline" />
                                <span>{node.relatedProjects.length} Project(s) Linked</span>
                              </span>
                            ) : (
                              <span className="text-slate-500 text-[10px]">Core Foundation</span>
                            )}
                            <span className="text-[10px] text-slate-400 group-hover:text-white flex items-center space-x-1 font-bold">
                              <span>INSPECT</span>
                              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
        </div>
      )}

      {/* MATRIX GRID VIEW WHEN IN MATRIX MODE */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
          {filteredNodes.map((node) => {
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
                  <div className="text-white group-hover:text-[#E01E43] transition-colors">
                    {renderTechLogo(node.id)}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#E01E43]">
                    Lvl {node.level}
                  </span>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-white group-hover:text-[#E01E43] transition-colors truncate">
                    {node.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-sans block truncate mt-0.5">
                    {node.category}
                  </span>
                </div>

                <div className="flex space-x-0.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <span
                      key={lvl}
                      className={`h-1 flex-1 rounded-full ${
                        lvl <= node.level ? 'bg-[#E01E43]' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>

                {node.relatedProjects.length > 0 && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[#E01E43] font-mono">
                    <span>{node.relatedProjects.length} Project(s)</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Selected Node Details Panel Modal (HUD) */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#990026] bg-[#0c0407] shadow-2xl relative space-y-5 font-sans max-w-xl w-full text-slate-200 overflow-hidden"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center space-x-3 pr-10">
                <div className="p-3 rounded-xl bg-[#6D001A] border border-[#990026] text-white">
                  {renderTechLogo(selectedNode.id)}
                </div>
                <div>
                  <h3 className="text-2xl font-mono font-bold text-white tracking-wide">{selectedNode.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#6D001A]/60 text-white border border-[#990026] text-[10px] font-mono">
                      {selectedNode.category}
                    </span>
                    <span className="text-xs font-mono text-[#E01E43] font-bold">
                      PROFICIENCY LEVEL {selectedNode.level} / 5
                    </span>
                  </div>
                </div>
              </div>

              {/* Energy Meter */}
              <div className="p-4 rounded-xl bg-[#080305] border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">MASTERY SCORE</span>
                  <span className="text-[#E01E43] font-bold">{selectedNode.level * 20}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex gap-1 p-0.5">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-full flex-1 rounded-xs transition-all ${
                        lvl <= selectedNode.level
                          ? 'bg-gradient-to-r from-[#6D001A] to-[#E01E43]'
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Usage Context */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#E01E43]" />
                  <span>Practical Implementation Context</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans p-3.5 rounded-xl bg-slate-950/80 border border-white/5">
                  {selectedNode.howIUseIt}
                </p>
              </div>

              {/* Related Projects */}
              {selectedNode.relatedProjects.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Linked Real-World Projects
                  </h4>
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
                          className="px-3.5 py-2 rounded-xl bg-[#6D001A]/60 hover:bg-[#6D001A] text-white border border-[#990026] text-xs font-mono flex items-center space-x-2 transition-all shadow-md hover:shadow-[#6D001A]/40"
                        >
                          <span>{projectObj.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#E01E43]" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TechConstellation;
