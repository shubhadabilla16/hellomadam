// DEMO PACKAGES & PROMOTIONAL OFFERS - Uses authentic Hello Madam package configurations
import { BeautyPackage, INITIAL_PACKAGES } from './packagesData';
import { BusinessOffer, INITIAL_OFFERS } from './offersData';

export const DEMO_PACKAGES: BeautyPackage[] = INITIAL_PACKAGES.map((pkg) => ({
  ...pkg,
}));

export const DEMO_OFFERS: BusinessOffer[] = INITIAL_OFFERS.map((offer) => ({
  ...offer,
}));
