import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { getServiceById, Service } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';

export const FavouritesPage: React.FC = () => {
  const { favourites, toggleFavourite, addToCart, showToast } = useBooking();

  // Resolve service objects
  const savedServices: Service[] = favourites
    .map(id => getServiceById(id))
    .filter((s): s is Service => s !== undefined);

  const handleAddAllToCart = () => {
    savedServices.forEach(s => addToCart(s));
    showToast(`Added ${savedServices.length} saved services to your cart`);
  };

  const handleClearAll = () => {
    // Clear all favourites one by one
    [...favourites].forEach(id => toggleFavourite(id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <section className="bg-white border-b border-[#ebdccd] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e03e1a] mb-2 font-serif">
                <Heart className="w-3.5 h-3.5 fill-[#e03e1a]" />
                <span>Saved For Later</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                My Saved Services
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-stone-500">
                Quickly rebook or explore your handpicked parlour treatments in Solapur.
              </p>
            </div>

            {savedServices.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddAllToCart}
                  className="px-4 py-2.5 bg-stone-900 hover:bg-[#e03e1a] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move All to Cart</span>
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                  title="Clear all saved"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid or Empty State */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {savedServices.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">
                {savedServices.length} {savedServices.length === 1 ? 'service' : 'services'} saved
              </span>
              <Link to="/services" className="text-xs font-bold text-[#e03e1a] hover:underline flex items-center gap-1">
                <span>Browse more services</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#ebdccd] max-w-md mx-auto my-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">
              No Saved Services Yet
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
              Click the heart icon on any parlour service card to save it here for quick rebooking and easy reference.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#e03e1a] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#c93514] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore 91 Services</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
