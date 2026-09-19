import React from 'react';
import { creativeSteps } from '../data/toolsData';

export const CreativeProcess: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 bg-[#08080a] border-t border-neutral-900/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20 space-y-4">
          <div className="flex items-center gap-3 text-xs font-tech font-semibold tracking-[0.3em] text-amber-400 uppercase">
            <span className="w-8 h-px bg-amber-400/80"></span>
            <span>CREATIVE METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            FROM IDEA <br />
            <span className="text-neutral-400">TO VISUAL.</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            A methodical four-stage pipeline ensuring conceptual clarity, artistic distinction, and immaculate technical delivery.
          </p>
        </div>

        {/* 4 Steps Layout */}
        <div className="relative">
          {/* Subtle Connecting Line across desktop cards */}
          <div className="hidden lg:block absolute top-20 left-12 right-12 h-px bg-gradient-to-r from-neutral-800 via-amber-400/40 to-neutral-800 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creativeSteps.map((step) => (
              <div
                key={step.number}
                className="relative group p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Large 3D-styled Number */}
                  <div className="relative mb-6">
                    <span className="text-5xl md:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-neutral-400 via-neutral-700 to-neutral-900 select-none group-hover:from-amber-400 group-hover:via-amber-500 group-hover:to-amber-900 transition-all duration-500">
                      {step.number}
                    </span>
                    <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-400/50 rounded-full group-hover:w-14 transition-all duration-300" />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight mb-2">
                    {step.title}
                  </h3>

                  {/* Step Summary */}
                  <p className="text-xs font-tech text-amber-400/90 tracking-wider uppercase mb-4">
                    {step.summary}
                  </p>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    {step.details}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/60 flex items-center justify-between text-[11px] font-tech text-neutral-500">
                  <span>STAGE {step.number}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-amber-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
