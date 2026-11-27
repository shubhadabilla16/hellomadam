import React, { useState } from 'react';

interface PartnerAvatarProps {
  photo?: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const PartnerAvatar: React.FC<PartnerAvatarProps> = ({
  photo,
  name,
  className = '',
  size = 'md',
}) => {
  const [imageError, setImageError] = useState(false);

  const initial = name.trim().charAt(0).toUpperCase() || 'H';

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-lg',
    lg: 'w-20 h-20 text-2xl',
    xl: 'w-28 h-28 text-4xl',
  }[size];

  if (photo && !imageError) {
    return (
      <img
        src={photo}
        alt={name}
        onError={() => setImageError(true)}
        className={`rounded-full object-cover object-top border-2 border-white shadow-xs shrink-0 ${sizeClasses} ${className}`}
        loading="lazy"
      />
    );
  }

  // Fallback: round initial avatar in orange-red (#e03e1a), never stock photo
  return (
    <div
      className={`rounded-full bg-[#fef2ee] text-[#e03e1a] border-2 border-[#f4c8ba] flex items-center justify-center font-serif font-bold shrink-0 shadow-xs select-none ${sizeClasses} ${className}`}
      aria-label={name}
    >
      {initial}
    </div>
  );
};
