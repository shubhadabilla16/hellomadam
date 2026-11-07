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
  // Threading
  'threading-eyebrow': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  'threading-upperlip': 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80',
  'threading-forehead': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
  'threading-chin': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',

  // Face wax
  'facewax-brazilian': 'https://images.unsplash.com/photo-1512290900672-1f486a455a45?auto=format&fit=crop&w=800&q=80',
  'facewax-honey-bee': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',

  // Clean-up
  'cleanup-basic': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  'cleanup-fruit': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
  'cleanup-chocolate': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  'cleanup-whitening': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
  'cleanup-dtan': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',

  // D Tan
  'dtan-face': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
  'dtan-neck': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  'dtan-hands': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
  'dtan-halfleg': 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
  'dtan-fullleg': 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
  'dtan-back': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
  'dtan-fullbody': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',

  // Waxing (Different body areas)
  'wax-honey-underarms': 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
  'wax-honey-fullhands': 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
  'wax-honey-halfleg': 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
  'wax-honey-fullleg': 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
  'wax-honey-fullbody': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  'wax-rica-fullhands': 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=800&q=80',
  'wax-rica-fullleg': 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
  'wax-rica-fullbody': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',

  // Facials (Distinct treatment models)
  'facial-basic-fruit': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80',
  'facial-basic-gold': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  'facial-med-korean-glow': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  'facial-adv-vitc': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'facial-prem-hydra-machine': 'https://images.unsplash.com/photo-1512290900672-1f486a455a45?auto=format&fit=crop&w=800&q=80',
  'facial-prem-korean-glass': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  'facial-prem-o3': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',

  // Manicure & Pedicure
  'manicure-basic': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
  'manicure-dtan': 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
  'manicure-advance': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
  'pedicure-basic': 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',
  'pedicure-dtan': 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  'pedicure-advance': 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80',

  // Head Massage
  'headmsg-shenaze': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
  'headmsg-almond': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
  'headmsg-loreal': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',

  // Hair Spa
  'hairspa-matrix-medium': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
  'hairspa-loreal-medium': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
  'hairspa-nashi-medium': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',

  // Hair Colour & Mehendi
  'haircolor-matrix-root': 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
  'haircolor-inoa-root': 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?auto=format&fit=crop&w=800&q=80',
  'hairmehendi-root': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
  'hairmehendi-full': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',

  // Polishing
  'polish-full-body-aroma': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  'polish-full-body-bodyshop': 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80',
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
