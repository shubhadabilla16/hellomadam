import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Home, 
  ArrowRight, 
  Calendar,
  Phone,
  FileText,
  Search
} from 'lucide-react';
import { ServiceItem } from '../data/servicesData';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { PriceListModal } from '../components/PriceListModal';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { ExploreCategoriesSection } from '../components/ExploreCategoriesSection';
import { PopularServicesSection } from '../components/PopularServicesSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { MeetOurTeamSection } from '../components/MeetOurTeamSection';
import { PackagesSection } from '../components/PackagesSection';
import { OurReelsSection } from '../components/OurReelsSection';
import { CustomerTestimonialsSection } from '../components/CustomerTestimonialsSection';
import { FinalBookingCTA } from '../components/FinalBookingCTA';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const [selectedModalService, setSelectedModalService] = useState<ServiceItem | null>(null);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/services?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/services');
    }
  };

  const quickPicks = [
    { label: 'Facial & Skincare', id: 'facial', emoji: '✨' },
    { label: 'Haircare & Spa', id: 'hair-spa', emoji: '💆‍♀️' },
    { label: 'Waxing', id: 'waxing', emoji: '🍯' },
    { label: 'Threading', id: 'threading', emoji: '✂️' },
    { label: 'Mani & Pedi', id: 'manicure-pedicure', emoji: '💅' },
    { label: 'Bridal Makeover', id: 'bridal', emoji: '👰' },
    { label: 'Clean-up', id: 'clean-up', emoji: '🌸' },
    { label: 'D-Tan', id: 'd-tan', emoji: '☀️' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION
          Headline: "Professional Beauty Services, Right at Your Doorstep."
          Description: "Experience expert beauty care in the comfort of your home. 
          From everyday grooming to luxurious beauty treatments, Hello Madam brings 
          professional salon services directly to you."
          CTAs: "Explore Services" and "Book Appointment"
      ========================================================================= */}
      <section className="relative overflow-hidden bg-[#faf7f2] pt-8 pb-14 sm:pb-20 lg:pt-12 lg:pb-24 border-b border-[#ebdccd]">
        
        {/* Subtle Decorative Floral Background Element */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none -mr-20 -mt-20">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#e03e1a]">
            <path d="M100 20C120 60 160 80 180 100C160 120 120 140 100 180C80 140 40 120 20 100C40 80 80 60 100 20Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
            <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Brand, Headline, Copy, Search, CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Brand Logo & Ladies-Only Tag */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 bg-white py-1.5 px-3 rounded-2xl border border-[#ebdccd] shadow-2xs">
                  <img
                    src="/assets/aistudio/image_a7f9010e.png"
                    alt="Hello Madam Official Brand Logo"
                    className="h-9 w-9 rounded-lg object-contain shadow-2xs"
                  />
                  <span className="font-serif font-black text-lg text-[#e03e1a] tracking-tight">HELLO MADAM</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
                  <Sparkles className="w-4 h-4 text-[#e03e1a]" />
                  <span>{language === 'hi' ? 'केवल महिलाओं के लिए · घर बैठे सैलून' : 'LADIES-ONLY AT-HOME BEAUTY · SOLAPUR'}</span>
                </div>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
                {language === 'hi' ? (
                  <>
                    प्रोफेशनल ब्यूटी सेवाएं, <br />
                    <span className="italic font-normal text-[#e03e1a]">सीधे आपके घर तक।</span>
                  </>
                ) : (
                  <>
                    Professional Beauty Services, <br />
                    <span className="italic font-normal text-[#e03e1a]">Right at Your Doorstep.</span>
                  </>
                )}
              </h1>

              {/* Exact Requested Description */}
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                {language === 'hi'
                  ? 'अपने घर के आराम और निजता में विशेषज्ञ ब्यूटी केयर का अनुभव करें। दैनिक ग्रूमिंग से लेकर शानदार ब्यूटी ट्रीटमेंट्स तक, हैलो मैडम प्रोफेशनल सैलून सेवाएं सीधे आपके घर लाता है।'
                  : 'Experience expert beauty care in the comfort of your home. From everyday grooming to luxurious beauty treatments, Hello Madam brings professional salon services directly to you.'}
              </p>

              {/* Search Box */}
              <form onSubmit={handleHeroSearch} className="max-w-xl relative pt-1">
                <div className="relative flex items-center shadow-md rounded-2xl overflow-hidden border border-[#ebdccd] bg-white focus-within:ring-2 focus-within:ring-[#e03e1a]">
                  <Search className="w-5 h-5 text-stone-400 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search any service: facial, waxing, cleanup, threading..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    className="w-full pl-11 pr-28 py-3.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-4 py-2 bg-[#e03e1a] hover:bg-[#c93514] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick Pick Chips */}
              <div className="pt-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2 font-serif">
                  Quick Category Access
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {quickPicks.map((p) => (
                    <Link
                      key={p.id}
                      to={`/services/${p.id}`}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#fef2ee] border border-[#ebdccd] hover:border-[#f4c8ba] rounded-full text-xs font-semibold text-stone-700 hover:text-[#e03e1a] transition-all shadow-2xs"
                    >
                      <span>{p.emoji}</span>
                      <span>{p.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTAs: Exact "Explore Services" and "Book Appointment" */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/services"
                  className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{language === 'hi' ? 'सेवाएं एक्सप्लोर करें' : 'Explore Services'}</span>
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </Link>

                <Link
                  to="/booking"
                  className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-stone-800 bg-white hover:bg-stone-50 border border-[#ebdccd] hover:border-[#e03e1a] rounded-full transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#e03e1a]" />
                  <span>{language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}</span>
                </Link>

                <button
                  onClick={() => setIsPriceListOpen(true)}
                  className="px-4 py-3.5 text-xs font-bold text-[#e03e1a] hover:text-[#b82e0e] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#e03e1a]" />
                  <span>Rate Card</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#ebdccd]">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-700 font-semibold">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0" />
                    <span>Exclusively Ladies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#e03e1a] shrink-0" />
                    <span>Doorstep Comfort</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#e03e1a] shrink-0" />
                    <span>Single-Use Disposables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#e03e1a] shrink-0" />
                    <span>Zero Travel Fee</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#fef2ee] via-amber-50 to-[#faf7f2] rounded-3xl -rotate-1 pointer-events-none border border-[#ebdccd]" />
                
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ebdccd] aspect-4/3 bg-stone-100">
                  <img
                    src="/src/assets/images/hero_skincare_treatment_1793599854054.jpg"
                    alt="Hello Madam Ladies At-Home Beauty Care in Solapur"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
                  
                  {/* Floating Trust Card with Official Logo */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#ebdccd] shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="/assets/aistudio/image_a7f9010e.png"
                        alt="Hello Madam Brand"
                        className="h-9 w-9 rounded-lg object-contain shadow-2xs border border-[#ebdccd]"
                      />
                      <div className="border-l border-stone-200 pl-2.5">
                        <div className="text-xs font-bold text-stone-900">Navi Peth, Datta Chowk</div>
                        <div className="text-[11px] text-stone-500">10:00 AM – 5:00 PM · Solapur</div>
                      </div>
                    </div>
                    <a
                      href="tel:+919657156795"
                      className="p-2 bg-[#fef2ee] text-[#e03e1a] hover:bg-[#e03e1a] hover:text-white rounded-full transition-colors cursor-pointer"
                      title="Call Hello Madam"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: WHY HELLO MADAM?
          Highlighting: Professional Beauticians, At-Home Convenience, 
          Hygiene & Safety, Quality Beauty Products
      ========================================================================= */}
      <WhyChooseSection />

      {/* =========================================================================
          SECTION 3: EXPLORE OUR SERVICES
          Showcasing 8 main categories with image cards, category name, starting price,
          service count, and Explore button
      ========================================================================= */}
      <ExploreCategoriesSection />

      {/* =========================================================================
          SECTION 4: POPULAR SERVICES
          Curated grid of popular services with image, title, price, duration,
          Add to Cart button, and "View All Services" button
      ========================================================================= */}
      <PopularServicesSection />

      {/* =========================================================================
          SECTION 5: HOW IT WORKS
          4 Steps:
          1. Explore Beauty Services
          2. Select Your Service
          3. Choose Your Preferred Slot
          4. Enjoy Professional Beauty Care at Home
      ========================================================================= */}
      <HowItWorksSection />

      {/* Beautician Partners Showcase: Connects seamlessly with Step 3 */}
      <MeetOurTeamSection />

      {/* =========================================================================
          SECTION 6: SPECIAL PACKAGES
          Real packages from packagesData.ts with custom combo builder & instant booking
      ========================================================================= */}
      <PackagesSection />

      {/* =========================================================================
          SECTION 7: OUR WORK & REAL EXPERIENCES
          "Beauty in Action Across Solapur" with real video footage, inline playback,
          fullscreen player, and sound controls
      ========================================================================= */}
      <OurReelsSection />

      {/* =========================================================================
          SECTION 8: CUSTOMER TESTIMONIALS
          Real verified reviews from Solapur ladies (Mrs. Pranita Amar Pompawar, 
          Priyanka Patil, Snehal Kulkarni, Radhika Deshmukh, Ananya Shinde)
      ========================================================================= */}
      <CustomerTestimonialsSection />

      {/* =========================================================================
          SECTION 9: FINAL BOOKING CTA
          Headline: "Ready to Experience Beauty at Home?"
          Description: "Book your favourite beauty service with Hello Madam..."
          Button: "Book Your Appointment", plus WhatsApp chat option
      ========================================================================= */}
      <FinalBookingCTA />

      {/* Interactive Service Detail Modal */}
      <ServiceDetailModal
        service={selectedModalService}
        onClose={() => setSelectedModalService(null)}
        onSelectService={(s) => setSelectedModalService(s)}
      />

      {/* Official Price List Modal */}
      <PriceListModal
        isOpen={isPriceListOpen}
        onClose={() => setIsPriceListOpen(false)}
      />

    </div>
  );
};
