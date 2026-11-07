import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HowItWorksSection: React.FC = () => {
  const { t, language } = useLanguage();

  const steps = [
    {
      num: '01',
      title: 'Choose Your Service',
      titleHi: 'अपनी सेवा चुनें',
      desc: 'Explore 60+ individual treatments or select an approved beauty package across facials, waxing, manicure, and hair spa.',
      descHi: 'फेशियल, वैक्स, मेनिक्योर और हेयर स्पा में से अपनी पसंद की सेवा या कॉम्बो पैकेज चुनें।',
    },
    {
      num: '02',
      title: 'Pick Date & Time',
      titleHi: 'तारीख व समय चुनें',
      desc: 'Select your preferred appointment date and time slot between 10:00 AM and 5:00 PM. Available all 7 days in Solapur.',
      descHi: 'सुबह 10:00 से शाम 5:00 बजे के बीच अपनी सुविधानुसार तारीख और समय स्लॉट तय करें।',
    },
    {
      num: '03',
      title: 'Our Team Reviews Your Request',
      titleHi: 'हमारी टीम आपकी रिक्वेस्ट रिव्यू करती है',
      desc: 'Our Solapur coordinator reviews your address, confirms technician availability, and sends an instant WhatsApp confirmation.',
      descHi: 'हमारी टीम आपके पते व समय की पुष्टि कर व्हाट्सएप पर तुरंत कन्फर्मेशन भेजती है।',
    },
    {
      num: '04',
      title: 'Enjoy Your Session at Home',
      titleHi: 'घर बैठे आराम से सेवा का आनंद लें',
      desc: 'Our certified lady professional arrives at your doorstep in uniform with sealed single-use kits. Relax and enjoy pure comfort.',
      descHi: 'हमारी प्रशिक्षित महिला ब्यूटीशियन सैनिटाइज्ड किट के साथ आपके घर पहुंचती हैं। तनावमुक्त होकर आनंद लें।',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>{t('section.how_title', 'How It Works')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'hi' ? 'घर बैठे सैलून सेवा: केवल 4 आसान कदम' : 'Seamless Doorstep Booking in 4 Steps'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'बिना किसी परेशानी के, पारदर्शी प्रक्रिया के साथ अपने घर पर ब्यूटीशियन बुलाएं।'
              : 'Effortless, transparent, and completely ladies-only across Solapur city.'}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-7 bg-[#faf7f2] rounded-3xl border border-[#ebdccd] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <span className="text-4xl font-serif font-bold text-[#e03e1a]/80 group-hover:text-[#e03e1a] transition-colors tabular-nums block mb-3">
                  {s.num}
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                  {language === 'hi' ? s.titleHi : s.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed mt-2">
                  {language === 'hi' ? s.descHi : s.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] font-bold text-[#e03e1a]">
                <span>Step {s.num}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{language === 'hi' ? 'अभी अपनी पहली सेवा बुक करें' : 'Book Your Doorstep Session Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
