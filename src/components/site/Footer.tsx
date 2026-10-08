import Link from 'next/link';
import type { Lang, Service, SiteSettings } from '@/lib/types';
import { getDict, href, t } from '@/lib/utils';
import { Logo } from './Logo';
import { navItems } from '@/lib/nav';

export const Footer = ({ lang, settings, services }: { lang: Lang; settings: SiteSettings; services: Service[] }) => {
  const d = getDict(lang);
  const c = settings.contact;
  const socials = [
    { k: 'facebook', I: 'Fb', u: settings.social.facebook }, { k: 'instagram', I: 'Ig', u: settings.social.instagram },
    { k: 'linkedin', I: 'In', u: settings.social.linkedin }, { k: 'youtube', I: 'Yt', u: settings.social.youtube },
  ];
  const link = 'text-white/70 hover:text-white';
  return (
    <footer className="bg-navy-950 pb-24 text-sm text-white sm:pb-0" data-testid="site-footer">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo href={href(lang)} light />
          <p className="mt-5 max-w-xs leading-relaxed text-white/70">{t(settings.footer.text, lang)}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/50">{d.footer.follow}</p>
          <div className="mt-3 flex gap-2">
            {socials.map(({ k, I, u }) => (
              <a key={k} href={u} target="_blank" rel="noreferrer" aria-label={k} data-testid={`footer-social-${k}`} className="flex h-9 w-9 items-center justify-center border border-white/20 text-xs font-bold text-white/80 hover:border-white hover:text-white">{I}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">{d.footer.services}</h3>
          <ul className="space-y-2.5">
            {services.slice(0, 7).map((s) => <li key={s.id}><Link href={href(lang, `/services/${s.slug}`)} className={link}>{t(s.title, lang)}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">{d.footer.company}</h3>
          <ul className="space-y-2.5">
            {navItems(lang).map((i) => <li key={i.key}><Link href={i.href} className={link}>{i.label}</Link></li>)}
            <li><Link href={href(lang, '/faq')} className={link}>{d.nav.faq}</Link></li>
            <li><Link href={href(lang, '/quote')} className={link}>{d.nav.requestQuote}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">{d.footer.contact}</h3>
          <address className="space-y-2.5 not-italic text-white/70">
            <p>{settings.company.name}<br />{c.street}<br />{c.postcode} {c.city}</p>
            <p><a href={`tel:${c.phone.replace(/\s/g, '')}`} className="font-semibold text-white hover:underline" data-testid="footer-phone">{c.phone}</a></p>
            <p><a href={`mailto:${c.email}`} className={link} data-testid="footer-email">{c.email}</a></p>
            <p className="text-xs text-white/50">{d.footer.kvk} {settings.company.kvk} · {d.footer.vat} {settings.company.vat}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 {settings.footer.copyright}. {d.footer.rights}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">{d.footer.privacy}</a>
            <a href="#" className="hover:text-white">{d.footer.terms}</a>
            <a href="#" className="hover:text-white">{d.footer.cookies}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
