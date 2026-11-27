// DUMMY DATA - replace with real partners
// Hello Madam Beautician Partner Network in Solapur

export interface Partner {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  specialties: string[];
  active: boolean;
  photo?: string;
}

export const PARTNERS: Partner[] = [
  {
    id: 'sneha',
    name: 'Sneha',
    phone: '+91 90000 00001',
    whatsapp: '+91 90000 00001',
    specialties: ['Facial Treatments', 'Threading', 'Clean-up'],
    active: true,
    photo: '/assets/partners/sneha.jpg'
  },
  {
    id: 'pooja',
    name: 'Pooja',
    phone: '+91 90000 00002',
    whatsapp: '+91 90000 00002',
    specialties: ['Body Wax', 'Face Wax', 'D-Tan', 'Bleach'],
    active: true,
    photo: '/assets/partners/pooja.jpg'
  },
  {
    id: 'aarti',
    name: 'Aarti',
    phone: '+91 90000 00003',
    whatsapp: '+91 90000 00003',
    specialties: ['Manicure & Pedicure', 'Head Massage', 'Body Massage & Scrub'],
    active: true,
    photo: '/assets/partners/aarti.jpg'
  },
  {
    id: 'kavita',
    name: 'Kavita',
    phone: '+91 90000 00004',
    whatsapp: '+91 90000 00004',
    specialties: ['Hair Spa', 'Hair Colour', 'Hair Mehendi Dye'],
    active: true,
    photo: '/assets/partners/kavita.jpg'
  },
  {
    id: 'rutuja',
    name: 'Rutuja',
    phone: '+91 90000 00005',
    whatsapp: '+91 90000 00005',
    specialties: ['Makeup & Bridal', 'Hair Styling & Draping'],
    active: true,
    photo: '/assets/partners/rutuja.jpg'
  }
];

export const ANY_PARTNER: Partner = {
  id: 'any',
  name: 'Any available beautician',
  phone: '+91 9657156795',
  whatsapp: '+91 9657156795',
  specialties: ['All Services', 'Assigned by Hello Madam'],
  active: true,
  photo: ''
};

export function getPartnerById(id?: string): Partner | undefined {
  if (!id || id === 'any') return ANY_PARTNER;
  return PARTNERS.find(p => p.id === id);
}

/**
 * Checks if a partner specializes in the services currently in cart.
 * Matches partner.specialties against service category names/labels.
 */
export function partnerMatchesCategories(partner: Partner, categoryNames: string[]): boolean {
  if (partner.id === 'any') return false;
  if (!categoryNames.length) return false;

  const pSpecs = partner.specialties.map(s => s.toLowerCase());
  return categoryNames.some(cat => {
    const cLower = cat.toLowerCase();
    return pSpecs.some(spec => {
      return (
        spec.includes(cLower) || 
        cLower.includes(spec) ||
        (spec.includes('facial') && cLower.includes('facial')) ||
        (spec.includes('wax') && cLower.includes('wax')) ||
        (spec.includes('threading') && cLower.includes('threading')) ||
        (spec.includes('clean-up') && (cLower.includes('clean') || cLower.includes('cleanup'))) ||
        (spec.includes('d-tan') && (cLower.includes('d-tan') || cLower.includes('detan') || cLower.includes('tan'))) ||
        (spec.includes('bleach') && cLower.includes('bleach')) ||
        (spec.includes('manicure') && (cLower.includes('mani') || cLower.includes('pedi'))) ||
        (spec.includes('hair') && cLower.includes('hair')) ||
        (spec.includes('massage') && (cLower.includes('massage') || cLower.includes('body'))) ||
        (spec.includes('makeup') && (cLower.includes('makeup') || cLower.includes('bridal'))) ||
        (spec.includes('draping') && (cLower.includes('draping') || cLower.includes('styling')))
      );
    });
  });
}
