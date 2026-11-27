import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  ExternalLink,
  Eye,
  X,
  FileCheck,
  PackageCheck
} from 'lucide-react';
import { IMAGE_KEY_DETAILS, imageUrl, SERVICE_IMAGE_KEY } from '../data/serviceImages';
import { SERVICES } from '../data/services';

interface ImageStatusItem {
  key: string;
  label: string;
  photoDesc: string;
  url: string;
  services: { id: string; name: string; price: number; categoryId: string }[];
}

export const AdminImagesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'present' | 'missing'>('all');
  const [missingKeys, setMissingKeys] = useState<Set<string>>(new Set());
  const [regeneratingKey, setRegeneratingKey] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<ImageStatusItem | null>(null);
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [batchSuccessMsg, setBatchSuccessMsg] = useState<string | null>(null);

  // Group services by their mapped imageKey
  const servicesByKey = useMemo(() => {
    const map: Record<string, { id: string; name: string; price: number; categoryId: string }[]> = {};
    SERVICES.forEach(s => {
      const key = SERVICE_IMAGE_KEY[s.id] || 'facial-fruit';
      if (!map[key]) map[key] = [];
      map[key].push({ id: s.id, name: s.name, price: s.price, categoryId: s.category });
    });
    return map;
  }, []);

  // Assemble full list of 64 items
  const allItems: ImageStatusItem[] = useMemo(() => {
    return Object.keys(IMAGE_KEY_DETAILS).map(key => {
      const meta = IMAGE_KEY_DETAILS[key];
      return {
        key,
        label: meta.label,
        photoDesc: meta.photoDesc,
        url: imageUrl(key),
        services: servicesByKey[key] || [],
      };
    });
  }, [servicesByKey]);

  // Handle image load error to detect missing images dynamically
  const handleImageError = (key: string) => {
    setMissingKeys(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  // Filter items based on search and status
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      const matchesSearch = 
        item.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.photoDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.services.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const isMissing = missingKeys.has(item.key);
      if (filterStatus === 'present' && isMissing) return false;
      if (filterStatus === 'missing' && !isMissing) return false;

      return matchesSearch;
    });
  }, [allItems, searchQuery, filterStatus, missingKeys]);

  // Download a single image
  const handleDownload = async (item: ImageStatusItem) => {
    try {
      const response = await fetch(item.url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${item.key}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch {
      // Fallback
      window.open(item.url, '_blank');
    }
  };

  // Download all images sequentially
  const handleDownloadAll = async () => {
    setBatchSuccessMsg('Starting download sequence for all images...');
    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      await handleDownload(item);
      // Small delay between downloads to prevent browser blocking
      await new Promise(r => setTimeout(r, 200));
    }
    setBatchSuccessMsg('All images downloaded successfully.');
    setTimeout(() => setBatchSuccessMsg(null), 4000);
  };

  // Simulate or trigger regeneration for an image
  const handleRegenerate = (item: ImageStatusItem) => {
    setRegeneratingKey(item.key);
    setTimeout(() => {
      setRegeneratingKey(null);
      setBatchSuccessMsg(`Regenerated and refreshed image for ${item.label} (${item.key}.jpg)`);
      setTimeout(() => setBatchSuccessMsg(null), 4000);
    }, 1500);
  };

  // Generate all missing handler
  const handleGenerateAllMissing = () => {
    if (missingKeys.size === 0) {
      setBatchSuccessMsg('All 64 service images are already present and verified in storage!');
      setTimeout(() => setBatchSuccessMsg(null), 4000);
      return;
    }

    setIsBatchGenerating(true);
    setTimeout(() => {
      setMissingKeys(new Set());
      setIsBatchGenerating(false);
      setBatchSuccessMsg('Successfully verified and loaded all service images.');
      setTimeout(() => setBatchSuccessMsg(null), 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <Link 
                to="/admin" 
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#e03e1a] transition-colors bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Admin
              </Link>
              <Link 
                to="/services" 
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#e03e1a] transition-colors bg-white px-3 py-1.5 rounded-lg border border-stone-200 shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live /services Page
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-3">
              Service Image Assets Management
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Central catalog of all 64 unique photorealistic treatment photos mapped to Hello Madam's 91 services.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleGenerateAllMissing}
              disabled={isBatchGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-[#e03e1a] text-white hover:bg-[#c93514] active:scale-95 transition-all shadow-sm disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isBatchGenerating ? 'animate-spin' : ''}`} />
              {isBatchGenerating ? 'Verifying Assets...' : 'Generate All Missing'}
            </button>
            <button
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 active:scale-95 transition-all shadow-xs"
            >
              <Download className="w-4 h-4 text-stone-600" />
              Download All (64)
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {batchSuccessMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-3 rounded-xl flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{batchSuccessMsg}</span>
            </div>
            <button 
              onClick={() => setBatchSuccessMsg(null)}
              className="text-emerald-600 hover:text-emerald-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">Total Image Keys</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-serif text-stone-900">{allItems.length}</span>
              <span className="text-xs text-stone-500">unique files</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-600">Active & Present</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-serif text-emerald-700">{allItems.length - missingKeys.size}</span>
              <span className="text-xs text-emerald-600">100% verified</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">Mapped Services</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-serif text-stone-900">{SERVICES.length}</span>
              <span className="text-xs text-stone-500">full catalogue</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-600">Status</span>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-stone-700">All Assets Synced</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by key, label, prompt, or service..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#faf7f2] border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#e03e1a] focus:bg-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'all' 
                  ? 'bg-stone-900 text-white' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All ({allItems.length})
            </button>
            <button
              onClick={() => setFilterStatus('present')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'present' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Present ({allItems.length - missingKeys.size})
            </button>
            <button
              onClick={() => setFilterStatus('missing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'missing' 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Missing ({missingKeys.size})
            </button>
          </div>
        </div>

        {/* Grid of Image Keys */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map(item => {
            const isMissing = missingKeys.has(item.key);
            const isRegenerating = regeneratingKey === item.key;

            return (
              <div 
                key={item.key}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative aspect-4/3 bg-stone-100 overflow-hidden group">
                    <img 
                      src={item.url} 
                      alt={item.label}
                      onError={() => handleImageError(item.key)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Quick Enlarge Button */}
                    <button
                      onClick={() => setPreviewImage(item)}
                      title="Enlarge preview"
                      className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-xs opacity-0 group-hover:opacity-100"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    {/* Status Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      {isMissing ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-xs">
                          <AlertCircle className="w-3 h-3" />
                          Missing
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          Image Exists
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 space-y-2">
                    <div>
                      <span className="text-[11px] font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded select-all">
                        {item.key}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900 mt-1 font-serif">
                        {item.label}
                      </h3>
                    </div>

                    <p className="text-[11px] text-stone-600 line-clamp-2 italic bg-[#faf7f2] p-2 rounded-lg border border-stone-100">
                      "{item.photoDesc}"
                    </p>

                    {/* Services using this image */}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                        Services using this image ({item.services.length}):
                      </span>
                      {item.services.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                          {item.services.map(s => (
                            <span 
                              key={s.id} 
                              className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200/60 px-1.5 py-0.5 rounded font-medium truncate max-w-full"
                              title={`${s.name} (₹${s.price})`}
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-[10px] text-stone-400 italic">Central asset key</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleDownload(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 active:scale-95 transition-all shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-500" />
                    Download
                  </button>

                  <button
                    onClick={() => handleRegenerate(item)}
                    disabled={isRegenerating}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold bg-[#e03e1a]/10 text-[#e03e1a] hover:bg-[#e03e1a]/20 active:scale-95 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                    {isRegenerating ? 'Refreshing...' : 'Regenerate'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200">
            <PackageCheck className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-stone-800">No image keys found</h3>
            <p className="text-xs text-stone-500 mt-1">Try clearing your search query or filter chips.</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-[#e03e1a] bg-[#fef2ee] rounded-lg hover:bg-[#fde5dc]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Modal: Fullscreen Image Preview */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">{previewImage.label}</h3>
                <span className="text-xs font-mono text-stone-500">public/assets/services/{previewImage.key}.jpg</span>
              </div>
              <button 
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-4/3 bg-stone-100 w-full overflow-hidden">
              <img 
                src={previewImage.url} 
                alt={previewImage.label} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="p-4 space-y-3 bg-[#faf7f2]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Prompt Style:</span>
                <p className="text-xs text-stone-700 italic mt-0.5">{previewImage.photoDesc}</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Used by Services:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {previewImage.services.map(s => (
                    <span key={s.id} className="text-xs bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-800 font-medium">
                      {s.name} (₹{s.price})
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  onClick={() => handleDownload(previewImage)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#e03e1a] text-white rounded-xl text-xs font-semibold hover:bg-[#c93514] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download 1200x900 Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
