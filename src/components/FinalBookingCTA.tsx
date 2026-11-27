import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Phone, Sparkles, ShieldCheck, Clock, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FinalBookingCTA: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 sm:py-28 bg-[#faf7f2] relative overflow-hidden">
      {/* Subtle background flourishes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#fef2ee] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#fbe7e0] blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#e03e1a] to-[#c93514] rounded-3xl p-8 sm:p-14 lg:p-16 text-white text-center shadow-xl relative overflow-hidden">
          
          {/* Decorative rings */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold uppercase tracking-wider text-amber-200 border border-white/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सोलापुर में लेडीज-ओनली सर्विस' : 'Solapur Ladies-Only At-Home Salon'}</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            {language === 'hi'
              ? 'क्या आप घर बैठे ब्यूटी अनुभव के लिए तैयार हैं?'
              : 'Ready to Experience Beauty at Home?'}
          </h2>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-sans leading-relaxed">
            {language === 'hi'
              ? 'हैलो मैडम के साथ अपनी पसंदीदा ब्यूटी सेवा बुक करें और बिना बाहर निकले प्रोफेशनल देखभाल का आनंद लें।'
              : 'Book your favourite beauty service with Hello Madam and enjoy professional care without stepping outside.'}
          </p>

          {/* Trust points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-white/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>100% Verified Lady Beauticians</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Mon – Sun: 10:00 AM – 5:00 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Single-Use Disposables</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#e03e1a] hover:bg-stone-50 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#e03e1a]" />
              <span>{language === 'hi' ? 'अपना अपॉइंटमेंट बुक करें' : 'Book Your Appointment'}</span>
            </Link>

            <a
              href="https://wa.me/919657156795?text=Hello%20Madam,%20I%20would%20like%20to%20book%20a%20home%20salon%20appointment%20in%20Solapur."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-xs uppercase tracking-wider border border-white/30 backdrop-blur-xs transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>{language === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat on WhatsApp'}</span>
            </a>

            <a
              href="tel:+919657156795"
              className="hidden lg:inline-flex items-center justify-center gap-2 px-5 py-4 text-white/80 hover:text-white text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 9657156795</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
