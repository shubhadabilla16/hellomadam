import React, { useState } from 'react';
import { Flower2 } from 'lucide-react';
import { getImageKeyMeta, imageUrl } from '../data/serviceImages';

export interface ServiceImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imageKey?: string;
  src?: string;
  alt: string;
  className?: string;
  label?: string;
}

export const ServiceImage: React.FC<ServiceImageProps> = ({
  imageKey,
  src,
  alt,
  className = '',
  label,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  const meta = imageKey ? getImageKeyMeta(imageKey) : null;
  const displayLabel = label || meta?.label || alt || 'Salon Treatment';

  const resolvedSrc = imageKey ? imageUrl(imageKey) : src;

  if (hasError || !resolvedSrc) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-3 text-center select-none bg-gradient-to-br from-[#faf7f2] via-[#f7ede1] to-[#ebdccd] border border-[#ebdccd]/80 relative overflow-hidden ${className}`}
        aria-label={`${displayLabel} photo placeholder`}
      >
        {/* Subtle decorative background blur shapes */}
        <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#fef2ee]/70 pointer-events-none blur-sm" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-amber-100/50 pointer-events-none blur-sm" />

        {/* Small icon in circle */}
        <div className="relative z-10 w-10 h-10 rounded-2xl bg-white shadow-xs border border-[#ebdccd] flex items-center justify-center text-[#e03e1a] mb-2">
          <Flower2 className="w-5 h-5 stroke-[1.75]" />
        </div>

        {/* Photo Description Label */}
        <div className="relative z-10 px-2 max-w-full">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#e03e1a] font-serif mb-0.5">
            Hello Madam
          </div>
          <div className="text-xs sm:text-sm font-serif font-bold text-stone-800 line-clamp-2 leading-snug">
            {displayLabel}
          </div>
          <div className="mt-1 text-[10px] text-stone-500 font-medium tracking-wide">
            Doorstep Care · Solapur
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      onError={() => setHasError(true)}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      {...rest}
    />
  );
};
