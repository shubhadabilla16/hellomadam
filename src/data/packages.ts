export interface Package {
  id: string;
  name: string;
  serviceIds: string[];
  price: number;
  image?: string;
  tagline?: string;
  description?: string;
}

// Initial empty array as per specifications (Packages coming soon)
export const PACKAGES: Package[] = [];
