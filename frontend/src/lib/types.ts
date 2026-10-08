export type Lang = 'nl' | 'en';
export type L = Record<Lang, string>;

export type VehicleCategory = 'minibus' | 'midi' | 'touringcar' | 'doubledecker';

export interface VehiclePricing { startingPrice: number; pricePerHour: number; pricePerKm: number }

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  capacity: number;
  description: L;
  longDescription: L;
  features: L[];
  equipment: L[];
  images: string[];
  serviceIds: string[];
  pricing: VehiclePricing;
  featured: boolean;
  active: boolean;
}

export interface Step { title: L; text: L }

export interface Service {
  id: string;
  slug: string;
  title: L;
  short: L;
  description: L;
  image: string;
  images: string[];
  vehicleIds: string[];
  extraIds: string[];
  startingPrice: number;
  priceNote: L;
  steps: Step[];
  published: boolean;
}

export interface Destination {
  id: string;
  slug: string;
  name: L;
  country: L;
  short: L;
  description: L;
  image: string;
  images: string[];
  distanceKm: number;
  suggestedTrips: Step[];
  serviceIds: string[];
  vehicleIds: string[];
  blogIds: string[];
  seoTitle: L;
  seoDescription: L;
}

export type PostStatus = 'draft' | 'published' | 'scheduled';

export interface BlogCategory { id: string; name: L }

export interface BlogPost {
  id: string;
  slug: string;
  title: L;
  excerpt: L;
  content: L;
  categoryId: string;
  image: string;
  author: string;
  date: string;
  status: PostStatus;
  featured: boolean;
  seoTitle: L;
  seoDescription: L;
}

export type FaqCategory = 'general' | 'vehicles' | 'pricing' | 'international' | 'booking' | 'drivers' | 'accessibility';

export interface Faq { id: string; category: FaqCategory; question: L; answer: L; serviceIds: string[]; showOnHome: boolean }

export interface Testimonial { id: string; name: string; organisation: string; quote: L; rating: number; trip: L; published: boolean }

export type QuoteStatus = 'new' | 'contacted' | 'quoted' | 'accepted' | 'confirmed' | 'completed' | 'cancelled';

export interface QuoteNote { id: string; text: string; author: string; date: string }
export interface QuoteAdjustment { id: string; type: 'charge' | 'discount'; label: string; amount: number }

export interface Quote {
  id: string;
  customerId: string;
  pickup: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
  serviceId: string;
  vehicleId: string | null;
  extraIds: string[];
  basePrice: number;
  adjustments: QuoteAdjustment[];
  status: QuoteStatus;
  createdAt: string;
  message: string;
  notes: QuoteNote[];
}

export type CustomerStatus = 'lead' | 'active' | 'inactive';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  createdAt: string;
  notes: QuoteNote[];
}

export interface Extra { id: string; name: L; price: number; unit: 'trip' | 'person' | 'day' }
export interface Discount { id: string; name: L; type: 'percent' | 'fixed'; value: number; active: boolean }

export interface PricingSettings {
  additionalDriverPerDay: number;
  weekendSurchargePct: number;
  holidaySurchargePct: number;
  minimumCharge: number;
  extras: Extra[];
  discounts: Discount[];
}

export interface SeoEntry { key: string; title: L; description: L }

export interface SiteSettings {
  company: { name: string; tagline: L; kvk: string; vat: string; founded: number; about: L };
  contact: { phone: string; urgentPhone: string; email: string; street: string; postcode: string; city: string; country: L; hours: { days: L; time: string }[] };
  social: { facebook: string; instagram: string; linkedin: string; youtube: string };
  homepage: { heroTitle: L; heroSubtitle: L; ctaTitle: L; ctaText: L };
  footer: { text: L; copyright: string };
  seo: SeoEntry[];
}
