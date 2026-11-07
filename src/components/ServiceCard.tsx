import React from 'react';
import { Clock, Plus, Check, Info, Sparkles } from 'lucide-react';
import { ServiceItem } from '../data/servicesData';
import { useBooking } from '../context/BookingContext';

interface ServiceCardProps {
  service: ServiceItem;
  onViewDetails?: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onViewDetails }) => {
  const { toggleService, isSelected } = useBooking();
  const active = isSelected(service.id);

  return (
    <div className="group flex flex-col bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container with 4:3 Aspect Ratio */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Gradient Scrim at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Featured in Real Video Badge */}
        {service.featuredInVideo && (
          <div className="absolute top-3 left-3 bg-[#e03e1a]/95 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>Featured in Video</span>
          </div>
        )}

        {/* Quick View Details Button */}
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(service)}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-stone-700 rounded-full shadow-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
            title="View Details"
            aria-label={`View details for ${service.name}`}
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col p-6">
        {/* Unboxed Metadata Line with separators */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1.5">
          <span className="text-[#e03e1a] font-bold uppercase tracking-wider text-[11px]">
            {service.categoryLabel}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="flex items-center gap-1 text-stone-500">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{service.duration}</span>
          </span>
        </div>

        {/* Service Title */}
        <h3 className="text-base font-serif font-bold text-stone-900 leading-snug line-clamp-2 min-h-11">
          {service.name}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed flex-1">
          {service.description}
        </p>

        {/* Card Footer: Price & Add/Select CTA */}
        <div className="mt-5 pt-4 border-t border-[#ebdccd]/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-stone-400 block font-serif">Estimated</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">
              ₹{service.price.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => toggleService(service)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              active
                ? 'bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba] shadow-2xs'
                : 'bg-stone-900 text-white hover:bg-[#e03e1a] shadow-2xs hover:shadow-xs'
            }`}
          >
            {active ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>Add Service</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
