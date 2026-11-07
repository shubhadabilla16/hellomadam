import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  CheckSquare, 
  Calendar, 
  Home, 
  ShieldCheck, 
  Package, 
  Zap, 
  Coffee, 
  ArrowRight,
  Video
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-[#ebdccd] pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>Doorstep Salon Experience</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            How Hello Madam Works
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            From easy online scheduling to the moment our certified beautician knocks on your door in Solapur—here is how effortless pampering should feel.
          </p>
        </div>
      </section>

      {/* 2. Step-by-Step Deep Dive */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#ebdccd] shadow-2xs">
            <div className="md:col-span-2 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl font-serif font-bold text-[#f4c8ba] tabular-nums">01</span>
            </div>
            <div className="md:col-span-6 space-y-3">
              <div className="text-xs uppercase tracking-wider font-bold text-[#e03e1a] font-serif">Step One</div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Explore Our Services</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Browse our transparent menu featuring Hydra Facials, rose petal foot spas, hair spa steamers, hair coloring, and waxing. Every service lists exact pricing and duration.
              </p>
            </div>
            <div className="md:col-span-4 bg-[#faf7f2] p-5 rounded-2xl border border-[#ebdccd] text-xs text-stone-600 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#e03e1a]" />
                <span>Transparent Menus</span>
              </div>
              <p>Filter by skin type, category, or budget. Free home travel across Solapur.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#ebdccd] shadow-2xs">
            <div className="md:col-span-2 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl font-serif font-bold text-[#f4c8ba] tabular-nums">02</span>
            </div>
            <div className="md:col-span-6 space-y-3">
              <div className="text-xs uppercase tracking-wider font-bold text-[#e03e1a] font-serif">Step Two</div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Choose Your Beauty Service</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Add one treatment or combine multiple treatments into a custom pampering package. You can edit your cart and see the estimated session length in real time.
              </p>
            </div>
            <div className="md:col-span-4 bg-[#faf7f2] p-5 rounded-2xl border border-[#ebdccd] text-xs text-stone-600 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#e03e1a]" />
                <span>Custom Combos</span>
              </div>
              <p>Tailor services to your schedule—from 35-min touch-ups to full afternoon pampering.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#ebdccd] shadow-2xs">
            <div className="md:col-span-2 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl font-serif font-bold text-[#f4c8ba] tabular-nums">03</span>
            </div>
            <div className="md:col-span-6 space-y-3">
              <div className="text-xs uppercase tracking-wider font-bold text-[#e03e1a] font-serif">Step Three</div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Select Date & Time (10 AM – 5 PM)</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Choose the day and hour that suits you best within our operating hours of 10:00 AM to 5:00 PM. Enter your Solapur address so our beautician can arrive punctually.
              </p>
            </div>
            <div className="md:col-span-4 bg-[#faf7f2] p-5 rounded-2xl border border-[#ebdccd] text-xs text-stone-600 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#e03e1a]" />
                <span>Flexible Slots</span>
              </div>
              <p>Appointments scheduled Monday to Sunday, 10:00 AM – 5:00 PM.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[#ebdccd] shadow-2xs">
            <div className="md:col-span-2 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl font-serif font-bold text-[#f4c8ba] tabular-nums">04</span>
            </div>
            <div className="md:col-span-6 space-y-3">
              <div className="text-xs uppercase tracking-wider font-bold text-[#e03e1a] font-serif">Step Four</div>
              <h3 className="text-2xl font-serif font-bold text-stone-900">Enjoy Your Session at Home</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Sit back in comfort. Our female beautician in Hello Madam uniform arrives with sanitized tools, disposable bedsheets, and premium formulations. After the session, all waste is cleared away.
              </p>
            </div>
            <div className="md:col-span-4 bg-[#faf7f2] p-5 rounded-2xl border border-[#ebdccd] text-xs text-stone-600 space-y-2">
              <div className="font-bold text-stone-900 flex items-center gap-2">
                <Home className="w-4 h-4 text-[#e03e1a]" />
                <span>Zero Mess Left Behind</span>
              </div>
              <p>Every bit of waste is packed and taken away. Your home stays spotless.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. What We Bring vs What You Provide */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#ebdccd]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">
              What to Expect on Appointment Day
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              We bring the entire salon with us. You only provide the comfort of your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* What we bring */}
            <div className="p-8 rounded-3xl bg-[#fef2ee] border border-[#f4c8ba] space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#e03e1a] font-serif">
                <Package className="w-4 h-4" />
                <span>What Our Beautician Brings</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                  <span>Single-use disposable bedsheet & sanitized headbands</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                  <span>Sterilized tweezers, extractors & ice globes</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                  <span>Wax heater with disposable single-use wooden spatulas</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                  <span>Sealed mono-dose skincare & hair spa products</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                  <span>Dedicated waste disposal bag for 100% zero-mess cleanup</span>
                </li>
              </ul>
            </div>

            {/* What customer provides */}
            <div className="p-8 rounded-3xl bg-[#faf7f2] border border-[#ebdccd] space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-stone-800 font-serif">
                <Coffee className="w-4 h-4 text-stone-600" />
                <span>What You Need to Provide</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                <li className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>A standard power socket for wax heater / hair steamer</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>A small basin or bowl with warm water for pedicure / cleanup</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>A comfortable bed, sofa, or chair in a private room</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Your relaxed self ready for 100% serene pampering</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-14 text-center flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Book Appointment Today</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/our-work"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-stone-800 bg-white border border-[#ebdccd] hover:border-[#e03e1a] rounded-full transition-colors"
            >
              <Video className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>Watch Service Videos</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
