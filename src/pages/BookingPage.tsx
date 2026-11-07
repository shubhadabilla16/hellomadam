import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  ShieldCheck, 
  Printer, 
  MessageCircle,
  Check,
  Phone
} from 'lucide-react';
import { CATEGORIES, ServiceItem } from '../data/servicesData';
import { useBooking, ConfirmedBooking } from '../context/BookingContext';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

export const BookingPage: React.FC = () => {
  const { services } = useAdmin();
  const { t, language } = useLanguage();
  const { 
    selectedServices, 
    removeService, 
    toggleService, 
    isSelected, 
    totalAmount, 
    totalEstimatedMins,
    bookingDate,
    setBookingDate,
    timeSlot,
    setTimeSlot,
    customerDetails,
    updateCustomerDetails,
    submitBooking,
    recentBooking
  } = useBooking();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<string>('all');
  const [confirmedBookingData, setConfirmedBookingData] = useState<ConfirmedBooking | null>(recentBooking);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Solapur local areas list including official client location
  const solapurAreas = [
    'Navi Peth (Datta Chowk)',
    'Datta Chowk Area',
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
    'Other Solapur Area'
  ];

  // Official Business Operating Hours: 10:00 AM – 5:00 PM
  const timeSlots = [
    { id: 'slot-1', label: '10:00 AM - 11:00 AM', period: 'Morning Slot' },
    { id: 'slot-2', label: '11:15 AM - 12:15 PM', period: 'Late Morning' },
    { id: 'slot-3', label: '12:30 PM - 01:30 PM', period: 'Afternoon Slot' },
    { id: 'slot-4', label: '01:45 PM - 02:45 PM', period: 'Afternoon Slot' },
    { id: 'slot-5', label: '03:00 PM - 04:00 PM', period: 'Late Afternoon' },
    { id: 'slot-6', label: '04:00 PM - 05:00 PM', period: 'Evening Slot' },
  ];

  // Helper dates (Generate next 14 days starting from today: 2026-11-03)
  const availableDates = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(2026, 10, 3 + i); // Nov 3, 2026 onward
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNumber = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    return { dateStr, dayName, dayNumber, monthName };
  });

  const validateCustomerForm = () => {
    const errors: Record<string, string> = {};
    if (!customerDetails.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!customerDetails.mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile Number is required';
    } else if (customerDetails.mobileNumber.replace(/\D/g, '').length < 10) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!customerDetails.fullAddress.trim()) {
      errors.fullAddress = 'Address / Flat / Building is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (selectedServices.length === 0) {
        alert('Please select at least one beauty service to proceed.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!bookingDate) {
        alert('Please select a date for your appointment.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!timeSlot) {
        alert('Please select a preferred time slot between 10:00 AM and 5:00 PM.');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!validateCustomerForm()) {
        return;
      }
      setCurrentStep(5);
    }
  };

  const handleConfirmBooking = () => {
    const booked = submitBooking();
    setConfirmedBookingData(booked);
    setCurrentStep(6);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Title Header with Official Logo */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <div className="inline-block bg-white p-2 rounded-2xl border border-[#ebdccd] shadow-2xs">
            <img
              src="/assets/aistudio/image_031d6967.png"
              alt="Hello Madam Logo"
              className="h-10 w-auto object-contain mx-auto"
            />
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>Online Appointment Reservation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Schedule Doorstep Parlour Care
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Exclusively for ladies in Solapur. Operating Hours: 10:00 AM – 5:00 PM. No advance payment required.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        {currentStep <= 5 && (
          <div className="mb-10">
            <div className="flex items-center justify-between max-w-3xl mx-auto relative px-2">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 -z-0" />
              <div 
                className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#e03e1a] transition-all duration-300 -z-0"
                style={{ width: `${((currentStep - 1) / 4) * 85}%` }}
              />

              {[
                { step: 1, label: 'Services' },
                { step: 2, label: 'Date' },
                { step: 3, label: 'Time' },
                { step: 4, label: 'Address' },
                { step: 5, label: 'Review' },
              ].map((item) => (
                <button
                  key={item.step}
                  onClick={() => {
                    if (item.step < currentStep) setCurrentStep(item.step);
                  }}
                  disabled={item.step > currentStep}
                  className="flex flex-col items-center gap-1.5 relative z-10 group cursor-pointer disabled:cursor-not-allowed"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      currentStep === item.step
                        ? 'bg-[#e03e1a] text-white ring-4 ring-[#fef2ee] shadow-sm'
                        : currentStep > item.step
                        ? 'bg-stone-900 text-white'
                        : 'bg-white text-stone-400 border border-stone-300'
                    }`}
                  >
                    {currentStep > item.step ? <Check className="w-4 h-4" /> : item.step}
                  </div>
                  <span
                    className={`text-[11px] font-medium hidden sm:inline ${
                      currentStep === item.step ? 'text-stone-900 font-bold' : 'text-stone-500'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Step Container */}
        <div className="bg-white rounded-3xl border border-[#ebdccd] shadow-sm p-6 sm:p-10">
          
          {/* ================= STEP 1: SELECT SERVICES ================= */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ebdccd]/80">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Step 1: Choose Your Services
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Select one or more services to add to your appointment cart.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-stone-500 block font-serif">Selected Total</span>
                  <span className="text-xl font-bold text-stone-900 tabular-nums">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-400 block tabular-nums">
                    Est. {totalEstimatedMins} mins
                  </span>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryTab(cat.id)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategoryTab === cat.id
                        ? 'bg-[#e03e1a] text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Selectable Services List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services
                  .filter((s) => selectedCategoryTab === 'all' || s.category === selectedCategoryTab)
                  .map((service) => {
                    const active = isSelected(service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                          active
                            ? 'bg-[#fef2ee] border-[#f4c8ba] ring-2 ring-[#f4c8ba]/50 shadow-xs'
                            : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200/60"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="text-[10px] font-bold uppercase text-[#e03e1a] tracking-wider">
                              {service.categoryLabel}
                            </div>
                            <h3 className="text-sm font-bold text-stone-900 leading-snug">
                              {service.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-stone-400" />
                                <span>{service.duration}</span>
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-bold text-stone-900 tabular-nums">
                                {service.priceDisplay || `₹${service.price.toLocaleString('en-IN')}`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                            active
                              ? 'bg-[#e03e1a] text-white shadow-xs'
                              : 'border-2 border-stone-300 text-transparent'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* Selected Services Pill Strip */}
              {selectedServices.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#ebdccd]">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium mb-2">
                    <span>In Your Appointment ({selectedServices.length} items):</span>
                    <span>Click on any item below to remove</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => removeService(s.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#fef2ee] border border-stone-200 hover:border-[#f4c8ba] rounded-full text-xs text-stone-800 transition-colors group cursor-pointer"
                      >
                        <span>{s.name} ({s.priceDisplay || `₹${s.price}`})</span>
                        <Trash2 className="w-3 h-3 text-stone-400 group-hover:text-[#e03e1a]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 2: CHOOSE DATE ================= */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-[#ebdccd]/80">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Step 2: Choose Appointment Date
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Select a date for our female beautician to visit your Solapur home. Open all 7 days a week.
                </p>
              </div>

              {/* Interactive Calendar Date Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {availableDates.map((item) => {
                  const isSelectedDate = bookingDate === item.dateStr;
                  return (
                    <button
                      key={item.dateStr}
                      onClick={() => setBookingDate(item.dateStr)}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isSelectedDate
                          ? 'bg-[#fef2ee] border-[#e03e1a] ring-2 ring-[#f4c8ba] text-stone-900 shadow-sm'
                          : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-[#faf7f2]'
                      }`}
                    >
                      <span className="text-[11px] font-bold uppercase text-stone-500">
                        {item.dayName}
                      </span>
                      <span className="text-2xl font-bold font-serif tabular-nums text-stone-900">
                        {item.dayNumber}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {item.monthName}
                      </span>
                      {isSelectedDate && (
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#e03e1a]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] flex items-center gap-3 text-xs text-stone-600">
                <CalendarIcon className="w-4 h-4 text-[#e03e1a] shrink-0" />
                <span>
                  Selected Date: <strong className="text-stone-900">{bookingDate}</strong> (Free travel across Solapur).
                </span>
              </div>
            </div>
          )}

          {/* ================= STEP 3: CHOOSE TIME ================= */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-[#ebdccd]/80">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Step 3: Select Time Slot (10:00 AM – 5:00 PM)
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Operating hours are 10 AM to 5 PM. Our beautician arrives punctually within the selected slot.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeSlots.map((slot) => {
                  const isSelectedSlot = timeSlot === slot.label;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => setTimeSlot(slot.label)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelectedSlot
                          ? 'bg-[#fef2ee] border-[#e03e1a] ring-2 ring-[#f4c8ba] shadow-sm'
                          : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-[#faf7f2]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isSelectedSlot ? 'bg-[#e03e1a] text-white' : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase text-stone-400 block font-serif">
                            {slot.period}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-stone-900">
                            {slot.label}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelectedSlot
                            ? 'border-[#e03e1a] bg-[#e03e1a] text-white'
                            : 'border-stone-300'
                        }`}
                      >
                        {isSelectedSlot && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 bg-[#fef2ee] border border-[#f4c8ba] rounded-2xl text-xs text-stone-700 flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#e03e1a] shrink-0" />
                <span>
                  Our beautician calls 20–30 minutes before arrival to confirm that you are ready and comfortable.
                </span>
              </div>
            </div>
          )}

          {/* ================= STEP 4: CUSTOMER DETAILS ================= */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-[#ebdccd]/80">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Step 4: Your Home Address & Contact
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  We need this to ensure our verified female beautician arrives at your home in Solapur without confusion.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                    Full Name (Madam) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pranita Pompawar"
                    value={customerDetails.fullName}
                    onChange={(e) => updateCustomerDetails({ fullName: e.target.value })}
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 ${
                      formErrors.fullName ? 'border-red-500 bg-red-50/30' : 'border-[#ebdccd]'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-red-600 mt-1 block">{formErrors.fullName}</span>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                    10-Digit Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9657156795"
                    value={customerDetails.mobileNumber}
                    onChange={(e) => updateCustomerDetails({ mobileNumber: e.target.value })}
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 ${
                      formErrors.mobileNumber ? 'border-red-500 bg-red-50/30' : 'border-[#ebdccd]'
                    }`}
                  />
                  {formErrors.mobileNumber && (
                    <span className="text-[11px] text-red-600 mt-1 block">{formErrors.mobileNumber}</span>
                  )}
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                    WhatsApp Number (Optional, for reminders)
                  </label>
                  <input
                    type="tel"
                    placeholder="Same as mobile or alternate"
                    value={customerDetails.whatsappNumber}
                    onChange={(e) => updateCustomerDetails({ whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20"
                  />
                </div>

                {/* Solapur Locality / Area Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                    Area / Locality in Solapur *
                  </label>
                  <select
                    value={customerDetails.area}
                    onChange={(e) => updateCustomerDetails({ area: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 cursor-pointer"
                  >
                    {solapurAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                  Complete Address (Flat / House No., Apartment / Society Name, Street) *
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Near June Vitthal Mandir, Mahalakshmi Dudh Dairy, Datta Chowk, Navi Peth"
                  value={customerDetails.fullAddress}
                  onChange={(e) => updateCustomerDetails({ fullAddress: e.target.value })}
                  className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 ${
                    formErrors.fullAddress ? 'border-red-500 bg-red-50/30' : 'border-[#ebdccd]'
                  }`}
                />
                {formErrors.fullAddress && (
                  <span className="text-[11px] text-red-600 mt-1 block">{formErrors.fullAddress}</span>
                )}
              </div>

              {/* Landmark & Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                    Nearby Landmark
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Siddheshwar Temple / School / Dairy"
                    value={customerDetails.landmark}
                    onChange={(e) => updateCustomerDetails({ landmark: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 font-serif">
                    Special Instructions / Skin Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sensitive skin, ring bell gently"
                    value={customerDetails.additionalInstructions}
                    onChange={(e) => updateCustomerDetails({ additionalInstructions: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20"
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Strict Privacy:</strong> Your address and contact details are stored securely on your browser and only shared with the assigned lady aesthetician.
                </span>
              </div>
            </div>
          )}

          {/* ================= STEP 5: BOOKING SUMMARY ================= */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="pb-6 border-b border-[#ebdccd]/80">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Step 5: Review Appointment Summary
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Please review your selected services, date, time slot, and Solapur address.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Services Breakdown */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 font-serif">
                    Selected Treatments ({selectedServices.length})
                  </h3>

                  <div className="space-y-3">
                    {selectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-3.5 bg-[#faf7f2] rounded-xl border border-[#ebdccd] flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-stone-900">{service.name}</div>
                          <div className="text-stone-500">{service.duration} · {service.categoryLabel}</div>
                        </div>
                        <div className="font-bold text-stone-900 tabular-nums">
                          ₹{service.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Total Breakdown */}
                  <div className="p-4 bg-white rounded-xl border border-[#ebdccd] space-y-2 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Services Subtotal:</span>
                      <span className="tabular-nums font-medium">₹{totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Home Travel & Visit Charge:</span>
                      <span className="text-emerald-700 font-bold">FREE (Solapur)</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Sterilized Kit & Disposables:</span>
                      <span className="text-emerald-700 font-bold">Included</span>
                    </div>
                    <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                      <span>Total Estimated Payable:</span>
                      <span className="text-lg text-[#e03e1a] tabular-nums font-serif">
                        ₹{totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 italic">
                      * Pay after service completion via UPI (GPay, PhonePe, Paytm) or Cash.
                    </p>
                  </div>
                </div>

                {/* Right: Schedule & Address Card */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-5 bg-[#fef2ee] rounded-2xl border border-[#f4c8ba] space-y-3 text-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#e03e1a] font-serif">
                      Appointment Schedule
                    </h3>
                    
                    <div className="flex items-center gap-2 text-stone-800">
                      <CalendarIcon className="w-4 h-4 text-[#e03e1a] shrink-0" />
                      <span><strong>Date:</strong> {bookingDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-stone-800">
                      <Clock className="w-4 h-4 text-[#e03e1a] shrink-0" />
                      <span><strong>Time:</strong> {timeSlot}</span>
                    </div>

                    <div className="flex items-center gap-2 text-stone-800">
                      <Clock className="w-4 h-4 text-[#e03e1a] shrink-0" />
                      <span><strong>Duration:</strong> ~{totalEstimatedMins} minutes</span>
                    </div>
                  </div>

                  <div className="p-5 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-3 text-xs">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-serif">
                      Home Destination
                    </h3>
                    
                    <div>
                      <span className="text-stone-500 block">Client:</span>
                      <span className="font-bold text-stone-900">{customerDetails.fullName || 'Valued Madam'}</span>
                    </div>

                    <div>
                      <span className="text-stone-500 block">Phone:</span>
                      <span className="font-mono text-stone-800">{customerDetails.mobileNumber}</span>
                    </div>

                    <div>
                      <span className="text-stone-500 block">Address:</span>
                      <span className="text-stone-800">
                        {customerDetails.fullAddress}, {customerDetails.area}, Solapur
                      </span>
                      {customerDetails.landmark && (
                        <span className="text-stone-500 block">Landmark: {customerDetails.landmark}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 6: REQUEST APPOINTMENT CONFIRMATION ================= */}
          {currentStep === 6 && confirmedBookingData && (
            <div className="space-y-8 animate-in zoom-in-95 duration-300">
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold uppercase tracking-wider font-serif">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Status: Pending Confirmation (Awaiting Owner Review)</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                  Thank You, {confirmedBookingData.customerDetails.fullName || 'Madam'}!
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                  Your appointment request has been submitted. Our Solapur coordinator will review technician availability and send an official confirmation to <span className="font-mono font-bold text-stone-900">{confirmedBookingData.customerDetails.mobileNumber}</span> shortly.
                </p>

                <div className="inline-block px-4 py-2 bg-[#fef2ee] rounded-xl border border-[#f4c8ba] text-xs font-mono font-bold text-stone-900">
                  Booking Reference: <span className="text-[#e03e1a]">{confirmedBookingData.bookingId}</span>
                </div>
              </div>

              {/* Confirmation Details Card */}
              <div className="max-w-xl mx-auto p-6 bg-[#faf7f2] rounded-3xl border border-[#ebdccd] text-xs space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#ebdccd]">
                  <div>
                    <span className="text-stone-500 block">Scheduled Date</span>
                    <strong className="text-stone-900 text-sm">{confirmedBookingData.date}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Time Slot</span>
                    <strong className="text-stone-900 text-sm">{confirmedBookingData.timeSlot}</strong>
                  </div>
                </div>

                <div className="pb-4 border-b border-[#ebdccd]">
                  <span className="text-stone-500 block mb-1">Services Booked</span>
                  <div className="space-y-1">
                    {confirmedBookingData.services.map((s) => (
                      <div key={s.id} className="flex justify-between text-stone-800 font-medium">
                        <span>{s.name}</span>
                        <span className="tabular-nums">{s.priceDisplay || `₹${s.price}`}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-bold text-stone-900 pt-2 mt-2 border-t border-[#ebdccd]">
                    <span>Total Estimated Amount:</span>
                    <span className="text-[#e03e1a] font-serif text-sm">
                      ₹{confirmedBookingData.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-stone-500 block">Location</span>
                  <span className="text-stone-800 font-medium">
                    {confirmedBookingData.customerDetails.fullAddress}, {confirmedBookingData.customerDetails.area}, Solapur
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#ebdccd] flex items-center gap-2 text-stone-600 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0" />
                  <span>
                    Our verified female technician will arrive in uniform with sanitized kits and single-use disposables.
                  </span>
                </div>
              </div>

              {/* Confirmation Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-full flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-stone-600" />
                  <span>Print Receipt</span>
                </button>

                <a
                  href={`https://wa.me/919657156795?text=${encodeURIComponent(
                    `Hello Madam Solapur! I just submitted appointment request ${confirmedBookingData.bookingId} for ${confirmedBookingData.date} at ${confirmedBookingData.timeSlot}. Client: ${confirmedBookingData.customerDetails.fullName}, Address: ${confirmedBookingData.customerDetails.fullAddress}, ${confirmedBookingData.customerDetails.area}. Total: ₹${confirmedBookingData.totalAmount}. Please review and approve.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full flex items-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to Owner on WhatsApp</span>
                </a>

                <a
                  href={`mailto:dfinesolapur@gmail.com?subject=${encodeURIComponent(
                    `New Appointment Request ${confirmedBookingData.bookingId} - ${confirmedBookingData.customerDetails.fullName}`
                  )}&body=${encodeURIComponent(
                    `New Appointment Request:\n\nReference: ${confirmedBookingData.bookingId}\nClient: ${confirmedBookingData.customerDetails.fullName}\nPhone: ${confirmedBookingData.customerDetails.mobileNumber}\nDate: ${confirmedBookingData.date}\nTime Slot: ${confirmedBookingData.timeSlot}\nAddress: ${confirmedBookingData.customerDetails.fullAddress}, ${confirmedBookingData.customerDetails.area}\nTotal: ₹${confirmedBookingData.totalAmount}\n\nPlease review and confirm on Hello Madam Admin Portal.`
                  )}`}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-full flex items-center gap-2 transition-colors shadow-sm"
                >
                  <span>Notify via Email</span>
                </a>

                <Link
                  to="/"
                  className="px-6 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold rounded-full transition-colors"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}

          {/* Stepper Footer Navigation */}
          {currentStep <= 5 && (
            <div className="mt-10 pt-6 border-t border-[#ebdccd]/80 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-5 py-2.5 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  onClick={handleNextStep}
                  className="px-7 py-3 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleConfirmBooking}
                  className="px-8 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Request Appointment</span>
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
