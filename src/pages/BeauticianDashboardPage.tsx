import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  PlayCircle,
  AlertTriangle,
  XCircle,
  ExternalLink,
  User,
  Sparkles,
  History,
  CalendarOff,
  Save,
  Eye,
  ArrowLeft,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { useBooking, ConfirmedBooking } from '../context/BookingContext';
import { PartnerAvatar } from '../components/PartnerAvatar';
import { formatPrice } from '../utils/formatters';
import {
  ALL_WEEK_DAYS,
  AvailabilityStatus,
  STANDARD_TIME_SLOTS,
} from '../types/management';

export const BeauticianDashboardPage: React.FC = () => {
  const { activeBeauticianId, setActiveBeauticianId } = useAuth();
  const {
    teamMembers,
    availabilityRecords,
    updateBeauticianSelfAvailability,
    setBeauticianDateAvailability,
  } = useAdmin();
  const { allBookings, statusHistory, beauticianActionOnBooking } = useBooking();

  const [activeTab, setActiveTab] = useState<'appointments' | 'history' | 'availability'>('appointments');
  const [historyFilter, setHistoryFilter] = useState<
    'all' | 'upcoming' | 'in_progress' | 'completed' | 'cancelled'
  >('all');

  // Detail modal state
  const [detailBooking, setDetailBooking] = useState<ConfirmedBooking | null>(null);

  // Action modal state (complete / report issue)
  const [noteModal, setNoteModal] = useState<{
    appointmentId: string;
    bookingRef: string;
    mode: 'complete' | 'issue';
    issueType: 'unavailable' | 'reschedule_request';
    title: string;
  } | null>(null);
  const [actionNote, setActionNote] = useState('');
  const [actionBusy, setActionBusy] = useState(false);

  // Date availability editor state
  const [availDate, setAvailDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [savingProfile, setSavingProfile] = useState(false);

  // Active Demo Beautician
  const selectedMember = useMemo(() => {
    return (
      teamMembers.find((m) => m.id === activeBeauticianId) ||
      teamMembers[0] ||
      null
    );
  }, [teamMembers, activeBeauticianId]);

  // Filter appointments strictly to ONLY those assigned to selectedMember
  const myBookings = useMemo(() => {
    if (!selectedMember) return [];
    return allBookings.filter((b) => b.assignedBeauticianId === selectedMember.id);
  }, [allBookings, selectedMember]);

  const todayStr = new Date().toISOString().split('T')[0];

  const stats = useMemo(() => {
    const todayCount = myBookings.filter(
      (b) =>
        b.date === todayStr &&
        ['assigned', 'confirmed', 'in_progress'].includes(b.canonicalStatus)
    ).length;
    const upcomingCount = myBookings.filter((b) =>
      ['assigned', 'confirmed', 'in_progress'].includes(b.canonicalStatus)
    ).length;
    const completedCount = myBookings.filter(
      (b) => b.canonicalStatus === 'completed'
    ).length;
    const cancelledCount = myBookings.filter(
      (b) => b.canonicalStatus === 'cancelled'
    ).length;
    return { todayCount, upcomingCount, completedCount, cancelledCount };
  }, [myBookings, todayStr]);

  const activeAppointments = useMemo(() => {
    return myBookings.filter(
      (b) => !['completed', 'cancelled'].includes(b.canonicalStatus)
    );
  }, [myBookings]);

  const filteredHistory = useMemo(() => {
    if (historyFilter === 'all') return myBookings;
    if (historyFilter === 'upcoming') {
      return myBookings.filter((b) =>
        ['assigned', 'confirmed'].includes(b.canonicalStatus)
      );
    }
    return myBookings.filter((b) => b.canonicalStatus === historyFilter);
  }, [myBookings, historyFilter]);

  const currentDateAvail = useMemo(() => {
    if (!selectedMember) return null;
    return (
      availabilityRecords.find(
        (r) => r.beauticianId === selectedMember.id && r.date === availDate
      ) || null
    );
  }, [availabilityRecords, selectedMember, availDate]);

  const handleStatusAction = async (
    appointmentId: string,
    action: 'start' | 'complete' | 'unavailable' | 'reschedule_request',
    note?: string
  ) => {
    if (!selectedMember) return;
    setActionBusy(true);
    try {
      await beauticianActionOnBooking({
        appointmentId,
        beauticianId: selectedMember.id,
        beauticianName: selectedMember.name,
        action,
        note,
      });
      setNoteModal(null);
      setActionNote('');
    } finally {
      setActionBusy(false);
    }
  };

  const handleAvailabilityStatusChange = async (nextStatus: AvailabilityStatus) => {
    if (!selectedMember) return;
    setSavingProfile(true);
    try {
      await updateBeauticianSelfAvailability(selectedMember.id, nextStatus);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleToggleWorkingDay = async (day: string) => {
    if (!selectedMember) return;
    const exists = selectedMember.workingDays.includes(day);
    const updated = exists
      ? selectedMember.workingDays.filter((d) => d !== day)
      : [...selectedMember.workingDays, day];
    setSavingProfile(true);
    try {
      await updateBeauticianSelfAvailability(
        selectedMember.id,
        selectedMember.availabilityStatus,
        updated
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const handleToggleDateDayOff = async () => {
    if (!selectedMember) return;
    const isCurrentlyOff = currentDateAvail?.isDayOff || false;
    await setBeauticianDateAvailability(
      selectedMember.id,
      availDate,
      currentDateAvail?.blockedSlots || [],
      !isCurrentlyOff,
      !isCurrentlyOff ? `Marked day off by ${selectedMember.name}` : '',
      `demo-${selectedMember.id}`
    );
  };

  const handleToggleDateBlockedSlot = async (slot: string) => {
    if (!selectedMember) return;
    const currentSlots = currentDateAvail?.blockedSlots || [];
    const nextSlots = currentSlots.includes(slot)
      ? currentSlots.filter((s) => s !== slot)
      : [...currentSlots, slot];
    await setBeauticianDateAvailability(
      selectedMember.id,
      availDate,
      nextSlots,
      currentDateAvail?.isDayOff || false,
      currentDateAvail?.note || '',
      `demo-${selectedMember.id}`
    );
  };

  const renderStatusBadge = (canonical: string) => {
    if (canonical === 'assigned' || canonical === 'confirmed') {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Assigned
        </span>
      );
    }
    if (canonical === 'in_progress') {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          In Progress
        </span>
      );
    }
    if (canonical === 'completed') {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200">
          Completed
        </span>
      );
    }
    if (canonical === 'reschedule_requested' || canonical === 'customer_unavailable') {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
          {canonical === 'reschedule_requested' ? 'Reschedule Needed' : 'Customer Unavailable'}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200">
        Cancelled
      </span>
    );
  };

  if (!selectedMember) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#faf7f2] p-6 text-xs text-stone-500">
        No demo beautician profiles found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Demo Profile Switcher Strip */}
        <div className="bg-white rounded-2xl border border-[#ebdccd] p-3.5 sm:px-5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2 text-xs text-stone-700">
            <Users className="w-4 h-4 text-[#e03e1a] shrink-0" />
            <span className="font-bold text-stone-900">Switch Demo Beautician:</span>
            <span className="text-[11px] text-stone-400 hidden sm:inline">
              (Frontend preview · assigned-only view)
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {teamMembers.map((m) => {
              const isActive = m.id === selectedMember.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveBeauticianId(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-[#e03e1a] text-white border-[#e03e1a] shadow-xs'
                      : 'bg-[#faf7f2] text-stone-700 border-[#ebdccd] hover:border-stone-400'
                  }`}
                >
                  <PartnerAvatar
                    photo={m.photoUrl || `/assets/partners/${m.id}.jpg`}
                    name={m.name}
                    size="sm"
                    className="!w-5 !h-5"
                  />
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Beautician Identity Bar */}
        <div className="bg-white rounded-3xl border border-[#ebdccd] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <PartnerAvatar
              photo={selectedMember.photoUrl || `/assets/partners/${selectedMember.id}.jpg`}
              name={selectedMember.name}
              size="lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#e03e1a]">
                  Beautician Portal · Demo Mode
                </span>
                <span className="text-stone-300" aria-hidden="true">·</span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    selectedMember.availabilityStatus === 'available'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : selectedMember.availabilityStatus === 'busy'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  {selectedMember.availabilityStatus === 'available'
                    ? 'Available'
                    : selectedMember.availabilityStatus === 'busy'
                    ? 'Busy'
                    : 'On Leave'}
                </span>
              </div>
              <h1 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
                {selectedMember.name}&apos;s Schedule
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                {selectedMember.specialties.join(' · ')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <Link
              to="/beautician/login"
              className="px-3.5 py-2 text-xs font-bold text-stone-700 bg-[#faf7f2] hover:bg-stone-100 border border-[#ebdccd] rounded-xl inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Profiles</span>
            </Link>
            <Link
              to="/admin"
              className="px-3.5 py-2 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Owner Portal</span>
            </Link>
          </div>
        </div>

        {/* 4 Overview KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 tabular-nums">
          <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Today&apos;s Appointments
            </span>
            <div className="text-2xl font-serif font-bold text-[#e03e1a] mt-1">
              {stats.todayCount}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Upcoming Appointments
            </span>
            <div className="text-2xl font-serif font-bold text-stone-900 mt-1">
              {stats.upcomingCount}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Completed Appointments
            </span>
            <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">
              {stats.completedCount}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              Cancelled Appointments
            </span>
            <div className="text-2xl font-serif font-bold text-stone-500 mt-1">
              {stats.cancelledCount}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#ebdccd] pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-[#ebdccd]'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>My Appointments ({activeAppointments.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'history'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-[#ebdccd]'
            }`}
          >
            <History className="w-4 h-4 text-amber-300" />
            <span>All Assigned ({myBookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('availability')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'availability'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-[#ebdccd]'
            }`}
          >
            <User className="w-4 h-4 text-amber-300" />
            <span>My Availability</span>
          </button>
        </div>

        {/* TAB 1: MY APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {activeAppointments.length === 0 ? (
              <div className="p-10 text-center bg-white rounded-3xl border border-[#ebdccd]">
                <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-serif font-bold text-stone-800">
                  No active assigned appointments for {selectedMember.name}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Assign an appointment to {selectedMember.name} in the Owner Portal to see it appear here instantly.
                </p>
                <Link
                  to="/admin"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#e03e1a] text-white text-xs font-bold rounded-xl"
                >
                  <span>Go to Owner Portal</span>
                </Link>
              </div>
            ) : (
              activeAppointments.map((b) => {
                const mapsQuery = encodeURIComponent(
                  `${b.customerDetails.fullAddress}, ${b.customerDetails.area}, Solapur, Maharashtra`
                );
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
                const cleanMob = b.customerDetails.mobileNumber.replace(/\D/g, '').slice(-10);
                const waUrl = `https://wa.me/91${cleanMob}?text=${encodeURIComponent(
                  `Hello ${b.customerDetails.fullName}, I am ${selectedMember.name} from Hello Madam regarding your appointment ${b.bookingId} on ${b.date}.`
                )}`;

                return (
                  <div
                    key={b.id}
                    className="bg-white rounded-3xl border border-[#ebdccd] p-5 sm:p-6 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-2.5 py-1 bg-stone-900 text-white text-xs font-mono font-bold rounded-lg">
                          {b.bookingId}
                        </span>
                        {renderStatusBadge(b.canonicalStatus)}
                      </div>
                      <div className="text-xs font-semibold text-stone-700 flex items-center gap-2 tabular-nums">
                        <Calendar className="w-3.5 h-3.5 text-[#e03e1a]" />
                        <span>{b.date}</span>
                        <span className="text-stone-300" aria-hidden="true">·</span>
                        <Clock className="w-3.5 h-3.5 text-[#e03e1a]" />
                        <span>{b.timeSlot}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* Customer & Location */}
                      <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-1.5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Customer & Location
                        </div>
                        <div className="text-sm font-bold text-stone-900">
                          {b.customerDetails.fullName}
                        </div>
                        <div className="text-[11px] font-mono text-stone-600">
                          {b.customerDetails.mobileNumber}
                        </div>
                        <div className="flex items-start gap-1.5 text-stone-700 pt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#e03e1a] shrink-0 mt-0.5" />
                          <span>
                            {b.customerDetails.fullAddress}, {b.customerDetails.area}
                            {b.customerDetails.landmark ? ` (Landmark: ${b.customerDetails.landmark})` : ''}
                          </span>
                        </div>
                      </div>

                      {/* Services & Amount */}
                      <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            Selected Services ({b.services.length})
                          </span>
                          <span className="font-serif font-bold text-stone-900 tabular-nums">
                            {formatPrice(b.totalAmount)}
                          </span>
                        </div>
                        <ul className="space-y-1 text-stone-800 font-medium">
                          {b.services.map((s, idx) => (
                            <li key={idx}>• {s.name} ({s.duration})</li>
                          ))}
                        </ul>
                        <div className="text-[11px] text-stone-500 pt-1">
                          Total Est. Time: ~{b.totalDurationMins} mins
                        </div>
                      </div>

                      {/* Instructions & Quick Contact */}
                      <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                          Instructions & Contact
                        </div>
                        {b.customerDetails.additionalInstructions ? (
                          <p className="text-amber-900 italic">
                            &ldquo;{b.customerDetails.additionalInstructions}&rdquo;
                          </p>
                        ) : (
                          <p className="text-stone-400">No special instructions.</p>
                        )}
                        {b.adminNotes && (
                          <p className="text-stone-600">
                            <strong>Owner Note:</strong> {b.adminNotes}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <a
                            href={`tel:${b.customerDetails.mobileNumber.replace(/\s+/g, '')}`}
                            className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg font-bold text-stone-700 inline-flex items-center gap-1 hover:bg-stone-50"
                          >
                            <Phone className="w-3 h-3 text-[#e03e1a]" />
                            <span>Call Customer</span>
                          </a>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg font-bold text-emerald-700 inline-flex items-center gap-1 hover:bg-emerald-100"
                          >
                            <MessageCircle className="w-3 h-3" />
                            <span>WhatsApp Customer</span>
                          </a>
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg font-bold text-stone-700 inline-flex items-center gap-1 hover:bg-stone-50"
                          >
                            <ExternalLink className="w-3 h-3 text-[#e03e1a]" />
                            <span>Open Maps</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Execution Controls */}
                    <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDetailBooking(b)}
                          className="px-3.5 py-2 bg-[#faf7f2] hover:bg-stone-100 text-stone-700 border border-[#ebdccd] text-xs font-bold rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#e03e1a]" />
                          <span>View Details</span>
                        </button>

                        {(b.canonicalStatus === 'assigned' || b.canonicalStatus === 'confirmed') && (
                          <button
                            type="button"
                            disabled={actionBusy}
                            onClick={() =>
                              void handleStatusAction(
                                b.id,
                                'start',
                                `Service started by ${selectedMember.name}`
                              )
                            }
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <PlayCircle className="w-4 h-4" />
                            <span>Start Service</span>
                          </button>
                        )}

                        {['assigned', 'confirmed', 'in_progress'].includes(b.canonicalStatus) && (
                          <button
                            type="button"
                            disabled={actionBusy}
                            onClick={() => {
                              setActionNote('');
                              setNoteModal({
                                appointmentId: b.id,
                                bookingRef: b.bookingId,
                                mode: 'complete',
                                issueType: 'unavailable',
                                title: `Mark Completed (${b.bookingId})`,
                              });
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Mark Completed</span>
                          </button>
                        )}
                      </div>

                      {['assigned', 'confirmed', 'in_progress'].includes(b.canonicalStatus) && (
                        <button
                          type="button"
                          onClick={() => {
                            setActionNote('');
                            setNoteModal({
                              appointmentId: b.id,
                              bookingRef: b.bookingId,
                              mode: 'issue',
                              issueType: 'unavailable',
                              title: `Report Issue (${b.bookingId})`,
                            });
                          }}
                          className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Report Issue</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: ALL ASSIGNED / HISTORY */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(['all', 'upcoming', 'in_progress', 'completed', 'cancelled'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setHistoryFilter(f)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer whitespace-nowrap ${
                    historyFilter === f
                      ? 'bg-[#e03e1a] text-white'
                      : 'bg-white text-stone-600 border border-[#ebdccd]'
                  }`}
                >
                  {f === 'all' ? 'All Assigned' : f.replace('_', ' ').toUpperCase()}
                </button>
              ))}
            </div>

            {filteredHistory.length === 0 ? (
              <div className="p-10 text-center bg-white rounded-3xl border border-[#ebdccd] text-xs text-stone-500">
                No appointments match this filter for {selectedMember.name}.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHistory.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900">{b.bookingId}</span>
                        {renderStatusBadge(b.canonicalStatus)}
                      </div>
                      <p className="font-semibold text-stone-800">
                        {b.customerDetails.fullName} · {b.customerDetails.area}
                      </p>
                      <p className="text-stone-500">
                        {b.services.map((s) => s.name).join(', ')}
                      </p>
                      {b.beauticianNote && (
                        <p className="text-stone-500 italic">Note: {b.beauticianNote}</p>
                      )}
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="sm:text-right tabular-nums">
                        <div className="font-bold text-stone-900">{b.date}</div>
                        <div className="text-stone-500">{b.timeSlot}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDetailBooking(b)}
                        className="px-3 py-1 bg-[#faf7f2] border border-[#ebdccd] rounded-lg text-[11px] font-bold text-stone-700 hover:bg-stone-100 cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY AVAILABILITY */}
        {activeTab === 'availability' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-5">
              <div className="flex items-center gap-4">
                <PartnerAvatar
                  photo={selectedMember.photoUrl || `/assets/partners/${selectedMember.id}.jpg`}
                  name={selectedMember.name}
                  size="xl"
                />
                <div>
                  <h2 className="text-xl font-serif font-bold text-stone-900">
                    {selectedMember.name}
                  </h2>
                  <p className="text-xs font-mono text-stone-500">
                    {selectedMember.phone} (Sample Placeholder)
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {selectedMember.workingHoursStart} – {selectedMember.workingHoursEnd}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Current Availability Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['available', 'busy', 'on_leave'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={savingProfile}
                      onClick={() => void handleAvailabilityStatusChange(st)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedMember.availabilityStatus === st
                          ? 'bg-[#e03e1a] text-white border-[#e03e1a]'
                          : 'bg-[#faf7f2] text-stone-700 border-[#ebdccd]'
                      }`}
                    >
                      {st === 'available' ? 'Available' : st === 'busy' ? 'Busy' : 'On Leave'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Assigned Specializations
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.specialties.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 bg-[#faf7f2] border border-[#ebdccd] rounded-lg text-xs font-medium text-stone-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Weekly Working Days
                </label>
                <div className="flex flex-wrap gap-2">
                  {ALL_WEEK_DAYS.map((day) => {
                    const active = selectedMember.workingDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={savingProfile}
                        onClick={() => void handleToggleWorkingDay(day)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                          active
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-400 border-stone-200'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Date-Specific Slot Blocks / Day Off */}
            <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">
                    Date-Specific Availability
                  </h3>
                  <p className="text-xs text-stone-500">
                    Block busy hours or mark a full day off in the Owner schedule calendar.
                  </p>
                </div>
                <CalendarOff className="w-5 h-5 text-[#e03e1a]" />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="date"
                  value={availDate}
                  onChange={(e) => setAvailDate(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#faf7f2] border border-[#ebdccd] rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => void handleToggleDateDayOff()}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border cursor-pointer ${
                    currentDateAvail?.isDayOff
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {currentDateAvail?.isDayOff ? 'Day Off Active (Click to Clear)' : 'Mark Full Day Off'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {STANDARD_TIME_SLOTS.map((slot) => {
                  const blocked = currentDateAvail?.blockedSlots.includes(slot) || false;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={currentDateAvail?.isDayOff}
                      onClick={() => void handleToggleDateBlockedSlot(slot)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-left flex items-center justify-between cursor-pointer disabled:opacity-50 ${
                        blocked
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-[#faf7f2] text-stone-700 border-[#ebdccd]'
                      }`}
                    >
                      <span>{slot}</span>
                      <span className="text-[10px] font-bold uppercase">
                        {blocked ? 'Blocked' : 'Open'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Details Modal */}
      {detailBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#ebdccd] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#e03e1a]">
                  Appointment Details
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {detailBooking.bookingId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailBooking(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label="Close"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#faf7f2] border border-[#ebdccd] space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-sm text-stone-900">
                    {detailBooking.customerDetails.fullName}
                  </strong>
                  {renderStatusBadge(detailBooking.canonicalStatus)}
                </div>
                <p className="font-mono text-stone-600">{detailBooking.customerDetails.mobileNumber}</p>
                <p className="text-stone-700">
                  {detailBooking.customerDetails.fullAddress}, {detailBooking.customerDetails.area}
                  {detailBooking.customerDetails.landmark
                    ? ` · Landmark: ${detailBooking.customerDetails.landmark}`
                    : ''}
                </p>
                <p className="text-stone-600 pt-1">
                  <strong>Slot:</strong> {detailBooking.date} · {detailBooking.timeSlot}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#ebdccd] space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Booked Services
                </div>
                <div className="divide-y divide-stone-100">
                  {detailBooking.services.map((s, idx) => (
                    <div key={idx} className="py-1.5 flex items-center justify-between">
                      <span>{s.name} ({s.duration})</span>
                      <strong className="tabular-nums">{formatPrice(s.price)}</strong>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-sm font-bold">
                  <span>Total Amount</span>
                  <span className="text-[#e03e1a] tabular-nums">
                    {formatPrice(detailBooking.totalAmount)}
                  </span>
                </div>
              </div>

              {(detailBooking.customerDetails.additionalInstructions || detailBooking.adminNotes) && (
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1 text-amber-950">
                  {detailBooking.customerDetails.additionalInstructions && (
                    <p>
                      <strong>Customer Instructions:</strong>{' '}
                      {detailBooking.customerDetails.additionalInstructions}
                    </p>
                  )}
                  {detailBooking.adminNotes && (
                    <p>
                      <strong>Owner Note:</strong> {detailBooking.adminNotes}
                    </p>
                  )}
                </div>
              )}

              {statusHistory.filter((h) => h.appointmentId === detailBooking.id).length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Timeline Updates
                  </div>
                  {statusHistory
                    .filter((h) => h.appointmentId === detailBooking.id)
                    .map((h) => (
                      <div
                        key={h.id}
                        className="p-2.5 rounded-xl bg-[#faf7f2] border border-[#ebdccd]/70 flex items-center justify-between gap-2"
                      >
                        <div>
                          <span className="font-bold uppercase text-stone-800">{h.toStatus}</span>
                          {h.note && <span className="text-stone-600"> — {h.note}</span>}
                        </div>
                        <span className="text-[10px] text-stone-400 shrink-0">{h.changedByRole}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setDetailBooking(null)}
                className="px-5 py-2 text-xs font-bold bg-stone-900 text-white rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action / Report Issue Modal */}
      {noteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-serif font-bold text-stone-900">{noteModal.title}</h3>
              <button
                type="button"
                onClick={() => setNoteModal(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {noteModal.mode === 'issue' && (
              <div className="text-xs space-y-2">
                <label className="block font-bold text-stone-700">Issue Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setNoteModal({ ...noteModal, issueType: 'unavailable' })
                    }
                    className={`py-2 px-3 rounded-xl font-bold border cursor-pointer ${
                      noteModal.issueType === 'unavailable'
                        ? 'bg-[#e03e1a] text-white border-[#e03e1a]'
                        : 'bg-[#faf7f2] text-stone-700 border-[#ebdccd]'
                    }`}
                  >
                    Customer Unavailable
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNoteModal({ ...noteModal, issueType: 'reschedule_request' })
                    }
                    className={`py-2 px-3 rounded-xl font-bold border cursor-pointer ${
                      noteModal.issueType === 'reschedule_request'
                        ? 'bg-[#e03e1a] text-white border-[#e03e1a]'
                        : 'bg-[#faf7f2] text-stone-700 border-[#ebdccd]'
                    }`}
                  >
                    Reschedule Needed
                  </button>
                </div>
              </div>
            )}

            <div className="text-xs space-y-2">
              <label className="block font-bold text-stone-700">
                {noteModal.mode === 'complete'
                  ? 'Completion Remarks (Optional)'
                  : 'Issue Note / Details for Owner *'}
              </label>
              <textarea
                rows={3}
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder={
                  noteModal.mode === 'complete'
                    ? 'e.g. Service completed smoothly, settled via UPI'
                    : 'Enter details so the Hello Madam Owner can follow up...'
                }
                className="w-full px-3 py-2 bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#e03e1a]"
              />
            </div>

            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setNoteModal(null)}
                className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  actionBusy || (noteModal.mode === 'issue' && !actionNote.trim())
                }
                onClick={() =>
                  void handleStatusAction(
                    noteModal.appointmentId,
                    noteModal.mode === 'complete' ? 'complete' : noteModal.issueType,
                    actionNote.trim() || 'Completed by beautician'
                  )
                }
                className="px-5 py-2 font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] disabled:opacity-60 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{actionBusy ? 'Saving...' : 'Confirm Update'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
