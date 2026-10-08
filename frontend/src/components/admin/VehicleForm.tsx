'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Vehicle } from '@/lib/types';
import { slugify, uid, emptyL } from '@/lib/utils';
import { vehicleCategories } from '@/data/vehicles';
import { Field, Input, Select, Toggle } from '@/components/ui/Form';
import { ConfirmDialog } from '@/components/ui/Modal';
import { CheckList, FormActions, ImagesEditor, LocalizedField, LocalizedList, PageHeader, Panel } from './AdminUI';
import { useAdmin } from './AdminProvider';

export const newVehicle = (): Vehicle => ({ id: uid('v'), slug: '', name: '', category: 'touringcar', capacity: 50, description: emptyL(), longDescription: emptyL(), features: [], equipment: [], images: [], serviceIds: [], pricing: { startingPrice: 0, pricePerHour: 0, pricePerKm: 0 }, featured: false, active: true });

export const VehicleForm = ({ initial, isNew }: { initial: Vehicle; isNew: boolean }) => {
  const { services, upsert, remove, toast } = useAdmin();
  const router = useRouter();
  const [v, setV] = useState(initial);
  const [err, setErr] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  const set = <K extends keyof Vehicle>(k: K, val: Vehicle[K]) => setV((p) => ({ ...p, [k]: val }));
  const setPrice = (k: keyof Vehicle['pricing'], val: string) => setV((p) => ({ ...p, pricing: { ...p.pricing, [k]: Number(val) } }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!v.name.trim()) x.name = 'Name is required';
    if (!v.capacity || v.capacity < 1) x.capacity = 'Enter a capacity';
    if (!v.description.nl || !v.description.en) x.description = 'Fill in both NL and EN';
    setErr(x);
    if (Object.keys(x).length) return;
    upsert('vehicles', { ...v, slug: v.slug || slugify(v.name) });
    toast(isNew ? 'Vehicle created' : 'Vehicle saved');
    router.push('/admin/vehicles');
  };

  return (
    <form onSubmit={submit} noValidate data-testid="vehicle-form">
      <PageHeader title={isNew ? 'Add vehicle' : v.name || 'Edit vehicle'} back="/admin/vehicles" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <Panel title="Details">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Vehicle name" htmlFor="v-name" error={err.name}><Input id="v-name" value={v.name} onChange={(e) => set('name', e.target.value)} error={err.name} data-testid="vehicle-name-input" /></Field>
              <Field label="Slug" htmlFor="v-slug" hint="Used in the URL"><Input id="v-slug" value={v.slug} placeholder={slugify(v.name)} onChange={(e) => set('slug', slugify(e.target.value))} data-testid="vehicle-slug-input" /></Field>
              <Field label="Category" htmlFor="v-cat"><Select id="v-cat" value={v.category} onChange={(e) => set('category', e.target.value as Vehicle['category'])} data-testid="vehicle-category-select">{vehicleCategories.map((c) => <option key={c.id} value={c.id}>{c.name.en} ({c.range})</option>)}</Select></Field>
              <Field label="Passenger capacity" htmlFor="v-cap" error={err.capacity}><Input id="v-cap" type="number" min={1} value={v.capacity} onChange={(e) => set('capacity', Number(e.target.value))} error={err.capacity} data-testid="vehicle-capacity-input" /></Field>
            </div>
            <div className="mt-5 grid gap-5">
              <LocalizedField label="Short description" value={v.description} onChange={(x) => set('description', x)} testId="vehicle-description" error={err.description} />
              <LocalizedField label="Full description" value={v.longDescription} onChange={(x) => set('longDescription', x)} multiline testId="vehicle-long-description" />
            </div>
          </Panel>
          <Panel title="Images"><ImagesEditor images={v.images} onChange={(x) => set('images', x)} testId="vehicle-images" /></Panel>
          <Panel title="Features and equipment">
            <div className="grid gap-6">
              <LocalizedList label="Features (shown on cards)" items={v.features} onChange={(x) => set('features', x)} testId="vehicle-features" />
              <LocalizedList label="Equipment" items={v.equipment} onChange={(x) => set('equipment', x)} testId="vehicle-equipment" />
            </div>
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Status">
            <div className="grid gap-3">
              <Toggle checked={v.active} onChange={(x) => set('active', x)} label={v.active ? 'Active – visible on website' : 'Inactive – hidden'} testId="vehicle-active-toggle" />
              <Toggle checked={v.featured} onChange={(x) => set('featured', x)} label="Featured on homepage" testId="vehicle-featured-toggle" />
            </div>
          </Panel>
          <Panel title="Pricing (€, excl. VAT)">
            <div className="grid gap-4">
              <Field label="Starting price" htmlFor="v-start"><Input id="v-start" type="number" min={0} value={v.pricing.startingPrice} onChange={(e) => setPrice('startingPrice', e.target.value)} data-testid="vehicle-start-price" /></Field>
              <Field label="Price per hour" htmlFor="v-hour"><Input id="v-hour" type="number" min={0} value={v.pricing.pricePerHour} onChange={(e) => setPrice('pricePerHour', e.target.value)} data-testid="vehicle-hour-price" /></Field>
              <Field label="Price per km" htmlFor="v-km"><Input id="v-km" type="number" min={0} step="0.05" value={v.pricing.pricePerKm} onChange={(e) => setPrice('pricePerKm', e.target.value)} data-testid="vehicle-km-price" /></Field>
            </div>
          </Panel>
          <Panel title="Suitable trip types"><CheckList label="Services" options={services.map((s) => ({ id: s.id, label: s.title.en }))} value={v.serviceIds} onChange={(x) => set('serviceIds', x)} testId="vehicle-services" /></Panel>
        </div>
      </div>
      <FormActions testId="vehicle-form" onCancel={() => router.push('/admin/vehicles')} saveLabel={isNew ? 'Create vehicle' : 'Save changes'} onDelete={isNew ? undefined : () => setConfirm(true)} />
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} title="Delete vehicle?" text={`${v.name} will be removed from the fleet.`} onConfirm={() => { remove('vehicles', v.id); toast('Vehicle deleted'); router.push('/admin/vehicles'); }} />
    </form>
  );
};
