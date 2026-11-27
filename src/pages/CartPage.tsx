import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Clock, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ArrowLeft,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { formatPrice, formatDuration } from '../utils/formatters';
import { getServiceImage } from '../data/serviceImages';
import { ServiceImage } from '../components/ServiceImage';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartTotal, 
    cartDurationMins, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useBooking();

  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      {/* 1. Header */}
      <section className="bg-white border-b border-[#ebdccd] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e03e1a] mb-2 font-serif">
                <ShoppingBag className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>Solapur Doorstep Care</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                Your Selected Services
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-500">
                Review your ladies-only parlour appointment items before scheduling date & time.
              </p>
            </div>

            {cart.length > 0 && (
              <div className="flex items-center gap-3">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-[#ebdccd] rounded-xl transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add More Services</span>
                </Link>

                {!isConfirmingClear ? (
                  <button
                    onClick={() => setIsConfirmingClear(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Cart</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 p-1.5 bg-red-50 border border-red-200 rounded-xl animate-in fade-in duration-150">
                    <span className="text-xs text-red-700 font-medium px-2">Clear all?</span>
                    <button
                      onClick={() => {
                        clearCart();
                        setIsConfirmingClear(false);
                      }}
                      className="px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Yes, Clear
                    </button>
                    <button
                      onClick={() => setIsConfirmingClear(false)}
                      className="px-2.5 py-1 bg-white text-stone-700 text-xs font-medium rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: List of Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => {
                const { service, quantity } = item;
                const isPerPerson = Boolean(service.perPerson);
                const itemTotal = service.price * quantity;
                const itemDuration = (service.duration || 30) * quantity;
                const imageUrl = getServiceImage(service.id, service.category);

                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-3xl border border-[#ebdccd] p-4 sm:p-6 shadow-2xs hover:shadow-sm transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                  >
                    {/* Image & Service Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <Link to={`/service/${service.id}`} className="shrink-0">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 border border-[#ebdccd]">
                          <ServiceImage
                            src={imageUrl}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e03e1a] mb-0.5">
                          <span>{service.category.replace(/-/g, ' ')}</span>
                          {service.sub && (
                            <>
                              <span className="text-stone-300">·</span>
                              <span className="text-stone-500 normal-case">{service.sub}</span>
                            </>
                          )}
                        </div>

                        <h3 className="text-base font-serif font-bold text-stone-900 truncate">
                          <Link to={`/service/${service.id}`} className="hover:text-[#e03e1a] transition-colors">
                            {service.name}
                          </Link>
                        </h3>

                        <div className="mt-1 flex items-center gap-3 text-xs text-stone-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            <span>{formatDuration(itemDuration)}</span>
                          </span>
                          <span>·</span>
                          <span className="text-stone-700 font-semibold">
                            {formatPrice(service.price)} each
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Control & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#ebdccd]/60">
                      {isPerPerson ? (
                        <div className="flex flex-col items-start sm:items-center">
                          <span className="text-[10px] text-stone-400 font-serif mb-1">Guests</span>
                          <div className="flex items-center border border-[#ebdccd] rounded-xl bg-[#faf7f2] p-0.5">
                            <button
                              onClick={() => updateQuantity(service.id, quantity - 1)}
                              disabled={quantity <= 1}
                              className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="Decrease person count"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-stone-900 tabular-nums">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(service.id, quantity + 1)}
                              disabled={quantity >= 10}
                              className="p-1.5 text-stone-600 hover:text-stone-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                              title="Increase person count"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start sm:items-center">
                          <span className="text-[10px] text-stone-400 font-serif mb-1">Qty</span>
                          <span className="px-3 py-1 bg-stone-100 rounded-lg text-xs font-medium text-stone-600">
                            1
                          </span>
                        </div>
                      )}

                      {/* Line Item Total */}
                      <div className="text-right min-w-[80px]">
                        <span className="text-[10px] text-stone-400 block font-serif">Subtotal</span>
                        <span className="text-base font-bold text-stone-900 tabular-nums">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(service.id)}
                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Remove service"
                        aria-label={`Remove ${service.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}

              {/* Free doorstep delivery badge */}
              <div className="bg-[#faf7f2] border border-[#ebdccd] rounded-2xl p-4 flex items-center gap-3 text-xs text-stone-600">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Zero Travel Fee:</strong> Free doorstep travel across all Solapur city areas (Navi Peth, Datta Chowk, Jule Solapur, Hotgi Road, Saat Rasta & beyond).
                </span>
              </div>
            </div>

            {/* Right 4 Cols: Order Summary & Checkout CTA */}
            <div className="lg:col-span-4 sticky top-24 space-y-5">
              <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-7 shadow-xs">
                <h2 className="text-lg font-serif font-bold text-stone-900 mb-5">
                  Booking Summary
                </h2>

                <div className="space-y-3.5 text-xs text-stone-600 border-b border-[#ebdccd] pb-5">
                  <div className="flex justify-between">
                    <span>Selected Services</span>
                    <span className="font-semibold text-stone-900">{cartCount} items</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Total Estimated Time</span>
                    </span>
                    <span className="font-semibold text-stone-900">{formatDuration(cartDurationMins)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Doorstep Setup & Hygiene Kit</span>
                    <span className="font-bold text-emerald-700">FREE</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Travel Charges (Solapur)</span>
                    <span className="font-bold text-emerald-700">₹0</span>
                  </div>
                </div>

                <div className="pt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-500 font-serif">Total Estimated Cost</span>
                    <div className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                      {formatPrice(cartTotal)}
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                    Pay on Completion
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate('/booking')}
                  className="w-full mt-6 py-4 px-6 bg-[#e03e1a] hover:bg-[#c93514] text-white font-bold text-sm rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="mt-3 text-[11px] text-center text-stone-400">
                  Select your home address and preferred date & time slot on next step.
                </p>
              </div>

              {/* Safety notice */}
              <div className="p-4 bg-[#fef2ee] border border-[#f4c8ba] rounded-2xl text-xs text-stone-700 space-y-1.5">
                <div className="font-bold text-[#e03e1a] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ladies-Only Protection</span>
                </div>
                <p className="text-[11px] leading-relaxed text-stone-600">
                  For safety and privacy, Hello Madam provides at-home services exclusively to female clients in Solapur residences.
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#ebdccd] max-w-md mx-auto my-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Your Booking Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
              Explore our 91 transparently priced parlour services and choose what you need for luxurious home care in Solapur.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#e03e1a] text-white text-xs font-bold rounded-2xl shadow-md hover:bg-[#c93514] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse All Services</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
