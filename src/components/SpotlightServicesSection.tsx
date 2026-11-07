import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, ArrowRight, Plus, Check } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';
import { ServiceItem } from '../data/servicesData';

interface SpotlightServicesSectionProps {
  onViewDetails: (service: ServiceItem) => void;
}

export const SpotlightServicesSection: React.FC<SpotlightServicesSectionProps> = ({ onViewDetails }) => {
  const { services } = useAdmin();
  const { toggleService, isSelected } = useBooking();
  const { t, language } = useLanguage();

  // Curate 6 spotlight services from required categories:
  // Facial Treatments, Hair Spa, Manicure & Pedicure, Body Wax, Polishing Treatments
  const spotlightIds = [
    'facial-basic-fruit',       // Facial
    'hairspa-matrix-medium',     // Hair Spa
    'manicure-dtan',            // Manicure
    'pedicure-advance',         // Pedicure
    'wax-rica-fullhands',       // Body Wax
    'polish-full-body-aroma',   // Polishing
  ];

  const spotlightServices = spotlightIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is ServiceItem => Boolean(s));

  return (
    <section className="py-20 sm:py-28 bg-[#faf7f2] border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>{t('section.spotlight_title', 'Spotlight Services')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {language === 'hi' ? 'विशेष रूप से चयनित सेवाएं' : 'Curated Client Favourites'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl">
              {t(
                'section.spotlight_sub',
                'Handpicked rituals across facials, hair spa, manicure, pedicure, Rica waxing, and aroma polishing.'
              )}
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#e03e1a] hover:text-[#b82e0e] transition-colors self-start sm:self-auto"
          >
            <span>{language === 'hi' ? 'पूरी सर्विस लिस्ट देखें' : 'View Full Catalogue'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Spotlight Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {spotlightServices.map((service) => {
            const active = isSelected(service.id);

            return (
              <div
                key={service.id}
                className="group flex flex-col bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container with 4:3 Ratio & Category-Accurate Photography */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-200 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-xs">
                    {service.categoryLabel}
                  </div>

                  {service.subcategory && (
                    <div className="absolute top-3 right-3 bg-white/90 text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {service.subcategory}
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{service.duration}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-[#e03e1a] font-medium">Solapur Doorstep</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug group-hover:text-[#e03e1a] transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-[#ebdccd]/80 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-serif uppercase tracking-wider">
                        Official Price
                      </span>
                      <span className="text-lg font-bold text-stone-900 tabular-nums font-serif">
                        {service.priceDisplay || `₹${service.price.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewDetails(service)}
                        className="px-3 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                      >
                        {t('btn.view_details', 'Details')}
                      </button>

                      <button
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          active
                            ? 'bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba]'
                            : 'bg-stone-900 text-white hover:bg-[#e03e1a]'
                        }`}
                      >
                        {active ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#e03e1a]" />
                            <span>{t('btn.selected', 'Selected')}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-amber-300" />
                            <span>{t('btn.book_now', 'Book Now')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
