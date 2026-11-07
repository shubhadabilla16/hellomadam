import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, MessageCircle, ShoppingBag, Calendar, Globe, UserCog } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { selectedServices, setIsMyBookingsOpen } = useBooking();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t('nav.home', 'Home'), path: '/' },
    { label: t('nav.services', 'Services'), path: '/services' },
    { label: t('nav.offers', 'Offers'), path: '/#offers', isHash: true },
    { label: t('nav.packages', 'Packages'), path: '/#packages', isHash: true },
    { label: t('nav.our_work', 'Our Work'), path: '/our-work' },
    { label: t('nav.about', 'About Us'), path: '/about' },
    { label: t('nav.contact', 'Contact'), path: '/contact' },
  ];

  const isActive = (path: string, isHash?: boolean) => {
    if (isHash) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const whatsappDirectUrl = `https://wa.me/919657156795?text=${encodeURIComponent(
    'Hello Madam Solapur! I would like to inquire about booking an at-home beauty service.'
  )}`;

  const handleNavClick = (link: { path: string; isHash?: boolean }) => {
    setMobileMenuOpen(false);
    if (link.isHash) {
      if (location.pathname !== '/') {
        window.location.href = link.path;
      } else {
        const targetId = link.path.replace('/#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#ebdccd] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          
          {/* Zone 1: Original Hello Madam Logo (Uncropped, true proportions) */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group focus:outline-none"
            aria-label="Hello Madam Homepage"
          >
            <div className="h-12 sm:h-14 py-1 flex items-center">
              <img
                src="/assets/aistudio/image_031d6967.png"
                alt="Hello Madam Logo"
                className="h-full w-auto object-contain max-w-[190px] sm:max-w-[230px] transition-transform duration-200 group-hover:scale-102"
              />
            </div>
          </Link>

          {/* Zone 2: Navigation Links (Clean typography, terracotta hover & active underline) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-700">
            {navLinks.map((link) => (
              link.isHash ? (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link)}
                  className="whitespace-nowrap shrink-0 transition-colors py-1 hover:text-[#e03e1a] cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                    isActive(link.path)
                      ? 'text-[#e03e1a] font-bold'
                      : 'hover:text-[#e03e1a]'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e03e1a] rounded-full" />
                  )}
                </Link>
              )
            ))}
          </nav>

          {/* Zone 3: Right Controls (Language Selector, WhatsApp, My Bookings, Admin, Book CTA) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            
            {/* Language Selector (EN / हिन्दी) */}
            <div className="flex items-center bg-white rounded-full p-0.5 border border-[#ebdccd] shadow-2xs text-[11px] font-bold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#e03e1a] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-[#e03e1a] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* WhatsApp Contact */}
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
              <span className="hidden xl:inline">+91 9657156795</span>
            </a>

            {/* My Bookings Lookup */}
            <button
              onClick={() => setIsMyBookingsOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200 rounded-full transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Track your appointment"
            >
              <Calendar className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span className="hidden lg:inline">{t('nav.my_bookings', 'My Bookings')}</span>
            </button>

            {/* Owner Admin Link */}
            <Link
              to="/admin"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
              title="Hello Madam Owner Portal"
            >
              <UserCog className="w-4 h-4" />
            </Link>

            {/* Book Appointment CTA */}
            <Link
              to="/book"
              className="px-4 sm:px-5 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{t('nav.book', 'Book Appointment')}</span>
              {selectedServices.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-stone-900 text-white text-[10px] font-bold rounded-full">
                  {selectedServices.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            
            {/* Mobile Language Selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1 text-xs font-bold text-stone-700 bg-white border border-[#ebdccd] rounded-full shadow-2xs flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-[#e03e1a]" />
              <span>{language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            <Link
              to="/book"
              className="relative p-2 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-100"
              aria-label="Bookings Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#e03e1a]" />
              {selectedServices.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#e03e1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {selectedServices.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ebdccd] bg-[#faf7f2] px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-lg">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              link.isHash ? (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-left text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-[#fef2ee] text-[#e03e1a] font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          <div className="pt-3 border-t border-[#ebdccd] space-y-2">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full px-4 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 text-white" />
              <span>WhatsApp: +91 9657156795</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsMyBookingsOpen(true);
              }}
              className="w-full px-4 py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#e03e1a]" />
              <span>Lookup My Bookings</span>
            </button>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 rounded-xl hover:bg-stone-200 transition-colors flex items-center justify-center gap-2"
            >
              <UserCog className="w-4 h-4" />
              <span>Owner Admin Portal</span>
            </Link>

            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Book Appointment ({selectedServices.length} Selected)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
