import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { ConfirmedBooking } from '../../context/BookingContext';
import {
  ALL_WEEK_DAYS,
  AvailabilityStatus,
  BeauticianAvailabilityRecord,
  STANDARD_TIME_SLOTS,
  TeamMember,
} from '../../types/management';

interface OwnerScheduleTabProps {
  allBookings: ConfirmedBooking[];
  teamMembers: TeamMember[];
  availabilityRecords: BeauticianAvailabilityRecord[];
  onSetBeauticianDateAvailability: (
    beauticianId: string,
    date: string,
    blockedSlots: string[],
    isDayOff: boolean,
    note?: string
  ) => Promise<void>;
  onUpdateBeauticianAvailability: (
    memberId: string,
    status: AvailabilityStatus,
    workingDays?: string[]
  ) => Promise<void>;
  onViewBooking: (booking: ConfirmedBooking) => void;
}

type CalendarViewMode = 'daily' | 'weekly' | 'monthly';

function getStatusColorClasses(canonical: string): string {
  switch (canonical) {
    case 'pending':
      return 'bg-amber-50 border-amber-300 text-amber-900';
    case 'confirmed':
      return 'bg-teal-50 border-teal-300 text-teal-900';
    case 'assigned':
      return 'bg-emerald-50 border-emerald-300 text-emerald-900';
    case 'in_progress':
      return 'bg-indigo-50 border-indigo-300 text-indigo-900';
    case 'completed':
      return 'bg-blue-50 border-blue-300 text-blue-900';
    case 'cancelled':
      return 'bg-red-50 border-red-200 text-red-700';
    default:
      return 'bg-orange-50 border-orange-200 text-orange-900';
  }
}

export const OwnerScheduleTab: React.FC<OwnerScheduleTabProps> = ({
  allBookings,
  teamMembers,
  availabilityRecords,
  onSetBeauticianDateAvailability,
  onUpdateBeauticianAvailability,
  onViewBooking,
}) => {
  const [viewMode, setViewMode] = useState<CalendarViewMode>('daily');
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [editAvailMember, setEditAvailMember] = useState<TeamMember | null>(null);
  const [tempStatus, setTempStatus] = useState<AvailabilityStatus>('available');
  const [tempWorkingDays, setTempWorkingDays] = useState<string[]>([]);

  const activeTeam = useMemo(() => teamMembers.filter((m) => m.active), [teamMembers]);

  const shiftDate = (deltaDays: number) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + deltaDays);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  // Weekly 7 days starting Sunday/Monday around selectedDate
  const weekDays = useMemo(() => {
    const anchor = new Date(selectedDate + 'T00:00:00');
    const dayIdx = anchor.getDay(); // 0=Sun..6=Sat
    const mondayOffset = dayIdx === 0 ? -6 : 1 - dayIdx;
    const monday = new Date(anchor);
    monday.setDate(anchor.getDate() + mondayOffset);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return {
        dateStr: d.toISOString().split('T')[0],
        shortDay: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthShort: d.toLocaleDateString('en-IN', { month: 'short' }),
      };
    });
  }, [selectedDate]);

  // Monthly grid for the month of selectedDate
  const monthGrid = useMemo(() => {
    const anchor = new Date(selectedDate + 'T00:00:00');
    const year = anchor.getFullYear();
    const month = anchor.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPad = (firstDay.getDay() + 6) % 7; // Monday = 0
    const cells: { dateStr: string | null; dayNum?: number }[] = [];

    for (let i = 0; i < startPad; i++) {
      cells.push({ dateStr: null });
    }
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const d = new Date(year, month, day);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(day).padStart(2, '0');
      cells.push({ dateStr: `${yyyy}-${mm}-${dd}`, dayNum: day });
    }
    return {
      title: anchor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      cells,
    };
  }, [selectedDate]);

  const selectedDateBookings = useMemo(
    () => allBookings.filter((b) => b.date === selectedDate),
    [allBookings, selectedDate]
  );

  const openQuickAvailEdit = (m: TeamMember) => {
    setEditAvailMember(m);
    setTempStatus(m.availabilityStatus);
    setTempWorkingDays([...m.workingDays]);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-serif font-bold text-stone-900">
            Schedule &amp; Availability Calendar
          </h2>
          <p className="text-xs text-stone-500">
            Switch between Daily, Weekly, and Monthly views. Click slots to block/open or inspect bookings.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Segmented Buttons */}
          <div className="inline-flex items-center p-1 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-xs">
            {(['daily', 'weekly', 'monthly'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-3.5 py-1.5 rounded-lg font-bold capitalize cursor-pointer transition-colors ${
                  viewMode === mode
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Date Selector & Step Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                shiftDate(viewMode === 'daily' ? -1 : viewMode === 'weekly' ? -7 : -30)
              }
              className="p-2 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-stone-600 hover:text-stone-900 cursor-pointer"
              aria-label="Previous period"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-stone-800"
            />
            <button
              type="button"
              onClick={() =>
                shiftDate(viewMode === 'daily' ? 1 : viewMode === 'weekly' ? 7 : 30)
              }
              className="p-2 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-stone-600 hover:text-stone-900 cursor-pointer"
              aria-label="Next period"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Color Legend */}
      <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-600 px-1">
        <span className="font-bold text-stone-700">Status Legend:</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> Pending
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-teal-500" /> Confirmed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Assigned
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" /> In Progress
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" /> Completed
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-red-400" /> Cancelled / Blocked
        </span>
      </div>

      {/* ================= DAILY SLOT MATRIX VIEW ================= */}
      {viewMode === 'daily' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#ebdccd] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#faf7f2] border-b border-[#ebdccd] text-stone-700 font-serif">
                  <tr>
                    <th className="py-3.5 px-4">Beautician &amp; Status</th>
                    {STANDARD_TIME_SLOTS.map((slot) => (
                      <th key={slot} className="py-3.5 px-3 text-center whitespace-nowrap">
                        {slot}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {activeTeam.map((m) => {
                    const avail = availabilityRecords.find(
                      (r) => r.beauticianId === m.id && r.date === selectedDate
                    );
                    return (
                      <tr key={m.id}>
                        <td className="py-3 px-4 align-top whitespace-nowrap">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-stone-900">{m.name}</span>
                            <button
                              type="button"
                              onClick={() => openQuickAvailEdit(m)}
                              className="p-1 text-stone-400 hover:text-[#e03e1a] cursor-pointer"
                              title="Edit Availability"
                            >
                              <SlidersHorizontal className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-[10px] text-stone-500 capitalize">
                            Status: {m.availabilityStatus.replace('_', ' ')}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              void onSetBeauticianDateAvailability(
                                m.id,
                                selectedDate,
                                avail?.blockedSlots || [],
                                !(avail?.isDayOff || false),
                                avail?.isDayOff ? '' : 'Marked Day Off by Owner'
                              )
                            }
                            className={`mt-1.5 text-[10px] font-bold px-2 py-0.5 rounded-lg border cursor-pointer ${
                              avail?.isDayOff
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {avail?.isDayOff ? 'Day Off (Click to Open)' : 'Mark Day Off'}
                          </button>
                        </td>

                        {STANDARD_TIME_SLOTS.map((slot) => {
                          const assignedBooking = allBookings.find(
                            (b) =>
                              b.assignedBeauticianId === m.id &&
                              b.date === selectedDate &&
                              b.timeSlot === slot &&
                              b.canonicalStatus !== 'cancelled'
                          );
                          const isBlocked = avail?.blockedSlots.includes(slot) || false;

                          return (
                            <td key={slot} className="py-3 px-2 text-center align-middle">
                              {avail?.isDayOff ? (
                                <span className="inline-block px-2 py-1.5 rounded-xl bg-stone-100 text-stone-400 text-[10px] font-semibold">
                                  Day Off
                                </span>
                              ) : assignedBooking ? (
                                <button
                                  type="button"
                                  onClick={() => onViewBooking(assignedBooking)}
                                  className={`w-full px-2.5 py-2 rounded-xl border text-left text-[10px] cursor-pointer hover:opacity-90 ${getStatusColorClasses(
                                    assignedBooking.canonicalStatus
                                  )}`}
                                >
                                  <div className="font-mono font-bold">
                                    {assignedBooking.bookingId}
                                  </div>
                                  <div className="truncate max-w-[120px] font-semibold">
                                    {assignedBooking.customerDetails.fullName}
                                  </div>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const cur = avail?.blockedSlots || [];
                                    const next = isBlocked
                                      ? cur.filter((s) => s !== slot)
                                      : [...cur, slot];
                                    void onSetBeauticianDateAvailability(
                                      m.id,
                                      selectedDate,
                                      next,
                                      false,
                                      isBlocked ? '' : 'Blocked by Owner'
                                    );
                                  }}
                                  className={`w-full px-2.5 py-2 rounded-xl text-[10px] font-bold border cursor-pointer transition-colors ${
                                    isBlocked
                                      ? 'bg-red-50 text-red-700 border-red-200'
                                      : 'bg-emerald-50/70 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                  }`}
                                >
                                  {isBlocked ? 'Blocked' : 'Open'}
                                </button>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Unassigned Requests for selectedDate */}
          {selectedDateBookings.filter((b) => !b.assignedBeauticianId).length > 0 && (
            <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 space-y-2">
              <div className="text-xs font-bold text-stone-800">
                Unassigned Bookings on {selectedDate}:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedDateBookings
                  .filter((b) => !b.assignedBeauticianId)
                  .map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => onViewBooking(b)}
                      className={`px-3 py-2 rounded-xl border text-xs cursor-pointer ${getStatusColorClasses(
                        b.canonicalStatus
                      )}`}
                    >
                      <span className="font-mono font-bold">{b.bookingId}</span> ·{' '}
                      {b.customerDetails.fullName} ({b.timeSlot})
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= WEEKLY CALENDAR VIEW ================= */}
      {viewMode === 'weekly' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {weekDays.map((day) => {
            const dayBookings = allBookings.filter((b) => b.date === day.dateStr);
            const isSelected = day.dateStr === selectedDate;
            return (
              <div
                key={day.dateStr}
                className={`bg-white rounded-2xl border p-3.5 space-y-2.5 min-h-[220px] ${
                  isSelected ? 'border-[#e03e1a]' : 'border-[#ebdccd]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate(day.dateStr);
                    setViewMode('daily');
                  }}
                  className="w-full flex items-center justify-between pb-2 border-b border-stone-100 cursor-pointer text-left"
                >
                  <div>
                    <div className="text-[11px] font-bold text-stone-400 uppercase">
                      {day.shortDay}
                    </div>
                    <div className="text-base font-serif font-bold text-stone-900">
                      {day.dayNum} {day.monthShort}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-stone-500">
                    {dayBookings.length}
                  </span>
                </button>

                {dayBookings.length === 0 ? (
                  <div className="text-[11px] text-stone-400 py-6 text-center">No bookings</div>
                ) : (
                  <div className="space-y-2">
                    {dayBookings.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => onViewBooking(b)}
                        className={`w-full text-left p-2 rounded-xl border text-[11px] space-y-0.5 cursor-pointer hover:opacity-90 ${getStatusColorClasses(
                          b.canonicalStatus
                        )}`}
                      >
                        <div className="font-mono font-bold truncate">{b.bookingId}</div>
                        <div className="font-bold truncate">{b.customerDetails.fullName}</div>
                        <div className="text-[10px] opacity-85 truncate">
                          {b.timeSlot.split(' - ')[0]} ·{' '}
                          {b.assignedBeauticianName || `Pref: ${b.preferredBeauticianName}`}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= MONTHLY CALENDAR VIEW ================= */}
      {viewMode === 'monthly' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#ebdccd] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-stone-900">{monthGrid.title}</h3>
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => shiftDate(-30)}
                  className="px-3 py-1 bg-[#faf7f2] border border-[#ebdccd] rounded-lg font-semibold cursor-pointer"
                >
                  Prev Month
                </button>
                <button
                  type="button"
                  onClick={() => shiftDate(30)}
                  className="px-3 py-1 bg-[#faf7f2] border border-[#ebdccd] rounded-lg font-semibold cursor-pointer"
                >
                  Next Month
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-stone-400 uppercase pb-1">
              {ALL_WEEK_DAYS.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {monthGrid.cells.map((cell, idx) => {
                if (!cell.dateStr) {
                  return <div key={`empty-${idx}`} className="h-20 rounded-xl bg-stone-50/50" />;
                }
                const dayBookings = allBookings.filter((b) => b.date === cell.dateStr);
                const isSelected = cell.dateStr === selectedDate;
                return (
                  <button
                    key={cell.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(cell.dateStr!)}
                    className={`min-h-[82px] p-2 rounded-xl border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#e03e1a] bg-[#fef2ee]/40'
                        : 'border-[#ebdccd] bg-white hover:bg-[#faf7f2]'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-[#e03e1a]' : 'text-stone-800'
                      }`}
                    >
                      {cell.dayNum}
                    </span>
                    {dayBookings.length > 0 && (
                      <div className="space-y-1">
                        {dayBookings.slice(0, 2).map((b) => (
                          <div
                            key={b.id}
                            className={`text-[9px] px-1.5 py-0.5 rounded truncate font-semibold border ${getStatusColorClasses(
                              b.canonicalStatus
                            )}`}
                          >
                            {b.customerDetails.fullName.split(' ')[0]}
                          </div>
                        ))}
                        {dayBookings.length > 2 && (
                          <div className="text-[9px] text-stone-500 font-bold">
                            +{dayBookings.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Day Drawer Summary */}
          <div className="bg-white rounded-3xl border border-[#ebdccd] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#e03e1a]" />
                <h4 className="text-sm font-serif font-bold text-stone-900">
                  Appointments on {selectedDate} ({selectedDateBookings.length})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('daily')}
                className="text-xs font-bold text-[#e03e1a] hover:underline cursor-pointer"
              >
                Manage Time Slots for {selectedDate}
              </button>
            </div>

            {selectedDateBookings.length === 0 ? (
              <p className="text-xs text-stone-500">No appointments scheduled on this date.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedDateBookings.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onViewBooking(b)}
                    className={`p-3 rounded-2xl border text-left text-xs flex items-center justify-between gap-2 cursor-pointer ${getStatusColorClasses(
                      b.canonicalStatus
                    )}`}
                  >
                    <div>
                      <div className="font-mono font-bold">
                        {b.bookingId} · {b.customerDetails.fullName}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] opacity-85 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{b.timeSlot}</span>
                        <span>·</span>
                        <span>{b.assignedBeauticianName || 'Unassigned'}</span>
                      </div>
                    </div>
                    <span className="font-bold font-serif tabular-nums">₹{b.totalAmount}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Beautician Availability Quick Modal */}
      {editAvailMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-serif font-bold text-stone-900">
                Edit Availability · {editAvailMember.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditAvailMember(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1.5">Current Availability</label>
              <select
                value={tempStatus}
                onChange={(e) => setTempStatus(e.target.value as AvailabilityStatus)}
                className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl bg-[#faf7f2]"
              >
                <option value="available">Available</option>
                <option value="busy">Busy / Limited Slots</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1.5">Working Days</label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_WEEK_DAYS.map((day) => {
                  const active = tempWorkingDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() =>
                        setTempWorkingDays((prev) =>
                          active ? prev.filter((d) => d !== day) : [...prev, day]
                        )
                      }
                      className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${
                        active
                          ? 'bg-stone-900 text-white border-stone-900'
                          : 'bg-white text-stone-500 border-stone-200'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditAvailMember(null)}
                className="px-4 py-2 text-stone-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await onUpdateBeauticianAvailability(
                    editAvailMember.id,
                    tempStatus,
                    tempWorkingDays
                  );
                  setEditAvailMember(null);
                }}
                className="px-5 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
