import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice } from '../utils/formatters';

export const MobileStickyCartBar: React.FC = () => {
  const { cartCount, cartTotal } = useBooking();
  const location = useLocation();

  // Hide on cart or booking pages so it doesn't overlap checkout
  if (cartCount === 0 || location.pathname === '/cart' || location.pathname === '/booking' || location.pathname === '/book') {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 animate-in slide-in-from-bottom-2 duration-200">
      <Link
        to="/cart"
        className="flex items-center justify-between px-4 py-3 bg-[#e03e1a] text-white rounded-2xl shadow-xl hover:bg-[#c93514] active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-100">
              {cartCount} {cartCount === 1 ? 'service' : 'services'} selected
            </div>
            <div className="text-base font-bold tabular-nums">
              {formatPrice(cartTotal)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm font-bold bg-white text-[#e03e1a] px-3.5 py-1.5 rounded-xl shadow-xs">
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </div>
  );
};
