import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin, Heart, ShieldCheck, Sparkles, Clock, MessageCircle, X } from 'lucide-react';
import { CATEGORY_MEDIA_MAP } from '../data/serviceImageMap';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  const popularCategoryKeys = ['facials', 'hair-spa', 'body-wax', 'mani-pedi', 'clean-up', 'd-tan'];

  return (
    <footer className="bg-[#1c1917] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Brand & Logo (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block bg-white p-2.5 rounded-2xl border border-stone-700 shadow-sm">
              <img
                src="/assets/aistudio/image_031d6967.png"
                alt="Hello Madam Original Brand Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Solapur’s premier ladies-only at-home beauty & parlour service. Bringing clinical hygiene, certified beauticians, and luxury pampering directly to your doorstep.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 bg-amber-950/50 border border-amber-800/60 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>100% Exclusively for Ladies</span>
              </div>
              
              <Link
                to="/admin"
                className="text-[11px] font-medium text-stone-500 hover:text-stone-300 underline"
              >
                Owner Portal
              </Link>
            </div>
          </div>

          {/* Col 2: Service Categories & Popular Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold tracking-wider uppercase text-white">Popular Services</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              {popularCategoryKeys.map((catKey) => {
                const cat = CATEGORY_MEDIA_MAP[catKey];
                if (!cat) return null;
                return (
                  <li key={cat.id}>
                    <Link
                      to={`/services?category=${cat.id}`}
                      className="hover:text-amber-200 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link to="/#packages" className="text-[#e03e1a] hover:text-[#f45f3d] font-semibold transition-colors">
                  View Beauty Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation & Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold tracking-wider uppercase text-white">Company</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <li>
                <Link to="/" className="hover:text-amber-200 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-200 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-200 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/our-work" className="hover:text-amber-200 transition-colors">Our Work (Videos)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-200 transition-colors">Contact</Link>
              </li>
              <li>
                <button
                  onClick={() => setModalType('privacy')}
                  className="hover:text-amber-200 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('terms')}
                  className="hover:text-amber-200 transition-colors text-left cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Location Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-serif font-bold tracking-wider uppercase text-white">Contact & Solapur Base</h4>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#e03e1a] shrink-0" />
                <a href="tel:+919657156795" className="hover:text-white font-mono font-medium">
                  +91 9657156795
                </a>
              </li>

              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href="https://wa.me/919657156795"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 font-medium"
                >
                  WhatsApp: +91 9657156795
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:dfinesolapur@gmail.com" className="hover:text-white truncate">
                  dfinesolapur@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#e03e1a] shrink-0" />
                <span>10:00 AM – 5:00 PM (Daily)</span>
              </li>

              <li className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                <span className="text-[11px] text-stone-400 leading-snug">
                  Navi Peth, Datta Chowk area, Solapur.
                  <span className="block text-stone-500 text-[10px]">Near June Vitthal Mandir & Mahalakshmi Dudh Dairy</span>
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://www.instagram.com/hello_madam_solapur5/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-purple-800 to-pink-700 hover:from-purple-700 hover:to-pink-600 rounded-xl transition-all border border-pink-700/40 shadow-xs"
              >
                <Instagram className="w-4 h-4 text-pink-300" />
                <span>@hello_madam_solapur5</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 Hello Madam. All Rights Reserved. Crafted exclusively for women in Solapur.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-stone-400">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#e03e1a] fill-[#e03e1a]" />
              <span>for women of Solapur</span>
            </span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="flex items-center gap-1 text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Doorstep Parlour Care</span>
            </span>
          </div>
        </div>

      </div>

      {/* Privacy Policy & Terms Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white text-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] flex flex-col">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-stone-900 mb-4">
              {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Exclusively for Women:</strong> Hello Madam provides at-home salon care solely to female clients within Solapur, Maharashtra.
                  </p>
                  <p>
                    <strong>2. Confidentiality of Home Address:</strong> Your home address, landmark, and phone number are used strictly for appointment navigation by our assigned female beautician and coordinator. We do not sell or distribute personal information.
                  </p>
                  <p>
                    <strong>3. Health & Skin History:</strong> Any skin sensitivity or allergy information provided during booking is treated confidentially and referenced solely to select appropriate hypoallergenic facial or wax products.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Ladies-Only Environment:</strong> Clients must ensure that the treatment room provides privacy for the client and our female beautician.
                  </p>
                  <p>
                    <strong>2. Zero Travel Fees:</strong> All displayed catalogue prices include free doorstep visits across standard Solapur residential zones.
                  </p>
                  <p>
                    <strong>3. Hygiene Standard:</strong> Every disposable sheet, spatula, and wipe is single-use. Our beauticians clean up completely and take all used disposables with them.
                  </p>
                  <p>
                    <strong>4. Payment:</strong> No advance deposit is needed. Payment is accepted in full after service completion via Cash or UPI (GPay, PhonePe, Paytm).
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-6 py-2 text-xs font-bold text-white bg-[#e03e1a] rounded-full hover:bg-[#b82e0e] transition-colors cursor-pointer"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
