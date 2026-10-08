'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict, href } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/custom-form';

const keys = ['pickup', 'destination', 'passengers', 'date', 'time', 'returnDate', 'returnTime'] as const;

export const QuickQuoteForm = ({ lang, compact }: { lang: Lang; compact?: boolean }) => {
  const d = getDict(lang).form;
  const router = useRouter();
  const [v, setV] = useState<Record<string, string>>({});
  const set = (k: string) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const qs = new URLSearchParams();
    keys.forEach((k) => v[k] && qs.set(k, v[k]));
    router.push(`${href(lang, '/quote')}${qs.toString() ? `?${qs}` : ''}`);
  };
  return (
    <form onSubmit={submit} data-testid="quick-quote-form" className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={d.pickup} htmlFor="qq-pickup"><Input id="qq-pickup" placeholder={d.pickupPh} value={v.pickup || ''} onChange={set('pickup')} data-testid="qq-pickup" /></Field>
        <Field label={d.destination} htmlFor="qq-destination"><Input id="qq-destination" placeholder={d.destinationPh} value={v.destination || ''} onChange={set('destination')} data-testid="qq-destination" /></Field>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label={d.passengers} htmlFor="qq-passengers" className="col-span-2 sm:col-span-1"><Input id="qq-passengers" type="number" min={1} inputMode="numeric" placeholder={d.passengersPh} value={v.passengers || ''} onChange={set('passengers')} data-testid="qq-passengers" /></Field>
        <Field label={d.depDate} htmlFor="qq-date"><Input id="qq-date" type="date" value={v.date || ''} onChange={set('date')} data-testid="qq-date" /></Field>
        <Field label={d.depTime} htmlFor="qq-time"><Input id="qq-time" type="time" value={v.time || ''} onChange={set('time')} data-testid="qq-time" /></Field>
      </div>
      {!compact && (
        <div className="grid grid-cols-2 gap-4">
          <Field label={d.retDate} htmlFor="qq-rdate" hint={getDict(lang).common.optional}><Input id="qq-rdate" type="date" value={v.returnDate || ''} onChange={set('returnDate')} data-testid="qq-return-date" /></Field>
          <Field label={d.retTime} htmlFor="qq-rtime"><Input id="qq-rtime" type="time" value={v.returnTime || ''} onChange={set('returnTime')} data-testid="qq-return-time" /></Field>
        </div>
      )}
      <Button type="submit" size="lg" className="w-full" data-testid="qq-submit">{d.continue}<ArrowRight className="h-4 w-4" /></Button>
    </form>
  );
};
