// DEMO DATA ONLY - Frontend UI prototype records for Hello Madam Beautician Partners
// Displayed contact numbers are unverified sample placeholders for demonstration.

import { PARTNERS } from './partners';
import {
  ALL_WEEK_DAYS,
  BeauticianAvailabilityRecord,
  TeamMember,
} from '../types/management';

const today = new Date();
function formatOffsetDate(offsetDays: number): string {
  const d = new Date(today);
  d.setDate(today.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

export const DEMO_BEAUTICIANS: TeamMember[] = PARTNERS.map((p, idx) => ({
  id: p.id,
  name: p.name,
  email: `${p.id}.demo@hellomadam.local`,
  phone: p.phone, // Sample placeholder - not verified real contact
  whatsapp: p.whatsapp,
  photoUrl: p.photo || `/assets/partners/${p.id}.jpg`,
  specialties: [...p.specialties],
  workingDays:
    idx === 1
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      : idx === 3
      ? ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : [...ALL_WEEK_DAYS],
  workingHoursStart: '10:00 AM',
  workingHoursEnd: '05:00 PM',
  availabilityStatus: idx === 3 ? 'busy' : 'available',
  active: p.active,
  isVerified: false, // Placeholder sample phone numbers are explicitly unverified
  assignedCount: 0,
  completedCount: 0,
}));

export const DEMO_AVAILABILITY_RECORDS: BeauticianAvailabilityRecord[] = [
  {
    id: `pooja_${formatOffsetDate(0)}`,
    beauticianId: 'pooja',
    date: formatOffsetDate(0),
    blockedSlots: ['04:00 PM - 05:00 PM'],
    isDayOff: false,
    note: 'Demo blocked afternoon slot',
  },
  {
    id: `kavita_${formatOffsetDate(1)}`,
    beauticianId: 'kavita',
    date: formatOffsetDate(1),
    blockedSlots: ['10:00 AM - 11:00 AM', '11:15 AM - 12:15 PM'],
    isDayOff: false,
    note: 'Morning bridal prep reserved (Demo)',
  },
];
