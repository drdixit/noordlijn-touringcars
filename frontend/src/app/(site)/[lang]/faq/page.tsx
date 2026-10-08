import { Mail, Phone } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict, href, t } from '@/lib/utils';
import { getFaqCategories, getFaqs, getSettings } from '@/lib/repo';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/site/Sections';

export const generateMetadata = ({ params }: { params: { lang: Lang } }) => ({ title: getDict(params.lang).faqPage.title });

export default async function FaqPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  const d = getDict(lang);
  const [faqs, cats, settings] = await Promise.all([getFaqs(), getFaqCategories(), getSettings()]);
  const groups = cats.map((c) => ({ ...c, items: faqs.filter((f) => f.category === c.id) })).filter((g) => g.items.length);
  return (
    <>
      <PageHero title={d.faqPage.title} intro={d.faqPage.intro} crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.faq }]} />
      <div className="container-site grid gap-10 py-12 sm:py-16 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="hidden lg:block" aria-label="FAQ categories">
          <ul className="sticky top-28 space-y-1 border-l border-navy-100">
            {groups.map((g) => <li key={g.id}><a href={`#${g.id}`} className="block border-l-2 border-transparent py-1.5 pl-4 text-sm font-semibold text-navy-800 hover:border-signal-500" data-testid={`faq-nav-${g.id}`}>{t(g.name, lang)}</a></li>)}
          </ul>
        </nav>
        <div className="space-y-12">
          {groups.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-28" data-testid={`faq-category-${g.id}`}>
              <h2 className="mb-3 text-2xl font-bold">{t(g.name, lang)}</h2>
              <Accordion items={g.items.map((f) => ({ id: f.id, title: t(f.question, lang), content: t(f.answer, lang) }))} />
            </section>
          ))}
          <section className="flex flex-col gap-5 border border-navy-100 bg-navy-50 p-6 sm:flex-row sm:items-center sm:justify-between" data-testid="faq-contact-cta">
            <div><h2 className="text-xl font-bold">{d.faqPage.ctaTitle}</h2><p className="mt-1 text-ink/65">{d.faqPage.ctaText}</p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold text-navy-900"><a href={`tel:${settings.contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4" />{settings.contact.phone}</a><a href={`mailto:${settings.contact.email}`} className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4" />{settings.contact.email}</a></p>
            </div>
            <ButtonLink href={href(lang, '/contact')} variant="secondary" data-testid="faq-contact-btn">{d.nav.contact}</ButtonLink>
          </section>
        </div>
      </div>
    </>
  );
}
