import Link from 'next/link';
import { AlertTriangle, Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict, href, t } from '@/lib/utils';
import { getSettings } from '@/lib/repo';
import { ContactForm } from '@/components/site/ContactForm';
import { PageHero } from '@/components/site/Sections';

export const generateMetadata = async (props: { params: Promise<{ lang: Lang }> }) => {
  const params = await props.params;
  return { title: getDict(params.lang).contact.title };
};

export default async function ContactPage(props: { params: Promise<{ lang: Lang }> }) {
  const params = await props.params;
  const lang = params.lang;
  const d = getDict(lang);
  const s = await getSettings();
  const c = s.contact;
  const Row = ({ icon: I, label, children }: { icon: typeof Phone; label: string; children: React.ReactNode }) => (
    <div className="flex gap-4 border-b border-navy-100 py-5"><I className="mt-0.5 h-5 w-5 shrink-0 text-signal-500" /><div><p className="text-sm font-semibold uppercase tracking-wide text-ink/50">{label}</p><div className="mt-1 text-navy-900">{children}</div></div></div>
  );
  return (
    <>
      <PageHero title={d.contact.title} intro={d.contact.intro} crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.contact }]} />
      <div className="container-site grid gap-12 py-12 sm:py-16 lg:grid-cols-[380px_minmax(0,1fr)]">
        <div data-testid="contact-details">
          <Row icon={Phone} label={d.contact.phone}><a href={`tel:${c.phone.replace(/\s/g, '')}`} className="text-lg font-semibold hover:underline" data-testid="contact-phone-link">{c.phone}</a></Row>
          <Row icon={Mail} label={d.contact.email}><a href={`mailto:${c.email}`} className="font-semibold hover:underline" data-testid="contact-email-link">{c.email}</a></Row>
          <Row icon={MapPin} label={d.contact.address}><p>{s.company.name}<br />{c.street}<br />{c.postcode} {c.city}<br />{t(c.country, lang)}</p></Row>
          <Row icon={Clock} label={d.contact.hours}>
            <dl className="space-y-1 text-[15px]">{c.hours.map((h) => <div key={h.days.en} className="flex justify-between gap-6"><dt>{t(h.days, lang)}</dt><dd className="font-semibold">{h.time}</dd></div>)}</dl>
          </Row>
          <div className="mt-6 border-l-4 border-signal-500 bg-signal-50 p-5" data-testid="contact-urgent">
            <p className="flex items-center gap-2 font-semibold text-signal-700"><AlertTriangle className="h-4 w-4" />{d.contact.urgentTitle}</p>
            <p className="mt-1 text-sm text-ink/70">{d.contact.urgentText}</p>
            <a href={`tel:${c.urgentPhone.replace(/\s/g, '')}`} className="mt-2 inline-block font-display text-xl font-bold text-navy-900">{c.urgentPhone}</a>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{d.contact.formTitle}</h2>
          <p className="mb-6 mt-2 text-sm text-ink/60">{d.contact.quoteHint} <Link href={href(lang, '/quote')} className="font-semibold text-signal-600 underline">{d.nav.requestQuote}</Link></p>
          <ContactForm lang={lang} />
        </div>
      </div>
    </>
  );
}

export const instant = false;
