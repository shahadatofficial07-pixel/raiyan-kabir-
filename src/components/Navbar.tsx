import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', id: 'hero' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'WORK', id: 'work' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-[#08080a]/85 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl shadow-black/60'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Branding */}
        <button
          onClick={() => handleNavClick('hero')}
          className="group text-left focus:outline-none flex items-center gap-3"
          aria-label="Rayhan Kabir Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/80 flex items-center justify-center group-hover:border-amber-400/80 transition-colors">
            <span className="font-display font-bold text-xs tracking-tighter text-amber-400">RK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base md:text-lg tracking-wider text-white group-hover:text-amber-400 transition-colors">
              RAYHAN KABIR
            </span>
            <span className="text-[9px] font-tech text-neutral-400 tracking-[0.2em] -mt-1 hidden sm:block">
              VISUAL CREATIVE
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative text-xs font-tech tracking-[0.2em] transition-colors py-1 ${
                  isActive ? 'text-amber-400 font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => handleNavClick('contact')}
            className="group relative inline-flex items-center gap-2 text-xs font-tech tracking-wider uppercase px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-amber-400 border border-neutral-700/80 hover:border-amber-400/60 transition-all duration-300 shadow-sm"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#08080a]/98 backdrop-blur-xl border-b border-neutral-800 py-6 px-8 flex flex-col gap-5 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-left text-sm font-tech tracking-[0.25em] py-2 text-neutral-300 hover:text-amber-400 border-b border-neutral-900 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-xs text-neutral-600 font-mono">0{navLinks.indexOf(link) + 1}</span>
            </button>
          ))}
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full mt-2 py-3 rounded-xl bg-amber-400 text-neutral-950 font-tech font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
