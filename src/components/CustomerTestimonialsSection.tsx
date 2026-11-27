import React from 'react';
import { Star, MapPin, CheckCircle, Video, Heart, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../data/testimonialsData';
import { useLanguage } from '../context/LanguageContext';

export const CustomerTestimonialsSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-[#faf7f2] border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
            <Heart className="w-3.5 h-3.5 text-[#e03e1a] fill-[#e03e1a]" />
            <span>{language === 'hi' ? 'ग्राहकों के अनुभव' : 'Customer Testimonials'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'hi' ? 'सोलापुर की महिलाओं का सच्चा विश्वास' : 'Loved by Women Across Solapur'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'सच्ची सोलापुर महिलाओं की वास्तविक प्रतिक्रिया। 100% स्वच्छता, समय की पाबंदी और सौम्य सेवा।'
              : 'Genuine feedback from verified Solapur clients who enjoy salon comfort in their own homes.'}
          </p>
        </div>

        {/* Featured Review (Mrs. Pranita Amar Pompawar) */}
        {TESTIMONIALS[0] && (
          <div className="mb-10 bg-white rounded-3xl p-7 sm:p-10 border border-[#ebdccd] shadow-xs relative overflow-hidden">
            <Quote className="absolute top-4 right-6 w-24 h-24 text-[#fef2ee] pointer-events-none -rotate-12" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-stone-300">·</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#fef2ee] text-[#e03e1a] text-xs font-bold rounded-full border border-[#f4c8ba]">
                    <Video className="w-3.5 h-3.5" />
                    <span>Real Client Video Review</span>
                  </span>
                  <span className="text-xs text-stone-500">Verified Doorstep Session</span>
                </div>

                <p className="text-base sm:text-lg text-stone-800 leading-relaxed font-serif italic mb-5">
                  "{TESTIMONIALS[0].comment}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#fef2ee] border border-[#f4c8ba] text-[#e03e1a] font-serif font-bold text-base flex items-center justify-center shrink-0">
                    {TESTIMONIALS[0].avatarText}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-stone-900">{TESTIMONIALS[0].name}</h3>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="flex items-center gap-1 text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-[#e03e1a]" />
                        <span>{TESTIMONIALS[0].locality}</span>
                      </span>
                      <span>·</span>
                      <span className="text-[#e03e1a] font-medium">{TESTIMONIALS[0].service}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#ebdccd]">
                <Link
                  to="/our-work"
                  className="inline-flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#e03e1a] bg-[#fef2ee] hover:bg-[#e03e1a] hover:text-white transition-all border border-[#f4c8ba]"
                >
                  <Video className="w-4 h-4" />
                  <span>Watch Video Session</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4 Client Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.slice(1).map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-[#ebdccd] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                    {t.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#ebdccd]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#fef2ee] border border-[#f4c8ba] text-[#e03e1a] font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {t.avatarText}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-stone-900 truncate">{t.name}</h4>
                      <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 truncate">
                      <MapPin className="w-2.5 h-2.5 text-[#e03e1a] shrink-0" />
                      <span className="truncate">{t.locality}</span>
                    </div>
                    <p className="text-[10px] text-[#e03e1a] font-medium truncate mt-0.5">
                      {t.service}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
