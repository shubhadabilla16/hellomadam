import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { useBooking } from '../context/BookingContext';
import { PartnerAvatar } from '../components/PartnerAvatar';

export const BeauticianLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeBeauticianId, setActiveBeauticianId } = useAuth();
  const { teamMembers } = useAdmin();
  const { allBookings } = useBooking();

  const assignedCountByBeautician = useMemo(() => {
    const map: Record<string, { active: number; completed: number }> = {};
    teamMembers.forEach((m) => {
      map[m.id] = { active: 0, completed: 0 };
    });
    allBookings.forEach((b) => {
      if (!b.assignedBeauticianId) return;
      if (!map[b.assignedBeauticianId]) {
        map[b.assignedBeauticianId] = { active: 0, completed: 0 };
      }
      if (['assigned', 'confirmed', 'in_progress'].includes(b.canonicalStatus)) {
        map[b.assignedBeauticianId].active += 1;
      } else if (b.canonicalStatus === 'completed') {
        map[b.assignedBeauticianId].completed += 1;
      }
    });
    return map;
  }, [teamMembers, allBookings]);

  const handleOpenDashboard = (beauticianId: string) => {
    setActiveBeauticianId(beauticianId);
    navigate('/beautician/dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-[#faf7f2] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-8 shadow-xs text-center space-y-3">
          <div className="flex justify-center">
            <img
              src="/assets/aistudio/image_a7f9010e.png"
              alt="Hello Madam Official Brand Logo"
              className="h-14 w-14 rounded-2xl object-contain border border-[#ebdccd] shadow-2xs"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#e03e1a] font-serif">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hello Madam Workforce · Frontend Demo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Select Beautician Partner Profile
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto leading-relaxed">
            Choose any of our beautician partners below to preview her mobile-friendly dashboard, assigned appointments, and schedule availability without logging in.
          </p>
        </div>

        {/* Beautician Profile Switcher Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => {
            const counts = assignedCountByBeautician[member.id] || { active: 0, completed: 0 };
            const isSelected = activeBeauticianId === member.id;

            return (
              <div
                key={member.id}
                className={`bg-white rounded-3xl border p-5 shadow-2xs flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-[#e03e1a] ring-2 ring-[#e03e1a]/15'
                    : 'border-[#ebdccd] hover:border-stone-400'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <PartnerAvatar
                        photo={member.photoUrl || `/assets/partners/${member.id}.jpg`}
                        name={member.name}
                        size="lg"
                      />
                      <div>
                        <h2 className="text-lg font-serif font-bold text-stone-900 leading-tight">
                          {member.name}
                        </h2>
                        <p className="text-[11px] font-mono text-stone-500 mt-0.5">
                          {member.phone} <span className="text-[10px] text-stone-400">(Sample)</span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                        !member.active
                          ? 'bg-stone-200 text-stone-600'
                          : member.availabilityStatus === 'available'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : member.availabilityStatus === 'busy'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-stone-100 text-stone-600 border border-stone-200'
                      }`}
                    >
                      {!member.active
                        ? 'Inactive'
                        : member.availabilityStatus === 'available'
                        ? 'Available'
                        : member.availabilityStatus === 'busy'
                        ? 'Busy'
                        : 'On Leave'}
                    </span>
                  </div>

                  {/* Specializations */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                      Specializations
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.specialties.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="text-[11px] px-2 py-0.5 bg-[#faf7f2] border border-[#ebdccd] rounded-md text-stone-700"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Counts */}
                  <div className="flex items-center justify-between text-xs py-2.5 px-3 bg-[#faf7f2] rounded-2xl border border-[#ebdccd]/80 tabular-nums">
                    <span className="inline-flex items-center gap-1.5 text-stone-600">
                      <Calendar className="w-3.5 h-3.5 text-[#e03e1a]" />
                      <span>Active: <strong className="text-stone-900">{counts.active}</strong></span>
                    </span>
                    <span className="text-stone-300">|</span>
                    <span className="inline-flex items-center gap-1.5 text-stone-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Done: <strong className="text-stone-900">{counts.completed}</strong></span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenDashboard(member.id)}
                  className={`mt-4 w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#e03e1a] hover:bg-[#c93514] text-white shadow-sm'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Open Dashboard as {member.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Info Banner */}
        <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-start sm:items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Frontend Demo Mode:</strong> Each beautician sees only appointments assigned to her. Contact numbers shown are unverified sample placeholders.
            </span>
          </div>
          <Link
            to="/admin"
            className="text-xs font-bold text-[#e03e1a] hover:underline shrink-0 inline-flex items-center gap-1"
          >
            <span>Open Owner Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
