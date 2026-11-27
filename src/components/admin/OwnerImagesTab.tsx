import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Upload, Eye, ExternalLink, X, Sparkles } from 'lucide-react';
import { ServiceItem, CATEGORIES } from '../../data/servicesData';

interface OwnerImagesTabProps {
  services: ServiceItem[];
  onUpdateServiceImage: (serviceId: string, newUrl: string) => Promise<void>;
  onToast: (msg: string) => void;
}

export const OwnerImagesTab: React.FC<OwnerImagesTabProps> = ({
  services,
  onUpdateServiceImage,
  onToast,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [previewService, setPreviewService] = useState<ServiceItem | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return services.filter((s) => {
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      if (
        q &&
        !s.name.toLowerCase().includes(q) &&
        !s.categoryLabel.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [services, search, categoryFilter]);

  const handleFileUpload = (serviceId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        await onUpdateServiceImage(serviceId, reader.result);
        onToast('Updated local preview image');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-serif font-bold text-stone-900">
            Service Photography &amp; Previews ({services.length})
          </h2>
          <p className="text-xs text-stone-500">
            Inspect active treatment photos or upload local preview overrides stored in your browser.
          </p>
        </div>

        <Link
          to="/admin/images"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#e03e1a] bg-[#fef2ee] border border-[#f4c8ba] rounded-xl hover:bg-[#fde4dc] shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full 64-Asset Gallery</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#ebdccd] rounded-xl"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-white border border-[#ebdccd] rounded-xl text-stone-700"
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-2xl border border-[#ebdccd] overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
              <img
                src={svc.image}
                alt={svc.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setPreviewService(svc)}
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-stone-800 hover:bg-white shadow-xs cursor-pointer"
                title="Preview Full Size"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3.5 space-y-2.5">
              <div>
                <div className="text-[11px] text-[#e03e1a] font-semibold">
                  {svc.categoryLabel}
                </div>
                <div className="text-xs font-serif font-bold text-stone-900 truncate">
                  {svc.name}
                </div>
              </div>

              <label className="w-full py-1.5 px-3 bg-[#faf7f2] hover:bg-[#f2e8dc] border border-[#ebdccd] rounded-xl text-[11px] font-bold text-stone-700 flex items-center justify-center gap-1.5 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#e03e1a]" />
                <span>Upload Preview Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(svc.id, e)}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      {previewService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 max-w-lg w-full border border-[#ebdccd] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-stone-900">
                {previewService.name}
              </h3>
              <button
                type="button"
                onClick={() => setPreviewService(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <img
              src={previewService.image}
              alt={previewService.name}
              className="w-full aspect-[4/3] object-cover rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
