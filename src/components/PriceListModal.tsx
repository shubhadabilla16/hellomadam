import React, { useState } from 'react';
import { X, Search, Check, Sparkles, Printer, FileText, ArrowRight } from 'lucide-react';
import { SERVICES_LIST, CATEGORIES, ServiceItem } from '../data/servicesData';
import { useBooking } from '../context/BookingContext';

interface PriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceListModal: React.FC<PriceListModalProps> = ({ isOpen, onClose }) => {
  const { toggleService, isSelected, selectedServices, totalAmount } = useBooking();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const filtered = SERVICES_LIST.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch = 
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.categoryLabel.toLowerCase().includes(search.toLowerCase()) ||
      (s.subcategory && s.subcategory.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#faf7f2] rounded-3xl border border-[#ebdccd] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ebdccd] bg-white">
          <div className="flex items-center gap-3">
            <div className="h-9 py-0.5">
              <img
                src="/assets/aistudio/image_031d6967.png"
                alt="Hello Madam Logo"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="border-l border-stone-200 pl-3">
              <h3 className="text-base font-serif font-bold text-stone-900">Official Service Rate Card</h3>
              <p className="text-[11px] text-stone-500">100% Transparent Doorstep Salon Pricing · Solapur</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              title="Print Rate Card"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#ebdccd] space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search any service (e.g. Eyebrow, Hydra, Rica, Hair Spa)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20"
              />
            </div>

            <div className="text-xs text-stone-600 shrink-0">
              Showing <strong>{filtered.length}</strong> services
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  activeCategory === c.id
                    ? 'bg-[#e03e1a] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Pricing Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="bg-white rounded-2xl border border-[#ebdccd] overflow-hidden shadow-2xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#fef2ee] border-b border-[#ebdccd] text-[11px] font-bold uppercase tracking-wider text-stone-700 font-serif">
                  <th className="py-3 px-4">Service Name</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Category / Tier</th>
                  <th className="py-3 px-4 hidden md:table-cell">Duration</th>
                  <th className="py-3 px-4 text-right">Official Price</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                {filtered.map((service) => {
                  const active = isSelected(service.id);
                  return (
                    <tr
                      key={service.id}
                      className={`hover:bg-[#faf7f2] transition-colors ${
                        active ? 'bg-[#fef2ee]/60' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-900">{service.name}</div>
                        {service.includes && (
                          <div className="text-[11px] text-[#e03e1a] mt-0.5">
                            Includes: {service.includes.join(', ')}
                          </div>
                        )}
                        <div className="text-[11px] text-stone-500 sm:hidden">
                          {service.categoryLabel} {service.subcategory ? `· ${service.subcategory}` : ''}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-xs text-stone-600 hidden sm:table-cell">
                        <span className="font-semibold text-stone-800">{service.categoryLabel}</span>
                        {service.subcategory && (
                          <span className="text-stone-500 block text-[11px]">{service.subcategory}</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-xs text-stone-500 hidden md:table-cell tabular-nums">
                        {service.duration}
                      </td>

                      <td className="py-3 px-4 text-right font-bold text-stone-900 tabular-nums">
                        {service.priceDisplay || `₹${service.price.toLocaleString('en-IN')}`}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => toggleService(service)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            active
                              ? 'bg-[#e03e1a] text-white shadow-2xs'
                              : 'bg-stone-100 hover:bg-[#e03e1a] hover:text-white text-stone-800'
                          }`}
                        >
                          {active ? 'Selected' : '+ Add'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#ebdccd] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-600 text-center sm:text-left">
            <span>Selected: <strong className="text-stone-900">{selectedServices.length} items</strong></span>
            <span aria-hidden="true" className="mx-2 text-stone-300">·</span>
            <span>Total: <strong className="text-[#e03e1a] font-serif text-sm">₹{totalAmount.toLocaleString('en-IN')}</strong></span>
            <span className="text-[11px] text-stone-400 block sm:inline sm:ml-2">(No travel fees across Solapur)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Done Adding</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
