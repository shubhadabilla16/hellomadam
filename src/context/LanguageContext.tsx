import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const TRANSLATIONS: Translations = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.services': { en: 'Services', hi: 'सेवाएं' },
  'nav.offers': { en: 'Offers', hi: 'ऑफ़र्स' },
  'nav.packages': { en: 'Packages', hi: 'पैकेजेस' },
  'nav.our_work': { en: 'Our Work', hi: 'हमारा काम' },
  'nav.about': { en: 'About Us', hi: 'हमारे बारे में' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क' },
  'nav.book': { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें' },
  'nav.my_bookings': { en: 'My Bookings', hi: 'मेरी बुकिंग्स' },
  
  // Hero
  'hero.tag': { en: 'LADIES-ONLY AT-HOME BEAUTY · SOLAPUR', hi: 'केवल महिलाओं के लिए होम ब्यूटी · सोलापूर' },
  'hero.title': { en: 'Premium Beauty Care, Delivered to Your Doorstep.', hi: 'प्रीमियम ब्यूटी केयर, सीधे आपके घर तक।' },
  'hero.desc': { 
    en: 'Professional beauty and salon services brought to your home. Enjoy personalized care, comfort and confidence with Hello Madam.',
    hi: 'घर बैठे पाएं प्रोफेशनल ब्यूटी और सैलून सेवाएं। हेलो मैडम के साथ आराम, सुकून और आत्मविश्वास का अनुभव करें।'
  },
  'hero.book_btn': { en: 'Book a Service', hi: 'सेवा बुक करें' },
  'hero.explore_btn': { en: 'Explore Services', hi: 'सेवाएं देखें' },
  'hero.rate_card': { en: 'Official Rate Card', hi: 'ऑफिशियल रेट कार्ड' },
  
  // Benefits
  'trust.ladies_only': { en: '100% Exclusively for Ladies', hi: '100% केवल महिलाओं के लिए' },
  'trust.doorstep': { en: 'At-Home Convenience', hi: 'घर पर आसान सेवा' },
  'trust.professional': { en: 'Personalized Beauty Care', hi: 'पर्सनलाइज़्ड ब्यूटी केयर' },
  'trust.easy_booking': { en: 'Easy Appointment Booking', hi: 'आसान अपॉइंटमेंट बुकिंग' },
  'trust.hygiene': { en: 'Hospital-Grade Single-Use Kits', hi: 'सिंगल-यूज़ हाइजेनिक किट' },

  // Sections
  'section.reels_title': { en: 'Our Reels & Real Moments', hi: 'हमारे रील्स और असली अनुभव' },
  'section.reels_sub': { en: 'Watch our certified beauticians in action across Solapur homes', hi: 'सोलापूर में हमारे सर्टिफाइड ब्यूटीशियन को काम करते देखें' },
  'section.categories_title': { en: 'Explore Salon Services', hi: 'सैलून सेवाओं की सूची' },
  'section.categories_sub': { en: 'Browse through our complete 13 service categories designed exclusively for women in Solapur.', hi: 'सोलापूर की महिलाओं के लिए तैयार की गई हमारी सभी 13 श्रेणियों को देखें।' },
  'section.offers_title': { en: 'Special Privileges & Offers', hi: 'विशेष सुविधाएं और ऑफ़र्स' },
  'section.spotlight_title': { en: 'Spotlight Services', hi: 'स्पॉटलाइट सेवाएं' },
  'section.spotlight_sub': { en: 'Handpicked popular rituals most requested by our clients', hi: 'ग्राहकों द्वारा सबसे ज्यादा पसंद की जाने वाली चुनिंदा सेवाएं' },
  'section.top_rated_title': { en: 'Top Rated Services', hi: 'टॉप रेटेड सेवाएं' },
  'section.featured_title': { en: 'Signature Luxury Treatments', hi: 'सिग्नेचर लक्ज़री ट्रीटमेंट्स' },
  'section.packages_title': { en: 'Recommended Beauty Packages', hi: 'पसंदीदा ब्यूटी पैकेजेस' },
  'section.why_title': { en: 'Why Choose Hello Madam?', hi: 'हेलो मैडम क्यों चुनें?' },
  'section.how_title': { en: 'How It Works', hi: 'यह कैसे काम करता है?' },
  'section.team_title': { en: 'Meet the Team Behind Hello Madam.', hi: 'मिलिए हेलो मैडम की टीम से।' },
  'section.team_sub': { en: 'A dedicated team bringing beauty, care and comfort to your doorstep.', hi: 'एक समर्पित टीम जो आपके घर तक ब्यूटी, केयर और सुकून लेकर आती है।' },

  // Common CTAs
  'btn.book_now': { en: 'Book Now', hi: 'अभी बुक करें' },
  'btn.view_details': { en: 'View Details', hi: 'विवरण देखें' },
  'btn.explore': { en: 'Explore', hi: 'देखें' },
  'btn.add': { en: 'Add to Cart', hi: 'जोड़ें' },
  'btn.selected': { en: 'Selected', hi: 'चुना गया' },
  'btn.book_package': { en: 'Book Package', hi: 'पैकेज बुक करें' },
  'btn.build_custom': { en: 'Build Custom Package', hi: 'कस्टम पैकेज बनाएं' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('hello_madam_lang');
      if (stored === 'hi' || stored === 'en') return stored;
    } catch {
      // fallback
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('hello_madam_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string, defaultText?: string): string => {
    const item = TRANSLATIONS[key];
    if (item && item[language]) {
      return item[language];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
