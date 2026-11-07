import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Edit3, 
  Plus, 
  Tag, 
  Layers, 
  Sparkles, 
  Search, 
  Check, 
  Phone, 
  MessageCircle, 
  MapPin, 
  RotateCcw,
  Star,
  Video,
  FileText
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useBooking, BookingStatus, ConfirmedBooking } from '../context/BookingContext';
import { CATEGORIES } from '../data/servicesData';
import { CATEGORY_MEDIA_MAP } from '../data/serviceImageMap';

export const AdminPage: React.FC = () => {
  const { 
    services, 
    updateServicePrice, 
    toggleServiceFeatured, 
    toggleServicePopular, 
    updateServiceImage,
    addNewService,
    packages, 
    togglePackageActive, 
    updatePackagePrice,
    offers, 
    toggleOfferActive,
    resetToDefaults
  } = useAdmin();

  const { allBookings, updateBookingStatus, rescheduleBooking } = useBooking();

  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'packages' | 'offers'>('bookings');
  
  // Search & Filters in admin
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [serviceSearch, setServiceSearch] = useState<string>('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('all');

  // Editing state for price
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [editingImageServiceId, setEditingImageServiceId] = useState<string | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string>('');

  // New Service Modal
  const [showAddServiceModal, setShowAddServiceModal] = useState<boolean>(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('facials');
  const [newServicePrice, setNewServicePrice] = useState(500);
  const [newServiceDuration, setNewServiceDuration] = useState('30 mins');
  const [newServiceDesc, setNewServiceDesc] = useState('');

  // Reschedule Booking modal
  const [rescheduleTarget, setRescheduleTarget] = useState<ConfirmedBooking | null>(null);
  const [newDate, setNewDate] = useState('2026-11-08');
  const [newSlot, setNewSlot] = useState('11:15 AM - 12:15 PM');

  // Filtered Bookings
  const filteredBookings = allBookings.filter((b) => {
    if (bookingFilterStatus === 'all') return true;
    return b.status === bookingFilterStatus;
  });

  // Filtered Services
  const filteredServices = services.filter((s) => {
    const matchesCat = serviceCategoryFilter === 'all' || s.category === serviceCategoryFilter;
    const matchesSearch = s.name.toLowerCase().includes(serviceSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSavePrice = (serviceId: string) => {
    if (tempPrice > 0) {
      updateServicePrice(serviceId, tempPrice);
    }
    setEditingServiceId(null);
  };

  const handleSaveImage = (serviceId: string) => {
    if (tempImageUrl.trim()) {
      updateServiceImage(serviceId, tempImageUrl.trim());
    }
    setEditingImageServiceId(null);
  };

  const handleCreateNewService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim()) return;

    const catObj = CATEGORIES.find(c => c.id === newServiceCategory);
    addNewService({
      name: newServiceName.trim(),
      category: newServiceCategory as any,
      categoryLabel: catObj ? catObj.label : 'Speciality',
      price: newServicePrice,
      duration: newServiceDuration,
      description: newServiceDesc.trim() || 'Professional ladies doorstep service in Solapur.',
      image: CATEGORY_MEDIA_MAP[newServiceCategory]?.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
      isPopular: true
    });

    setShowAddServiceModal(false);
    setNewServiceName('');
    setNewServiceDesc('');
  };

  const handleConfirmReschedule = () => {
    if (rescheduleTarget) {
      rescheduleBooking(rescheduleTarget.bookingId, newDate, newSlot);
      setRescheduleTarget(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ebdccd] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#fef2ee] rounded-2xl border border-[#f4c8ba] text-[#e03e1a]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#e03e1a] uppercase tracking-wider font-serif">
                  Hello Madam Owner Portal
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Solapur HQ
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Business & Appointment Management
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                Manage appointment requests, services, packages, and seasonal offers in real-time.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('Reset all edited services, packages, and offers to factory defaults?')) {
                  resetToDefaults();
                }
              }}
              className="px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <Link
              to="/"
              className="px-5 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-colors shadow-2xs"
            >
              Back to Website
            </Link>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-[#ebdccd] pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 text-xs font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-[#ebdccd]'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Appointment Requests ({allBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 text-xs font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-[#ebdccd]'
            }`}
          >
            <Tag className="w-4 h-4 text-amber-300" />
            <span>Services & Pricing ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-5 py-2.5 text-xs font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'packages'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-[#ebdccd]'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-300" />
            <span>Beauty Packages ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`px-5 py-2.5 text-xs font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'offers'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-50 border border-[#ebdccd]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Promotional Offers ({offers.length})</span>
          </button>
        </div>

        {/* ================= TAB 1: APPOINTMENT REQUESTS ================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['all', 'Pending Confirmation', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setBookingFilterStatus(st)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    bookingFilterStatus === st
                      ? 'bg-[#e03e1a] text-white shadow-2xs'
                      : 'bg-white text-stone-700 border border-[#ebdccd] hover:bg-stone-50'
                  }`}
                >
                  {st === 'all' ? 'All Bookings' : st}
                </button>
              ))}
            </div>

            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#ebdccd]">
                <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                <p className="text-sm font-serif font-bold text-stone-800">No appointments in this view</p>
                <p className="text-xs text-stone-500 mt-1">New requests submitted by customers will show up here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.bookingId}
                    className="bg-white rounded-3xl border border-[#ebdccd] p-6 shadow-2xs space-y-4"
                  >
                    {/* Top Row: Ref & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-stone-900 text-white text-xs font-mono font-bold rounded-lg">
                          {b.bookingId}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Booked: {new Date(b.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'Pending Confirmation'
                              ? 'bg-amber-100 text-amber-900'
                              : b.status === 'Completed'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>

                    {/* Middle Row: Client info & Schedule */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* Client */}
                      <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-1">
                        <div className="text-[11px] font-bold text-stone-400 uppercase font-serif">Customer Details</div>
                        <div className="text-sm font-bold text-stone-900">{b.customerDetails.fullName}</div>
                        <div className="text-stone-700 font-mono flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#e03e1a]" />
                          <span>{b.customerDetails.mobileNumber}</span>
                        </div>
                        <div className="text-stone-600 flex items-start gap-1.5 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#e03e1a] shrink-0 mt-0.5" />
                          <span>{b.customerDetails.fullAddress}, {b.customerDetails.area}</span>
                        </div>
                        {b.customerDetails.additionalInstructions && (
                          <div className="text-[11px] text-amber-800 italic pt-1">
                            Note: "{b.customerDetails.additionalInstructions}"
                          </div>
                        )}
                      </div>

                      {/* Schedule */}
                      <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-1">
                        <div className="text-[11px] font-bold text-stone-400 uppercase font-serif">Scheduled Time</div>
                        <div className="text-sm font-bold text-stone-900">{b.date}</div>
                        <div className="text-stone-700 font-medium">{b.timeSlot}</div>
                        <div className="text-stone-500">Est. Duration: ~{b.totalDurationMins} mins</div>
                      </div>

                      {/* Services & Total */}
                      <div className="p-3.5 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-stone-400 uppercase font-serif">
                            Requested Services ({b.services.length})
                          </div>
                          <div className="space-y-1 mt-1 max-h-24 overflow-y-auto pr-1">
                            {b.services.map((s) => (
                              <div key={s.id} className="flex justify-between text-[11px] text-stone-700">
                                <span className="truncate pr-2">{s.name}</span>
                                <span className="font-bold tabular-nums">₹{s.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                          <span className="font-bold text-stone-900">Total Payable:</span>
                          <span className="text-base font-bold text-[#e03e1a] font-serif tabular-nums">
                            ₹{b.totalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Controls for Owner */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* WhatsApp Client Notification */}
                        <a
                          href={`https://wa.me/91${b.customerDetails.mobileNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                            `Hello ${b.customerDetails.fullName}! This is Hello Madam Solapur. Your appointment ${b.bookingId} for ${b.date} at ${b.timeSlot} has been APPROVED. Our beautician will arrive on time with sanitized kits.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-colors flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                          <span>WhatsApp Client Confirmation</span>
                        </a>

                        {/* Call Client */}
                        <a
                          href={`tel:${b.customerDetails.mobileNumber}`}
                          className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-[#e03e1a]" />
                          <span>Call Client</span>
                        </a>
                      </div>

                      {/* Status Change Buttons */}
                      <div className="flex items-center gap-2">
                        {b.status === 'Pending Confirmation' && (
                          <button
                            onClick={() => updateBookingStatus(b.bookingId, 'Confirmed')}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve Booking</span>
                          </button>
                        )}

                        {b.status === 'Confirmed' && (
                          <button
                            onClick={() => updateBookingStatus(b.bookingId, 'Completed')}
                            className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Completed</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setRescheduleTarget(b);
                            setNewDate(b.date);
                            setNewSlot(b.timeSlot);
                          }}
                          className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 border border-stone-200 rounded-full transition-colors cursor-pointer"
                        >
                          Reschedule
                        </button>

                        {b.status !== 'Cancelled' && (
                          <button
                            onClick={() => updateBookingStatus(b.bookingId, 'Cancelled')}
                            className="p-1.5 text-stone-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                            title="Cancel Booking"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: SERVICES & PRICING ================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            
            {/* Top Bar: Search, Category Filter, Add Service Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Search service name..."
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20"
                  />
                </div>

                <select
                  value={serviceCategoryFilter}
                  onChange={(e) => setServiceCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-[#ebdccd] rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#e03e1a]/20 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowAddServiceModal(true)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-full transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Services Table List */}
            <div className="bg-white rounded-3xl border border-[#ebdccd] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf7f2] border-b border-[#ebdccd] text-stone-600 font-serif">
                    <tr>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Official Price</th>
                      <th className="py-3 px-4">Featured / Popular</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredServices.map((service) => (
                      <tr key={service.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="w-10 h-10 rounded-xl object-cover shrink-0 border border-stone-200"
                            />
                            <div>
                              <div className="font-bold text-stone-900">{service.name}</div>
                              {service.subcategory && (
                                <span className="text-[10px] text-stone-500 block">
                                  {service.subcategory}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-stone-600 font-medium">
                          {service.categoryLabel}
                        </td>

                        <td className="py-3 px-4 text-stone-500">
                          {service.duration}
                        </td>

                        {/* Price Cell with inline edit */}
                        <td className="py-3 px-4">
                          {editingServiceId === service.id ? (
                            <div className="flex items-center gap-2">
                              <span className="font-bold">₹</span>
                              <input
                                type="number"
                                value={tempPrice}
                                onChange={(e) => setTempPrice(parseInt(e.target.value, 10) || 0)}
                                className="w-20 px-2 py-1 text-xs border rounded-lg focus:outline-none"
                                autoFocus
                              />
                              <button
                                onClick={() => handleSavePrice(service.id)}
                                className="p-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-stone-900 font-serif tabular-nums text-sm">
                                {service.priceDisplay || `₹${service.price}`}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingServiceId(service.id);
                                  setTempPrice(service.price);
                                }}
                                className="text-stone-400 hover:text-[#e03e1a] p-1 cursor-pointer"
                                title="Edit Price"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Toggles for Popular / Featured */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleServicePopular(service.id)}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                                service.isPopular
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                              }`}
                            >
                              Popular
                            </button>

                            <button
                              onClick={() => toggleServiceFeatured(service.id)}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                                service.featuredInVideo
                                  ? 'bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba]'
                                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                              }`}
                            >
                              Featured
                            </button>
                          </div>
                        </td>

                        {/* Edit Image Link */}
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              const newUrl = prompt('Enter new image URL for ' + service.name, service.image);
                              if (newUrl && newUrl.trim()) {
                                updateServiceImage(service.id, newUrl.trim());
                              }
                            }}
                            className="text-stone-500 hover:text-[#e03e1a] text-xs underline cursor-pointer"
                          >
                            Change Photo
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: BEAUTY PACKAGES ================= */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">Configured Packages</h3>
                <p className="text-xs text-stone-500">Toggle packages active/inactive as official offers on the homepage.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-3xl p-6 border transition-all space-y-4 ${
                    pkg.isOfficialOffer
                      ? 'border-[#ebdccd] shadow-2xs'
                      : 'border-stone-200 opacity-60 bg-stone-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-14 h-14 rounded-2xl object-cover shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#e03e1a] uppercase tracking-wider font-serif">
                          {pkg.tagline}
                        </span>
                        <h4 className="text-base font-serif font-bold text-stone-900 leading-snug">
                          {pkg.name}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-serif text-stone-500 block">Package Price</span>
                      <span className="text-xl font-bold text-[#e03e1a] font-serif tabular-nums">
                        ₹{pkg.packagePrice?.toLocaleString('en-IN') || 'Auto'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="text-xs text-stone-500">
                      {pkg.includedServiceIds.length} included services
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const p = prompt('Enter new package price in ₹', String(pkg.packagePrice || 1000));
                          if (p && parseInt(p, 10)) {
                            updatePackagePrice(pkg.id, parseInt(p, 10));
                          }
                        }}
                        className="text-xs text-stone-600 hover:text-stone-900 underline cursor-pointer"
                      >
                        Edit Price
                      </button>

                      <button
                        onClick={() => togglePackageActive(pkg.id)}
                        className={`px-3.5 py-1 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                          pkg.isOfficialOffer
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                        }`}
                      >
                        {pkg.isOfficialOffer ? 'Active on Homepage' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: PROMOTIONAL OFFERS ================= */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">Introductory Privileges & Offers</h3>
                <p className="text-xs text-stone-500">Manage real promotional banners displayed on the homepage.</p>
              </div>
            </div>

            <div className="space-y-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`bg-white rounded-3xl p-6 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                    offer.isActive ? 'border-[#f4c8ba] shadow-2xs' : 'border-stone-200 opacity-60'
                  }`}
                >
                  <div className="space-y-1 max-w-xl">
                    <span className="text-[10px] font-bold text-[#e03e1a] uppercase tracking-wider px-2 py-0.5 bg-[#fef2ee] rounded-md font-serif">
                      {offer.badge}
                    </span>
                    <h4 className="text-base font-serif font-bold text-stone-900 pt-1">
                      {offer.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#e03e1a]">{offer.subtitle}</p>
                    <p className="text-xs text-stone-600">{offer.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => toggleOfferActive(offer.id)}
                      className={`px-4 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                        offer.isActive
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      {offer.isActive ? 'Active on Website' : 'Deactivated'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Add New Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">Add New Service</h3>
              <button onClick={() => setShowAddServiceModal(false)} className="text-stone-400 hover:text-stone-700">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewService} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Service Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Cherry Blossom Glow Facial"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={newServiceCategory}
                    onChange={(e) => setNewServiceCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={newServiceDuration}
                  onChange={(e) => setNewServiceDuration(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                  placeholder="Short treatment description..."
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-[#e03e1a] rounded-full hover:bg-[#b82e0e]"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Reschedule Appointment {rescheduleTarget.bookingId}
            </h3>
            <p className="text-xs text-stone-600">
              Client: {rescheduleTarget.customerDetails.fullName} ({rescheduleTarget.customerDetails.mobileNumber})
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">New Slot (10 AM - 5 PM)</label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                >
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="11:15 AM - 12:15 PM">11:15 AM - 12:15 PM</option>
                  <option value="12:30 PM - 01:30 PM">12:30 PM - 01:30 PM</option>
                  <option value="01:45 PM - 02:45 PM">01:45 PM - 02:45 PM</option>
                  <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setRescheduleTarget(null)}
                className="px-4 py-2 text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-6 py-2 font-bold text-white bg-[#e03e1a] rounded-full hover:bg-[#b82e0e]"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
