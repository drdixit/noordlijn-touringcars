import { Star } from 'lucide-react';
import type { Lang, Testimonial } from '@/lib/types';
import { t } from '@/lib/utils';

export const Testimonials = ({ items, lang }: { items: Testimonial[]; lang: Lang }) => (
  <div className="grid gap-px bg-navy-100 md:grid-cols-2 lg:grid-cols-4" data-testid="testimonials">
    {items.map((r) => (
      <figure key={r.id} className="flex flex-col bg-white p-6">
        <div className="flex gap-0.5" aria-label={`${r.rating}/5`}>
          {Array.from({ length: 5 }, (_, i) => <Star key={i} className={i < r.rating ? 'h-4 w-4 fill-signal-500 text-signal-500' : 'h-4 w-4 text-navy-200'} />)}
        </div>
        <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink/80">“{t(r.quote, lang)}”</blockquote>
        <figcaption className="mt-5 border-t border-navy-100 pt-4 text-sm">
          <span className="block font-semibold text-navy-900">{r.name}</span>
          <span className="text-ink/55">{r.organisation} · {t(r.trip, lang)}</span>
        </figcaption>
      </figure>
    ))}
  </div>
);
