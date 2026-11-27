/**
 * Central Service Image System for Hello Madam
 * 
 * Rules:
 * - 91 unique image keys covering all 91 services (1-to-1 dedicated photo per service).
 * - Image files reside at /assets/services/<imageKey>.jpg (in public/assets/services/).
 * - If an image does not exist yet or fails to load, an elegant ivory/champagne
 *   placeholder is displayed with the exact treatment label and icon.
 */

export const imageUrl = (key: string): string => `/assets/services/${key}.jpg`;

export interface ImageKeyMeta {
  key: string;
  label: string;
  photoDesc: string;
}

export const IMAGE_KEY_DETAILS: Record<string, ImageKeyMeta> = {
  // Threading (5)
  'threading-eyebrows': {
    key: 'threading-eyebrows',
    label: 'Threading - Eyebrows',
    photoDesc: 'Precision cotton-thread eyebrow shaping and arch contouring at home',
  },
  'threading-upper-lips': {
    key: 'threading-upper-lips',
    label: 'Threading - Upper Lips',
    photoDesc: 'Gentle antibacterial cotton threading for smooth upper lip skin',
  },
  'threading-forehead': {
    key: 'threading-forehead',
    label: 'Threading - Forehead',
    photoDesc: 'Crisp hairline cleanup removing fine peach fuzz along the forehead',
  },
  'threading-chin': {
    key: 'threading-chin',
    label: 'Threading - Chin',
    photoDesc: 'Delicate cotton-thread hair removal along the chin and lower jawline',
  },
  'full-face-threading': {
    key: 'full-face-threading',
    label: 'Full Face - Threading',
    photoDesc: 'Complete full-face organic cotton threading for smooth sideburns and cheeks',
  },

  // Face Wax (2)
  'upper-lips-rica-waxing': {
    key: 'upper-lips-rica-waxing',
    label: 'Upper Lips - Rica Waxing',
    photoDesc: 'Sensitive-skin Italian Rica wax applied with miniature spatula on upper lip',
  },
  'full-face-waxing-rica-brazilian-wax': {
    key: 'full-face-waxing-rica-brazilian-wax',
    label: 'Full Face Waxing - Rica Brazilian Wax',
    photoDesc: 'Stripless Brazilian Rica facial wax applied gently along cheek and jawline',
  },

  // Body Wax (21)
  'underarms-waxing-honey-wax': {
    key: 'underarms-waxing-honey-wax',
    label: 'Underarms Waxing - Honey Wax',
    photoDesc: 'Warm amber honey wax applied carefully to raised underarm skin',
  },
  'underarms-waxing-rica-brazilian-wax': {
    key: 'underarms-waxing-rica-brazilian-wax',
    label: 'Underarms Waxing - Rica Brazilian Wax',
    photoDesc: 'Creamy stripless Rica Brazilian hard wax applied to delicate underarm skin',
  },
  'butt-wax-honey-wax': {
    key: 'butt-wax-honey-wax',
    label: 'Butt Wax - Honey Wax',
    photoDesc: 'Modestly draped honey wax application along the outer hip area',
  },
  'full-arm-waxing-honey-wax': {
    key: 'full-arm-waxing-honey-wax',
    label: 'Full Arm Waxing - Honey Wax',
    photoDesc: 'Warm golden honey wax and cotton strip smoothing along full arms',
  },
  'full-arms-underarms-honey-wax': {
    key: 'full-arms-underarms-honey-wax',
    label: 'Full Arms + Underarms - Honey Wax',
    photoDesc: 'Combo arm and underarm honey waxing treatment in comfortable home recliner',
  },
  'full-arms-waxing-rica-wax': {
    key: 'full-arms-waxing-rica-wax',
    label: 'Full Arms Waxing - Rica Wax',
    photoDesc: 'Creamy Italian Rica liposoluble wax applied smoothly on full arms',
  },
  'full-back-waxing-honey-wax': {
    key: 'full-back-waxing-honey-wax',
    label: 'Full Back Waxing - Honey Wax',
    photoDesc: 'Warm honey wax spread cleanly across the back with wooden spatula',
  },
  'half-legs-waxing-honey-wax': {
    key: 'half-legs-waxing-honey-wax',
    label: 'Half Legs Waxing - Honey Wax',
    photoDesc: 'Lower leg knee-to-ankle honey waxing with hygienic cotton strips',
  },
  'tummy-waxing-rica-wax': {
    key: 'tummy-waxing-rica-wax',
    label: 'Tummy Waxing - Rica Wax',
    photoDesc: 'Gentle Rica cream wax application over the midriff and tummy area',
  },
  'bikini-waxing-honey-wax': {
    key: 'bikini-waxing-honey-wax',
    label: 'Bikini Waxing - Honey Wax',
    photoDesc: 'Tasteful, modestly draped bikini-line golden honey waxing treatment',
  },
  'full-arms-waxing-rica-roll-on-wax': {
    key: 'full-arms-waxing-rica-roll-on-wax',
    label: 'Full Arms Waxing - Rica Roll on Wax',
    photoDesc: 'Hygienic heated Rica roll-on wax cartridge gliding down the full arm',
  },
  'full-arms-underarms-rica-wax': {
    key: 'full-arms-underarms-rica-wax',
    label: 'Full Arms + Underarms - Rica Wax',
    photoDesc: 'Nourishing Rica cream wax and strip care for full arms and underarms',
  },
  'butt-wax-rica-wax': {
    key: 'butt-wax-rica-wax',
    label: 'Butt Wax - Rica Wax',
    photoDesc: 'Smooth Rica cream wax treatment on modestly towel-draped hip area',
  },
  'full-legs-waxing-rica-roll-on-wax': {
    key: 'full-legs-waxing-rica-roll-on-wax',
    label: 'Full Legs Waxing - Rica Roll on Wax',
    photoDesc: 'Heated Rica roll-on wax cartridge gliding smoothly along full legs',
  },
  'full-legs-waxing-rica-wax': {
    key: 'full-legs-waxing-rica-wax',
    label: 'Full Legs Waxing - Rica Wax',
    photoDesc: 'Italian Rica avocado liposoluble wax applied smoothly along full legs',
  },
  'full-leg-waxing-honey-wax': {
    key: 'full-leg-waxing-honey-wax',
    label: 'Full Leg Waxing - Honey Wax',
    photoDesc: 'Amber honey wax and non-woven waxing strip along full legs',
  },
  'full-arms-full-legs-underarms-honey-wax': {
    key: 'full-arms-full-legs-underarms-honey-wax',
    label: 'Full Arms + Full Legs + Underarms - Honey Wax',
    photoDesc: 'Complete full limbs and underarms honey waxing value session',
  },
  'full-arms-full-legs-underarms-rica-wax': {
    key: 'full-arms-full-legs-underarms-rica-wax',
    label: 'Full Arms + Full Legs + Underarms - Rica Wax',
    photoDesc: 'Complete Rica wax ritual for silky arms, legs, and underarms',
  },
  'full-body-waxing-honey-wax': {
    key: 'full-body-waxing-honey-wax',
    label: 'Full Body Waxing - Honey Wax',
    photoDesc: 'Head-to-toe warm natural honey wax hair removal session',
  },
  'bikini-waxing-rica-brazilian-wax': {
    key: 'bikini-waxing-rica-brazilian-wax',
    label: 'Bikini Waxing - Rica Brazilian Wax',
    photoDesc: 'Low-pain Rica peelable Brazilian wax along modestly draped upper thigh edge',
  },
  'full-body-waxing-rica-wax': {
    key: 'full-body-waxing-rica-wax',
    label: 'Full Body Waxing - Rica Wax',
    photoDesc: 'Full-body Italian Rica wax and soothing chamomile post-depilatory lotion',
  },

  // Clean-up (1)
  'o3-seaweed-clean-up': {
    key: 'o3-seaweed-clean-up',
    label: 'O3+ Seaweed Clean Up',
    photoDesc: 'Deep-pore O3+ botanical seaweed gel mask and gentle facial steaming clean-up',
  },

  // D-Tan (7)
  'full-face-neck-detan': {
    key: 'full-face-neck-detan',
    label: 'Full Face + Neck Detan',
    photoDesc: 'Velvety white brightening D-Tan pack brushed across face and neck',
  },
  'full-arm-detan': {
    key: 'full-arm-detan',
    label: 'Full Arm Detan',
    photoDesc: 'Even tan-removal pack brushed cleanly down extended forearms and arms',
  },
  'back-detan': {
    key: 'back-detan',
    label: 'Back Detan',
    photoDesc: 'Sun-tan clarifying cream mask brushed smoothly over the upper back',
  },
  'chest-detan': {
    key: 'chest-detan',
    label: 'Chest Detan',
    photoDesc: 'Gentle D-Tan brightening pack brushed across collarbone and upper neckline',
  },
  'full-leg-detan': {
    key: 'full-leg-detan',
    label: 'Full Leg Detan',
    photoDesc: 'Brightening D-Tan cream applied smoothly along full legs',
  },
  'full-body-d-tan': {
    key: 'full-body-d-tan',
    label: 'Full Body D-Tan',
    photoDesc: 'Full-body tan reversal treatment applied smoothly across shoulders and arms',
  },
  'full-body-detan': {
    key: 'full-body-detan',
    label: 'Full Body Detan',
    photoDesc: 'Soft damp spa sponge removal of full-body D-Tan revealing radiant even skin',
  },

  // Facial Treatments (15)
  'blossom-kochhar-aroma-magic-fruit-facial': {
    key: 'blossom-kochhar-aroma-magic-fruit-facial',
    label: 'Blossom Kochhar Aroma Magic Fruit Facial',
    photoDesc: 'Aromatic fruit extract cream massage nourishing natural skin radiance',
  },
  'aroma-magic-skin-glow-facial': {
    key: 'aroma-magic-skin-glow-facial',
    label: 'Aroma Magic Skin Glow Facial',
    photoDesc: 'Upward lymphatic sculpting facial massage for radiant skin glow',
  },
  'aroma-magic-bridal-glow-facial': {
    key: 'aroma-magic-bridal-glow-facial',
    label: 'Aroma Magic Bridal Glow Facial',
    photoDesc: 'Luminous bridal glow facial mask with cooling cucumber eye therapy',
  },
  'pak-dee-italian-mix-fruits-facial': {
    key: 'pak-dee-italian-mix-fruits-facial',
    label: 'Pak Dee Italian Mix Fruits Facial',
    photoDesc: 'Fresh berry and citrus enzymatic exfoliating fruit facial massage',
  },
  'twacha-oxygen-tan-off-facial': {
    key: 'twacha-oxygen-tan-off-facial',
    label: 'Twacha Oxygen Tan Off Facial',
    photoDesc: 'Airy oxygenating tan-removal foam facial reviving dull sun-exposed skin',
  },
  'pak-dee-korean-glass-shine-facial': {
    key: 'pak-dee-korean-glass-shine-facial',
    label: 'Pak Dee Korean Glass Shine Facial',
    photoDesc: 'Concentrated Korean glass-shine essence pressed onto dewy hydrated cheeks',
  },
  'vlcc-pearl-facial': {
    key: 'vlcc-pearl-facial',
    label: 'VLCC Pearl Facial',
    photoDesc: 'Opalescent pearl luminous facial mask stroked cleanly with a fan brush',
  },
  'twacha-oxygen-tan-off-facial-korean-beauty-sheet-mask': {
    key: 'twacha-oxygen-tan-off-facial-korean-beauty-sheet-mask',
    label: 'Twacha Oxygen Tan Off Facial + Korean Beauty Sheet Mask',
    photoDesc: 'Serum-infused Korean beauty sheet mask fitted for intense brightening hydration',
  },
  'sara-gold-facial': {
    key: 'sara-gold-facial',
    label: 'Sara Gold Facial',
    photoDesc: '24K gold shimmer gel massage restoring youthful golden glow and elasticity',
  },
  'o3-salon-whitening-facial': {
    key: 'o3-salon-whitening-facial',
    label: 'O3+ Salon Whitening Facial',
    photoDesc: 'Signature O3+ brightening alginate facial mask smoothed evenly with spatula',
  },
  'sara-korean-facial': {
    key: 'sara-korean-facial',
    label: 'Sara Korean Facial',
    photoDesc: 'Cooling jade roller lymphatic contouring during multi-step Korean facial',
  },
  'o3-bridal-facial': {
    key: 'o3-bridal-facial',
    label: 'O3+ Bridal Facial',
    photoDesc: 'Rose-pink O3+ bridal peel-off rubber mask lifted to reveal bridal luminosity',
  },
  'kanpeki-hydra-shine-facial': {
    key: 'kanpeki-hydra-shine-facial',
    label: 'Kanpeki Hydra Shine Facial',
    photoDesc: 'Handheld hydra-dermabrasion suction wand deeply hydrating and polishing pores',
  },
  'fyc-korean-glass-skin-rice-water-facial': {
    key: 'fyc-korean-glass-skin-rice-water-facial',
    label: 'FYC Korean Glass Skin Rice Water Facial',
    photoDesc: 'Milky fermented rice-water elixir smoothing texture for mirror-like glass skin',
  },
  'kanpeki-korean-glass-glow-skin': {
    key: 'kanpeki-korean-glass-glow-skin',
    label: 'Kanpeki Korean Glass Glow Skin',
    photoDesc: 'Finishing ultrasonic LED light therapy wand sealing luminous glass glow',
  },

  // Polishing Treatment (1)
  'body-polishing-fyc-hydraboost': {
    key: 'body-polishing-fyc-hydraboost',
    label: 'Body Polishing - FYC Hydraboost',
    photoDesc: 'Micro-beaded walnut-sugar hydraboost body polish massaged on back and shoulders',
  },

  // Bleach (10)
  'oxy-bleach': {
    key: 'oxy-bleach',
    label: 'Oxy Bleach',
    photoDesc: 'Aerated snowy oxy-bleach paste gently applied across cheeks and forehead',
  },
  'fem-gold-bleach': {
    key: 'fem-gold-bleach',
    label: 'Fem Gold Bleach',
    photoDesc: 'Warm champagne-gold creme bleach applied smoothly for radiant facial glow',
  },
  'hand-korean-bleach': {
    key: 'hand-korean-bleach',
    label: 'Hand Korean Bleach',
    photoDesc: 'Korean brightening bleach brushed evenly over dorsal hands and fingers',
  },
  'full-arm-korean-bleach': {
    key: 'full-arm-korean-bleach',
    label: 'Full Arm Korean Bleach',
    photoDesc: 'Silky Korean brightening cream brushed evenly down extended arms',
  },
  'chest-korean-bleach': {
    key: 'chest-korean-bleach',
    label: 'Chest Korean Bleach',
    photoDesc: 'Gentle Korean cream bleach brushed neatly across upper chest and collarbone',
  },
  'back-korean-bleach': {
    key: 'back-korean-bleach',
    label: 'Back Korean Bleach',
    photoDesc: 'Creamy Korean brightening pack brushed cleanly over the upper back',
  },
  'face-korean-bleach': {
    key: 'face-korean-bleach',
    label: 'Face Korean Bleach',
    photoDesc: 'Whipped frothy Korean facial bleach stroked evenly across cheeks and forehead',
  },
  'full-leg-korean-bleach': {
    key: 'full-leg-korean-bleach',
    label: 'Full Leg Korean Bleach',
    photoDesc: 'Korean brightening cream applied evenly down clean full legs',
  },
  'full-body-oxy-bleach': {
    key: 'full-body-oxy-bleach',
    label: 'Full Body - Oxy Bleach',
    photoDesc: 'Whole-body oxygenating oxy-bleach ritual on shoulders, arms, and neckline',
  },
  'full-body-korean-bleach': {
    key: 'full-body-korean-bleach',
    label: 'Full Body Korean Bleach',
    photoDesc: 'Comprehensive full-body Korean brightening pack along arms and legs',
  },

  // Manicure & Pedicure (10)
  'fyc-classic-manicure': {
    key: 'fyc-classic-manicure',
    label: 'FYC Classic Manicure',
    photoDesc: 'Warm rose-petal hand soak and precision nail shaping with sterile file',
  },
  'sara-manicure': {
    key: 'sara-manicure',
    label: 'Sara Manicure',
    photoDesc: 'Nourishing Sara hand spa cream massage over soft manicure cushion',
  },
  'fyc-classic-pedicure': {
    key: 'fyc-classic-pedicure',
    label: 'FYC Classic Pedicure',
    photoDesc: 'Relaxing rose-petal spa foot soak and gentle heel exfoliation',
  },
  'o3-manicure': {
    key: 'o3-manicure',
    label: 'O3+ Manicure',
    photoDesc: 'O3+ brightening hand mask and cuticle care applied smoothly with brush',
  },
  'sara-pedicure': {
    key: 'sara-pedicure',
    label: 'Sara Pedicure',
    photoDesc: 'Soothing Sara pedicure balm massage along clean calves and foot arches',
  },
  'o3-pedicure': {
    key: 'o3-pedicure',
    label: 'O3+ Pedicure',
    photoDesc: 'O3+ detan-brightening white foot pack brushed neatly over clean feet',
  },
  'fyc-classic-manicure-pedicure': {
    key: 'fyc-classic-manicure-pedicure',
    label: 'FYC Classic Manicure & Pedicure',
    photoDesc: 'Dual floral foot soak and precise hand nail grooming combo session',
  },
  'sara-manicure-pedicure': {
    key: 'sara-manicure-pedicure',
    label: 'Sara Manicure & Pedicure',
    photoDesc: 'Sara sugar scrub hand exfoliation paired with warm floral foot bath',
  },
  'o3-manicure-pedicure': {
    key: 'o3-manicure-pedicure',
    label: 'O3+ Manicure & Pedicure',
    photoDesc: 'Complete O3+ nail brightening and soft nude-rose nail enamel finish',
  },
  'fyc-korean-glass-skin-manicure-pedicure': {
    key: 'fyc-korean-glass-skin-manicure-pedicure',
    label: 'FYC Korean Glass Skin Manicure & Pedicure',
    photoDesc: 'Milky rice-water jasmine foot soak and illuminated glass-skin hand serum massage',
  },

  // Head Massage (2)
  'dry-head-massage': {
    key: 'dry-head-massage',
    label: 'Dry Head Massage',
    photoDesc: 'Acupressure dry scalp and temple stress-relief champi massage',
  },
  'head-massage': {
    key: 'head-massage',
    label: 'Head Massage',
    photoDesc: 'Warm nourishing herbal oil scalp massage for deep relaxation and hair health',
  },

  // Hair Colour (1)
  'hair-colour-root-touch-up-customer-s-product': {
    key: 'hair-colour-root-touch-up-customer-s-product',
    label: "Hair Colour Root Touch Up (Customer's Product)",
    photoDesc: 'Precision hair parting and even root colour touch-up tint brush application',
  },

  // Hair Mehendi Dye (1)
  'heena-mehendi-only-application': {
    key: 'heena-mehendi-only-application',
    label: 'Heena Mehendi (Only Application)',
    photoDesc: 'Traditional botanical henna mehendi paste neatly brushed along parted hair',
  },

  // Hair Spa (1)
  'hair-spa': {
    key: 'hair-spa',
    label: 'Hair Spa',
    photoDesc: 'Deep-conditioning cream massaged into hair strands beside portable salon steamer',
  },

  // Body Massage & Scrub (3)
  'foot-massage': {
    key: 'foot-massage',
    label: 'Foot Massage',
    photoDesc: 'Calming foot reflexology cream massage easing tired arches and soles',
  },
  'body-massage': {
    key: 'body-massage',
    label: 'Body Massage',
    photoDesc: 'Soothing warm essential oil Swedish back and shoulder spa massage',
  },
  'full-body-scrub': {
    key: 'full-body-scrub',
    label: 'Full Body Scrub',
    photoDesc: 'Golden herbal mineral salt scrub exfoliating shoulders and back for silky skin',
  },

  // Hair Styling & Draping (4)
  'basic-saree-draping': {
    key: 'basic-saree-draping',
    label: 'Basic Saree Draping',
    photoDesc: 'Neat pleating and pinning of a luminous silk saree pallu at home',
  },
  'lehenga-dupatta-draping': {
    key: 'lehenga-dupatta-draping',
    label: 'Lehenga Dupatta Draping',
    photoDesc: 'Clean pinning and symmetrical pleat draping of an embroidered lehenga dupatta',
  },
  'basic-hair-styling': {
    key: 'basic-hair-styling',
    label: 'Basic Hair Styling',
    photoDesc: 'Soft glossy open waves and bouncy curls styled with ceramic curling wand',
  },
  'advanced-hair-styling': {
    key: 'advanced-hair-styling',
    label: 'Advanced Hair Styling',
    photoDesc: 'Intricate sculptural floral updo bun accented with fresh jasmine gajra',
  },

  // Makeup & Bridal (7)
  'basic-makeup-book-for-2-get-1-free': {
    key: 'basic-makeup-book-for-2-get-1-free',
    label: 'Basic Makeup - Book For 2 Get 1 Free',
    photoDesc: 'Fresh soft everyday natural makeup blush application with fluffy brush',
  },
  'hd-makeup-book-for-2-get-1-free': {
    key: 'hd-makeup-book-for-2-get-1-free',
    label: 'HD Makeup - Book For 2 Get 1 Free',
    photoDesc: 'Seamless high-definition foundation blending with beauty sponge for party glam',
  },
  'premium-makeup-book-for-2-get-1-free': {
    key: 'premium-makeup-book-for-2-get-1-free',
    label: 'Premium Makeup - Book For 2 Get 1 Free',
    photoDesc: 'Luminous party makeup highlighter sweep complementing silk saree and earrings',
  },
  'engagement-basic-makeup': {
    key: 'engagement-basic-makeup',
    label: 'Engagement Basic Makeup',
    photoDesc: 'Soft engagement rosewood lip definition for festive lehenga celebration',
  },
  'engagement-premium-makeup': {
    key: 'engagement-premium-makeup',
    label: 'Engagement Premium Makeup',
    photoDesc: 'Crisp winged eyeliner detailing for glamorous engagement lehenga look',
  },
  'basic-bridal-makeup-get-1-basic-makeup-free': {
    key: 'basic-bridal-makeup-get-1-basic-makeup-free',
    label: 'Basic Bridal Makeup - Get 1 Basic Makeup Free',
    photoDesc: 'Warm gold shimmer eyeshadow artistry on traditionally dressed Indian bride',
  },
  'premium-bridal-makeup-get-1-basic-makeup-free': {
    key: 'premium-bridal-makeup-get-1-basic-makeup-free',
    label: 'Premium Bridal Makeup - Get 1 Basic Makeup Free',
    photoDesc: 'Royal Indian bride finishing touch with crimson bridal lip artistry',
  },
};

// Exact 1-to-1 mapping: serviceId -> dedicated unique imageKey (all 91 services)
export const SERVICE_IMAGE_KEY: Record<string, string> = {
  // Threading (5)
  'threading-eyebrows': 'threading-eyebrows',
  'threading-upper-lips': 'threading-upper-lips',
  'threading-forehead': 'threading-forehead',
  'threading-chin': 'threading-chin',
  'full-face-threading': 'full-face-threading',

  // Face Wax (2)
  'upper-lips-rica-waxing': 'upper-lips-rica-waxing',
  'full-face-waxing-rica-brazilian-wax': 'full-face-waxing-rica-brazilian-wax',

  // Body Wax (21)
  'underarms-waxing-honey-wax': 'underarms-waxing-honey-wax',
  'underarms-waxing-rica-brazilian-wax': 'underarms-waxing-rica-brazilian-wax',
  'butt-wax-honey-wax': 'butt-wax-honey-wax',
  'full-arm-waxing-honey-wax': 'full-arm-waxing-honey-wax',
  'full-arms-underarms-honey-wax': 'full-arms-underarms-honey-wax',
  'full-arms-waxing-rica-wax': 'full-arms-waxing-rica-wax',
  'full-back-waxing-honey-wax': 'full-back-waxing-honey-wax',
  'half-legs-waxing-honey-wax': 'half-legs-waxing-honey-wax',
  'tummy-waxing-rica-wax': 'tummy-waxing-rica-wax',
  'bikini-waxing-honey-wax': 'bikini-waxing-honey-wax',
  'full-arms-waxing-rica-roll-on-wax': 'full-arms-waxing-rica-roll-on-wax',
  'full-arms-underarms-rica-wax': 'full-arms-underarms-rica-wax',
  'butt-wax-rica-wax': 'butt-wax-rica-wax',
  'full-legs-waxing-rica-roll-on-wax': 'full-legs-waxing-rica-roll-on-wax',
  'full-legs-waxing-rica-wax': 'full-legs-waxing-rica-wax',
  'full-leg-waxing-honey-wax': 'full-leg-waxing-honey-wax',
  'full-arms-full-legs-underarms-honey-wax': 'full-arms-full-legs-underarms-honey-wax',
  'full-arms-full-legs-underarms-rica-wax': 'full-arms-full-legs-underarms-rica-wax',
  'full-body-waxing-honey-wax': 'full-body-waxing-honey-wax',
  'bikini-waxing-rica-brazilian-wax': 'bikini-waxing-rica-brazilian-wax',
  'full-body-waxing-rica-wax': 'full-body-waxing-rica-wax',

  // Clean-up (1)
  'o3-seaweed-clean-up': 'o3-seaweed-clean-up',

  // D-Tan (7)
  'full-face-neck-detan': 'full-face-neck-detan',
  'full-arm-detan': 'full-arm-detan',
  'back-detan': 'back-detan',
  'chest-detan': 'chest-detan',
  'full-leg-detan': 'full-leg-detan',
  'full-body-d-tan': 'full-body-d-tan',
  'full-body-detan': 'full-body-detan',

  // Facial Treatments (15)
  'blossom-kochhar-aroma-magic-fruit-facial': 'blossom-kochhar-aroma-magic-fruit-facial',
  'aroma-magic-skin-glow-facial': 'aroma-magic-skin-glow-facial',
  'aroma-magic-bridal-glow-facial': 'aroma-magic-bridal-glow-facial',
  'pak-dee-italian-mix-fruits-facial': 'pak-dee-italian-mix-fruits-facial',
  'twacha-oxygen-tan-off-facial': 'twacha-oxygen-tan-off-facial',
  'pak-dee-korean-glass-shine-facial': 'pak-dee-korean-glass-shine-facial',
  'vlcc-pearl-facial': 'vlcc-pearl-facial',
  'twacha-oxygen-tan-off-facial-korean-beauty-sheet-mask': 'twacha-oxygen-tan-off-facial-korean-beauty-sheet-mask',
  'sara-gold-facial': 'sara-gold-facial',
  'o3-salon-whitening-facial': 'o3-salon-whitening-facial',
  'sara-korean-facial': 'sara-korean-facial',
  'o3-bridal-facial': 'o3-bridal-facial',
  'kanpeki-hydra-shine-facial': 'kanpeki-hydra-shine-facial',
  'fyc-korean-glass-skin-rice-water-facial': 'fyc-korean-glass-skin-rice-water-facial',
  'kanpeki-korean-glass-glow-skin': 'kanpeki-korean-glass-glow-skin',

  // Polishing (1)
  'body-polishing-fyc-hydraboost': 'body-polishing-fyc-hydraboost',

  // Bleach (10)
  'oxy-bleach': 'oxy-bleach',
  'fem-gold-bleach': 'fem-gold-bleach',
  'hand-korean-bleach': 'hand-korean-bleach',
  'full-arm-korean-bleach': 'full-arm-korean-bleach',
  'chest-korean-bleach': 'chest-korean-bleach',
  'back-korean-bleach': 'back-korean-bleach',
  'face-korean-bleach': 'face-korean-bleach',
  'full-leg-korean-bleach': 'full-leg-korean-bleach',
  'full-body-oxy-bleach': 'full-body-oxy-bleach',
  'full-body-korean-bleach': 'full-body-korean-bleach',

  // Manicure & Pedicure (10)
  'fyc-classic-manicure': 'fyc-classic-manicure',
  'sara-manicure': 'sara-manicure',
  'fyc-classic-pedicure': 'fyc-classic-pedicure',
  'o3-manicure': 'o3-manicure',
  'sara-pedicure': 'sara-pedicure',
  'o3-pedicure': 'o3-pedicure',
  'fyc-classic-manicure-pedicure': 'fyc-classic-manicure-pedicure',
  'sara-manicure-pedicure': 'sara-manicure-pedicure',
  'o3-manicure-pedicure': 'o3-manicure-pedicure',
  'fyc-korean-glass-skin-manicure-pedicure': 'fyc-korean-glass-skin-manicure-pedicure',

  // Head Massage (2)
  'dry-head-massage': 'dry-head-massage',
  'head-massage': 'head-massage',

  // Hair Colour (1)
  'hair-colour-root-touch-up-customer-s-product': 'hair-colour-root-touch-up-customer-s-product',

  // Hair Mehendi (1)
  'heena-mehendi-only-application': 'heena-mehendi-only-application',

  // Hair Spa (1)
  'hair-spa': 'hair-spa',

  // Body Care (3)
  'foot-massage': 'foot-massage',
  'body-massage': 'body-massage',
  'full-body-scrub': 'full-body-scrub',

  // Hair Styling & Draping (4)
  'basic-saree-draping': 'basic-saree-draping',
  'lehenga-dupatta-draping': 'lehenga-dupatta-draping',
  'basic-hair-styling': 'basic-hair-styling',
  'advanced-hair-styling': 'advanced-hair-styling',

  // Makeup & Bridal (7)
  'basic-makeup-book-for-2-get-1-free': 'basic-makeup-book-for-2-get-1-free',
  'hd-makeup-book-for-2-get-1-free': 'hd-makeup-book-for-2-get-1-free',
  'premium-makeup-book-for-2-get-1-free': 'premium-makeup-book-for-2-get-1-free',
  'engagement-basic-makeup': 'engagement-basic-makeup',
  'engagement-premium-makeup': 'engagement-premium-makeup',
  'basic-bridal-makeup-get-1-basic-makeup-free': 'basic-bridal-makeup-get-1-basic-makeup-free',
  'premium-bridal-makeup-get-1-basic-makeup-free': 'premium-bridal-makeup-get-1-basic-makeup-free',
};

export function getServiceImageKey(serviceId: string): string {
  return SERVICE_IMAGE_KEY[serviceId] || 'blossom-kochhar-aroma-magic-fruit-facial';
}

export function getImageKeyMeta(key: string): ImageKeyMeta {
  return IMAGE_KEY_DETAILS[key] || {
    key,
    label: key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    photoDesc: 'Hello Madam professional at-home parlour treatment',
  };
}

// Category Banners Map (retained for category pages)
export const categoryBanners: Record<string, string> = {
  'threading': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
  'face-wax': 'https://images.unsplash.com/photo-1512290900672-1f486a455a45?auto=format&fit=crop&w=1200&q=80',
  'body-wax': 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=1200&q=80',
  'clean-up': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
  'd-tan': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
  'facial': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
  'polishing': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  'bleach': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
  'manicure-pedicure': 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1200&q=80',
  'head-massage': 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
  'hair-colour': 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=80',
  'hair-mehendi': 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80',
  'hair-spa': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
  'body-care': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
  'styling': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
  'bridal': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
};

// Branded placeholder fallback
export const BRANDED_PLACEHOLDER = 
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23faf7f2"/><stop offset="100%" stop-color="%23f4ece1"/></linearGradient></defs><rect width="600" height="450" fill="url(%23g)"/><circle cx="300" cy="200" r="48" fill="%23fef2ee" stroke="%23ebdccd" stroke-width="2"/><path d="M300 178c-14 0-25 11-25 25 0 20 25 35 25 35s25-15 25-35c0-14-11-25-25-25z" fill="%23e03e1a" opacity="0.85"/><text x="300" y="285" font-family="serif" font-size="18" font-weight="bold" fill="%231c1917" text-anchor="middle" letter-spacing="1">HELLO MADAM</text><text x="300" y="310" font-family="sans-serif" font-size="12" fill="%2378716c" text-anchor="middle">AT-HOME BEAUTY · SOLAPUR</text></svg>';

export function getServiceImage(serviceId: string, categoryId?: string): string {
  const key = SERVICE_IMAGE_KEY[serviceId];
  if (key) {
    return imageUrl(key);
  }
  if (categoryId && categoryBanners[categoryId]) {
    return categoryBanners[categoryId];
  }
  return BRANDED_PLACEHOLDER;
}
