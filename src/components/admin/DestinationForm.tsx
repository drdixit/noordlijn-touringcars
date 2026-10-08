'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Destination } from '@/lib/types';
import { emptyL, slugify, uid } from '@/lib/utils';
import { Field, Input } from '@/components/ui/custom-form';
import { ConfirmDialog } from '@/components/ui/custom-modal';
import { CheckList, FormActions, ImagesEditor, LocalizedField, PageHeader, Panel } from './AdminUI';
import { useAdmin } from './AdminProvider';

export const newDestination = (): Destination => ({ id: uid('d'), slug: '', name: emptyL(), country: emptyL(), short: emptyL(), description: emptyL(), image: '', images: [], distanceKm: 0, suggestedTrips: [], serviceIds: [], vehicleIds: [], blogIds: [], seoTitle: emptyL(), seoDescription: emptyL() });

export const DestinationForm = ({ initial, isNew }: { initial: Destination; isNew: boolean }) => {
  const { services, vehicles, posts, upsert, remove, toast } = useAdmin();
  const router = useRouter();
  const [d, setD] = useState(initial);
  const [err, setErr] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  const set = <K extends keyof Destination>(k: K, val: Destination[K]) => setD((p) => ({ ...p, [k]: val }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!d.name.nl || !d.name.en) x.name = 'Fill in both NL and EN';
    setErr(x);
    if (Object.keys(x).length) return;
    upsert('destinations', { ...d, slug: d.slug || slugify(d.name.en), image: d.images[0] ?? '' });
    toast(isNew ? 'Destination created' : 'Destination saved');
    router.push('/admin/destinations');
  };

  return (
    <form onSubmit={submit} noValidate data-testid="destination-form">
      <PageHeader title={isNew ? 'Add destination' : d.name.en || 'Edit destination'} back="/admin/destinations" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <Panel title="Content">
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <LocalizedField label="Name" value={d.name} onChange={(x) => set('name', x)} testId="destination-name" error={err.name} />
                <LocalizedField label="Country" value={d.country} onChange={(x) => set('country', x)} testId="destination-country" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Slug" htmlFor="d-slug"><Input id="d-slug" value={d.slug} placeholder={slugify(d.name.en)} onChange={(e) => set('slug', slugify(e.target.value))} data-testid="destination-slug-input" /></Field>
                <Field label="Distance from Utrecht (km)" htmlFor="d-km"><Input id="d-km" type="number" min={0} value={d.distanceKm} onChange={(e) => set('distanceKm', Number(e.target.value))} data-testid="destination-km-input" /></Field>
              </div>
              <LocalizedField label="Short description" value={d.short} onChange={(x) => set('short', x)} testId="destination-short" />
              <LocalizedField label="Description" value={d.description} onChange={(x) => set('description', x)} multiline testId="destination-description" />
            </div>
          </Panel>
          <Panel title="Images"><ImagesEditor images={d.images} onChange={(x) => set('images', x)} testId="destination-images" /></Panel>
          <Panel title="SEO metadata">
            <div className="grid gap-5">
              <LocalizedField label="SEO title" value={d.seoTitle} onChange={(x) => set('seoTitle', x)} testId="destination-seo-title" />
              <LocalizedField label="SEO description" value={d.seoDescription} onChange={(x) => set('seoDescription', x)} multiline rows={2} testId="destination-seo-description" />
            </div>
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Related content"><div className="grid gap-5">
            <CheckList label="Related services" options={services.map((s) => ({ id: s.id, label: s.title.en }))} value={d.serviceIds} onChange={(x) => set('serviceIds', x)} testId="destination-services" />
            <CheckList label="Related vehicles" options={vehicles.map((v) => ({ id: v.id, label: v.name }))} value={d.vehicleIds} onChange={(x) => set('vehicleIds', x)} testId="destination-vehicles" />
            <CheckList label="Related blog posts" options={posts.map((p) => ({ id: p.id, label: p.title.en }))} value={d.blogIds} onChange={(x) => set('blogIds', x)} testId="destination-posts" />
          </div></Panel>
        </div>
      </div>
      <FormActions testId="destination-form" onCancel={() => router.push('/admin/destinations')} saveLabel={isNew ? 'Create destination' : 'Save changes'} onDelete={isNew ? undefined : () => setConfirm(true)} />
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} title="Delete destination?" text={`${d.name.en} will be removed.`} onConfirm={() => { remove('destinations', d.id); toast('Destination deleted'); router.push('/admin/destinations'); }} />
    </form>
  );
};
