import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Plus, Check, Heart } from 'lucide-react';
import { Service } from '../data/services';
import { ServiceItem } from '../data/servicesData';
import { useBooking } from '../context/BookingContext';
import { formatPrice, formatDuration } from '../utils/formatters';
import { getServiceImageKey, getImageKeyMeta } from '../data/serviceImages';
import { ServiceImage } from './ServiceImage';

interface ServiceCardProps {
  service: Service | ServiceItem;
  onViewDetails?: (service: Service | ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { isInCart, addToCart, isFavourite, toggleFavourite } = useBooking();

  const id = service.id;
  const inCart = isInCart(id);
  const favorited = isFavourite(id);

  // Normalize duration in minutes
  const durationMins: number | undefined = typeof service.duration === 'number'
    ? service.duration
    : typeof service.duration === 'string'
      ? (parseInt(service.duration, 10) || undefined)
      : undefined;

  const imageKey = getServiceImageKey(id);
  const meta = getImageKeyMeta(imageKey);

  return (
    <div className="group h-full flex flex-col bg-white rounded-2xl border border-[#ebdccd]/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      {/* 1. Image on top: 4:3 aspect ratio, rounded corners, object-cover */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#faf7f2]">
        <Link to={`/service/${id}`} className="block w-full h-full" tabIndex={-1}>
          <ServiceImage
            imageKey={imageKey}
            alt={service.name}
            label={meta.label}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        </Link>

        {/* Small round white heart (favourite) button at top-right */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavourite(id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
            favorited
              ? 'text-[#e03e1a]'
              : 'text-stone-400 hover:text-[#e03e1a]'
          }`}
          title={favorited ? 'Remove from saved' : 'Save to favourites'}
          aria-label={favorited ? `Remove ${service.name} from saved` : `Save ${service.name} to favourites`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-[#e03e1a] stroke-[#e03e1a]' : 'stroke-current'}`} />
        </button>
      </div>

      {/* 2. Card Body: service name, price & duration, brand line, full-width button */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-2">
          {/* Service Name: max 2 lines, same height on all cards */}
          <h3 className="text-xs sm:text-sm font-serif font-bold text-stone-900 leading-snug line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem]">
            <Link to={`/service/${id}`} className="hover:text-[#e03e1a] transition-colors">
              {service.name}
            </Link>
          </h3>

          {/* Price & Duration Row */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <span className="text-base sm:text-lg font-bold text-[#e03e1a] tabular-nums tracking-tight">
              {formatPrice(service.price)}
            </span>

            {durationMins && durationMins > 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full shrink-0">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>{formatDuration(durationMins)}</span>
              </span>
            ) : null}
          </div>

          {/* Small line "Hello Madam" with brand mark */}
          <div className="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-stone-500">
            <img
              src="/assets/aistudio/image_a7f9010e.png"
              alt="Hello Madam"
              className="w-4 h-4 rounded-xs object-contain"
            />
            <span className="font-serif text-stone-600">Hello Madam</span>
          </div>
        </div>

        {/* 3. Action Buttons: Full-width rounded "Add to Cart" + "View Details" */}
        <div className="pt-2 border-t border-[#ebdccd]/50 flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (!inCart) {
                addToCart(service);
              }
            }}
            disabled={inCart}
            className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
              inCart
                ? 'bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba] cursor-default'
                : 'bg-[#e03e1a] hover:bg-[#c93514] text-white shadow-xs active:scale-[0.98]'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4 text-[#e03e1a]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 text-white" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <Link
            to={`/service/${id}`}
            className="text-[11px] font-medium text-stone-500 hover:text-[#e03e1a] hover:underline transition-colors py-0.5"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  );
};
