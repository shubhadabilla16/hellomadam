import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Video, ShieldCheck, CheckCircle2, MessageCircle, Heart, Star, MapPin } from 'lucide-react';
import { VideoGallery } from '../components/VideoGallery';
import { TESTIMONIALS } from '../data/testimonialsData';

export const OurWorkPage: React.FC = () => {
  const realReview = TESTIMONIALS[0]; // Mrs. Pranita Amar Pompawar

  const realPhotos = [
    {
      title: 'Hydra Facial & Botanical Infusion',
      category: 'Facial Therapy',
      image: '/src/assets/images/service_facial_glow_1793599854639.jpg',
      desc: 'Deep vacuum pore extraction and nutrient hydration for glass-like glow.'
    },
    {
      title: 'Soothing Ice Globes & Facial Steam',
      category: 'Cryo Care',
      image: '/src/assets/images/hero_skincare_treatment_1793599854054.jpg',
      desc: 'Chilled cryo glass globes relieving facial tension and puffy eyes.'
    },
    {
      title: 'Aromatic Rose Petal Pedicure',
      category: 'Foot Spa',
      image: '/src/assets/images/service_mani_pedi_1793599857106.jpg',
      desc: 'Warm floral foot soak, cracked heel buffing, and relaxing calf massage.'
    },
    {
      title: 'Certified Beauticians in Branded Uniform',
      category: 'Hygiene & Safety',
      image: '/src/assets/images/about_beautician_care_1793599856776.jpg',
      desc: 'Equipped with disposable bedsheets, sanitized kits, and sealed pouches.'
    },
    {
      title: 'Royal Bridal & Festive Glow',
      category: 'Makeover Artistry',
      image: '/src/assets/images/service_bridal_makeup_1793599854875.jpg',
      desc: 'High-definition bridal and celebration makeover tailored for Solapur women.'
    },
    {
      title: 'Painless Waxing & Smooth Skin',
      category: 'Body Care',
      image: '/src/assets/images/hero_skincare_treatment_1793599854054.jpg',
      desc: 'Gentle Italian Rica & natural wax with single-use wooden spatulas.'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-[#ebdccd] pt-12 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>Real Results in Solapur</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Our Work – Beauty in Action
          </h1>
          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            See how Hello Madam transforms living rooms across Solapur into private luxury spas. Real client videos, live service demonstrations, and honest reviews.
          </p>
        </div>
      </section>

      {/* 2. Video Gallery Component */}
      <VideoGallery />

      {/* 3. Featured Real Customer Spotlight */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#ebdccd]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#fef2ee] border border-[#f4c8ba] shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
              ))}
              <span className="ml-2 text-xs font-bold uppercase tracking-wider text-[#e03e1a]">
                Real Client Video Review
              </span>
            </div>

            <blockquote className="text-base sm:text-lg text-stone-900 font-serif italic leading-relaxed mb-6">
              "{realReview.comment}"
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#f4c8ba]/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#e03e1a] text-white font-serif font-bold text-base flex items-center justify-center">
                  {realReview.avatarText}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">{realReview.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-stone-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#e03e1a]" />
                      <span>{realReview.locality}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#e03e1a] font-medium">{realReview.service}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/book"
                className="px-6 py-2.5 bg-[#e03e1a] hover:bg-[#b82e0e] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-2 shadow-xs shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Experience This Service</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Real Service Photos Gallery */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-[#e03e1a] mb-2">
              At-Home Transformations
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Treatment Visual Showcase
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              From Hydra Facial to soothing pedicure foot spas—every treatment is performed with clinical hygiene in your personal comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {realPhotos.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-stone-900 mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Home Delivered</span>
                    </span>
                    <Link
                      to="/book"
                      className="text-xs font-bold text-[#e03e1a] hover:text-[#b82e0e] transition-colors"
                    >
                      Book This →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
