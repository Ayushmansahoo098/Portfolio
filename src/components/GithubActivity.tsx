import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface UserData {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export const GithubActivity: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${PORTFOLIO_DATA.githubStats.username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setUserData(data);
        }
      })
      .catch(() => {});
  }, []);

  const contributionGrid = Array.from({ length: 112 }).map(() => {
    const r = Math.random();
    if (r > 0.75) return 'bg-[#E01E43]';
    if (r > 0.5) return 'bg-[#990026]';
    if (r > 0.35) return 'bg-[#6D001A]';
    return 'bg-slate-950';
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center space-x-2 text-[#E01E43] font-mono text-xs font-semibold uppercase tracking-widest">
        <Github className="w-4 h-4" />
        <span>DEVELOPER TELEMETRY // GITHUB REPOSITORY ENGINE</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 space-y-8 bg-[#080305]"
      >
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4">
            <img
              src={PORTFOLIO_DATA.githubStats.avatarUrl}
              alt="Ayushman Sahoo GitHub Avatar"
              className="w-14 h-14 rounded-full border-2 border-[#990026] shadow-lg shadow-[#6D001A]/30"
            />
            <div>
              <h3 className="text-xl font-bold text-white flex items-center space-x-2 font-mono">
                <span>@{PORTFOLIO_DATA.githubStats.username}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#6D001A] text-white border border-[#990026]">
                  Active
                </span>
              </h3>
              <a
                href={PORTFOLIO_DATA.personal.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-white font-mono flex items-center space-x-1 mt-1"
              >
                <span>github.com/{PORTFOLIO_DATA.githubStats.username}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center min-w-[100px]">
              <span className="text-slate-500 block text-[10px]">PUBLIC REPOS</span>
              <span className="text-lg font-bold text-white">
                {userData ? userData.public_repos : PORTFOLIO_DATA.githubStats.publicRepos}
              </span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center min-w-[100px]">
              <span className="text-slate-500 block text-[10px]">EST. COMMITS</span>
              <span className="text-lg font-bold text-[#E01E43]">
                {PORTFOLIO_DATA.githubStats.contributionsThisYear}+
              </span>
            </div>
          </div>
        </div>

        {/* Contribution Graph Heatmap Visualization */}
        <div className="space-y-3 font-mono">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-semibold">CONTRIBUTION TELEMETRY MATRIX</span>
            <span className="text-slate-500 text-[10px]">480+ Commits in 2025/2026</span>
          </div>

          <div className="p-4 rounded-xl bg-[#000000] border border-white/10 overflow-x-auto">
            <div className="grid grid-rows-7 grid-flow-col gap-1.5 min-w-[600px]">
              {contributionGrid.map((color, i) => (
                <div key={i} className={`w-3.5 h-3.5 rounded-sm ${color} transition-colors hover:ring-1 hover:ring-[#E01E43]`} />
              ))}
            </div>
          </div>
        </div>

        {/* Languages tags */}
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
          <span>TOP LANGUAGES:</span>
          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_DATA.githubStats.primaryLanguages.map((lang) => (
              <span key={lang} className="px-2.5 py-0.5 rounded bg-[#120508] text-white border border-white/5 font-mono">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
