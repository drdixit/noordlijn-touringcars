import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Clock, Globe2, ShieldCheck, Users, Bus } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict, href, t } from '@/lib/utils';
import { getDestinations, getFaqs, getPublishedPosts, getServices, getSettings, getTestimonials, getVehicles, getBlogCategories } from '@/lib/repo';
import { ButtonLink } from '@/components/ui/button';
import { Accordion } from '@/components/ui/custom-accordion';
import { QuickQuoteForm } from '@/components/site/QuickQuoteForm';
import { BlogCard, DestinationCard, ServiceCard, VehicleCard } from '@/components/site/Cards';
import { CtaBanner, SectionHead } from '@/components/site/Sections';
import { Testimonials } from '@/components/site/Testimonials';

const whyIcons = [Users, Bus, ShieldCheck, Clock, Globe2];

export default async function HomePage(props: { params: Promise<{ lang: Lang }> }) {
  const params = await props.params;
  const lang = params.lang;
  const d = getDict(lang);
  const [settings, services, vehicles, destinations, reviews, faqs, posts, cats] = await Promise.all([
    getSettings(), getServices(), getVehicles(), getDestinations(), getTestimonials(), getFaqs(), getPublishedPosts(), getBlogCategories(),
  ]);
  const hp = settings.homepage;

  return (
    <>
      <section className="relative bg-navy-950" data-testid="home-hero">
        <Image src="/images/coach-4.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="container-site relative grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:py-24">
          <div className="text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{d.home.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl" data-testid="hero-title">{t(hp.heroTitle, lang)}</h1>
            <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">{t(hp.heroSubtitle, lang)}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={href(lang, '/quote')} size="lg" data-testid="hero-quote-btn">{d.nav.requestQuote}</ButtonLink>
              <ButtonLink href={href(lang, '/vehicles')} size="lg" variant="white" data-testid="hero-vehicles-btn">{d.common.viewVehicles}</ButtonLink>
            </div>
            <ul className="mt-8 grid gap-2 text-sm text-white/85 sm:grid-cols-3 sm:gap-4">
              {d.home.trust.map((x) => <li key={x} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-white" />{x}</li>)}
            </ul>
          </div>
          <div className="bg-white p-5 shadow-2xl sm:p-7" id="plan">
            <h2 className="text-2xl font-bold">{d.home.quickTitle}</h2>
            <p className="mb-5 mt-1 text-sm text-ink/60">{d.home.quickHelp}</p>
            <QuickQuoteForm lang={lang} />
          </div>
        </div>
      </section>

      <section className="border-b border-navy-100 bg-white">
        <div className="container-site grid grid-cols-2 divide-navy-100 py-6 md:grid-cols-4 md:divide-x">
          {d.home.stats.map((s) => (
            <div key={s.l} className="px-2 py-3 text-center md:px-6"><p className="font-display text-3xl font-bold text-navy-900">{s.v}</p><p className="text-sm text-ink/60">{s.l}</p></div>
          ))}
        </div>
      </section>

      <section className="container-site py-16 sm:py-20" data-testid="home-services">
        <SectionHead title={d.home.servicesTitle} intro={d.home.servicesIntro} action={<Link href={href(lang, '/services')} className="inline-flex items-center gap-1 font-semibold text-navy-800 hover:text-signal-600">{d.common.viewAll}<ArrowRight className="h-4 w-4" /></Link>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => <ServiceCard key={s.id} s={s} lang={lang} />)}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {services.slice(6).map((s) => (
            <Link key={s.id} href={href(lang, `/services/${s.slug}`)} className="inline-flex items-center gap-2 border border-navy-200 px-4 py-2.5 text-sm font-semibold text-navy-900 hover:border-navy-500" data-testid={`service-chip-${s.slug}`}>{t(s.title, lang)}<ArrowRight className="h-3.5 w-3.5" /></Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-20" data-testid="home-vehicles">
        <div className="container-site">
          <SectionHead title={d.home.vehiclesTitle} intro={d.home.vehiclesIntro} action={<ButtonLink href={href(lang, '/vehicles')} variant="outline">{d.common.viewVehicles}</ButtonLink>} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.filter((v) => v.featured).slice(0, 4).map((v) => <VehicleCard key={v.id} v={v} lang={lang} />)}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16" data-testid="home-why">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">{d.home.whyTitle}</h2>
          <p className="mt-4 text-ink/70 md:text-lg">{t(settings.company.about, lang)}</p>
          <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-navy-100"><Image src="/images/driver.jpg" alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" /></div>
        </div>
        <ul className="grid gap-px self-start bg-navy-100 sm:grid-cols-2">
          {d.home.why.map((w, i) => {
            const I = whyIcons[i];
            return (
              <li key={w.t} className={`bg-white p-6 ${i === 4 ? 'sm:col-span-2' : ''}`}>
                <I className="h-6 w-6 text-signal-500" strokeWidth={1.75} />
                <h3 className="mt-4 text-lg font-semibold">{w.t}</h3>
                <p className="mt-1.5 text-[15px] text-ink/65">{w.d}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-navy-100 py-16 sm:py-20" data-testid="home-destinations">
        <div className="container-site">
          <SectionHead title={d.home.destTitle} intro={d.home.destIntro} action={<Link href={href(lang, '/destinations')} className="inline-flex items-center gap-1 font-semibold text-navy-800 hover:text-signal-600">{d.common.viewAll}<ArrowRight className="h-4 w-4" /></Link>} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-6">
            {destinations.slice(0, 4).map((x) => <DestinationCard key={x.id} dst={x} lang={lang} />)}
          </div>
        </div>
      </section>

      <section className="bg-navy-50 py-16 sm:py-20" data-testid="home-reviews">
        <div className="container-site">
          <SectionHead title={d.home.reviewsTitle} />
          <Testimonials items={reviews.slice(0, 4)} lang={lang} />
        </div>
      </section>

      <section className="container-site grid gap-10 py-16 sm:py-20 lg:grid-cols-[minmax(0,220px)_minmax(0,1.6fr)]" data-testid="home-faq">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">{d.home.faqTitle}</h2>
          <Link href={href(lang, '/faq')} className="mt-4 inline-flex items-center gap-1 font-semibold text-navy-800 hover:text-signal-600">{d.common.viewAll}<ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Accordion items={faqs.filter((f) => f.showOnHome).map((f) => ({ id: f.id, title: t(f.question, lang), content: t(f.answer, lang) }))} />
      </section>

      <section className="border-t border-navy-100 py-16 sm:py-20" data-testid="home-blog">
        <div className="container-site">
          <SectionHead title={d.home.blogTitle} action={<Link href={href(lang, '/blog')} className="inline-flex items-center gap-1 font-semibold text-navy-800 hover:text-signal-600">{d.common.viewAll}<ArrowRight className="h-4 w-4" /></Link>} />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {posts.slice(0, 4).map((p) => <BlogCard key={p.id} p={p} lang={lang} category={cats.find((c) => c.id === p.categoryId)} />)}
          </div>
        </div>
      </section>

      <CtaBanner lang={lang} title={t(hp.ctaTitle, lang)} text={t(hp.ctaText, lang)} phone={settings.contact.phone} />
    </>
  );
}

export const instant = false;
