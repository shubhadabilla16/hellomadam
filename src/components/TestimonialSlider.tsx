import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, CheckCircle, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../data/testimonialsData';

export const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Featured Testimonial Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#ebdccd] shadow-sm relative overflow-hidden transition-all duration-300">
        <Quote className="absolute top-6 right-6 w-20 h-20 text-[#fef2ee] -rotate-12 pointer-events-none" />
        
        {/* Rating Stars & Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
            ))}
          </div>
          <span className="text-stone-300" aria-hidden="true">·</span>
          {current.isRealClientVideo ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#fef2ee] text-[#e03e1a] text-xs font-bold rounded-full">
              <Video className="w-3.5 h-3.5" />
              <span>Real Customer Video Feedback</span>
            </span>
          ) : (
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Verified Solapur Lady Client
            </span>
          )}
        </div>

        {/* Comment */}
        <p className="text-base sm:text-xl text-stone-800 leading-relaxed font-serif italic mb-8">
          "{current.comment}"
        </p>

        {/* Client details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#ebdccd]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#fef2ee] border border-[#f4c8ba] text-[#e03e1a] font-serif font-bold text-base flex items-center justify-center">
              {current.avatarText}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-stone-900">{current.name}</h4>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                <span className="flex items-center gap-1 text-stone-600">
                  <MapPin className="w-3 h-3 text-[#e03e1a]" />
                  <span>{current.locality}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#e03e1a] font-medium">{current.service}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            {current.isRealClientVideo && (
              <Link
                to="/our-work"
                className="text-xs font-bold text-[#e03e1a] hover:underline flex items-center gap-1 mr-2"
              >
                <span>Watch Video</span>
                <Video className="w-3.5 h-3.5" />
              </Link>
            )}

            <div className="flex items-center gap-1.5">
              <button
                onClick={prev}
                className="p-2.5 rounded-full border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-[#faf7f2] transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-xs font-mono text-stone-500 px-2 tabular-nums">
                0{currentIndex + 1} / 0{TESTIMONIALS.length}
              </div>
              <button
                onClick={next}
                className="p-2.5 rounded-full border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-[#faf7f2] transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails indicator */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {TESTIMONIALS.map((t, idx) => (
          <button
            key={t.id}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-[#e03e1a]' : 'w-2 bg-stone-300 hover:bg-stone-400'
            }`}
            aria-label={`Jump to review by ${t.name}`}
          />
        ))}
      </div>
    </div>
  );
};
