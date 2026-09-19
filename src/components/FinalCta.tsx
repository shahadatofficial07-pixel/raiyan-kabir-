import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AbstractBackgroundObject } from './3d/AbstractBackgroundObject';

interface FinalCtaProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onStartProject, onViewWork }) => {
  return (
    <section className="relative py-32 md:py-44 bg-[#09090d] border-t border-neutral-900 overflow-hidden">
      {/* 3D Abstract Sculpture in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <AbstractBackgroundObject type="torus" opacity={0.3} />
      </div>

      {/* Radial lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-amber-400 text-xs font-tech tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>COLLABORATIVE EXCELLENCE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.02]">
          LET&apos;S TURN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
            IDEAS INTO
          </span> <br />
          VISUALS.
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
          Ready to elevate your project with bespoke graphic design, typographic discipline, and memorable artistic direction? Let&apos;s build something extraordinary together.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onStartProject}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-tech font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-amber-400/20 active:scale-[0.98]"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4 text-neutral-950 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            onClick={onViewWork}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-tech font-semibold text-xs tracking-widest uppercase border border-neutral-700/80 transition-all duration-300 active:scale-[0.98]"
          >
            <span>VIEW MY WORK</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
