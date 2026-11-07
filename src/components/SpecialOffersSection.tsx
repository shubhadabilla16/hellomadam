import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, MapPin, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

export const SpecialOffersSection: React.FC = () => {
  const { offers } = useAdmin();
  const { language } = useLanguage();

  const activeOffers = offers.filter((o) => o.isActive);

  return (
    <section id="offers" className="py-16 sm:py-24 bg-white border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* If official offers are active */}
        {activeOffers.length > 0 ? (
          <div className="space-y-12">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>{language === 'hi' ? 'विशेष सुविधाएं एवं ऑफीशियल विशेषाधिकार' : 'Official Hello Madam Privileges'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                {language === 'hi' ? 'सोलापूर की महिलाओं के लिए विशेष लाभ' : 'Special Privileges & Inclusions'}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-500">
                {language === 'hi'
                  ? 'पारदर्शी सेवा, वास्तविक मूल्य और बिना किसी छुपे शुल्क के घर पर सेवा।'
                  : 'Transparent doorstep pampering with authentic inclusions and zero hidden visit fees.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="relative rounded-3xl bg-gradient-to-br from-[#fef2ee] via-[#faf7f2] to-amber-50/40 border border-[#f4c8ba] p-8 sm:p-10 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-3.5 py-1 text-xs font-bold text-[#e03e1a] bg-white rounded-full border border-[#f4c8ba] shadow-2xs font-serif uppercase tracking-wider">
                        {language === 'hi' ? offer.badgeHi : offer.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-[#e03e1a]" />
                        <span>Solapur City</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">
                        {language === 'hi' ? offer.titleHi : offer.title}
                      </h3>
                      <p className="text-sm font-semibold text-[#e03e1a] mt-1 font-serif">
                        {language === 'hi' ? offer.subtitleHi : offer.subtitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {language === 'hi' ? offer.descriptionHi : offer.description}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-[#ebdccd]">
                      {(language === 'hi' ? offer.termsHi : offer.terms).map((term, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{term}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#ebdccd] flex flex-wrap items-center justify-between gap-4">
                    {offer.ctaLink.startsWith('http') ? (
                      <a
                        href={offer.ctaLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all flex items-center gap-2 shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? offer.ctaTextHi : offer.ctaText}</span>
                      </a>
                    ) : (
                      <Link
                        to={offer.ctaLink}
                        className="px-6 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all flex items-center gap-2 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                        <span>{language === 'hi' ? offer.ctaTextHi : offer.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}

                    <span className="text-[11px] text-stone-400 italic">
                      {language === 'hi' ? 'कोई अग्रिम भुगतान आवश्यक नहीं' : 'No advance payment required'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Beautiful Promotional Banner when no extra discount is configured */
          <div className="p-8 sm:p-12 rounded-3xl bg-[#1c1917] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold tracking-wider uppercase font-serif">
                <ShieldCheck className="w-4 h-4 text-[#e03e1a]" />
                <span>The Hello Madam Experience</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Zero Travel Fee Across Solapur
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Enjoy transparent salon prices with no hidden doorstep surcharges. Every service includes single-use disposables, sterilized instruments, and certified female beauticians.
              </p>
            </div>

            <Link
              to="/book"
              className="px-8 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all shrink-0 shadow-md"
            >
              Book an Appointment
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
