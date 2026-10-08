import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { formatPrice, getDict, href, t } from '@/lib/utils';
import { getFaqs, getPricing, getService, getServices, getSettings, getVehiclesByIds } from '@/lib/repo';
import { ButtonLink } from '@/components/ui/button';
import { Accordion } from '@/components/ui/custom-accordion';
import { VehicleCard } from '@/components/site/Cards';
import { CtaBanner, PageHero } from '@/components/site/Sections';

export async function generateStaticParams() {
  return (await getServices()).flatMap((s) => ['nl', 'en'].map((lang) => ({ lang, slug: s.slug })));
}
export async function generateMetadata(props: { params: Promise<{ lang: Lang; slug: string }> }) {
  const params = await props.params;
  const s = await getService(params.slug);
  return s ? { title: t(s.title, params.lang), description: t(s.short, params.lang) } : {};
}

export default async function ServiceDetail(props: { params: Promise<{ lang: Lang; slug: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const s = await getService(params.slug);
  if (!s) notFound();
  const d = getDict(lang);
  const [vehicles, pricing, faqs, settings] = await Promise.all([getVehiclesByIds(s.vehicleIds), getPricing(), getFaqs(), getSettings()]);
  const extras = pricing.extras.filter((x) => s.extraIds.includes(x.id));
  const sFaqs = faqs.filter((f) => f.serviceIds.includes(s.id));
  const faqList = (sFaqs.length ? sFaqs : faqs.filter((f) => f.showOnHome)).map((f) => ({ id: f.id, title: t(f.question, lang), content: t(f.answer, lang) }));
  const quoteHref = href(lang, `/quote?service=${s.slug}`);
  const unit = (u: string) => (u === 'person' ? d.common.perPerson : u === 'day' ? d.common.perDay : d.common.perTrip);

  return (
    <>
      <PageHero title={t(s.title, lang)} intro={t(s.short, lang)} image={s.image} crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.services, href: href(lang, '/services') }, { label: t(s.title, lang) }]}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ButtonLink href={quoteHref} size="lg" data-testid="service-hero-quote-btn">{d.nav.requestQuote}</ButtonLink></div>
      </PageHero>

      <div className="container-site grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-14">
          <section>
            <p className="text-lg leading-relaxed text-ink/80">{t(s.description, lang)}</p>
            {s.images[1] && <div className="relative mt-8 aspect-[16/8] overflow-hidden bg-navy-100"><Image src={s.images[1]} alt="" fill sizes="(min-width:1024px) 800px, 100vw" className="object-cover" /></div>}
          </section>
          <section data-testid="service-how-it-works">
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{d.common.howItWorks}</h2>
            <ol className="grid gap-px bg-navy-100 sm:grid-cols-2">
              {s.steps.map((st, i) => (
                <li key={i} className="bg-white p-5">
                  <span className="font-display text-3xl font-bold text-signal-500">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold">{t(st.title, lang)}</h3>
                  <p className="mt-1 text-[15px] text-ink/65">{t(st.text, lang)}</p>
                </li>
              ))}
            </ol>
          </section>
          <section data-testid="service-vehicles">
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{d.common.suitableVehicles}</h2>
            <div className="grid gap-6 sm:grid-cols-2">{vehicles.map((v) => <VehicleCard key={v.id} v={v} lang={lang} />)}</div>
          </section>
          {extras.length > 0 && (
            <section data-testid="service-extras">
              <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{d.common.optionalExtras}</h2>
              <ul className="divide-y divide-navy-100 border-y border-navy-100">
                {extras.map((x) => (
                  <li key={x.id} className="flex items-center justify-between gap-4 py-3.5"><span className="flex items-center gap-2 font-medium"><Check className="h-4 w-4 text-emerald-700" />{t(x.name, lang)}</span><span className="text-sm text-ink/60">{x.price ? `${formatPrice(x.price, lang, x.price % 1 ? 2 : 0)} ${unit(x.unit)}` : d.common.free}</span></li>
                ))}
              </ul>
            </section>
          )}
          <section data-testid="service-faq">
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{d.common.faq}</h2>
            <Accordion items={faqList} />
          </section>
        </div>
        <aside>
          <div className="sticky top-28 border border-navy-100 bg-navy-50/60 p-6" data-testid="service-pricing">
            <p className="eyebrow">{d.common.pricing}</p>
            <p className="mt-3 text-sm text-ink/60">{d.common.priceFrom}</p>
            <p className="font-display text-4xl font-bold text-navy-900">{formatPrice(s.startingPrice, lang)}</p>
            <p className="text-xs text-ink/50">{d.common.exclVat}</p>
            <p className="mt-4 text-sm text-ink/70">{t(s.priceNote, lang)}</p>
            <ButtonLink href={quoteHref} className="mt-6 w-full" size="lg" data-testid="service-sidebar-quote-btn">{d.nav.requestQuote}</ButtonLink>
            <p className="mt-4 text-center text-sm text-ink/60">{d.common.or} <a href={`tel:${settings.contact.phone.replace(/\s/g, '')}`} className="font-semibold text-navy-900 underline">{settings.contact.phone}</a></p>
          </div>
        </aside>
      </div>
      <CtaBanner lang={lang} title={t(settings.homepage.ctaTitle, lang)} text={t(settings.homepage.ctaText, lang)} phone={settings.contact.phone} quoteHref={quoteHref} />
    </>
  );
}
