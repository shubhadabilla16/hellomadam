import React, { useMemo } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  UserCheck,
  Users,
  IndianRupee,
  ArrowRight,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import { ConfirmedBooking } from '../../context/BookingContext';
import { CustomerRecord, TeamMember } from '../../types/management';
import { PartnerAvatar } from '../PartnerAvatar';

interface OwnerOverviewTabProps {
  allBookings: ConfirmedBooking[];
  customers: CustomerRecord[];
  teamMembers: TeamMember[];
  onNavigateTab: (tab: string) => void;
  onAssignBooking: (booking: ConfirmedBooking) => void;
  onViewDetails: (booking: ConfirmedBooking) => void;
}

export const OwnerOverviewTab: React.FC<OwnerOverviewTabProps> = ({
  allBookings,
  customers,
  teamMembers,
  onNavigateTab,
  onAssignBooking,
  onViewDetails,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const stats = useMemo(() => {
    const total = allBookings.length;
    const todayCount = allBookings.filter((b) => b.date === todayStr).length;
    const pending = allBookings.filter((b) => b.canonicalStatus === 'pending').length;
    const confirmed = allBookings.filter((b) => b.canonicalStatus === 'confirmed').length;
    const assigned = allBookings.filter((b) => b.canonicalStatus === 'assigned').length;
    const inProgress = allBookings.filter((b) => b.canonicalStatus === 'in_progress').length;
    const completed = allBookings.filter((b) => b.canonicalStatus === 'completed').length;
    const cancelled = allBookings.filter((b) => b.canonicalStatus === 'cancelled').length;
    const completedRevenue = allBookings
      .filter((b) => b.canonicalStatus === 'completed')
      .reduce((sum, b) => sum + b.totalAmount, 0);
    const activeBeauticians = teamMembers.filter((m) => m.active).length;

    return {
      total,
      todayCount,
      pending,
      confirmed,
      assigned,
      inProgress,
      completed,
      cancelled,
      totalCustomers: customers.length,
      activeBeauticians,
      completedRevenue,
    };
  }, [allBookings, customers.length, teamMembers, todayStr]);

  // 7-day trend window (-4 days to +2 days around today)
  const sevenDaySeries = useMemo(() => {
    const days: { dateStr: string; label: string; count: number; revenue: number }[] = [];
    for (let offset = -4; offset <= 2; offset++) {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      const dateStr = d.toISOString().split('T')[0];
      const dayLabel =
        offset === 0
          ? 'Today'
          : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
      const dayBookings = allBookings.filter((b) => b.date === dateStr);
      const revenue = dayBookings
        .filter((b) => b.canonicalStatus !== 'cancelled')
        .reduce((s, b) => s + b.totalAmount, 0);
      days.push({
        dateStr,
        label: dayLabel,
        count: dayBookings.length,
        revenue,
      });
    }
    return days;
  }, [allBookings]);

  const maxDayCount = Math.max(...sevenDaySeries.map((d) => d.count), 1);

  const statusDistribution = useMemo(() => {
    const total = Math.max(allBookings.length, 1);
    const rows = [
      { key: 'pending', label: 'Pending', count: stats.pending, barClass: 'bg-amber-500' },
      { key: 'confirmed', label: 'Confirmed', count: stats.confirmed, barClass: 'bg-teal-600' },
      { key: 'assigned', label: 'Assigned', count: stats.assigned, barClass: 'bg-emerald-600' },
      { key: 'in_progress', label: 'In Progress', count: stats.inProgress, barClass: 'bg-indigo-600' },
      { key: 'completed', label: 'Completed', count: stats.completed, barClass: 'bg-blue-600' },
      { key: 'cancelled', label: 'Cancelled', count: stats.cancelled, barClass: 'bg-red-500' },
    ];
    return rows.map((r) => ({
      ...r,
      pct: Math.round((r.count / total) * 100),
    }));
  }, [allBookings.length, stats]);

  const pendingQueue = useMemo(
    () => allBookings.filter((b) => b.canonicalStatus === 'pending').slice(0, 4),
    [allBookings]
  );

  const summaryCards = [
    { label: 'Total Appointments', val: stats.total, color: 'text-stone-900', target: 'appointments' },
    { label: "Today's Appointments", val: stats.todayCount, color: 'text-[#e03e1a]', target: 'schedule' },
    { label: 'Pending Requests', val: stats.pending, color: 'text-amber-700', target: 'requests' },
    { label: 'Confirmed', val: stats.confirmed, color: 'text-teal-700', target: 'appointments' },
    { label: 'Assigned', val: stats.assigned, color: 'text-emerald-700', target: 'appointments' },
    { label: 'Completed', val: stats.completed, color: 'text-blue-700', target: 'appointments' },
    { label: 'Cancelled', val: stats.cancelled, color: 'text-red-700', target: 'appointments' },
    { label: 'Total Customers', val: stats.totalCustomers, color: 'text-stone-900', target: 'customers' },
    { label: 'Active Beauticians', val: stats.activeBeauticians, color: 'text-stone-900', target: 'beauticians' },
    {
      label: 'Completed Revenue',
      val: `₹${stats.completedRevenue.toLocaleString('en-IN')}`,
      color: 'text-[#e03e1a]',
      target: 'reports',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Demo Notice Strip */}
      <div className="bg-white rounded-2xl border border-[#ebdccd] px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <AlertCircle className="w-4 h-4 text-[#e03e1a] shrink-0" />
          <span>
            <strong>Sample Demo Overview:</strong> All figures below reflect local frontend demo records saved in your browser.
          </span>
        </div>
        <span className="text-[11px] font-semibold text-stone-500">
          Updated dynamically from Owner, Beautician &amp; Customer actions
        </span>
      </div>

      {/* 10 Summary Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {summaryCards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={() => onNavigateTab(card.target)}
            className="text-left bg-white rounded-2xl border border-[#ebdccd] p-4 hover:border-[#e03e1a]/50 transition-colors cursor-pointer"
          >
            <div className="text-[11px] font-semibold text-stone-500">{card.label}</div>
            <div className={`text-2xl font-serif font-bold mt-1.5 tabular-nums ${card.color}`}>
              {card.val}
            </div>
          </button>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Bookings Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                7-Day Schedule Volume (Sample Data)
              </h3>
              <p className="text-xs text-stone-500">
                Appointment count and scheduled booking value across nearby dates
              </p>
            </div>
            <BarChart3 className="w-4 h-4 text-[#e03e1a] shrink-0" />
          </div>

          <div className="grid grid-cols-7 gap-2.5 items-end h-44 pt-4 border-b border-stone-100 pb-3">
            {sevenDaySeries.map((day) => {
              const heightPct = day.count === 0 ? 8 : Math.max(22, Math.round((day.count / maxDayCount) * 100));
              const isToday = day.dateStr === todayStr;
              return (
                <div key={day.dateStr} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono font-bold text-stone-700 tabular-nums">
                    {day.count}
                  </span>
                  <div className="w-full max-w-[38px] bg-[#faf7f2] rounded-xl h-28 flex items-end overflow-hidden border border-[#ebdccd]/60">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-lg transition-all ${
                        day.count === 0
                          ? 'bg-stone-200'
                          : isToday
                          ? 'bg-[#e03e1a]'
                          : 'bg-stone-800'
                      }`}
                      title={`${day.label}: ${day.count} bookings (₹${day.revenue})`}
                    />
                  </div>
                  <div className="text-center">
                    <div
                      className={`text-[10px] font-semibold whitespace-nowrap ${
                        isToday ? 'text-[#e03e1a] font-bold' : 'text-stone-500'
                      }`}
                    >
                      {day.label}
                    </div>
                    <div className="text-[9px] font-mono text-stone-400 tabular-nums">
                      ₹{day.revenue}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Booking Status Distribution
              </h3>
              <p className="text-xs text-stone-500">Breakdown of all {allBookings.length} demo bookings</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('reports')}
              className="text-xs font-bold text-[#e03e1a] hover:underline cursor-pointer"
            >
              Full Reports
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {statusDistribution.map((item) => (
              <div key={item.key} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-stone-700">{item.label}</span>
                  <span className="font-mono text-stone-600 tabular-nums">
                    {item.count} ({item.pct}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-[#faf7f2] rounded-full overflow-hidden border border-[#ebdccd]/50">
                  <div
                    className={`h-full rounded-full ${item.barClass}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Split: Pending Requests Queue & Beautician Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Requests Queue */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Pending Appointment Requests ({stats.pending})
              </h3>
              <p className="text-xs text-stone-500">
                Review customer preferences and assign available beauticians
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('requests')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#e03e1a] hover:underline cursor-pointer"
            >
              <span>View Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {pendingQueue.length === 0 ? (
            <div className="py-8 text-center text-xs text-stone-500 bg-[#faf7f2] rounded-2xl border border-[#ebdccd]">
              All pending requests have been reviewed or assigned.
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {pendingQueue.map((b) => (
                <div
                  key={b.id}
                  className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-stone-900">{b.bookingId}</span>
                      <span className="text-stone-400">·</span>
                      <span className="font-bold text-stone-800">{b.customerDetails.fullName}</span>
                      <span className="text-stone-400">·</span>
                      <span className="font-serif font-bold text-[#e03e1a] tabular-nums">
                        ₹{b.totalAmount}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {b.date} · {b.timeSlot} · Preferred: {b.preferredBeauticianName}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onViewDetails(b)}
                      className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onAssignBooking(b)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl cursor-pointer"
                    >
                      Assign Beautician
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Beautician Team Snapshot */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Beautician Team Snapshot
              </h3>
              <p className="text-xs text-stone-500">Demo partner roster &amp; assigned load</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('beauticians')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#e03e1a] hover:underline cursor-pointer"
            >
              <span>Manage Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {teamMembers.map((m) => {
              const assigned = allBookings.filter(
                (b) =>
                  b.assignedBeauticianId === m.id &&
                  ['assigned', 'confirmed', 'in_progress'].includes(b.canonicalStatus)
              ).length;
              const completed = allBookings.filter(
                (b) => b.assignedBeauticianId === m.id && b.canonicalStatus === 'completed'
              ).length;
              return (
                <div key={m.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <PartnerAvatar photo={m.photoUrl} name={m.name} size="sm" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate">{m.name}</div>
                      <div className="text-[11px] text-stone-500 truncate">
                        {m.specialties.slice(0, 2).join(' · ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-[11px] shrink-0">
                    <div className="font-mono font-bold text-stone-800 tabular-nums">
                      {assigned} active / {completed} done
                    </div>
                    <div
                      className={`font-semibold capitalize ${
                        !m.active
                          ? 'text-stone-400'
                          : m.availabilityStatus === 'available'
                          ? 'text-emerald-700'
                          : m.availabilityStatus === 'busy'
                          ? 'text-amber-700'
                          : 'text-red-700'
                      }`}
                    >
                      {!m.active ? 'Inactive' : m.availabilityStatus.replace('_', ' ')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
