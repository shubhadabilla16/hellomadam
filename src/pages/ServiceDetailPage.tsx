import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowLeft, 
  Clock, 
  Plus, 
  Check, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  PhoneCall, 
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';
import { getServiceById, getServicesByCategory, Service } from '../data/services';
import { getCategoryById } from '../data/categories';
import { getServiceImage } from '../data/serviceImages';
import { formatPrice, formatDuration } from '../utils/formatters';
import { useBooking } from '../context/BookingContext';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceImage } from '../components/ServiceImage';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const service = serviceId ? getServiceById(serviceId) : undefined;
  const { isInCart, addToCart, isFavourite, toggleFavourite } = useBooking();

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-[#faf7f2]">
        <div className="w-16 h-16 rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-4">
          <Sparkles className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
          Service Not Found
        </h1>
        <p className="text-sm text-stone-600 max-w-md mb-6 leading-relaxed">
          The requested parlour service could not be located. Explore our complete catalogue of 91 beauty and salon treatments in Solapur.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#e03e1a] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#c93514] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All Services</span>
        </Link>
      </div>
    );
  }

  const category = getCategoryById(service.category);
  const inCart = isInCart(service.id);
  const favorited = isFavourite(service.id);
  const imageUrl = getServiceImage(service.id, service.category);

  // Related services in the same category (excluding current)
  const relatedServices = getServicesByCategory(service.category)
    .filter(s => s.id !== service.id)
    .slice(0, 4);

  const handleBookNow = () => {
    if (!inCart) {
      addToCart(service);
    }
    navigate('/booking');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-[#ebdccd] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
            <li>
              <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            </li>
            <li>
              <Link to="/services" className="hover:text-stone-900 transition-colors">Services</Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                </li>
                <li>
                  <Link to={`/services/${category.id}`} className="hover:text-stone-900 transition-colors">
                    {category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            </li>
            <li aria-current="page">
              <span className="text-[#e03e1a] font-bold line-clamp-1">{service.name}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. Main Service Detail Card */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="bg-white rounded-3xl border border-[#ebdccd] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Service Image */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-[#faf7f2] border border-[#ebdccd]">
                <ServiceImage
                  src={imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                {service.featured && (
                  <div className="absolute top-3 left-3 bg-[#e03e1a] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>Popular Choice</span>
                  </div>
                )}
                <button
                  onClick={() => toggleFavourite(service.id)}
                  className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                    favorited
                      ? 'bg-[#e03e1a] text-white'
                      : 'bg-white/85 text-stone-700 hover:bg-white hover:text-[#e03e1a]'
                  }`}
                  aria-label={favorited ? 'Remove from saved' : 'Save to favourites'}
                >
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-white stroke-white' : ''}`} />
                </button>
              </div>

              {/* Service Highlights Box */}
              <div className="bg-[#faf7f2] rounded-2xl p-4 border border-[#ebdccd] space-y-2.5 text-xs text-stone-600">
                <div className="flex items-center gap-2 font-semibold text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-[#e03e1a]" />
                  <span>Hello Madam Doorstep Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% single-use disposable kits & sealed waxes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Verified female beautician with sanitized gear</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Doorstep service anywhere in Solapur city</span>
                </div>
              </div>
            </div>

            {/* Right: Service Info & Action Buttons */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category & Subcategory */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Link
                  to={`/services/${service.category}`}
                  className="px-3 py-1 bg-[#fef2ee] text-[#e03e1a] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#f4c8ba] hover:bg-[#fbdcd2] transition-colors"
                >
                  {category?.name || service.category}
                </Link>
                {service.sub && (
                  <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-lg">
                    Type: {service.sub}
                  </span>
                )}
                {service.perPerson && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold rounded-lg flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Multiple Guests Supported</span>
                  </span>
                )}
              </div>

              {/* Service Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
                {service.name}
              </h1>

              {/* Price & Duration */}
              <div className="mt-5 flex flex-wrap items-baseline gap-4 py-4 border-y border-[#ebdccd]">
                <div>
                  <span className="text-xs text-stone-400 block font-serif">Service Fee</span>
                  <span className="text-3xl font-serif font-bold text-stone-900 tabular-nums">
                    {formatPrice(service.price)}
                  </span>
                </div>
                {service.duration && (
                  <>
                    <div className="h-8 w-px bg-stone-200" />
                    <div>
                      <span className="text-xs text-stone-400 block font-serif">Estimated Duration</span>
                      <span className="text-base font-semibold text-stone-700 flex items-center gap-1.5 pt-0.5">
                        <Clock className="w-4 h-4 text-[#e03e1a]" />
                        <span>{formatDuration(service.duration)}</span>
                      </span>
                    </div>
                  </>
                )}
                <div className="ml-auto text-right">
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
                    Ladies-Only Solapur
                  </span>
                </div>
              </div>

              {/* Description & Details */}
              <div className="mt-5 space-y-4 text-sm text-stone-600 leading-relaxed">
                <p>
                  Professional at-home {service.name.toLowerCase()} performed by trained and verified female beauticians from Hello Madam. We bring all professional beauty kits, sterilizers, and clean disposable mats right to your living room in Solapur.
                </p>

                {service.perPerson && (
                  <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-[#e03e1a] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Group / Per-Person Service:</strong> You can adjust the number of persons (up to 10 guests) in your cart before checking out.
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => {
                    if (!inCart) {
                      addToCart(service);
                    }
                  }}
                  disabled={inCart}
                  className={`flex-1 sm:flex-none px-6 py-3.5 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    inCart
                      ? 'bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba]'
                      : 'bg-stone-900 text-white hover:bg-stone-800 shadow-md active:scale-95'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4 text-[#e03e1a]" />
                      <span>Added to Booking</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-amber-300" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBookNow}
                  className="flex-1 sm:flex-none px-7 py-3.5 rounded-2xl text-sm font-bold bg-[#e03e1a] hover:bg-[#c93514] text-white shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Appointment Now</span>
                </button>

                <a
                  href={`https://wa.me/919657156795?text=${encodeURIComponent(`Hi Hello Madam, I would like to inquire about booking: ${service.name} (${formatPrice(service.price)})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xs transition-colors cursor-pointer"
                  title="Inquire on WhatsApp"
                  aria-label="Inquire about this service on WhatsApp"
                >
                  <PhoneCall className="w-5 h-5" />
                </a>
              </div>

              <div className="mt-6 text-xs text-stone-400">
                Operating hours in Solapur: <strong>10:00 AM &ndash; 5:00 PM</strong> (Monday &ndash; Sunday).
              </div>
            </div>

          </div>
        </div>

        {/* 3. Related Services */}
        {relatedServices.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  Related in {category?.name || 'Category'}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Frequently booked together for complete salon care at home
                </p>
              </div>
              <Link
                to={`/services/${service.category}`}
                className="text-xs font-bold text-[#e03e1a] hover:underline"
              >
                View all {category?.name} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((rel) => (
                <ServiceCard key={rel.id} service={rel} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
