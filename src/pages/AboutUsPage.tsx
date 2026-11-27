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
  Video,
  Quote
} from 'lucide-react';
import { MeetOurTeamSection } from '../components/MeetOurTeamSection';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      
      {/* 1. Header Banner */}
      <section className="pt-12 pb-16 sm:pb-24 border-b border-[#ebdccd] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center mb-1">
            <img
              src="/assets/aistudio/image_a7f9010e.png"
              alt="Hello Madam Official Brand Logo"
              className="h-14 w-14 rounded-2xl object-contain shadow-md border border-white/60"
            />
          </div>
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
                <strong>Hello Madam</strong> delivers the complete parlour experience directly to your bedroom or living space in Solapur. Our female beauticians arrive on time in uniform with sanitized kits, extension boards, clean disposables, and fresh towels. You relax with music or tea while we take care of the rest.
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

      {/* 2.5 Founder / Owner & Real Team Showcase */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#ebdccd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-[#e03e1a] font-serif">
              Leadership &amp; Care · Solapur
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Meet Our Founder &amp; Team
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Led personally from our Navi Peth studio in Solapur, our founder and trained women beauticians oversee hygiene, product authenticity, and warm hospitality for every home appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* Owner Portrait Card */}
            <div className="bg-[#faf7f2] rounded-3xl border border-[#ebdccd] p-4 shadow-xs flex flex-col">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-stone-100">
                <img
                  src="/assets/aistudio/owner_image_e96116f3.jpeg"
                  alt="Hello Madam Solapur Founder and Owner"
                  className="w-full h-full object-cover object-[50%_18%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-200">
                    Founder &amp; Owner · Navi Peth, Solapur
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                    Geetanjali Patil
                  </h3>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Our founder personally trains every beautician on gentle techniques, single-use sanitation, and attentive client consultation before every session.
                </p>
                <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
                  <span>Direct Helpline</span>
                  <span aria-hidden="true">·</span>
                  <a href="tel:+919657156795" className="font-semibold text-[#e03e1a] hover:underline">
                    +91 9657156795
                  </a>
                </div>
              </div>
            </div>

            {/* Real Team in Action Card */}
            <div className="bg-[#faf7f2] rounded-3xl border border-[#ebdccd] p-4 shadow-xs flex flex-col">
              <div className="relative rounded-2xl overflow-hidden aspect-square bg-stone-100">
                <img
                  src="/assets/aistudio/team_image_95a9ffe8.jpeg"
                  alt="Hello Madam Solapur Owner and Beautician Team"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-200">
                    Dedicated Ladies Team
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                    Hands-On Salon Expertise
                  </h3>
                </div>
              </div>
              <div className="p-4 sm:p-5 space-y-2">
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  From hair care and facial rituals to bridal preparation, our uniformed women specialists bring authentic salon expertise into your home.
                </p>
                <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
                  <span>10:00 AM – 5:00 PM Daily</span>
                  <span aria-hidden="true">·</span>
                  <span>Solapur City</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.75 Founder's Story Letter — Geetanjali Patil */}
      <section className="py-16 sm:py-24 bg-[#faf7f2] border-t border-[#ebdccd]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#ebdccd] shadow-sm overflow-hidden">
            {/* Editorial Header */}
            <div className="px-6 sm:px-12 pt-10 sm:pt-14 pb-8 border-b border-[#ebdccd]/80 bg-gradient-to-b from-[#fef8f4] to-white text-center space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
                <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>Founder&apos;s Note &middot; Two Years of Trust in Solapur</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-snug">
                HELLO MADAM &ndash; A Beautiful Concept Born from a Simple Thought!
              </h2>
            </div>

            {/* Letter Body */}
            <div className="px-6 sm:px-12 py-8 sm:py-12 space-y-7 text-stone-700 text-sm sm:text-base leading-relaxed">
              <div className="space-y-4">
                <p className="font-serif text-base sm:text-lg text-stone-900 leading-relaxed">
                  Every business doesn&apos;t begin with just the intention of earning money. Sometimes, a small thought touches your heart and becomes the beginning of something beautiful.
                </p>
                <p>
                  The journey of <strong>Hello Madam</strong> began with one such thought.
                </p>
                <p>
                  I often heard the same concerns from many of my friends, relatives and women around me&hellip;
                </p>
              </div>

              {/* Voices of Women Callout Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 py-2">
                {[
                  '"I don\'t get time to visit a salon."',
                  '"It\'s difficult to step out of the house because of household responsibilities and children."',
                  '"Sometimes, salon appointments are not available."',
                  '"Even when I get time, there is too much rush."',
                  '"Some women also have their own preferences when it comes to cleanliness and hygiene."',
                ].map((quoteText, idx) => (
                  <div
                    key={idx}
                    className={`bg-[#faf7f2] border border-[#ebdccd] rounded-2xl p-4 flex items-start gap-3 ${
                      idx === 4 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <Quote className="w-4 h-4 text-[#e03e1a] shrink-0 mt-1" />
                    <p className="text-xs sm:text-sm italic text-stone-700 font-serif leading-relaxed">
                      {quoteText}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p>
                  I started noticing these everyday challenges faced by women.
                </p>
                <p>
                  And one day, a simple thought came to my mind&hellip;
                </p>
              </div>

              {/* Turning Point Pull Quote */}
              <blockquote className="border-l-4 border-[#e03e1a] bg-[#fef2ee]/70 rounded-r-2xl px-5 sm:px-7 py-5">
                <p className="text-lg sm:text-xl font-serif font-bold text-stone-900 leading-snug">
                  Why not bring beauty services directly to women&apos;s doorsteps?
                </p>
              </blockquote>

              <div className="space-y-4">
                <p>
                  Initially, I thought about taking a franchise of an established home beauty service from a metro city. However, I was told that this concept might not work in a city like Solapur.
                </p>
                <p>
                  But I strongly believed in one thing&hellip;
                </p>
              </div>

              {/* Solapur Conviction Pull Quote */}
              <div className="bg-[#faf7f2] border border-[#ebdccd] rounded-2xl px-6 py-5 text-center">
                <p className="text-base sm:text-xl font-serif italic font-semibold text-[#e03e1a] leading-snug">
                  If this concept can work in big cities, why can&apos;t it work in our own Solapur?
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  Instead of waiting for a franchise opportunity, I decided to take a step forward with my own experience, confidence and understanding of women&apos;s needs.
                </p>
                <p className="font-serif font-bold text-base sm:text-lg text-stone-900">
                  And that&apos;s how HELLO MADAM HOME SERVICES was born!
                </p>
                <p>
                  For the past two years, we have been bringing professional beauty services right to the doorsteps of women across Solapur.
                </p>
                <p>
                  This journey has been filled with new experiences, challenges, valuable lessons and, most importantly, the trust and love of our customers.
                </p>
                <p>
                  As time changes, customer needs and expectations change too. We continuously adapt our services, timings and working methods to meet those changing expectations.
                </p>
                <p>
                  Because for us, it&apos;s not just about providing a beauty service. It&apos;s about respecting our customers&apos; time, offering convenience, maintaining cleanliness and hygiene, ensuring safety and delivering complete satisfaction.
                </p>
                <p>
                  For me, Hello Madam is not just a business. It is a journey built on trust, convenience and a vision to make women&apos;s lives easier.
                </p>
              </div>

              {/* Gratitude & Signature */}
              <div className="pt-6 border-t border-[#ebdccd] space-y-4">
                <p className="text-stone-800 font-medium">
                  A heartfelt <strong>THANK YOU</strong> to every customer who trusted us, our dedicated team and everyone who encouraged and supported us throughout these two beautiful years!
                </p>
                <p className="italic font-serif text-stone-700">
                  What started as a small thought is now a growing dream&hellip; and this is just the beginning!
                </p>

                <div className="mt-6 pt-6 border-t border-[#ebdccd]/70 flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#faf7f2] rounded-2xl p-5 sm:p-6">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 text-sm font-serif font-bold tracking-wide text-[#e03e1a]">
                      <Heart className="w-4 h-4 fill-[#e03e1a] text-[#e03e1a]" />
                      <span>HELLO MADAM</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-stone-700">
                      Beauty Comes Home. Comfort Comes First.
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-lg font-serif font-bold text-stone-900">
                      &mdash; Geetanjali Patil
                    </p>
                    <p className="text-xs text-stone-500">
                      Founder, Hello Madam Home Services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEET OUR TEAM SECTION WITH BEAUTICIAN PARTNERS */}
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
