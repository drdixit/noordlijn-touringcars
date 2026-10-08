import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict, href, t } from '@/lib/utils';
import { getBlogCategories, getDestination, getDestinations, getPostsByIds, getServicesByIds, getSettings, getVehiclesByIds } from '@/lib/repo';
import { ButtonLink } from '@/components/ui/Button';
import { BlogCard, VehicleCard } from '@/components/site/Cards';
import { CtaBanner, PageHero } from '@/components/site/Sections';

export async function generateStaticParams() {
  return (await getDestinations()).flatMap((x) => ['nl', 'en'].map((lang) => ({ lang, slug: x.slug })));
}
export async function generateMetadata({ params }: { params: { lang: Lang; slug: string } }) {
  const x = await getDestination(params.slug);
  return x ? { title: t(x.seoTitle, params.lang), description: t(x.seoDescription, params.lang) } : {};
}

export default async function DestinationDetail({ params }: { params: { lang: Lang; slug: string } }) {
  const { lang } = params;
  const x = await getDestination(params.slug);
  if (!x) notFound();
  const d = getDict(lang);
  const [services, vehicles, posts, cats, settings] = await Promise.all([getServicesByIds(x.serviceIds), getVehiclesByIds(x.vehicleIds), getPostsByIds(x.blogIds), getBlogCategories(), getSettings()]);
  const quoteHref = href(lang, `/quote?destination_slug=${x.slug}`);
  return (
    <>
      <PageHero title={t(x.name, lang)} intro={t(x.short, lang)} image={x.image} crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.destinations, href: href(lang, '/destinations') }, { label: t(x.name, lang) }]}>
        <p className="mt-4 flex items-center gap-2 text-sm text-white/80"><MapPin className="h-4 w-4" />{t(x.country, lang)} · ± {x.distanceKm} {d.common.kmFromUtrecht}</p>
        <ButtonLink href={quoteHref} size="lg" className="mt-8" data-testid="destination-quote-btn">{d.nav.requestQuote}</ButtonLink>
      </PageHero>
      <div className="container-site space-y-14 py-12 sm:py-16">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <p className="text-lg leading-relaxed text-ink/80">{t(x.description, lang)}</p>
          <div data-testid="destination-services">
            <h2 className="mb-4 text-xl font-bold">{d.common.availableServices}</h2>
            <ul className="divide-y divide-navy-100 border-y border-navy-100">
              {services.map((s) => <li key={s.id}><Link href={href(lang, `/services/${s.slug}`)} className="flex items-center justify-between py-3 font-semibold text-navy-900 hover:text-signal-600">{t(s.title, lang)}<ArrowRight className="h-4 w-4" /></Link></li>)}
            </ul>
          </div>
        </section>
        <section data-testid="destination-trips">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{d.common.suggestedTrips}</h2>
          <div className="grid gap-px bg-navy-100 sm:grid-cols-2">
            {x.suggestedTrips.map((s, i) => <div key={i} className="bg-white p-5"><h3 className="text-lg font-semibold">{t(s.title, lang)}</h3><p className="mt-1 text-[15px] text-ink/65">{t(s.text, lang)}</p></div>)}
          </div>
        </section>
        <section data-testid="destination-vehicles">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{d.common.suitableVehicles}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{vehicles.map((v) => <VehicleCard key={v.id} v={v} lang={lang} />)}</div>
        </section>
        {posts.length > 0 && (
          <section data-testid="destination-posts">
            <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{d.common.relatedPosts}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <BlogCard key={p.id} p={p} lang={lang} category={cats.find((c) => c.id === p.categoryId)} />)}</div>
          </section>
        )}
      </div>
      <CtaBanner lang={lang} title={t(settings.homepage.ctaTitle, lang)} text={t(settings.homepage.ctaText, lang)} phone={settings.contact.phone} quoteHref={quoteHref} />
    </>
  );
}
