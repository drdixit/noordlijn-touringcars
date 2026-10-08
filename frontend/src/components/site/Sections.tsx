import type { ReactNode } from 'react';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { cn, getDict, href } from '@/lib/utils';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { ButtonLink } from '@/components/ui/Button';

export const PageHero = ({ title, intro, crumbs, image, children }: { title: string; intro?: string; crumbs: Crumb[]; image?: string; children?: ReactNode }) => (
  <section className={cn('relative', image ? 'bg-navy-950 text-white' : 'border-b border-navy-100 bg-navy-50')}>
    {image && <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />}
    <div className={cn('container-site relative', image ? 'py-16 sm:py-24' : 'py-10 sm:py-14')}>
      <Breadcrumbs items={crumbs} light={!!image} />
      <h1 className={cn('mt-4 max-w-3xl text-4xl font-bold sm:text-5xl', image && 'text-white')} data-testid="page-title">{title}</h1>
      {intro && <p className={cn('mt-4 max-w-2xl text-base sm:text-lg', image ? 'text-white/85' : 'text-ink/70')}>{intro}</p>}
      {children}
    </div>
  </section>
);

export const SectionHead = ({ eyebrow, title, intro, action }: { eyebrow?: string; title: string; intro?: string; action?: ReactNode }) => (
  <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {intro && <p className="mt-3 text-base text-ink/65 md:text-lg">{intro}</p>}
    </div>
    {action}
  </div>
);

export const CtaBanner = ({ lang, title, text, phone, quoteHref }: { lang: Lang; title: string; text: string; phone: string; quoteHref?: string }) => {
  const d = getDict(lang);
  return (
    <section className="bg-navy-900 text-white" data-testid="cta-banner">
      <div className="container-site flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 text-white/75 md:text-lg">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={quoteHref ?? href(lang, '/quote')} size="lg" data-testid="cta-quote-btn">{d.nav.requestQuote}</ButtonLink>
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 px-6 font-semibold text-white hover:border-white"><Phone className="h-4 w-4" />{phone}</a>
        </div>
      </div>
    </section>
  );
};

export const ArticleBody = ({ text }: { text: string }) => (
  <div className="prose-article">
    {text.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        const [h, ...rest] = block.split('\n');
        return <div key={i}><h2>{h.slice(3)}</h2>{rest.length > 0 && <p>{rest.join(' ')}</p>}</div>;
      }
      return <p key={i}>{block}</p>;
    })}
  </div>
);
