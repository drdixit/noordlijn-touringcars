'use client';
import { useMemo, useState } from 'react';
import type { Lang, Vehicle, VehicleCategory } from '@/lib/types';
import { cn, getDict, t } from '@/lib/utils';
import { Field, Input } from '@/components/ui/custom-form';
import { EmptyState } from '@/components/ui/empty-state';
import { Button, ButtonLink } from '@/components/ui/button';
import { VehicleCard } from './Cards';

type Cat = { id: VehicleCategory; name: { nl: string; en: string }; range: string };

export const FleetBrowser = ({ lang, vehicles, categories }: { lang: Lang; vehicles: Vehicle[]; categories: Cat[] }) => {
  const d = getDict(lang).fleet;
  const [pax, setPax] = useState('');
  const [cat, setCat] = useState<VehicleCategory | ''>('');
  const list = useMemo(() => vehicles.filter((v) => (!cat || v.category === cat) && (!Number(pax) || v.capacity >= Number(pax))).sort((a, b) => a.capacity - b.capacity), [vehicles, pax, cat]);
  const chip = (active: boolean) => cn('h-10 border px-4 text-sm font-semibold transition-colors', active ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-200 bg-white text-navy-800 hover:border-navy-400');
  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 border border-navy-100 bg-navy-50/60 p-4 sm:p-5 md:flex-row md:items-end" data-testid="fleet-filters">
        <Field label={d.passengers} htmlFor="f-pax" hint={d.capacityHint} className="md:w-64">
          <Input id="f-pax" type="number" min={1} inputMode="numeric" placeholder="45" value={pax} onChange={(e) => setPax(e.target.value)} data-testid="fleet-filter-passengers" />
        </Field>
        <div className="flex-1">
          <p className="mb-1.5 text-sm font-semibold text-navy-900">{d.category}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chip(!cat)} onClick={() => setCat('')} data-testid="fleet-filter-cat-all">{d.all}</button>
            {categories.map((c) => (
              <button key={c.id} type="button" className={chip(cat === c.id)} onClick={() => setCat(c.id)} data-testid={`fleet-filter-cat-${c.id}`}>{t(c.name, lang)} <span className="font-normal opacity-70">{c.range}</span></button>
            ))}
          </div>
        </div>
      </div>
      <p className="mb-5 text-sm text-ink/60" data-testid="fleet-result-count">{list.length} {d.results}</p>
      {list.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((v) => <VehicleCard key={v.id} v={v} lang={lang} />)}</div>
      ) : (
        <EmptyState title={d.noResults} text={d.noResultsHelp} action={<div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => { setPax(''); setCat(''); }} data-testid="fleet-reset">{d.reset}</Button><ButtonLink href={`/${lang}/quote?passengers=${pax}`} size="sm">{getDict(lang).nav.requestQuote}</ButtonLink></div>} />
      )}
    </div>
  );
};
