import React from 'react';
import { Sparkles, ArrowRight, Plus, Check } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';
import { ServiceItem } from '../data/servicesData';

interface FeaturedEditorialSectionProps {
  onViewDetails: (service: ServiceItem) => void;
}

export const FeaturedEditorialSection: React.FC<FeaturedEditorialSectionProps> = ({ onViewDetails }) => {
  const { services } = useAdmin();
  const { toggleService, isSelected } = useBooking();
  const { t, language } = useLanguage();

  // Specifically required treatments:
  // - Premium Facial (e.g. O3)
  // - Korean Glass Facial
  // - Hydra Facial
  // - Full Body Aroma Polishing
  // - Premium Hair Spa
  // - Advanced Manicure and Pedicure
  const editorialIds = [
    'facial-prem-korean-glass',  // Korean Glass Facial - ₹3,000
    'facial-prem-hydra-machine', // Hydra Facial (with machine) - ₹3,000
    'facial-prem-o3',            // Premium O3 Facial - ₹3,000
    'polish-full-body-aroma',    // Full Body Aroma Polishing - ₹2,000
    'hairspa-loreal-medium',     // Premium Loreal Hair Spa - ₹1,000 - ₹1,500
    'pedicure-advance',          // Advanced Pedicure - ₹750
  ];

  const editorialServices = editorialIds
    .map((id) => services.find((s) => s.id === id))
    .filter((s): s is ServiceItem => Boolean(s));

  return (
    <section className="py-20 sm:py-28 bg-[#faf7f2] border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>{t('section.featured_title', 'Signature Luxury Treatments')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'hi' ? 'विशेष प्रीमियम स्किन व हेयर केयर' : 'High-Performance Beauty Treatments'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'हाइड्रा फेशियल, कोरियन ग्लास स्किन, फुल बॉडी अरोमा पॉलिशिंग और लक्ज़री हेयर स्पा—घर पर सैलून जैसा अनुभव।'
              : 'Advanced machine therapies and luxury botanical elixirs brought directly to your bedroom in Solapur.'}
          </p>
        </div>

        {/* Large Editorial Cards Grid (3x2 or 2x3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editorialServices.map((service) => {
            const active = isSelected(service.id);

            return (
              <div
                key={service.id}
                className="group relative bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                {/* Large Visual Frame */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 bg-stone-900/90 text-amber-300 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md border border-stone-700">
                    {service.categoryLabel}
                  </div>

                  {/* Price Tag Overlay on image */}
                  <div className="absolute bottom-4 right-4 bg-white/95 text-stone-900 text-sm font-bold px-3.5 py-1.5 rounded-full font-serif shadow-md tabular-nums">
                    {service.priceDisplay || `₹${service.price.toLocaleString('en-IN')}`}
                  </div>
                </div>

                {/* Editorial Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-bold text-stone-900 leading-snug group-hover:text-[#e03e1a] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#ebdccd] flex items-center justify-between gap-3">
                    <button
                      onClick={() => onViewDetails(service)}
                      className="text-xs font-bold text-stone-700 hover:text-[#e03e1a] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{t('btn.view_details', 'View Treatment Details')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => toggleService(service)}
                      className={`px-4 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                        active
                          ? 'bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba]'
                          : 'bg-[#e03e1a] text-white hover:bg-[#b82e0e] shadow-xs'
                      }`}
                    >
                      {active ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t('btn.selected', 'Selected')}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-amber-200" />
                          <span>{t('btn.book_now', 'Book Now')}</span>
                        </>
                      )}
                    </button>
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
