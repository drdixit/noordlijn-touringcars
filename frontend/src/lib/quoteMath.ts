import type { PricingSettings, Quote } from './types';

export type PriceLine = { label: string; amount: number };

const days = (q: Quote) => {
  if (!q.returnDate || !q.departureDate) return 1;
  return Math.max(1, Math.round((+new Date(q.returnDate) - +new Date(q.departureDate)) / 86400000) + 1);
};

export const isWeekend = (iso: string) => { const d = new Date(iso).getDay(); return d === 0 || d === 6; };

export const computeQuote = (q: Quote, p: PricingSettings) => {
  const lines: PriceLine[] = [{ label: 'Base price', amount: q.basePrice }];
  if (q.departureDate && isWeekend(q.departureDate)) lines.push({ label: `Weekend surcharge (${p.weekendSurchargePct}%)`, amount: (q.basePrice * p.weekendSurchargePct) / 100 });
  q.extraIds.forEach((id) => {
    const x = p.extras.find((e) => e.id === id);
    if (!x) return;
    const mult = x.unit === 'person' ? q.passengers : x.unit === 'day' ? days(q) : 1;
    lines.push({ label: `${x.name.en}${mult > 1 ? ` × ${mult}` : ''}`, amount: x.price * mult });
  });
  q.adjustments.forEach((a) => lines.push({ label: a.label, amount: a.type === 'discount' ? -a.amount : a.amount }));
  const total = Math.max(0, lines.reduce((s, l) => s + l.amount, 0));
  return { lines, total, days: days(q) };
};
