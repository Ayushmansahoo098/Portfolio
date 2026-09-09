import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { CommandPalette } from './components/CommandPalette';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { TechConstellation } from './components/TechConstellation';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificatesGallery } from './components/CertificatesGallery';
import { BeyondCode } from './components/BeyondCode';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EasterEggs } from './components/EasterEggs';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  React.useEffect(() => {
    if (isLoaded) {
      window.scrollTo(0, 0);
    }
  }, [isLoaded]);

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
    <div className="min-h-screen bg-[#000000] text-slate-100 selection:bg-[#6D001A]/40 selection:text-white noise-overlay relative overflow-x-hidden max-w-full">
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

          <main className="relative z-10 space-y-12 overflow-x-hidden max-w-full">
            <Hero
              onExploreWork={() => scrollTo('projects')}
              onContactMe={() => scrollTo('contact')}
            />

            <AboutSection />

            <TechConstellation onSelectProject={handleSelectProjectFromTech} />

            <ProjectsSection
              selectedProjectId={selectedProjectId}
              onClearSelectedProject={() => setSelectedProjectId(null)}
            />

            <CertificatesGallery />

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
