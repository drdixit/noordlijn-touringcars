'use client';
import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Search, Trash2, X, ImagePlus } from 'lucide-react';
import type { L } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Input, Label, Textarea } from '@/components/ui/custom-form';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/custom-modal';

export const PageHeader = ({ title, sub, back, actions }: { title: string; sub?: string; back?: string; actions?: ReactNode }) => (
  <div className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      {back && <Link href={back} className="mb-2 inline-flex items-center gap-1 text-sm text-ink/55 hover:text-navy-900" data-testid="admin-back-link"><ArrowLeft className="h-4 w-4" />Back</Link>}
      <h1 className="text-2xl font-bold sm:text-3xl" data-testid="admin-page-title">{title}</h1>
      {sub && <p className="mt-1 text-sm text-ink/55">{sub}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export const Panel = ({ title, actions, children, className, testId }: { title?: string; actions?: ReactNode; children: ReactNode; className?: string; testId?: string }) => (
  <section className={cn('min-w-0 border border-navy-100 bg-white', className)} data-testid={testId}>
    {title && <header className="flex items-center justify-between border-b border-navy-100 px-5 py-3"><h2 className="font-sans text-sm font-semibold uppercase tracking-wide text-navy-700">{title}</h2>{actions}</header>}
    <div className="p-5">{children}</div>
  </section>
);

export const SearchBox = ({ value, onChange, placeholder = 'Search…', testId }: { value: string; onChange: (v: string) => void; placeholder?: string; testId?: string }) => (
  <div className="relative w-full sm:w-72">
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
    <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-10 pl-9" data-testid={testId} />
  </div>
);

export const FilterTabs = <T extends string>({ value, onChange, options, testId }: { value: T; onChange: (v: T) => void; options: { value: T; label: string; count?: number }[]; testId?: string }) => (
  <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-testid={testId}>
    {options.map((o) => (
      <button key={o.value} type="button" onClick={() => onChange(o.value)} data-testid={`${testId}-${o.value || 'all'}`}
        className={cn('shrink-0 rounded px-3 py-1.5 text-sm font-medium', value === o.value ? 'bg-navy-900 text-white' : 'text-ink/70 hover:bg-navy-100')}>
        {o.label}{o.count !== undefined && <span className="ml-1.5 opacity-60">{o.count}</span>}
      </button>
    ))}
  </div>
);

export const LocalizedField = ({ label, value, onChange, multiline, rows, testId, error }: { label: string; value: L; onChange: (v: L) => void; multiline?: boolean; rows?: number; testId?: string; error?: string }) => {
  const [lang, setLang] = useState<'nl' | 'en'>('nl');
  const props = { value: value[lang], onChange: (e: { target: { value: string } }) => onChange({ ...value, [lang]: e.target.value }), 'data-testid': testId ? `${testId}-${lang}` : undefined, error };
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex border border-navy-200 text-xs font-semibold">
          {(['nl', 'en'] as const).map((l) => (
            <button key={l} type="button" onClick={() => setLang(l)} data-testid={testId ? `${testId}-tab-${l}` : undefined}
              className={cn('px-2 py-0.5 uppercase', lang === l ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-navy-50')}>
              {l}{!value[l] && <span className="ml-1 text-signal-500">•</span>}
            </button>
          ))}
        </div>
      </div>
      {multiline ? <Textarea rows={rows ?? 4} {...props} /> : <Input {...props} />}
      {error && <p className="mt-1 text-sm text-signal-600">{error}</p>}
    </div>
  );
};

export const LocalizedList = ({ label, items, onChange, testId }: { label: string; items: L[]; onChange: (v: L[]) => void; testId?: string }) => (
  <div data-testid={testId}>
    <Label>{label}</Label>
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <Input value={it.nl} placeholder="NL" className="h-10" onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, nl: e.target.value } : x)))} />
          <Input value={it.en} placeholder="EN" className="h-10" onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, en: e.target.value } : x)))} />
          <button type="button" aria-label="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))} className="px-2 text-ink/40 hover:text-signal-600"><X className="h-4 w-4" /></button>
        </div>
      ))}
      <Button variant="ghost" size="sm" onClick={() => onChange([...items, { nl: '', en: '' }])} data-testid={testId ? `${testId}-add` : undefined}><Plus className="h-4 w-4" />Add item</Button>
    </div>
  </div>
);

const LIBRARY = ['coach-1', 'coach-2', 'coach-3', 'coach-4', 'minibus', 'interior-1', 'interior-2', 'interior-3', 'interior-4', 'driver', 'airport', 'terminal', 'school', 'corporate', 'conference', 'events', 'group', 'beach', 'ski', 'ski-2', 'amsterdam', 'amsterdam-2', 'windmills', 'windmill-2', 'themepark', 'brussels', 'paris', 'berlin'].map((n) => `/images/${n}.jpg`);

export const ImagesEditor = ({ label = 'Images', images, onChange, single, testId = 'images-editor' }: { label?: string; images: string[]; onChange: (v: string[]) => void; single?: boolean; testId?: string }) => {
  const [open, setOpen] = useState(false);
  const pick = (src: string) => { onChange(single ? [src] : images.includes(src) ? images : [...images, src]); setOpen(false); };
  return (
    <div data-testid={testId}>
      <Label hint={single ? undefined : 'First image is the main image'}>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {images.map((src, i) => (
          <div key={src + i} className="group relative h-20 w-28 overflow-hidden border border-navy-100 bg-navy-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
            {i === 0 && !single && <span className="absolute left-1 top-1 bg-navy-900 px-1 text-[10px] font-semibold text-white">MAIN</span>}
            <button type="button" aria-label="Remove image" onClick={() => onChange(images.filter((_, j) => j !== i))} className="absolute right-1 top-1 bg-white/90 p-0.5 text-signal-600 opacity-0 group-hover:opacity-100"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
        ))}
        <button type="button" onClick={() => setOpen(true)} data-testid={`${testId}-add`} className="flex h-20 w-28 flex-col items-center justify-center gap-1 border border-dashed border-navy-300 text-xs font-medium text-navy-700 hover:bg-navy-50">
          <ImagePlus className="h-5 w-5" />{single && images.length ? 'Replace' : 'Add image'}
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Media library" testId="media-library">
        <p className="mb-3 text-xs text-ink/55">Uploading new files will be available once storage is connected.</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {LIBRARY.map((src) => (
            <button key={src} type="button" onClick={() => pick(src)} className="aspect-[4/3] overflow-hidden border border-navy-100 hover:ring-2 hover:ring-navy-700" data-testid={`media-${src.split('/').pop()}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export const CheckList = ({ label, options, value, onChange, testId }: { label: string; options: { id: string; label: string }[]; value: string[]; onChange: (v: string[]) => void; testId?: string }) => (
  <div data-testid={testId}>
    <Label>{label}</Label>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o.id);
        return (
          <button key={o.id} type="button" onClick={() => onChange(on ? value.filter((x) => x !== o.id) : [...value, o.id])} data-testid={testId ? `${testId}-${o.id}` : undefined}
            className={cn('rounded border px-3 py-1.5 text-sm', on ? 'border-navy-800 bg-navy-800 text-white' : 'border-navy-200 text-ink/75 hover:border-navy-400')}>{o.label}</button>
        );
      })}
    </div>
  </div>
);

export const StatCard = ({ label, value, sub, href, testId }: { label: string; value: ReactNode; sub?: string; href?: string; testId?: string }) => {
  const body = (
    <div className="h-full border border-navy-100 bg-white p-5 transition-colors hover:border-navy-300" data-testid={testId}>
      <p className="text-sm text-ink/55">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-navy-900">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink/50">{sub}</p>}
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
};

export const FormActions = ({ onCancel, saveLabel = 'Save', onDelete, testId = 'form' }: { onCancel: () => void; saveLabel?: string; onDelete?: () => void; testId?: string }) => (
  <div className="sticky bottom-0 -mx-4 mt-6 flex items-center gap-2 border-t border-navy-100 bg-white/95 px-4 py-3 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    {onDelete && <Button variant="danger" size="sm" onClick={onDelete} data-testid={`${testId}-delete`}><Trash2 className="h-4 w-4" />Delete</Button>}
    <div className="ml-auto flex gap-2">
      <Button variant="outline" size="sm" onClick={onCancel} data-testid={`${testId}-cancel`}>Cancel</Button>
      <Button type="submit" variant="secondary" size="sm" data-testid={`${testId}-save`}>{saveLabel}</Button>
    </div>
  </div>
);
