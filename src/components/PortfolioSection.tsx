import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioProjects } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';

interface PortfolioSectionProps {
  onSelectProject: (project: Project) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');

  const categories: ProjectCategory[] = ['ALL', 'SOCIAL MEDIA', 'POSTER', 'FLYER', 'BRANDING', 'T-SHIRT'];

  const filteredProjects = selectedCategory === 'ALL'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="relative py-28 md:py-36 bg-[#08080a] border-t border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3 text-xs font-tech font-semibold tracking-[0.3em] text-amber-400 uppercase">
              <span className="w-8 h-px bg-amber-400/80"></span>
              <span>SELECTED WORK</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
              CURATED VISUAL <br />
              <span className="text-neutral-400">ARCHIVE &amp; PORTFOLIO.</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              A collection of visual work crafted with purpose and attention to detail.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pb-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-tech px-4 py-2 rounded-full tracking-wider uppercase transition-all duration-300 ${
                    active
                      ? 'bg-amber-400 text-neutral-950 font-bold shadow-lg shadow-amber-400/20'
                      : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Varied Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => {
            // Provide varied layout spans for visual rhythm:
            // 0: Span 8 (large feature), 1: Span 4 (tall column)
            // 2: Span 4, 3: Span 4, 4: Span 4 (trio)
            // 5: Span 6, 6: Span 6 (duo)
            let colSpan = 'md:col-span-6 lg:col-span-4';
            let heightClass = 'h-[440px]';

            if (index === 0) {
              colSpan = 'md:col-span-12 lg:col-span-8';
              heightClass = 'h-[460px] md:h-[520px]';
            } else if (index === 1) {
              colSpan = 'md:col-span-6 lg:col-span-4';
              heightClass = 'h-[460px] md:h-[520px]';
            } else if (index === 2) {
              colSpan = 'md:col-span-6 lg:col-span-5';
              heightClass = 'h-[420px] md:h-[460px]';
            } else if (index === 3) {
              colSpan = 'md:col-span-12 lg:col-span-7';
              heightClass = 'h-[420px] md:h-[460px]';
            }

            return (
              <div
                key={project.id}
                className={`${colSpan} group relative rounded-2xl overflow-hidden border border-neutral-800/90 bg-[#0d0d12] cursor-pointer shadow-xl transition-all duration-500 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-black hover:-translate-y-1.5`}
                onClick={() => onSelectProject(project)}
                data-cursor="view"
              >
                {/* Image Container with slow zoom */}
                <div className={`relative w-full ${heightClass} overflow-hidden`}>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:filter group-hover:brightness-90"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Category Badge */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-tech font-bold tracking-widest text-amber-400 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-700/60 uppercase">
                      {project.category}
                    </span>
                    <span className="text-xs font-tech text-neutral-400 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-neutral-800">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-1 space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 font-light line-clamp-1 max-w-lg">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Reveal Button on hover */}
                    <div className="pt-4 flex items-center gap-2 text-xs font-tech text-amber-400 font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
