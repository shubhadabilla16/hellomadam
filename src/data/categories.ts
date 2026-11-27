export interface Category {
  id: string;
  name: string;
  tagline: string;
  intro: string;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'threading',
    name: 'Threading',
    tagline: 'Precision facial shaping and hair removal',
    intro: 'Gentle, high-precision threading for brows and face using sanitized cotton thread with soothing rose water.',
    subcategories: ['Single Area', 'Full Face'],
  },
  {
    id: 'face-wax',
    name: 'Face Wax',
    tagline: 'Gentle facial hair removal with Rica wax',
    intro: 'Gentle Rica and stripless Brazilian waxing formulated specially for delicate facial skin, leaving a silky smooth base.',
    subcategories: ['Rica Wax', 'Rica Brazilian Wax'],
  },
  {
    id: 'body-wax',
    name: 'Body Wax',
    tagline: 'Silky smooth skin with Honey & Rica waxes',
    intro: 'Hygienic body waxing options including natural Honey Wax, Italian Rica, convenient Roll-on Wax, and painless Brazilian Wax.',
    subcategories: ['Honey Wax', 'Rica Wax', 'Rica Roll-on Wax', 'Rica Brazilian Wax'],
  },
  {
    id: 'clean-up',
    name: 'Clean-up',
    tagline: 'Deep pore purification & skin refresh',
    intro: 'Targeted facial clean-up to unclog pores, eliminate blackheads, and restore natural skin brightness.',
    subcategories: ['Clean-up'],
  },
  {
    id: 'd-tan',
    name: 'D-Tan',
    tagline: 'Sun damage reversal & even complexion',
    intro: 'Professional tan-removal therapy for face, body areas, and full body to reverse sun tanning and restore natural skin tone.',
    subcategories: ['Face', 'Body Area', 'Full Body'],
  },
  {
    id: 'facial',
    name: 'Facial Treatments',
    tagline: 'Botanical, O3+ & Korean glass skin facials',
    intro: 'Luxurious facials ranging from Aroma Magic fruit blends to Sara Gold, O3+ whitening, and coveted Korean Glass Skin treatments.',
    subcategories: ['Facial', 'Korean Glow', 'O3+ Facial'],
  },
  {
    id: 'polishing',
    name: 'Polishing Treatment',
    tagline: 'Head-to-toe skin exfoliation & glow',
    intro: 'Full-body exfoliating polishing with FYC Hydraboost micro-crystals and essential oils to leave your skin luminous.',
    subcategories: ['Body Polishing'],
  },
  {
    id: 'bleach',
    name: 'Bleach',
    tagline: 'Instant radiance & complexion blending',
    intro: 'Safe Oxy, Gold, and gentle Korean bleach formulations for face and body to lighten facial hair and reveal radiant skin.',
    subcategories: ['Oxy & Gold', 'Korean Bleach'],
  },
  {
    id: 'manicure-pedicure',
    name: 'Manicure & Pedicure',
    tagline: 'Nail grooming & therapeutic spa care',
    intro: 'Relaxing foot soaks, cuticle shaping, heel scrub, and nourishing massage with FYC, Sara, O3+, and Korean Glass rituals.',
    subcategories: ['Manicure', 'Pedicure', 'Manicure + Pedicure'],
  },
  {
    id: 'head-massage',
    name: 'Head Massage',
    tagline: 'Acupressure stress relief & scalp therapy',
    intro: 'Traditional scalp champi with pressure-point stimulation and nourishing botanical oils to melt away tension.',
    subcategories: ['Head Massage'],
  },
  {
    id: 'hair-colour',
    name: 'Hair Colour',
    tagline: 'Flawless root coverage at home',
    intro: 'Professional, mess-free application of your chosen hair colour with sectioned coverage and hairline protection.',
    subcategories: ['Hair Colour'],
  },
  {
    id: 'hair-mehendi',
    name: 'Hair Mehendi Dye',
    tagline: 'Natural herbal henna conditioning',
    intro: 'Even application of pure herbal henna paste for natural burgundy sheen, deep conditioning, and scalp cooling.',
    subcategories: ['Hair Mehendi'],
  },
  {
    id: 'hair-spa',
    name: 'Hair Spa',
    tagline: 'Deep conditioning & hair revitalization',
    intro: 'Intense hair nourishment with conditioning cream mask, warm steam infusion, and relaxing scalp massage.',
    subcategories: ['Hair Spa'],
  },
  {
    id: 'body-care',
    name: 'Body Massage & Scrub',
    tagline: 'Relaxation & deep exfoliation',
    intro: 'Soothing foot and full body massage combined with deep body scrubs for muscle relaxation and rejuvenated skin.',
    subcategories: ['Massage', 'Scrub'],
  },
  {
    id: 'styling',
    name: 'Hair Styling & Draping',
    tagline: 'Saree draping & event hair styling',
    intro: 'Expert saree and lehenga dupatta pleating and draping, along with elegant curls, updos, and event hair styling.',
    subcategories: ['Hair Styling', 'Draping'],
  },
  {
    id: 'bridal',
    name: 'Makeup & Bridal',
    tagline: 'Party, engagement & bridal luxury makeup',
    intro: 'Flawless HD and bridal makeup sessions with complimentary styling, long-lasting setting, and door-to-door convenience.',
    subcategories: ['Party Makeup', 'Engagement', 'Bridal'],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id);
}
