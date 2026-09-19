import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroScene } from './3d/HeroScene';

interface HeroSectionProps {
  onViewWork: () => void;
  onContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onViewWork, onContact }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center pt-24 pb-16 md:py-0 overflow-hidden bg-[#08080a]"
    >
      {/* 3D WebGL Canvas Layer */}
      <HeroScene />

      {/* Subtle radial background vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.06),rgba(8,8,10,0.85)_75%)]" />

      {/* Grid line texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 xl:col-span-6 space-y-6 md:space-y-8 pointer-events-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 backdrop-blur-md shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-tech tracking-[0.2em] uppercase text-neutral-300">
              AVAILABLE FOR FREELANCE PROJECTS
            </span>
          </div>

          {/* Small Label */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs md:text-sm font-tech font-semibold tracking-[0.35em] text-amber-400 uppercase">
              <span className="w-8 h-px bg-amber-400/80"></span>
              <span>GRAPHIC DESIGNER</span>
            </div>

            {/* Main Title: RAYHAN KABIR */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tight leading-[0.92]">
              RAYHAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                KABIR
              </span>
            </h1>
          </div>

          {/* Tagline Statement */}
          <div className="space-y-3 max-w-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-neutral-200 tracking-tight">
              Crafting Visuals <br className="hidden sm:inline" />
              <span className="text-amber-400 italic font-serif">That Speak.</span>
            </h2>

            {/* Supporting Text */}
            <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
              Graphic designer focused on creating impactful visual experiences through thoughtful composition, typography, color and creative direction.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              onClick={onViewWork}
              className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-tech font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-white/10 active:scale-[0.98]"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight className="w-4 h-4 text-neutral-950 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={onContact}
              className="group relative inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-amber-400 font-tech font-semibold text-xs tracking-widest uppercase border border-neutral-700/80 hover:border-amber-400/60 transition-all duration-300 backdrop-blur-md active:scale-[0.98]"
            >
              <span>LET&apos;S WORK TOGETHER</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300 group-hover:rotate-12" />
            </button>
          </div>

          {/* Studio Metrics / Fine Detail */}
          <div className="pt-6 border-t border-neutral-900/80 flex flex-wrap items-center gap-8 text-neutral-500 font-tech text-xs tracking-wider">
            <div>
              <span className="text-neutral-300 font-bold text-sm">3D & PRINT</span>
              <p className="text-[10px] text-neutral-500 uppercase mt-0.5">High-Fidelity Assets</p>
            </div>
            <div className="w-px h-6 bg-neutral-800" />
            <div>
              <span className="text-neutral-300 font-bold text-sm">INTERNATIONAL</span>
              <p className="text-[10px] text-neutral-500 uppercase mt-0.5">Studio Standards</p>
            </div>
            <div className="w-px h-6 bg-neutral-800" />
            <div>
              <span className="text-amber-400 font-bold text-sm">100% VECTOR</span>
              <p className="text-[10px] text-neutral-500 uppercase mt-0.5">Production-Ready</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual depth anchor (especially on tablet/mobile when canvas is behind) */}
        <div className="lg:col-span-5 xl:col-span-6 flex justify-center items-center pointer-events-none">
          {/* Subtle mobile hint */}
          <div className="block lg:hidden text-center mt-6">
            <span className="text-[11px] font-tech text-neutral-500 tracking-widest uppercase">
              • INTERACTIVE 3D STUDIO •
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[9px] font-tech tracking-[0.3em] uppercase text-neutral-400">SCROLL</span>
        <div className="w-4 h-7 rounded-full border border-neutral-700 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
