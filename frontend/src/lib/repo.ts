// Data access layer: swap these implementations for MongoDB/API calls later.
import { vehicles, vehicleCategories } from '@/data/vehicles';
import { services } from '@/data/services';
import { destinations } from '@/data/destinations';
import { blogPosts, blogCategories } from '@/data/blog';
import { faqs, faqCategories, testimonials } from '@/data/faqs';
import { pricing, settings } from '@/data/business';

export const getVehicles = async () => vehicles.filter((v) => v.active);
export const getVehicle = async (slug: string) => vehicles.find((v) => v.slug === slug && v.active);
export const getVehiclesByIds = async (ids: string[]) => vehicles.filter((v) => ids.includes(v.id) && v.active);
export const getVehicleCategories = async () => vehicleCategories;

export const getServices = async () => services.filter((s) => s.published);
export const getService = async (slug: string) => services.find((s) => s.slug === slug && s.published);
export const getServicesByIds = async (ids: string[]) => services.filter((s) => ids.includes(s.id) && s.published);

export const getDestinations = async () => destinations;
export const getDestination = async (slug: string) => destinations.find((d) => d.slug === slug);

export const getPublishedPosts = async () =>
  blogPosts.filter((p) => p.status === 'published').sort((a, b) => b.date.localeCompare(a.date));
export const getPost = async (slug: string) => blogPosts.find((p) => p.slug === slug && p.status === 'published');
export const getPostsByIds = async (ids: string[]) => (await getPublishedPosts()).filter((p) => ids.includes(p.id));
export const getBlogCategories = async () => blogCategories;

export const getFaqs = async () => faqs;
export const getFaqCategories = async () => faqCategories;
export const getTestimonials = async () => testimonials.filter((x) => x.published);
export const getPricing = async () => pricing;
export const getSettings = async () => settings;
