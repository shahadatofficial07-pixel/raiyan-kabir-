import React from 'react';
import { Linkedin, Mail, Facebook, ExternalLink, ArrowUp } from 'lucide-react';
import { socialLinks } from '../data/toolsData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

// Custom Behance & Fiverr SVGs matching Lucide styling
const BehanceIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 8h4.5a2.5 2.5 0 0 1 0 5H3V8zm0 5h5a2.5 2.5 0 0 1 0 5H3v-5z" />
    <path d="M14 13.5a3.5 3.5 0 1 0 7 0c0-2-1.5-3.5-3.5-3.5a3.5 3.5 0 0 0-3.5 3.5z" />
    <path d="M14.5 13.5h6" />
    <path d="M15 8h4" />
  </svg>
);

const FiverrIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <text
      x="12"
      y="16"
      fontSize="12"
      fontWeight="bold"
      textAnchor="middle"
      fill="currentColor"
      fontFamily="sans-serif"
    >
      fi
    </text>
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060608] border-t border-neutral-900 py-16 md:py-20 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <button
              onClick={() => onNavigate('hero')}
              className="text-left group focus:outline-none"
            >
              <div className="text-2xl font-display font-extrabold text-white tracking-wider group-hover:text-amber-400 transition-colors">
                RAYHAN KABIR
              </div>
              <div className="text-xs font-tech tracking-[0.25em] text-amber-400/90 uppercase mt-1">
                GRAPHIC DESIGNER &amp; VISUAL CREATIVE
              </div>
            </button>

            <p className="text-sm text-neutral-400 max-w-md font-light leading-relaxed">
              Crafting high-impact visual systems, editorial posters, and brand identities with timeless typographic discipline and international aesthetic rigor.
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${socialLinks.email}`}
                className="text-sm font-tech text-white hover:text-amber-400 transition-colors inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{socialLinks.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-tech text-white tracking-widest uppercase mb-4">
              NAVIGATION
            </div>
            <ul className="space-y-2.5 text-sm font-tech">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social Profiles Column */}
          <div className="md:col-span-3 space-y-4">
            <div className="text-xs font-tech text-white tracking-widest uppercase mb-4">
              CONNECT &amp; HIRE
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={socialLinks.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-neutral-300 hover:text-amber-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-amber-400/60 transition-colors">
                  <Linkedin className="w-4 h-4 text-amber-400" />
                </div>
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-amber-400 ml-auto" />
              </a>

              <a
                href={socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-neutral-300 hover:text-amber-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-amber-400/60 transition-colors">
                  <BehanceIcon className="w-4 h-4 text-amber-400" />
                </div>
                <span>Behance</span>
                <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-amber-400 ml-auto" />
              </a>

              <a
                href={socialLinks.fiverr}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-neutral-300 hover:text-amber-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-amber-400/60 transition-colors">
                  <FiverrIcon className="w-4 h-4 text-amber-400" />
                </div>
                <span>Fiverr (Hire Me)</span>
                <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-amber-400 ml-auto" />
              </a>

              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-neutral-300 hover:text-amber-400 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-amber-400/60 transition-colors">
                  <Facebook className="w-4 h-4 text-amber-400" />
                </div>
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 text-neutral-600 group-hover:text-amber-400 ml-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-neutral-500">
          <div>
            &copy; 2026 Rayhan Kabir. All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
          >
            <span>BACK TO TOP</span>
            <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-amber-400/60">
              <ArrowUp className="w-3 h-3 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
