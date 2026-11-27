import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Calendar,
  UserCheck,
  Users,
  Tag,
  Layers,
  Sparkles,
  Image as ImageIcon,
  CalendarDays,
  BarChart3,
  Bell,
  Search,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  Check,
  Edit3,
  Plus,
  RotateCcw,
  UserPlus,
  Upload,
  Eye,
  X,
  AlertTriangle,
  History,
  Menu,
} from 'lucide-react';
import { useAdmin, UpsertTeamMemberInput } from '../context/AdminContext';
import { useBooking, ConfirmedBooking } from '../context/BookingContext';
import { CATEGORIES, ServiceItem } from '../data/servicesData';
import { CATEGORY_MEDIA_MAP } from '../data/serviceImageMap';
import { PartnerAvatar } from '../components/PartnerAvatar';
import {
  ALL_WEEK_DAYS,
  AvailabilityStatus,
  CustomerRecord,
  STANDARD_TIME_SLOTS,
  TeamMember,
} from '../types/management';
import { OwnerOverviewTab } from '../components/admin/OwnerOverviewTab';
import { OwnerScheduleTab } from '../components/admin/OwnerScheduleTab';
import { OwnerReportsTab } from '../components/admin/OwnerReportsTab';
import { OwnerNotificationsTab } from '../components/admin/OwnerNotificationsTab';
import { OwnerImagesTab } from '../components/admin/OwnerImagesTab';
import { OwnerPackagesOffersTab } from '../components/admin/OwnerPackagesOffersTab';

type OwnerModuleId =
  | 'overview'
  | 'requests'
  | 'appointments'
  | 'beauticians'
  | 'customers'
  | 'services'
  | 'packages'
  | 'offers'
  | 'images'
  | 'schedule'
  | 'reports'
  | 'notifications';

const SPECIALTY_OPTIONS = [
  'Facial Treatments',
  'Threading',
  'Clean-up',
  'Body Wax',
  'Face Wax',
  'D-Tan',
  'Bleach',
  'Manicure & Pedicure',
  'Head Massage',
  'Body Massage & Scrub',
  'Hair Spa',
  'Hair Colour',
  'Hair Mehendi Dye',
  'Makeup & Bridal',
  'Hair Styling & Draping',
];

async function compressImageFile(file: File, maxSize = 420): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(maxSize / img.width, maxSize / img.height, 1);
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => reject(new Error('Invalid image'));
      img.src = String(reader.result);
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export const AdminPage: React.FC = () => {
  const {
    allServices,
    updateServicePrice,
    updateServiceDetails,
    toggleServiceActive,
    toggleServiceFeatured,
    updateServiceImage,
    addNewService,
    packages,
    createPackage,
    updatePackage,
    togglePackageActive,
    offers,
    addOffer,
    updateOffer,
    toggleOfferActive,
    teamMembers,
    availabilityRecords,
    upsertTeamMember,
    toggleTeamMemberActive,
    updateBeauticianSelfAvailability,
    setBeauticianDateAvailability,
  } = useAdmin();

  const {
    allBookings,
    customers,
    notificationLogs,
    statusHistory,
    updateBookingStatus,
    rescheduleBooking,
    approveAndAssignBooking,
    cancelOrRejectBooking,
    updateCustomerRecord,
    resetAllDemoData,
    showToast,
  } = useBooking();

  const [activeModule, setActiveModule] = useState<OwnerModuleId>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Appointments filters
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('all');
  const [bookingFilterBeautician, setBookingFilterBeautician] = useState<string>('all');

  // Booking Modals: View Details, Assign/Change Beautician, Reschedule, Reject/Cancel
  const [detailBooking, setDetailBooking] = useState<ConfirmedBooking | null>(null);
  const [assignModalTarget, setAssignModalTarget] = useState<ConfirmedBooking | null>(null);
  const [selectedAssignBeauticianId, setSelectedAssignBeauticianId] = useState<string>('');
  const [assignNote, setAssignNote] = useState('');
  const [assignError, setAssignError] = useState<string | null>(null);

  const [rescheduleTarget, setRescheduleTarget] = useState<ConfirmedBooking | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState<string>(STANDARD_TIME_SLOTS[0]);
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  const [cancelTarget, setCancelTarget] = useState<ConfirmedBooking | null>(null);
  const [cancelActionLabel, setCancelActionLabel] = useState<'Reject' | 'Cancel'>('Cancel');
  const [cancelReason, setCancelReason] = useState('');

  // Beautician Management Modals
  const [beauticianModalOpen, setBeauticianModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberForm, setMemberForm] = useState<UpsertTeamMemberInput>({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    photoUrl: '',
    specialties: [],
    workingDays: [...ALL_WEEK_DAYS],
    workingHoursStart: '10:00 AM',
    workingHoursEnd: '05:00 PM',
    availabilityStatus: 'available',
    active: true,
    isVerified: false,
  });
  const [viewBeauticianApptsMember, setViewBeauticianApptsMember] = useState<TeamMember | null>(null);

  // Customer Management State & Modals
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [editCustomerTarget, setEditCustomerTarget] = useState<CustomerRecord | null>(null);

  // Services & Pricing State & Modals
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('all');
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newSvcName, setNewSvcName] = useState('');
  const [newSvcCategory, setNewSvcCategory] = useState('facials');
  const [newSvcPrice, setNewSvcPrice] = useState<number>(850);
  const [newSvcDuration, setNewSvcDuration] = useState('45 mins');
  const [newSvcDesc, setNewSvcDesc] = useState('');
  const [newSvcImage, setNewSvcImage] = useState('');
  const [editServiceModal, setEditServiceModal] = useState<ServiceItem | null>(null);

  // Reset Demo Data Confirmation Modal
  const [showResetModal, setShowResetModal] = useState(false);

  // Derived data
  const pendingRequests = useMemo(
    () => allBookings.filter((b) => b.canonicalStatus === 'pending'),
    [allBookings]
  );

  const filteredBookings = useMemo(() => {
    const q = bookingSearch.trim().toLowerCase();
    return allBookings.filter((b) => {
      if (bookingFilterStatus !== 'all') {
        if (bookingFilterStatus === 'attention') {
          if (!['reschedule_requested', 'customer_unavailable'].includes(b.canonicalStatus)) {
            return false;
          }
        } else if (b.canonicalStatus !== bookingFilterStatus) {
          return false;
        }
      }
      if (bookingFilterBeautician === 'unassigned' && b.assignedBeauticianId) return false;
      if (
        bookingFilterBeautician !== 'all' &&
        bookingFilterBeautician !== 'unassigned' &&
        b.assignedBeauticianId !== bookingFilterBeautician
      ) {
        return false;
      }
      if (q) {
        const matches =
          b.bookingId.toLowerCase().includes(q) ||
          b.customerDetails.fullName.toLowerCase().includes(q) ||
          b.customerDetails.mobileNumber.toLowerCase().includes(q) ||
          b.customerDetails.area.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [allBookings, bookingFilterStatus, bookingFilterBeautician, bookingSearch]);

  const enrichedCustomers = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    return customers
      .map((c) => {
        const cleanDigits = c.phone.replace(/\D/g, '').slice(-10);
        const custAppts = allBookings.filter(
          (b) =>
            b.customerId === c.id ||
            (cleanDigits && b.customerDetails.mobileNumber.replace(/\D/g, '').endsWith(cleanDigits))
        );
        const completedAppts = custAppts.filter((b) => b.canonicalStatus === 'completed');
        const freq = Array.from(
          new Set([
            ...(c.frequentServices || []),
            ...custAppts.flatMap((b) => b.services.map((s) => s.name)),
          ])
        ).slice(0, 5);
        return {
          ...c,
          liveTotalBookings: Math.max(c.totalAppointments, custAppts.length),
          liveCompletedBookings: Math.max(c.completedAppointments, completedAppts.length),
          livePreferredServices: freq,
          history: custAppts,
        };
      })
      .filter((c) => {
        if (!q) return true;
        return (
          c.fullName.toLowerCase().includes(q) ||
          c.phone.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          (c.area || '').toLowerCase().includes(q)
        );
      });
  }, [customers, allBookings, customerSearch]);

  const selectedCustomerDetail = useMemo(
    () => enrichedCustomers.find((c) => c.id === selectedCustomerId) || null,
    [enrichedCustomers, selectedCustomerId]
  );

  const filteredServices = useMemo(() => {
    const q = serviceSearch.trim().toLowerCase();
    return allServices.filter((s) => {
      if (serviceCategoryFilter !== 'all' && s.category !== serviceCategoryFilter) return false;
      if (q && !s.name.toLowerCase().includes(q) && !s.categoryLabel.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [allServices, serviceSearch, serviceCategoryFilter]);

  const getBeauticianConflictReason = (
    member: TeamMember,
    date: string,
    slot: string,
    excludeBookingId?: string
  ): string | null => {
    if (!member.active) return 'Inactive';
    if (member.availabilityStatus === 'on_leave') return 'On Leave';
    const avail = availabilityRecords.find(
      (r) => r.beauticianId === member.id && r.date === date
    );
    if (avail?.isDayOff) return `Day Off (${date})`;
    if (avail?.blockedSlots.includes(slot)) return 'Slot Blocked';
    const busyBooking = allBookings.find(
      (b) =>
        b.id !== excludeBookingId &&
        b.assignedBeauticianId === member.id &&
        b.date === date &&
        b.timeSlot === slot &&
        !['cancelled', 'completed'].includes(b.canonicalStatus)
    );
    if (busyBooking) return `Booked (${busyBooking.bookingId})`;
    return null;
  };

  // ================= ACTION HANDLERS =================
  const handleOpenAssignModal = (b: ConfirmedBooking) => {
    setAssignModalTarget(b);
    const defaultId =
      b.assignedBeauticianId ||
      (b.preferredBeauticianId !== 'any'
        ? b.preferredBeauticianId
        : teamMembers.find((m) => m.active)?.id || '');
    setSelectedAssignBeauticianId(defaultId);
    setAssignNote(b.adminNotes || '');
    setAssignError(null);
  };

  const handleConfirmAssign = async () => {
    if (!assignModalTarget || !selectedAssignBeauticianId) return;
    const beautician = teamMembers.find((m) => m.id === selectedAssignBeauticianId);
    if (!beautician) return;
    setAssignError(null);
    try {
      await approveAndAssignBooking({
        appointmentId: assignModalTarget.id,
        beautician,
        note: assignNote,
      });
      setAssignModalTarget(null);
    } catch (err) {
      setAssignError(err instanceof Error ? err.message : 'Slot conflict detected');
    }
  };

  const handleConfirmReschedule = async () => {
    if (!rescheduleTarget || !newDate) return;
    setRescheduleError(null);
    try {
      await rescheduleBooking(rescheduleTarget.id, newDate, newSlot);
      setRescheduleTarget(null);
    } catch (err) {
      setRescheduleError(err instanceof Error ? err.message : 'Slot conflict detected');
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    await cancelOrRejectBooking({
      appointmentId: cancelTarget.id,
      reason:
        cancelReason.trim() ||
        `${cancelActionLabel}led by Owner in Demo Portal`,
    });
    setCancelTarget(null);
    setCancelReason('');
  };

  const openAddBeautician = () => {
    setEditingMember(null);
    setMemberForm({
      name: '',
      email: '',
      phone: '+91 90000 00000',
      whatsapp: '+91 90000 00000',
      photoUrl: '',
      specialties: ['Facial Treatments', 'Threading'],
      workingDays: [...ALL_WEEK_DAYS],
      workingHoursStart: '10:00 AM',
      workingHoursEnd: '05:00 PM',
      availabilityStatus: 'available',
      active: true,
      isVerified: false,
    });
    setBeauticianModalOpen(true);
  };

  const openEditBeautician = (m: TeamMember) => {
    setEditingMember(m);
    setMemberForm({
      id: m.id,
      name: m.name,
      email: m.email || '',
      phone: m.phone,
      whatsapp: m.whatsapp,
      photoUrl: m.photoUrl || '',
      specialties: [...(m.specialties || [])],
      workingDays: [...(m.workingDays || ALL_WEEK_DAYS)],
      workingHoursStart: m.workingHoursStart || '10:00 AM',
      workingHoursEnd: m.workingHoursEnd || '05:00 PM',
      availabilityStatus: m.availabilityStatus,
      active: m.active,
      isVerified: m.isVerified,
    });
    setBeauticianModalOpen(true);
  };

  const handleSaveBeautician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name.trim()) return;
    await upsertTeamMember(memberForm);
    setBeauticianModalOpen(false);
    showToast(`Saved demo beautician profile for ${memberForm.name}`);
  };

  const handleBeauticianPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 420);
      setMemberForm((prev) => ({ ...prev, photoUrl: compressed }));
    } catch {
      showToast('Could not read selected image');
    }
  };

  const handleNewServicePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageFile(file, 600);
      setNewSvcImage(compressed);
    } catch {
      showToast('Could not read image');
    }
  };

  const handleEditServicePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editServiceModal) return;
    try {
      const compressed = await compressImageFile(file, 600);
      setEditServiceModal({ ...editServiceModal, image: compressed });
    } catch {
      showToast('Could not read image');
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSvcName.trim()) return;
    const cat = CATEGORIES.find((c) => c.id === newSvcCategory);
    await addNewService({
      name: newSvcName.trim(),
      category: newSvcCategory as ServiceItem['category'],
      categoryLabel: cat?.label || 'Speciality',
      price: newSvcPrice,
      duration: newSvcDuration,
      description: newSvcDesc.trim() || 'Doorstep ladies salon treatment in Solapur.',
      image: newSvcImage || CATEGORY_MEDIA_MAP[newSvcCategory]?.image || '',
      isPopular: true,
      featuredInVideo: false,
      active: true,
    });
    setShowAddServiceModal(false);
    setNewSvcName('');
    setNewSvcDesc('');
    setNewSvcImage('');
    showToast('Added demo service to catalog');
  };

  const statusBadgeClass = (canonical: string) => {
    switch (canonical) {
      case 'confirmed':
        return 'bg-teal-100 text-teal-800';
      case 'assigned':
        return 'bg-emerald-100 text-emerald-800';
      case 'in_progress':
        return 'bg-indigo-100 text-indigo-800';
      case 'pending':
        return 'bg-amber-100 text-amber-900';
      case 'completed':
        return 'bg-blue-100 text-blue-900';
      case 'reschedule_requested':
      case 'customer_unavailable':
        return 'bg-orange-100 text-orange-900';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const navItems: {
    id: OwnerModuleId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'requests', label: 'Appointment Requests', icon: Inbox, count: pendingRequests.length },
    { id: 'appointments', label: 'All Appointments', icon: Calendar, count: allBookings.length },
    { id: 'beauticians', label: 'Beautician Management', icon: UserCheck, count: teamMembers.length },
    { id: 'customers', label: 'Customer Management', icon: Users, count: customers.length },
    { id: 'services', label: 'Services & Pricing', icon: Tag, count: allServices.length },
    { id: 'packages', label: 'Beauty Packages', icon: Layers, count: packages.length },
    { id: 'offers', label: 'Promotional Offers', icon: Sparkles, count: offers.length },
    { id: 'images', label: 'Service Images', icon: ImageIcon },
    { id: 'schedule', label: 'Schedule & Availability', icon: CalendarDays },
    { id: 'reports', label: 'Revenue & Reports', icon: BarChart3 },
    { id: 'notifications', label: 'Notification History', icon: Bell, count: notificationLogs.length },
  ];

  const activeNavMeta = navItems.find((n) => n.id === activeModule) || navItems[0];

  // Shared Booking Card Renderer (displays all 14 required fields)
  const renderBookingCard = (b: ConfirmedBooking) => (
    <div
      key={b.id}
      className="bg-white rounded-3xl border border-[#ebdccd] p-5 sm:p-6 space-y-4"
    >
      {/* Top Row: Booking ID, Request Date, Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 bg-stone-900 text-white font-mono font-bold rounded-lg">
            {b.bookingId}
          </span>
          <span className="text-stone-500">
            Date: <strong className="text-stone-800">{b.date}</strong> · {b.timeSlot}
          </span>
        </div>
        <span
          className={`px-3 py-1 rounded-lg text-xs font-bold ${statusBadgeClass(
            b.canonicalStatus
          )}`}
        >
          {b.status}
        </span>
      </div>

      {/* 3-Column Structured Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
        {/* Col 1: Customer Phone, WhatsApp, Address, Landmark */}
        <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-1.5">
          <div className="text-[11px] font-bold text-stone-400 uppercase font-serif">
            Customer Information
          </div>
          <div className="text-sm font-bold text-stone-900">{b.customerDetails.fullName}</div>
          <div className="text-stone-700 font-mono flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#e03e1a] shrink-0" />
            <span>Phone: {b.customerDetails.mobileNumber}</span>
          </div>
          <div className="text-emerald-800 font-mono flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>WhatsApp: {b.customerDetails.whatsappNumber || b.customerDetails.mobileNumber}</span>
          </div>
          <div className="text-stone-700 flex items-start gap-1.5 pt-1">
            <MapPin className="w-3.5 h-3.5 text-[#e03e1a] shrink-0 mt-0.5" />
            <span>
              {b.customerDetails.fullAddress}
              {b.customerDetails.area ? `, ${b.customerDetails.area}` : ''}
            </span>
          </div>
          <div className="text-[11px] text-stone-500 pl-5">
            <strong>Landmark:</strong> {b.customerDetails.landmark || 'Not specified'}
          </div>
        </div>

        {/* Col 2: Schedule, Preferred vs Assigned Beautician */}
        <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] space-y-2.5">
          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase font-serif">
              Schedule
            </div>
            <div className="text-sm font-bold text-stone-900 mt-0.5">
              {b.date} · {b.timeSlot}
            </div>
            <div className="text-stone-500">Est. Duration: ~{b.totalDurationMins} mins</div>
          </div>

          <div className="pt-2 border-t border-[#ebdccd]/80 space-y-1.5">
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400 block">
                Preferred Beautician
              </span>
              <span className="font-semibold text-stone-800">{b.preferredBeauticianName}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400 block">
                Assigned Beautician
              </span>
              {b.assignedBeauticianId ? (
                <span className="font-bold text-emerald-700">
                  {b.assignedBeauticianName} (Demo Roster)
                </span>
              ) : (
                <span className="font-bold text-amber-700">Unassigned</span>
              )}
            </div>
          </div>
        </div>

        {/* Col 3: Selected Services with Individual Prices & Total */}
        <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdccd] flex flex-col justify-between space-y-2">
          <div>
            <div className="text-[11px] font-bold text-stone-400 uppercase font-serif">
              Selected Services ({b.services.length})
            </div>
            <div className="space-y-1 mt-1.5 max-h-28 overflow-y-auto pr-1">
              {b.services.map((s, idx) => (
                <div key={`${s.id}-${idx}`} className="flex justify-between gap-2 text-[11px]">
                  <span className="text-stone-800 truncate">{s.name}</span>
                  <span className="font-mono font-bold text-stone-900 tabular-nums shrink-0">
                    ₹{s.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#ebdccd] flex items-baseline justify-between">
            <span className="font-bold text-stone-900">Estimated Total</span>
            <span className="text-lg font-serif font-bold text-[#e03e1a] tabular-nums">
              ₹{b.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Actions Row */}
      <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setDetailBooking(b)}
            className="px-3.5 py-1.5 font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#e03e1a]" />
            <span>View Details</span>
          </button>

          <a
            href={`tel:${b.customerDetails.mobileNumber.replace(/\s+/g, '')}`}
            className="px-3 py-1.5 font-semibold text-stone-700 bg-white border border-[#ebdccd] hover:bg-stone-50 rounded-xl inline-flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-[#e03e1a]" />
            <span>Call</span>
          </a>

          <a
            href={`https://wa.me/${b.customerDetails.mobileNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-xl inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {b.canonicalStatus === 'pending' && (
            <>
              <button
                type="button"
                onClick={() => void updateBookingStatus(b.id, 'Confirmed')}
                className="px-3.5 py-1.5 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl inline-flex items-center gap-1 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accept</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCancelTarget(b);
                  setCancelActionLabel('Reject');
                  setCancelReason('');
                }}
                className="px-3.5 py-1.5 font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl cursor-pointer"
              >
                Reject
              </button>
            </>
          )}

          {b.canonicalStatus !== 'completed' && b.canonicalStatus !== 'cancelled' && (
            <button
              type="button"
              onClick={() => handleOpenAssignModal(b)}
              className="px-4 py-1.5 font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{b.assignedBeauticianId ? 'Change Beautician' : 'Assign Beautician'}</span>
            </button>
          )}

          {b.canonicalStatus !== 'completed' && b.canonicalStatus !== 'cancelled' && (
            <button
              type="button"
              onClick={() => {
                setRescheduleTarget(b);
                setNewDate(b.date);
                setNewSlot(b.timeSlot);
                setRescheduleError(null);
              }}
              className="px-3.5 py-1.5 font-semibold text-stone-700 bg-white border border-[#ebdccd] hover:bg-stone-50 rounded-xl cursor-pointer"
            >
              Reschedule
            </button>
          )}

          {['confirmed', 'assigned', 'in_progress'].includes(b.canonicalStatus) && (
            <button
              type="button"
              onClick={() => void updateBookingStatus(b.id, 'Completed')}
              className="px-3.5 py-1.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl inline-flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Completed</span>
            </button>
          )}

          {b.canonicalStatus !== 'pending' &&
            b.canonicalStatus !== 'completed' &&
            b.canonicalStatus !== 'cancelled' && (
              <button
                type="button"
                onClick={() => {
                  setCancelTarget(b);
                  setCancelActionLabel('Cancel');
                  setCancelReason('');
                }}
                className="px-3 py-1.5 font-semibold text-red-700 hover:bg-red-50 border border-red-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
            )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Owner Portal Top Header Strip */}
      <div className="bg-white border-b border-[#ebdccd]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src="/assets/aistudio/image_a7f9010e.png"
              alt="Hello Madam Brand Mark"
              className="h-11 w-11 rounded-xl object-contain border border-[#ebdccd]"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-stone-500">
                <span className="text-[#e03e1a] font-bold uppercase tracking-wider font-serif">
                  Hello Madam Owner Portal
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeNavMeta.label}</span>
                <span aria-hidden="true">·</span>
                <span>Demo Mode (Local State)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">
                Salon Operations &amp; Workforce Console
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <Link
              to="/beautician/login"
              className="px-3.5 py-2 font-bold text-stone-800 bg-[#faf7f2] hover:bg-[#f2e8dc] border border-[#ebdccd] rounded-xl transition-colors whitespace-nowrap"
            >
              Beautician Portal
            </Link>

            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="px-3.5 py-2 font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-[#ebdccd] rounded-xl inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#e03e1a]" />
              <span>Reset Demo Data</span>
            </button>

            <Link
              to="/"
              className="px-4 py-2 font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl transition-colors whitespace-nowrap"
            >
              Back to Website
            </Link>

            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl border border-[#ebdccd] bg-[#faf7f2] text-stone-700 cursor-pointer"
              aria-label="Toggle Owner Modules"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace: Sidebar + Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar & Mobile Expandable Menu (12 Modules) */}
        <aside
          className={`lg:w-64 shrink-0 ${
            mobileNavOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <nav
            aria-label="Owner Portal Modules"
            className="bg-white rounded-3xl border border-[#ebdccd] p-3 space-y-1 lg:sticky lg:top-24"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveModule(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#e03e1a] text-white'
                      : 'text-stone-700 hover:bg-[#faf7f2]'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {typeof item.count === 'number' && (
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded-md tabular-nums ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#faf7f2] text-stone-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Active Module Viewport */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Quick Mobile Horizontal Scroll Pills for switching modules fast */}
          <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveModule(item.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 cursor-pointer ${
                  activeModule === item.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-white text-stone-700 border border-[#ebdccd]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 1. DASHBOARD OVERVIEW */}
          {activeModule === 'overview' && (
            <OwnerOverviewTab
              allBookings={allBookings}
              customers={customers}
              teamMembers={teamMembers}
              onNavigateTab={(tab) => setActiveModule(tab as OwnerModuleId)}
              onAssignBooking={handleOpenAssignModal}
              onViewDetails={setDetailBooking}
            />
          )}

          {/* 2. APPOINTMENT REQUESTS (PENDING QUEUE) */}
          {activeModule === 'requests' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-serif font-bold text-stone-900">
                    Pending Appointment Requests ({pendingRequests.length})
                  </h2>
                  <p className="text-xs text-stone-500">
                    New customer requests awaiting Owner confirmation and beautician assignment.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModule('appointments')}
                  className="text-xs font-bold text-[#e03e1a] hover:underline cursor-pointer"
                >
                  Open All Appointments &rarr;
                </button>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#ebdccd] p-12 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    No Pending Requests Right Now
                  </h3>
                  <p className="text-xs text-stone-500">
                    New customer requests from the website booking form will appear here immediately.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">{pendingRequests.map(renderBookingCard)}</div>
              )}
            </div>
          )}

          {/* 3. ALL APPOINTMENTS */}
          {activeModule === 'appointments' && (
            <div className="space-y-5">
              {/* Search & Beautician Filter */}
              <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by customer name, booking ID, or phone number..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf7f2] border border-[#ebdccd] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#e03e1a]"
                  />
                </div>

                <select
                  value={bookingFilterBeautician}
                  onChange={(e) => setBookingFilterBeautician(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-stone-700"
                >
                  <option value="all">All Beauticians</option>
                  <option value="unassigned">Unassigned Only</option>
                  {teamMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      Assigned: {m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter Segmented Controls */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { key: 'all', label: 'All Bookings' },
                  { key: 'pending', label: 'Pending' },
                  { key: 'confirmed', label: 'Confirmed' },
                  { key: 'assigned', label: 'Assigned' },
                  { key: 'in_progress', label: 'In Progress' },
                  { key: 'completed', label: 'Completed' },
                  { key: 'cancelled', label: 'Cancelled' },
                ].map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setBookingFilterStatus(st.key)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                      bookingFilterStatus === st.key
                        ? 'bg-[#e03e1a] text-white'
                        : 'bg-white text-stone-700 border border-[#ebdccd] hover:bg-stone-50'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {filteredBookings.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#ebdccd] p-12 text-center space-y-2">
                  <Calendar className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="text-sm font-serif font-bold text-stone-800">
                    No demo appointments match your current filter
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setBookingFilterStatus('all');
                      setBookingFilterBeautician('all');
                      setBookingSearch('');
                    }}
                    className="text-xs font-bold text-[#e03e1a] hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">{filteredBookings.map(renderBookingCard)}</div>
              )}
            </div>
          )}

          {/* 4. BEAUTICIAN MANAGEMENT */}
          {activeModule === 'beauticians' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-serif font-bold text-stone-900">
                    Beautician Team Management ({teamMembers.length})
                  </h2>
                  <p className="text-xs text-stone-500">
                    Demo partner roster. Note: Displayed contact numbers are sample placeholders and not verified real phone numbers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddBeautician}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Beautician</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {teamMembers.map((m) => {
                  const assignedList = allBookings.filter(
                    (b) => b.assignedBeauticianId === m.id
                  );
                  const liveAssigned = assignedList.filter((b) =>
                    ['assigned', 'confirmed', 'in_progress'].includes(b.canonicalStatus)
                  ).length;
                  const liveCompleted = assignedList.filter(
                    (b) => b.canonicalStatus === 'completed'
                  ).length;

                  return (
                    <div
                      key={m.id}
                      className={`bg-white rounded-3xl border p-5 space-y-4 flex flex-col justify-between ${
                        m.active ? 'border-[#ebdccd]' : 'border-stone-200 opacity-70 bg-stone-50'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start gap-3.5">
                          <PartnerAvatar photo={m.photoUrl} name={m.name} size="lg" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-serif font-bold text-base text-stone-900 truncate">
                                {m.name}
                              </h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  m.active
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-stone-200 text-stone-600'
                                }`}
                              >
                                {m.active ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <p className="text-xs font-mono text-stone-600 mt-0.5">
                              {m.phone} <span className="text-[10px] text-amber-700">(Sample)</span>
                            </p>
                            <p className="text-[11px] text-stone-500 mt-0.5 capitalize">
                              Availability: <strong>{m.availabilityStatus.replace('_', ' ')}</strong>
                            </p>
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-bold uppercase text-stone-400 mb-1">
                            Specializations
                          </div>
                          <div className="text-xs text-stone-700 leading-relaxed">
                            {m.specialties.join(' · ')}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-center bg-[#faf7f2] rounded-2xl p-2.5 border border-[#ebdccd]/80 text-xs">
                          <div>
                            <div className="text-[10px] text-stone-400 font-bold uppercase">
                              Assigned
                            </div>
                            <div className="font-mono font-bold text-[#e03e1a] tabular-nums">
                              {liveAssigned}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-stone-400 font-bold uppercase">
                              Completed
                            </div>
                            <div className="font-mono font-bold text-emerald-700 tabular-nums">
                              {liveCompleted}
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] text-stone-500">
                          Working Days: {m.workingDays.join(', ')} ({m.workingHoursStart || '10:00 AM'} –{' '}
                          {m.workingHoursEnd || '05:00 PM'})
                        </div>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditBeautician(m)}
                            className="px-3 py-1.5 font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Profile</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setViewBeauticianApptsMember(m)}
                            className="px-3 py-1.5 font-bold text-[#e03e1a] bg-[#fef2ee] hover:bg-[#fde4dc] rounded-xl cursor-pointer"
                          >
                            View Appointments ({assignedList.length})
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => void toggleTeamMemberActive(m.id, !m.active)}
                          className={`px-3 py-1.5 font-bold rounded-xl cursor-pointer ${
                            m.active
                              ? 'bg-stone-100 text-stone-700 hover:bg-red-50 hover:text-red-700'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {m.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. CUSTOMER MANAGEMENT */}
          {activeModule === 'customers' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-serif font-bold text-stone-900">
                    Customer Directory ({enrichedCustomers.length} Demo Records)
                  </h2>
                  <p className="text-xs text-stone-500">
                    Search, inspect full appointment history, or edit sample customer profiles.
                  </p>
                </div>
                <div className="relative max-w-xs w-full">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf7f2] border border-[#ebdccd] rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#ebdccd] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf7f2] border-b border-[#ebdccd] text-stone-600 font-serif">
                      <tr>
                        <th className="py-3.5 px-4">Customer Name</th>
                        <th className="py-3.5 px-4">Phone &amp; WhatsApp</th>
                        <th className="py-3.5 px-4">Address</th>
                        <th className="py-3.5 px-4">Bookings</th>
                        <th className="py-3.5 px-4">Preferred Services</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {enrichedCustomers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-10 text-center text-stone-500">
                            No demo customers match your search.
                          </td>
                        </tr>
                      ) : (
                        enrichedCustomers.map((c) => (
                          <tr key={c.id} className="hover:bg-[#faf7f2]/50">
                            <td className="py-3.5 px-4 font-bold text-stone-900 whitespace-nowrap">
                              {c.fullName}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-stone-700 whitespace-nowrap">
                              <div>{c.phone}</div>
                              <div className="text-[11px] text-emerald-700">
                                WA: {c.whatsapp || c.phone}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-stone-600 max-w-xs">
                              <div className="truncate">{c.address}</div>
                              <div className="text-[11px] text-stone-400">{c.area}</div>
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap font-mono tabular-nums">
                              <strong>{c.liveTotalBookings}</strong> total ·{' '}
                              <span className="font-bold text-emerald-700">
                                {c.liveCompletedBookings}
                              </span>{' '}
                              completed
                            </td>
                            <td className="py-3.5 px-4 text-[11px] text-stone-600 max-w-xs">
                              {c.livePreferredServices.slice(0, 3).join(', ') || '—'}
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                              <button
                                type="button"
                                onClick={() => setSelectedCustomerId(c.id)}
                                className="px-3 py-1.5 font-bold text-[#e03e1a] bg-[#fef2ee] rounded-lg hover:bg-[#fde4dc] cursor-pointer"
                              >
                                View History
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditCustomerTarget({ ...c })}
                                className="px-3 py-1.5 font-semibold text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 cursor-pointer"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 6. SERVICES & PRICING */}
          {activeModule === 'services' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-[#ebdccd] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap flex-1 items-center gap-3">
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search service name..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#faf7f2] border border-[#ebdccd] rounded-xl"
                    />
                  </div>
                  <select
                    value={serviceCategoryFilter}
                    onChange={(e) => setServiceCategoryFilter(e.target.value)}
                    className="px-3 py-2 text-xs bg-[#faf7f2] border border-[#ebdccd] rounded-xl text-stone-700"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] rounded-xl inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-[#ebdccd] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#faf7f2] border-b border-[#ebdccd] text-stone-600 font-serif">
                      <tr>
                        <th className="py-3 px-4">Service</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Duration</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Flags</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredServices.map((svc) => {
                        const isActive = svc.active !== false;
                        return (
                          <tr
                            key={svc.id}
                            className={!isActive ? 'opacity-55 bg-stone-50' : 'hover:bg-[#faf7f2]/40'}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={svc.image}
                                  alt={svc.name}
                                  className="w-10 h-10 rounded-xl object-cover shrink-0 border border-stone-200"
                                />
                                <div>
                                  <div className="font-bold text-stone-900">{svc.name}</div>
                                  {svc.subcategory && (
                                    <div className="text-[10px] text-stone-500">
                                      {svc.subcategory}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-stone-700 font-medium">
                              {svc.categoryLabel}
                            </td>
                            <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                              {svc.duration}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {editingServiceId === svc.id ? (
                                <div className="flex items-center gap-1.5">
                                  <span>₹</span>
                                  <input
                                    type="number"
                                    value={tempPrice}
                                    onChange={(e) =>
                                      setTempPrice(parseInt(e.target.value, 10) || 0)
                                    }
                                    className="w-20 px-2 py-1 border rounded-lg font-mono"
                                  />
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (tempPrice > 0) await updateServicePrice(svc.id, tempPrice);
                                      setEditingServiceId(null);
                                      showToast('Updated service price');
                                    }}
                                    className="p-1 bg-emerald-600 text-white rounded cursor-pointer"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <span className="font-serif font-bold text-stone-900 tabular-nums">
                                    {svc.priceDisplay || `₹${svc.price}`}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingServiceId(svc.id);
                                      setTempPrice(svc.price);
                                    }}
                                    className="text-stone-400 hover:text-[#e03e1a] cursor-pointer"
                                    title="Edit Price"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap space-x-1.5">
                              <button
                                type="button"
                                onClick={() => void toggleServiceFeatured(svc.id)}
                                className={`px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer ${
                                  svc.featuredInVideo
                                    ? 'bg-[#fef2ee] text-[#e03e1a] border border-[#f4c8ba]'
                                    : 'bg-stone-100 text-stone-500'
                                }`}
                              >
                                Featured
                              </button>
                              <button
                                type="button"
                                onClick={() => void toggleServiceActive(svc.id)}
                                className={`px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer ${
                                  isActive
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-stone-200 text-stone-700'
                                }`}
                              >
                                {isActive ? 'Active' : 'Inactive'}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => setEditServiceModal({ ...svc })}
                                className="px-3 py-1.5 font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer"
                              >
                                Edit Service
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 7 & 8. PACKAGES & PROMOTIONAL OFFERS */}
          {(activeModule === 'packages' || activeModule === 'offers') && (
            <OwnerPackagesOffersTab
              mode={activeModule}
              packages={packages}
              offers={offers}
              services={allServices}
              onCreatePackage={createPackage}
              onUpdatePackage={updatePackage}
              onTogglePackageActive={togglePackageActive}
              onAddOffer={addOffer}
              onUpdateOffer={updateOffer}
              onToggleOfferActive={toggleOfferActive}
              onToast={showToast}
            />
          )}

          {/* 9. SERVICE IMAGES */}
          {activeModule === 'images' && (
            <OwnerImagesTab
              services={allServices}
              onUpdateServiceImage={updateServiceImage}
              onToast={showToast}
            />
          )}

          {/* 10. SCHEDULE & AVAILABILITY CALENDAR */}
          {activeModule === 'schedule' && (
            <OwnerScheduleTab
              allBookings={allBookings}
              teamMembers={teamMembers}
              availabilityRecords={availabilityRecords}
              onSetBeauticianDateAvailability={setBeauticianDateAvailability}
              onUpdateBeauticianAvailability={updateBeauticianSelfAvailability}
              onViewBooking={setDetailBooking}
            />
          )}

          {/* 11. REVENUE & REPORTS */}
          {activeModule === 'reports' && (
            <OwnerReportsTab allBookings={allBookings} teamMembers={teamMembers} />
          )}

          {/* 12. NOTIFICATION HISTORY */}
          {activeModule === 'notifications' && (
            <OwnerNotificationsTab notificationLogs={notificationLogs} />
          )}
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* Appointment View Details Modal */}
      {detailBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full border border-[#ebdccd] shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="font-mono font-bold text-[#e03e1a]">{detailBooking.bookingId}</span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                  {detailBooking.customerDetails.fullName}
                </h3>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${statusBadgeClass(
                    detailBooking.canonicalStatus
                  )}`}
                >
                  {detailBooking.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDetailBooking(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#faf7f2] rounded-2xl p-4 border border-[#ebdccd]">
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase text-stone-400">Customer Contact</div>
                <div>Phone: {detailBooking.customerDetails.mobileNumber}</div>
                <div>WhatsApp: {detailBooking.customerDetails.whatsappNumber}</div>
                <div>
                  Address: {detailBooking.customerDetails.fullAddress}, {detailBooking.customerDetails.area}
                </div>
                {detailBooking.customerDetails.landmark && (
                  <div>Landmark: {detailBooking.customerDetails.landmark}</div>
                )}
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase text-stone-400">
                  Schedule &amp; Assignment
                </div>
                <div>
                  Date &amp; Slot: <strong>{detailBooking.date}</strong> · {detailBooking.timeSlot}
                </div>
                <div>Preferred Beautician: {detailBooking.preferredBeauticianName}</div>
                <div>
                  Assigned Beautician:{' '}
                  <strong>{detailBooking.assignedBeauticianName || 'Unassigned'}</strong>
                </div>
                {detailBooking.customerDetails.additionalInstructions && (
                  <div className="italic text-amber-800 pt-1">
                    Note: &ldquo;{detailBooking.customerDetails.additionalInstructions}&rdquo;
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-stone-800">Selected Services</div>
              <div className="border border-[#ebdccd] rounded-2xl divide-y divide-stone-100">
                {detailBooking.services.map((s, idx) => (
                  <div key={`${s.id}-${idx}`} className="px-4 py-2 flex justify-between">
                    <span>{s.name}</span>
                    <span className="font-mono font-bold tabular-nums">₹{s.price}</span>
                  </div>
                ))}
                <div className="px-4 py-2.5 flex justify-between bg-[#faf7f2] font-bold">
                  <span>Total Estimated Amount</span>
                  <span className="text-base font-serif text-[#e03e1a] tabular-nums">
                    ₹{detailBooking.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {statusHistory.filter((h) => h.appointmentId === detailBooking.id).length > 0 && (
              <div className="space-y-1.5">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-[#e03e1a]" />
                  <span>Status Timeline (Demo)</span>
                </div>
                <div className="space-y-1 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                  {statusHistory
                    .filter((h) => h.appointmentId === detailBooking.id)
                    .map((h) => (
                      <div key={h.id} className="text-[11px] text-stone-700">
                        <strong className="uppercase">{h.toStatus}</strong> · {h.changedByName}
                        {h.note ? ` — ${h.note}` : ''}
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap justify-end gap-2 pt-2 border-t border-stone-100">
              {detailBooking.canonicalStatus !== 'completed' &&
                detailBooking.canonicalStatus !== 'cancelled' && (
                  <button
                    type="button"
                    onClick={() => {
                      const target = detailBooking;
                      setDetailBooking(null);
                      handleOpenAssignModal(target);
                    }}
                    className="px-5 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
                  >
                    {detailBooking.assignedBeauticianId ? 'Change Beautician' : 'Assign Beautician'}
                  </button>
                )}
              <button
                type="button"
                onClick={() => setDetailBooking(null)}
                className="px-5 py-2 font-semibold text-stone-700 bg-stone-100 rounded-full cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign / Change Beautician Modal */}
      {assignModalTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full border border-[#ebdccd] shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Assign Beautician · {assignModalTarget.bookingId}
                </h3>
                <p className="text-stone-500">
                  Select an available beautician from the demo team below.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAssignModalTarget(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Info, Selected Services, Schedule, Preferred Beautician */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-[#faf7f2] border border-[#ebdccd]">
              <div className="space-y-1">
                <div>
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    Customer
                  </span>
                  <strong>{assignModalTarget.customerDetails.fullName}</strong> (
                  {assignModalTarget.customerDetails.mobileNumber})
                </div>
                <div className="text-stone-600">
                  {assignModalTarget.customerDetails.fullAddress},{' '}
                  {assignModalTarget.customerDetails.area}
                </div>
              </div>
              <div className="space-y-1">
                <div>
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    Appointment Schedule
                  </span>
                  <strong>
                    {assignModalTarget.date} · {assignModalTarget.timeSlot}
                  </strong>
                </div>
                <div>
                  Preferred: <strong>{assignModalTarget.preferredBeauticianName}</strong>
                </div>
                <div className="text-stone-600 truncate">
                  Services: {assignModalTarget.services.map((s) => s.name).join(', ')}
                </div>
              </div>
            </div>

            {/* Available Beauticians Cards with Photo, Name, Specialization, Availability, Existing Demo Assignments */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {teamMembers.map((m) => {
                const conflict = getBeauticianConflictReason(
                  m,
                  assignModalTarget.date,
                  assignModalTarget.timeSlot,
                  assignModalTarget.id
                );
                const existingCount = allBookings.filter(
                  (b) =>
                    b.assignedBeauticianId === m.id &&
                    b.date === assignModalTarget.date &&
                    b.canonicalStatus !== 'cancelled'
                ).length;
                const isSelected = selectedAssignBeauticianId === m.id;
                const isPreferred = assignModalTarget.preferredBeauticianId === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => !conflict && setSelectedAssignBeauticianId(m.id)}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                      conflict
                        ? 'border-stone-200 bg-stone-50 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'border-[#e03e1a] bg-[#fef2ee]/60 cursor-pointer'
                        : 'border-[#ebdccd] hover:border-stone-400 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <PartnerAvatar photo={m.photoUrl} name={m.name} size="sm" />
                      <div>
                        <div className="flex items-center gap-2 font-bold text-stone-900">
                          <span>{m.name}</span>
                          {isPreferred && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                              Customer Preferred
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-600">
                          {m.specialties.join(' · ')}
                        </div>
                        <div className="text-[10px] text-stone-500 mt-0.5 capitalize">
                          Status: {m.availabilityStatus.replace('_', ' ')} · Existing demo assignments on{' '}
                          {assignModalTarget.date}: <strong>{existingCount}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {conflict ? (
                        <span className="font-bold text-red-700">{conflict}</span>
                      ) : isSelected ? (
                        <span className="px-3 py-1 rounded-full bg-[#e03e1a] text-white font-bold">
                          Selected
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-bold">Available</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Assignment Note (Optional)
              </label>
              <input
                type="text"
                value={assignNote}
                onChange={(e) => setAssignNote(e.target.value)}
                placeholder="e.g. Carry Hydra Facial kit & fresh disposables"
                className="w-full px-3 py-2 bg-[#faf7f2] border border-[#ebdccd] rounded-xl"
              />
            </div>

            {assignError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{assignError}</span>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setAssignModalTarget(null)}
                className="px-4 py-2 text-stone-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!selectedAssignBeauticianId}
                onClick={() => void handleConfirmAssign()}
                className="px-6 py-2 font-bold text-white bg-[#e03e1a] hover:bg-[#b82e0e] disabled:opacity-60 rounded-full cursor-pointer"
              >
                Assign Beautician
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4 text-xs">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Reschedule {rescheduleTarget.bookingId}
            </h3>
            <p className="text-stone-600">
              Client: {rescheduleTarget.customerDetails.fullName}
            </p>
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">New Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">New Time Slot</label>
                <select
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                >
                  {STANDARD_TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {rescheduleError && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700">
                {rescheduleError}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRescheduleTarget(null)}
                className="px-4 py-2 text-stone-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleConfirmReschedule()}
                className="px-6 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject / Cancel Confirmation Modal */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4 text-xs">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              {cancelActionLabel} Appointment {cancelTarget.bookingId}?
            </h3>
            <div>
              <label className="block font-bold text-stone-700 mb-1">Reason (Optional)</label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Slot unavailable / Customer requested cancellation"
                className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCancelTarget(null)}
                className="px-4 py-2 text-stone-600 cursor-pointer"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={() => void handleConfirmCancel()}
                className="px-5 py-2 font-bold text-white bg-red-600 hover:bg-red-700 rounded-full cursor-pointer"
              >
                Confirm {cancelActionLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Beautician Modal */}
      {beauticianModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-[#ebdccd] shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">
                {editingMember ? `Edit ${editingMember.name}` : 'Add Demo Beautician'}
              </h3>
              <button
                type="button"
                onClick={() => setBeauticianModalOpen(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBeautician} className="space-y-4">
              <div className="flex items-center gap-4">
                <PartnerAvatar
                  photo={memberForm.photoUrl}
                  name={memberForm.name || 'Beautician'}
                  size="lg"
                />
                <div className="flex-1 space-y-2">
                  <label className="block font-bold text-stone-700">Change Photograph</label>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold cursor-pointer inline-flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => void handleBeauticianPhotoUpload(e)}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="/assets/partners/name.jpg"
                      value={memberForm.photoUrl || ''}
                      onChange={(e) =>
                        setMemberForm((p) => ({ ...p, photoUrl: e.target.value }))
                      }
                      className="flex-1 px-3 py-1.5 border border-[#ebdccd] rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Contact Placeholder
                  </label>
                  <input
                    type="text"
                    value={memberForm.phone}
                    onChange={(e) =>
                      setMemberForm((p) => ({
                        ...p,
                        phone: e.target.value,
                        whatsapp: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Availability</label>
                <select
                  value={memberForm.availabilityStatus}
                  onChange={(e) =>
                    setMemberForm((p) => ({
                      ...p,
                      availabilityStatus: e.target.value as AvailabilityStatus,
                    }))
                  }
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy / Limited Slots</option>
                  <option value="on_leave">On Leave</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">Specializations</label>
                <div className="flex flex-wrap gap-1.5">
                  {SPECIALTY_OPTIONS.map((spec) => {
                    const selected = memberForm.specialties.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button"
                        onClick={() =>
                          setMemberForm((p) => ({
                            ...p,
                            specialties: selected
                              ? p.specialties.filter((s) => s !== spec)
                              : [...p.specialties, spec],
                          }))
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer ${
                          selected
                            ? 'bg-[#e03e1a] text-white border-[#e03e1a]'
                            : 'bg-[#faf7f2] text-stone-600 border-[#ebdccd]'
                        }`}
                      >
                        {spec}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1.5">Working Days</label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_WEEK_DAYS.map((day) => {
                    const selected = memberForm.workingDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() =>
                          setMemberForm((p) => ({
                            ...p,
                            workingDays: selected
                              ? p.workingDays.filter((d) => d !== day)
                              : [...p.workingDays, day],
                          }))
                        }
                        className={`px-2.5 py-1 rounded-lg font-bold border cursor-pointer ${
                          selected
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-500 border-stone-200'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBeauticianModalOpen(false)}
                  className="px-4 py-2 text-stone-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
                >
                  Save Beautician
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Beautician Appointments Modal */}
      {viewBeauticianApptsMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-[#ebdccd] shadow-2xl max-h-[85vh] flex flex-col space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Assigned Demo Appointments · {viewBeauticianApptsMember.name}
                </h3>
                <p className="text-stone-500">
                  Specialties: {viewBeauticianApptsMember.specialties.join(', ')}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewBeauticianApptsMember(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {allBookings.filter(
                (b) => b.assignedBeauticianId === viewBeauticianApptsMember.id
              ).length === 0 ? (
                <p className="text-center py-8 text-stone-500">
                  No demo appointments assigned to {viewBeauticianApptsMember.name} yet.
                </p>
              ) : (
                allBookings
                  .filter((b) => b.assignedBeauticianId === viewBeauticianApptsMember.id)
                  .map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-2xl border border-[#ebdccd] bg-[#faf7f2] flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="font-mono font-bold text-stone-900">
                          {b.bookingId} · {b.customerDetails.fullName}
                        </div>
                        <div className="text-stone-600 mt-0.5">
                          {b.date} · {b.timeSlot}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {b.services.map((s) => s.name).join(', ')}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${statusBadgeClass(
                            b.canonicalStatus
                          )}`}
                        >
                          {b.status}
                        </span>
                        <div className="font-serif font-bold text-[#e03e1a] mt-1 tabular-nums">
                          ₹{b.totalAmount}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Customer Profile & History Modal */}
      {selectedCustomerDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full border border-[#ebdccd] shadow-2xl max-h-[85vh] flex flex-col space-y-4 text-xs">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  {selectedCustomerDetail.fullName}
                </h3>
                <p className="text-stone-500 mt-0.5">
                  Phone: {selectedCustomerDetail.phone} · WhatsApp:{' '}
                  {selectedCustomerDetail.whatsapp || selectedCustomerDetail.phone}
                </p>
                <p className="text-stone-600 mt-0.5">
                  {selectedCustomerDetail.address}, {selectedCustomerDetail.area}
                  {selectedCustomerDetail.landmark
                    ? ` (Landmark: ${selectedCustomerDetail.landmark})`
                    : ''}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomerId(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 bg-[#faf7f2] p-3.5 rounded-2xl border border-[#ebdccd]">
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-400 block">
                  Total Bookings
                </span>
                <strong className="text-base font-mono tabular-nums">
                  {selectedCustomerDetail.liveTotalBookings}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-400 block">
                  Completed
                </span>
                <strong className="text-base font-mono text-emerald-700 tabular-nums">
                  {selectedCustomerDetail.liveCompletedBookings}
                </strong>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-400 block">
                  Preferred Services
                </span>
                <span className="font-semibold text-stone-800">
                  {selectedCustomerDetail.livePreferredServices.length}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              <div className="font-bold text-stone-800">Appointment History</div>
              {selectedCustomerDetail.history.length === 0 ? (
                <p className="text-stone-400 py-6 text-center">No demo appointments linked yet.</p>
              ) : (
                selectedCustomerDetail.history.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 rounded-2xl border border-[#ebdccd] flex justify-between gap-3"
                  >
                    <div>
                      <div className="font-mono font-bold text-stone-900">
                        {b.bookingId} · {b.status}
                      </div>
                      <div className="text-stone-600 mt-0.5">
                        {b.services.map((s) => s.name).join(', ')}
                      </div>
                      <div className="text-[11px] text-stone-400">
                        Beautician: {b.assignedBeauticianName || b.preferredBeauticianName}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold">{b.date}</div>
                      <div className="font-serif font-bold text-[#e03e1a] tabular-nums">
                        ₹{b.totalAmount}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Demo Customer Modal */}
      {editCustomerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Edit Demo Customer
              </h3>
              <button
                type="button"
                onClick={() => setEditCustomerTarget(null)}
                className="text-stone-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editCustomerTarget.fullName}
                  onChange={(e) =>
                    setEditCustomerTarget({ ...editCustomerTarget, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editCustomerTarget.phone}
                    onChange={(e) =>
                      setEditCustomerTarget({ ...editCustomerTarget, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">WhatsApp</label>
                  <input
                    type="text"
                    value={editCustomerTarget.whatsapp || ''}
                    onChange={(e) =>
                      setEditCustomerTarget({ ...editCustomerTarget, whatsapp: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Address</label>
                <input
                  type="text"
                  value={editCustomerTarget.address}
                  onChange={(e) =>
                    setEditCustomerTarget({ ...editCustomerTarget, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Landmark</label>
                <input
                  type="text"
                  value={editCustomerTarget.landmark || ''}
                  onChange={(e) =>
                    setEditCustomerTarget({ ...editCustomerTarget, landmark: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditCustomerTarget(null)}
                className="px-4 py-2 text-stone-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateCustomerRecord(editCustomerTarget.id, {
                    fullName: editCustomerTarget.fullName,
                    phone: editCustomerTarget.phone,
                    whatsapp: editCustomerTarget.whatsapp,
                    address: editCustomerTarget.address,
                    landmark: editCustomerTarget.landmark,
                  });
                  setEditCustomerTarget(null);
                }}
                className="px-6 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
              >
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">Add Demo Service</h3>
              <button
                type="button"
                onClick={() => setShowAddServiceModal(false)}
                className="text-stone-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateService} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Service Name *"
                value={newSvcName}
                onChange={(e) => setNewSvcName(e.target.value)}
                className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newSvcCategory}
                  onChange={(e) => setNewSvcCategory(e.target.value)}
                  className="px-3 py-2 border border-[#ebdccd] rounded-xl"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  required
                  value={newSvcPrice}
                  onChange={(e) => setNewSvcPrice(parseInt(e.target.value, 10) || 0)}
                  placeholder="Price (₹)"
                  className="px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
              </div>
              <input
                type="text"
                value={newSvcDuration}
                onChange={(e) => setNewSvcDuration(e.target.value)}
                placeholder="Duration (e.g. 45 mins)"
                className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
              />
              <textarea
                rows={2}
                value={newSvcDesc}
                onChange={(e) => setNewSvcDesc(e.target.value)}
                placeholder="Description"
                className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
              />
              <div className="flex items-center gap-3">
                <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold cursor-pointer inline-flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image Preview</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => void handleNewServicePhotoUpload(e)}
                    className="hidden"
                  />
                </label>
                {newSvcImage && (
                  <img
                    src={newSvcImage}
                    alt="Preview"
                    className="w-10 h-10 rounded-lg object-cover border"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  className="px-4 py-2 text-stone-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Service Modal (Name, Category, Price, Duration, Description, Image Preview) */}
      {editServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#ebdccd] shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-serif font-bold text-stone-900">Edit Service</h3>
              <button
                type="button"
                onClick={() => setEditServiceModal(null)}
                className="text-stone-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={editServiceModal.image}
                  alt={editServiceModal.name}
                  className="w-16 h-12 rounded-xl object-cover border border-[#ebdccd]"
                />
                <label className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold cursor-pointer inline-flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image Preview</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => void handleEditServicePhotoUpload(e)}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Service Name</label>
                <input
                  type="text"
                  value={editServiceModal.name}
                  onChange={(e) =>
                    setEditServiceModal({ ...editServiceModal, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category</label>
                  <select
                    value={editServiceModal.category}
                    onChange={(e) => {
                      const cat = CATEGORIES.find((c) => c.id === e.target.value);
                      setEditServiceModal({
                        ...editServiceModal,
                        category: e.target.value as ServiceItem['category'],
                        categoryLabel: cat?.label || editServiceModal.categoryLabel,
                      });
                    }}
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editServiceModal.price}
                    onChange={(e) =>
                      setEditServiceModal({
                        ...editServiceModal,
                        price: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={editServiceModal.duration}
                  onChange={(e) =>
                    setEditServiceModal({ ...editServiceModal, duration: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
              </div>
              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editServiceModal.description}
                  onChange={(e) =>
                    setEditServiceModal({ ...editServiceModal, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#ebdccd] rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditServiceModal(null)}
                className="px-4 py-2 text-stone-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await updateServiceDetails(editServiceModal.id, editServiceModal);
                  setEditServiceModal(null);
                  showToast('Saved service changes');
                }}
                className="px-6 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Demo Data Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[#ebdccd] shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-serif font-bold text-stone-900">
              Reset All Demo Data?
            </h3>
            <p className="text-stone-600 leading-relaxed">
              This restores all demo appointments, customers, beauticians, availability slots, services, packages, offers, and mock notifications back to initial prototype defaults.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-stone-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  await resetAllDemoData();
                  setShowResetModal(false);
                }}
                className="px-5 py-2 font-bold text-white bg-[#e03e1a] rounded-full cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
