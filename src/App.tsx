import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { CommandPalette } from './components/CommandPalette';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TechConstellation } from './components/TechConstellation';
import { CurrentlyBuilding } from './components/CurrentlyBuilding';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneyTimeline } from './components/JourneyTimeline';
import { CertificatesGallery } from './components/CertificatesGallery';
import { AchievementsSection } from './components/AchievementsSection';
import { GithubActivity } from './components/GithubActivity';
import { BeyondCode } from './components/BeyondCode';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EasterEggs } from './components/EasterEggs';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectFromTech = (projectId: string) => {
    setSelectedProjectId(projectId);
    scrollTo('projects');
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 noise-overlay relative">
      <AnimatePresence>
        {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <CustomCursor />

      {isLoaded && (
        <>
          <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
          />

          <main className="relative z-10 space-y-12">
            <Hero
              onExploreWork={() => scrollTo('projects')}
              onExploreJourney={() => scrollTo('journey')}
            />

            <AboutSection />

            <TechConstellation onSelectProject={handleSelectProjectFromTech} />

            <CurrentlyBuilding />

            <ProjectsSection
              selectedProjectId={selectedProjectId}
              onClearSelectedProject={() => setSelectedProjectId(null)}
            />

            <JourneyTimeline />

            <CertificatesGallery />

            <AchievementsSection />

            <GithubActivity />

            <BeyondCode />

            <ContactSection />
          </main>

          <Footer />

          <EasterEggs />
        </>
      )}
    </div>
  );
}

export default App;
