'use client';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { BlogCategory, BlogPost, Customer, Destination, Faq, PricingSettings, Quote, Service, SiteSettings, Testimonial, Vehicle } from '@/lib/types';
import { vehicles } from '@/data/vehicles';
import { services } from '@/data/services';
import { destinations } from '@/data/destinations';
import { blogCategories, blogPosts } from '@/data/blog';
import { faqs, testimonials } from '@/data/faqs';
import { customers, pricing, quotes, settings } from '@/data/business';
import { QUOTE_STORAGE_KEY } from '@/components/site/QuoteFlow';

type Collections = {
  vehicles: Vehicle[]; services: Service[]; destinations: Destination[]; posts: BlogPost[]; faqs: Faq[];
  testimonials: Testimonial[]; quotes: Quote[]; customers: Customer[];
};
type Key = keyof Collections;
type Item<K extends Key> = Collections[K][number];

type Store = Collections & {
  pricing: PricingSettings; settings: SiteSettings; blogCategories: BlogCategory[];
  upsert: <K extends Key>(k: K, item: Item<K>) => void;
  remove: (k: Key, id: string) => void;
  setPricing: (p: PricingSettings) => void;
  setSettings: (s: SiteSettings) => void;
  toast: (msg: string) => void;
};

const Ctx = createContext<Store | null>(null);
export const useAdmin = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAdmin outside AdminProvider');
  return c;
};

type Submitted = { ref: string; trip: Record<string, string>; serviceId: string; vehicleId: string; extraIds: string[]; additional: string; contact: Record<string, string>; indicative: number; createdAt: string };

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Collections>({ vehicles, services, destinations, posts: blogPosts, faqs, testimonials, quotes, customers });
  const [pr, setPricing] = useState(pricing);
  const [st, setSettings] = useState(settings);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const subs: Submitted[] = JSON.parse(sessionStorage.getItem(QUOTE_STORAGE_KEY) || '[]');
      if (!subs.length) return;
      setData((d) => {
        const newCust: Customer[] = subs.map((s) => ({ id: `web-${s.ref}`, name: s.contact.name, company: s.contact.company, email: s.contact.email, phone: s.contact.phone, status: 'lead', createdAt: s.createdAt, notes: [] }));
        const newQuotes: Quote[] = subs.map((s) => ({
          id: s.ref, customerId: `web-${s.ref}`, pickup: s.trip.pickup, destination: s.trip.destination, departureDate: s.trip.date, departureTime: s.trip.time,
          returnDate: s.trip.returnDate, returnTime: s.trip.returnTime, passengers: Number(s.trip.passengers), serviceId: s.serviceId, vehicleId: s.vehicleId || null,
          extraIds: s.extraIds, basePrice: s.indicative, adjustments: [], status: 'new', createdAt: s.createdAt, message: [s.contact.message, s.additional].filter(Boolean).join('\n'), notes: [],
        }));
        return { ...d, customers: [...newCust.filter((c) => !d.customers.some((x) => x.id === c.id)), ...d.customers], quotes: [...newQuotes.filter((q) => !d.quotes.some((x) => x.id === q.id)), ...d.quotes] };
      });
    } catch { /* ignore */ }
  }, []);

  const upsert = useCallback(<K extends Key>(k: K, item: Item<K>) => {
    setData((d) => {
      const list = d[k] as Item<K>[];
      const exists = list.some((x) => x.id === item.id);
      return { ...d, [k]: exists ? list.map((x) => (x.id === item.id ? item : x)) : [item, ...list] };
    });
  }, []);
  const remove = useCallback((k: Key, id: string) => setData((d) => ({ ...d, [k]: (d[k] as { id: string }[]).filter((x) => x.id !== id) })), []);
  const toast = useCallback((m: string) => { setMsg(m); setTimeout(() => setMsg(null), 2600); }, []);

  return (
    <Ctx.Provider value={{ ...data, pricing: pr, settings: st, blogCategories, upsert, remove, setPricing, setSettings, toast }}>
      {children}
      {msg && (
        <div role="status" data-testid="admin-toast" className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 bg-navy-950 px-4 py-3 text-sm font-medium text-white shadow-lg">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />{msg}
        </div>
      )}
    </Ctx.Provider>
  );
};
