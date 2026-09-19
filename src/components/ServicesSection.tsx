import React, { useState } from 'react';
import { Share2, Maximize2, FileText, Layers, Shirt, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import { servicesList } from '../data/servicesData';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Share2':
        return <Share2 className="w-5 h-5 text-amber-400" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5 text-amber-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-amber-400" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px'
      }}
      className="h-full"
    >
      <div
        onClick={() => onSelect(service)}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(24px)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        }}
        className={`relative h-full p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xl ${
          isHovered ? 'border-amber-400/50 shadow-2xl shadow-black/80 bg-neutral-900/90' : 'hover:border-neutral-700'
        }`}
      >
        {/* Subtle top light highlight */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div>
          {/* Top Row: Number & Icon */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-display font-extrabold text-neutral-500 group-hover:text-amber-400 transition-colors">
              {service.number}
            </span>
            <div className="w-11 h-11 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center group-hover:border-amber-400/60 group-hover:scale-110 transition-all duration-300">
              {getIcon(service.iconName)}
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors tracking-tight mb-3">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-light">
            {service.description}
          </p>

          {/* Deliverables Checklist */}
          <div className="space-y-2 pt-2 border-t border-neutral-800/60">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Action Hint */}
        <div className="pt-6 mt-6 border-t border-neutral-800/40 flex items-center justify-between text-xs font-tech text-neutral-400 group-hover:text-amber-400 transition-colors">
          <span className="tracking-wider uppercase">REQUEST THIS SERVICE</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

interface ServicesSectionProps {
  onRequestService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onRequestService }) => {
  return (
    <section id="services" className="relative py-28 md:py-36 bg-[#08080a] border-t border-neutral-900/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="flex items-center gap-3 text-xs font-tech font-semibold tracking-[0.3em] text-amber-400 uppercase">
            <span className="w-8 h-px bg-amber-400/80"></span>
            <span>WHAT I DO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            CRAFTED SOLUTIONS <br />
            <span className="text-neutral-400">FOR IMPACTFUL PRESENCE.</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Creative design solutions built around clarity, impact and visual storytelling.
          </p>
        </div>

        {/* 6 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesList.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={() => onRequestService(service.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
