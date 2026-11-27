import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Gift } from 'lucide-react';
import { PACKAGES, Package } from '../data/packages';
import { formatPrice } from '../utils/formatters';
import { useBooking } from '../context/BookingContext';

export const PackagesPage: React.FC = () => {
  const { addToCart } = useBooking();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <section className="bg-white border-b border-[#ebdccd] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fef2ee] text-[#e03e1a] text-xs font-bold uppercase tracking-wider mb-4 border border-[#f4c8ba]">
            <Gift className="w-3.5 h-3.5" />
            <span>Curated Value Bundles · Solapur</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Curated Beauty Packages
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-600 leading-relaxed">
            Specially designed combinations for bridal prep, pre-wedding glow, seasonal revitalization, and full body indulgence.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {PACKAGES.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg: Package) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">{pkg.name}</h3>
                  {pkg.tagline && <p className="text-xs text-[#e03e1a] font-serif italic mt-1">{pkg.tagline}</p>}
                  {pkg.description && <p className="text-xs text-stone-600 mt-3">{pkg.description}</p>}
                </div>

                <div className="mt-6 pt-4 border-t border-[#ebdccd] flex items-center justify-between">
                  <span className="text-xl font-bold text-stone-900">{formatPrice(pkg.price)}</span>
                  <Link
                    to="/services"
                    className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-[#e03e1a] transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#ebdccd] p-8 sm:p-12 shadow-xs text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-5">
              <Sparkles className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3">
              Curated Packages Coming Soon!
            </h2>

            <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed mb-8">
              We are assembling special bridal, glow, and festival packages with exclusive bundled pricing. In the meantime, you can customize your own at-home parlour package by selecting any combination of our 91 individual services!
            </p>

            {/* Custom package advantages */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-8 max-w-2xl mx-auto">
              <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdccd]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-serif font-bold text-xs text-stone-900">Custom Bundling</h4>
                <p className="text-[11px] text-stone-500 mt-1">Pick exactly what your skin & hair needs today.</p>
              </div>

              <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdccd]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-serif font-bold text-xs text-stone-900">Zero Travel Fee</h4>
                <p className="text-[11px] text-stone-500 mt-1">Free doorstep service across Solapur city.</p>
              </div>

              <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdccd]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="font-serif font-bold text-xs text-stone-900">Certified Beauticians</h4>
                <p className="text-[11px] text-stone-500 mt-1">Exclusively female trained team with single-use kits.</p>
              </div>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#e03e1a] hover:bg-[#c93514] text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore All 91 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
