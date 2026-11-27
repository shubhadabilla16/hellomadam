import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  X, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { SERVICES, Service } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { PriceListModal } from '../components/PriceListModal';

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Parse state from URL params, default sort to 'price-asc' (Price: Low to High)
  const paramQ = searchParams.get('q') || '';
  const paramCat = searchParams.get('cat') || searchParams.get('category') || 'all';
  const paramSort = searchParams.get('sort') || 'price-asc';
  const paramFocus = searchParams.get('focus');

  const [searchQuery, setSearchQuery] = useState(paramQ);
  const [selectedCategory, setSelectedCategory] = useState(paramCat);
  const [sortBy, setSortBy] = useState(paramSort);
  const [pageSize, setPageSize] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);

  // Focus search input if ?focus=1 was passed
  useEffect(() => {
    if (paramFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [paramFocus]);

  // Keep local state in sync when URL query changes
  useEffect(() => {
    setSearchQuery(paramQ);
    setSelectedCategory(paramCat);
    setSortBy(paramSort);
  }, [paramQ, paramCat, paramSort]);

  // Update URL params whenever filters change
  const updateParams = (updates: { q?: string; cat?: string; sort?: string }) => {
    const nextQ = updates.q !== undefined ? updates.q : searchQuery;
    const nextCat = updates.cat !== undefined ? updates.cat : selectedCategory;
    const nextSort = updates.sort !== undefined ? updates.sort : sortBy;

    const newParams = new URLSearchParams();
    if (nextQ.trim()) newParams.set('q', nextQ.trim());
    if (nextCat && nextCat !== 'all') newParams.set('cat', nextCat);
    if (nextSort && nextSort !== 'price-asc') newParams.set('sort', nextSort);

    setSearchParams(newParams, { replace: true });
    setCurrentPage(1);
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    updateParams({ cat: catId });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateParams({ sort: sort });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateParams({ q: query });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('price-asc');
    setSearchParams(new URLSearchParams(), { replace: true });
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all' || sortBy !== 'price-asc';

  // Compute category counts across all 91 services
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: SERVICES.length };
    CATEGORIES.forEach(cat => {
      counts[cat.id] = SERVICES.filter(s => s.category === cat.id).length;
    });
    return counts;
  }, []);

  // Filtered and sorted services (Default sort: Price Low to High)
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service: Service) => {
      // Category filter
      if (selectedCategory !== 'all' && service.category !== selectedCategory) {
        return false;
      }

      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = service.name.toLowerCase().includes(q);
        const matchesCategory = service.category.toLowerCase().includes(q);
        const matchesSub = service.sub ? service.sub.toLowerCase().includes(q) : false;
        return matchesName || matchesCategory || matchesSub;
      }

      return true;
    }).sort((a: Service, b: Service) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.price - b.price;
      }
      return a.price - b.price;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Pagination calculation
  const totalEntries = filteredServices.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEntries);
  const paginatedServices = filteredServices.slice(startIndex, endIndex);

  // Generate page numbers
  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, safeCurrentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [safeCurrentPage, totalPages]);

  return (
    <div className="flex flex-col min-h-screen bg-[#faf7f2]">
      
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-[#ebdccd] pt-8 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#e03e1a] uppercase mb-1.5 font-serif">
                <Sparkles className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>Ladies-Only Doorstep Salon · Solapur</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 tracking-tight">
                Our Services &amp; Price List
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                91 professional salon treatments delivered to your home. Certified female beauticians, 100% single-use disposable kits, and transparent pricing.
              </p>
            </div>

            <button
              onClick={() => setIsPriceListOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-800 bg-[#fef2ee] hover:bg-[#fae4dc] border border-[#f4c8ba] rounded-full transition-colors cursor-pointer shrink-0 self-start md:self-auto"
            >
              <span>View Rate Card Table</span>
            </button>
          </div>

          {/* Search Box & Sort Controls */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search any service (e.g. eyebrow threading, honey wax, fruit facial, bridal)..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#e03e1a] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="text-xs text-stone-500 font-medium hidden sm:inline">Sort by:</span>
              <div className="relative inline-flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none bg-[#faf7f2] border border-[#ebdccd] rounded-xl pl-3 pr-8 py-2 text-xs font-semibold text-stone-800 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#e03e1a]"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="featured">Featured / Spotlight</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 pointer-events-none" />
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-bold text-[#e03e1a] hover:underline cursor-pointer ml-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Chips Bar (Sticky) */}
      <section className="sticky top-20 z-30 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#ebdccd] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-[#ebdccd] hover:border-stone-400'
              }`}
            >
              <span>All Services</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
              }`}>
                {categoryCounts.all}
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    active
                      ? 'bg-[#e03e1a] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-[#ebdccd] hover:border-[#e03e1a]/40 hover:bg-[#fef2ee]/40'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Services Grid: 4 cols on desktop, 3 on tablet, 2 on phones */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        {paginatedServices.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {paginatedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-[#ebdccd] max-w-md mx-auto my-8">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#fef2ee] text-[#e03e1a] flex items-center justify-center mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-900 mb-1">
              No services found
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Try searching for another treatment or clear your filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-[#e03e1a] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-[#c93514] transition-colors cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* 4. Bottom Controls: Display Entries Selector, Showing X of Y, and Pagination */}
        {totalEntries > 0 && (
          <div className="mt-8 pt-6 border-t border-[#ebdccd] flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Display Entries Selector */}
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span>Display</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-[#ebdccd] rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#e03e1a] cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries</span>
            </div>

            {/* Showing X to Y of Z entries */}
            <div className="text-xs text-stone-500 font-medium">
              Showing <strong className="text-stone-800 font-bold">{totalEntries === 0 ? 0 : startIndex + 1}</strong> to{' '}
              <strong className="text-stone-800 font-bold">{endIndex}</strong> of{' '}
              <strong className="text-stone-800 font-bold">{totalEntries}</strong> entries
            </div>

            {/* Pagination Buttons (Previous / page numbers / Next) */}
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={safeCurrentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-[#ebdccd] bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors font-medium"
              >
                Previous
              </button>

              {pageNumbers.map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    safeCurrentPage === num
                      ? 'bg-[#e03e1a] text-white shadow-xs'
                      : 'bg-white border border-[#ebdccd] text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={safeCurrentPage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-[#ebdccd] bg-white text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors font-medium"
              >
                Next
              </button>
            </div>

          </div>
        )}
      </main>

      {/* Official Price List Modal */}
      <PriceListModal
        isOpen={isPriceListOpen}
        onClose={() => setIsPriceListOpen(false)}
      />
    </div>
  );
};
