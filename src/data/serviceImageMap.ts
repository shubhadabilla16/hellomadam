/**
 * Central Service Image Mapping System
 * 
 * Strict architectural rule:
 * Every category and every individual service is mapped to a dedicated, visually accurate
 * beauty photograph reflecting its specific treatment domain (eyebrow grooming for threading,
 * foot bath for pedicure, nail styling for manicure, scalp champi for head massage,
 * salon steaming for hair spa, waxing strips for body wax, clean-up for pore care, etc.)
 */

export interface CategoryMedia {
  id: string;
  name: string;
  nameHi: string;
  image: string;
  iconName: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
}

export const CATEGORY_MEDIA_MAP: Record<string, CategoryMedia> = {
  'threading': {
    id: 'threading',
    name: 'Threading',
    nameHi: 'थ्रेडिंग',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Scissors',
    tagline: 'High-Precision Brow & Facial Contouring',
    taglineHi: 'सटीक आईब्रो और फेशियल थ्रेडिंग',
    description: 'Gentle cotton-thread shaping for eyebrows, upper lip, forehead, and chin with rose-water calming care.',
    descriptionHi: 'आईब्रो, अपर लिप और माथे के लिए ऑर्गेनिक कॉटन थ्रेडिंग एवं रोज़-वॉटर कूलिंग केयर।'
  },
  'face-wax': {
    id: 'face-wax',
    name: 'Face Wax',
    nameHi: 'फेस वैक्स',
    image: 'https://images.unsplash.com/photo-1512290900672-1f486a455a45?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sparkles',
    tagline: 'Smooth, Radiant Facial Hair Removal',
    taglineHi: 'मुलायम और चमकदार चेहरे के लिए वैक्स',
    description: 'Sensitive-skin stripless Brazilian and soothing Honey Bee wax for peach fuzz and flawless makeup canvas.',
    descriptionHi: 'सेंसिटिव स्किन के लिए स्ट्रिपलेस ब्राजीलियन एवं हनी बी वैक्स।'
  },
  'body-wax': {
    id: 'body-wax',
    name: 'Body Wax',
    nameHi: 'बॉडी वैक्स',
    image: 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
    iconName: 'Feather',
    tagline: '6 Wax Varieties for Silky Smooth Skin',
    taglineHi: '6 प्रकार के प्रीमियम बॉडी वैक्स',
    description: 'Choose between Honey Bee, Dark Chocolate, White Cream, Regular, Italian Rica, and gentle Gel Wax.',
    descriptionHi: 'हनी बी, डार्क चॉकलेट, व्हाइट क्रीम, रेगुलर, रिका और जेल वैक्स के विकल्प।'
  },
  'clean-up': {
    id: 'clean-up',
    name: 'Clean-up',
    nameHi: 'क्लीन-अप',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    iconName: 'Droplet',
    tagline: 'Deep Pore Clarifying & Blackhead Removal',
    taglineHi: 'गहराई से पोर क्लींजिंग और ब्लैकहेड रिमूवल',
    description: 'Essential steam, blackhead extractions, scrub, and tightening pack in Basic, Fruit, Chocolate, Whitening, and D Tan.',
    descriptionHi: 'स्टीम, ब्लैकहेड रिमूवल, फ्रूट/चॉकलेट स्क्रब और पोर-टाईटनिंग पैक।'
  },
  'd-tan': {
    id: 'd-tan',
    name: 'D Tan',
    nameHi: 'डी टैन',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sun',
    tagline: 'Instant Sun Damage & Tan Reversal',
    taglineHi: 'धूप के टैन को हटाकर निखार लाएं',
    description: 'Kojic and lactic natural tan-removal therapy for face, neck, arms, legs, back, or full body.',
    descriptionHi: 'चेहरे, हाथों, पैरों और पूरे शरीर के लिए डी-टैन ट्रीटमेंट।'
  },
  'facials': {
    id: 'facials',
    name: 'Facial Treatments',
    nameHi: 'फेशियल ट्रीटमेंट्स',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    iconName: 'Flower2',
    tagline: '4 Tiers of Botanical & Machine Glow',
    taglineHi: '4 प्रीमियम फेशियल टियर्स',
    description: 'Basic (₹850), Medium (₹1,200), Advance (₹1,500), and Premium (₹3,000) including Korean Glass, Hydra, and O3.',
    descriptionHi: 'बेसिक, मीडियम, एडवांस और प्रीमियम टियर (कोरियन ग्लास, हाइड्रा मशीन, O3)।'
  },
  'polishing': {
    id: 'polishing',
    name: 'Polishing Treatments',
    nameHi: 'पॉलिशिंग ट्रीटमेंट्स',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    iconName: 'Gem',
    tagline: 'Exfoliating Spa Gloss for Full Body',
    taglineHi: 'पूरे शरीर के लिए एक्सफोलिएटिंग स्पा ग्लो',
    description: 'Micro-fine walnut and botanical exfoliating rubs using Aroma, Lotus, and The Body Shop elixirs.',
    descriptionHi: 'अरोमा, लोटस और द बॉडी शॉप के साथ फुल बॉडी ग्लो पॉलिशिंग।'
  },
  'bleach': {
    id: 'bleach',
    name: 'Bleach',
    nameHi: 'ब्लीच',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wand2',
    tagline: 'Gentle Radiance & Complexion Blending',
    taglineHi: 'त्वचा के लिए जेंटल रेडिएंस ब्लीच',
    description: 'Golden radiance skin lightening and gentle hair-tone matching for face, neck, hands, legs, and back.',
    descriptionHi: 'चेहरे और शरीर के लिए सुरक्षित गोल्डन रेडिएंस ब्लीच।'
  },
  'mani-pedi': {
    id: 'mani-pedi',
    name: 'Manicure & Pedicure',
    nameHi: 'मेनिक्योर और पेडिक्योर',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
    iconName: 'Hand',
    tagline: 'Rose-Petal Foot Baths & Nail Grooming',
    taglineHi: 'गुलाब की पंखुड़ियों वाला फुट बाथ और नेल केयर',
    description: 'Therapeutic soaking, heel scrub, cuticle buffing, massage, and nail paint in Basic, D Tan, and Advance.',
    descriptionHi: 'पैरों और हाथों के लिए रिलैक्सिंग सोक, हील स्क्रब और नेल ग्रूमिंग।'
  },
  'head-massage': {
    id: 'head-massage',
    name: 'Head Massage',
    nameHi: 'हेड मसाज (चंप्पी)',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    iconName: 'HeartHandshake',
    tagline: 'Acupressure Stress Relief with Pure Oils',
    taglineHi: 'शुद्ध तेलों से तनाव-मुक्ति चंप्पी',
    description: 'Stimulating hot-oil scalp massages using Shahnaz Husain, Matrix Biolage, Pure Almond, Olive, and L’Oréal.',
    descriptionHi: 'शहनाज, बादाम, ऑलिव, मैट्रिक्स और लोरियल से रिलैक्सिंग स्कैल्प मसाज।'
  },
  'hair-colour': {
    id: 'hair-colour',
    name: 'Hair Colour',
    nameHi: 'हेयर कलर',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
    iconName: 'Palette',
    tagline: 'Ammonia-Free Grey Coverage & Gloss',
    taglineHi: 'अमोनिया-फ्री हेयर कलर और रिच ग्लॉस',
    description: 'Professional Matrix, L’Oréal, and Inoa ammonia-free applications for root touch-ups and full length.',
    descriptionHi: 'मैट्रिक्स, लोरियल और इनुआ अमोनिया-फ्री रूट टच-अप और फुल लेंथ।'
  },
  'hair-mehendi': {
    id: 'hair-mehendi',
    name: 'Hair Mehendi',
    nameHi: 'हेयर मेहंदी डाई',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Leaf',
    tagline: '100% Organic Henna & Botanical Dye',
    taglineHi: '100% ऑर्गेनिक प्राकृतिक मेहंदी',
    description: 'Traditional organic henna paste infused with amla, shikakai, and tea water for vibrant conditioning and shine.',
    descriptionHi: 'आंवला और शिकाकाई युक्त हर्बल मेंहदी फॉर नेचुरल शाइन।'
  },
  'hair-spa': {
    id: 'hair-spa',
    name: 'Hair Spa',
    nameHi: 'हेयर स्पा',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    iconName: 'Sparkle',
    tagline: 'Deep Conditioning & Steam Nourishment',
    taglineHi: 'डीप कंडीशनिंग और स्टीम नरिशमेंट',
    description: 'Intense hydration using Matrix, L’Oréal, and Italian Nashi Argan with portable steam hood treatment.',
    descriptionHi: 'मैट्रिक्स, लोरियल और नाश अर्गन के साथ पोर्टेबल स्टीम स्पा।'
  },
};

/**
 * Individual Service-Level Image Map
 * Provides specific, non-repetitive imagery for individual service treatments
 */
export const SERVICE_SPECIFIC_IMAGES: Record<string, string> = {
  // All 91 Service IDs (1-to-1 generated assets)
  'threading-eyebrows': '/assets/services/threading-eyebrows.jpg',
  'threading-upper-lips': '/assets/services/threading-upper-lips.jpg',
  'threading-forehead': '/assets/services/threading-forehead.jpg',
  'threading-chin': '/assets/services/threading-chin.jpg',
  'full-face-threading': '/assets/services/full-face-threading.jpg',
  'upper-lips-rica-waxing': '/assets/services/upper-lips-rica-waxing.jpg',
  'full-face-waxing-rica-brazilian-wax': '/assets/services/full-face-waxing-rica-brazilian-wax.jpg',
  'underarms-waxing-honey-wax': '/assets/services/underarms-waxing-honey-wax.jpg',
  'underarms-waxing-rica-brazilian-wax': '/assets/services/underarms-waxing-rica-brazilian-wax.jpg',
  'butt-wax-honey-wax': '/assets/services/butt-wax-honey-wax.jpg',
  'full-arm-waxing-honey-wax': '/assets/services/full-arm-waxing-honey-wax.jpg',
  'full-arms-underarms-honey-wax': '/assets/services/full-arms-underarms-honey-wax.jpg',
  'full-arms-waxing-rica-wax': '/assets/services/full-arms-waxing-rica-wax.jpg',
  'full-back-waxing-honey-wax': '/assets/services/full-back-waxing-honey-wax.jpg',
  'half-legs-waxing-honey-wax': '/assets/services/half-legs-waxing-honey-wax.jpg',
  'tummy-waxing-rica-wax': '/assets/services/tummy-waxing-rica-wax.jpg',
  'bikini-waxing-honey-wax': '/assets/services/bikini-waxing-honey-wax.jpg',
  'full-arms-waxing-rica-roll-on-wax': '/assets/services/full-arms-waxing-rica-roll-on-wax.jpg',
  'full-arms-underarms-rica-wax': '/assets/services/full-arms-underarms-rica-wax.jpg',
  'butt-wax-rica-wax': '/assets/services/butt-wax-rica-wax.jpg',
  'full-legs-waxing-rica-roll-on-wax': '/assets/services/full-legs-waxing-rica-roll-on-wax.jpg',
  'full-legs-waxing-rica-wax': '/assets/services/full-legs-waxing-rica-wax.jpg',
  'full-leg-waxing-honey-wax': '/assets/services/full-leg-waxing-honey-wax.jpg',
  'full-arms-full-legs-underarms-honey-wax': '/assets/services/full-arms-full-legs-underarms-honey-wax.jpg',
  'full-arms-full-legs-underarms-rica-wax': '/assets/services/full-arms-full-legs-underarms-rica-wax.jpg',
  'full-body-waxing-honey-wax': '/assets/services/full-body-waxing-honey-wax.jpg',
  'bikini-waxing-rica-brazilian-wax': '/assets/services/bikini-waxing-rica-brazilian-wax.jpg',
  'full-body-waxing-rica-wax': '/assets/services/full-body-waxing-rica-wax.jpg',
  'o3-seaweed-clean-up': '/assets/services/o3-seaweed-clean-up.jpg',
  'full-face-neck-detan': '/assets/services/full-face-neck-detan.jpg',
  'full-arm-detan': '/assets/services/full-arm-detan.jpg',
  'back-detan': '/assets/services/back-detan.jpg',
  'chest-detan': '/assets/services/chest-detan.jpg',
  'full-leg-detan': '/assets/services/full-leg-detan.jpg',
  'full-body-d-tan': '/assets/services/full-body-d-tan.jpg',
  'full-body-detan': '/assets/services/full-body-detan.jpg',
  'blossom-kochhar-aroma-magic-fruit-facial': '/assets/services/blossom-kochhar-aroma-magic-fruit-facial.jpg',
  'aroma-magic-skin-glow-facial': '/assets/services/aroma-magic-skin-glow-facial.jpg',
  'aroma-magic-bridal-glow-facial': '/assets/services/aroma-magic-bridal-glow-facial.jpg',
  'pak-dee-italian-mix-fruits-facial': '/assets/services/pak-dee-italian-mix-fruits-facial.jpg',
  'twacha-oxygen-tan-off-facial': '/assets/services/twacha-oxygen-tan-off-facial.jpg',
  'pak-dee-korean-glass-shine-facial': '/assets/services/pak-dee-korean-glass-shine-facial.jpg',
  'vlcc-pearl-facial': '/assets/services/vlcc-pearl-facial.jpg',
  'twacha-oxygen-tan-off-facial-korean-beauty-sheet-mask': '/assets/services/twacha-oxygen-tan-off-facial-korean-beauty-sheet-mask.jpg',
  'sara-gold-facial': '/assets/services/sara-gold-facial.jpg',
  'o3-salon-whitening-facial': '/assets/services/o3-salon-whitening-facial.jpg',
  'sara-korean-facial': '/assets/services/sara-korean-facial.jpg',
  'o3-bridal-facial': '/assets/services/o3-bridal-facial.jpg',
  'kanpeki-hydra-shine-facial': '/assets/services/kanpeki-hydra-shine-facial.jpg',
  'fyc-korean-glass-skin-rice-water-facial': '/assets/services/fyc-korean-glass-skin-rice-water-facial.jpg',
  'kanpeki-korean-glass-glow-skin': '/assets/services/kanpeki-korean-glass-glow-skin.jpg',
  'body-polishing-fyc-hydraboost': '/assets/services/body-polishing-fyc-hydraboost.jpg',
  'oxy-bleach': '/assets/services/oxy-bleach.jpg',
  'fem-gold-bleach': '/assets/services/fem-gold-bleach.jpg',
  'hand-korean-bleach': '/assets/services/hand-korean-bleach.jpg',
  'full-arm-korean-bleach': '/assets/services/full-arm-korean-bleach.jpg',
  'chest-korean-bleach': '/assets/services/chest-korean-bleach.jpg',
  'back-korean-bleach': '/assets/services/back-korean-bleach.jpg',
  'face-korean-bleach': '/assets/services/face-korean-bleach.jpg',
  'full-leg-korean-bleach': '/assets/services/full-leg-korean-bleach.jpg',
  'full-body-oxy-bleach': '/assets/services/full-body-oxy-bleach.jpg',
  'full-body-korean-bleach': '/assets/services/full-body-korean-bleach.jpg',
  'fyc-classic-manicure': '/assets/services/fyc-classic-manicure.jpg',
  'sara-manicure': '/assets/services/sara-manicure.jpg',
  'fyc-classic-pedicure': '/assets/services/fyc-classic-pedicure.jpg',
  'o3-manicure': '/assets/services/o3-manicure.jpg',
  'sara-pedicure': '/assets/services/sara-pedicure.jpg',
  'o3-pedicure': '/assets/services/o3-pedicure.jpg',
  'fyc-classic-manicure-pedicure': '/assets/services/fyc-classic-manicure-pedicure.jpg',
  'sara-manicure-pedicure': '/assets/services/sara-manicure-pedicure.jpg',
  'o3-manicure-pedicure': '/assets/services/o3-manicure-pedicure.jpg',
  'fyc-korean-glass-skin-manicure-pedicure': '/assets/services/fyc-korean-glass-skin-manicure-pedicure.jpg',
  'dry-head-massage': '/assets/services/dry-head-massage.jpg',
  'head-massage': '/assets/services/head-massage.jpg',
  'hair-colour-root-touch-up-customer-s-product': '/assets/services/hair-colour-root-touch-up-customer-s-product.jpg',
  'heena-mehendi-only-application': '/assets/services/heena-mehendi-only-application.jpg',
  'hair-spa': '/assets/services/hair-spa.jpg',
  'foot-massage': '/assets/services/foot-massage.jpg',
  'body-massage': '/assets/services/body-massage.jpg',
  'full-body-scrub': '/assets/services/full-body-scrub.jpg',
  'basic-saree-draping': '/assets/services/basic-saree-draping.jpg',
  'lehenga-dupatta-draping': '/assets/services/lehenga-dupatta-draping.jpg',
  'basic-hair-styling': '/assets/services/basic-hair-styling.jpg',
  'advanced-hair-styling': '/assets/services/advanced-hair-styling.jpg',
  'basic-makeup-book-for-2-get-1-free': '/assets/services/basic-makeup-book-for-2-get-1-free.jpg',
  'hd-makeup-book-for-2-get-1-free': '/assets/services/hd-makeup-book-for-2-get-1-free.jpg',
  'premium-makeup-book-for-2-get-1-free': '/assets/services/premium-makeup-book-for-2-get-1-free.jpg',
  'engagement-basic-makeup': '/assets/services/engagement-basic-makeup.jpg',
  'engagement-premium-makeup': '/assets/services/engagement-premium-makeup.jpg',
  'basic-bridal-makeup-get-1-basic-makeup-free': '/assets/services/basic-bridal-makeup-get-1-basic-makeup-free.jpg',
  'premium-bridal-makeup-get-1-basic-makeup-free': '/assets/services/premium-bridal-makeup-get-1-basic-makeup-free.jpg',

  // Legacy demo service aliases
  'threading-eyebrow': '/assets/services/threading-eyebrows.jpg',
  'threading-upperlip': '/assets/services/threading-upper-lips.jpg',
  'facewax-brazilian': '/assets/services/full-face-waxing-rica-brazilian-wax.jpg',
  'facewax-honey-bee': '/assets/services/upper-lips-rica-waxing.jpg',
  'cleanup-basic': '/assets/services/o3-seaweed-clean-up.jpg',
  'cleanup-fruit': '/assets/services/blossom-kochhar-aroma-magic-fruit-facial.jpg',
  'cleanup-chocolate': '/assets/services/o3-seaweed-clean-up.jpg',
  'cleanup-whitening': '/assets/services/o3-salon-whitening-facial.jpg',
  'cleanup-dtan': '/assets/services/full-face-neck-detan.jpg',
  'dtan-face': '/assets/services/full-face-neck-detan.jpg',
  'dtan-neck': '/assets/services/chest-detan.jpg',
  'dtan-hands': '/assets/services/full-arm-detan.jpg',
  'dtan-halfleg': '/assets/services/full-leg-detan.jpg',
  'dtan-fullleg': '/assets/services/full-leg-detan.jpg',
  'dtan-back': '/assets/services/back-detan.jpg',
  'dtan-fullbody': '/assets/services/full-body-d-tan.jpg',
  'wax-honey-underarms': '/assets/services/underarms-waxing-honey-wax.jpg',
  'wax-honey-fullhands': '/assets/services/full-arm-waxing-honey-wax.jpg',
  'wax-honey-halfleg': '/assets/services/half-legs-waxing-honey-wax.jpg',
  'wax-honey-fullleg': '/assets/services/full-leg-waxing-honey-wax.jpg',
  'wax-honey-fullbody': '/assets/services/full-body-waxing-honey-wax.jpg',
  'wax-rica-fullhands': '/assets/services/full-arms-waxing-rica-wax.jpg',
  'wax-rica-fullleg': '/assets/services/full-legs-waxing-rica-wax.jpg',
  'wax-rica-fullbody': '/assets/services/full-body-waxing-rica-wax.jpg',
  'facial-basic-fruit': '/assets/services/blossom-kochhar-aroma-magic-fruit-facial.jpg',
  'facial-basic-gold': '/assets/services/sara-gold-facial.jpg',
  'facial-med-korean-glow': '/assets/services/pak-dee-korean-glass-shine-facial.jpg',
  'facial-adv-vitc': '/assets/services/aroma-magic-skin-glow-facial.jpg',
  'facial-prem-hydra-machine': '/assets/services/kanpeki-hydra-shine-facial.jpg',
  'facial-prem-korean-glass': '/assets/services/fyc-korean-glass-skin-rice-water-facial.jpg',
  'facial-prem-o3': '/assets/services/o3-salon-whitening-facial.jpg',
  'manicure-basic': '/assets/services/fyc-classic-manicure.jpg',
  'manicure-dtan': '/assets/services/o3-manicure.jpg',
  'manicure-advance': '/assets/services/sara-manicure.jpg',
  'pedicure-basic': '/assets/services/fyc-classic-pedicure.jpg',
  'pedicure-dtan': '/assets/services/o3-pedicure.jpg',
  'pedicure-advance': '/assets/services/sara-pedicure.jpg',
  'headmsg-shenaze': '/assets/services/head-massage.jpg',
  'headmsg-almond': '/assets/services/dry-head-massage.jpg',
  'headmsg-loreal': '/assets/services/head-massage.jpg',
  'hairspa-matrix-medium': '/assets/services/hair-spa.jpg',
  'hairspa-loreal-medium': '/assets/services/hair-spa.jpg',
  'hairspa-nashi-medium': '/assets/services/hair-spa.jpg',
  'haircolor-matrix-root': '/assets/services/hair-colour-root-touch-up-customer-s-product.jpg',
  'haircolor-inoa-root': '/assets/services/hair-colour-root-touch-up-customer-s-product.jpg',
  'hairmehendi-root': '/assets/services/heena-mehendi-only-application.jpg',
  'hairmehendi-full': '/assets/services/heena-mehendi-only-application.jpg',
  'polish-full-body-aroma': '/assets/services/body-polishing-fyc-hydraboost.jpg',
  'polish-full-body-bodyshop': '/assets/services/full-body-scrub.jpg',
};

/**
 * Helper to get the canonical accurate photograph for any service
 */
export function getServiceImage(serviceId: string, category: string): string {
  if (SERVICE_SPECIFIC_IMAGES[serviceId]) {
    return SERVICE_SPECIFIC_IMAGES[serviceId];
  }
  if (CATEGORY_MEDIA_MAP[category]) {
    return CATEGORY_MEDIA_MAP[category].image;
  }
  return '/src/assets/images/service_facial_glow_1793599854639.jpg';
}
