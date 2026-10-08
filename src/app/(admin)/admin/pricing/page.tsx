'use client';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Discount, Extra, PricingSettings } from '@/lib/types';
import { uid } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, Input, Select, Toggle } from '@/components/ui/custom-form';
import { Table, THead, Th, Td, Tr } from '@/components/ui/custom-table';
import { PageHeader, Panel } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

const num = (v: string) => (v === '' ? 0 : Number(v));

export default function AdminPricing() {
  const store = useAdmin();
  const [p, setP] = useState<PricingSettings>(store.pricing);
  const [vp, setVp] = useState(() => Object.fromEntries(store.vehicles.map((v) => [v.id, v.pricing])));
  const [sp, setSp] = useState(() => Object.fromEntries(store.services.map((s) => [s.id, s.startingPrice])));
  const setExtra = (id: string, patch: Partial<Extra>) => setP((x) => ({ ...x, extras: x.extras.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));
  const setDisc = (id: string, patch: Partial<Discount>) => setP((x) => ({ ...x, discounts: x.discounts.map((e) => (e.id === id ? { ...e, ...patch } : e)) }));

  const save = () => {
    store.setPricing(p);
    store.vehicles.forEach((v) => store.upsert('vehicles', { ...v, pricing: vp[v.id] }));
    store.services.forEach((s) => store.upsert('services', { ...s, startingPrice: sp[s.id] }));
    store.toast('Pricing saved');
  };
  const cell = 'h-9 w-28 text-right';

  return (
    <>
      <PageHeader title="Pricing" sub="All prices in EUR excl. VAT. The public website reads its prices from these values." actions={<Button variant="secondary" size="sm" onClick={save} data-testid="pricing-save-btn">Save pricing</Button>} />
      <div className="space-y-6">
        <Panel title="Vehicle prices" className="[&>div]:p-0" testId="pricing-vehicles">
          <Table>
            <THead><Th>Vehicle</Th><Th className="text-right">Starting price</Th><Th className="text-right">Per hour</Th><Th className="text-right">Per km</Th></THead>
            <tbody>
              {store.vehicles.map((v) => (
                <Tr key={v.id}>
                  <Td className="font-semibold text-navy-900">{v.name} <span className="font-normal text-ink/50">· {v.capacity} seats</span></Td>
                  {(['startingPrice', 'pricePerHour', 'pricePerKm'] as const).map((k) => (
                    <Td key={k} className="text-right"><Input type="number" min={0} step={k === 'pricePerKm' ? '0.05' : '5'} className={`${cell} ml-auto`} value={vp[v.id][k]} onChange={(e) => setVp((x) => ({ ...x, [v.id]: { ...x[v.id], [k]: num(e.target.value) } }))} data-testid={`pricing-${v.slug}-${k}`} /></Td>
                  ))}
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Service starting prices" testId="pricing-services">
            <div className="divide-y divide-navy-100">
              {store.services.map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-3 py-2"><span className="text-sm font-medium">{s.title.en}</span><Input type="number" min={0} className={cell} value={sp[s.id]} onChange={(e) => setSp((x) => ({ ...x, [s.id]: num(e.target.value) }))} data-testid={`pricing-service-${s.slug}`} /></div>
              ))}
            </div>
          </Panel>
          <Panel title="Surcharges and driver costs" testId="pricing-surcharges">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Additional driver (per day)" htmlFor="pr-driver"><Input id="pr-driver" type="number" min={0} value={p.additionalDriverPerDay} onChange={(e) => setP({ ...p, additionalDriverPerDay: num(e.target.value) })} data-testid="pricing-driver" /></Field>
              <Field label="Minimum charge" htmlFor="pr-min"><Input id="pr-min" type="number" min={0} value={p.minimumCharge} onChange={(e) => setP({ ...p, minimumCharge: num(e.target.value) })} data-testid="pricing-minimum" /></Field>
              <Field label="Weekend surcharge (%)" htmlFor="pr-wknd"><Input id="pr-wknd" type="number" min={0} value={p.weekendSurchargePct} onChange={(e) => setP({ ...p, weekendSurchargePct: num(e.target.value) })} data-testid="pricing-weekend" /></Field>
              <Field label="Holiday surcharge (%)" htmlFor="pr-hol"><Input id="pr-hol" type="number" min={0} value={p.holidaySurchargePct} onChange={(e) => setP({ ...p, holidaySurchargePct: num(e.target.value) })} data-testid="pricing-holiday" /></Field>
            </div>
          </Panel>
        </div>

        <Panel title="Extra services" actions={<Button variant="ghost" size="sm" onClick={() => setP({ ...p, extras: [...p.extras, { id: uid('e'), name: { nl: '', en: '' }, price: 0, unit: 'trip' }] })} data-testid="pricing-add-extra"><Plus className="h-4 w-4" />Add extra</Button>} testId="pricing-extras">
          <div className="space-y-2">
            {p.extras.map((x) => (
              <div key={x.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_110px_130px_auto]">
                <Input className="h-10" placeholder="Name (NL)" value={x.name.nl} onChange={(e) => setExtra(x.id, { name: { ...x.name, nl: e.target.value } })} />
                <Input className="h-10" placeholder="Name (EN)" value={x.name.en} onChange={(e) => setExtra(x.id, { name: { ...x.name, en: e.target.value } })} />
                <Input className="h-10" type="number" min={0} step="0.25" value={x.price} onChange={(e) => setExtra(x.id, { price: num(e.target.value) })} data-testid={`pricing-extra-price-${x.id}`} />
                <Select className="h-10" value={x.unit} onChange={(e) => setExtra(x.id, { unit: e.target.value as Extra['unit'] })}><option value="trip">per trip</option><option value="person">per person</option><option value="day">per day</option></Select>
                <Button variant="ghost" size="sm" aria-label="Remove" onClick={() => setP({ ...p, extras: p.extras.filter((e) => e.id !== x.id) })}><Trash2 className="h-4 w-4 text-signal-600" /></Button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Discounts" actions={<Button variant="ghost" size="sm" onClick={() => setP({ ...p, discounts: [...p.discounts, { id: uid('dc'), name: { nl: '', en: '' }, type: 'percent', value: 0, active: true }] })} data-testid="pricing-add-discount"><Plus className="h-4 w-4" />Add discount</Button>} testId="pricing-discounts">
          <div className="space-y-2">
            {p.discounts.map((x) => (
              <div key={x.id} className="grid items-center gap-2 sm:grid-cols-[1fr_1fr_120px_110px_90px_auto]">
                <Input className="h-10" placeholder="Name (NL)" value={x.name.nl} onChange={(e) => setDisc(x.id, { name: { ...x.name, nl: e.target.value } })} />
                <Input className="h-10" placeholder="Name (EN)" value={x.name.en} onChange={(e) => setDisc(x.id, { name: { ...x.name, en: e.target.value } })} />
                <Select className="h-10" value={x.type} onChange={(e) => setDisc(x.id, { type: e.target.value as Discount['type'] })}><option value="percent">Percent</option><option value="fixed">Fixed €</option></Select>
                <Input className="h-10" type="number" min={0} value={x.value} onChange={(e) => setDisc(x.id, { value: num(e.target.value) })} />
                <Toggle checked={x.active} onChange={(a) => setDisc(x.id, { active: a })} label={x.active ? 'On' : 'Off'} testId={`pricing-discount-toggle-${x.id}`} />
                <Button variant="ghost" size="sm" aria-label="Remove" onClick={() => setP({ ...p, discounts: p.discounts.filter((e) => e.id !== x.id) })}><Trash2 className="h-4 w-4 text-signal-600" /></Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
