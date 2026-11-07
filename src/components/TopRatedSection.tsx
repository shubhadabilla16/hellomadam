import React from 'react';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';
import { ServiceItem } from '../data/servicesData';

interface TopRatedSectionProps {
  onViewDetails: (service: ServiceItem) => void;
}

export const TopRatedSection: React.FC<TopRatedSectionProps> = ({ onViewDetails }) => {
  const { services } = useAdmin();
  const { toggleService, isSelected } = useBooking();
  const { t, language } = useLanguage();

  // Filter services marked as popular or featured by admin
  const topServices = services.filter((s) => s.isPopular).slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with authentic client quote snippet */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>{t('section.top_rated_title', 'Top Rated Services')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {language === 'hi' ? 'ग्राहकों की सबसे पसंदीदा सेवाएं' : 'Highly Recommended in Solapur'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {language === 'hi'
                ? 'सोलापूर की महिलाओं द्वारा बार-बार बुक की जाने वाली भरोसेमंद सेवाएं।'
                : 'Verified favourite treatments based on client repeats and home parlour bookings across Solapur.'}
            </p>
          </div>

          {/* Genuine Client Testimonial Callout (No fake stars) */}
          <div className="bg-[#faf7f2] border border-[#ebdccd] rounded-2xl p-4 sm:p-5 max-w-md shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Client Review · Datta Chowk, Solapur</span>
            </div>
            <p className="text-xs text-stone-700 italic">
              "The beautician arrived exactly on time with a sanitized kit. My fruit facial and waxing was so relaxing right in my own bedroom."
            </p>
            <div className="text-[11px] font-bold text-stone-900 mt-1.5">
              — Mrs. Pranita Amar Pompawar
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topServices.map((service) => {
            const active = isSelected(service.id);

            return (
              <div
                key={service.id}
                className="group bg-[#faf7f2] rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#e03e1a] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                    Popular
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#e03e1a] uppercase tracking-wider block font-serif">
                      {service.categoryLabel}
                    </span>
                    <h3 className="text-base font-serif font-bold text-stone-900 leading-snug mt-1 group-hover:text-[#e03e1a] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1.5 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#ebdccd] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-serif">Official Rate</span>
                      <span className="text-base font-bold text-stone-900 tabular-nums font-serif">
                        {service.priceDisplay || `₹${service.price.toLocaleString('en-IN')}`}
                      </span>
                    </div>

                    <button
                      onClick={() => onViewDetails(service)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-stone-700 hover:text-[#e03e1a] bg-white border border-[#ebdccd] hover:border-[#f4c8ba] px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                    >
                      <span>{t('btn.view_details', 'View')}</span>
                      <ArrowRight className="w-3 h-3" />
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
