import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, SERVICES_LIST } from '../data/servicesData';
import { BeautyPackage, getPackageDetails } from '../data/packagesData';

export interface CustomerDetails {
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  fullAddress: string;
  area: string;
  landmark: string;
  additionalInstructions: string;
}

export type BookingStatus = 'Pending Confirmation' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface ConfirmedBooking {
  bookingId: string;
  services: ServiceItem[];
  totalAmount: number;
  totalDurationMins: number;
  date: string;
  timeSlot: string;
  customerDetails: CustomerDetails;
  createdAt: string;
  status: BookingStatus;
  packageName?: string;
  adminNotes?: string;
}

interface BookingContextType {
  selectedServices: ServiceItem[];
  addService: (service: ServiceItem) => void;
  removeService: (serviceId: string) => void;
  toggleService: (service: ServiceItem) => void;
  isSelected: (serviceId: string) => boolean;
  clearCart: () => void;
  addPackageToCart: (pkg: BeautyPackage, allServices?: ServiceItem[]) => void;
  totalAmount: number;
  totalEstimatedMins: number;
  
  // Active booking form state
  bookingDate: string;
  setBookingDate: (date: string) => void;
  timeSlot: string;
  setTimeSlot: (slot: string) => void;
  customerDetails: CustomerDetails;
  updateCustomerDetails: (updates: Partial<CustomerDetails>) => void;
  
  // Submitted Bookings
  recentBooking: ConfirmedBooking | null;
  submitBooking: () => ConfirmedBooking;
  allBookings: ConfirmedBooking[];
  findBookingsByPhone: (phone: string) => ConfirmedBooking[];
  updateBookingStatus: (bookingId: string, status: BookingStatus, notes?: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newSlot: string) => void;
  
  // UI Dialog state
  isMyBookingsOpen: boolean;
  setIsMyBookingsOpen: (open: boolean) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const INITIAL_CUSTOMER_DETAILS: CustomerDetails = {
  fullName: '',
  mobileNumber: '',
  whatsappNumber: '',
  fullAddress: '',
  area: 'Navi Peth (Datta Chowk)',
  landmark: '',
  additionalInstructions: '',
};

// Seed sample past booking for realistic lookup and admin review
const SEED_BOOKINGS: ConfirmedBooking[] = [
  {
    bookingId: 'HM-SOL-9284',
    services: [SERVICES_LIST[0], SERVICES_LIST[1]],
    totalAmount: 900,
    totalDurationMins: 45,
    date: '2026-11-06',
    timeSlot: '11:15 AM - 12:15 PM',
    customerDetails: {
      fullName: 'Pranita Amar Pompawar',
      mobileNumber: '9657156795',
      whatsappNumber: '9657156795',
      fullAddress: 'Near June Vitthal Mandir, Datta Chowk',
      area: 'Navi Peth (Datta Chowk)',
      landmark: 'Near Mahalakshmi Dudh Dairy',
      additionalInstructions: 'Call 15 mins before arrival. Exclusively ladies home.',
    },
    createdAt: '2026-11-04T10:15:00.000Z',
    status: 'Confirmed',
  },
  {
    bookingId: 'HM-SOL-7412',
    services: [SERVICES_LIST[4], SERVICES_LIST[14]],
    totalAmount: 1350,
    totalDurationMins: 65,
    date: '2026-11-07',
    timeSlot: '01:45 PM - 02:45 PM',
    customerDetails: {
      fullName: 'Sunita Deshmukh',
      mobileNumber: '9822012345',
      whatsappNumber: '9822012345',
      fullAddress: 'B-402, Shanti Heights, Hotgi Road',
      area: 'Hotgi Road',
      landmark: 'Opposite Railway Bridge',
      additionalInstructions: 'Need gentle wax for sensitive skin.',
    },
    createdAt: '2026-11-05T08:30:00.000Z',
    status: 'Pending Confirmation',
  }
];

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([SERVICES_LIST[0]]);
  const [bookingDate, setBookingDate] = useState<string>('2026-11-06');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 11:00 AM');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(INITIAL_CUSTOMER_DETAILS);
  const [recentBooking, setRecentBooking] = useState<ConfirmedBooking | null>(null);
  const [allBookings, setAllBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const stored = localStorage.getItem('hello_madam_bookings');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return SEED_BOOKINGS;
  });
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('hello_madam_bookings', JSON.stringify(allBookings));
    } catch {
      // ignore
    }
  }, [allBookings]);

  const addService = (service: ServiceItem) => {
    if (!selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const toggleService = (service: ServiceItem) => {
    if (selectedServices.some(s => s.id === service.id)) {
      removeService(service.id);
    } else {
      addService(service);
    }
  };

  const isSelected = (serviceId: string) => {
    return selectedServices.some(s => s.id === serviceId);
  };

  const clearCart = () => {
    setSelectedServices([]);
  };

  const addPackageToCart = (pkg: BeautyPackage, allServices: ServiceItem[] = SERVICES_LIST) => {
    const { services } = getPackageDetails(pkg, allServices);
    setSelectedServices(prev => {
      const existingIds = new Set(prev.map(s => s.id));
      const toAdd = services.filter(s => !existingIds.has(s.id));
      return [...prev, ...toAdd];
    });
  };

  const totalAmount = selectedServices.reduce((sum, item) => sum + item.price, 0);

  const totalEstimatedMins = selectedServices.reduce((sum, item) => {
    const match = item.duration.match(/\d+/);
    return sum + (match ? parseInt(match[0], 10) : 45);
  }, 0);

  const updateCustomerDetails = (updates: Partial<CustomerDetails>) => {
    setCustomerDetails(prev => ({ ...prev, ...updates }));
  };

  // Submits appointment with initial 'Pending Confirmation' status
  const submitBooking = (): ConfirmedBooking => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: ConfirmedBooking = {
      bookingId: `HM-SOL-${randomSuffix}`,
      services: [...selectedServices],
      totalAmount,
      totalDurationMins: totalEstimatedMins,
      date: bookingDate,
      timeSlot,
      customerDetails: { ...customerDetails },
      createdAt: new Date().toISOString(),
      status: 'Pending Confirmation',
    };

    setRecentBooking(newBooking);
    setAllBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus, notes?: string) => {
    setAllBookings(prev => prev.map(b => b.bookingId === bookingId ? { ...b, status, adminNotes: notes || b.adminNotes } : b));
    if (recentBooking && recentBooking.bookingId === bookingId) {
      setRecentBooking(prev => prev ? { ...prev, status, adminNotes: notes || prev.adminNotes } : null);
    }
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newSlot: string) => {
    setAllBookings(prev => prev.map(b => b.bookingId === bookingId ? { ...b, date: newDate, timeSlot: newSlot, status: 'Confirmed' } : b));
    if (recentBooking && recentBooking.bookingId === bookingId) {
      setRecentBooking(prev => prev ? { ...prev, date: newDate, timeSlot: newSlot, status: 'Confirmed' } : null);
    }
  };

  const findBookingsByPhone = (phone: string) => {
    const sanitized = phone.replace(/\D/g, '');
    if (!sanitized) return [];
    return allBookings.filter(b => 
      b.customerDetails.mobileNumber.replace(/\D/g, '').includes(sanitized) ||
      b.customerDetails.whatsappNumber.replace(/\D/g, '').includes(sanitized)
    );
  };

  return (
    <BookingContext.Provider
      value={{
        selectedServices,
        addService,
        removeService,
        toggleService,
        isSelected,
        clearCart,
        addPackageToCart,
        totalAmount,
        totalEstimatedMins,
        bookingDate,
        setBookingDate,
        timeSlot,
        setTimeSlot,
        customerDetails,
        updateCustomerDetails,
        recentBooking,
        submitBooking,
        allBookings,
        findBookingsByPhone,
        updateBookingStatus,
        rescheduleBooking,
        isMyBookingsOpen,
        setIsMyBookingsOpen,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
