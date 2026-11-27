import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Service, getServiceById } from '../data/services';
import { ServiceItem } from '../data/servicesData';
import { BeautyPackage } from '../data/packagesData';
import { DEMO_APPOINTMENTS, DEMO_STATUS_HISTORY } from '../data/demoAppointments';
import { DEMO_CUSTOMERS } from '../data/demoCustomers';
import { DEMO_NOTIFICATIONS } from '../data/demoNotifications';
import { useAdmin } from './AdminContext';
import {
  AppointmentRecord,
  AppointmentAssignmentRecord,
  BookingStatusHistoryRecord,
  CanonicalBookingStatus,
  CustomerRecord,
  NotificationLogRecord,
  STATUS_DISPLAY_LABELS,
  TeamMember,
  normalizeStatusKey,
} from '../types/management';

const LS_CART = 'hello_madam_cart_v2';
const LS_FAVOURITES = 'hello_madam_favourites_v2';
const LS_APPOINTMENTS = 'hello_madam_demo_appointments_v2';
const LS_HISTORY = 'hello_madam_demo_history_v2';
const LS_CUSTOMERS = 'hello_madam_demo_customers_v2';
const LS_NOTIFICATIONS = 'hello_madam_demo_notifications_v2';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface BookingCustomer {
  fullName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email?: string;
  fullAddress: string;
  area?: string;
  landmark?: string;
  preferredDate: string;
  preferredTime: string;
  additionalInstructions?: string;
  partnerId?: string;
  partnerName?: string;
  partnerPhone?: string;
  partnerWhatsapp?: string;
}

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'Pending Confirmation'
  | 'Confirmed'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'Reschedule Requested'
  | 'Customer Unavailable';

export interface ConfirmedBooking {
  bookingId: string;
  id: string;
  services: ServiceItem[];
  items?: CartItem[];
  totalAmount: number;
  totalDurationMins: number;
  date: string;
  timeSlot: string;
  customerDetails: {
    fullName: string;
    mobileNumber: string;
    whatsappNumber: string;
    email?: string;
    fullAddress: string;
    area: string;
    landmark: string;
    additionalInstructions: string;
  };
  customer?: {
    name: string;
    phone: string;
    whatsapp?: string;
    address: string;
    landmark?: string;
    date: string;
    time: string;
    notes?: string;
  };
  createdAt: string;
  status: BookingStatus;
  canonicalStatus: CanonicalBookingStatus;
  assignmentStatus: 'unassigned' | 'assigned' | 'reassigned';
  customerId?: string;
  customerUid?: string;
  preferredBeauticianId: string;
  preferredBeauticianName: string;
  assignedBeauticianId: string;
  assignedBeauticianName?: string;
  assignedBeauticianPhone?: string;
  assignedBeauticianEmail?: string;
  partnerId?: string;
  partnerName?: string;
  partnerPhone?: string;
  partnerWhatsapp?: string;
  packageName?: string;
  adminNotes?: string;
  beauticianNote?: string;
  rejectionReason?: string;
}

export interface MockNotificationResult {
  channel: 'whatsapp' | 'email';
  recipientName: string;
  status: 'sent' | 'pending';
  note: string;
}

function toConfirmedBooking(a: AppointmentRecord): ConfirmedBooking {
  const canonical = normalizeStatusKey(a.status);
  const label = (STATUS_DISPLAY_LABELS[canonical] || 'Pending Confirmation') as BookingStatus;
  const services: ServiceItem[] = (a.items || []).map((item) => ({
    id: item.serviceId,
    name: item.name,
    category: (item.category || 'facials') as ServiceItem['category'],
    categoryLabel: item.category || 'Treatment',
    description: item.name,
    price: item.price,
    duration: `${item.durationMins || 30} mins`,
    image: '',
  }));

  const createdStr =
    typeof a.createdAt === 'string' && a.createdAt
      ? a.createdAt
      : new Date().toISOString();

  return {
    bookingId: a.bookingReference,
    id: a.id,
    services,
    totalAmount: Number(a.estimatedTotal || 0),
    totalDurationMins: Number(a.totalDurationMins || 30),
    date: a.appointmentDate,
    timeSlot: a.timeSlot,
    customerDetails: {
      fullName: a.customerName,
      mobileNumber: a.customerPhone,
      whatsappNumber: a.customerWhatsapp || a.customerPhone,
      email: a.customerEmail,
      fullAddress: a.customerAddress,
      area: a.customerArea || 'Solapur',
      landmark: a.landmark || '',
      additionalInstructions: a.customerInstructions || '',
    },
    customer: {
      name: a.customerName,
      phone: a.customerPhone,
      whatsapp: a.customerWhatsapp || a.customerPhone,
      address: a.customerAddress,
      landmark: a.landmark || '',
      date: a.appointmentDate,
      time: a.timeSlot,
      notes: a.customerInstructions || '',
    },
    createdAt: createdStr,
    status: label,
    canonicalStatus: canonical,
    assignmentStatus: a.assignmentStatus || 'unassigned',
    customerId: a.customerId,
    customerUid: a.customerUid,
    preferredBeauticianId: a.preferredBeauticianId || 'any',
    preferredBeauticianName: a.preferredBeauticianName || 'No preference – assign any available beautician',
    assignedBeauticianId: a.assignedBeauticianId || '',
    assignedBeauticianName: a.assignedBeauticianName || '',
    assignedBeauticianPhone: a.assignedBeauticianPhone || '',
    assignedBeauticianEmail: a.assignedBeauticianEmail || '',
    partnerId: a.assignedBeauticianId || a.preferredBeauticianId || 'any',
    partnerName: a.assignedBeauticianName || a.preferredBeauticianName || 'Any available beautician',
    partnerPhone: a.assignedBeauticianPhone || '',
    adminNotes: a.adminNotes,
    beauticianNote: a.beauticianNote,
    rejectionReason: a.rejectionReason,
  };
}

interface BookingContextType {
  cart: CartItem[];
  addToCart: (service: Service | ServiceItem, quantity?: number) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (serviceId: string) => boolean;
  cartCount: number;
  cartTotal: number;
  cartDurationMins: number;

  favourites: string[];
  toggleFavourite: (serviceId: string) => void;
  isFavourite: (serviceId: string) => boolean;

  toastMessage: string | null;
  showToast: (msg: string) => void;

  selectedServices: ServiceItem[];
  addService: (service: ServiceItem | Service) => void;
  removeService: (serviceId: string) => void;
  toggleService: (service: ServiceItem | Service) => void;
  isSelected: (serviceId: string) => boolean;
  addPackageToCart: (pkg: BeautyPackage, allServices?: ServiceItem[]) => void;
  totalAmount: number;
  totalEstimatedMins: number;

  bookingDate: string;
  setBookingDate: (date: string) => void;
  timeSlot: string;
  setTimeSlot: (slot: string) => void;
  customerDetails: {
    fullName: string;
    mobileNumber: string;
    whatsappNumber: string;
    fullAddress: string;
    area: string;
    landmark: string;
    additionalInstructions: string;
  };
  updateCustomerDetails: (
    updates: Partial<{
      fullName: string;
      mobileNumber: string;
      whatsappNumber: string;
      fullAddress: string;
      area: string;
      landmark: string;
      additionalInstructions: string;
    }>
  ) => void;

  recentBooking: ConfirmedBooking | null;
  submitBooking: (customCustomer?: Partial<BookingCustomer>) => ConfirmedBooking;
  submitBookingAsync: (
    customCustomer: Partial<BookingCustomer>
  ) => Promise<{ booking: ConfirmedBooking; notificationResults: MockNotificationResult[] }>;
  allBookings: ConfirmedBooking[];
  appointments: AppointmentRecord[];
  customers: CustomerRecord[];
  assignments: AppointmentAssignmentRecord[];
  statusHistory: BookingStatusHistoryRecord[];
  notificationLogs: NotificationLogRecord[];
  bookingsLoading: boolean;

  findBookingsByPhone: (phone: string) => ConfirmedBooking[];
  updateBookingStatus: (bookingId: string, status: BookingStatus, notes?: string) => Promise<void>;
  rescheduleBooking: (
    bookingId: string,
    newDate: string,
    newSlot: string,
    notes?: string
  ) => Promise<void>;
  approveAndAssignBooking: (params: {
    appointmentId: string;
    beautician: TeamMember;
    note?: string;
  }) => Promise<MockNotificationResult[]>;
  cancelOrRejectBooking: (params: {
    appointmentId: string;
    reason?: string;
  }) => Promise<MockNotificationResult[]>;
  beauticianActionOnBooking: (params: {
    appointmentId: string;
    beauticianId?: string;
    beauticianName?: string;
    action: 'start' | 'complete' | 'unavailable' | 'reschedule_request';
    note?: string;
  }) => Promise<MockNotificationResult[]>;
  updateCustomerRecord: (
    customerId: string,
    updates: Partial<Pick<CustomerRecord, 'fullName' | 'phone' | 'whatsapp' | 'address' | 'area' | 'landmark' | 'email'>>
  ) => void;
  checkBeauticianSlotConflict: (
    beauticianId: string,
    date: string,
    timeSlot: string,
    excludeAppointmentId?: string
  ) => Promise<string | null>;

  isMyBookingsOpen: boolean;
  setIsMyBookingsOpen: (open: boolean) => void;
  resetAllDemoData: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

function parseDurationMins(dur: string): number {
  const m = dur.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 30;
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { availabilityRecords, services: activeCatalogServices, resetToDefaults } = useAdmin();

  // ================= CART & FAVOURITES =================
  const [cart, setCart] = useState<CartItem[]>(() => readStorage<CartItem[]>(LS_CART, []));
  const [favourites, setFavourites] = useState<string[]>(() =>
    readStorage<string[]>(LS_FAVOURITES, [])
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_FAVOURITES, JSON.stringify(favourites));
    } catch {
      // ignore
    }
  }, [favourites]);

  const toCanonicalService = useCallback(
    (s: Service | ServiceItem): Service => {
      const catMatch = activeCatalogServices.find((cs) => cs.id === s.id);
      if (catMatch) {
        return {
          id: catMatch.id,
          name: catMatch.name,
          category: catMatch.category,
          sub: catMatch.subcategory || catMatch.categoryLabel,
          price: catMatch.price,
          duration: parseDurationMins(catMatch.duration),
          featured: catMatch.featuredInVideo,
          active: catMatch.active !== false,
        };
      }
      if ('active' in s && typeof s.duration !== 'string') {
        return s as Service;
      }
      const item = s as ServiceItem;
      return {
        id: item.id,
        name: item.name,
        category: item.category,
        sub: item.subcategory || item.categoryLabel,
        price: item.price,
        duration: parseDurationMins(item.duration || '30 mins'),
        featured: item.featuredInVideo,
        active: item.active !== false,
      };
    },
    [activeCatalogServices]
  );

  const addToCart = useCallback(
    (service: Service | ServiceItem, quantity = 1) => {
      const svc = toCanonicalService(service);
      setCart((prev) => {
        const existing = prev.find((i) => i.service.id === svc.id);
        if (existing) {
          return prev.map((i) =>
            i.service.id === svc.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { service: svc, quantity }];
      });
      showToast(`Added ${svc.name} to booking cart`);
    },
    [toCanonicalService, showToast]
  );

  const removeFromCart = useCallback((serviceId: string) => {
    setCart((prev) => prev.filter((i) => i.service.id !== serviceId));
  }, []);

  const updateQuantity = useCallback(
    (serviceId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(serviceId);
        return;
      }
      setCart((prev) =>
        prev.map((i) => (i.service.id === serviceId ? { ...i, quantity } : i))
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);
  const isInCart = useCallback(
    (serviceId: string) => cart.some((i) => i.service.id === serviceId),
    [cart]
  );

  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );
  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.service.price * item.quantity, 0),
    [cart]
  );
  const cartDurationMins = useMemo(
    () => cart.reduce((acc, item) => acc + (item.service.duration || 30) * item.quantity, 0),
    [cart]
  );

  const toggleFavourite = useCallback(
    (serviceId: string) => {
      setFavourites((prev) => {
        const exists = prev.includes(serviceId);
        showToast(exists ? 'Removed from favourites' : 'Saved to favourites');
        return exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      });
    },
    [showToast]
  );

  const isFavourite = useCallback(
    (serviceId: string) => favourites.includes(serviceId),
    [favourites]
  );

  const selectedServices: ServiceItem[] = useMemo(
    () =>
      cart.map((item) => {
        const match = activeCatalogServices.find((cs) => cs.id === item.service.id);
        return {
          id: item.service.id,
          name: item.service.name,
          category: (match?.category || item.service.category) as ServiceItem['category'],
          categoryLabel: match?.categoryLabel || item.service.sub || item.service.category,
          description: match?.description || item.service.name,
          price: item.service.price,
          priceDisplay: match?.priceDisplay,
          duration: match?.duration || `${item.service.duration || 30} mins`,
          image: match?.image || '',
        };
      }),
    [cart, activeCatalogServices]
  );

  const addService = useCallback(
    (service: ServiceItem | Service) => addToCart(service, 1),
    [addToCart]
  );

  const toggleService = useCallback(
    (service: ServiceItem | Service) => {
      if (isInCart(service.id)) {
        removeFromCart(service.id);
      } else {
        addToCart(service, 1);
      }
    },
    [isInCart, removeFromCart, addToCart]
  );

  const addPackageToCart = useCallback(
    (pkg: BeautyPackage, allCatalogServices?: ServiceItem[]) => {
      let addedCount = 0;
      const pool = allCatalogServices || activeCatalogServices;
      pkg.includedServiceIds.forEach((sid) => {
        const svcItem = pool.find((s) => s.id === sid);
        const canonical = svcItem ? toCanonicalService(svcItem) : getServiceById(sid);
        if (canonical) {
          setCart((prev) => {
            if (prev.some((i) => i.service.id === canonical.id)) return prev;
            return [...prev, { service: canonical, quantity: 1 }];
          });
          addedCount += 1;
        }
      });
      if (addedCount > 0) {
        showToast(`Added "${pkg.name}" (${addedCount} treatments) to cart`);
      }
    },
    [activeCatalogServices, toCanonicalService, showToast]
  );

  // ================= BOOKING FORM STATE =================
  const [bookingDate, setBookingDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 11:00 AM');
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    fullAddress: '',
    area: 'Navi Peth (Datta Chowk)',
    landmark: '',
    additionalInstructions: '',
  });

  const updateCustomerDetails = useCallback(
    (updates: Partial<typeof customerDetails>) => {
      setCustomerDetails((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // ================= DEMO APPOINTMENT / CRM / LOG STATE =================
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() =>
    readStorage<AppointmentRecord[]>(LS_APPOINTMENTS, DEMO_APPOINTMENTS)
  );
  const [statusHistory, setStatusHistory] = useState<BookingStatusHistoryRecord[]>(() =>
    readStorage<BookingStatusHistoryRecord[]>(LS_HISTORY, DEMO_STATUS_HISTORY)
  );
  const [customers, setCustomers] = useState<CustomerRecord[]>(() =>
    readStorage<CustomerRecord[]>(LS_CUSTOMERS, DEMO_CUSTOMERS)
  );
  const [notificationLogs, setNotificationLogs] = useState<NotificationLogRecord[]>(() =>
    readStorage<NotificationLogRecord[]>(LS_NOTIFICATIONS, DEMO_NOTIFICATIONS)
  );
  const [recentBooking, setRecentBooking] = useState<ConfirmedBooking | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LS_APPOINTMENTS, JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_HISTORY, JSON.stringify(statusHistory));
    } catch {
      // ignore
    }
  }, [statusHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_CUSTOMERS, JSON.stringify(customers));
    } catch {
      // ignore
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_NOTIFICATIONS, JSON.stringify(notificationLogs));
    } catch {
      // ignore
    }
  }, [notificationLogs]);

  const allBookings = useMemo(() => {
    return appointments
      .map(toConfirmedBooking)
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [appointments]);

  const appendMockNotification = useCallback(
    (entry: Omit<NotificationLogRecord, 'id' | 'createdAt' | 'createdByUid' | 'isDemo'>) => {
      const record: NotificationLogRecord = {
        ...entry,
        id: `demo-notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        isDemo: true,
        createdByUid: 'demo-frontend',
        createdAt: new Date().toISOString(),
      };
      setNotificationLogs((prev) => [record, ...prev]);
    },
    []
  );

  const appendHistory = useCallback(
    (entry: Omit<BookingStatusHistoryRecord, 'id' | 'createdAt'>) => {
      const record: BookingStatusHistoryRecord = {
        ...entry,
        id: `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString(),
      };
      setStatusHistory((prev) => [record, ...prev]);
    },
    []
  );

  const checkBeauticianSlotConflict = useCallback(
    async (
      beauticianId: string,
      date: string,
      slot: string,
      excludeAppointmentId?: string
    ): Promise<string | null> => {
      if (!beauticianId || beauticianId === 'any') return null;

      const avail = availabilityRecords.find(
        (r) => r.beauticianId === beauticianId && r.date === date
      );
      if (avail) {
        if (avail.isDayOff) {
          return `Beautician marked ${date} as Day Off`;
        }
        if (avail.blockedSlots.includes(slot)) {
          return `Slot "${slot}" is blocked for this beautician on ${date}`;
        }
      }

      const conflicting = appointments.find(
        (a) =>
          a.id !== excludeAppointmentId &&
          a.assignedBeauticianId === beauticianId &&
          a.appointmentDate === date &&
          a.timeSlot === slot &&
          !['cancelled', 'completed'].includes(normalizeStatusKey(a.status))
      );

      if (conflicting) {
        return `Conflict with ${conflicting.bookingReference} (${conflicting.customerName})`;
      }

      return null;
    },
    [availabilityRecords, appointments]
  );

  const submitBookingAsync = useCallback(
    async (
      customCustomer: Partial<BookingCustomer>
    ): Promise<{ booking: ConfirmedBooking; notificationResults: MockNotificationResult[] }> => {
      const mergedName = (customCustomer.fullName || customerDetails.fullName || 'Guest Customer').trim();
      const mergedMobile = (customCustomer.mobileNumber || customerDetails.mobileNumber).trim();
      const mergedWhatsapp = (
        customCustomer.whatsappNumber ||
        customerDetails.whatsappNumber ||
        mergedMobile
      ).trim();
      const mergedAddress = (customCustomer.fullAddress || customerDetails.fullAddress).trim();
      const mergedArea = (customCustomer.area || customerDetails.area || 'Solapur').trim();
      const mergedLandmark = (customCustomer.landmark || customerDetails.landmark || '').trim();
      const mergedDate = customCustomer.preferredDate || bookingDate;
      const mergedSlot = customCustomer.preferredTime || timeSlot;
      const mergedNotes = (
        customCustomer.additionalInstructions ||
        customerDetails.additionalInstructions ||
        ''
      ).trim();

      const preferredBeauticianId = customCustomer.partnerId || 'any';
      const preferredBeauticianName =
        customCustomer.partnerName || 'No preference – assign any available beautician';

      const bookingRef = `HM-SOL-${Math.floor(1050 + Math.random() * 8900)}`;
      const docId = `demo-appt-${Date.now()}`;
      const customerId = `cust-${mergedMobile.replace(/\D/g, '') || Date.now()}`;

      const items = cart.map((ci) => ({
        serviceId: ci.service.id,
        name: ci.service.name,
        category: ci.service.category,
        price: ci.service.price,
        durationMins: ci.service.duration || 30,
        quantity: ci.quantity,
      }));

      const nowIso = new Date().toISOString();

      const newAppointment: AppointmentRecord = {
        id: docId,
        bookingReference: bookingRef,
        customerId,
        customerUid: customerId,
        customerName: mergedName,
        customerPhone: mergedMobile,
        customerWhatsapp: mergedWhatsapp,
        customerEmail: customCustomer.email || undefined,
        customerAddress: mergedAddress,
        customerArea: mergedArea,
        landmark: mergedLandmark,
        customerInstructions: mergedNotes,
        preferredBeauticianId,
        preferredBeauticianName,
        assignedBeauticianId: '',
        assignedBeauticianName: '',
        assignedBeauticianPhone: '',
        appointmentDate: mergedDate,
        timeSlot: mergedSlot,
        items,
        estimatedTotal: cartTotal,
        totalDurationMins: cartDurationMins || 45,
        status: 'pending',
        assignmentStatus: 'unassigned',
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      setAppointments((prev) => [newAppointment, ...prev]);

      // Upsert Customer Directory
      setCustomers((prev) => {
        const cleanDigits = mergedMobile.replace(/\D/g, '');
        const idx = prev.findIndex(
          (c) =>
            c.id === customerId ||
            c.phone.replace(/\D/g, '').endsWith(cleanDigits.slice(-10))
        );
        const itemNames = items.map((i) => i.name);
        if (idx >= 0) {
          const existing = prev[idx];
          const updated: CustomerRecord = {
            ...existing,
            fullName: mergedName,
            whatsapp: mergedWhatsapp,
            address: mergedAddress,
            area: mergedArea,
            landmark: mergedLandmark,
            totalAppointments: existing.totalAppointments + 1,
            frequentServices: Array.from(
              new Set([...(existing.frequentServices || []), ...itemNames])
            ).slice(0, 6),
            lastAppointmentDate: mergedDate,
          };
          return prev.map((c, i) => (i === idx ? updated : c));
        }
        const created: CustomerRecord = {
          id: customerId,
          fullName: mergedName,
          phone: mergedMobile,
          whatsapp: mergedWhatsapp,
          email: customCustomer.email,
          address: mergedAddress,
          area: mergedArea,
          landmark: mergedLandmark,
          totalAppointments: 1,
          completedAppointments: 0,
          totalCompletedSpending: 0,
          frequentServices: itemNames.slice(0, 6),
          lastAppointmentDate: mergedDate,
        };
        return [created, ...prev];
      });

      appendHistory({
        appointmentId: docId,
        bookingReference: bookingRef,
        toStatus: 'pending',
        changedByUid: customerId,
        changedByRole: 'customer',
        changedByName: mergedName,
        note: `Booking requested via website (Preferred: ${preferredBeauticianName})`,
      });

      appendMockNotification({
        appointmentId: docId,
        bookingReference: bookingRef,
        eventType: 'New Booking',
        recipientRole: 'owner',
        recipientName: 'Hello Madam Owner HQ',
        recipientContact: '+91 9657156795',
        channel: 'whatsapp',
        status: 'sent',
        payloadSummary: `Demo request from ${mergedName} (${mergedDate} · ${mergedSlot}, ₹${cartTotal}).`,
      });

      const confirmed = toConfirmedBooking(newAppointment);
      setRecentBooking(confirmed);
      setCart([]);
      showToast('Booking request added to demo schedule!');

      return {
        booking: confirmed,
        notificationResults: [
          {
            channel: 'whatsapp',
            recipientName: 'Hello Madam Owner (Demo)',
            status: 'sent',
            note: 'Frontend mock notification logged',
          },
        ],
      };
    },
    [
      cart,
      cartTotal,
      cartDurationMins,
      customerDetails,
      bookingDate,
      timeSlot,
      appendHistory,
      appendMockNotification,
      showToast,
    ]
  );

  const submitBooking = useCallback(
    (customCustomer?: Partial<BookingCustomer>) => {
      const mergedName = customCustomer?.fullName || customerDetails.fullName || 'Guest Customer';
      const draft: AppointmentRecord = {
        id: `demo-appt-${Date.now()}`,
        bookingReference: `HM-SOL-${Math.floor(1050 + Math.random() * 8900)}`,
        customerId: 'demo-cust',
        customerUid: 'demo-cust',
        customerName: mergedName,
        customerPhone: customCustomer?.mobileNumber || customerDetails.mobileNumber,
        customerAddress: customCustomer?.fullAddress || customerDetails.fullAddress,
        customerArea: customCustomer?.area || customerDetails.area,
        preferredBeauticianId: customCustomer?.partnerId || 'any',
        preferredBeauticianName: customCustomer?.partnerName || 'Any available beautician',
        assignedBeauticianId: '',
        appointmentDate: customCustomer?.preferredDate || bookingDate,
        timeSlot: customCustomer?.preferredTime || timeSlot,
        items: [],
        estimatedTotal: cartTotal,
        totalDurationMins: cartDurationMins,
        status: 'pending',
        assignmentStatus: 'unassigned',
        createdAt: new Date().toISOString(),
      };
      void submitBookingAsync(customCustomer || {});
      return toConfirmedBooking(draft);
    },
    [submitBookingAsync, customerDetails, bookingDate, timeSlot, cartTotal, cartDurationMins]
  );

  const approveAndAssignBooking = useCallback(
    async ({
      appointmentId,
      beautician,
      note,
    }: {
      appointmentId: string;
      beautician: TeamMember;
      note?: string;
    }): Promise<MockNotificationResult[]> => {
      const target = appointments.find((a) => a.id === appointmentId);
      if (!target) throw new Error('Appointment not found');

      const conflict = await checkBeauticianSlotConflict(
        beautician.id,
        target.appointmentDate,
        target.timeSlot,
        target.id
      );
      if (conflict) {
        throw new Error(conflict);
      }

      const isReassign = Boolean(
        target.assignedBeauticianId && target.assignedBeauticianId !== beautician.id
      );

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? {
                ...a,
                assignedBeauticianId: beautician.id,
                assignedBeauticianName: beautician.name,
                assignedBeauticianPhone: beautician.phone,
                assignedBeauticianEmail: beautician.email,
                status: 'assigned',
                assignmentStatus: isReassign ? 'reassigned' : 'assigned',
                adminNotes: note ?? a.adminNotes,
                updatedAt: new Date().toISOString(),
              }
            : a
        )
      );

      appendHistory({
        appointmentId,
        bookingReference: target.bookingReference,
        fromStatus: target.status,
        toStatus: 'assigned',
        changedByUid: 'demo-owner',
        changedByRole: 'owner',
        changedByName: 'Hello Madam Owner',
        note: note || `Assigned to ${beautician.name}`,
      });

      appendMockNotification({
        appointmentId,
        bookingReference: target.bookingReference,
        eventType: 'Beautician Assigned',
        recipientRole: 'beautician',
        recipientName: beautician.name,
        recipientContact: `${beautician.phone} (Demo Placeholder)`,
        channel: 'whatsapp',
        status: 'sent',
        payloadSummary: `Assigned ${target.bookingReference} (${target.customerName}, ${target.appointmentDate} ${target.timeSlot}). Demo record.`,
      });

      showToast(`Assigned ${beautician.name} to ${target.bookingReference}`);
      return [
        {
          channel: 'whatsapp',
          recipientName: beautician.name,
          status: 'sent',
          note: 'Frontend mock record added',
        },
      ];
    },
    [appointments, checkBeauticianSlotConflict, appendHistory, appendMockNotification, showToast]
  );

  const cancelOrRejectBooking = useCallback(
    async ({
      appointmentId,
      reason,
    }: {
      appointmentId: string;
      reason?: string;
    }): Promise<MockNotificationResult[]> => {
      const target = appointments.find((a) => a.id === appointmentId);
      if (!target) return [];

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? {
                ...a,
                status: 'cancelled',
                rejectionReason: reason || 'Cancelled / rejected in Owner Portal',
                updatedAt: new Date().toISOString(),
              }
            : a
        )
      );

      appendHistory({
        appointmentId,
        bookingReference: target.bookingReference,
        fromStatus: target.status,
        toStatus: 'cancelled',
        changedByUid: 'demo-owner',
        changedByRole: 'owner',
        changedByName: 'Hello Madam Owner',
        note: reason || 'Cancelled',
      });

      appendMockNotification({
        appointmentId,
        bookingReference: target.bookingReference,
        eventType: 'Appointment Rejected',
        recipientRole: 'customer',
        recipientName: target.customerName,
        recipientContact: target.customerPhone,
        channel: 'whatsapp',
        status: 'sent',
        payloadSummary: reason || `Appointment ${target.bookingReference} marked cancelled (Demo record).`,
      });

      showToast(`Updated ${target.bookingReference} to Cancelled`);
      return [];
    },
    [appointments, appendHistory, appendMockNotification, showToast]
  );

  const updateBookingStatus = useCallback(
    async (bookingId: string, status: BookingStatus, notes?: string) => {
      const canonical = normalizeStatusKey(status);
      const target = appointments.find(
        (a) => a.id === bookingId || a.bookingReference === bookingId
      );
      if (!target) return;

      if (canonical === 'cancelled') {
        await cancelOrRejectBooking({ appointmentId: target.id, reason: notes });
        return;
      }

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === target.id
            ? {
                ...a,
                status: canonical,
                adminNotes: notes ?? a.adminNotes,
                updatedAt: new Date().toISOString(),
              }
            : a
        )
      );

      appendHistory({
        appointmentId: target.id,
        bookingReference: target.bookingReference,
        fromStatus: target.status,
        toStatus: canonical,
        changedByUid: 'demo-owner',
        changedByRole: 'owner',
        changedByName: 'Hello Madam Owner',
        note: notes || `Status updated to ${STATUS_DISPLAY_LABELS[canonical]}`,
      });

      if (canonical === 'confirmed') {
        appendMockNotification({
          appointmentId: target.id,
          bookingReference: target.bookingReference,
          eventType: 'Appointment Accepted',
          recipientRole: 'customer',
          recipientName: target.customerName,
          recipientContact: target.customerPhone,
          channel: 'whatsapp',
          status: 'sent',
          payloadSummary: `Booking ${target.bookingReference} accepted by Owner (Demo record).`,
        });
      }

      showToast(`${target.bookingReference} marked ${STATUS_DISPLAY_LABELS[canonical]}`);
    },
    [appointments, cancelOrRejectBooking, appendHistory, appendMockNotification, showToast]
  );

  const beauticianActionOnBooking = useCallback(
    async ({
      appointmentId,
      beauticianName,
      action,
      note,
    }: {
      appointmentId: string;
      beauticianId?: string;
      beauticianName?: string;
      action: 'start' | 'complete' | 'unavailable' | 'reschedule_request';
      note?: string;
    }): Promise<MockNotificationResult[]> => {
      const target = appointments.find((a) => a.id === appointmentId);
      if (!target) return [];

      const nextStatus: CanonicalBookingStatus =
        action === 'start'
          ? 'in_progress'
          : action === 'complete'
          ? 'completed'
          : action === 'unavailable'
          ? 'customer_unavailable'
          : 'reschedule_requested';

      const actorName = beauticianName || target.assignedBeauticianName || 'Beautician Partner';

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === appointmentId
            ? {
                ...a,
                status: nextStatus,
                beauticianNote: note || a.beauticianNote,
                updatedAt: new Date().toISOString(),
              }
            : a
        )
      );

      appendHistory({
        appointmentId,
        bookingReference: target.bookingReference,
        fromStatus: target.status,
        toStatus: nextStatus,
        changedByUid: `demo-${actorName.toLowerCase()}`,
        changedByRole: 'beautician',
        changedByName: actorName,
        note: note || `Beautician marked ${STATUS_DISPLAY_LABELS[nextStatus]}`,
      });

      if (action === 'reschedule_request' || action === 'unavailable') {
        appendMockNotification({
          appointmentId,
          bookingReference: target.bookingReference,
          eventType: 'Appointment Rescheduled',
          recipientRole: 'owner',
          recipientName: 'Hello Madam Owner HQ',
          recipientContact: '+91 9657156795',
          channel: 'whatsapp',
          status: 'pending',
          payloadSummary: `${actorName} reported "${STATUS_DISPLAY_LABELS[nextStatus]}" for ${target.bookingReference}.`,
        });
      }

      showToast(`${target.bookingReference} → ${STATUS_DISPLAY_LABELS[nextStatus]}`);
      return [];
    },
    [appointments, appendHistory, appendMockNotification, showToast]
  );

  const rescheduleBooking = useCallback(
    async (bookingId: string, newDate: string, newSlot: string, notes?: string) => {
      const target = appointments.find(
        (a) => a.id === bookingId || a.bookingReference === bookingId
      );
      if (!target) return;

      if (target.assignedBeauticianId) {
        const conflict = await checkBeauticianSlotConflict(
          target.assignedBeauticianId,
          newDate,
          newSlot,
          target.id
        );
        if (conflict) throw new Error(conflict);
      }

      const nextStatus: CanonicalBookingStatus = target.assignedBeauticianId
        ? 'assigned'
        : 'confirmed';

      setAppointments((prev) =>
        prev.map((a) =>
          a.id === target.id
            ? {
                ...a,
                appointmentDate: newDate,
                timeSlot: newSlot,
                status: nextStatus,
                adminNotes: notes || `Rescheduled to ${newDate} · ${newSlot}`,
                updatedAt: new Date().toISOString(),
              }
            : a
        )
      );

      appendHistory({
        appointmentId: target.id,
        bookingReference: target.bookingReference,
        fromStatus: target.status,
        toStatus: nextStatus,
        changedByUid: 'demo-owner',
        changedByRole: 'owner',
        changedByName: 'Hello Madam Owner',
        note: `Rescheduled to ${newDate} · ${newSlot}`,
      });

      appendMockNotification({
        appointmentId: target.id,
        bookingReference: target.bookingReference,
        eventType: 'Appointment Rescheduled',
        recipientRole: 'customer',
        recipientName: target.customerName,
        recipientContact: target.customerPhone,
        channel: 'whatsapp',
        status: 'sent',
        payloadSummary: `Rescheduled ${target.bookingReference} to ${newDate} · ${newSlot} (Demo record).`,
      });

      showToast(`Rescheduled ${target.bookingReference} to ${newDate}`);
    },
    [appointments, checkBeauticianSlotConflict, appendHistory, appendMockNotification, showToast]
  );

  const updateCustomerRecord = useCallback(
    (
      customerId: string,
      updates: Partial<
        Pick<
          CustomerRecord,
          'fullName' | 'phone' | 'whatsapp' | 'address' | 'area' | 'landmark' | 'email'
        >
      >
    ) => {
      setCustomers((prev) =>
        prev.map((c) => (c.id === customerId ? { ...c, ...updates } : c))
      );
      showToast('Updated demo customer details');
    },
    [showToast]
  );

  const findBookingsByPhone = useCallback(
    (phone: string) => {
      const clean = phone.replace(/\D/g, '');
      const q = phone.trim().toLowerCase();
      if (!q) return allBookings;
      return allBookings.filter((b) => {
        const bDigits = b.customerDetails.mobileNumber.replace(/\D/g, '');
        return (
          (clean.length >= 3 && bDigits.includes(clean)) ||
          b.bookingId.toLowerCase().includes(q) ||
          b.customerDetails.fullName.toLowerCase().includes(q)
        );
      });
    },
    [allBookings]
  );

  const resetAllDemoData = useCallback(async () => {
    setAppointments(DEMO_APPOINTMENTS);
    setStatusHistory(DEMO_STATUS_HISTORY);
    setCustomers(DEMO_CUSTOMERS);
    setNotificationLogs(DEMO_NOTIFICATIONS);
    try {
      localStorage.setItem(LS_APPOINTMENTS, JSON.stringify(DEMO_APPOINTMENTS));
      localStorage.setItem(LS_HISTORY, JSON.stringify(DEMO_STATUS_HISTORY));
      localStorage.setItem(LS_CUSTOMERS, JSON.stringify(DEMO_CUSTOMERS));
      localStorage.setItem(LS_NOTIFICATIONS, JSON.stringify(DEMO_NOTIFICATIONS));
    } catch {
      // ignore
    }
    await resetToDefaults();
    showToast('All demo data restored to initial state');
  }, [resetToDefaults, showToast]);

  return (
    <BookingContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        cartCount,
        cartTotal,
        cartDurationMins,
        favourites,
        toggleFavourite,
        isFavourite,
        toastMessage,
        showToast,
        selectedServices,
        addService,
        removeService: removeFromCart,
        toggleService,
        isSelected: isInCart,
        addPackageToCart,
        totalAmount: cartTotal,
        totalEstimatedMins: cartDurationMins,
        bookingDate,
        setBookingDate,
        timeSlot,
        setTimeSlot,
        customerDetails,
        updateCustomerDetails,
        recentBooking,
        submitBooking,
        submitBookingAsync,
        allBookings,
        appointments,
        customers,
        assignments: [],
        statusHistory,
        notificationLogs,
        bookingsLoading: false,
        findBookingsByPhone,
        updateBookingStatus,
        rescheduleBooking,
        approveAndAssignBooking,
        cancelOrRejectBooking,
        beauticianActionOnBooking,
        updateCustomerRecord,
        checkBeauticianSlotConflict,
        isMyBookingsOpen,
        setIsMyBookingsOpen,
        resetAllDemoData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return ctx;
};
