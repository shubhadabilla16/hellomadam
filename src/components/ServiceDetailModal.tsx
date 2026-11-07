import React from 'react';
import { X, Clock, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../data/servicesData';
import { useBooking } from '../context/BookingContext';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectService?: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectService,
}) => {
  const { toggleService, isSelected } = useBooking();
  const { services } = useAdmin();
  const { t, language } = useLanguage();

  if (!service) return null;
  const active = isSelected(service.id);

  // Find 3 related services from the same category or adjacent categories
  const relatedServices = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#faf7f2] rounded-3xl border border-[#ebdccd] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-700 bg-white/90 hover:bg-white rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image with accurate relevant photography */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-100">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
          
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-300">
              {service.categoryLabel}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              {service.name}
            </h3>
            <div className="flex items-center gap-4 text-xs font-medium text-stone-200 mt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>{service.duration}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-base font-bold text-amber-300 tabular-nums font-serif">
                {service.priceDisplay || `₹${service.price.toLocaleString('en-IN')}`}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 font-serif">
              About This Treatment
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {service.fullDetails || service.description}
            </p>
          </div>

          {/* Key Highlights & Inclusions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 font-serif">
              Key Highlights & Inclusions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(
                service.benefits ||
                (service.includes && service.includes.length > 0
                  ? service.includes.map((inc) => `Includes: ${inc}`)
                  : [
                      'Professional at-home beauty service in Solapur',
                      '100% single-use hygienic disposables',
                      'Skilled certified female beautician',
                      'Zero clean-up or hassle for you',
                    ])
              ).map((benefit: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 bg-white p-3 rounded-xl border border-[#ebdccd]/80 shadow-2xs">
                  <Check className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Services Section */}
          {relatedServices.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 font-serif">
                Complementary Treatments in this Category
              </h4>
              <div className="space-y-2">
                {relatedServices.map((rel) => (
                  <div
                    key={rel.id}
                    className="p-3 bg-white rounded-xl border border-[#ebdccd] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={rel.image}
                        alt={rel.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-bold text-stone-900 truncate">{rel.name}</div>
                        <div className="text-stone-500 text-[11px]">{rel.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-bold text-stone-900 tabular-nums">
                        {rel.priceDisplay || `₹${rel.price}`}
                      </span>
                      {onSelectService && (
                        <button
                          onClick={() => onSelectService(rel)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#e03e1a] bg-[#fef2ee] rounded-lg hover:bg-[#fae4dc] cursor-pointer"
                        >
                          View
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hospital-Grade Hygiene Guarantee Box */}
          <div className="p-4 bg-[#fef2ee] border border-[#f4c8ba] rounded-2xl flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#e03e1a] shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700 leading-relaxed">
              <span className="font-bold text-stone-900 block mb-0.5">Hello Madam Clinical Hygiene Guarantee</span>
              Our beautician arrives equipped with single-use disposable sheets, sanitized instruments, and sealed branded single-use kits. We take all waste back with us upon completion.
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-5 sm:p-6 bg-white border-t border-[#ebdccd] flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-stone-400 block font-serif uppercase tracking-wider">
              Official Price
            </span>
            <span className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">
              {service.priceDisplay || `₹${service.price.toLocaleString('en-IN')}`}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                toggleService(service);
              }}
              className={`px-6 py-3 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                active
                  ? 'bg-[#fef2ee] text-[#e03e1a] hover:bg-[#fae4dc] border border-[#f4c8ba]'
                  : 'bg-[#e03e1a] text-white hover:bg-[#b82e0e]'
              }`}
            >
              {active ? (
                <>
                  <Check className="w-4 h-4 text-[#e03e1a]" />
                  <span>{t('btn.selected', 'Selected in Cart')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{t('btn.book_now', 'Book Appointment')}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
