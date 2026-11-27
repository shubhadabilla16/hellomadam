import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
  XCircle,
  PlayCircle,
  AlertTriangle,
  History,
  Phone,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAdmin } from '../context/AdminContext';
import { formatPrice } from '../utils/formatters';
import { PartnerAvatar } from '../components/PartnerAvatar';

export const BookingsListPage: React.FC = () => {
  const {
    allBookings,
    findBookingsByPhone,
    statusHistory,
    cancelOrRejectBooking,
    bookingsLoading,
  } = useBooking();
  const { publicBeauticians } = useAdmin();

  const [searchPhone, setSearchPhone] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const displayedBookings = React.useMemo(() => {
    let list = allBookings;
    if (searchPhone.trim()) {
      const q = searchPhone.trim().toLowerCase();
      list = findBookingsByPhone(searchPhone);
      if (list.length === 0) {
        list = allBookings.filter((b) => b.bookingId.toLowerCase().includes(q));
      }
    }
    if (statusFilter !== 'ALL') {
      list = list.filter((b) => {
        if (statusFilter === 'PENDING') return b.canonicalStatus === 'pending';
        if (statusFilter === 'CONFIRMED')
          return b.canonicalStatus === 'confirmed' || b.canonicalStatus === 'assigned';
        if (statusFilter === 'IN_PROGRESS') return b.canonicalStatus === 'in_progress';
        if (statusFilter === 'COMPLETED') return b.canonicalStatus === 'completed';
        if (statusFilter === 'CANCELLED') return b.canonicalStatus === 'cancelled';
        return true;
      });
    }
    return list;
  }, [allBookings, searchPhone, statusFilter, findBookingsByPhone]);

  const getStatusBadge = (canonical: string) => {
    if (canonical === 'confirmed' || canonical === 'assigned') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{canonical === 'assigned' ? 'Confirmed & Assigned' : 'Confirmed'}</span>
        </span>
      );
    }
    if (canonical === 'in_progress') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <PlayCircle className="w-3.5 h-3.5" />
          <span>In Progress</span>
        </span>
      );
    }
    if (canonical === 'pending') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock3 className="w-3.5 h-3.5" />
          <span>Pending Owner Review</span>
        </span>
      );
    }
    if (canonical === 'completed') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed</span>
        </span>
      );
    }
    if (canonical === 'reschedule_requested' || canonical === 'customer_unavailable') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>
            {canonical === 'reschedule_requested' ? 'Reschedule Requested' : 'Customer Unavailable'}
          </span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
        <XCircle className="w-3.5 h-3.5" />
        <span>Cancelled</span>
      </span>
    );
  };

  const handleCustomerCancel = async (apptId: string) => {
    setCancellingId(apptId);
    try {
      await cancelOrRejectBooking({ appointmentId: apptId, reason: 'Cancelled by customer' });
    } finally {
      setCancellingId(null);
      setConfirmCancelId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <section className="bg-white border-b border-[#ebdccd] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e03e1a] mb-2 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>Appointment History</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                My Bookings
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-500">
                Track your requested, confirmed, and assigned at-home parlour appointments in Solapur.
              </p>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#c93514] rounded-xl transition-colors shadow-xs"
            >
              <span>Book New Service</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search booking ID, name, or mobile..."
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#e03e1a]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {[
                { key: 'ALL', label: 'All' },
                { key: 'PENDING', label: 'Pending' },
                { key: 'CONFIRMED', label: 'Confirmed / Assigned' },
                { key: 'IN_PROGRESS', label: 'In Progress' },
                { key: 'COMPLETED', label: 'Completed' },
                { key: 'CANCELLED', label: 'Cancelled' },
              ].map((st) => (
                <button
                  key={st.key}
                  onClick={() => setStatusFilter(st.key)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    statusFilter === st.key
                      ? 'bg-stone-900 text-white'
                      : 'bg-[#faf7f2] text-stone-600 hover:text-stone-900 border border-[#ebdccd]'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {bookingsLoading ? (
          <div className="text-center py-20 text-xs text-stone-500">Loading your appointments...</div>
        ) : displayedBookings.length > 0 ? (
          <div className="space-y-6">
            {displayedBookings.map((b) => {
              const bookingRef = b.bookingId || b.id;
              const waHelpUrl = `https://wa.me/919657156795?text=${encodeURIComponent(
                `Hi Hello Madam, I have a query about my appointment (Booking ID: ${bookingRef})`
              )}`;
              const isAssigned = Boolean(b.assignedBeauticianId);
              const assignedPub = publicBeauticians.find((p) => p.id === b.assignedBeauticianId);
              const canCancel = ['pending', 'confirmed', 'assigned'].includes(b.canonicalStatus);
              const myHistory = statusHistory.filter((h) => h.appointmentId === b.id);

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#ebdccd]">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono font-bold text-stone-900 text-base">
                          {bookingRef}
                        </span>
                        {getStatusBadge(b.canonicalStatus)}
                      </div>
                      <p className="text-xs text-stone-400 mt-1">
                        Booked for <strong className="text-stone-700">{b.customerDetails.fullName}</strong> (
                        {b.customerDetails.mobileNumber})
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {myHistory.length > 0 && (
                        <button
                          onClick={() =>
                            setExpandedHistoryId(expandedHistoryId === b.id ? null : b.id)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-[#faf7f2] hover:bg-stone-100 border border-[#ebdccd] rounded-xl transition-colors cursor-pointer"
                        >
                          <History className="w-3.5 h-3.5 text-[#e03e1a]" />
                          <span>Status Timeline</span>
                        </button>
                      )}

                      <a
                        href={waHelpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 stroke-none" />
                        <span>Need Help? WhatsApp</span>
                      </a>

                      {canCancel && (
                        <>
                          {confirmCancelId === b.id ? (
                            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-xl px-2.5 py-1">
                              <span className="text-[11px] font-bold text-red-800">Cancel?</span>
                              <button
                                disabled={cancellingId === b.id}
                                onClick={() => void handleCustomerCancel(b.id)}
                                className="px-2 py-1 text-[11px] font-bold bg-red-600 text-white rounded-lg cursor-pointer"
                              >
                                {cancellingId === b.id ? '...' : 'Yes'}
                              </button>
                              <button
                                onClick={() => setConfirmCancelId(null)}
                                className="px-2 py-1 text-[11px] font-semibold text-stone-600 cursor-pointer"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmCancelId(b.id)}
                              className="px-3 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs text-stone-600">
                    {/* Schedule */}
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                        Scheduled Slot
                      </span>
                      <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                        <Calendar className="w-4 h-4 text-[#e03e1a]" />
                        <span>{b.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500 mt-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{b.timeSlot}</span>
                      </div>
                    </div>

                    {/* Assigned vs Preferred Beautician */}
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                        {isAssigned ? 'Assigned Beautician' : 'Beautician Preference'}
                      </span>
                      {isAssigned ? (
                        <div className="flex items-center gap-2.5">
                          <PartnerAvatar
                            photo={assignedPub?.photoUrl || `/assets/partners/${b.assignedBeauticianId}.jpg`}
                            name={b.assignedBeauticianName || 'Beautician'}
                            size="sm"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block font-serif">
                              {b.assignedBeauticianName}
                            </span>
                            {b.assignedBeauticianPhone && (
                              <a
                                href={`tel:${b.assignedBeauticianPhone.replace(/\s+/g, '')}`}
                                className="text-[11px] font-mono text-[#e03e1a] inline-flex items-center gap-1 hover:underline"
                              >
                                <Phone className="w-3 h-3" />
                                <span>{b.assignedBeauticianPhone}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba] flex items-center justify-center font-bold text-xs shrink-0">
                            HM
                          </div>
                          <div>
                            <span className="font-bold text-stone-900 block font-serif">
                              {b.preferredBeauticianId !== 'any'
                                ? `Preferred: ${b.preferredBeauticianName}`
                                : 'Any Available Beautician'}
                            </span>
                            <span className="text-[11px] text-amber-700">
                              Awaiting Owner assignment
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                        Solapur Address
                      </span>
                      <div className="flex items-start gap-1.5 font-medium text-stone-900">
                        <MapPin className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                        <span>
                          {b.customerDetails.fullAddress}
                          {b.customerDetails.area ? `, ${b.customerDetails.area}` : ''}
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="md:text-right">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block mb-1">
                        Total Amount
                      </span>
                      <div className="text-xl font-serif font-bold text-stone-900 tabular-nums">
                        {formatPrice(b.totalAmount)}
                      </div>
                      <span className="text-[10px] text-stone-400">Pay on completion</span>
                    </div>
                  </div>

                  {/* Services List */}
                  <div className="pt-4 border-t border-[#ebdccd]/70">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                      Services ({b.services.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {b.services.map((svc, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#faf7f2] border border-[#ebdccd] rounded-lg text-xs font-medium text-stone-700"
                        >
                          {svc.name} &middot; <strong className="text-stone-900">{formatPrice(svc.price)}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  {b.rejectionReason && b.canonicalStatus === 'cancelled' && (
                    <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
                      <strong>Cancellation Note:</strong> {b.rejectionReason}
                    </div>
                  )}

                  {/* Status Timeline Drawer */}
                  {expandedHistoryId === b.id && myHistory.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[#ebdccd] space-y-2">
                      <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Status Updates
                      </h4>
                      <div className="space-y-2">
                        {myHistory.map((h) => (
                          <div
                            key={h.id}
                            className="text-xs flex items-start justify-between gap-4 bg-[#faf7f2] p-2.5 rounded-xl border border-[#ebdccd]/80"
                          >
                            <div>
                              <span className="font-bold text-stone-900 uppercase">{h.toStatus}</span>
                              {h.note && <p className="text-stone-600 mt-0.5">{h.note}</p>}
                            </div>
                            <span className="text-[10px] text-stone-400 shrink-0">
                              {h.changedByRole}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#ebdccd] max-w-md mx-auto my-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">No Bookings Found</h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
              You haven&apos;t booked an appointment under this account yet, or no bookings matched your filter.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#e03e1a] text-white text-xs font-bold rounded-2xl shadow-md hover:bg-[#c93514] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Services</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
