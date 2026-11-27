export type UserRole = 'owner' | 'beautician' | 'customer';

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  teamMemberId?: string;
  active: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type AvailabilityStatus = 'available' | 'busy' | 'on_leave';

export interface TeamMember {
  id: string;
  uid?: string;
  email?: string;
  name: string;
  phone: string;
  whatsapp: string;
  photoUrl?: string;
  specialties: string[];
  workingDays: string[];
  workingHoursStart?: string;
  workingHoursEnd?: string;
  availabilityStatus: AvailabilityStatus;
  active: boolean;
  isVerified: boolean;
  assignedCount?: number;
  completedCount?: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface PublicBeautician {
  id: string;
  name: string;
  photoUrl?: string;
  specialties: string[];
  workingDays?: string[];
  workingHoursStart?: string;
  workingHoursEnd?: string;
  availabilityStatus: AvailabilityStatus;
  active: boolean;
  isVerified: boolean;
  verifiedPhone?: string;
  updatedAt?: unknown;
}

export interface BeauticianAvailabilityRecord {
  id: string;
  beauticianId: string;
  beauticianUid?: string;
  date: string;
  blockedSlots: string[];
  isDayOff: boolean;
  note?: string;
  updatedAt?: unknown;
}

export interface CustomerRecord {
  id: string;
  uid?: string;
  fullName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  address: string;
  area?: string;
  landmark?: string;
  totalAppointments: number;
  completedAppointments: number;
  totalCompletedSpending: number;
  frequentServices?: string[];
  lastAppointmentDate?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type CanonicalBookingStatus =
  | 'pending'
  | 'confirmed'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'reschedule_requested'
  | 'customer_unavailable';

export type AssignmentStatus = 'unassigned' | 'assigned' | 'reassigned';

export interface AppointmentItemLine {
  serviceId: string;
  name: string;
  category?: string;
  price: number;
  durationMins: number;
  quantity: number;
}

export interface AppointmentRecord {
  id: string;
  bookingReference: string;
  customerId: string;
  customerUid: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp?: string;
  customerEmail?: string;
  customerAddress: string;
  customerArea?: string;
  landmark?: string;
  customerInstructions?: string;
  preferredBeauticianId: string;
  preferredBeauticianName: string;
  assignedBeauticianId: string;
  assignedBeauticianName?: string;
  assignedBeauticianPhone?: string;
  assignedBeauticianUid?: string;
  assignedBeauticianEmail?: string;
  appointmentDate: string;
  startTime?: string;
  endTime?: string;
  timeSlot: string;
  items: AppointmentItemLine[];
  estimatedTotal: number;
  totalDurationMins: number;
  status: CanonicalBookingStatus;
  assignmentStatus: AssignmentStatus;
  beauticianNote?: string;
  adminNotes?: string;
  rejectionReason?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AppointmentAssignmentRecord {
  id: string;
  appointmentId: string;
  bookingReference: string;
  previousBeauticianId?: string;
  previousBeauticianName?: string;
  beauticianId: string;
  beauticianName: string;
  beauticianUid?: string;
  beauticianEmail?: string;
  assignedByUid: string;
  action: 'assigned' | 'reassigned' | 'unassigned';
  note?: string;
  createdAt?: unknown;
}

export interface BookingStatusHistoryRecord {
  id: string;
  appointmentId: string;
  bookingReference: string;
  fromStatus?: string;
  toStatus: string;
  changedByUid: string;
  changedByRole: UserRole;
  changedByName: string;
  customerUid?: string;
  assignedBeauticianUid?: string;
  assignedBeauticianEmail?: string;
  note?: string;
  createdAt?: unknown;
}

export interface NotificationLogRecord {
  id: string;
  appointmentId: string;
  bookingReference: string;
  eventType: string;
  recipientRole: UserRole;
  recipientName: string;
  recipientContact: string;
  channel: 'whatsapp' | 'email';
  status: 'sent' | 'pending' | 'failed' | 'delivered' | 'not_configured';
  providerMessageId?: string;
  errorMessage?: string;
  payloadSummary?: string;
  isDemo?: boolean;
  createdByUid: string;
  createdAt?: unknown;
}

export const ALL_WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const STANDARD_TIME_SLOTS = [
  '10:00 AM - 11:00 AM',
  '11:15 AM - 12:15 PM',
  '12:30 PM - 01:30 PM',
  '01:45 PM - 02:45 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
] as const;

export const STATUS_DISPLAY_LABELS: Record<CanonicalBookingStatus, string> = {
  pending: 'Pending Confirmation',
  confirmed: 'Confirmed',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  reschedule_requested: 'Reschedule Requested',
  customer_unavailable: 'Customer Unavailable',
};

export function normalizeStatusKey(rawStatus?: string): CanonicalBookingStatus {
  const s = (rawStatus || 'pending').trim().toLowerCase();
  if (s === 'pending' || s.includes('pending')) return 'pending';
  if (s === 'in_progress' || s === 'in progress' || s.includes('progress')) return 'in_progress';
  if (s === 'assigned') return 'assigned';
  if (s === 'confirmed') return 'confirmed';
  if (s === 'completed') return 'completed';
  if (s === 'cancelled' || s.includes('cancel') || s === 'rejected') return 'cancelled';
  if (s === 'reschedule_requested' || s.includes('reschedule')) return 'reschedule_requested';
  if (s === 'customer_unavailable' || s.includes('unavailable')) return 'customer_unavailable';
  return 'pending';
}
