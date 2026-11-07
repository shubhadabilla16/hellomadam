export interface BusinessOffer {
  id: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  description: string;
  descriptionHi: string;
  badge: string;
  badgeHi: string;
  ctaText: string;
  ctaTextHi: string;
  ctaLink: string;
  isActive: boolean;
  terms: string[];
  termsHi: string[];
}

export const INITIAL_OFFERS: BusinessOffer[] = [
  {
    id: 'offer-welcome-doorstep',
    title: 'The Hello Madam Solapur Privilege',
    titleHi: 'हेलो मैडम सोलापूर विशेषाधिकार',
    subtitle: 'Zero Travel Charges + Free Sterile Single-Use Kit',
    subtitleHi: 'शून्य यात्रा शुल्क + मुफ्त स्टेराइल सिंगल-यूज़ किट',
    description: 'We believe premium parlour care should be seamless. Enjoy complimentary home travel across all Solapur localities and a freshly sealed single-use hygienic kit with every booking.',
    descriptionHi: 'सोलापूर के किसी भी इलाके में घर आने का कोई अतिरिक्त चार्ज नहीं। प्रत्येक सेवा के साथ 100% सैनिटाइज्ड एवं सीलबंद डिस्पोजेबल किट शामिल।',
    badge: 'Official Solapur Privilege',
    badgeHi: 'ऑफिशियल सोलापूर विशेषाधिकार',
    ctaText: 'Book an Appointment',
    ctaTextHi: 'अपॉइंटमेंट बुक करें',
    ctaLink: '/book',
    isActive: true,
    terms: [
      'Valid across all residential areas in Solapur (Navi Peth, Jule Solapur, Hotgi Rd, etc.)',
      'Operating hours: 10:00 AM – 5:00 PM',
      'Exclusively for women · Performed by certified lady beauticians'
    ],
    termsHi: [
      'सोलापूर के सभी रिहायशी इलाकों (नवी पेठ, जुले सोलापूर, होटगी रोड आदि) में मान्य',
      'समय: सुबह 10:00 बजे से शाम 5:00 बजे तक',
      'केवल महिलाओं के लिए · प्रशिक्षित महिला ब्यूटीशियन द्वारा सेवा'
    ]
  },
  {
    id: 'offer-combo-glow',
    title: 'Festival & Wedding Season Consultation',
    titleHi: 'त्यौहार व शादी समारोह स्पेशल कंसल्टेशन',
    subtitle: 'Custom Pre-Bridal & Family Grooming at Home',
    subtitleHi: 'घर पर दुल्हन व परिवार के लिए कस्टमाइज्ड ग्रूमिंग',
    description: 'Planning a sangeet, wedding, or family pooja? Book group sessions for mother, sisters, and bride-to-be with synchronized beauticians.',
    descriptionHi: 'शादी, सगाई या पारिवारिक उत्सव के लिए घर पर ही पूरी तैयारी। एक साथ मल्टीपल फैमिली मेंबर्स के लिए बुकिंग सुविधा।',
    badge: 'Group Bookings',
    badgeHi: 'ग्रुप बुकिंग्स',
    ctaText: 'Inquire on WhatsApp',
    ctaTextHi: 'व्हाट्सएप पर संपर्क करें',
    ctaLink: 'https://wa.me/919657156795?text=Hello%20Madam%20Solapur!%20I%20would%20like%20to%20inquire%20about%20a%20wedding/festival%20package.',
    isActive: true,
    terms: [
      'Advance notice recommended for wedding parties',
      'Direct coordination with Hello Madam founder via WhatsApp +91 9657156795'
    ],
    termsHi: [
      'शादी व बड़े कार्यक्रमों के लिए पूर्व सूचना अनुशंसित',
      'हेलो मैडम टीम के साथ सीधा व्हाट्सएप समन्वय: +91 9657156795'
    ]
  }
];
