import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'name' | 'title' | 'ready' | 'exit'>('name');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('title'), 600);
    const t2 = setTimeout(() => setPhase('ready'), 1200);
    const t3 = setTimeout(() => setPhase('exit'), 1700);
    const t4 = setTimeout(() => onComplete(), 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className={`fixed inset-0 z-[10000] bg-[#070709] flex flex-col items-center justify-center transition-opacity duration-500 cursor-pointer ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative text-center px-6 max-w-lg">
        {/* Fine gold rule */}
        <div className="w-12 h-px bg-amber-400 mx-auto mb-8 transition-all duration-700 scale-x-100" />

        {/* Main Name */}
        <h1 className="text-3xl md:text-5xl font-display font-extrabold tracking-wider text-white mb-3">
          RAYHAN KABIR
        </h1>

        {/* Subtitle */}
        <p
          className={`text-xs md:text-sm font-tech tracking-[0.3em] text-neutral-400 uppercase transition-all duration-700 transform ${
            phase === 'name' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0 text-amber-400/90'
          }`}
        >
          GRAPHIC DESIGNER & VISUAL CREATIVE
        </p>

        {/* Minimal Progress Indicator */}
        <div className="mt-12 w-32 h-[2px] bg-neutral-800 mx-auto overflow-hidden rounded-full">
          <div
            className={`h-full bg-gradient-to-r from-neutral-500 via-amber-400 to-amber-300 transition-all duration-1000 ease-out ${
              phase === 'name' ? 'w-1/4' : phase === 'title' ? 'w-3/4' : 'w-full'
            }`}
          />
        </div>

        <div className="mt-4 text-[10px] font-tech text-neutral-600 tracking-widest">
          STUDIO ARCHIVE • 2026
        </div>
      </div>
    </div>
  );
};
