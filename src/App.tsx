/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { FeaturedProjectSection } from './components/FeaturedProjectSection';
import { CreativeProcess } from './components/CreativeProcess';
import { ToolsSkillsSection } from './components/ToolsSkillsSection';
import { DesignStatement } from './components/DesignStatement';
import { ContactSection } from './components/ContactSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { portfolioProjects } from './data/portfolioData';
import { Project } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactProjectType, setContactProjectType] = useState<string>('Branding Design');

  // Smooth navigation helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Section observer for active navbar indicator
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'work', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Project modal next/prev handlers
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = portfolioProjects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % portfolioProjects.length;
    setSelectedProject(portfolioProjects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = portfolioProjects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length;
    setSelectedProject(portfolioProjects[prevIndex]);
  };

  // Service click redirects to contact form with prefilled project type
  const handleRequestService = (serviceName: string) => {
    setContactProjectType(serviceName);
    handleNavigate('contact');
  };

  const handleContactFromProject = (projectTitle: string) => {
    setContactProjectType(`Project inquiry: ${projectTitle}`);
    handleNavigate('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-neutral-100 selection:bg-amber-400 selection:text-black">
      {/* Cinematic Initial Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Minimal Premium Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Floating Sticky Navigation Bar */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Layout */}
      <main className="w-full overflow-hidden">
        {/* 1. 3D Full-Screen Hero Section */}
        <HeroSection
          onViewWork={() => handleNavigate('work')}
          onContact={() => handleNavigate('contact')}
        />

        {/* 2. Editorial About Section with 3D Sculpture */}
        <AboutSection />

        {/* 3. 3D Service Cards Section */}
        <ServicesSection onRequestService={handleRequestService} />

        {/* 4. Filterable Portfolio Showcase */}
        <PortfolioSection onSelectProject={setSelectedProject} />

        {/* 5. Special 3D Featured Poster Showcase */}
        <FeaturedProjectSection onSelectProject={setSelectedProject} />

        {/* 6. Creative Methodology Process */}
        <CreativeProcess />

        {/* 7. Tools & Expertise 3D Workspace */}
        <ToolsSkillsSection />

        {/* 8. Full-Width Cinematic Design Statement */}
        <DesignStatement />

        {/* 9. Dark Studio Contact Form & Direct Email */}
        <ContactSection prefilledProjectType={contactProjectType} />

        {/* 10. Final Dramatic Call To Action */}
        <FinalCta
          onStartProject={() => handleNavigate('contact')}
          onViewWork={() => handleNavigate('work')}
        />
      </main>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
        onContact={handleContactFromProject}
      />

      {/* Footer with exact social channels */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
