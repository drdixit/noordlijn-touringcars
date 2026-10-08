'use client';
import { useState } from 'react';
import { Pencil, Plus, Star, Trash2 } from 'lucide-react';
import type { Faq, FaqCategory, SiteSettings, Testimonial } from '@/lib/types';
import { emptyL, uid } from '@/lib/utils';
import { faqCategories } from '@/data/faqs';
import { Button } from '@/components/ui/button';
import { ActiveBadge, Badge } from '@/components/ui/custom-badge';
import { Field, Input, Select, Toggle } from '@/components/ui/custom-form';
import { Modal } from '@/components/ui/custom-modal';
import { FilterTabs, LocalizedField, PageHeader, Panel } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

type Tab = 'faqs' | 'testimonials' | 'homepage' | 'company' | 'contact' | 'social' | 'footer' | 'seo';
const tabs: { value: Tab; label: string }[] = [
  { value: 'faqs', label: 'FAQs' }, { value: 'testimonials', label: 'Testimonials' }, { value: 'homepage', label: 'Homepage' }, { value: 'company', label: 'Company' },
  { value: 'contact', label: 'Contact' }, { value: 'social', label: 'Social links' }, { value: 'footer', label: 'Footer' }, { value: 'seo', label: 'SEO' },
];

const FaqTab = () => {
  const { faqs, upsert, remove, toast } = useAdmin();
  const [edit, setEdit] = useState<Faq | null>(null);
  return (
    <Panel title={`FAQs (${faqs.length})`} actions={<Button variant="ghost" size="sm" onClick={() => setEdit({ id: uid('f'), category: 'general', question: emptyL(), answer: emptyL(), serviceIds: [], showOnHome: false })} data-testid="faq-add-btn"><Plus className="h-4 w-4" />Add FAQ</Button>} testId="content-faqs">
      <ul className="divide-y divide-navy-100">
        {faqs.map((f) => (
          <li key={f.id} className="flex items-start justify-between gap-3 py-3" data-testid={`faq-row-${f.id}`}>
            <div><p className="font-medium text-navy-900">{f.question.en}</p><p className="mt-1 flex flex-wrap gap-1.5"><Badge tone="navy">{faqCategories.find((c) => c.id === f.category)?.name.en}</Badge>{f.showOnHome && <Badge tone="green">Homepage</Badge>}</p></div>
            <div className="flex shrink-0"><Button variant="ghost" size="sm" aria-label="Edit" onClick={() => setEdit(f)} data-testid={`faq-edit-${f.id}`}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="sm" aria-label="Delete" onClick={() => { remove('faqs', f.id); toast('FAQ deleted'); }} data-testid={`faq-delete-${f.id}`}><Trash2 className="h-4 w-4 text-signal-600" /></Button></div>
          </li>
        ))}
      </ul>
      <Modal open={!!edit} onClose={() => setEdit(null)} title="FAQ" testId="faq-modal" footer={<><Button variant="outline" size="sm" onClick={() => setEdit(null)}>Cancel</Button><Button variant="secondary" size="sm" data-testid="faq-save" onClick={() => { if (edit) { upsert('faqs', edit); toast('FAQ saved'); setEdit(null); } }}>Save</Button></>}>
        {edit && (
          <div className="grid gap-4">
            <Field label="Category" htmlFor="faq-cat"><Select id="faq-cat" value={edit.category} onChange={(e) => setEdit({ ...edit, category: e.target.value as FaqCategory })}>{faqCategories.map((c) => <option key={c.id} value={c.id}>{c.name.en}</option>)}</Select></Field>
            <LocalizedField label="Question" value={edit.question} onChange={(v) => setEdit({ ...edit, question: v })} testId="faq-question" />
            <LocalizedField label="Answer" value={edit.answer} onChange={(v) => setEdit({ ...edit, answer: v })} multiline testId="faq-answer" />
            <Toggle checked={edit.showOnHome} onChange={(v) => setEdit({ ...edit, showOnHome: v })} label="Show on homepage" />
          </div>
        )}
      </Modal>
    </Panel>
  );
};

const TestimonialTab = () => {
  const { testimonials, upsert, remove, toast } = useAdmin();
  const [edit, setEdit] = useState<Testimonial | null>(null);
  return (
    <Panel title={`Testimonials (${testimonials.length})`} actions={<Button variant="ghost" size="sm" onClick={() => setEdit({ id: uid('t'), name: '', organisation: '', quote: emptyL(), rating: 5, trip: emptyL(), published: false })} data-testid="testimonial-add-btn"><Plus className="h-4 w-4" />Add testimonial</Button>} testId="content-testimonials">
      <ul className="divide-y divide-navy-100">
        {testimonials.map((t) => (
          <li key={t.id} className="flex items-start justify-between gap-3 py-3" data-testid={`testimonial-row-${t.id}`}>
            <div><p className="font-medium text-navy-900">{t.name} <span className="font-normal text-ink/50">· {t.organisation}</span></p><p className="mt-1 line-clamp-1 text-sm text-ink/65">“{t.quote.en}”</p><p className="mt-1 flex items-center gap-2"><span className="flex items-center gap-0.5 text-xs">{t.rating}<Star className="h-3 w-3 fill-signal-500 text-signal-500" /></span><ActiveBadge active={t.published} on="Published" off="Hidden" /></p></div>
            <div className="flex shrink-0 items-center gap-1">
              <Toggle checked={t.published} onChange={(p) => { upsert('testimonials', { ...t, published: p }); toast(p ? 'Testimonial published' : 'Testimonial hidden'); }} testId={`testimonial-toggle-${t.id}`} />
              <Button variant="ghost" size="sm" aria-label="Edit" onClick={() => setEdit(t)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="sm" aria-label="Delete" onClick={() => { remove('testimonials', t.id); toast('Testimonial deleted'); }}><Trash2 className="h-4 w-4 text-signal-600" /></Button>
            </div>
          </li>
        ))}
      </ul>
      <Modal open={!!edit} onClose={() => setEdit(null)} title="Testimonial" testId="testimonial-modal" footer={<><Button variant="outline" size="sm" onClick={() => setEdit(null)}>Cancel</Button><Button variant="secondary" size="sm" data-testid="testimonial-save" onClick={() => { if (edit) { upsert('testimonials', edit); toast('Testimonial saved'); setEdit(null); } }}>Save</Button></>}>
        {edit && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" htmlFor="t-name"><Input id="t-name" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} data-testid="testimonial-name" /></Field>
              <Field label="Organisation" htmlFor="t-org"><Input id="t-org" value={edit.organisation} onChange={(e) => setEdit({ ...edit, organisation: e.target.value })} /></Field>
            </div>
            <LocalizedField label="Quote" value={edit.quote} onChange={(v) => setEdit({ ...edit, quote: v })} multiline testId="testimonial-quote" />
            <LocalizedField label="Trip" value={edit.trip} onChange={(v) => setEdit({ ...edit, trip: v })} />
            <Field label="Rating" htmlFor="t-rating"><Select id="t-rating" value={edit.rating} onChange={(e) => setEdit({ ...edit, rating: Number(e.target.value) })}>{[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} stars</option>)}</Select></Field>
          </div>
        )}
      </Modal>
    </Panel>
  );
};

const SettingsTab = ({ tab }: { tab: Exclude<Tab, 'faqs' | 'testimonials'> }) => {
  const { settings, setSettings, toast } = useAdmin();
  const [s, setS] = useState<SiteSettings>(settings);
  const save = () => { setSettings(s); toast('Content saved'); };
  const footer = <div className="mt-6 flex justify-end"><Button variant="secondary" size="sm" onClick={save} data-testid="content-save-btn">Save changes</Button></div>;
  const txt = (label: string, value: string, on: (v: string) => void, id: string) => <Field label={label} htmlFor={id}><Input id={id} value={value} onChange={(e) => on(e.target.value)} data-testid={id} /></Field>;

  if (tab === 'homepage') return (
    <Panel title="Homepage content" testId="content-homepage"><div className="grid gap-5">
      <LocalizedField label="Hero title" value={s.homepage.heroTitle} onChange={(v) => setS({ ...s, homepage: { ...s.homepage, heroTitle: v } })} testId="home-hero-title" />
      <LocalizedField label="Hero subtitle" value={s.homepage.heroSubtitle} onChange={(v) => setS({ ...s, homepage: { ...s.homepage, heroSubtitle: v } })} multiline rows={3} testId="home-hero-subtitle" />
      <LocalizedField label="Final CTA title" value={s.homepage.ctaTitle} onChange={(v) => setS({ ...s, homepage: { ...s.homepage, ctaTitle: v } })} />
      <LocalizedField label="Final CTA text" value={s.homepage.ctaText} onChange={(v) => setS({ ...s, homepage: { ...s.homepage, ctaText: v } })} multiline rows={2} />
    </div>{footer}</Panel>
  );
  if (tab === 'company') return (
    <Panel title="Company information" testId="content-company"><div className="grid gap-5 sm:grid-cols-2">
      {txt('Company name', s.company.name, (v) => setS({ ...s, company: { ...s.company, name: v } }), 'company-name')}
      {txt('Founded', String(s.company.founded), (v) => setS({ ...s, company: { ...s.company, founded: Number(v) } }), 'company-founded')}
      {txt('KvK number', s.company.kvk, (v) => setS({ ...s, company: { ...s.company, kvk: v } }), 'company-kvk')}
      {txt('VAT number', s.company.vat, (v) => setS({ ...s, company: { ...s.company, vat: v } }), 'company-vat')}
      <div className="sm:col-span-2"><LocalizedField label="Tagline" value={s.company.tagline} onChange={(v) => setS({ ...s, company: { ...s.company, tagline: v } })} /></div>
      <div className="sm:col-span-2"><LocalizedField label="About (short)" value={s.company.about} onChange={(v) => setS({ ...s, company: { ...s.company, about: v } })} multiline rows={3} /></div>
    </div>{footer}</Panel>
  );
  if (tab === 'contact') return (
    <Panel title="Contact information" testId="content-contact"><div className="grid gap-5 sm:grid-cols-2">
      {txt('Phone', s.contact.phone, (v) => setS({ ...s, contact: { ...s.contact, phone: v } }), 'contact-phone-input')}
      {txt('Urgent / 24-7 phone', s.contact.urgentPhone, (v) => setS({ ...s, contact: { ...s.contact, urgentPhone: v } }), 'contact-urgent-input')}
      {txt('Email', s.contact.email, (v) => setS({ ...s, contact: { ...s.contact, email: v } }), 'contact-email-input')}
      {txt('Street', s.contact.street, (v) => setS({ ...s, contact: { ...s.contact, street: v } }), 'contact-street')}
      {txt('Postcode', s.contact.postcode, (v) => setS({ ...s, contact: { ...s.contact, postcode: v } }), 'contact-postcode')}
      {txt('City', s.contact.city, (v) => setS({ ...s, contact: { ...s.contact, city: v } }), 'contact-city')}
      <div className="sm:col-span-2">
        <p className="mb-2 text-sm font-semibold text-navy-900">Opening hours</p>
        <div className="space-y-2">{s.contact.hours.map((h, i) => (
          <div key={i} className="grid grid-cols-3 gap-2">
            <Input className="h-10" value={h.days.nl} onChange={(e) => setS({ ...s, contact: { ...s.contact, hours: s.contact.hours.map((x, j) => (j === i ? { ...x, days: { ...x.days, nl: e.target.value } } : x)) } })} />
            <Input className="h-10" value={h.days.en} onChange={(e) => setS({ ...s, contact: { ...s.contact, hours: s.contact.hours.map((x, j) => (j === i ? { ...x, days: { ...x.days, en: e.target.value } } : x)) } })} />
            <Input className="h-10" value={h.time} onChange={(e) => setS({ ...s, contact: { ...s.contact, hours: s.contact.hours.map((x, j) => (j === i ? { ...x, time: e.target.value } : x)) } })} />
          </div>
        ))}</div>
      </div>
    </div>{footer}</Panel>
  );
  if (tab === 'social') return (
    <Panel title="Social links" testId="content-social"><div className="grid gap-5 sm:grid-cols-2">
      {(Object.keys(s.social) as (keyof SiteSettings['social'])[]).map((k) => txt(k[0].toUpperCase() + k.slice(1), s.social[k], (v) => setS({ ...s, social: { ...s.social, [k]: v } }), `social-${k}`))}
    </div>{footer}</Panel>
  );
  if (tab === 'footer') return (
    <Panel title="Footer content" testId="content-footer"><div className="grid gap-5">
      <LocalizedField label="Footer text" value={s.footer.text} onChange={(v) => setS({ ...s, footer: { ...s.footer, text: v } })} multiline rows={2} testId="footer-text" />
      {txt('Copyright holder', s.footer.copyright, (v) => setS({ ...s, footer: { ...s.footer, copyright: v } }), 'footer-copyright')}
    </div>{footer}</Panel>
  );
  return (
    <Panel title="SEO metadata per page" testId="content-seo"><div className="space-y-6">
      {s.seo.map((e, i) => (
        <div key={e.key} className="grid gap-4 border-b border-navy-100 pb-6 last:border-0 last:pb-0">
          <p className="text-sm font-semibold uppercase tracking-wide text-navy-700">/{e.key === 'home' ? '' : e.key}</p>
          <LocalizedField label="Meta title" value={e.title} onChange={(v) => setS({ ...s, seo: s.seo.map((x, j) => (j === i ? { ...x, title: v } : x)) })} testId={`seo-${e.key}-title`} />
          <LocalizedField label="Meta description" value={e.description} onChange={(v) => setS({ ...s, seo: s.seo.map((x, j) => (j === i ? { ...x, description: v } : x)) })} multiline rows={2} />
        </div>
      ))}
    </div>{footer}</Panel>
  );
};

export default function AdminContent() {
  const [tab, setTab] = useState<Tab>('faqs');
  return (
    <>
      <PageHeader title="Content" sub="Website texts, FAQs, reviews and settings. Every public text has a Dutch and English version." />
      <div className="mb-5 border-b border-navy-100 pb-3"><FilterTabs testId="content-tabs" value={tab} onChange={setTab} options={tabs} /></div>
      {tab === 'faqs' ? <FaqTab /> : tab === 'testimonials' ? <TestimonialTab /> : <SettingsTab key={tab} tab={tab} />}
    </>
  );
}
