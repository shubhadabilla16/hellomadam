import React from 'react';
import { ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const MeetOurTeamSection: React.FC = () => {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>The Hello Madam Family</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Meet the Team Behind Hello Madam.
          </h2>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            A dedicated team bringing beauty, care and comfort to your doorstep.
          </p>
        </div>

        {/* Editorial Team Image & Story Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          
          {/* Real Team Photograph */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#ebdccd] bg-white p-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] bg-stone-100">
                <img
                  src="/assets/aistudio/hello_madam_team_group.jpg"
                  alt="Hello Madam Professional Team in Solapur"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                
                {/* Real Team Tag on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/aistudio/image_031d6967.png"
                      alt="Logo"
                      className="h-7 w-auto object-contain bg-white/95 px-2 py-0.5 rounded-lg"
                    />
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      Official Hello Madam Solapur Team
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#e03e1a] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
                    Verified Staff
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary arrival badge photo strip */}
            <div className="mt-4 flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#ebdccd] shadow-2xs">
              <img
                src="/assets/aistudio/hello_madam_team_arrival.jpg"
                alt="Hello Madam Team arriving at client home"
                className="w-16 h-12 rounded-xl object-cover shrink-0 border border-stone-200"
              />
              <div className="text-xs text-stone-600">
                <strong className="text-stone-900 block">Punctual Doorstep Arrival:</strong>
                Our beauticians arrive in uniform with sealed kits, ready to pamper you.
              </div>
            </div>
          </div>

          {/* Narrative & Commitment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#e03e1a] font-serif">
              Our Professional Care
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
              Trained, Respectful & Exclusively for Ladies
            </h3>

            <p className="text-sm text-stone-600 leading-relaxed">
              Every member of the Hello Madam team shares a common devotion to customer comfort, hospital-grade hygiene, and personalized aesthetic care.
            </p>

            <p className="text-sm text-stone-600 leading-relaxed">
              Whether conducting an advanced Hydra Facial with LED therapy, a soothing floral pedicure, or precise threading, our beauticians treat your home with utmost respect and ensure complete privacy throughout your session.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-stone-700 bg-white p-3.5 rounded-2xl border border-[#ebdccd]">
                <ShieldCheck className="w-5 h-5 text-[#e03e1a] shrink-0" />
                <span>100% women-only staff serving women in Solapur</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-700 bg-white p-3.5 rounded-2xl border border-[#ebdccd]">
                <Heart className="w-5 h-5 text-[#e03e1a] shrink-0" />
                <span>Respectful, patient, and detail-oriented beauticians</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-700 bg-white p-3.5 rounded-2xl border border-[#ebdccd]">
                <CheckCircle2 className="w-5 h-5 text-[#e03e1a] shrink-0" />
                <span>Zero mess policy—every disposable is packed & removed</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
