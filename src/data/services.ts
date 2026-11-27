export interface Service {
  id: string;
  name: string;
  category: string;
  sub?: string;
  price: number;
  duration?: number; // minutes
  perPerson?: boolean;
  featured?: boolean;
  active: boolean;
}

export const SERVICES: Service[] = [
  // --------------------------------------------------------------------------
  // Threading (id: threading)
  // --------------------------------------------------------------------------
  {
    id: 'threading-eyebrows',
    name: 'Threading - Eyebrows',
    category: 'threading',
    sub: 'Single Area',
    price: 50,
    duration: 15,
    featured: true,
    active: true,
  },
  {
    id: 'threading-upper-lips',
    name: 'Threading - Upper Lips',
    category: 'threading',
    sub: 'Single Area',
    price: 30,
    duration: 15,
    active: true,
  },
  {
    id: 'threading-forehead',
    name: 'Threading - Forehead',
    category: 'threading',
    sub: 'Single Area',
    price: 20,
    duration: 15,
    active: true,
  },
  {
    id: 'threading-chin',
    name: 'Threading - Chin',
    category: 'threading',
    sub: 'Single Area',
    price: 30,
    duration: 15,
    active: true,
  },
  {
    id: 'full-face-threading',
    name: 'Full Face - Threading',
    category: 'threading',
    sub: 'Full Face',
    price: 140,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Face Wax (id: face-wax)
  // --------------------------------------------------------------------------
  {
    id: 'upper-lips-rica-waxing',
    name: 'Upper Lips - Rica Waxing',
    category: 'face-wax',
    sub: 'Rica Wax',
    price: 100,
    active: true,
  },
  {
    id: 'full-face-waxing-rica-brazilian-wax',
    name: 'Full Face Waxing - Rica Brazilian Wax',
    category: 'face-wax',
    sub: 'Rica Brazilian Wax',
    price: 450,
    duration: 30,
    featured: true,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Body Wax (id: body-wax)
  // --------------------------------------------------------------------------
  {
    id: 'underarms-waxing-honey-wax',
    name: 'Underarms Waxing - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 150,
    duration: 20,
    active: true,
  },
  {
    id: 'underarms-waxing-rica-brazilian-wax',
    name: 'Underarms Waxing - Rica Brazilian Wax',
    category: 'body-wax',
    sub: 'Rica Brazilian Wax',
    price: 200,
    duration: 20,
    active: true,
  },
  {
    id: 'butt-wax-honey-wax',
    name: 'Butt Wax - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 300,
    active: true,
  },
  {
    id: 'full-arm-waxing-honey-wax',
    name: 'Full Arm Waxing - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 250,
    duration: 20,
    active: true,
  },
  {
    id: 'full-arms-underarms-honey-wax',
    name: 'Full Arms + Underarms - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 350,
    duration: 30,
    active: true,
  },
  {
    id: 'full-arms-waxing-rica-wax',
    name: 'Full Arms Waxing - Rica Wax',
    category: 'body-wax',
    sub: 'Rica Wax',
    price: 500,
    duration: 25,
    active: true,
  },
  {
    id: 'full-back-waxing-honey-wax',
    name: 'Full Back Waxing - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 400,
    duration: 30,
    active: true,
  },
  {
    id: 'half-legs-waxing-honey-wax',
    name: 'Half Legs Waxing - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 250,
    duration: 20,
    active: true,
  },
  {
    id: 'tummy-waxing-rica-wax',
    name: 'Tummy Waxing - Rica Wax',
    category: 'body-wax',
    sub: 'Rica Wax',
    price: 425,
    duration: 20,
    active: true,
  },
  {
    id: 'bikini-waxing-honey-wax',
    name: 'Bikini Waxing - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 495,
    duration: 30,
    active: true,
  },
  {
    id: 'full-arms-waxing-rica-roll-on-wax',
    name: 'Full Arms Waxing - Rica Roll on Wax',
    category: 'body-wax',
    sub: 'Rica Roll-on Wax',
    price: 499,
    duration: 25,
    active: true,
  },
  {
    id: 'full-arms-underarms-rica-wax',
    name: 'Full Arms + Underarms - Rica Wax',
    category: 'body-wax',
    sub: 'Rica Wax',
    price: 500,
    duration: 30,
    active: true,
  },
  {
    id: 'butt-wax-rica-wax',
    name: 'Butt Wax - Rica Wax',
    category: 'body-wax',
    sub: 'Rica Wax',
    price: 500,
    active: true,
  },
  {
    id: 'full-legs-waxing-rica-roll-on-wax',
    name: 'Full Legs Waxing - Rica Roll on Wax',
    category: 'body-wax',
    sub: 'Rica Roll-on Wax',
    price: 510,
    duration: 25,
    active: true,
  },
  {
    id: 'full-legs-waxing-rica-wax',
    name: 'Full Legs Waxing - Rica Wax',
    category: 'body-wax',
    sub: 'Rica Wax',
    price: 1200,
    duration: 30,
    active: true,
  },
  {
    id: 'full-leg-waxing-honey-wax',
    name: 'Full Leg Waxing - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 500,
    duration: 20,
    active: true,
  },
  {
    id: 'full-arms-full-legs-underarms-honey-wax',
    name: 'Full Arms + Full Legs + Underarms - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 700,
    duration: 60,
    active: true,
  },
  {
    id: 'full-arms-full-legs-underarms-rica-wax',
    name: 'Full Arms + Full Legs + Underarms - Rica Wax',
    category: 'body-wax',
    sub: 'Rica Wax',
    price: 1250,
    duration: 60,
    featured: true,
    active: true,
  },
  {
    id: 'full-body-waxing-honey-wax',
    name: 'Full Body Waxing - Honey Wax',
    category: 'body-wax',
    sub: 'Honey Wax',
    price: 1500,
    duration: 80,
    active: true,
  },
  {
    id: 'bikini-waxing-rica-brazilian-wax',
    name: 'Bikini Waxing - Rica Brazilian Wax',
    category: 'body-wax',
    sub: 'Rica Brazilian Wax',
    price: 2000,
    duration: 30,
    active: true,
  },
  {
    id: 'full-body-waxing-rica-wax',
    name: 'Full Body Waxing - Rica Wax',
    category: 'body-wax',
    sub: 'Rica Wax',
    price: 2500,
    duration: 120,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Clean-up (id: clean-up)
  // --------------------------------------------------------------------------
  {
    id: 'o3-seaweed-clean-up',
    name: 'O3+ Seaweed Clean Up',
    category: 'clean-up',
    sub: 'Clean-up',
    price: 1199,
    duration: 45,
    featured: true,
    active: true,
  },

  // --------------------------------------------------------------------------
  // D-Tan (id: d-tan)
  // --------------------------------------------------------------------------
  {
    id: 'full-face-neck-detan',
    name: 'Full Face + Neck Detan',
    category: 'd-tan',
    sub: 'Face',
    price: 289,
    duration: 30,
    featured: true,
    active: true,
  },
  {
    id: 'full-arm-detan',
    name: 'Full Arm Detan',
    category: 'd-tan',
    sub: 'Body Area',
    price: 550,
    active: true,
  },
  {
    id: 'back-detan',
    name: 'Back Detan',
    category: 'd-tan',
    sub: 'Body Area',
    price: 500,
    active: true,
  },
  {
    id: 'chest-detan',
    name: 'Chest Detan',
    category: 'd-tan',
    sub: 'Body Area',
    price: 500,
    active: true,
  },
  {
    id: 'full-leg-detan',
    name: 'Full Leg Detan',
    category: 'd-tan',
    sub: 'Body Area',
    price: 750,
    active: true,
  },
  {
    id: 'full-body-d-tan',
    name: 'Full Body D-Tan',
    category: 'd-tan',
    sub: 'Full Body',
    price: 1500,
    duration: 60,
    active: true,
  },
  {
    id: 'full-body-detan',
    name: 'Full Body Detan',
    category: 'd-tan',
    sub: 'Full Body',
    price: 1500,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Facial Treatments (id: facial)
  // --------------------------------------------------------------------------
  {
    id: 'blossom-kochhar-aroma-magic-fruit-facial',
    name: 'Blossom Kochhar Aroma Magic Fruit Facial',
    category: 'facial',
    sub: 'Facial',
    price: 540,
    duration: 55,
    active: true,
  },
  {
    id: 'aroma-magic-skin-glow-facial',
    name: 'Aroma Magic Skin Glow Facial',
    category: 'facial',
    sub: 'Facial',
    price: 800,
    duration: 60,
    active: true,
  },
  {
    id: 'aroma-magic-bridal-glow-facial',
    name: 'Aroma Magic Bridal Glow Facial',
    category: 'facial',
    sub: 'Facial',
    price: 1000,
    duration: 70,
    active: true,
  },
  {
    id: 'pak-dee-italian-mix-fruits-facial',
    name: 'Pak Dee Italian Mix Fruits Facial',
    category: 'facial',
    sub: 'Facial',
    price: 1100,
    duration: 40,
    active: true,
  },
  {
    id: 'twacha-oxygen-tan-off-facial',
    name: 'Twacha Oxygen Tan Off Facial',
    category: 'facial',
    sub: 'Facial',
    price: 1198,
    duration: 60,
    active: true,
  },
  {
    id: 'pak-dee-korean-glass-shine-facial',
    name: 'Pak Dee Korean Glass Shine Facial',
    category: 'facial',
    sub: 'Korean Glow',
    price: 1200,
    duration: 60,
    featured: true,
    active: true,
  },
  {
    id: 'vlcc-pearl-facial',
    name: 'VLCC Pearl Facial',
    category: 'facial',
    sub: 'Facial',
    price: 1500,
    duration: 60,
    active: true,
  },
  {
    id: 'twacha-oxygen-tan-off-facial-korean-beauty-sheet-mask',
    name: 'Twacha Oxygen Tan Off Facial + Korean Beauty Sheet Mask',
    category: 'facial',
    sub: 'Facial',
    price: 1598,
    duration: 75,
    active: true,
  },
  {
    id: 'sara-gold-facial',
    name: 'Sara Gold Facial',
    category: 'facial',
    sub: 'Facial',
    price: 1600,
    duration: 60,
    active: true,
  },
  {
    id: 'o3-salon-whitening-facial',
    name: 'O3+ Salon Whitening Facial',
    category: 'facial',
    sub: 'O3+ Facial',
    price: 1700,
    duration: 60,
    active: true,
  },
  {
    id: 'sara-korean-facial',
    name: 'Sara Korean Facial',
    category: 'facial',
    sub: 'Korean Glow',
    price: 2198,
    duration: 80,
    active: true,
  },
  {
    id: 'o3-bridal-facial',
    name: 'O3+ Bridal Facial',
    category: 'facial',
    sub: 'O3+ Facial',
    price: 2300,
    duration: 70,
    featured: true,
    active: true,
  },
  {
    id: 'kanpeki-hydra-shine-facial',
    name: 'Kanpeki Hydra Shine Facial',
    category: 'facial',
    sub: 'Korean Glow',
    price: 2498,
    active: true,
  },
  {
    id: 'fyc-korean-glass-skin-rice-water-facial',
    name: 'FYC Korean Glass Skin Rice Water Facial',
    category: 'facial',
    sub: 'Korean Glow',
    price: 2500,
    duration: 90,
    featured: true,
    active: true,
  },
  {
    id: 'kanpeki-korean-glass-glow-skin',
    name: 'Kanpeki Korean Glass Glow Skin',
    category: 'facial',
    sub: 'Korean Glow',
    price: 3198,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Polishing Treatment (id: polishing)
  // --------------------------------------------------------------------------
  {
    id: 'body-polishing-fyc-hydraboost',
    name: 'Body Polishing - FYC Hydraboost',
    category: 'polishing',
    sub: 'Body Polishing',
    price: 3100,
    duration: 80,
    featured: true,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Bleach (id: bleach)
  // --------------------------------------------------------------------------
  {
    id: 'oxy-bleach',
    name: 'Oxy Bleach',
    category: 'bleach',
    sub: 'Oxy & Gold',
    price: 800,
    duration: 30,
    active: true,
  },
  {
    id: 'fem-gold-bleach',
    name: 'Fem Gold Bleach',
    category: 'bleach',
    sub: 'Oxy & Gold',
    price: 270,
    duration: 30,
    active: true,
  },
  {
    id: 'hand-korean-bleach',
    name: 'Hand Korean Bleach',
    category: 'bleach',
    sub: 'Korean Bleach',
    price: 400,
    duration: 15,
    active: true,
  },
  {
    id: 'full-arm-korean-bleach',
    name: 'Full Arm Korean Bleach',
    category: 'bleach',
    sub: 'Korean Bleach',
    price: 500,
    duration: 15,
    active: true,
  },
  {
    id: 'chest-korean-bleach',
    name: 'Chest Korean Bleach',
    category: 'bleach',
    sub: 'Korean Bleach',
    price: 500,
    duration: 15,
    active: true,
  },
  {
    id: 'back-korean-bleach',
    name: 'Back Korean Bleach',
    category: 'bleach',
    sub: 'Korean Bleach',
    price: 500,
    duration: 15,
    active: true,
  },
  {
    id: 'face-korean-bleach',
    name: 'Face Korean Bleach',
    category: 'bleach',
    sub: 'Korean Bleach',
    price: 540,
    duration: 15,
    active: true,
  },
  {
    id: 'full-leg-korean-bleach',
    name: 'Full Leg Korean Bleach',
    category: 'bleach',
    sub: 'Korean Bleach',
    price: 700,
    duration: 15,
    active: true,
  },
  {
    id: 'full-body-oxy-bleach',
    name: 'Full Body - Oxy Bleach',
    category: 'bleach',
    sub: 'Oxy & Gold',
    price: 1250,
    duration: 60,
    active: true,
  },
  {
    id: 'full-body-korean-bleach',
    name: 'Full Body Korean Bleach',
    category: 'bleach',
    sub: 'Korean Bleach',
    price: 2000,
    duration: 15,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Manicure & Pedicure (id: manicure-pedicure)
  // --------------------------------------------------------------------------
  {
    id: 'fyc-classic-manicure',
    name: 'FYC Classic Manicure',
    category: 'manicure-pedicure',
    sub: 'Manicure',
    price: 400,
    duration: 35,
    active: true,
  },
  {
    id: 'sara-manicure',
    name: 'Sara Manicure',
    category: 'manicure-pedicure',
    sub: 'Manicure',
    price: 429,
    duration: 45,
    active: true,
  },
  {
    id: 'fyc-classic-pedicure',
    name: 'FYC Classic Pedicure',
    category: 'manicure-pedicure',
    sub: 'Pedicure',
    price: 489,
    duration: 50,
    active: true,
  },
  {
    id: 'o3-manicure',
    name: 'O3+ Manicure',
    category: 'manicure-pedicure',
    sub: 'Manicure',
    price: 509,
    duration: 35,
    active: true,
  },
  {
    id: 'sara-pedicure',
    name: 'Sara Pedicure',
    category: 'manicure-pedicure',
    sub: 'Pedicure',
    price: 519,
    duration: 60,
    active: true,
  },
  {
    id: 'o3-pedicure',
    name: 'O3+ Pedicure',
    category: 'manicure-pedicure',
    sub: 'Pedicure',
    price: 609,
    duration: 60,
    active: true,
  },
  {
    id: 'fyc-classic-manicure-pedicure',
    name: 'FYC Classic Manicure & Pedicure',
    category: 'manicure-pedicure',
    sub: 'Manicure + Pedicure',
    price: 1000,
    duration: 90,
    featured: true,
    active: true,
  },
  {
    id: 'sara-manicure-pedicure',
    name: 'Sara Manicure & Pedicure',
    category: 'manicure-pedicure',
    sub: 'Manicure + Pedicure',
    price: 1200,
    duration: 100,
    active: true,
  },
  {
    id: 'o3-manicure-pedicure',
    name: 'O3+ Manicure & Pedicure',
    category: 'manicure-pedicure',
    sub: 'Manicure + Pedicure',
    price: 1500,
    duration: 100,
    active: true,
  },
  {
    id: 'fyc-korean-glass-skin-manicure-pedicure',
    name: 'FYC Korean Glass Skin Manicure & Pedicure',
    category: 'manicure-pedicure',
    sub: 'Manicure + Pedicure',
    price: 2500,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Head Massage (id: head-massage)
  // --------------------------------------------------------------------------
  {
    id: 'dry-head-massage',
    name: 'Dry Head Massage',
    category: 'head-massage',
    sub: 'Head Massage',
    price: 199,
    duration: 15,
    active: true,
  },
  {
    id: 'head-massage',
    name: 'Head Massage',
    category: 'head-massage',
    sub: 'Head Massage',
    price: 350,
    duration: 30,
    featured: true,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Hair Colour (id: hair-colour)
  // --------------------------------------------------------------------------
  {
    id: 'hair-colour-root-touch-up-customer-s-product',
    name: "Hair Colour Root Touch Up (Customer's Product)",
    category: 'hair-colour',
    sub: 'Hair Colour',
    price: 340,
    duration: 40,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Hair Mehendi Dye (id: hair-mehendi)
  // --------------------------------------------------------------------------
  {
    id: 'heena-mehendi-only-application',
    name: 'Heena Mehendi (Only Application)',
    category: 'hair-mehendi',
    sub: 'Hair Mehendi',
    price: 369,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Hair Spa (id: hair-spa)
  // --------------------------------------------------------------------------
  {
    id: 'hair-spa',
    name: 'Hair Spa',
    category: 'hair-spa',
    sub: 'Hair Spa',
    price: 1124,
    featured: true,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Body Massage & Scrub (id: body-care)
  // --------------------------------------------------------------------------
  {
    id: 'foot-massage',
    name: 'Foot Massage',
    category: 'body-care',
    sub: 'Massage',
    price: 300,
    duration: 10,
    active: true,
  },
  {
    id: 'body-massage',
    name: 'Body Massage',
    category: 'body-care',
    sub: 'Massage',
    price: 1000,
    duration: 60,
    active: true,
  },
  {
    id: 'full-body-scrub',
    name: 'Full Body Scrub',
    category: 'body-care',
    sub: 'Scrub',
    price: 1100,
    duration: 45,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Hair Styling & Draping (id: styling) - perPerson allows quantity
  // --------------------------------------------------------------------------
  {
    id: 'basic-saree-draping',
    name: 'Basic Saree Draping',
    category: 'styling',
    sub: 'Draping',
    price: 898,
    duration: 20,
    perPerson: true,
    active: true,
  },
  {
    id: 'lehenga-dupatta-draping',
    name: 'Lehenga Dupatta Draping',
    category: 'styling',
    sub: 'Draping',
    price: 1498,
    duration: 20,
    perPerson: true,
    active: true,
  },
  {
    id: 'basic-hair-styling',
    name: 'Basic Hair Styling',
    category: 'styling',
    sub: 'Hair Styling',
    price: 2396,
    duration: 45,
    perPerson: true,
    active: true,
  },
  {
    id: 'advanced-hair-styling',
    name: 'Advanced Hair Styling',
    category: 'styling',
    sub: 'Hair Styling',
    price: 2500,
    duration: 55,
    perPerson: true,
    active: true,
  },

  // --------------------------------------------------------------------------
  // Makeup & Bridal (id: bridal) - some perPerson
  // --------------------------------------------------------------------------
  {
    id: 'basic-makeup-book-for-2-get-1-free',
    name: 'Basic Makeup - Book For 2 Get 1 Free',
    category: 'bridal',
    sub: 'Party Makeup',
    price: 4996,
    duration: 60,
    perPerson: true,
    active: true,
  },
  {
    id: 'hd-makeup-book-for-2-get-1-free',
    name: 'HD Makeup - Book For 2 Get 1 Free',
    category: 'bridal',
    sub: 'Party Makeup',
    price: 6860,
    duration: 80,
    perPerson: true,
    active: true,
  },
  {
    id: 'premium-makeup-book-for-2-get-1-free',
    name: 'Premium Makeup - Book For 2 Get 1 Free',
    category: 'bridal',
    sub: 'Party Makeup',
    price: 9996,
    duration: 90,
    perPerson: true,
    active: true,
  },
  {
    id: 'engagement-basic-makeup',
    name: 'Engagement Basic Makeup',
    category: 'bridal',
    sub: 'Engagement',
    price: 8998,
    duration: 150,
    active: true,
  },
  {
    id: 'engagement-premium-makeup',
    name: 'Engagement Premium Makeup',
    category: 'bridal',
    sub: 'Engagement',
    price: 11198,
    duration: 180,
    active: true,
  },
  {
    id: 'basic-bridal-makeup-get-1-basic-makeup-free',
    name: 'Basic Bridal Makeup - Get 1 Basic Makeup Free',
    category: 'bridal',
    sub: 'Bridal',
    price: 15998,
    duration: 200,
    featured: true,
    active: true,
  },
  {
    id: 'premium-bridal-makeup-get-1-basic-makeup-free',
    name: 'Premium Bridal Makeup - Get 1 Basic Makeup Free',
    category: 'bridal',
    sub: 'Bridal',
    price: 17998,
    duration: 240,
    active: true,
  },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find(s => s.id === id);
}

export function getServicesByCategory(categoryId: string): Service[] {
  return SERVICES.filter(s => s.category === categoryId);
}

export function getFeaturedServices(): Service[] {
  return SERVICES.filter(s => s.featured);
}

export function getLowestPriceInCategory(categoryId: string): number {
  const list = getServicesByCategory(categoryId);
  if (list.length === 0) return 0;
  return Math.min(...list.map(s => s.price));
}

export function getServiceCountInCategory(categoryId: string): number {
  return getServicesByCategory(categoryId).length;
}
