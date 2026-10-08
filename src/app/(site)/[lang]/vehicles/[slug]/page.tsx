import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Users } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { formatPrice, getDict, href, t } from '@/lib/utils';
import { getServicesByIds, getSettings, getVehicle, getVehicleCategories, getVehicles } from '@/lib/repo';
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import { ButtonLink } from '@/components/ui/button';
import { ImageGallery } from '@/components/ui/image-gallery';
import { CtaBanner } from '@/components/site/Sections';

export async function generateStaticParams() {
  return (await getVehicles()).flatMap((v) => ['nl', 'en'].map((lang) => ({ lang, slug: v.slug })));
}
export async function generateMetadata(props: { params: Promise<{ lang: Lang; slug: string }> }) {
  const params = await props.params;
  const v = await getVehicle(params.slug);
  return v ? { title: v.name, description: t(v.description, params.lang) } : {};
}

export default async function VehicleDetail(props: { params: Promise<{ lang: Lang; slug: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const v = await getVehicle(params.slug);
  if (!v) notFound();
  const d = getDict(lang);
  const [services, cats, settings] = await Promise.all([getServicesByIds(v.serviceIds), getVehicleCategories(), getSettings()]);
  const cat = cats.find((c) => c.id === v.category);
  const quoteHref = href(lang, `/quote?vehicle=${v.slug}`);
  const List = ({ items }: { items: typeof v.features }) => (
    <ul className="grid gap-2.5 sm:grid-cols-2">{items.map((x) => <li key={x.en} className="flex items-center gap-2 text-[15px]"><Check className="h-4 w-4 shrink-0 text-emerald-700" />{t(x, lang)}</li>)}</ul>
  );
  return (
    <>
      <div className="container-site pt-6"><Breadcrumbs items={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.vehicles, href: href(lang, '/vehicles') }, { label: v.name }]} /></div>
      <div className="container-site grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
        <div className="min-w-0">
          <ImageGallery images={v.images} alt={v.name} label={d.common.gallery} of={d.common.of} />
          <section className="mt-12">
            <h2 className="text-2xl font-bold">{v.name}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">{t(v.longDescription, lang)}</p>
          </section>
          <section className="mt-12 grid gap-10 md:grid-cols-2" data-testid="vehicle-features">
            <div><h2 className="mb-4 text-xl font-bold">{d.common.features}</h2><List items={v.features} /></div>
            <div><h2 className="mb-4 text-xl font-bold">{d.common.equipment}</h2><List items={v.equipment} /></div>
          </section>
          <section className="mt-12" data-testid="vehicle-trip-types">
            <h2 className="mb-4 text-xl font-bold">{d.common.suitableTrips}</h2>
            <div className="flex flex-wrap gap-2">{services.map((s) => <Link key={s.id} href={href(lang, `/services/${s.slug}`)} className="border border-navy-200 px-3.5 py-2 text-sm font-semibold text-navy-900 hover:border-navy-500">{t(s.title, lang)}</Link>)}</div>
          </section>
        </div>
        <aside>
          <div className="sticky top-28 border border-navy-100 bg-white p-6 shadow-sm" data-testid="vehicle-summary">
            <p className="eyebrow">{cat && t(cat.name, lang)}</p>
            <h1 className="mt-2 text-3xl font-bold" data-testid="page-title">{v.name}</h1>
            <p className="mt-3 inline-flex items-center gap-2 bg-navy-50 px-3 py-1.5 font-semibold text-navy-900"><Users className="h-4 w-4" />{v.capacity} {d.common.passengers}</p>
            <p className="mt-4 text-[15px] text-ink/70">{t(v.description, lang)}</p>
            <dl className="mt-6 divide-y divide-navy-100 border-y border-navy-100 text-sm" data-testid="vehicle-pricing">
              <div className="flex justify-between py-3"><dt className="text-ink/60">{d.common.startingPrice}</dt><dd className="font-display text-xl font-bold text-navy-900">{formatPrice(v.pricing.startingPrice, lang)}</dd></div>
              <div className="flex justify-between py-3"><dt className="text-ink/60">{d.common.perHour}</dt><dd className="font-semibold">{formatPrice(v.pricing.pricePerHour, lang)}</dd></div>
              <div className="flex justify-between py-3"><dt className="text-ink/60">{d.common.perKm}</dt><dd className="font-semibold">{formatPrice(v.pricing.pricePerKm, lang, 2)}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-ink/50">{d.common.exclVat} · {d.common.priceNoteGeneric}</p>
            <ButtonLink href={quoteHref} size="lg" className="mt-6 w-full" data-testid="vehicle-quote-btn">{d.nav.requestQuote}</ButtonLink>
          </div>
        </aside>
      </div>
      <CtaBanner lang={lang} title={t(settings.homepage.ctaTitle, lang)} text={t(settings.homepage.ctaText, lang)} phone={settings.contact.phone} quoteHref={quoteHref} />
    </>
  );
}
