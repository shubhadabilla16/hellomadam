import React from 'react';
import { ShieldCheck, Home, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseSection: React.FC = () => {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: Home,
      title: 'At-Home Convenience',
      titleHi: 'घर पर आसान सेवा',
      desc: 'Skip Solapur traffic, parking hassles, and parlour waiting lines. Enjoy full salon treatments right in your own bedroom or living space.',
      descHi: 'सोलापूर के ट्रैफिक और पार्लर की कतारों से मुक्ति। अपने बेडरूम या लिविंग रूम में संपूर्ण सैलून सेवा का आनंद लें।',
    },
    {
      icon: ShieldCheck,
      title: 'Ladies-Only Services',
      titleHi: '100% केवल महिलाओं के लिए',
      desc: 'Strictly curated exclusively for women. Every visit is conducted by verified, courteous female beauticians ensuring absolute privacy and peace of mind.',
      descHi: 'पूरी तरह से महिलाओं के लिए समर्पित। प्रशिक्षित व सत्यापित महिला ब्यूटीशियन द्वारा सुरक्षित और आरामदायक सेवा।',
    },
    {
      icon: Sparkles,
      title: 'Personalized Beauty Care',
      titleHi: 'पर्सनलाइज़्ड ब्यूटी केयर',
      desc: 'Our beauticians consult on your skin type, allergies, and treatment history before starting. Single-use sterile disposables opened right in front of you.',
      descHi: 'सेवा शुरू करने से पहले आपकी स्किन टाइप और प्राथमिकताओं की समझ। आपके सामने खोली जाने वाली सीलबंद डिस्पोजेबल किट।',
    },
    {
      icon: Calendar,
      title: 'Easy Appointment Booking',
      titleHi: 'आसान अपॉइंटमेंट बुकिंग',
      desc: 'Book in 4 intuitive steps online or via WhatsApp. Flexible 10:00 AM – 5:00 PM time slots open all 7 days with zero advance payment required.',
      descHi: 'ऑनलाइन या व्हाट्सएप पर 4 आसान चरणों में बुकिंग। सुबह 10:00 से शाम 5:00 बजे तक बिना किसी एडवांस पेमेंट के स्लॉट उपलब्ध।',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#faf7f2] border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>{t('section.why_title', 'Why Choose Hello Madam?')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'hi' ? 'सोलापूर की महिलाएं हम पर भरोसा क्यों करती हैं' : 'Thoughtfully Crafted for Your Comfort'}
          </h2>
          <p className="mt-3 text-sm text-stone-600 leading-relaxed">
            {language === 'hi'
              ? 'बिना किसी बनावटी दावों के—सच्ची स्वच्छता, समय की पाबंदी और महिलाओं के लिए सुरक्षित वातावरण।'
              : 'Grounded in clinical hygiene, punctuality, and peaceful doorstep care across all Solapur neighbourhoods.'}
          </p>
        </div>

        {/* Split Layout: 4 Benefit Blocks + Real Team Arrival Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 4 Benefit Blocks (2x2) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-white rounded-3xl border border-[#ebdccd] shadow-2xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {language === 'hi' ? b.titleHi : b.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
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
                src="/assets/aistudio/hello_madam_team_arrival.jpg"
                alt="Hello Madam Beautician arriving in Solapur home with sanitized kit"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              
              {/* Overlay note */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#ebdccd] shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Real Beautician Arrival in Solapur</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Arrives in uniform with sterile equipment and leaves zero mess behind.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
