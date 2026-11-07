import React from 'react';
import { MessageCircle, Sparkles, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export const FloatingContactBar: React.FC = () => {
  const { selectedServices, totalAmount } = useBooking();
  const location = useLocation();
  const isBookingPage = location.pathname === '/book';

  const defaultWhatsappMessage = encodeURIComponent(
    'Hello Madam Solapur! I would like to inquire about booking an at-home beauty service in Solapur.'
  );

  return (
    <>
      {/* Floating WhatsApp Quick Action Button */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2 pointer-events-auto">
        <a
          href={`https://wa.me/919657156795?text=${defaultWhatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp with Hello Madam Solapur (+91 9657156795)"
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
          <span className="sr-only">Chat on WhatsApp</span>
          
          {/* Tooltip on hover */}
          <span className="hidden sm:inline-block absolute right-16 bg-stone-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
            WhatsApp: +91 9657156795
          </span>
        </a>
      </div>

      {/* Mobile Sticky Quick Booking Bar (Only if not already on booking page, strictly <= 15% height) */}
      {!isBookingPage && selectedServices.length > 0 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#faf7f2]/95 backdrop-blur-md border-t border-[#ebdccd] shadow-xl">
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">
                  {selectedServices.length} {selectedServices.length === 1 ? 'Service' : 'Services'}
                </div>
                <div className="text-[11px] text-stone-600 tabular-nums">
                  Est. ₹{totalAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <Link
              to="/book"
              className="px-4 py-2 bg-[#e03e1a] text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Checkout</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
