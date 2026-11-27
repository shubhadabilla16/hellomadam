// DEMO SERVICES CATALOG - Uses actual Hello Madam services & pricing list
import { CATEGORIES, ServiceItem, SERVICES_LIST } from './servicesData';
import { getServiceImage } from './serviceImageMap';

export const DEMO_CATEGORIES = CATEGORIES;

export const DEMO_SERVICES: ServiceItem[] = SERVICES_LIST.map((s) => ({
  ...s,
  image: getServiceImage(s.id, s.category) || s.image,
  active: s.active !== false,
}));
