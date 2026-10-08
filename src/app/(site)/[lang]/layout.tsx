import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../../globals.css';
import { fontVars } from '@/lib/fonts';
import { isLang, LANGS, t } from '@/lib/utils';
import { getServices, getSettings } from '@/lib/repo';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { MobileQuoteBar } from '@/components/site/MobileQuoteBar';

export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const s = await getSettings();
  const lang = isLang(params.lang) ? params.lang : 'nl';
  const home = s.seo.find((x) => x.key === 'home');
  return { title: { default: t(home?.title, lang), template: `%s | ${s.company.name}` }, description: t(home?.description, lang), alternates: { languages: { nl: '/nl', en: '/en' } } };
}

export default async function SiteLayout(props: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const children = props.children;
  if (!isLang(params.lang)) notFound();
  const lang = params.lang;
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  return (
    <html lang={lang} className={fontVars}>
      <body className="font-sans">
        <Header lang={lang} phone={settings.contact.phone} />
        <main className="min-h-[60vh]">{children}</main>
        <Footer lang={lang} settings={settings} services={services} />
        <MobileQuoteBar lang={lang} phone={settings.contact.phone} />
      </body>
    </html>
  );
}
