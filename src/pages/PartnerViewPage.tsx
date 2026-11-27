import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Lock,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { PartnerAvatar } from '../components/PartnerAvatar';

export const PartnerViewPage: React.FC = () => {
  const { publicBeauticians, availabilityRecords } = useAdmin();

  const activeBeauticians = useMemo(
    () => publicBeauticians.filter((p) => p.active),
    [publicBeauticians]
  );

  const todayStr = new Date().toISOString().split('T')[0];

  const getAvailabilityBadge = (
    beauticianId: string,
    availabilityStatus: string
  ) => {
    const rec = availabilityRecords.find(
      (r) => r.beauticianId === beauticianId && r.date === todayStr
    );
    const isOffToday = Boolean(rec?.isDayOff);

    if (availabilityStatus === 'on_leave' || isOffToday) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-semibold border border-stone-200">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
          <span>On Leave Today</span>
        </span>
      );
    }
    if (availabilityStatus === 'busy') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Limited Slots Today</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Available Today</span>
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Top Banner: Beautician Partners Showcase + Partner Portal CTA */}
        <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef2ee] border border-[#f4c8ba] text-[11px] font-bold uppercase tracking-wider text-[#e03e1a]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hello Madam · Ladies-Only Beautician Team</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Our Beautician Partners
            </h1>
            <p className="text-sm text-stone-600 leading-relaxed">
              Meet our trained female beauticians serving Solapur homes. Select your preferred specialist when requesting an appointment, or leave assignment to our Owner coordinator.
            </p>
          </div>

          <div className="bg-[#faf7f2] border border-[#ebdccd] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                <Lock className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>Are you a Beautician Partner?</span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Sign in with your invited account to view your assigned bookings &amp; manage availability.
              </p>
            </div>
            <Link
              to="/beautician/login"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#e03e1a] hover:bg-[#b82e0e] text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap shadow-xs"
            >
              <span>Partner Portal Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Beautician Cards Grid */}
        {activeBeauticians.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#ebdccd] p-12 text-center shadow-xs">
            <Sparkles className="w-8 h-8 text-[#e03e1a] mx-auto mb-3" />
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Our team schedule is updating
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              You can still request any service and our coordinator will assign a beautician promptly.
            </p>
            <Link
              to="/booking"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#e03e1a] text-white text-xs font-bold rounded-xl hover:bg-[#b82e0e]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeBeauticians.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-xs flex flex-col justify-between gap-5 hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <PartnerAvatar
                        photo={partner.photoUrl}
                        name={partner.name}
                        size="lg"
                      />
                      <div>
                        <h2 className="text-xl font-serif font-bold text-stone-900">
                          {partner.name}
                        </h2>
                        <div className="mt-1">
                          {getAvailabilityBadge(
                            partner.id,
                            partner.availabilityStatus
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1.5">
                      Specialties
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(partner.specialties || []).map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#faf7f2] text-stone-700 border border-[#ebdccd]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Working schedule */}
                  <div className="text-xs text-stone-600 space-y-1.5 pt-2 border-t border-[#ebdccd]/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#e03e1a]" />
                      <span>
                        {partner.workingHoursStart || '10:00'} –{' '}
                        {partner.workingHoursEnd || '17:00'}
                      </span>
                    </div>
                    {partner.workingDays && partner.workingDays.length > 0 && (
                      <div className="text-[11px] text-stone-500">
                        Working days: {partner.workingDays.join(', ')}
                      </div>
                    )}
                    {partner.isVerified && partner.verifiedPhone && (
                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href={`tel:${partner.verifiedPhone.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-1 font-semibold text-[#e03e1a] hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{partner.verifiedPhone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${partner.verifiedPhone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-700 hover:underline font-medium"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  to={`/booking?partner=${encodeURIComponent(partner.id)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#e03e1a] hover:bg-[#b82e0e] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Book with {partner.name}</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
