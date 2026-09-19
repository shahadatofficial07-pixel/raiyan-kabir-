import React from 'react';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import { portfolioProjects } from '../data/portfolioData';
import { Project } from '../types';
import { FeaturedMockupScene } from './3d/FeaturedMockupScene';

interface FeaturedProjectSectionProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjectSection: React.FC<FeaturedProjectSectionProps> = ({ onSelectProject }) => {
  // Use the primary featured project
  const featured = portfolioProjects.find((p) => p.featured) || portfolioProjects[0];

  return (
    <section className="relative py-28 md:py-36 bg-[#09090d] border-t border-neutral-900/80 overflow-hidden">
      {/* Background ambient lighting glow */}
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Description */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-tech tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED PROJECT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
              {featured.title}
            </h2>

            <div className="flex items-center gap-4 text-xs font-tech text-neutral-400">
              <span className="text-amber-400 font-semibold">{featured.category}</span>
              <span>•</span>
              <span>YEAR {featured.year}</span>
              <span>•</span>
              <span>{featured.client}</span>
            </div>

            <p className="text-base text-neutral-300 font-light leading-relaxed">
              {featured.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="text-xs font-tech text-neutral-400 tracking-wider uppercase flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>KEY DELIVERABLES &amp; TOOLS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {featured.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-tech px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onSelectProject(featured)}
                className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-tech font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl"
              >
                <span>EXPLORE PROJECT</span>
                <ArrowRight className="w-4 h-4 text-neutral-950 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Floating Physical Poster Mockup */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <FeaturedMockupScene
              imageUrl={featured.heroImage}
              onExplore={() => onSelectProject(featured)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
