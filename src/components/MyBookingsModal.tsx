import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Search,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Sparkles,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const MyBookingsModal: React.FC = () => {
  const {
    isMyBookingsOpen,
    setIsMyBookingsOpen,
    findBookingsByPhone,
    allBookings,
  } = useBooking();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  if (!isMyBookingsOpen) return null;

  const searchResults =
    searchPerformed && phoneNumber.trim().length >= 3
      ? findBookingsByPhone(phoneNumber)
      : allBookings.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl border border-[#ebdccd] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with Official Monogram */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ebdccd] bg-white">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/image_a7f9010e.png"
              alt="Hello Madam Logo"
              className="w-9 h-9 rounded-xl object-contain shadow-2xs border border-[#ebdccd]"
            />
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Track My Appointment
              </h3>
              <p className="text-[11px] text-stone-500">Hello Madam Solapur</p>
            </div>
          </div>
          <button
            onClick={() => setIsMyBookingsOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Bookings List */}
        <div className="p-6 pb-3 bg-[#faf7f2] border-b border-[#ebdccd]">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="tel"
                placeholder="Filter by mobile number, name, or booking ID..."
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 focus:border-[#e03e1a]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {searchResults.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm font-serif font-bold text-stone-700">
                No appointments found
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Book a doorstep appointment to see your schedule here.
              </p>
            </div>
          ) : (
            searchResults.map((booking) => (
              <div
                key={booking.bookingId}
                className="p-4 bg-white rounded-2xl border border-[#ebdccd] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#e03e1a] bg-[#fef2ee] px-2 py-0.5 rounded border border-[#f4c8ba]">
                      {booking.bookingId}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {booking.status}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-stone-900 tabular-nums font-serif">
                    ₹{booking.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-sm font-bold text-stone-800">
                  {booking.customerDetails.fullName}
                </div>

                <div className="space-y-1 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#e03e1a]" />
                    <span>{booking.date}</span>
                    <span aria-hidden="true">·</span>
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{booking.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#e03e1a]" />
                    <span>{booking.customerDetails.area}, Solapur</span>
                  </div>
                  <div className="flex items-center gap-2 pt-0.5 text-stone-700">
                    <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
                    <span>
                      <strong>Assigned Beautician:</strong>{' '}
                      {booking.assignedBeauticianName ||
                        'Awaiting owner assignment'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <div className="text-[11px] text-stone-500 font-bold mb-1 font-serif">
                    Services:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {booking.services.map((s) => (
                      <span
                        key={s.id}
                        className="text-xs text-stone-700 bg-[#faf7f2] border border-[#ebdccd] px-2 py-0.5 rounded-md"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ebdccd] bg-white flex items-center justify-between">
          <Link
            to="/bookings"
            onClick={() => setIsMyBookingsOpen(false)}
            className="text-xs font-bold text-[#e03e1a] hover:underline inline-flex items-center gap-1"
          >
            <span>Open Full Bookings Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setIsMyBookingsOpen(false)}
            className="px-5 py-2 text-xs font-bold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
