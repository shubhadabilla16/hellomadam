import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Video, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { REAL_VIDEOS } from '../data/testimonialsData';
import { VideoCard } from './VideoCard';

export const VideoGallery: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#faf7f2] border-t border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#e03e1a] mb-2">
              <Video className="w-4 h-4 text-[#e03e1a]" />
              <span>Real Solapur Demonstrations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Beauty in Action – Our Work
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
              Watch real footage of our certified beauticians arriving in professional uniform at Solapur residences, clinical hygiene protocols, and genuine feedback from happy customers.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-all shadow-sm hover:shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Book Your Session Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Two Large Real Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
          {REAL_VIDEOS.map((video, idx) => (
            <VideoCard key={video.id} video={video} priority={idx === 0} />
          ))}
        </div>

        {/* Trust Highlight Box */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white border border-[#ebdccd] shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="w-16 h-16 rounded-2xl bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <h4 className="text-lg font-serif font-bold text-stone-900">
              100% Verified Ladies-Only Home Service in Solapur
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              As seen in both videos, our technicians wear branded black "HELLO MADAM" uniforms, use sterile single-use disposable sheets, sanitize all tools in front of you, and clean every bit of waste before departure.
            </p>
          </div>
          <a
            href="https://wa.me/919657156795?text=Hello%20Madam%20Solapur!%20I%20watched%20your%20videos%20and%20would%20like%20to%20book%20a%20home%20salon%20visit."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 whitespace-nowrap shadow-xs shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
