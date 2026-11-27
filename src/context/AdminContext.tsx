import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ServiceItem } from '../data/servicesData';
import { BeautyPackage } from '../data/packagesData';
import { BusinessOffer } from '../data/offersData';
import { DEMO_SERVICES } from '../data/demoServices';
import { DEMO_PACKAGES, DEMO_OFFERS } from '../data/demoPackages';
import { DEMO_BEAUTICIANS, DEMO_AVAILABILITY_RECORDS } from '../data/demoBeauticians';
import { getServiceImage } from '../data/serviceImageMap';
import {
  AvailabilityStatus,
  BeauticianAvailabilityRecord,
  PublicBeautician,
  TeamMember,
} from '../types/management';

const LS_SERVICES = 'hello_madam_demo_services_v2';
const LS_PACKAGES = 'hello_madam_demo_packages_v2';
const LS_OFFERS = 'hello_madam_demo_offers_v2';
const LS_BEAUTICIANS = 'hello_madam_demo_beauticians_v2';
const LS_AVAILABILITY = 'hello_madam_demo_availability_v2';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export interface UpsertTeamMemberInput {
  id?: string;
  name: string;
  email?: string;
  phone: string;
  whatsapp?: string;
  photoUrl?: string;
  specialties: string[];
  workingDays: string[];
  workingHoursStart?: string;
  workingHoursEnd?: string;
  availabilityStatus: AvailabilityStatus;
  active: boolean;
  isVerified: boolean;
}

interface AdminContextType {
  services: ServiceItem[];
  allServices: ServiceItem[];
  packages: BeautyPackage[];
  offers: BusinessOffer[];
  publicBeauticians: PublicBeautician[];
  teamMembers: TeamMember[];
  availabilityRecords: BeauticianAvailabilityRecord[];
  catalogSyncedFromCloud: boolean;

  // Service Actions
  updateServicePrice: (serviceId: string, newPrice: number) => Promise<void>;
  updateServiceDetails: (
    serviceId: string,
    updates: Partial<ServiceItem> & { active?: boolean }
  ) => Promise<void>;
  toggleServiceActive: (serviceId: string) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
  toggleServiceFeatured: (serviceId: string) => Promise<void>;
  toggleServicePopular: (serviceId: string) => Promise<void>;
  updateServiceImage: (serviceId: string, newImageUrl: string) => Promise<void>;
  addNewService: (newService: Omit<ServiceItem, 'id'>) => Promise<ServiceItem>;

  // Package Actions
  togglePackageActive: (packageId: string) => Promise<void>;
  createPackage: (pkg: Omit<BeautyPackage, 'id'>) => Promise<BeautyPackage>;
  updatePackage: (packageId: string, updates: Partial<BeautyPackage>) => Promise<void>;
  updatePackagePrice: (packageId: string, price: number) => Promise<void>;

  // Offer Actions
  toggleOfferActive: (offerId: string) => Promise<void>;
  addOffer: (offer: Omit<BusinessOffer, 'id'>) => Promise<BusinessOffer>;
  updateOffer: (offerId: string, updates: Partial<BusinessOffer>) => Promise<void>;

  // Beautician / Workforce Actions
  upsertTeamMember: (input: UpsertTeamMemberInput) => Promise<TeamMember>;
  toggleTeamMemberActive: (memberId: string, active: boolean) => Promise<void>;
  updateBeauticianSelfAvailability: (
    memberId: string,
    availabilityStatus: AvailabilityStatus,
    workingDays?: string[]
  ) => Promise<void>;
  setBeauticianDateAvailability: (
    beauticianId: string,
    date: string,
    blockedSlots: string[],
    isDayOff: boolean,
    note?: string,
    beauticianUid?: string
  ) => Promise<void>;

  // Reset Demo Defaults
  resetToDefaults: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allServices, setAllServices] = useState<ServiceItem[]>(() =>
    readStorage<ServiceItem[]>(LS_SERVICES, DEMO_SERVICES)
  );
  const [packages, setPackages] = useState<BeautyPackage[]>(() =>
    readStorage<BeautyPackage[]>(LS_PACKAGES, DEMO_PACKAGES)
  );
  const [offers, setOffers] = useState<BusinessOffer[]>(() =>
    readStorage<BusinessOffer[]>(LS_OFFERS, DEMO_OFFERS)
  );
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() =>
    readStorage<TeamMember[]>(LS_BEAUTICIANS, DEMO_BEAUTICIANS)
  );
  const [availabilityRecords, setAvailabilityRecords] = useState<BeauticianAvailabilityRecord[]>(() =>
    readStorage<BeauticianAvailabilityRecord[]>(LS_AVAILABILITY, DEMO_AVAILABILITY_RECORDS)
  );

  // Sync to localStorage cleanly
  useEffect(() => {
    try {
      localStorage.setItem(LS_SERVICES, JSON.stringify(allServices));
    } catch {
      // ignore storage quota errors
    }
  }, [allServices]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_PACKAGES, JSON.stringify(packages));
    } catch {
      // ignore
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_OFFERS, JSON.stringify(offers));
    } catch {
      // ignore
    }
  }, [offers]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_BEAUTICIANS, JSON.stringify(teamMembers));
    } catch {
      // ignore
    }
  }, [teamMembers]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_AVAILABILITY, JSON.stringify(availabilityRecords));
    } catch {
      // ignore
    }
  }, [availabilityRecords]);

  // Active customer-facing services
  const services = useMemo(
    () => allServices.filter((s) => s.active !== false),
    [allServices]
  );

  // Public beautician view derived from teamMembers
  const publicBeauticians: PublicBeautician[] = useMemo(
    () =>
      teamMembers.map((m) => ({
        id: m.id,
        name: m.name,
        photoUrl: m.photoUrl,
        specialties: m.specialties,
        workingDays: m.workingDays,
        workingHoursStart: m.workingHoursStart,
        workingHoursEnd: m.workingHoursEnd,
        availabilityStatus: m.availabilityStatus,
        active: m.active,
        isVerified: m.isVerified,
        verifiedPhone: m.isVerified ? m.phone : undefined,
      })),
    [teamMembers]
  );

  // ================= SERVICE CRUD =================
  const updateServicePrice = useCallback(async (serviceId: string, newPrice: number) => {
    setAllServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? { ...s, price: newPrice, priceDisplay: undefined }
          : s
      )
    );
  }, []);

  const updateServiceDetails = useCallback(
    async (serviceId: string, updates: Partial<ServiceItem> & { active?: boolean }) => {
      setAllServices((prev) =>
        prev.map((s) =>
          s.id === serviceId
            ? {
                ...s,
                ...updates,
                priceDisplay:
                  updates.price !== undefined && updates.price !== s.price
                    ? undefined
                    : updates.priceDisplay ?? s.priceDisplay,
              }
            : s
        )
      );
    },
    []
  );

  const toggleServiceActive = useCallback(async (serviceId: string) => {
    setAllServices((prev) =>
      prev.map((s) =>
        s.id === serviceId ? { ...s, active: s.active === false ? true : false } : s
      )
    );
  }, []);

  const deleteService = useCallback(async (serviceId: string) => {
    setAllServices((prev) => prev.filter((s) => s.id !== serviceId));
  }, []);

  const toggleServiceFeatured = useCallback(async (serviceId: string) => {
    setAllServices((prev) =>
      prev.map((s) =>
        s.id === serviceId ? { ...s, featuredInVideo: !s.featuredInVideo } : s
      )
    );
  }, []);

  const toggleServicePopular = useCallback(async (serviceId: string) => {
    setAllServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, isPopular: !s.isPopular } : s))
    );
  }, []);

  const updateServiceImage = useCallback(async (serviceId: string, newImageUrl: string) => {
    setAllServices((prev) =>
      prev.map((s) => (s.id === serviceId ? { ...s, image: newImageUrl } : s))
    );
  }, []);

  const addNewService = useCallback(async (newService: Omit<ServiceItem, 'id'>) => {
    const id = `custom-svc-${Date.now()}`;
    const item: ServiceItem = {
      ...newService,
      id,
      image: newService.image || getServiceImage(id, newService.category),
      active: newService.active !== false,
    };
    setAllServices((prev) => [item, ...prev]);
    return item;
  }, []);

  // ================= PACKAGE CRUD =================
  const togglePackageActive = useCallback(async (packageId: string) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.id === packageId ? { ...p, isOfficialOffer: !p.isOfficialOffer } : p
      )
    );
  }, []);

  const createPackage = useCallback(async (pkg: Omit<BeautyPackage, 'id'>) => {
    const id = `custom-pkg-${Date.now()}`;
    const item: BeautyPackage = {
      ...pkg,
      id,
    };
    setPackages((prev) => [item, ...prev]);
    return item;
  }, []);

  const updatePackage = useCallback(
    async (packageId: string, updates: Partial<BeautyPackage>) => {
      setPackages((prev) =>
        prev.map((p) => (p.id === packageId ? { ...p, ...updates } : p))
      );
    },
    []
  );

  const updatePackagePrice = useCallback(async (packageId: string, price: number) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === packageId ? { ...p, packagePrice: price } : p))
    );
  }, []);

  // ================= OFFER CRUD =================
  const toggleOfferActive = useCallback(async (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, isActive: !o.isActive } : o))
    );
  }, []);

  const addOffer = useCallback(async (offer: Omit<BusinessOffer, 'id'>) => {
    const id = `custom-offer-${Date.now()}`;
    const item: BusinessOffer = { ...offer, id };
    setOffers((prev) => [item, ...prev]);
    return item;
  }, []);

  const updateOffer = useCallback(
    async (offerId: string, updates: Partial<BusinessOffer>) => {
      setOffers((prev) =>
        prev.map((o) => (o.id === offerId ? { ...o, ...updates } : o))
      );
    },
    []
  );

  // ================= BEAUTICIAN CRUD =================
  const upsertTeamMember = useCallback(async (input: UpsertTeamMemberInput) => {
    const id =
      input.id ||
      input.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') ||
      `beautician-${Date.now()}`;

    let savedMember!: TeamMember;
    setTeamMembers((prev) => {
      const existing = prev.find((m) => m.id === id);
      savedMember = {
        id,
        name: input.name.trim(),
        email: input.email?.trim() || `${id}.demo@hellomadam.local`,
        phone: input.phone.trim(),
        whatsapp: (input.whatsapp || input.phone).trim(),
        photoUrl: input.photoUrl || existing?.photoUrl || `/assets/partners/${id}.jpg`,
        specialties: input.specialties,
        workingDays: input.workingDays,
        workingHoursStart: input.workingHoursStart || '10:00 AM',
        workingHoursEnd: input.workingHoursEnd || '05:00 PM',
        availabilityStatus: input.availabilityStatus,
        active: input.active,
        isVerified: input.isVerified,
        assignedCount: existing?.assignedCount || 0,
        completedCount: existing?.completedCount || 0,
      };
      if (existing) {
        return prev.map((m) => (m.id === id ? savedMember : m));
      }
      return [...prev, savedMember];
    });
    return savedMember;
  }, []);

  const toggleTeamMemberActive = useCallback(async (memberId: string, active: boolean) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, active } : m))
    );
  }, []);

  const updateBeauticianSelfAvailability = useCallback(
    async (memberId: string, availabilityStatus: AvailabilityStatus, workingDays?: string[]) => {
      setTeamMembers((prev) =>
        prev.map((m) =>
          m.id === memberId
            ? {
                ...m,
                availabilityStatus,
                workingDays: workingDays || m.workingDays,
              }
            : m
        )
      );
    },
    []
  );

  const setBeauticianDateAvailability = useCallback(
    async (
      beauticianId: string,
      date: string,
      blockedSlots: string[],
      isDayOff: boolean,
      note?: string
    ) => {
      const docId = `${beauticianId}_${date}`;
      const record: BeauticianAvailabilityRecord = {
        id: docId,
        beauticianId,
        date,
        blockedSlots,
        isDayOff,
        note: note || '',
      };
      setAvailabilityRecords((prev) => {
        const exists = prev.some((r) => r.id === docId);
        if (exists) {
          return prev.map((r) => (r.id === docId ? record : r));
        }
        return [...prev, record];
      });
    },
    []
  );

  const resetToDefaults = useCallback(async () => {
    setAllServices(DEMO_SERVICES);
    setPackages(DEMO_PACKAGES);
    setOffers(DEMO_OFFERS);
    setTeamMembers(DEMO_BEAUTICIANS);
    setAvailabilityRecords(DEMO_AVAILABILITY_RECORDS);
    try {
      localStorage.setItem(LS_SERVICES, JSON.stringify(DEMO_SERVICES));
      localStorage.setItem(LS_PACKAGES, JSON.stringify(DEMO_PACKAGES));
      localStorage.setItem(LS_OFFERS, JSON.stringify(DEMO_OFFERS));
      localStorage.setItem(LS_BEAUTICIANS, JSON.stringify(DEMO_BEAUTICIANS));
      localStorage.setItem(LS_AVAILABILITY, JSON.stringify(DEMO_AVAILABILITY_RECORDS));
    } catch {
      // ignore
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{
        services,
        allServices,
        packages,
        offers,
        publicBeauticians,
        teamMembers,
        availabilityRecords,
        catalogSyncedFromCloud: false,
        updateServicePrice,
        updateServiceDetails,
        toggleServiceActive,
        deleteService,
        toggleServiceFeatured,
        toggleServicePopular,
        updateServiceImage,
        addNewService,
        togglePackageActive,
        createPackage,
        updatePackage,
        updatePackagePrice,
        toggleOfferActive,
        addOffer,
        updateOffer,
        upsertTeamMember,
        toggleTeamMemberActive,
        updateBeauticianSelfAvailability,
        setBeauticianDateAvailability,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return ctx;
};
