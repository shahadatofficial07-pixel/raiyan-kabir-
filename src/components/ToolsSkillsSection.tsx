import React from 'react';
import { PenTool, Layers, Check } from 'lucide-react';
import { designTools, coreSkills } from '../data/toolsData';

export const ToolsSkillsSection: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 bg-[#08080a] border-t border-neutral-900/80 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="flex items-center gap-3 text-xs font-tech font-semibold tracking-[0.3em] text-amber-400 uppercase">
            <span className="w-8 h-px bg-amber-400/80"></span>
            <span>TOOLS &amp; EXPERTISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            INDUSTRY TOOLS <br />
            <span className="text-neutral-400">&amp; CORE DISCIPLINES.</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Mastery over modern software ecosystems paired with foundational visual craft and typographic theory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Software Tool Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-tech text-amber-400 tracking-widest uppercase mb-2">
              <PenTool className="w-4 h-4" />
              <span>PRIMARY DESIGN SOFTWARE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {designTools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-400/50 hover:bg-neutral-900/90 transition-all duration-300 group shadow-lg flex flex-col justify-between h-40"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 font-tech font-bold text-sm text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {tool.badge}
                    </span>
                    <span className="text-[10px] font-tech text-neutral-400 bg-neutral-950 px-2 py-1 rounded border border-neutral-800 uppercase">
                      PRO LEVEL
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-white text-base group-hover:text-amber-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 font-light">
                      {tool.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Disciplines & Skills Floating Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-tech text-amber-400 tracking-widest uppercase mb-2">
              <Layers className="w-4 h-4" />
              <span>CREATIVE DISCIPLINES &amp; COMPETENCIES</span>
            </div>

            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              True graphic design relies on time-tested principles: optical balance, hierarchy, readability, and emotional resonance. No artificial percentages, just concrete craftsmanship.
            </p>

            {/* Badges Cloud with subtle floating hover */}
            <div className="flex flex-wrap gap-3 pt-2">
              {coreSkills.map((skill, index) => (
                <div
                  key={skill}
                  style={{
                    animationDelay: `${index * 120}ms`
                  }}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-amber-400/60 transition-all duration-300 text-sm font-tech text-neutral-200 hover:text-white shadow-md cursor-default group"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400/80 group-hover:scale-125 transition-transform" />
                  <span className="font-medium tracking-wide">{skill}</span>
                  <Check className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors" />
                </div>
              ))}
            </div>

            {/* Studio Guarantee Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-[#101016] border border-neutral-800/80 mt-6">
              <div className="text-xs font-tech text-neutral-300 tracking-wider uppercase mb-1">
                DELIVERABLE STANDARDS
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Every project includes vector-clean master files (.AI, .PSD, .FIG), print-ready CMYK PDFs with crop &amp; bleed markings, and optimized RGB assets for digital channels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
