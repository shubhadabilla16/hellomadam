import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BadgeCheck, Clock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { PartnerAvatar } from './PartnerAvatar';

export const MeetOurTeamSection: React.FC = () => {
  const { publicBeauticians } = useAdmin();
  const activePartners = publicBeauticians.filter((p) => p.active);

  return (
    <section className="py-20 sm:py-28 bg-[#faf7f2] border-t border-[#ebdccd] relative overflow-hidden">
      
      {/* Subtle floral decorative vectors matching the logo */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-15 pointer-events-none -ml-16 -mt-16">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#e03e1a]">
          <path d="M100 20C120 60 160 80 180 100C160 120 120 140 100 180C80 140 40 120 20 100C40 80 80 60 100 20Z" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-72 h-72 opacity-15 pointer-events-none -mr-20 -mb-20">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#c89b3c]">
          <path d="M100 20C120 60 160 80 180 100C160 120 120 140 100 180C80 140 40 120 20 100C40 80 80 60 100 20Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>The Hello Madam Family</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Meet Our Beautician Partners
          </h2>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Friendly, trained women beauticians delivering premium salon treatments to your doorstep in Solapur.
          </p>
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {activePartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-3xl border border-[#ebdccd] p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between text-center group"
            >
              <div>
                {/* Photo */}
                <div className="flex justify-center mb-3.5">
                  <PartnerAvatar
                    photo={partner.photoUrl || `/assets/partners/${partner.id}.jpg`}
                    name={partner.name}
                    size="xl"
                    className="w-24 h-24 sm:w-28 sm:h-28 group-hover:scale-105 transition-transform duration-300 ring-2 ring-[#ebdccd] group-hover:ring-[#e03e1a]"
                  />
                </div>

                {/* Name + Verification */}
                <div className="flex items-center justify-center gap-1">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {partner.name}
                  </h3>
                  {partner.isVerified && (
                    <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </div>

                {/* Availability & Contact (Verified phone only when owner-verified) */}
                <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                  <Clock className="w-3 h-3 text-[#e03e1a]" />
                  <span>
                    {partner.isVerified && partner.verifiedPhone
                      ? partner.verifiedPhone
                      : `${partner.workingHoursStart || '10:00 AM'} – ${partner.workingHoursEnd || '05:00 PM'}`}
                  </span>
                </div>

                <div className="mt-1.5">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      partner.availabilityStatus === 'available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : partner.availabilityStatus === 'busy'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {partner.availabilityStatus === 'available'
                      ? 'Available for Booking'
                      : partner.availabilityStatus === 'busy'
                      ? 'Limited Slots'
                      : 'On Leave'}
                  </span>
                </div>

                {/* Specialties */}
                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {partner.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#faf7f2] text-stone-700 border border-[#ebdccd]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book with <Name> CTA */}
              <div className="mt-5 pt-3 border-t border-[#ebdccd]/80">
                <Link
                  to={`/booking?partner=${partner.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#e03e1a] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#c93514] active:scale-95 transition-all"
                >
                  <span>Book with {partner.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
