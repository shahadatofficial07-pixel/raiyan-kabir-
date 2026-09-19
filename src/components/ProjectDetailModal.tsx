import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, ExternalLink, Calendar, Tag, Wrench, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onContact: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
  onContact
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, onNext, onPrev]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-start justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-300">
      {/* Container Card */}
      <div className="relative w-full max-w-5xl bg-[#0c0c10] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-auto">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 bg-[#0c0c10]/95 backdrop-blur-md px-6 py-4 border-b border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-tech text-amber-400 tracking-widest uppercase">
              {project.category}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-tech text-neutral-400">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              title="Previous Project (Left Arrow)"
              aria-label="Previous Project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              title="Next Project (Right Arrow)"
              aria-label="Next Project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-neutral-800 mx-1" />
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-neutral-900 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 border border-neutral-800 hover:border-red-500/50 transition-colors"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Header Title Section */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          {/* Meta Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-tech text-neutral-400 tracking-wider uppercase mb-1">
                <Tag className="w-3 h-3 text-amber-400" />
                <span>CATEGORY</span>
              </div>
              <div className="text-sm font-semibold text-white">{project.category}</div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-tech text-neutral-400 tracking-wider uppercase mb-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>YEAR</span>
              </div>
              <div className="text-sm font-semibold text-white">{project.year}</div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-tech text-neutral-400 tracking-wider uppercase mb-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>CLIENT / SCOPE</span>
              </div>
              <div className="text-sm font-semibold text-white">{project.client || 'Studio Commission'}</div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-tech text-neutral-400 tracking-wider uppercase mb-1">
                <Wrench className="w-3 h-3 text-amber-400" />
                <span>DESIGN TOOLS</span>
              </div>
              <div className="text-xs font-semibold text-amber-300">
                {project.tools.join(', ')}
              </div>
            </div>
          </div>

          {/* Large Hero Artwork */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
            <img
              src={project.heroImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[600px] object-contain sm:object-cover mx-auto"
            />
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700/60 text-[11px] font-tech text-neutral-300">
              HIGH-FIDELITY PRESENTATION
            </div>
          </div>

          {/* Project Detailed Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-lg font-display font-bold text-white tracking-wide">
                PROJECT OVERVIEW &amp; CREATIVE DIRECTION
              </h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base font-light">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-tech px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 space-y-4">
              <div className="text-xs font-tech text-amber-400 tracking-widest uppercase">
                INQUIRE ABOUT THIS STYLE
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Looking for a similar aesthetic for your brand or marketing collateral?
              </p>
              <button
                onClick={() => {
                  onContact(project.title);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-tech font-bold text-xs tracking-wider uppercase transition-colors shadow-lg"
              >
                REQUEST SIMILAR PROJECT
              </button>
            </div>
          </div>

          {/* Additional Showcase Images */}
          {project.images && project.images.length > 1 && (
            <div className="space-y-4 pt-6 border-t border-neutral-800">
              <h3 className="text-sm font-tech tracking-widest text-neutral-400 uppercase">
                ADDITIONAL PROJECT PERSPECTIVES
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.slice(1).map((imgUrl, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-neutral-800/80 bg-neutral-950 aspect-[4/3] group relative"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} detail ${i + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Navigation Controls */}
          <div className="pt-8 border-t border-neutral-800 flex items-center justify-between">
            <button
              onClick={onPrev}
              className="inline-flex items-center gap-2 text-xs font-tech text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREVIOUS PROJECT</span>
            </button>

            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 text-xs font-tech text-neutral-400 hover:text-white transition-colors"
            >
              <span>NEXT PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
