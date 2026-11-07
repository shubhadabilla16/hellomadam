import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, CheckCircle2, ArrowRight, Layers, Plus, Trash2, Clock } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';
import { BeautyPackage, getPackageDetails } from '../data/packagesData';
import { ServiceItem } from '../data/servicesData';

export const PackagesSection: React.FC = () => {
  const { packages, services } = useAdmin();
  const { addPackageToCart, addService } = useBooking();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [selectedPackageForModal, setSelectedPackageForModal] = useState<BeautyPackage | null>(null);
  
  // Custom package builder state
  const [customPackageItems, setCustomPackageItems] = useState<ServiceItem[]>([]);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);

  const officialPackages = packages.filter((p) => p.isOfficialOffer);

  const handleBookPackage = (pkg: BeautyPackage) => {
    addPackageToCart(pkg, services);
    navigate('/book');
  };

  const toggleCustomItem = (service: ServiceItem) => {
    if (customPackageItems.some((i) => i.id === service.id)) {
      setCustomPackageItems((prev) => prev.filter((i) => i.id !== service.id));
    } else {
      setCustomPackageItems((prev) => [...prev, service]);
    }
  };

  const customTotal = customPackageItems.reduce((sum, item) => sum + item.price, 0);
  const customEstimatedMins = customPackageItems.reduce((sum, item) => {
    const match = item.duration.match(/\d+/);
    return sum + (match ? parseInt(match[0], 10) : 40);
  }, 0);

  const handleBookCustomPackage = () => {
    customPackageItems.forEach((item) => addService(item));
    navigate('/book');
  };

  return (
    <section id="packages" className="py-20 sm:py-28 bg-white border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>{t('section.packages_title', 'Recommended Beauty Packages')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              {language === 'hi' ? 'परफेक्ट ब्यूटी कॉम्बो पैकेजेस' : 'Thoughtfully Paired Rituals'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-xl">
              {language === 'hi'
                ? 'मालिक द्वारा अनुमोदित पारदर्शी पैकेज। बिल्कुल वही सेवाएं और वास्तविक जोड़ जो आप चुनते हैं।'
                : 'Approved owner combinations with itemized breakdowns and calculated genuine savings.'}
            </p>
          </div>

          <button
            onClick={() => setShowCustomBuilder(!showCustomBuilder)}
            className="px-5 py-2.5 text-xs font-bold text-[#e03e1a] bg-[#fef2ee] hover:bg-[#fae4dc] border border-[#f4c8ba] rounded-full transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>{showCustomBuilder ? 'Hide Custom Builder' : 'Build Custom Package'}</span>
          </button>
        </div>

        {/* Custom Package Builder Interactive Drawer */}
        {showCustomBuilder && (
          <div className="mb-14 p-6 sm:p-8 bg-[#faf7f2] rounded-3xl border border-[#f4c8ba] animate-in fade-in duration-200">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    {language === 'hi' ? 'अपना खुद का कस्टम पैकेज बनाएं' : 'Create Your Own Custom Ritual'}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    Select 2 or more treatments from our official catalogue to calculate combined duration and total.
                  </p>
                </div>

                {/* Quick Add Pills from Popular Services */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase text-stone-500 tracking-wider font-serif">
                    Quick Select Popular Services:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {services.slice(0, 10).map((service) => {
                      const isAdded = customPackageItems.some((i) => i.id === service.id);
                      return (
                        <button
                          key={service.id}
                          onClick={() => toggleCustomItem(service)}
                          className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                            isAdded
                              ? 'bg-[#e03e1a] text-white shadow-2xs'
                              : 'bg-white border border-[#ebdccd] text-stone-800 hover:bg-stone-50'
                          }`}
                        >
                          {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-[#e03e1a]" />}
                          <span>{service.name} (₹{service.price})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Custom Summary Box */}
              <div className="w-full lg:w-80 bg-white p-5 rounded-2xl border border-[#ebdccd] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <span className="text-xs font-serif font-bold text-stone-900">
                    Custom Package ({customPackageItems.length} items)
                  </span>
                  {customPackageItems.length > 0 && (
                    <button
                      onClick={() => setCustomPackageItems([])}
                      className="text-[11px] text-red-600 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {customPackageItems.length === 0 ? (
                  <p className="text-xs text-stone-400 italic py-2">
                    Click any service above to add it to your custom bundle.
                  </p>
                ) : (
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {customPackageItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs text-stone-700">
                        <span className="truncate pr-2">{item.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="tabular-nums font-bold">₹{item.price}</span>
                          <button
                            onClick={() => toggleCustomItem(item)}
                            className="text-stone-400 hover:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-stone-100 space-y-1">
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Est. Time:</span>
                    <span>~{customEstimatedMins} mins</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900">
                    <span>Calculated Total:</span>
                    <span className="text-base text-[#e03e1a] font-serif tabular-nums">
                      ₹{customTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  disabled={customPackageItems.length === 0}
                  onClick={handleBookCustomPackage}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#e03e1a] hover:bg-[#b82e0e] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Book Custom Bundle</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Official Approved Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {officialPackages.map((pkg) => {
            const { services: includedList, originalTotal, finalPrice, savings, serviceCount, estimatedMins } =
              getPackageDetails(pkg, services);

            return (
              <div
                key={pkg.id}
                className="group relative bg-[#faf7f2] rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Visual Top */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />

                  {/* Badge */}
                  {pkg.badge && (
                    <div className="absolute top-3 left-3 bg-[#e03e1a] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                      {language === 'hi' ? pkg.badgeHi : pkg.badge}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-stone-900/85 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {serviceCount} Treatments
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                      {language === 'hi' ? pkg.taglineHi : pkg.tagline}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white leading-tight">
                      {language === 'hi' ? pkg.nameHi : pkg.name}
                    </h3>
                  </div>
                </div>

                {/* Package Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {language === 'hi' ? pkg.descriptionHi : pkg.description}
                    </p>

                    {/* Included Services Itemized List */}
                    <div className="p-3.5 bg-white rounded-2xl border border-[#ebdccd] space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 font-serif">
                        Included Treatments:
                      </div>
                      <div className="space-y-1.5">
                        {includedList.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs text-stone-800">
                            <span className="flex items-center gap-1.5 truncate pr-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span className="truncate">{item.name}</span>
                            </span>
                            <span className="text-stone-500 text-[11px] tabular-nums shrink-0">
                              ₹{item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-4 border-t border-[#ebdccd] space-y-3">
                    <div className="flex items-end justify-between">
                      <div>
                        {savings > 0 && (
                          <div className="text-[11px] text-stone-400 line-through tabular-nums">
                            Individual Total: ₹{originalTotal.toLocaleString('en-IN')}
                          </div>
                        )}
                        <span className="text-xs text-stone-500 block font-serif">
                          Package Price:
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-serif font-bold text-[#e03e1a] tabular-nums">
                            ₹{finalPrice.toLocaleString('en-IN')}
                          </span>
                          {savings > 0 && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Save ₹{savings}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right text-[11px] text-stone-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>~{estimatedMins} mins</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setSelectedPackageForModal(pkg)}
                        className="flex-1 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-[#ebdccd] rounded-xl transition-colors cursor-pointer text-center"
                      >
                        {t('btn.view_details', 'View Details')}
                      </button>

                      <button
                        onClick={() => handleBookPackage(pkg)}
                        className="flex-1 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                        <span>{t('btn.book_package', 'Book Package')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Package Detail Modal */}
      {selectedPackageForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-3xl border border-[#ebdccd] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative aspect-16/9 w-full overflow-hidden bg-stone-100">
              <img
                src={selectedPackageForModal.image}
                alt={selectedPackageForModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[11px] uppercase tracking-wider font-bold text-amber-300">
                  {selectedPackageForModal.tagline}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                  {selectedPackageForModal.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
              <p className="text-xs text-stone-600 leading-relaxed">
                {selectedPackageForModal.description}
              </p>

              <div className="p-4 bg-white rounded-2xl border border-[#ebdccd] space-y-2">
                <div className="text-xs font-serif font-bold text-stone-900">
                  Included Services & Official Rates:
                </div>
                {getPackageDetails(selectedPackageForModal, services).services.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-stone-700 py-1 border-b border-stone-50 last:border-none">
                    <span>{item.name} ({item.duration})</span>
                    <span className="font-bold tabular-nums">₹{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white border-t border-[#ebdccd] flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-stone-500 block font-serif">Package Price</span>
                <span className="text-2xl font-serif font-bold text-[#e03e1a] tabular-nums">
                  ₹{getPackageDetails(selectedPackageForModal, services).finalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedPackageForModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleBookPackage(selectedPackageForModal);
                    setSelectedPackageForModal(null);
                  }}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Book Package Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
