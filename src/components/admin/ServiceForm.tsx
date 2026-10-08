'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Service } from '@/lib/types';
import { emptyL, slugify, uid } from '@/lib/utils';
import { Field, Input, Toggle } from '@/components/ui/custom-form';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/custom-modal';
import { CheckList, FormActions, ImagesEditor, LocalizedField, PageHeader, Panel } from './AdminUI';
import { useAdmin } from './AdminProvider';

export const newService = (): Service => ({ id: uid('s'), slug: '', title: emptyL(), short: emptyL(), description: emptyL(), image: '', images: [], vehicleIds: [], extraIds: [], startingPrice: 0, priceNote: emptyL(), steps: [], published: false });

export const ServiceForm = ({ initial, isNew }: { initial: Service; isNew: boolean }) => {
  const { vehicles, pricing, upsert, remove, toast } = useAdmin();
  const router = useRouter();
  const [s, setS] = useState(initial);
  const [err, setErr] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  const set = <K extends keyof Service>(k: K, val: Service[K]) => setS((p) => ({ ...p, [k]: val }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!s.title.nl || !s.title.en) x.title = 'Fill in both NL and EN';
    setErr(x);
    if (Object.keys(x).length) return;
    upsert('services', { ...s, slug: s.slug || slugify(s.title.en), image: s.images[0] ?? '' });
    toast(isNew ? 'Service created' : 'Service saved');
    router.push('/admin/services');
  };

  return (
    <form onSubmit={submit} noValidate data-testid="service-form">
      <PageHeader title={isNew ? 'Add service' : s.title.en || 'Edit service'} back="/admin/services" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <Panel title="Content">
            <div className="grid gap-5">
              <LocalizedField label="Title" value={s.title} onChange={(x) => set('title', x)} testId="service-title" error={err.title} />
              <Field label="Slug" htmlFor="s-slug" hint="Used in the URL"><Input id="s-slug" value={s.slug} placeholder={slugify(s.title.en)} onChange={(e) => set('slug', slugify(e.target.value))} data-testid="service-slug-input" /></Field>
              <LocalizedField label="Short description" value={s.short} onChange={(x) => set('short', x)} testId="service-short" />
              <LocalizedField label="Description" value={s.description} onChange={(x) => set('description', x)} multiline testId="service-description" />
            </div>
          </Panel>
          <Panel title="How it works (steps)">
            <div className="space-y-4">
              {s.steps.map((st, i) => (
                <div key={i} className="grid gap-3 border border-navy-100 p-3">
                  <LocalizedField label={`Step ${i + 1} title`} value={st.title} onChange={(x) => set('steps', s.steps.map((y, j) => (j === i ? { ...y, title: x } : y)))} />
                  <LocalizedField label="Text" value={st.text} onChange={(x) => set('steps', s.steps.map((y, j) => (j === i ? { ...y, text: x } : y)))} />
                  <button type="button" className="justify-self-start text-sm text-signal-600 hover:underline" onClick={() => set('steps', s.steps.filter((_, j) => j !== i))}>Remove step</button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => set('steps', [...s.steps, { title: emptyL(), text: emptyL() }])} data-testid="service-add-step">Add step</Button>
            </div>
          </Panel>
          <Panel title="Images"><ImagesEditor images={s.images} onChange={(x) => set('images', x)} testId="service-images" /></Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Publishing"><Toggle checked={s.published} onChange={(x) => set('published', x)} label={s.published ? 'Published' : 'Unpublished'} testId="service-published-toggle" /></Panel>
          <Panel title="Pricing">
            <div className="grid gap-4">
              <Field label="Starting price (€)" htmlFor="s-price"><Input id="s-price" type="number" min={0} value={s.startingPrice} onChange={(e) => set('startingPrice', Number(e.target.value))} data-testid="service-price-input" /></Field>
              <LocalizedField label="Price note" value={s.priceNote} onChange={(x) => set('priceNote', x)} testId="service-price-note" />
            </div>
          </Panel>
          <Panel title="Related"><div className="grid gap-5">
            <CheckList label="Suitable vehicles" options={vehicles.map((v) => ({ id: v.id, label: v.name }))} value={s.vehicleIds} onChange={(x) => set('vehicleIds', x)} testId="service-vehicles" />
            <CheckList label="Optional extras" options={pricing.extras.map((x) => ({ id: x.id, label: x.name.en }))} value={s.extraIds} onChange={(x) => set('extraIds', x)} testId="service-extras" />
          </div></Panel>
        </div>
      </div>
      <FormActions testId="service-form" onCancel={() => router.push('/admin/services')} saveLabel={isNew ? 'Create service' : 'Save changes'} onDelete={isNew ? undefined : () => setConfirm(true)} />
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} title="Delete service?" text={`${s.title.en} will be removed.`} onConfirm={() => { remove('services', s.id); toast('Service deleted'); router.push('/admin/services'); }} />
    </form>
  );
};
