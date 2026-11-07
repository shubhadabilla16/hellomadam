import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Home, 
  ArrowRight, 
  Calendar,
  MapPin,
  Phone,
  FileText
} from 'lucide-react';
import { ServiceItem } from '../data/servicesData';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { PriceListModal } from '../components/PriceListModal';
import { OurReelsSection } from '../components/OurReelsSection';
import { ExploreCategoriesSection } from '../components/ExploreCategoriesSection';
import { SpecialOffersSection } from '../components/SpecialOffersSection';
import { SpotlightServicesSection } from '../components/SpotlightServicesSection';
import { TopRatedSection } from '../components/TopRatedSection';
import { FeaturedEditorialSection } from '../components/FeaturedEditorialSection';
import { PackagesSection } from '../components/PackagesSection';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { MeetOurTeamSection } from '../components/MeetOurTeamSection';
import { InstagramGallery } from '../components/InstagramGallery';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const [selectedModalService, setSelectedModalService] = useState<ServiceItem | null>(null);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* SECTION 2: OUR REELS (Horizontal promotional video carousel with real client videos) */}
      <OurReelsSection />

      {/* SECTION 3: HERO SECTION (Retain existing premium Hello Madam hero design & headline) */}
      <section className="relative overflow-hidden bg-[#faf7f2] pt-10 pb-16 sm:pb-24 lg:pt-14 lg:pb-28 border-b border-[#ebdccd]">
        
        {/* Subtle Decorative Floral Background Vector */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none -mr-20 -mt-20">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#e03e1a]">
            <path d="M100 20C120 60 160 80 180 100C160 120 120 140 100 180C80 140 40 120 20 100C40 80 80 60 100 20Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
            <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (Content) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Official Brand Logo Badge */}
              <div className="flex flex-wrap items-center gap-3.5">
                <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-[#ebdccd] shadow-2xs inline-flex items-center">
                  <img
                    src="/assets/aistudio/image_031d6967.png"
                    alt="Hello Madam Original Brand Logo"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif">
                  <Sparkles className="w-4 h-4 text-[#e03e1a]" />
                  <span>{t('hero.tag', 'LADIES-ONLY AT-HOME BEAUTY · SOLAPUR')}</span>
                </div>
              </div>

              {/* Exact Requested Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
                {language === 'hi' ? (
                  <>
                    प्रीमियम ब्यूटी केयर, <br />
                    <span className="italic font-normal text-[#e03e1a]">सीधे आपके घर तक।</span>
                  </>
                ) : (
                  <>
                    Premium Beauty Care, <br />
                    <span className="italic font-normal text-[#e03e1a]">Delivered to Your Doorstep.</span>
                  </>
                )}
              </h1>

              {/* Exact Requested Description */}
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                {t(
                  'hero.desc',
                  'Professional beauty and salon services brought to your home. Enjoy personalized care, comfort and confidence with Hello Madam.'
                )}
              </p>

              {/* Buttons: Book a Service & Explore Services */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/book"
                  className="px-7 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>{t('hero.book_btn', 'Book a Service')}</span>
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </Link>

                <Link
                  to="/services"
                  className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-stone-800 bg-white hover:bg-stone-50 border border-[#ebdccd] rounded-full transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span>{t('hero.explore_btn', 'Explore Services')}</span>
                </Link>

                <button
                  onClick={() => setIsPriceListOpen(true)}
                  className="px-5 py-3.5 text-xs font-bold text-[#e03e1a] hover:text-[#b82e0e] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#e03e1a]" />
                  <span>{t('hero.rate_card', 'Official Rate Card')}</span>
                </button>
              </div>

              {/* Official Trust Section */}
              <div className="pt-6 border-t border-[#ebdccd]">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-700 font-semibold">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#e03e1a] shrink-0" />
                    <span>{t('trust.ladies_only', 'Exclusively for Ladies')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-[#e03e1a] shrink-0" />
                    <span>{t('trust.doorstep', 'At-Home Convenience')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#e03e1a] shrink-0" />
                    <span>{t('trust.professional', 'Personalized Care')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#e03e1a] shrink-0" />
                    <span>{t('trust.easy_booking', 'Easy Booking')}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Frame with Official Logo & Treatment Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative background aura */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-[#fef2ee] via-amber-50 to-[#faf7f2] rounded-3xl -rotate-1 pointer-events-none border border-[#ebdccd]" />
                
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ebdccd] aspect-4/3 sm:aspect-4/3 bg-stone-100">
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
                        src="/assets/aistudio/image_031d6967.png"
                        alt="Hello Madam Brand"
                        className="h-8 w-auto object-contain"
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

      {/* Solapur Hub Ribbon */}
      <div className="bg-[#1c1917] text-stone-300 py-3.5 px-4 text-xs border-y border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <span className="flex items-center gap-1.5 text-amber-300 font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>Official Solapur Location:</span>
          </span>
          <span className="text-white font-medium">Navi Peth & Datta Chowk</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>Near June Vitthal Mandir & Mahalakshmi Dudh Dairy</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="text-amber-200">Call / WhatsApp: +91 9657156795</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span>10:00 AM – 5:00 PM (Monday – Sunday)</span>
        </div>
      </div>

      {/* SECTION 4: EXPLORE SALON SERVICES (13 Category-Specific Cards) */}
      <ExploreCategoriesSection />

      {/* SECTION 5: SPECIAL OFFERS (Official Solapur Welcome Privileges & Inclusions) */}
      <SpecialOffersSection />

      {/* SECTION 6: SPOTLIGHT SERVICES (Curated carousel across required 5 categories) */}
      <SpotlightServicesSection onViewDetails={(s) => setSelectedModalService(s)} />

      {/* SECTION 7: TOP RATED SERVICES (Popular services + genuine client quotes) */}
      <TopRatedSection onViewDetails={(s) => setSelectedModalService(s)} />

      {/* SECTION 8: FEATURED SERVICES (Large Editorial Treatments: Premium Facial, Hydra, Korean Glass, etc.) */}
      <FeaturedEditorialSection onViewDetails={(s) => setSelectedModalService(s)} />

      {/* SECTION 9: RECOMMENDED BEAUTY PACKAGES (Approved Combos + Custom Package Builder) */}
      <PackagesSection />

      {/* SECTION 10: WHY CHOOSE HELLO MADAM? (4 Benefit Blocks + Real Team Arrival) */}
      <WhyChooseSection />

      {/* SECTION 11: HOW IT WORKS (4 Clear Steps with Team Review) */}
      <HowItWorksSection />

      {/* SECTION 12: OUR TEAM (Real Uploaded Team Photograph & Exact Copy) */}
      <MeetOurTeamSection />

      {/* SECTION 13: INSTAGRAM GALLERY (@hello_madam_solapur5) */}
      <InstagramGallery />

      {/* Service Detail Modal */}
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
