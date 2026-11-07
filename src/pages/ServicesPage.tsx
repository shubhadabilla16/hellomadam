import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight, 
  SlidersHorizontal, 
  Video, 
  FileText, 
  Clock, 
  Check, 
  Plus, 
  Trash2,
  Info
} from 'lucide-react';
import { CATEGORIES, ServiceItem } from '../data/servicesData';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { PriceListModal } from '../components/PriceListModal';
import { useBooking } from '../context/BookingContext';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

export const ServicesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const { services } = useAdmin();
  const { selectedServices, totalAmount, toggleService, removeService, isSelected } = useBooking();
  const { t, language } = useLanguage();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter & Search Logic
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (service.subcategory && service.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return 0;
    });
  }, [services, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-[#ebdccd] pt-10 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase mb-2 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>{language === 'hi' ? 'ऑफिशियल मूल्य सूची · सोलापूर' : 'Official Price Catalogue · Solapur'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
                {language === 'hi' ? 'हमारी सेवाएं एवं रेट कार्ड' : 'Our Services & Price List'}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
                {language === 'hi'
                  ? 'हेलो मैडम की सभी आधिकारिक सेवाएं। पारदर्शी दरें, प्रमाणित महिला ब्यूटीशियन और घर तक 100% सिंगल-यूज़ डिस्पोजेबल किट।'
                  : 'Official pricing directly from Hello Madam. Transparent rates, verified female beauticians, and 100% single-use disposable kits delivered to your doorstep in Solapur.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setIsPriceListOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-stone-900 bg-[#fef2ee] hover:bg-[#fae4dc] border border-[#f4c8ba] rounded-full transition-colors cursor-pointer shadow-2xs"
              >
                <FileText className="w-4 h-4 text-[#e03e1a]" />
                <span>View Full Rate Card Table</span>
              </button>

              <Link
                to="/our-work"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-[#ebdccd] rounded-full transition-colors"
              >
                <Video className="w-4 h-4 text-[#e03e1a]" />
                <span>Watch Videos</span>
              </Link>
            </div>
          </div>

          {/* Search & Sort Controls Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search threading, Rica wax, Hydra facial, hair spa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 focus:border-[#e03e1a] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-stone-400 hidden sm:inline" />
              <label htmlFor="sort-services" className="text-xs text-stone-500 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-services"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs font-medium text-stone-700 bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 focus:border-[#e03e1a] cursor-pointer"
              >
                <option value="featured">Featured & Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#e03e1a] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs text-stone-500 font-medium">
              Showing <span className="font-bold text-stone-800 tabular-nums">{filteredServices.length}</span> official services
              {selectedCategory !== 'all' && (
                <span> in <span className="font-bold text-[#e03e1a]">{CATEGORIES.find(c => c.id === selectedCategory)?.label}</span></span>
              )}
            </div>

            {selectedServices.length > 0 && (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-xs text-stone-600">
                  <span className="font-bold text-stone-900">{selectedServices.length}</span> selected (₹{totalAmount.toLocaleString('en-IN')})
                </span>
                <Link
                  to="/book"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Book Appointment</span>
                </Link>
              </div>
            )}
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#ebdccd]">
              <p className="text-base font-serif font-bold text-stone-800">No services match your search</p>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                Try searching for something else like "Eyebrow", "Rica Wax", "Hydra", or reset filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => {
                const active = isSelected(service.id);
                return (
                  <div
                    key={service.id}
                    className="group flex flex-col bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-60" />

                      {service.subcategory && (
                        <div className="absolute top-3 left-3 bg-stone-900/90 text-amber-200 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-xs">
                          {service.subcategory}
                        </div>
                      )}

                      {service.featuredInVideo && !service.subcategory && (
                        <div className="absolute top-3 left-3 bg-[#e03e1a]/95 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-xs">
                          Featured in Video
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="flex-1 flex flex-col p-6">
                      <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1.5">
                        <span className="text-[#e03e1a] font-bold uppercase tracking-wider text-[11px]">
                          {service.categoryLabel}
                        </span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="flex items-center gap-1 text-stone-500">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          <span>{service.duration}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-serif font-bold text-stone-900 leading-snug line-clamp-2 min-h-11">
                        {service.name}
                      </h3>

                      <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed flex-1">
                        {service.description}
                      </p>

                      {/* Price & Action */}
                      <div className="mt-5 pt-4 border-t border-[#ebdccd]/80 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] text-stone-400 block font-serif uppercase">
                            Official Rate
                          </span>
                          <span className="text-base sm:text-lg font-bold text-stone-900 tabular-nums font-serif">
                            {service.priceDisplay || `₹${service.price.toLocaleString('en-IN')}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setActiveModalService(service)}
                            className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                            title="View details"
                          >
                            <Info className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => toggleService(service)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                              active
                                ? 'bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba] shadow-2xs'
                                : 'bg-stone-900 text-white hover:bg-[#e03e1a] shadow-2xs'
                            }`}
                          >
                            {active ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#e03e1a]" />
                                <span>Selected</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5 text-amber-300" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 3. STICKY BOOKING SUMMARY DRAWER & BAR */}
      {selectedServices.length > 0 && (
        <div className="sticky bottom-6 z-30 max-w-2xl mx-auto px-4 w-full">
          <div className="bg-[#1c1917] text-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-stone-700 space-y-3">
            
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#fef2ee]/15 text-amber-300 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span>{selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'} Selected</span>
                    <button
                      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                      className="text-[11px] text-amber-300 underline font-medium hover:text-white cursor-pointer"
                    >
                      {isDrawerOpen ? 'Hide List' : 'View Itemized List'}
                    </button>
                  </div>
                  <div className="text-xs text-stone-300 tabular-nums">
                    Total Estimated Amount: <span className="font-bold text-amber-300 font-serif text-sm">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/book"
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all flex items-center gap-2 shadow-sm shrink-0"
              >
                <span>Continue to Booking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Expandable Itemized List */}
            {isDrawerOpen && (
              <div className="pt-3 border-t border-stone-800 max-h-48 overflow-y-auto space-y-2 pr-1">
                {selectedServices.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-stone-900/80"
                  >
                    <span className="text-stone-200 truncate pr-2">{s.name}</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="tabular-nums font-bold text-amber-300">
                        {s.priceDisplay || `₹${s.price.toLocaleString('en-IN')}`}
                      </span>
                      <button
                        onClick={() => removeService(s.id)}
                        className="text-stone-400 hover:text-red-400 p-0.5 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onSelectService={(s) => setActiveModalService(s)}
      />

      {/* Full Official Price List Modal */}
      <PriceListModal
        isOpen={isPriceListOpen}
        onClose={() => setIsPriceListOpen(false)}
      />

    </div>
  );
};
