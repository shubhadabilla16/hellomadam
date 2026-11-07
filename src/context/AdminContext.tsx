import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, SERVICES_LIST } from '../data/servicesData';
import { BeautyPackage, INITIAL_PACKAGES } from '../data/packagesData';
import { BusinessOffer, INITIAL_OFFERS } from '../data/offersData';
import { getServiceImage } from '../data/serviceImageMap';

interface AdminContextType {
  services: ServiceItem[];
  packages: BeautyPackage[];
  offers: BusinessOffer[];
  
  // Service Actions
  updateServicePrice: (serviceId: string, newPrice: number) => void;
  toggleServiceFeatured: (serviceId: string) => void;
  toggleServicePopular: (serviceId: string) => void;
  updateServiceImage: (serviceId: string, newImageUrl: string) => void;
  addNewService: (newService: Omit<ServiceItem, 'id'>) => ServiceItem;
  
  // Package Actions
  togglePackageActive: (packageId: string) => void;
  createPackage: (pkg: Omit<BeautyPackage, 'id'>) => BeautyPackage;
  updatePackagePrice: (packageId: string, price: number) => void;
  
  // Offer Actions
  toggleOfferActive: (offerId: string) => void;
  addOffer: (offer: Omit<BusinessOffer, 'id'>) => BusinessOffer;
  
  // Reset Defaults
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize services with mapped accurate photography
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const stored = localStorage.getItem('hello_madam_services');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // Apply canonical image map to initial list
    return SERVICES_LIST.map(s => ({
      ...s,
      image: getServiceImage(s.id, s.category)
    }));
  });

  const [packages, setPackages] = useState<BeautyPackage[]>(() => {
    try {
      const stored = localStorage.getItem('hello_madam_packages');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_PACKAGES;
  });

  const [offers, setOffers] = useState<BusinessOffer[]>(() => {
    try {
      const stored = localStorage.getItem('hello_madam_offers');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_OFFERS;
  });

  // LocalStorage synchronizers
  useEffect(() => {
    try {
      localStorage.setItem('hello_madam_services', JSON.stringify(services));
    } catch {
      // ignore
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem('hello_madam_packages', JSON.stringify(packages));
    } catch {
      // ignore
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem('hello_madam_offers', JSON.stringify(offers));
    } catch {
      // ignore
    }
  }, [offers]);

  // Service Handlers
  const updateServicePrice = (serviceId: string, newPrice: number) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, price: newPrice } : s));
  };

  const toggleServiceFeatured = (serviceId: string) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, featuredInVideo: !s.featuredInVideo } : s));
  };

  const toggleServicePopular = (serviceId: string) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, isPopular: !s.isPopular } : s));
  };

  const updateServiceImage = (serviceId: string, newImageUrl: string) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, image: newImageUrl } : s));
  };

  const addNewService = (newService: Omit<ServiceItem, 'id'>): ServiceItem => {
    const id = `hm-custom-${Date.now()}`;
    const item: ServiceItem = {
      ...newService,
      id,
      image: newService.image || getServiceImage(id, newService.category)
    };
    setServices(prev => [item, ...prev]);
    return item;
  };

  // Package Handlers
  const togglePackageActive = (packageId: string) => {
    setPackages(prev => prev.map(p => p.id === packageId ? { ...p, isOfficialOffer: !p.isOfficialOffer } : p));
  };

  const createPackage = (pkg: Omit<BeautyPackage, 'id'>): BeautyPackage => {
    const id = `pkg-custom-${Date.now()}`;
    const newPkg: BeautyPackage = {
      ...pkg,
      id
    };
    setPackages(prev => [newPkg, ...prev]);
    return newPkg;
  };

  const updatePackagePrice = (packageId: string, price: number) => {
    setPackages(prev => prev.map(p => p.id === packageId ? { ...p, packagePrice: price } : p));
  };

  // Offer Handlers
  const toggleOfferActive = (offerId: string) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, isActive: !o.isActive } : o));
  };

  const addOffer = (offer: Omit<BusinessOffer, 'id'>): BusinessOffer => {
    const id = `offer-${Date.now()}`;
    const newOffer: BusinessOffer = { ...offer, id };
    setOffers(prev => [newOffer, ...prev]);
    return newOffer;
  };

  const resetToDefaults = () => {
    const freshServices = SERVICES_LIST.map(s => ({
      ...s,
      image: getServiceImage(s.id, s.category)
    }));
    setServices(freshServices);
    setPackages(INITIAL_PACKAGES);
    setOffers(INITIAL_OFFERS);
    localStorage.removeItem('hello_madam_services');
    localStorage.removeItem('hello_madam_packages');
    localStorage.removeItem('hello_madam_offers');
  };

  return (
    <AdminContext.Provider
      value={{
        services,
        packages,
        offers,
        updateServicePrice,
        toggleServiceFeatured,
        toggleServicePopular,
        updateServiceImage,
        addNewService,
        togglePackageActive,
        createPackage,
        updatePackagePrice,
        toggleOfferActive,
        addOffer,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
