import React, { useEffect, useState } from 'react';
import { AbstractBackgroundObject } from './3d/AbstractBackgroundObject';

export const DesignStatement: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('design-statement');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = ['GOOD DESIGN', 'MAKES AN', 'IMPRESSION.'];

  return (
    <section
      id="design-statement"
      className="relative min-h-[75vh] flex items-center justify-center py-32 bg-[#060608] border-t border-neutral-900 overflow-hidden"
    >
      {/* Background 3D subtle wireframe object */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <AbstractBackgroundObject type="ring" opacity={0.35} />
      </div>

      {/* Clean high-contrast typography container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-4">
        <div className="text-xs font-tech text-amber-400 tracking-[0.4em] uppercase mb-6 flex items-center justify-center gap-3">
          <span className="w-6 h-px bg-amber-400/80"></span>
          <span>CORE PHILOSOPHY</span>
          <span className="w-6 h-px bg-amber-400/80"></span>
        </div>

        <div className="space-y-2 md:space-y-4">
          {words.map((phrase, idx) => {
            // Slight scroll translation effect per phrase
            const offset = (scrollProgress - 0.5) * (idx - 1) * 35;
            return (
              <div
                key={idx}
                style={{
                  transform: `translateY(${offset}px)`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="overflow-hidden"
              >
                <h2
                  className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight select-none leading-none ${
                    idx === 2
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500'
                      : idx === 1
                      ? 'text-neutral-400'
                      : 'text-white'
                  }`}
                >
                  {phrase}
                </h2>
              </div>
            );
          })}
        </div>

        <p className="max-w-xl mx-auto text-sm md:text-base text-neutral-400 font-light pt-8 leading-relaxed">
          Beyond visual decoration, design creates subconscious trust, communicates clarity, and gives authentic voice to brand ambition.
        </p>
      </div>
    </section>
  );
};
