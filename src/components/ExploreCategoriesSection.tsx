import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORY_MEDIA_MAP } from '../data/serviceImageMap';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

export const ExploreCategoriesSection: React.FC = () => {
  const { services } = useAdmin();
  const { t, language } = useLanguage();

  const categoryList = Object.values(CATEGORY_MEDIA_MAP);

  return (
    <section id="categories" className="py-20 sm:py-28 bg-[#faf7f2] border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase font-serif mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>{t('section.categories_title', 'Explore Salon Services')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            {language === 'hi' ? 'हमारी 13 प्रमुख सेवाएं' : 'Complete Beauty Catalogue'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            {t(
              'section.categories_sub',
              'Browse through our complete 13 service categories designed exclusively for women in Solapur. Clinical hygiene, certified professionals, and zero travel charges.'
            )}
          </p>
        </div>

        {/* Categories Grid - 13 categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryList.map((cat) => {
            // Calculate dynamic count from live service list
            const count = services.filter((s) => s.category === cat.id).length;

            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5"
              >
                {/* Category Image with 4:3 Ratio */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                  
                  {/* Dynamic Count Pill */}
                  <div className="absolute top-3 right-3 bg-stone-900/85 backdrop-blur-md text-amber-200 text-[11px] font-bold px-2.5 py-1 rounded-full border border-stone-700 tabular-nums">
                    {count} {count === 1 ? 'Service' : 'Services'}
                  </div>

                  {/* Category Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                      {language === 'hi' ? cat.taglineHi : cat.tagline}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                      {language === 'hi' ? cat.nameHi : cat.name}
                    </h3>
                  </div>
                </div>

                {/* Category Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {language === 'hi' ? cat.descriptionHi : cat.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      to={`/services?category=${cat.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e03e1a] group-hover:text-[#b82e0e] transition-colors"
                    >
                      <span>{t('btn.explore', 'Explore Category')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      to={`/book`}
                      className="px-3 py-1 text-[11px] font-semibold text-stone-700 bg-stone-100 hover:bg-[#fef2ee] hover:text-[#e03e1a] rounded-full transition-colors"
                    >
                      {t('btn.book_now', 'Book')}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to view all in services page */}
        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full shadow-sm hover:shadow-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>{language === 'hi' ? 'सभी 60+ सेवाओं की पूरी लिस्ट देखें' : 'View Full Service Catalogue (60+ Services)'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
