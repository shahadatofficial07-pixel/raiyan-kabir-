import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowRight, Send, Sparkles, MapPin, Clock } from 'lucide-react';
import { socialLinks } from '../data/toolsData';

interface ContactSectionProps {
  prefilledProjectType?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledProjectType }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(prefilledProjectType || 'Branding Design');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Update projectType if prefilled prop changes
  React.useEffect(() => {
    if (prefilledProjectType) {
      setProjectType(prefilledProjectType);
    }
  }, [prefilledProjectType]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate submission and offer mailto fallback
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-[#08080a] border-t border-neutral-900/80">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Editorial */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 text-xs font-tech font-semibold tracking-[0.3em] text-amber-400 uppercase">
              <span className="w-8 h-px bg-amber-400/80"></span>
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.08]">
              LET&apos;S CREATE <br />
              <span className="text-amber-400">SOMETHING</span> <br />
              <span className="text-white">GREAT.</span>
            </h2>

            <p className="text-base text-neutral-300 font-light leading-relaxed">
              Have a project, idea or brand that needs a strong visual direction? Let&apos;s talk.
            </p>

            {/* Email Card with Copy & Direct Action */}
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800/90 space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs font-tech text-neutral-400 tracking-wider uppercase">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>DIRECT INBOX</span>
                </span>
                <span className="text-emerald-400 font-medium">● ACTIVE</span>
              </div>

              <div className="flex items-center justify-between gap-3 bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="font-tech text-xs sm:text-sm text-neutral-200 hover:text-amber-400 transition-colors break-all"
                >
                  {socialLinks.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors shrink-0"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <p className="text-xs text-emerald-400 font-tech">
                  Email copied to clipboard!
                </p>
              )}
            </div>

            {/* Quick Studio Facts */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-tech text-neutral-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Based in Bangladesh &bull; Collaborating Worldwide</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-tech text-neutral-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Typical response time: Within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800/90 shadow-2xl relative">
              {/* Form header */}
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800/80 mb-6">
                <div>
                  <h3 className="font-display font-bold text-xl text-white">PROJECT INQUIRY</h3>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">Fill out your requirements below</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-400">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white">Message Received!</h4>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-semibold">{name}</span>. Rayhan Kabir has received your inquiry regarding <span className="text-amber-400">{projectType}</span> and will reply shortly.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <a
                      href={`mailto:${socialLinks.email}?subject=Project Inquiry from ${encodeURIComponent(name)}: ${encodeURIComponent(projectType)}&body=${encodeURIComponent(message)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-neutral-950 font-tech font-bold text-xs tracking-wider uppercase hover:bg-amber-300 transition-colors"
                    >
                      <span>OPEN IN EMAIL CLIENT</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                      }}
                      className="px-6 py-3 rounded-xl bg-neutral-800 text-neutral-300 font-tech text-xs tracking-wider uppercase hover:bg-neutral-700 transition-colors"
                    >
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="name-input" className="block text-xs font-tech text-neutral-300 tracking-wider uppercase">
                      NAME *
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alexander Vance"
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm font-sans"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label htmlFor="email-input" className="block text-xs font-tech text-neutral-300 tracking-wider uppercase">
                      EMAIL *
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alexander@company.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm font-sans"
                    />
                  </div>

                  {/* Project Type Select */}
                  <div className="space-y-2">
                    <label htmlFor="project-type-select" className="block text-xs font-tech text-neutral-300 tracking-wider uppercase">
                      PROJECT TYPE
                    </label>
                    <select
                      id="project-type-select"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm font-sans"
                    >
                      <option value="Social Media Design">01 — Social Media Design</option>
                      <option value="Poster Design">02 — Poster Design</option>
                      <option value="Flyer Design">03 — Flyer Design</option>
                      <option value="Branding Design">04 — Branding Design</option>
                      <option value="T-Shirt Design">05 — T-Shirt Design</option>
                      <option value="Business Card Design">06 — Business Card Design</option>
                      <option value="Complete Visual Package">07 — Complete Visual Package</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <label htmlFor="message-input" className="block text-xs font-tech text-neutral-300 tracking-wider uppercase">
                      MESSAGE *
                    </label>
                    <textarea
                      id="message-input"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your project goals, timelines, and scope..."
                      className="w-full px-4 py-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm font-sans resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-tech font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-amber-400/20 active:scale-[0.99]"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4 text-neutral-950" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
