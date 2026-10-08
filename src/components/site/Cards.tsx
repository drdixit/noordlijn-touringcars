import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Users } from 'lucide-react';
import type { BlogCategory, BlogPost, Destination, Lang, Service, Vehicle } from '@/lib/types';
import { formatDate, formatPrice, getDict, href, t } from '@/lib/utils';
import { vehicleCategories } from '@/data/vehicles';
import { ButtonLink } from '@/components/ui/button';

const Price = ({ lang, value, suffix }: { lang: Lang; value: number; suffix?: string }) => {
  const d = getDict(lang).common;
  return (
    <p className="text-sm text-ink/60">{d.priceFrom} <span className="font-display text-xl font-bold text-navy-900">{formatPrice(value, lang)}</span>{suffix && <span> {suffix}</span>} <span className="text-xs">{d.exclVat}</span></p>
  );
};

export const ServiceCard = ({ s, lang, vehicleNames }: { s: Service; lang: Lang; vehicleNames?: string[] }) => {
  const d = getDict(lang).common;
  return (
    <article className="group flex flex-col border border-navy-100 bg-white" data-testid={`service-card-${s.slug}`}>
      <Link href={href(lang, `/services/${s.slug}`)} className="relative block aspect-[3/2] overflow-hidden bg-navy-100">
        <Image src={s.image} alt={t(s.title, lang)} fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-semibold"><Link href={href(lang, `/services/${s.slug}`)} className="hover:text-signal-600">{t(s.title, lang)}</Link></h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{t(s.short, lang)}</p>
        {vehicleNames && <p className="mt-3 text-sm text-ink/55"><span className="font-semibold text-ink/70">{d.vehicleTypes}:</span> {vehicleNames.join(', ')}</p>}
        <div className="mt-auto pt-4">
          {vehicleNames && <div className="mb-4"><Price lang={lang} value={s.startingPrice} /></div>}
          <div className="flex flex-wrap items-center gap-3">
            <Link href={href(lang, `/services/${s.slug}`)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-signal-600" data-testid={`service-view-${s.slug}`}>{d.viewService}<ArrowRight className="h-4 w-4" /></Link>
            {vehicleNames && <ButtonLink href={href(lang, `/quote?service=${s.slug}`)} size="sm" variant="outline" className="ml-auto" data-testid={`service-quote-${s.slug}`}>{d.requestQuote}</ButtonLink>}
          </div>
        </div>
      </div>
    </article>
  );
};

export const VehicleCard = ({ v, lang }: { v: Vehicle; lang: Lang }) => {
  const d = getDict(lang).common;
  const cat = vehicleCategories.find((c) => c.id === v.category);
  return (
    <article className="flex flex-col border border-navy-100 bg-white" data-testid={`vehicle-card-${v.slug}`}>
      <Link href={href(lang, `/vehicles/${v.slug}`)} className="relative block aspect-[16/10] overflow-hidden bg-navy-100">
        <Image src={v.images[0]} alt={v.name} fill sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" className="object-cover" />
        <span className="absolute left-0 top-3 bg-navy-900 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">{cat && t(cat.name, lang)}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold"><Link href={href(lang, `/vehicles/${v.slug}`)} className="hover:text-signal-600">{v.name}</Link></h3>
          <span className="inline-flex shrink-0 items-center gap-1 bg-navy-50 px-2 py-1 text-sm font-semibold text-navy-800" data-testid={`vehicle-capacity-${v.slug}`}><Users className="h-4 w-4" />{v.capacity}</span>
        </div>
        <p className="mt-2 text-[15px] text-ink/70">{t(v.description, lang)}</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-ink/75">
          {v.features.slice(0, 4).map((f) => <li key={f.en} className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 shrink-0 text-emerald-700" />{t(f, lang)}</li>)}
        </ul>
        <div className="mt-auto pt-5">
          <Price lang={lang} value={v.pricing.startingPrice} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            <ButtonLink href={href(lang, `/vehicles/${v.slug}`)} variant="outline" size="sm" data-testid={`vehicle-view-${v.slug}`}>{d.viewDetails}</ButtonLink>
            <ButtonLink href={href(lang, `/quote?vehicle=${v.slug}`)} size="sm" data-testid={`vehicle-quote-${v.slug}`}>{d.requestQuote}</ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
};

export const DestinationCard = ({ dst, lang }: { dst: Destination; lang: Lang }) => (
  <Link href={href(lang, `/destinations/${dst.slug}`)} className="group block" data-testid={`destination-card-${dst.slug}`}>
    <div className="relative aspect-[4/5] overflow-hidden bg-navy-100">
      <Image src={dst.image} alt={t(dst.name, lang)} fill sizes="(min-width:1024px) 300px, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
      <div className="absolute inset-x-0 bottom-0 bg-navy-950/75 p-4 text-white">
        <p className="text-xs uppercase tracking-wider text-white/70">{t(dst.country, lang)}</p>
        <h3 className="font-display text-xl font-semibold text-white">{t(dst.name, lang)}</h3>
      </div>
    </div>
    <p className="mt-3 text-sm leading-relaxed text-ink/70">{t(dst.short, lang)}</p>
    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-navy-800 group-hover:text-signal-600">{getDict(lang).common.viewDestination}<ArrowRight className="h-4 w-4" /></span>
  </Link>
);

export const BlogCard = ({ p, lang, category }: { p: BlogPost; lang: Lang; category?: BlogCategory }) => (
  <article className="group" data-testid={`blog-card-${p.slug}`}>
    <Link href={href(lang, `/blog/${p.slug}`)} className="relative block aspect-[3/2] overflow-hidden bg-navy-100">
      <Image src={p.image} alt={t(p.title, lang)} fill sizes="(min-width:1024px) 300px, 50vw" className="object-cover" />
    </Link>
    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-signal-600">{category && t(category.name, lang)} <span className="font-normal text-ink/50">· {formatDate(p.date, lang)}</span></p>
    <h3 className="mt-1.5 text-lg font-semibold leading-snug"><Link href={href(lang, `/blog/${p.slug}`)} className="hover:text-signal-600">{t(p.title, lang)}</Link></h3>
    <p className="mt-2 line-clamp-2 text-sm text-ink/65">{t(p.excerpt, lang)}</p>
  </article>
);
