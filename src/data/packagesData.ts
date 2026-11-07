import { SERVICES_LIST, ServiceItem } from './servicesData';

export interface BeautyPackage {
  id: string;
  name: string;
  nameHi: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  includedServiceIds: string[];
  packagePrice?: number; // Configured by owner; if undefined, equals original total
  isOfficialOffer: boolean; // Only true when approved by owner
  badge?: string;
  badgeHi?: string;
  image: string;
}

export const INITIAL_PACKAGES: BeautyPackage[] = [
  {
    id: 'pkg-head-to-toe-glow',
    name: 'Head-to-Toe Solapur Glow',
    nameHi: 'हेड-टू-टो सोलापूर ग्लो',
    tagline: 'Complete Refresh for Skin, Hands & Feet',
    taglineHi: 'स्किन, हाथ और पैरों का संपूर्ण निखार',
    description: 'A serene combination of our Fruit Facial, D Tan Manicure, D Tan Pedicure, and precision Eyebrow Threading.',
    descriptionHi: 'फ्रूट फेशियल, डी-टैन मेनिक्योर, डी-टैन पेडिक्योर और आईब्रो थ्रेडिंग का संपूर्ण पैकेज।',
    includedServiceIds: [
      'facial-basic-fruit', // ₹850
      'manicure-dtan',      // ₹500
      'pedicure-dtan',      // ₹550
      'threading-eyebrow'   // ₹50
    ],
    // Original sum = 850 + 500 + 550 + 50 = 1950
    packagePrice: 1850, // Owner approved privilege (₹100 genuine combo value)
    isOfficialOffer: true,
    badge: 'Most Popular Combo',
    badgeHi: 'सबसे लोकप्रिय कॉम्बो',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pkg-facial-threading-express',
    name: 'Glow & Brow Express',
    nameHi: 'ग्लो और ब्रो एक्सप्रेस',
    tagline: 'Quick Radiance for Festive Gatherings',
    taglineHi: 'त्यौहारों व खास मौकों के लिए त्वरित निखार',
    description: 'Gold Facial with full face precision threading (Eyebrows, Upper Lip, and Forehead).',
    descriptionHi: 'गोल्ड फेशियल के साथ आईब्रो, अपर लिप व फोरहेड थ्रेडिंग।',
    includedServiceIds: [
      'facial-basic-gold',   // ₹850
      'threading-eyebrow',   // ₹50
      'threading-upperlip',  // ₹30
      'threading-forehead'   // ₹20
    ],
    // Original sum = 850 + 50 + 30 + 20 = 950
    packagePrice: 900,
    isOfficialOffer: true,
    badge: 'Quick Ritual',
    badgeHi: 'क्विक रिचुअल',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pkg-hair-scalp-revival',
    name: 'Hair Spa & Champi Revitalize',
    nameHi: 'हेयर स्पा और चंप्पी रिवाइटलाइज',
    tagline: 'Deep Scalp Therapy & Nourishing Steam',
    taglineHi: 'गहरी स्कैल्प थेरेपी और स्टीम स्पा',
    description: 'Matrix Hair Spa with intense steam mask paired with traditional Shahnaz botanical head massage.',
    descriptionHi: 'मैट्रिक्स हेयर स्पा स्टीम मास्क एवं शहनाज हर्बल तेल से सिर की चंप्पी।',
    includedServiceIds: [
      'hairspa-matrix-medium', // ₹850 (base)
      'headmsg-shenaze',       // ₹250
    ],
    // Original sum = 850 + 250 = 1100
    packagePrice: 1050,
    isOfficialOffer: true,
    badge: 'Stress Relief',
    badgeHi: 'तनाव मुक्ति',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pkg-smooth-silk-waxing',
    name: 'Silk Smooth Wax & Clean-up',
    nameHi: 'सिल्क स्मूथ वैक्स व क्लीन-अप',
    tagline: 'Flawless Arms, Legs & Clear Complexion',
    taglineHi: 'मुलायम हाथ-पैर और साफ दमकती त्वचा',
    description: 'Italian Rica Wax for Full Hands and Full Legs combined with an organic Fruit Clean-up.',
    descriptionHi: 'इटालियन रिका वैक्स (फुल हैंड्स व फुल लेग्स) के साथ फ्रूट क्लीन-अप।',
    includedServiceIds: [
      'wax-rica-fullhands', // ₹500
      'wax-rica-fullleg',   // ₹1,200
      'cleanup-fruit',      // ₹450
    ],
    // Original sum = 500 + 1200 + 450 = 2150
    packagePrice: 2050,
    isOfficialOffer: true,
    badge: 'Silky Touch',
    badgeHi: 'सिल्की टच',
    image: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pkg-bridal-luxury-glow',
    name: 'Bridal & Occasion Royal Pamper',
    nameHi: 'ब्राइडल व खास मौकों के लिए रॉयल पैंपर',
    tagline: 'The Ultimate Doorstep Bridal Preparation',
    taglineHi: 'दुल्हन व शादी समारोह के लिए संपूर्ण तैयारी',
    description: 'Korean Glass Skin Facial, Full Body Aroma Polishing, Advance Manicure & Advance Pedicure.',
    descriptionHi: 'कोरियन ग्लास स्किन फेशियल, फुल बॉडी अरोमा पॉलिशिंग, एडवांस मेनिक्योर व एडवांस पेडिक्योर।',
    includedServiceIds: [
      'facial-prem-korean-glass', // ₹3,000
      'polish-full-body-aroma',   // ₹2,000
      'manicure-advance',         // ₹700
      'pedicure-advance',         // ₹750
    ],
    // Original sum = 3000 + 2000 + 700 + 750 = 6450
    packagePrice: 6200,
    isOfficialOffer: true,
    badge: 'Royal Luxury',
    badgeHi: 'शाही लक्ज़री',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  },
];

/**
 * Calculates package metrics from real service catalogue data
 */
export function getPackageDetails(pkg: BeautyPackage, allServices: ServiceItem[] = SERVICES_LIST) {
  const services = pkg.includedServiceIds
    .map(id => allServices.find(s => s.id === id))
    .filter((s): s is ServiceItem => Boolean(s));

  const originalTotal = services.reduce((sum, s) => sum + s.price, 0);
  const finalPrice = pkg.packagePrice !== undefined ? pkg.packagePrice : originalTotal;
  const savings = Math.max(0, originalTotal - finalPrice);
  
  const estimatedMins = services.reduce((sum, s) => {
    const match = s.duration.match(/\d+/);
    return sum + (match ? parseInt(match[0], 10) : 40);
  }, 0);

  return {
    services,
    originalTotal,
    finalPrice,
    savings,
    serviceCount: services.length,
    estimatedMins,
  };
}
