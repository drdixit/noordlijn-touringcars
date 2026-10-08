import Image from 'next/image';
import { Check } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict, href, t } from '@/lib/utils';
import { getSettings, getVehicleCategories } from '@/lib/repo';
import { CtaBanner, PageHero } from '@/components/site/Sections';

export const generateMetadata = ({ params }: { params: { lang: Lang } }) => ({ title: getDict(params.lang).about.title });

export default async function AboutPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  const d = getDict(lang);
  const a = d.about;
  const [s, cats] = await Promise.all([getSettings(), getVehicleCategories()]);
  return (
    <>
      <PageHero title={a.title} intro={a.intro} image="/images/coach-1.jpg" crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.about }]} />
      <section className="border-b border-navy-100" data-testid="about-stats">
        <div className="container-site grid grid-cols-2 py-6 md:grid-cols-4">
          {d.home.stats.map((x) => <div key={x.l} className="py-3 text-center"><p className="font-display text-4xl font-bold text-navy-900">{x.v}</p><p className="text-sm text-ink/60">{x.l}</p></div>)}
        </div>
      </section>
      <section className="container-site grid gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16" data-testid="about-story">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">{a.storyTitle}</h2>
          {a.story.map((p) => <p key={p} className="mt-4 text-lg leading-relaxed text-ink/75">{p}</p>)}
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-navy-100"><Image src="/images/driver.jpg" alt="" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /></div>
      </section>
      <section className="bg-navy-50 py-14 sm:py-20">
        <div className="container-site grid gap-px bg-navy-100 md:grid-cols-3">
          {[[a.expTitle, a.exp], [a.fleetTitle, a.fleet], [a.areaTitle, a.area]].map(([h, p]) => (
            <div key={h} className="bg-white p-7"><h3 className="text-xl font-bold">{h}</h3><p className="mt-3 text-[15px] leading-relaxed text-ink/70">{p}</p></div>
          ))}
        </div>
        <div className="container-site mt-8 flex flex-wrap gap-2">
          {cats.map((c) => <span key={c.id} className="border border-navy-200 bg-white px-3.5 py-2 text-sm font-semibold text-navy-900">{t(c.name, lang)} · {c.range} {d.common.seats}</span>)}
        </div>
      </section>
      <section className="container-site py-14 sm:py-20" data-testid="about-why">
        <h2 className="mb-8 text-3xl font-bold sm:text-4xl">{d.home.whyTitle}</h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.home.why.map((w) => <li key={w.t} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-emerald-700" /><div><h3 className="text-lg font-semibold">{w.t}</h3><p className="mt-1 text-[15px] text-ink/65">{w.d}</p></div></li>)}
        </ul>
      </section>
      <CtaBanner lang={lang} title={t(s.homepage.ctaTitle, lang)} text={t(s.homepage.ctaText, lang)} phone={s.contact.phone} />
    </>
  );
}
