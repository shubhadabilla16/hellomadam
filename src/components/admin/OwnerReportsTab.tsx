import React, { useState, useMemo } from 'react';
import { BarChart3, AlertCircle } from 'lucide-react';
import { ConfirmedBooking } from '../../context/BookingContext';
import { TeamMember } from '../../types/management';

interface OwnerReportsTabProps {
  allBookings: ConfirmedBooking[];
  teamMembers: TeamMember[];
}

export const OwnerReportsTab: React.FC<OwnerReportsTabProps> = ({
  allBookings,
  teamMembers,
}) => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'all'>('all');
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredByPeriod = useMemo(() => {
    const now = new Date();
    return allBookings.filter((b) => {
      if (period === 'all') return true;
      if (period === 'daily') return b.date === todayStr;
      const bDate = new Date(b.date + 'T00:00:00');
      const diffDays = Math.abs((now.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));
      if (period === 'weekly') return diffDays <= 7;
      return diffDays <= 30;
    });
  }, [allBookings, period, todayStr]);

  const metrics = useMemo(() => {
    const completed = filteredByPeriod.filter((b) => b.canonicalStatus === 'completed');
    const cancelled = filteredByPeriod.filter((b) => b.canonicalStatus === 'cancelled');
    const activePipeline = filteredByPeriod.filter((b) =>
      ['pending', 'confirmed', 'assigned', 'in_progress'].includes(b.canonicalStatus)
    );

    const completedRevenue = completed.reduce((s, b) => s + b.totalAmount, 0);
    const pendingPipeline = activePipeline.reduce((s, b) => s + b.totalAmount, 0);

    // Most popular services across non-cancelled bookings
    const svcMap = new Map<string, { name: string; count: number; revenue: number }>();
    filteredByPeriod
      .filter((b) => b.canonicalStatus !== 'cancelled')
      .forEach((b) => {
        b.services.forEach((s) => {
          const prev = svcMap.get(s.name) || { name: s.name, count: 0, revenue: 0 };
          prev.count += 1;
          prev.revenue += Number(s.price || 0);
          svcMap.set(s.name, prev);
        });
      });

    const popularServices = Array.from(svcMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const byBeautician = teamMembers.map((m) => {
      const mBookings = filteredByPeriod.filter((b) => b.assignedBeauticianId === m.id);
      const mCompleted = mBookings.filter((b) => b.canonicalStatus === 'completed');
      return {
        id: m.id,
        name: m.name,
        assigned: mBookings.length,
        completed: mCompleted.length,
        revenue: mCompleted.reduce((s, b) => s + b.totalAmount, 0),
      };
    });

    const total = Math.max(filteredByPeriod.length, 1);
    const statusBreakdown = [
      {
        label: 'Completed',
        count: completed.length,
        pct: Math.round((completed.length / total) * 100),
        color: 'bg-blue-600',
      },
      {
        label: 'Assigned / In Progress',
        count: filteredByPeriod.filter((b) =>
          ['assigned', 'in_progress'].includes(b.canonicalStatus)
        ).length,
        pct: Math.round(
          (filteredByPeriod.filter((b) =>
            ['assigned', 'in_progress'].includes(b.canonicalStatus)
          ).length /
            total) *
            100
        ),
        color: 'bg-emerald-600',
      },
      {
        label: 'Pending / Confirmed',
        count: filteredByPeriod.filter((b) =>
          ['pending', 'confirmed'].includes(b.canonicalStatus)
        ).length,
        pct: Math.round(
          (filteredByPeriod.filter((b) =>
            ['pending', 'confirmed'].includes(b.canonicalStatus)
          ).length /
            total) *
            100
        ),
        color: 'bg-amber-500',
      },
      {
        label: 'Cancelled',
        count: cancelled.length,
        pct: Math.round((cancelled.length / total) * 100),
        color: 'bg-red-500',
      },
    ];

    return {
      totalBookings: filteredByPeriod.length,
      completedCount: completed.length,
      cancelledCount: cancelled.length,
      completedRevenue,
      pendingPipeline,
      popularServices,
      byBeautician,
      statusBreakdown,
    };
  }, [filteredByPeriod, teamMembers]);

  const maxSvcCount = Math.max(...metrics.popularServices.map((s) => s.count), 1);
  const maxBeauticianCompleted = Math.max(
    ...metrics.byBeautician.map((b) => Math.max(b.completed, b.assigned)),
    1
  );

  return (
    <div className="space-y-6">
      {/* Header + Period Filter */}
      <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Revenue &amp; Performance Analytics
            </h2>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-lg">
              Sample Demo Data
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Sample frontend analytics generated from local demo bookings. Realized revenue reflects Completed appointments only.
          </p>
        </div>

        <div className="inline-flex items-center gap-1 bg-[#faf7f2] p-1 rounded-2xl border border-[#ebdccd] text-xs">
          {(
            [
              { id: 'daily', label: 'Daily' },
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' },
              { id: 'all', label: 'All Demo' },
            ] as const
          ).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={`px-3.5 py-1.5 rounded-xl font-bold cursor-pointer transition-colors ${
                period === p.id ? 'bg-[#e03e1a] text-white' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-[#ebdccd] p-5">
          <div className="text-[11px] font-bold uppercase text-stone-400">
            Sample Completed Revenue
          </div>
          <div className="text-2xl font-serif font-bold text-[#e03e1a] mt-1 tabular-nums">
            ₹{metrics.completedRevenue.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#ebdccd] p-5">
          <div className="text-[11px] font-bold uppercase text-stone-400">
            Active Pipeline Value
          </div>
          <div className="text-2xl font-serif font-bold text-stone-800 mt-1 tabular-nums">
            ₹{metrics.pendingPipeline.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#ebdccd] p-5">
          <div className="text-[11px] font-bold uppercase text-stone-400">
            Completed / Total Bookings
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-700 mt-1 tabular-nums">
            {metrics.completedCount} / {metrics.totalBookings}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#ebdccd] p-5">
          <div className="text-[11px] font-bold uppercase text-stone-400">Cancellations</div>
          <div className="text-2xl font-serif font-bold text-red-700 mt-1 tabular-nums">
            {metrics.cancelledCount}
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Popular Services Bar Chart */}
        <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Most Popular Services (Sample)
              </h3>
              <p className="text-xs text-stone-500">Top requested treatments in selected window</p>
            </div>
            <BarChart3 className="w-4 h-4 text-[#e03e1a]" />
          </div>

          {metrics.popularServices.length === 0 ? (
            <div className="py-10 text-center text-xs text-stone-400">
              No demo bookings in this period.
            </div>
          ) : (
            <div className="space-y-3">
              {metrics.popularServices.map((svc) => (
                <div key={svc.name} className="space-y-1 text-xs">
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold text-stone-800 truncate">{svc.name}</span>
                    <span className="font-mono text-stone-600 tabular-nums shrink-0">
                      {svc.count} bookings · ₹{svc.revenue.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-[#faf7f2] rounded-full overflow-hidden border border-[#ebdccd]/50">
                    <div
                      className="h-full bg-[#e03e1a] rounded-full"
                      style={{ width: `${Math.round((svc.count / maxSvcCount) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Status Distribution */}
        <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Booking Status Distribution (Sample)
              </h3>
              <p className="text-xs text-stone-500">Proportional share across lifecycle stages</p>
            </div>
          </div>

          <div className="space-y-3.5 pt-1">
            {metrics.statusBreakdown.map((st) => (
              <div key={st.label} className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-stone-800">{st.label}</span>
                  <span className="font-mono text-stone-600 tabular-nums">
                    {st.count} ({st.pct}%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-[#faf7f2] rounded-full overflow-hidden border border-[#ebdccd]/50">
                  <div
                    className={`h-full rounded-full ${st.color}`}
                    style={{ width: `${st.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beautician-wise Completed Appointments Chart + Table */}
      <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-serif font-bold text-stone-900">
              Beautician-Wise Completed Appointments (Sample Data)
            </h3>
            <p className="text-xs text-stone-500">
              Comparing assigned workload vs. completed treatments per demo partner
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-stone-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-stone-300" /> Assigned
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" /> Completed
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Visual Bars */}
          <div className="space-y-3">
            {metrics.byBeautician.map((b) => (
              <div key={b.id} className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-stone-800">{b.name}</span>
                  <span className="font-mono text-stone-600 tabular-nums">
                    {b.completed} completed / {b.assigned} assigned
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-stone-400 rounded-full"
                      style={{
                        width: `${Math.round((b.assigned / maxBeauticianCompleted) * 100)}%`,
                      }}
                    />
                  </div>
                  <div className="h-2 w-full bg-emerald-50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{
                        width: `${Math.round((b.completed / maxBeauticianCompleted) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Numeric Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#ebdccd] text-stone-500 font-serif">
                <tr>
                  <th className="py-2">Beautician</th>
                  <th className="py-2 text-center">Assigned</th>
                  <th className="py-2 text-center">Completed</th>
                  <th className="py-2 text-right">Sample Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {metrics.byBeautician.map((row) => (
                  <tr key={row.id}>
                    <td className="py-2.5 font-bold text-stone-900">{row.name}</td>
                    <td className="py-2.5 text-center font-mono tabular-nums">{row.assigned}</td>
                    <td className="py-2.5 text-center font-mono font-bold text-emerald-700 tabular-nums">
                      {row.completed}
                    </td>
                    <td className="py-2.5 text-right font-serif font-bold text-[#e03e1a] tabular-nums">
                      ₹{row.revenue.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-500">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Note: All report figures reflect interactive local demo records only.</span>
        </div>
      </div>
    </div>
  );
};
