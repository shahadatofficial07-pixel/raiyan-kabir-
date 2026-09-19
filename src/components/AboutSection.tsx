import React, { useState } from 'react';
import { User, Compass, Award, MapPin, Edit3, Check } from 'lucide-react';
import { AboutSculpture } from './3d/AboutSculpture';

export const AboutSection: React.FC = () => {
  // Experience is editable without inventing fake years
  const [experienceText, setExperienceText] = useState<string>(() => {
    return localStorage.getItem('rk_experience_text') || 'Multi-disciplinary visual practice across digital & physical media';
  });
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [tempExperience, setTempExperience] = useState(experienceText);

  const handleSaveExperience = () => {
    setExperienceText(tempExperience);
    localStorage.setItem('rk_experience_text', tempExperience);
    setIsEditingExperience(false);
  };

  return (
    <section id="about" className="relative py-28 md:py-36 bg-[#08080a] border-t border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex items-center gap-3 text-xs font-tech font-semibold tracking-[0.3em] text-amber-400 uppercase mb-4">
          <span className="w-8 h-px bg-amber-400/80"></span>
          <span>ABOUT THE DESIGNER</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Statement & Content */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
              DESIGN IS MORE <br />
              <span className="text-neutral-400">THAN WHAT YOU SEE.</span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light">
              Rayhan Kabir is a graphic designer passionate about transforming ideas into clear, engaging and memorable visual experiences.
            </p>

            <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
              Rooted in deep appreciation for typographic discipline, balanced negative space, and modern visual semantics, my work bridges conceptual depth and tactile craftsmanship. Whether designing an iconic brand identity, an avant-garde exhibition poster, or an engaging social media campaign, every line and curve is built with intentional purpose.
            </p>

            {/* Editable Information Cards Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Role */}
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-center gap-2.5 text-xs font-tech text-amber-400 tracking-wider mb-1.5 uppercase">
                  <User className="w-3.5 h-3.5" />
                  <span>ROLE</span>
                </div>
                <div className="font-display font-bold text-white text-base">Graphic Designer</div>
                <p className="text-xs text-neutral-500 mt-1">Creative Visual Solutions</p>
              </div>

              {/* Card 2: Specialization */}
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-center gap-2.5 text-xs font-tech text-amber-400 tracking-wider mb-1.5 uppercase">
                  <Compass className="w-3.5 h-3.5" />
                  <span>SPECIALIZATION</span>
                </div>
                <div className="font-display font-bold text-white text-base">
                  Graphic Design &amp; Visual Communication
                </div>
                <p className="text-xs text-neutral-500 mt-1">Print, Digital &amp; Identity</p>
              </div>

              {/* Card 3: Experience (Editable) */}
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 relative group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5 text-xs font-tech text-amber-400 tracking-wider uppercase">
                    <Award className="w-3.5 h-3.5" />
                    <span>EXPERIENCE</span>
                  </div>
                  {!isEditingExperience ? (
                    <button
                      onClick={() => setIsEditingExperience(true)}
                      className="text-[10px] font-tech text-neutral-400 hover:text-amber-400 flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                      title="Edit experience note"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>EDIT</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSaveExperience}
                      className="text-[10px] font-tech text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>SAVE</span>
                    </button>
                  )}
                </div>

                {isEditingExperience ? (
                  <div className="mt-1 space-y-2">
                    <input
                      type="text"
                      value={tempExperience}
                      onChange={(e) => setTempExperience(e.target.value)}
                      className="w-full text-xs bg-neutral-950 text-white px-2 py-1.5 rounded border border-amber-400/50 focus:outline-none"
                      placeholder="Enter your experience details..."
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveExperience}
                        className="text-[10px] bg-amber-400 text-black px-2 py-0.5 rounded font-tech font-bold"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => setIsEditingExperience(false)}
                        className="text-[10px] text-neutral-400 px-2 py-0.5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-display font-bold text-white text-base leading-snug">
                      {experienceText}
                    </div>
                    <p className="text-xs text-neutral-500 mt-1">Direct Client &amp; Agency Delivery</p>
                  </div>
                )}
              </div>

              {/* Card 4: Location */}
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300">
                <div className="flex items-center gap-2.5 text-xs font-tech text-amber-400 tracking-wider mb-1.5 uppercase">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>LOCATION</span>
                </div>
                <div className="font-display font-bold text-white text-base">Bangladesh</div>
                <p className="text-xs text-neutral-500 mt-1">Available Globally (Remote)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Large 3D Floating Design Object */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <AboutSculpture />
            <div className="w-full text-center mt-3">
              <span className="text-[11px] font-tech text-neutral-500 uppercase tracking-widest">
                SCULPTED GEOMETRY &bull; VISUAL PURSUIT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
