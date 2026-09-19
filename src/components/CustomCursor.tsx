import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Detect hover target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const portfolioItem = target.closest('[data-cursor="view"]');
      const clickable = target.closest('button, a, input, textarea, select, [role="button"], [data-cursor="pointer"]');

      if (portfolioItem) {
        setCursorType('view');
      } else if (clickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp loop
  useEffect(() => {
    if (isTouch) return;
    let animId: number;
    const lerp = () => {
      setPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.22,
        y: prev.y + (targetPos.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animId);
  }, [targetPos, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Center pinpoint */}
      <div
        className="fixed w-1.5 h-1.5 bg-amber-400 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          left: `${targetPos.x}px`,
          top: `${targetPos.y}px`,
          opacity: cursorType === 'view' ? 0 : 1
        }}
      />

      {/* Outer following ring / badge */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 flex items-center justify-center ${
          cursorType === 'view'
            ? 'w-16 h-16 bg-amber-400 text-black font-tech font-bold text-[11px] tracking-wider shadow-2xl scale-100'
            : cursorType === 'pointer'
            ? 'w-10 h-10 border border-amber-400/80 bg-amber-400/10 scale-110 backdrop-blur-[1px]'
            : 'w-7 h-7 border border-neutral-400/30 scale-100'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`
        }}
      >
        {cursorType === 'view' && (
          <span className="tracking-widest">VIEW</span>
        )}
      </div>
    </div>
  );
};
