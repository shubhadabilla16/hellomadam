import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { getFeaturedServices, SERVICES, Service } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { useLanguage } from '../context/LanguageContext';

export const PopularServicesSection: React.FC = () => {
  const { language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const featured = getFeaturedServices();

  // Curated list of popular categories for quick filtering
  const filterTabs = [
    { id: 'all', label: 'All Popular', labelHi: 'सभी लोकप्रिय' },
    { id: 'facial', label: 'Facials', labelHi: 'फेशियल' },
    { id: 'waxing', label: 'Waxing', labelHi: 'वैक्सिंग' },
    { id: 'cleanup', label: 'Clean-up', labelHi: 'क्लीन-अप' },
    { id: 'hair', label: 'Hair Care', labelHi: 'हेयर केयर' },
  ];

  const filteredServices: Service[] = selectedFilter === 'all'
    ? featured.slice(0, 8)
    : SERVICES.filter((s) => {
        if (selectedFilter === 'facial') return s.category === 'facial';
        if (selectedFilter === 'waxing') return s.category.includes('wax') || s.category === 'waxing';
        if (selectedFilter === 'cleanup') return s.category === 'clean-up';
        if (selectedFilter === 'hair') return s.category === 'hair' || s.category === 'hair-spa';
        return true;
      }).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-[#faf7f2] border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
              <Flame className="w-4 h-4 text-[#e03e1a] fill-[#e03e1a]" />
              <span>{language === 'hi' ? 'सबसे लोकप्रिय सेवाएं' : 'Popular Services'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              {language === 'hi' ? 'सोलापुर की महिलाओं की पसंदीदा सेवाएं' : 'Most Booked by Solapur Ladies'}
            </h2>
            <p className="mt-3 text-sm text-stone-600 max-w-xl leading-relaxed">
              {language === 'hi'
                ? 'हमारे क्लाइंट्स द्वारा सबसे ज्यादा बुक की जाने वाली प्रामाणिक ब्यूटी सेवाएं। पारदर्शी दरें और शून्य यात्रा शुल्क।'
                : 'Our most requested home treatments, backed by 100% single-use disposable kits and zero travel fee.'}
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filterTabs.map((tab) => {
              const active = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#e03e1a] text-white shadow-xs'
                      : 'bg-white text-stone-700 hover:text-[#e03e1a] border border-[#ebdccd]'
                  }`}
                >
                  {language === 'hi' ? tab.labelHi : tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white hover:bg-stone-50 text-stone-900 hover:text-[#e03e1a] border border-[#ebdccd] hover:border-[#e03e1a] rounded-full text-xs font-bold uppercase tracking-wider shadow-2xs hover:shadow-md transition-all cursor-pointer group"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>{language === 'hi' ? 'सभी 91 सेवाएं देखें' : 'View All Services (91 Treatments)'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};
