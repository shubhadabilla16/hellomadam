export interface Testimonial {
  id: string;
  name: string;
  locality: string;
  service: string;
  rating: number;
  date: string;
  comment: string;
  avatarText: string;
  isRealClientVideo?: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-video-real',
    name: 'Mrs. Pranita Amar Pompawar',
    locality: 'Solapur City',
    service: 'Ice Globe Facial & Stress-Relief Spa',
    rating: 5,
    date: 'Verified Client Video',
    comment: 'I booked Hello Madam Home Salon in Solapur via mobile. When the beauticians arrived, they laid out all sanitized equipment, asked about my skin and allergy history, and used fresh disposable bedsheets. The chilled ice globes massage and facial were so calming that I fell into a peaceful sleep! Their prices are completely reasonable, and they even packed up every bit of waste before leaving. A huge thank you to the Hello Madam team!',
    avatarText: 'PP',
    isRealClientVideo: true,
  },
  {
    id: 't-1',
    name: 'Priyanka Patil',
    locality: 'Jule Solapur',
    service: 'Hydra Facial & Advanced Pedicure',
    rating: 5,
    date: 'October 2026',
    comment: 'Having professional lady beauticians come directly to my home in Jule Solapur was such a relief! With a 2-year-old toddler, visiting a parlour was impossible. They brought clean disposable sheets, sanitized equipment, and the Hydra Facial was truly heavenly.',
    avatarText: 'PP',
  },
  {
    id: 't-2',
    name: 'Snehal Kulkarni',
    locality: 'Navi Peth, Solapur',
    service: 'Hygienic Waxing & Rose Pedicure',
    rating: 5,
    date: 'October 2026',
    comment: 'The hygiene standards are 10/10. The beauticians were in professional uniform, extremely respectful, and skilled. The waxing was virtually painless compared to my regular parlour, and I could relax in my own living room with AC on!',
    avatarText: 'SK',
  },
  {
    id: 't-3',
    name: 'Radhika Deshmukh',
    locality: 'Datta Chowk / Navi Peth',
    service: 'Festival All-in-One Combo',
    rating: 5,
    date: 'September 2026',
    comment: 'Booked Hello Madam for festival preparation. They took care of everything from the glow facial to the hair steamer spa, waxing, and foot therapy. Free transportation across Solapur made it even better!',
    avatarText: 'RD',
  },
  {
    id: 't-4',
    name: 'Ananya Shinde',
    locality: 'Hotgi Road, Solapur',
    service: 'Hair Spa with Steamer & Champi',
    rating: 5,
    date: 'September 2026',
    comment: 'The hair spa with the portable steam dome and massage were pure bliss after a long working week. The prices are completely transparent with no hidden charges. Hello Madam is now my permanent monthly salon!',
    avatarText: 'AS',
  },
];

export interface VideoItem {
  id: string;
  title: string;
  marathiTitle: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnailTime?: number;
  duration: string;
  highlights: string[];
}

export const REAL_VIDEOS: VideoItem[] = [
  {
    id: 'video-1-service-overview',
    title: 'Pune-Mumbai Style Professional Beauty Services Now at Your Home in Solapur',
    marathiTitle: 'सोलापुरात घर बसल्या सर्व Parlour Services थेट तुमच्या घरी',
    category: 'Doorstep Salon Showcase',
    description: 'Experience how Hello Madam’s certified female beauticians in professional uniform arrive at client homes across Solapur. Features Hydra Facial, Advanced Pedicure, Hair Spa Steamer, Hair Color, Waxing, and message from management on complete clinical hygiene, single-use disposables, and free transportation!',
    videoUrl: '/assets/aistudio/WhatsApp_Video_2026-11-03_at_2.22.17_PM_d4ea3547.mp4',
    duration: '0:31',
    highlights: [
      'Hydra Facial with LED Rejuvenation',
      'Advanced Pedicure with Rose Water Soak',
      'Hair Spa with Professional Steamer Dome',
      'Hygienic Waxing with Single-Use Disposables',
      'Free Transportation Offer Across Solapur'
    ],
  },
  {
    id: 'video-2-client-review',
    title: 'Real Client Experience: Mrs. Pranita Amar Pompawar Shares Her Doorstep Session',
    marathiTitle: 'सौ. प्रणीता अमर पंपटवार यांचा मनमोकळा अनुभव',
    category: 'Client Testimonial & Live Demo',
    description: 'Watch the full step-by-step experience: from arrival with sanitized beauty bags, disposable sterile bedsheet setup, allergy & skin history check, to the soothing ice globes facial massage, ultrasonic scrubber, and complete zero-mess cleanup.',
    videoUrl: '/assets/aistudio/WhatsApp_Video_2026-11-03_at_2.22.18_PM_1c3a4ff6.mp4',
    duration: '1:06',
    highlights: [
      'Medical & Skin Allergy History Inquired First',
      'Sterile Single-Use Bedsheet Laid on Bed',
      'Chilled Blue Ice Globes & Ultrasonic Scrubber',
      'Soothing Candles & Aromatic Rose Petals',
      'Zero Mess: Every Bit of Waste Packed & Removed'
    ],
  },
];

export interface InstagramPost {
  id: string;
  caption: string;
  image: string;
  likes: number;
  comments: number;
  tag: string;
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    caption: 'Pune-Mumbai style luxury home parlour now in Solapur! Certified lady beauticians bringing Hydra Facial, Hair Spa & Pedicures to your living room. 🏡✨ #HelloMadamSolapur',
    image: '/src/assets/images/service_facial_glow_1793599854639.jpg',
    likes: 486,
    comments: 38,
    tag: '#HomeSalonSolapur',
  },
  {
    id: 'ig-2',
    caption: 'Pure relaxation with chilled ice globes and botanical massage. Taking away all the day’s fatigue in total comfort and privacy. 🌸💆‍♀️ #SolapurLadies',
    image: '/src/assets/images/hero_skincare_treatment_1793599854054.jpg',
    likes: 392,
    comments: 24,
    tag: '#IceGlobeFacial',
  },
  {
    id: 'ig-3',
    caption: 'Rose petal pedicure therapy at your home! Soak in warm floral bliss and get silky soft heels without stepping outside. 🌹💅 #PedicureAtHome',
    image: '/src/assets/images/service_mani_pedi_1793599857106.jpg',
    likes: 341,
    comments: 19,
    tag: '#FootSpaSolapur',
  },
  {
    id: 'ig-4',
    caption: '100% single-use disposable bedsheets, sanitized tools in sealed pouches, and zero mess left behind. Your hygiene is our highest commitment! 🛡️🧴',
    image: '/src/assets/images/about_beautician_care_1793599856776.jpg',
    likes: 512,
    comments: 42,
    tag: '#HygieneFirst',
  },
  {
    id: 'ig-5',
    caption: 'Festive glow rituals and bridal makeovers customized for your special celebrations in Solapur. Book in advance on +91 9657156795! 👰✨',
    image: '/src/assets/images/service_bridal_makeup_1793599854875.jpg',
    likes: 429,
    comments: 31,
    tag: '#SolapurBridal',
  },
  {
    id: 'ig-6',
    caption: 'Serving Navi Peth, Datta Chowk, Jule Solapur, Hotgi Road, Saat Rasta & beyond. DM us or tap link in bio to book! 💕',
    image: '/src/assets/images/service_facial_glow_1793599854639.jpg',
    likes: 478,
    comments: 36,
    tag: '#HelloMadam',
  },
];

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'Is Hello Madam strictly for women?',
    answer: 'Yes, 100%. Hello Madam is exclusively for ladies. Both our certified beauticians and our customers are women only. We prioritize your privacy, dignity, and absolute comfort in your home.',
    category: 'Safety & Trust',
  },
  {
    question: 'Where is Hello Madam located in Solapur, and which areas do you serve?',
    answer: 'Our main office is located in the Navi Peth, Datta Chowk area (near June Vitthal Mandir, Mahalakshmi Dudh Dairy, Nikon Camera, Datta Chowk, Solapur). We serve homes all across Solapur including Navi Peth, Datta Chowk, Jule Solapur, Hotgi Road, Saat Rasta, Lashkar, Kumtha Naka, Vijapur Road, and surrounding residential colonies.',
    category: 'Coverage',
  },
  {
    question: 'What are your operating hours?',
    answer: 'We provide home salon visits Monday to Sunday from 10:00 AM to 5:00 PM. We recommend booking in advance to secure your preferred morning or afternoon time slot.',
    category: 'Operating Hours',
  },
  {
    question: 'How do you guarantee clinical hygiene and cleanliness at home?',
    answer: 'As shown in our live videos, our beauticians carry fresh single-use disposable bedsheets, sanitized instruments in sealed kits, disposable wax spatulas, and branded single-dose products. Before leaving, our team packs every scrap of disposable waste and cleans the area thoroughly, leaving your home spotless.',
    category: 'Hygiene',
  },
  {
    question: 'What does the customer need to provide?',
    answer: 'Just a comfortable chair or bed in a private room, an electrical socket for the wax heater or hair steamer, and a small basin with warm water. Everything else—including towels, sanitized tools, and extension boards—is carried by our beauticians.',
    category: 'Preparation',
  },
  {
    question: 'How can I contact or book Hello Madam?',
    answer: 'You can book directly via our online booking form on this website, call or WhatsApp us on +91 9657156795, email dfinesolapur@gmail.com, or message us on Instagram @hello_madam_solapur5.',
    category: 'Bookings',
  },
];
