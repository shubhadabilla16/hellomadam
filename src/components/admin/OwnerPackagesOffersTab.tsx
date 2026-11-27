import React, { useState, useMemo } from 'react';
import { Plus, Edit3, Eye, Layers, Sparkles, Check, X } from 'lucide-react';
import { BeautyPackage } from '../../data/packagesData';
import { BusinessOffer } from '../../data/offersData';
import { ServiceItem } from '../../data/servicesData';
import { CATEGORY_MEDIA_MAP } from '../../data/serviceImageMap';

interface OwnerPackagesOffersTabProps {
  mode: 'packages' | 'offers';
  packages: BeautyPackage[];
  offers: BusinessOffer[];
  services: ServiceItem[];
  onCreatePackage: (pkg: Omit<BeautyPackage, 'id'>) => Promise<BeautyPackage>;
  onUpdatePackage: (packageId: string, updates: Partial<BeautyPackage>) => Promise<void>;
  onTogglePackageActive: (packageId: string) => Promise<void>;
  onAddOffer: (offer: Omit<BusinessOffer, 'id'>) => Promise<BusinessOffer>;
  onUpdateOffer: (offerId: string, updates: Partial<BusinessOffer>) => Promise<void>;
  onToggleOfferActive: (offerId: string) => Promise<void>;
  onToast: (msg: string) => void;
}

export const OwnerPackagesOffersTab: React.FC<OwnerPackagesOffersTabProps> = ({
  mode,
  packages,
  offers,
  services,
  onCreatePackage,
  onUpdatePackage,
  onTogglePackageActive,
  onAddOffer,
  onUpdateOffer,
  onToggleOfferActive,
  onToast,
}) => {
  // Package Modal State (Create or Edit)
  const [pkgModalOpen, setPkgModalOpen] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [pkgName, setPkgName] = useState('');
  const [pkgTagline, setPkgTagline] = useState('Curated Home Parlour Combo');
  const [pkgDesc, setPkgDesc] = useState('');
  const [pkgPrice, setPkgPrice] = useState<number>(1999);
  const [pkgDuration, setPkgDuration] = useState('120 mins');
  const [pkgServiceIds, setPkgServiceIds] = useState<string[]>([]);
  const [pkgSvcSearch, setPkgSvcSearch] = useState('');
  const [previewPkg, setPreviewPkg] = useState<BeautyPackage | null>(null);

  // Offer Modal State
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [offerBadge, setOfferBadge] = useState('Festive Special');
  const [offerTitle, setOfferTitle] = useState('');
  const [offerSubtitle, setOfferSubtitle] = useState('');
  const [offerDesc, setOfferDesc] = useState('');

  const combinedPrice = useMemo(() => {
    return pkgServiceIds.reduce((sum, id) => {
      const s = services.find((svc) => svc.id === id);
      return sum + (s?.price || 0);
    }, 0);
  }, [pkgServiceIds, services]);

  const filteredServicePool = useMemo(() => {
    const q = pkgSvcSearch.trim().toLowerCase();
    if (!q) return services.slice(0, 30);
    return services.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.categoryLabel.toLowerCase().includes(q)
    );
  }, [services, pkgSvcSearch]);

  const openCreatePkg = () => {
    setEditingPkgId(null);
    setPkgName('');
    setPkgTagline('Curated Home Parlour Combo');
    setPkgDesc('Complete ladies doorstep beauty package.');
    setPkgPrice(1999);
    setPkgDuration('120 mins');
    setPkgServiceIds([]);
    setPkgSvcSearch('');
    setPkgModalOpen(true);
  };

  const openEditPkg = (pkg: BeautyPackage) => {
    setEditingPkgId(pkg.id);
    setPkgName(pkg.name);
    setPkgTagline(pkg.tagline);
    setPkgDesc(pkg.description);
    setPkgPrice(pkg.packagePrice || 1499);
    setPkgDuration(pkg.estimatedTime || '90 mins');
    setPkgServiceIds([...pkg.includedServiceIds]);
    setPkgSvcSearch('');
    setPkgModalOpen(true);
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgName.trim()) return;
    const defaultImg = CATEGORY_MEDIA_MAP['facials']?.image || '/assets/services/facial-gold.jpg';
    if (editingPkgId) {
      await onUpdatePackage(editingPkgId, {
        name: pkgName.trim(),
        tagline: pkgTagline.trim(),
        description: pkgDesc.trim(),
        packagePrice: pkgPrice,
        estimatedTime: pkgDuration,
        includedServiceIds: pkgServiceIds,
      });
      onToast(`Updated package "${pkgName.trim()}"`);
    } else {
      await onCreatePackage({
        name: pkgName.trim(),
        nameHi: pkgName.trim(),
        tagline: pkgTagline.trim(),
        taglineHi: pkgTagline.trim(),
        description: pkgDesc.trim(),
        descriptionHi: pkgDesc.trim(),
        includedServiceIds: pkgServiceIds,
        packagePrice: pkgPrice,
        estimatedTime: pkgDuration,
        image: defaultImg,
        isOfficialOffer: true,
        highlights: pkgServiceIds
          .map((id) => services.find((s) => s.id === id)?.name)
          .filter(Boolean) as string[],
      });
      onToast(`Created demo package "${pkgName.trim()}"`);
    }
    setPkgModalOpen(false);
  };

  const openAddOffer = () => {
    setEditingOfferId(null);
    setOfferBadge('Special Privilege');
    setOfferTitle('');
    setOfferSubtitle('');
    setOfferDesc('');
    setOfferModalOpen(true);
  };

  const openEditOffer = (o: BusinessOffer) => {
    setEditingOfferId(o.id);
    setOfferBadge(o.badge);
    setOfferTitle(o.title);
    setOfferSubtitle(o.subtitle);
    setOfferDesc(o.description);
    setOfferModalOpen(true);
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerTitle.trim()) return;
    if (editingOfferId) {
      await onUpdateOffer(editingOfferId, {
        badge: offerBadge,
        badgeHi: offerBadge,
        title: offerTitle.trim(),
        titleHi: offerTitle.trim(),
        subtitle: offerSubtitle.trim(),
        subtitleHi: offerSubtitle.trim(),
        description: offerDesc.trim(),
        descriptionHi: offerDesc.trim(),
      });
      onToast('Updated promotional offer');
    } else {
      await onAddOffer({
        badge: offerBadge,
        badgeHi: offerBadge,
        title: offerTitle.trim(),
        titleHi: offerTitle.trim(),
        subtitle: offerSubtitle.trim(),
        subtitleHi: offerSubtitle.trim(),
        description: offerDesc.trim(),
        descriptionHi: offerDesc.trim(),
        ctaText: 'Book Now',
        ctaTextHi: 'बुक करें',
        ctaLink: '/book',
        isActive: true,
        terms: [],
        termsHi: [],
      });
      onToast('Added promotional offer');
    }
    setOfferModalOpen(false);
  };

  if (mode === 'offers') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">
              Promotional Offers ({offers.length})
            </h2>
            <p className="text-xs text-stone-500">
              Create, edit, and toggle promotional banners displayed on the website.
            </p>
          </div>
          <button
            type="button"
            onClick={openAddOffer}
            className="px-4 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Offer</span>
          </button>
        </div>

        <div className="space-y-4">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`bg-white rounded-3xl p-6 border flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                offer.isActive ? 'border-[#ebdccd]' : 'border-stone-200 opacity-65 bg-stone-50'
              }`}
            >
              <div className="space-y-1 max-w-xl">
                <div className="text-[11px] font-bold text-[#e03e1a] uppercase tracking-wider font-serif">
                  {offer.badge}
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900">{offer.title}</h3>
                <p className="text-xs font-semibold text-[#e03e1a]">{offer.subtitle}</p>
                <p className="text-xs text-stone-600">{offer.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => openEditOffer(offer)}
                  className="px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl inline-flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => void onToggleOfferActive(offer.id)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer ${
                    offer.isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {offer.isActive ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {offerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {editingOfferId ? 'Edit Promotional Offer' : 'Add Promotional Offer'}
                </h3>
                <button
                  type="button"
                  onClick={() => setOfferModalOpen(false)}
                  className="text-stone-400 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSaveOffer} className="space-y-3">
                <input
                  type="text"
                  placeholder="Offer Label (e.g. Festive Special)"
                  value={offerBadge}
                  onChange={(e) => setOfferBadge(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
                <input
                  type="text"
                  required
                  placeholder="Offer Title *"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Subtitle"
                  value={offerSubtitle}
                  onChange={(e) => setOfferSubtitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
                <textarea
                  rows={2}
                  placeholder="Description"
                  value={offerDesc}
                  onChange={(e) => setOfferDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOfferModalOpen(false)}
                    className="px-4 py-2 text-stone-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
                  >
                    Save Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // PACKAGES MODE
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-serif font-bold text-stone-900">
            Beauty Packages ({packages.length})
          </h2>
          <p className="text-xs text-stone-500">
            Create combos from existing services, auto-calculate combined pricing, preview cards, and toggle visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreatePkg}
          className="px-4 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => {
          const calcSum = pkg.includedServiceIds.reduce((sum, id) => {
            const s = services.find((sv) => sv.id === id);
            return sum + (s?.price || 0);
          }, 0);
          return (
            <div
              key={pkg.id}
              className={`bg-white rounded-3xl p-6 border space-y-4 ${
                pkg.isOfficialOffer ? 'border-[#ebdccd]' : 'border-stone-200 opacity-65 bg-stone-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-[#ebdccd]"
                  />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-[#e03e1a] uppercase tracking-wider font-serif truncate">
                      {pkg.tagline}
                    </div>
                    <h3 className="text-base font-serif font-bold text-stone-900 truncate">
                      {pkg.name}
                    </h3>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-stone-500 block">Demo Package Price</span>
                  <span className="text-xl font-bold text-[#e03e1a] font-serif tabular-nums">
                    ₹{(pkg.packagePrice || calcSum).toLocaleString('en-IN')}
                  </span>
                  {calcSum > 0 && (
                    <span className="text-[11px] text-stone-400 line-through block tabular-nums">
                      Combined: ₹{calcSum.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{pkg.description}</p>

              <div className="text-xs text-stone-500">
                Includes {pkg.includedServiceIds.length} services · {pkg.estimatedTime || '90 mins'}
              </div>

              <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditPkg(pkg)}
                    className="px-3 py-1.5 font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Package</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewPkg(pkg)}
                    className="px-3 py-1.5 font-bold text-[#e03e1a] bg-[#fef2ee] hover:bg-[#fde4dc] rounded-xl inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Card</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => void onTogglePackageActive(pkg.id)}
                  className={`px-3.5 py-1.5 font-bold rounded-xl cursor-pointer ${
                    pkg.isOfficialOffer
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {pkg.isOfficialOffer ? 'Active' : 'Hidden'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Package Modal with Live Combined Price & Card Preview */}
      {pkgModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-3xl w-full border border-[#ebdccd] shadow-2xl max-h-[90vh] overflow-y-auto space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {editingPkgId ? 'Edit Beauty Package' : 'Create Beauty Package'}
              </h3>
              <button
                type="button"
                onClick={() => setPkgModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Form Left */}
              <div className="lg:col-span-7 space-y-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={pkgName}
                    onChange={(e) => setPkgName(e.target.value)}
                    placeholder="e.g. Festive Bridal Radiance Combo"
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={pkgTagline}
                      onChange={(e) => setPkgTagline(e.target.value)}
                      className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={pkgDuration}
                      onChange={(e) => setPkgDuration(e.target.value)}
                      className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={pkgDesc}
                    onChange={(e) => setPkgDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Add Services ({pkgServiceIds.length} selected · Combined Value: ₹
                    {combinedPrice.toLocaleString('en-IN')})
                  </label>
                  <input
                    type="text"
                    placeholder="Search catalog services to include..."
                    value={pkgSvcSearch}
                    onChange={(e) => setPkgSvcSearch(e.target.value)}
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl mb-2 bg-[#faf7f2]"
                  />
                  <div className="max-h-44 overflow-y-auto border border-[#ebdccd] rounded-xl divide-y divide-stone-100">
                    {filteredServicePool.map((svc) => {
                      const picked = pkgServiceIds.includes(svc.id);
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          onClick={() =>
                            setPkgServiceIds((prev) =>
                              picked ? prev.filter((i) => i !== svc.id) : [...prev, svc.id]
                            )
                          }
                          className={`w-full px-3 py-2 text-left flex items-center justify-between gap-2 cursor-pointer ${
                            picked ? 'bg-[#fef2ee]' : 'hover:bg-stone-50'
                          }`}
                        >
                          <span className="truncate font-medium text-stone-800">{svc.name}</span>
                          <span className="flex items-center gap-2 shrink-0">
                            <span className="font-mono font-bold text-stone-700 tabular-nums">
                              ₹{svc.price}
                            </span>
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                picked
                                  ? 'bg-[#e03e1a] border-[#e03e1a] text-white'
                                  : 'border-stone-300 bg-white'
                              }`}
                            >
                              {picked && <Check className="w-3 h-3" />}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Demo Package Price (₹)
                  </label>
                  <input
                    type="number"
                    min={100}
                    value={pkgPrice}
                    onChange={(e) => setPkgPrice(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl font-bold tabular-nums"
                  />
                </div>
              </div>

              {/* Live Package Card Preview Right */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Live Package Card Preview
                  </div>
                  <div className="bg-[#faf7f2] rounded-3xl border border-[#ebdccd] p-5 space-y-3">
                    <div className="text-[10px] font-bold text-[#e03e1a] uppercase tracking-wider font-serif">
                      {pkgTagline || 'Curated Combo'}
                    </div>
                    <h4 className="text-lg font-serif font-bold text-stone-900">
                      {pkgName || 'Your New Package'}
                    </h4>
                    <p className="text-xs text-stone-600">
                      {pkgDesc || 'Included treatments appear below.'}
                    </p>
                    <div className="space-y-1 pt-2 border-t border-[#ebdccd]/70">
                      {pkgServiceIds.length === 0 ? (
                        <div className="text-[11px] text-stone-400">
                          Select services on the left to calculate combined price
                        </div>
                      ) : (
                        pkgServiceIds.map((id) => {
                          const s = services.find((sv) => sv.id === id);
                          if (!s) return null;
                          return (
                            <div key={id} className="flex justify-between text-[11px]">
                              <span className="text-stone-700 truncate pr-2">{s.name}</span>
                              <span className="font-mono text-stone-500 tabular-nums">
                                ₹{s.price}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div className="pt-3 border-t border-[#ebdccd] flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-stone-500 block">Combined Total</span>
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ₹{combinedPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-stone-500 block">Demo Package Price</span>
                        <span className="text-xl font-serif font-bold text-[#e03e1a] tabular-nums">
                          ₹{pkgPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setPkgModalOpen(false)}
                    className="px-4 py-2 text-stone-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full cursor-pointer"
                  >
                    Save Package
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Card Preview Modal */}
      {previewPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#e03e1a] uppercase">
                <Layers className="w-4 h-4" />
                <span>Package Card Preview</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewPkg(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <img
              src={previewPkg.image}
              alt={previewPkg.name}
              className="w-full h-44 object-cover rounded-2xl border border-[#ebdccd]"
            />

            <div>
              <div className="text-[11px] font-bold text-[#e03e1a] uppercase font-serif">
                {previewPkg.tagline}
              </div>
              <h4 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                {previewPkg.name}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{previewPkg.description}</p>
            </div>

            <div className="bg-[#faf7f2] rounded-2xl p-4 border border-[#ebdccd] space-y-1.5 text-xs">
              {previewPkg.includedServiceIds.map((id) => {
                const s = services.find((sv) => sv.id === id);
                if (!s) return null;
                return (
                  <div key={id} className="flex justify-between">
                    <span className="text-stone-700">{s.name}</span>
                    <span className="font-mono font-bold text-stone-900 tabular-nums">
                      ₹{s.price}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-500">{previewPkg.estimatedTime || '90 mins'}</span>
              <span className="text-2xl font-serif font-bold text-[#e03e1a] tabular-nums">
                ₹{(previewPkg.packagePrice || 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
