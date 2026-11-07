import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Home, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Video
} from 'lucide-react';
import { MeetOurTeamSection } from '../components/MeetOurTeamSection';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      
      {/* 1. Header Banner */}
      <section className="pt-12 pb-16 sm:pb-24 border-b border-[#ebdccd] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>Hello Madam Solapur</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            More Than Beauty. <br />
            <span className="italic font-normal text-[#e03e1a]">It's About You.</span>
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Bringing professional parlour and salon care directly to your doorstep in Solapur, because every woman deserves dedicated time for her well-being in total comfort and dignity.
          </p>
        </div>
      </section>

      {/* 2. Story & Approach Split */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ebdccd] aspect-4/3 bg-stone-100">
                <img
                  src="/src/assets/images/about_beautician_care_1793599856776.jpg"
                  alt="Hello Madam Beautician with sanitized kit in Solapur"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#ebdccd]">
                  <div className="text-xs font-bold text-stone-900">Clinical Hygiene Priority</div>
                  <div className="text-[11px] text-stone-600">Sanitized stainless tools & single-use disposables</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="text-xs uppercase tracking-wider font-bold text-[#e03e1a] font-serif">
                Our Approach to Beauty & Care
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Doorstep Convenience Designed Exclusively for Women
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                Visiting traditional parlours often means rushing through traffic, finding parking in crowded markets, and waiting in busy reception lobbies. 
              </p>

              <p className="text-sm text-stone-600 leading-relaxed">
                **Hello Madam** delivers the complete parlour experience directly to your bedroom or living space in Solapur. Our female beauticians arrive on time in uniform with sanitized kits, extension boards, clean disposables, and fresh towels. You relax with music or tea while we take care of the rest.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#ebdccd]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#e03e1a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Exclusively for Ladies</h4>
                    <p className="text-xs text-stone-500 mt-0.5">Strict women-only service ensuring absolute peace of mind.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#e03e1a] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Zero Mess Cleanliness</h4>
                    <p className="text-xs text-stone-500 mt-0.5">We take away all used disposables, leaving your home immaculate.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. MEET OUR TEAM SECTION WITH REAL PHOTOGRAPH */}
      <MeetOurTeamSection />

      {/* 4. Core Pillars */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#ebdccd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-wider font-bold text-[#e03e1a] mb-2 font-serif">
              Our Core Pillars
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Why Solapur Women Trust Hello Madam
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl bg-[#faf7f2] border border-[#ebdccd] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Client Comfort & Safety
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Before commencing any treatment, our beautician inquires about your skin type and known allergies. We use sterile single-use disposable bedsheets and fresh wax spatulas for every client.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#faf7f2] border border-[#ebdccd] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Salon Quality at Home
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                From Hydra Facial equipment with blue LED therapy to ultrasonic scrubbers and portable hair steamer hoods—enjoy modern equipment without leaving your home.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#faf7f2] border border-[#ebdccd] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Transparent & Honest
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                No hidden home travel fees across Solapur. What you see on our menu is what you pay. Pay comfortably after the service via UPI or cash.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Solapur Hub & Official Location */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#1c1917] text-white shadow-xl relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-wider font-bold">
                <MapPin className="w-4 h-4 text-[#e03e1a]" />
                <span>Navi Peth & Datta Chowk Base</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Located in Navi Peth, Serving Homes Across Solapur
              </h2>

              <p className="text-sm text-stone-300 max-w-2xl leading-relaxed">
                Headquartered in Navi Peth near June Vitthal Mandir, Mahalakshmi Dudh Dairy, and Nikon Camera, our teams travel across all residential localities in Solapur daily from 10:00 AM to 5:00 PM.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/book"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Book At-Home Service</span>
                </Link>

                <Link
                  to="/our-work"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-stone-300 hover:text-white bg-stone-800 rounded-full transition-colors flex items-center gap-2"
                >
                  <Video className="w-3.5 h-3.5 text-[#e03e1a]" />
                  <span>Watch Service Videos</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
