import React from 'react';
import { ShieldCheck, Home, Sparkles, Award, PackageCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import doorstepArrivalImg from '../assets/images/doorstep_beauty_arrival_1794549530140.jpg';

export const WhyChooseSection: React.FC = () => {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: Award,
      title: 'Professional Beauticians',
      titleHi: 'प्रशिक्षित व सत्यापित ब्यूटीशियन',
      desc: 'Certified and background-verified female specialists trained in modern salon techniques, providing respectful, gentle, and expert doorstep care.',
      descHi: 'प्रमाणित व सत्यापित महिला ब्यूटीशियन जो आधुनिक सैलून तकनीकों और सम्मानजनक देखभाल में प्रशिक्षित हैं।',
    },
    {
      icon: Home,
      title: 'At-Home Convenience',
      titleHi: 'घर बैठे संपूर्ण सुविधा',
      desc: 'Skip Solapur traffic, parking hassles, and parlour waiting queues. Transform your bedroom or living space into a private, relaxing beauty oasis.',
      descHi: 'सोलापूर के ट्रैफिक और पार्लर की कतारों से मुक्ति। अपने घर में शांति व पूर्ण गोपनीयता के साथ सेवा का आनंद लें।',
    },
    {
      icon: ShieldCheck,
      title: 'Hygiene & Safety',
      titleHi: 'सर्वोच्च स्वच्छता व सुरक्षा',
      desc: 'Hospital-grade hygiene standards. We use fresh disposable bedsheets, single-use wipes, sterilized tools, and ensure 100% mess-free cleanup after service.',
      descHi: 'सिंगल-यूज़ डिस्पोजेबल शीट्स, सैनिटाइज्ड टूल्स और काम पूरा होने के बाद साफ-सफाई की 100% गारंटी।',
    },
    {
      icon: PackageCheck,
      title: 'Quality Beauty Products',
      titleHi: 'उच्च गुणवत्ता वाले ब्यूटी प्रोडक्ट्स',
      desc: '100% authentic, sealed mono-dose skincare packs from premier brands including O3+, VLCC, Lotus Professional, Cheryl\'s, and Italian Rica wax.',
      descHi: 'O3+, VLCC, लोटस प्रोफेशनल, और इटालियन रिका वैक्स जैसे प्रतिष्ठित ब्रांड्स के सीलबंद ओरिजिनल प्रोडक्ट्स।',
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#faf7f2] border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>{t('section.why_title', 'Why Hello Madam?')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'hi' ? 'सोलापूर की महिलाएं हम पर भरोसा क्यों करती हैं' : 'Why Hello Madam?'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'बिना किसी बनावटी दावों के—सच्ची स्वच्छता, समय की पाबंदी और महिलाओं के लिए सुरक्षित वातावरण।'
              : 'Grounded in clinical hygiene, certified beauticians, and peaceful doorstep care across all Solapur neighbourhoods.'}
          </p>
        </div>

        {/* Split Layout: 4 Core Benefit Blocks + Real Team Arrival Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 4 Benefit Blocks (2x2) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-white rounded-3xl border border-[#ebdccd] shadow-2xs hover:shadow-md transition-all space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                    {language === 'hi' ? b.titleHi : b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {language === 'hi' ? b.descHi : b.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Real Team Arrival Photograph */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ebdccd] aspect-4/3 sm:aspect-4/3 bg-stone-100">
              <img
                src={doorstepArrivalImg}
                alt="Hello Madam Beautician arriving in Solapur home with sanitized kit"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              
              {/* Overlay note */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#ebdccd] shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Doorstep Arrival in Solapur</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                  Our beauticians arrive in uniform with sealed kits, clean disposables &amp; zero mess guarantee.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
