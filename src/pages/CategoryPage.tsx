import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES, getCategoryById } from '../data/categories';
import { getServicesByCategory, Service } from '../data/services';
import { categoryBanners, BRANDED_PLACEHOLDER } from '../data/serviceImages';
import { formatPrice } from '../utils/formatters';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceImage } from '../components/ServiceImage';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const allCategoryServices = categoryId ? getServicesByCategory(categoryId) : [];

  const [selectedSub, setSelectedSub] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Compute price range
  const priceRange = useMemo(() => {
    if (allCategoryServices.length === 0) return { min: 0, max: 0 };
    const prices = allCategoryServices.map(s => s.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [allCategoryServices]);

  // Filtered and sorted services within this category
  const services = useMemo(() => {
    return allCategoryServices.filter((service: Service) => {
      if (selectedSub !== 'all' && service.sub !== selectedSub) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = service.name.toLowerCase().includes(q);
        const matchesSub = service.sub ? service.sub.toLowerCase().includes(q) : false;
        return matchesName || matchesSub;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [allCategoryServices, selectedSub, searchQuery, sortBy]);

  // If category not found, show friendly 404 state
  if (!category) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center bg-[#faf7f2]">
        <div className="w-16 h-16 rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-4">
          <Sparkles className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-2">
          Category Not Found
        </h1>
        <p className="text-sm text-stone-600 max-w-md mb-6 leading-relaxed">
          The parlour service category you are looking for does not exist or has been moved. Explore all 16 categories in our main service catalogue.
        </p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#e03e1a] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#c93514] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  const bannerImg = categoryId ? (categoryBanners[categoryId] || BRANDED_PLACEHOLDER) : BRANDED_PLACEHOLDER;

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-[#ebdccd] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <li>
              <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            </li>
            <li>
              <Link to="/services" className="hover:text-stone-900 transition-colors">Services</Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            </li>
            <li aria-current="page">
              <span className="text-[#e03e1a] font-bold">{category.name}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. Category Hero Banner */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <ServiceImage
            src={bannerImg}
            alt={category.name}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs text-amber-200 hover:text-white font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Categories</span>
          </Link>

          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-[#e03e1a] text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-3 shadow-xs">
              Ladies-Only Home Service
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              {category.name}
            </h1>
            <p className="mt-2 text-base text-amber-100 font-serif italic">
              {category.tagline}
            </p>
            <p className="mt-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
              {category.intro}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-stone-300 border-t border-white/10 pt-4">
              <div>
                <span className="text-stone-400 block font-serif">Services Available</span>
                <span className="text-white font-bold text-sm">{allCategoryServices.length} Treatments</span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <span className="text-stone-400 block font-serif">Price Range</span>
                <span className="text-amber-300 font-bold text-sm">
                  {formatPrice(priceRange.min)} &ndash; {formatPrice(priceRange.max)}
                </span>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <span className="text-stone-400 block font-serif">Location</span>
                <span className="text-white font-bold text-sm">Doorstep in Solapur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Filter Bar (Subcategories & Search) */}
      <section className="sticky top-20 z-20 bg-white border-b border-[#ebdccd] py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSub('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedSub === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Types ({allCategoryServices.length})
            </button>
            {category.subcategories.map((sub) => {
              const count = allCategoryServices.filter(s => s.sub === sub).length;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSub(sub)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedSub === sub
                      ? 'bg-[#e03e1a] text-white'
                      : 'bg-[#faf7f2] text-stone-700 border border-[#ebdccd] hover:border-[#e03e1a]'
                  }`}
                >
                  <span>{sub}</span>
                  <span className="ml-1.5 text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search & Sort */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder={`Search in ${category.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#e03e1a] w-48 sm:w-56"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#ebdccd] rounded-xl px-2.5 py-1.5 text-xs font-semibold text-stone-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#e03e1a]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>
      </section>

      {/* 4. Services Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-stone-500 font-medium">
            Showing <strong className="text-stone-900 font-bold">{services.length}</strong> {services.length === 1 ? 'treatment' : 'treatments'} in {category.name}
          </p>

          <Link to="/services" className="text-xs font-bold text-[#e03e1a] hover:underline">
            View all 16 categories &rarr;
          </Link>
        </div>

        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#ebdccd] max-w-md mx-auto my-8">
            <h3 className="text-base font-serif font-bold text-stone-900 mb-2">
              No services match your filter
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Try choosing another subcategory or reset your search.
            </p>
            <button
              onClick={() => {
                setSelectedSub('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
