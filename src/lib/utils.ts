import type { L, Lang } from './types';
import { dictionaries } from './i18n';

export const LANGS: Lang[] = ['nl', 'en'];
export const isLang = (v: string): v is Lang => (LANGS as string[]).includes(v);
export const getDict = (lang: Lang) => dictionaries[lang];
export const t = (v: L | undefined, lang: Lang) => (v ? v[lang] || v.nl : '');
export const href = (lang: Lang, path = '') => `/${lang}${path}`;
export { cn } from "cn";

export const formatPrice = (n: number, lang: Lang = 'nl', decimals = 0) =>
  new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { style: 'currency', currency: 'EUR', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

export const formatDate = (iso: string, lang: Lang = 'nl', opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  iso ? new Intl.DateTimeFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', opts).format(new Date(iso)) : '';

export const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const uid = (p: string) => `${p}${Math.random().toString(36).slice(2, 8)}`;
export const emptyL = (): L => ({ nl: '', en: '' });
