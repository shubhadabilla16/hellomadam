import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getServicesByCategory } from '../data/services';
import { ServiceCard } from './ServiceCard';

interface SpotlightServicesSectionProps {
  onViewDetails?: (service: any) => void;
}

export const SpotlightServicesSection: React.FC<SpotlightServicesSectionProps> = ({ onViewDetails }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const facialServices = getServicesByCategory('facial');

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>Category Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Facial Treatments &amp; Korean Glow
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
              From botanical fruit clean-ups to Lotus White Glow, Sara Gold, authentic O3+ Whitening, and trending Korean Glass Skin treatments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/services/facial"
              className="text-xs font-bold text-[#e03e1a] hover:underline flex items-center gap-1 mr-2"
            >
              <span>View all 11 Facials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full border border-[#ebdccd] bg-[#faf7f2] hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full border border-[#ebdccd] bg-[#faf7f2] hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {facialServices.map((service) => (
            <div key={service.id} className="min-w-[280px] sm:min-w-[320px] max-w-[340px] shrink-0">
              <ServiceCard service={service} onViewDetails={onViewDetails} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
