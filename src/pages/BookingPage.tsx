import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Phone,
  MessageCircle,
  ShoppingBag,
  ExternalLink,
  Check,
  Star,
  BadgeCheck,
  AlertCircle,
} from 'lucide-react';
import { useBooking, ConfirmedBooking, MockNotificationResult } from '../context/BookingContext';
import { useAdmin } from '../context/AdminContext';
import { partnerMatchesCategories, Partner } from '../data/partners';
import { PublicBeautician } from '../types/management';
import { PartnerAvatar } from '../components/PartnerAvatar';
import { formatPrice, formatDuration } from '../utils/formatters';

function toPartnerAdapter(b: PublicBeautician): Partner {
  return {
    id: b.id,
    name: b.name,
    phone: b.isVerified && b.verifiedPhone ? b.verifiedPhone : '',
    whatsapp: b.isVerified && b.verifiedPhone ? b.verifiedPhone : '',
    specialties: b.specialties || [],
    active: b.active,
    photo: b.photoUrl || `/assets/partners/${b.id}.jpg`,
  };
}

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const partnerQueryParam = searchParams.get('partner');

  const {
    cart,
    cartCount,
    cartTotal,
    cartDurationMins,
    submitBookingAsync,
    allBookings,
  } = useBooking();

  const { publicBeauticians, availabilityRecords } = useAdmin();

  const activeBeauticians = useMemo(
    () => publicBeauticians.filter((b) => b.active),
    [publicBeauticians]
  );

  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [sameAsWhatsApp, setSameAsWhatsApp] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('Navi Peth (Datta Chowk)');
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');

  // Partner preference state (supports ?partner=<id> query param)
  const initialPartnerId = useMemo(() => {
    if (partnerQueryParam) {
      const match = activeBeauticians.find(
        (p) => p.id.toLowerCase() === partnerQueryParam.toLowerCase()
      );
      if (match) return match.id;
    }
    return 'any';
  }, [partnerQueryParam, activeBeauticians]);

  const [selectedPartnerId, setSelectedPartnerId] = useState<string>(initialPartnerId);

  useEffect(() => {
    if (partnerQueryParam) {
      const match = activeBeauticians.find(
        (p) => p.id.toLowerCase() === partnerQueryParam.toLowerCase()
      );
      if (match) {
        setSelectedPartnerId(match.id);
      }
    }
  }, [partnerQueryParam, activeBeauticians]);

  const solapurAreas = [
    'Navi Peth (Datta Chowk)',
    'Datta Chowk / June Vitthal Mandir',
    'Jule Solapur',
    'Hotgi Road',
    'Saat Rasta',
    'Lashkar / Camp',
    'Kumtha Naka',
    'Vijapur Road',
    'Bhavani Peth',
    'Daji Peth',
    'Budhwar Peth',
    'Modi Khana',
    'New Paccha Peth',
    'Ashok Chowk',
    'Other Solapur Area',
  ];

  const today = new Date();
  const availableDates = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    return { dateStr, dayName, dayNumber, monthName, rawDate: d };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].dateStr);

  const timeSlots = [
    { id: '10:00 AM', label: '10:00 AM - 11:00 AM', hour24: 10 },
    { id: '11:15 AM', label: '11:15 AM - 12:15 PM', hour24: 11 },
    { id: '12:30 PM', label: '12:30 PM - 01:30 PM', hour24: 12 },
    { id: '01:45 PM', label: '01:45 PM - 02:45 PM', hour24: 13 },
    { id: '03:00 PM', label: '03:00 PM - 04:00 PM', hour24: 15 },
    { id: '04:00 PM', label: '04:00 PM - 05:00 PM', hour24: 16 },
  ];

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(timeSlots[0].label);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [notifResults, setNotifResults] = useState<MockNotificationResult[]>([]);

  const cartCategories = useMemo(
    () => Array.from(new Set(cart.map((c) => c.service.category || ''))),
    [cart]
  );

  const sortedBeauticians = useMemo(() => {
    return [...activeBeauticians].sort((a, b) => {
      const matchA = partnerMatchesCategories(toPartnerAdapter(a), cartCategories);
      const matchB = partnerMatchesCategories(toPartnerAdapter(b), cartCategories);
      if (matchA && !matchB) return -1;
      if (!matchA && matchB) return 1;
      return 0;
    });
  }, [activeBeauticians, cartCategories]);

  const isSlotBlockedForPreferred = (slotLabel: string, slotId: string, date: string, partnerId: string): boolean => {
    if (!partnerId || partnerId === 'any') return false;

    const avail = availabilityRecords.find(
      (r) => r.beauticianId === partnerId && r.date === date
    );
    if (avail) {
      if (avail.isDayOff) return true;
      if (avail.blockedSlots.includes(slotLabel)) return true;
    }

    return allBookings.some((b) => {
      const assignedOrPrefMatch = b.assignedBeauticianId === partnerId;
      if (!assignedOrPrefMatch) return false;
      if (b.date !== date) return false;
      const isSlotMatch =
        b.timeSlot === slotLabel || b.timeSlot.includes(slotId) || slotLabel.includes(b.timeSlot);
      const isActiveStatus = ['pending', 'confirmed', 'assigned', 'in_progress'].includes(
        b.canonicalStatus
      );
      return isSlotMatch && isActiveStatus;
    });
  };

  useEffect(() => {
    if (selectedPartnerId !== 'any' && selectedTimeSlot) {
      const currentSlotObj = timeSlots.find((s) => s.label === selectedTimeSlot);
      if (
        currentSlotObj &&
        isSlotBlockedForPreferred(currentSlotObj.label, currentSlotObj.id, selectedDate, selectedPartnerId)
      ) {
        setSelectedTimeSlot('');
      }
    }
  }, [selectedPartnerId, selectedDate, allBookings, availabilityRecords]);

  const currentBeautician = useMemo(() => {
    if (selectedPartnerId === 'any') return null;
    return activeBeauticians.find((b) => b.id === selectedPartnerId) || null;
  }, [selectedPartnerId, activeBeauticians]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }
    const cleanMob = mobileNumber.replace(/\D/g, '');
    if (!cleanMob) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (cleanMob.length !== 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!sameAsWhatsApp) {
      const cleanWa = whatsappNumber.replace(/\D/g, '');
      if (cleanWa && cleanWa.length !== 10) {
        errs.whatsappNumber = 'Please enter a valid 10-digit WhatsApp number';
      }
    }

    if (!address.trim()) {
      errs.address = 'Street / House / Building address is required';
    }

    if (!selectedTimeSlot) {
      errs.timeSlot = 'Please select an available time slot';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const actualWhatsApp = sameAsWhatsApp ? mobileNumber : whatsappNumber || mobileNumber;
      const { booking, notificationResults } = await submitBookingAsync({
        fullName,
        mobileNumber,
        whatsappNumber: actualWhatsApp,
        fullAddress: address,
        area,
        landmark,
        preferredDate: selectedDate,
        preferredTime: selectedTimeSlot,
        additionalInstructions: notes,
        partnerId: currentBeautician ? currentBeautician.id : 'any',
        partnerName: currentBeautician
          ? currentBeautician.name
          : 'No preference – assign any available beautician',
      });

      setNotifResults(notificationResults);
      setConfirmedBooking(booking);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Could not submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ================= CONFIRMATION SCREEN =================
  if (confirmedBooking) {
    const isSpecificPreference = confirmedBooking.preferredBeauticianId !== 'any';
    const prefBeautician = activeBeauticians.find(
      (b) => b.id === confirmedBooking.preferredBeauticianId
    );

    const ownerWaText = encodeURIComponent(
      `*HELLO MADAM BOOKING REQUEST*\n` +
        `Booking ID: ${confirmedBooking.bookingId}\n` +
        `Customer: ${confirmedBooking.customerDetails.fullName}\n` +
        `Mobile: ${confirmedBooking.customerDetails.mobileNumber}\n` +
        `Date: ${confirmedBooking.date}\n` +
        `Time Slot: ${confirmedBooking.timeSlot}\n` +
        `Preferred Beautician: ${confirmedBooking.preferredBeauticianName}\n` +
        `Address: ${confirmedBooking.customerDetails.fullAddress}, ${confirmedBooking.customerDetails.area}\n` +
        (confirmedBooking.customerDetails.landmark
          ? `Landmark: ${confirmedBooking.customerDetails.landmark}\n`
          : '') +
        `Services:\n` +
        confirmedBooking.services.map((s) => `- ${s.name} (${formatPrice(s.price)})`).join('\n') +
        `\n*Total Amount:* ${formatPrice(confirmedBooking.totalAmount)}\n` +
        `Please review and assign a beautician!`
    );

    const sentMockCount = notifResults.filter((r) => r.status === 'sent').length;

    return (
      <div className="min-h-screen bg-[#faf7f2] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-10 shadow-lg text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 mx-auto rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-200 mb-3">
            Appointment Requested · Pending Owner Confirmation
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
            Thank You, {confirmedBooking.customerDetails.fullName}!
          </h1>

          <p className="mt-2 text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
            Your appointment request has been saved under reference{' '}
            <strong className="text-[#e03e1a] font-mono">{confirmedBooking.bookingId}</strong>.
            Hello Madam Owner will review, confirm, and finalize beautician assignment shortly.
          </p>

          {/* Preferred Beautician Card */}
          <div className="mt-6 bg-[#faf7f2] rounded-2xl p-5 border border-[#ebdccd] flex items-center gap-4 text-left">
            <PartnerAvatar
              photo={prefBeautician?.photoUrl}
              name={prefBeautician?.name || 'Hello Madam'}
              size="lg"
            />
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#e03e1a] block">
                {isSpecificPreference ? 'Your Beautician Preference' : 'Beautician Assignment'}
              </span>
              <h3 className="text-base font-serif font-bold text-stone-900 mt-0.5">
                {confirmedBooking.preferredBeauticianName}
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {isSpecificPreference
                  ? `Preference recorded for ${prefBeautician?.name || confirmedBooking.preferredBeauticianName}. Final assignment is confirmed by the Owner after checking schedule availability.`
                  : 'Hello Madam Owner will assign the best available specialist and confirm shortly.'}
              </p>
              {prefBeautician?.isVerified && prefBeautician.verifiedPhone && (
                <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-500 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#e03e1a]" />
                  <span>{prefBeautician.verifiedPhone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Frontend Demo Notification Status */}
          {notifResults.length > 0 && (
            <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 text-left">
              <strong className="text-stone-800">Demo Booking Status:</strong>{' '}
              {sentMockCount > 0
                ? 'Request saved to local demo state and logged in Owner Portal → Notification History (no real external message sent).'
                : 'Request logged in Owner Portal for immediate review.'}
            </div>
          )}

          {/* Booking Summary Box */}
          <div className="mt-6 text-left bg-white rounded-2xl p-5 border border-[#ebdccd] space-y-3 text-xs text-stone-700 shadow-2xs">
            <div className="flex justify-between border-b border-[#ebdccd]/80 pb-2.5">
              <span className="text-stone-500">Booking Reference</span>
              <span className="font-mono font-bold text-stone-900">{confirmedBooking.bookingId}</span>
            </div>
            <div className="flex justify-between border-b border-[#ebdccd]/80 pb-2.5">
              <span className="text-stone-500">Scheduled Date & Time</span>
              <span className="font-bold text-stone-900">
                {confirmedBooking.date} · {confirmedBooking.timeSlot}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#ebdccd]/80 pb-2.5">
              <span className="text-stone-500">Preferred Beautician</span>
              <span className="font-bold text-stone-900">
                {confirmedBooking.preferredBeauticianName}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#ebdccd]/80 pb-2.5">
              <span className="text-stone-500">Assignment Status</span>
              <span className="font-semibold text-amber-700">Awaiting Owner Assignment</span>
            </div>
            <div className="flex justify-between border-b border-[#ebdccd]/80 pb-2.5">
              <span className="text-stone-500">Service Location</span>
              <span className="font-medium text-stone-900 max-w-xs text-right">
                {confirmedBooking.customerDetails.fullAddress}, {confirmedBooking.customerDetails.area}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#ebdccd]/80 pb-2.5">
              <span className="text-stone-500">Services ({confirmedBooking.services.length})</span>
              <span className="font-medium text-stone-900 text-right">
                {confirmedBooking.services.map((s) => s.name).join(', ')}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span>Total Estimated Amount</span>
              <span className="text-[#e03e1a] tabular-nums">
                {formatPrice(confirmedBooking.totalAmount)}
              </span>
            </div>
          </div>

          {/* WhatsApp Action Buttons */}
          <div className="mt-8 space-y-3">
            <a
              href={`https://wa.me/919657156795?text=${ownerWaText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
              <span>Send on WhatsApp (Hello Madam: +91 9657156795)</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
            </a>

            <p className="text-[11px] text-stone-400">
              Clicking opens WhatsApp with your pre-filled booking request for Hello Madam Solapur.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#ebdccd] flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
            <Link
              to="/bookings"
              className="px-5 py-2.5 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors"
            >
              View My Bookings
            </Link>
            <Link
              to="/services"
              className="px-5 py-2.5 bg-white text-stone-700 border border-[#ebdccd] rounded-xl hover:bg-stone-50 transition-colors"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, show prompt to add services
  if (cart.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-[#faf7f2]">
        <div className="w-16 h-16 rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
          Your Booking Cart is Empty
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mb-6 leading-relaxed">
          Please select at least one parlour service from our catalogue before filling in your Solapur appointment details.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#e03e1a] text-white text-xs font-bold rounded-2xl shadow-md hover:bg-[#c93514] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Services</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <section className="bg-white border-b border-[#ebdccd] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e03e1a] mb-2 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>Exclusively for Ladies · Doorstep Care</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Schedule Your Appointment
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            Enter your Solapur residence address, choose your preferred beautician, and pick your preferred slot.
          </p>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Cols: Booking Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-10 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Customer Contact Info */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdccd]">
                  <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                    <User className="w-5 h-5 text-[#e03e1a]" />
                    <span>1. Contact Information</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pranita Pompawar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full px-4 py-3 bg-[#faf7f2] border rounded-xl text-sm text-stone-900 focus:outline-none focus:bg-white transition-all ${
                        errors.fullName
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-[#ebdccd] focus:ring-1 focus:ring-[#e03e1a]'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Mobile Number (10 digits) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9657156795"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        className={`w-full pl-12 pr-4 py-3 bg-[#faf7f2] border rounded-xl text-sm text-stone-900 focus:outline-none focus:bg-white transition-all tabular-nums ${
                          errors.mobileNumber
                            ? 'border-red-500 ring-1 ring-red-500'
                            : 'border-[#ebdccd] focus:ring-1 focus:ring-[#e03e1a]'
                        }`}
                      />
                    </div>
                    {errors.mobileNumber && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.mobileNumber}</p>
                    )}
                  </div>
                </div>

                {/* WhatsApp Checkbox */}
                <div className="mt-4 pt-3 border-t border-[#ebdccd]/60 space-y-3">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-stone-700">
                    <input
                      type="checkbox"
                      checked={sameAsWhatsApp}
                      onChange={(e) => setSameAsWhatsApp(e.target.checked)}
                      className="w-4 h-4 rounded text-[#e03e1a] focus:ring-[#e03e1a] border-stone-300"
                    />
                    <span>Same number for WhatsApp updates & instant confirmation</span>
                  </label>

                  {!sameAsWhatsApp && (
                    <div className="sm:w-1/2 animate-in fade-in duration-200">
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                        Alternative WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="Alternative 10-digit number"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#e03e1a]"
                      />
                      {errors.whatsappNumber && (
                        <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.whatsappNumber}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Section 2: Address in Solapur */}
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-[#ebdccd] text-stone-900 font-serif font-bold text-lg">
                  <MapPin className="w-5 h-5 text-[#e03e1a]" />
                  <span>2. Service Address in Solapur</span>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                      Flat / House / Building / Street Address *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Flat 302, Sai Residency, Near Mahalakshmi Dudh Dairy, Datta Chowk"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full px-4 py-3 bg-[#faf7f2] border rounded-xl text-sm text-stone-900 focus:outline-none focus:bg-white transition-all ${
                        errors.address
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-[#ebdccd] focus:ring-1 focus:ring-[#e03e1a]'
                      }`}
                    />
                    {errors.address && (
                      <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Area in Solapur
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full px-4 py-3 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#e03e1a] cursor-pointer"
                      >
                        {solapurAreas.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near June Vitthal Mandir"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full px-4 py-3 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-sm text-stone-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#e03e1a]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Choose Your Beautician */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#ebdccd]">
                  <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                    <Sparkles className="w-5 h-5 text-[#e03e1a]" />
                    <span>3. Choose Your Beautician</span>
                  </div>
                  <span className="text-xs text-stone-400 font-medium">Preference</span>
                </div>

                <p className="mt-2 text-xs text-stone-600">
                  Select a preferred beautician or let Hello Madam Owner assign an available specialist after reviewing your request.
                </p>

                {/* Option B: No preference – assign any available beautician */}
                <div className="mt-4">
                  <div
                    onClick={() => setSelectedPartnerId('any')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      selectedPartnerId === 'any'
                        ? 'border-[#e03e1a] bg-[#fef2ee]/60 shadow-xs'
                        : 'border-[#ebdccd] bg-[#faf7f2] hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-white text-[#e03e1a] border border-[#f4c8ba] flex items-center justify-center font-bold text-base shadow-xs">
                        <Sparkles className="w-6 h-6 text-[#e03e1a]" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                            No preference – assign any available beautician
                          </h4>
                          <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                            Fastest Confirmation
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Hello Madam Owner will assign an available beautician matching your requested services.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {selectedPartnerId === 'any' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#e03e1a] text-white text-xs font-bold rounded-full shadow-xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-stone-500">Select</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Option A: Preferred Beautician Cards Grid */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {sortedBeauticians.map((beautician) => {
                    const isSelected = selectedPartnerId === beautician.id;
                    const isSpecialtyMatch = partnerMatchesCategories(
                      toPartnerAdapter(beautician),
                      cartCategories
                    );
                    const isOnLeave = beautician.availabilityStatus === 'on_leave';

                    return (
                      <div
                        key={beautician.id}
                        onClick={() => !isOnLeave && setSelectedPartnerId(beautician.id)}
                        className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between relative group ${
                          isOnLeave
                            ? 'border-stone-200 bg-stone-50 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'border-[#e03e1a] bg-[#fef2ee]/50 shadow-md ring-2 ring-[#e03e1a]/20 cursor-pointer'
                            : 'border-[#ebdccd] bg-white hover:border-stone-400 hover:shadow-xs cursor-pointer'
                        }`}
                      >
                        {/* Top status badges */}
                        <div className="mb-2 flex flex-col gap-1">
                          {isSpecialtyMatch && !isOnLeave && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-1.5 py-0.5 rounded-md leading-tight">
                              <Star className="w-2.5 h-2.5 fill-emerald-700 shrink-0" />
                              <span>Matches cart</span>
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center justify-center text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                              beautician.availabilityStatus === 'available'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : beautician.availabilityStatus === 'busy'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-stone-200 text-stone-600'
                            }`}
                          >
                            {beautician.availabilityStatus === 'available'
                              ? 'Available'
                              : beautician.availabilityStatus === 'busy'
                              ? 'Busy Slots'
                              : 'On Leave'}
                          </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-2.5">
                            <PartnerAvatar
                              photo={beautician.photoUrl || `/assets/partners/${beautician.id}.jpg`}
                              name={beautician.name}
                              size="lg"
                              className={`transition-transform duration-200 ${
                                isSelected ? 'scale-105 ring-2 ring-[#e03e1a]' : 'group-hover:scale-105'
                              }`}
                            />
                            {isSelected && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#e03e1a] text-white flex items-center justify-center shadow-md">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-center gap-1">
                            <h4 className="font-serif font-bold text-stone-900 text-sm">
                              {beautician.name}
                            </h4>
                            {beautician.isVerified && (
                              <BadgeCheck
                                className="w-3.5 h-3.5 text-emerald-600 shrink-0"
                                aria-label="Verified Beautician"
                              />
                            )}
                          </div>

                          {beautician.isVerified && beautician.verifiedPhone ? (
                            <span className="text-[11px] font-mono text-stone-500 mt-0.5">
                              {beautician.verifiedPhone}
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-400 mt-0.5">
                              {beautician.workingHoursStart || '10 AM'} – {beautician.workingHoursEnd || '5 PM'}
                            </span>
                          )}

                          <div className="mt-2 flex flex-wrap justify-center gap-1">
                            {beautician.specialties.map((spec) => (
                              <span
                                key={spec}
                                className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[#faf7f2] text-stone-600 border border-[#ebdccd]/80 truncate max-w-full"
                                title={spec}
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#ebdccd]/70 text-center">
                          {isOnLeave ? (
                            <span className="inline-block w-full py-1.5 rounded-lg bg-stone-100 text-[10px] font-semibold text-stone-400">
                              Unavailable
                            </span>
                          ) : isSelected ? (
                            <span className="inline-flex items-center justify-center gap-1 w-full py-1.5 rounded-lg bg-[#e03e1a] text-[10px] font-bold text-white uppercase tracking-wider">
                              <Check className="w-3 h-3" />
                              <span>Selected</span>
                            </span>
                          ) : (
                            <span className="inline-block w-full py-1.5 rounded-lg bg-[#faf7f2] border border-[#ebdccd] text-[10px] font-bold text-stone-700 group-hover:border-[#e03e1a] group-hover:text-[#e03e1a] transition-colors">
                              Select Beautician
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 4: Date & Time Picker with Slot Clash Prevention */}
              <div>
                <div className="flex items-center gap-2 pb-3 border-b border-[#ebdccd] text-stone-900 font-serif font-bold text-lg">
                  <CalendarIcon className="w-5 h-5 text-[#e03e1a]" />
                  <span>4. Preferred Date & Time Slot</span>
                </div>

                {/* Date Slider */}
                <div className="mt-5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Select Date (Next 30 Days)
                  </label>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                    {availableDates.map((item) => {
                      const isSelected = selectedDate === item.dateStr;
                      return (
                        <button
                          key={item.dateStr}
                          type="button"
                          onClick={() => setSelectedDate(item.dateStr)}
                          className={`shrink-0 w-16 py-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer border ${
                            isSelected
                              ? 'bg-[#e03e1a] text-white border-[#e03e1a] shadow-md'
                              : 'bg-[#faf7f2] text-stone-700 border-[#ebdccd] hover:border-stone-400'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                            {item.dayName}
                          </span>
                          <span className="text-lg font-bold font-serif leading-tight">
                            {item.dayNumber}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider opacity-80">
                            {item.monthName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Grid */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Select 1-Hour Time Slot (10 AM - 5 PM)
                    </label>
                    {currentBeautician && (
                      <span className="text-[11px] text-stone-500">
                        Checking schedule for <strong className="text-stone-800">{currentBeautician.name}</strong>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot.label;
                      const isBooked = isSlotBlockedForPreferred(
                        slot.label,
                        slot.id,
                        selectedDate,
                        selectedPartnerId
                      );

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={isBooked}
                          onClick={() => setSelectedTimeSlot(slot.label)}
                          className={`px-4 py-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                            isBooked
                              ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed opacity-60'
                              : isSelected
                              ? 'bg-stone-900 text-white border-stone-900 shadow-sm cursor-pointer'
                              : 'bg-[#faf7f2] text-stone-700 border-[#ebdccd] hover:border-stone-400 cursor-pointer'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Clock
                              className={`w-3.5 h-3.5 ${
                                isBooked
                                  ? 'text-stone-300'
                                  : isSelected
                                  ? 'text-amber-300'
                                  : 'text-stone-400'
                              }`}
                            />
                            <span className={isBooked ? 'line-through' : ''}>{slot.label}</span>
                          </span>

                          {isBooked ? (
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
                              Unavailable
                            </span>
                          ) : isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-amber-300" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                  {errors.timeSlot && (
                    <p className="mt-1.5 text-[11px] text-red-600 font-medium">{errors.timeSlot}</p>
                  )}
                </div>
              </div>

              {/* Section 5: Special Instructions */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Skin Sensitivities / Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Sensitive skin for wax, ring doorbell twice, ladies-only apartment"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-xs text-stone-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#e03e1a]"
                />
              </div>

              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#ebdccd] space-y-3">

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 bg-[#e03e1a] hover:bg-[#c93514] disabled:opacity-60 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>
                    {submitting
                      ? 'Submitting Request...'
                      : `Confirm Appointment & Order (${formatPrice(cartTotal)})`}
                  </span>
                </button>
                <p className="text-center text-[11px] text-stone-400">
                  No advance payment required. Pay Cash or UPI upon service completion.
                </p>
              </div>
            </form>
          </div>

          {/* Right 4 Cols: Cart & Preferred Beautician Summary */}
          <div className="lg:col-span-4 sticky top-24 space-y-5">
            {/* Chosen Beautician Preference Card */}
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Preferred Beautician
              </span>
              <div className="flex items-center gap-3">
                <PartnerAvatar
                  photo={currentBeautician?.photoUrl}
                  name={currentBeautician?.name || 'Hello Madam'}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif font-bold text-stone-900 text-sm truncate">
                    {currentBeautician
                      ? currentBeautician.name
                      : 'No preference (Any available)'}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 truncate">
                    {currentBeautician
                      ? currentBeautician.specialties.slice(0, 2).join(', ')
                      : 'Owner assigns best available specialist'}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Services Box */}
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-serif font-bold text-stone-900">
                  Selected Services ({cartCount})
                </h2>
                <Link to="/cart" className="text-xs font-bold text-[#e03e1a] hover:underline">
                  Edit Cart
                </Link>
              </div>

              <div className="divide-y divide-[#ebdccd]/70 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.service.id} className="py-2.5 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-stone-900 leading-snug">{item.service.name}</p>
                      <p className="text-stone-400 text-[11px] mt-0.5">
                        {item.quantity > 1 ? `${item.quantity} persons × ` : ''}
                        {formatPrice(item.service.price)}
                      </p>
                    </div>
                    <span className="font-bold text-stone-900 tabular-nums shrink-0">
                      {formatPrice(item.service.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[#ebdccd] space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Estimated Duration</span>
                  </span>
                  <span className="font-semibold text-stone-900">{formatDuration(cartDurationMins)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Travel & Kit Disposables</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#ebdccd] text-base font-serif font-bold text-stone-900">
                  <span>Total Amount</span>
                  <span className="text-[#e03e1a] tabular-nums">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="mt-5 p-3 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-1.5 text-[11px] text-stone-500">
                <div className="flex items-center gap-2 text-stone-700 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#e03e1a]" />
                  <span>Doorstep Safety Promise</span>
                </div>
                <p>100% ladies-only staff, sealed mono-dose kits & complete privacy at your home.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
