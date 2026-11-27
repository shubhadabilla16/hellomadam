import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronRight, Grid } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { getServicesByCategory, getLowestPriceInCategory, SERVICES } from '../data/services';
import { categoryBanners, BRANDED_PLACEHOLDER } from '../data/serviceImages';
import { formatPrice } from '../utils/formatters';
import { ServiceImage } from './ServiceImage';

interface FeaturedCategory {
  id: string;
  name: string;
  desc: string;
  route: string;
  image: string;
  count: number;
  startingPrice: number;
}

export const ExploreCategoriesSection: React.FC = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  // The 8 Main Categories requested by user
  const mainCategories: FeaturedCategory[] = [
    {
      id: 'facial',
      name: 'Facial & Skincare',
      desc: 'Organic fruit facials, O3+ brightening, Korean glass skin & gold radiance.',
      route: '/services/facial',
      image: '/assets/services/facial-skin-glow.jpg',
      count: getServicesByCategory('facial').length,
      startingPrice: getLowestPriceInCategory('facial') || 650,
    },
    {
      id: 'haircare',
      name: 'Haircare',
      desc: 'Deep nourishing steam hair spa, traditional herbal champi & root care.',
      route: '/services/hair-spa',
      image: '/assets/services/hair-spa.jpg',
      count: SERVICES.filter(s => s.category.includes('hair')).length || 3,
      startingPrice: getLowestPriceInCategory('hair-spa') || 450,
    },
    {
      id: 'waxing',
      name: 'Waxing',
      desc: 'Smooth Honey bee wax, Italian Rica & Brazilian wax for silky gentle touch.',
      route: '/services/body-wax',
      image: '/assets/services/wax-arms.jpg',
      count: SERVICES.filter(s => s.category === 'body-wax' || s.category === 'face-wax').length || 21,
      startingPrice: getLowestPriceInCategory('face-wax') || 150,
    },
    {
      id: 'threading',
      name: 'Threading',
      desc: 'Precision eyebrow shaping, upper lip, forehead & full-face threading.',
      route: '/services/threading',
      image: '/assets/services/threading-eyebrows.jpg',
      count: getServicesByCategory('threading').length || 5,
      startingPrice: getLowestPriceInCategory('threading') || 30,
    },
    {
      id: 'mani-pedi',
      name: 'Manicure & Pedicure',
      desc: 'Rose petal foot soaks, cuticle therapy & Korean glass skin hand rituals.',
      route: '/services/manicure-pedicure',
      image: '/assets/services/manicure-pedicure.jpg',
      count: getServicesByCategory('manicure-pedicure').length || 10,
      startingPrice: getLowestPriceInCategory('manicure-pedicure') || 450,
    },
    {
      id: 'bridal',
      name: 'Bridal Services',
      desc: 'Complete doorstep bridal glow, jewelry setting, veil pinning & royal prep.',
      route: '/services/bridal',
      image: '/assets/services/makeup-bridal-premium.jpg',
      count: SERVICES.filter(s => s.category === 'bridal' && s.name.toLowerCase().includes('bridal')).length || 2,
      startingPrice: 15998,
    },
    {
      id: 'body-care',
      name: 'Body Care',
      desc: 'HydraBoost body polishing, walnut scrub, reflexology & relaxing massage.',
      route: '/services/body-care',
      image: '/assets/services/body-polishing.jpg',
      count: SERVICES.filter(s => s.category === 'body-care' || s.category === 'polishing').length || 4,
      startingPrice: getLowestPriceInCategory('body-care') || 450,
    },
    {
      id: 'makeup',
      name: 'Makeup',
      desc: 'High-definition HD party makeup, reception glam & engagement elegance.',
      route: '/services/bridal',
      image: '/assets/services/makeup-hd.jpg',
      count: SERVICES.filter(s => s.category === 'bridal' && s.name.toLowerCase().includes('makeup')).length || 7,
      startingPrice: 2498,
    },
  ];

  return (
    <section id="categories" className="py-20 sm:py-24 bg-[#faf7f2] border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>Explore Our Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
              Curated Beauty Categories
            </h2>
            <p className="mt-2 text-sm sm:text-base text-stone-600 max-w-xl leading-relaxed">
              Explore professional ladies-only parlour treatments delivered directly to your home in Solapur.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="px-4 py-2.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-[#ebdccd] rounded-full transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>{showAllCategories ? 'Show Main 8 Categories' : 'View All 16 Categories'}</span>
            </button>

            <Link
              to="/services"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#c93514] rounded-full transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <span>Full Catalogue (91)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 8 Primary Main Categories Grid */}
        {!showAllCategories ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainCategories.map((cat) => (
              <div
                key={cat.id}
                className="group relative bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Category Image 4:3 */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                    
                    {/* Badge: Starting Price */}
                    <div className="absolute top-3 left-3 bg-[#e03e1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      From {formatPrice(cat.startingPrice)}
                    </div>

                    {/* Badge: Service Count */}
                    <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-stone-700">
                      {cat.count} {cat.count === 1 ? 'Service' : 'Services'}
                    </div>

                    {/* Category Title on Image */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-xl font-serif font-bold text-white leading-tight">
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-4 sm:p-5">
                    <p className="text-xs text-stone-600 leading-relaxed min-h-[2.5rem]">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Explore Button */}
                <div className="p-4 sm:p-5 pt-0">
                  <Link
                    to={cat.route}
                    className="w-full py-2.5 px-4 bg-[#faf7f2] hover:bg-[#e03e1a] text-stone-800 hover:text-white border border-[#ebdccd] hover:border-[#e03e1a] rounded-xl text-xs font-bold transition-all flex items-center justify-between group-hover:bg-[#fef2ee] group-hover:text-[#e03e1a]"
                  >
                    <span>Explore {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Full 16 Categories Grid when toggled */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {CATEGORIES.map((cat) => {
              const services = getServicesByCategory(cat.id);
              const count = services.length;
              const minPrice = getLowestPriceInCategory(cat.id);
              const banner = categoryBanners[cat.id] || BRANDED_PLACEHOLDER;

              return (
                <Link
                  key={cat.id}
                  to={`/services/${cat.id}`}
                  className="group relative bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                    <ServiceImage
                      src={banner}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-[#e03e1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      From {formatPrice(minPrice)}
                    </div>

                    <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-stone-700">
                      {count} Services
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                        {cat.tagline}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-white leading-tight mt-0.5">
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {cat.intro}
                    </p>

                    <div className="pt-2 border-t border-[#ebdccd]/70 flex items-center justify-between text-xs font-bold text-[#e03e1a]">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
