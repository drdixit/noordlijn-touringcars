'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone, X } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { cn, getDict, href } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/button';
import { Logo } from './Logo';
import { navItems } from '@/lib/nav';


const LangSwitch = ({ lang, suffix = '' }: { lang: Lang; suffix?: string }) => {
  const path = usePathname() || `/${lang}`;
  const swap = (l: Lang) => path.replace(/^\/(nl|en)/, `/${l}`);
  return (
    <div className="flex text-xs font-semibold" data-testid={`language-switch${suffix}`}>
      {(['nl', 'en'] as Lang[]).map((l) => (
        <Link key={l} href={swap(l)} data-testid={`lang-${l}${suffix}`} aria-current={l === lang ? 'true' : undefined}
          className={cn('px-2 py-1 uppercase', l === lang ? 'bg-navy-900 text-white' : 'text-navy-700 hover:bg-navy-50')}>{l}</Link>
      ))}
    </div>
  );
};

export const Header = ({ lang, phone }: { lang: Lang; phone: string }) => {
  const [open, setOpen] = useState(false);
  const path = usePathname() || '';
  const d = getDict(lang);
  const items = navItems(lang);
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white">
      <div className="hidden border-b border-navy-100 bg-navy-50/60 md:block">
        <div className="container-site flex h-9 items-center justify-end gap-6 text-sm text-ink/70">
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-navy-900" data-testid="header-phone"><Phone className="h-3.5 w-3.5" />{phone}</a>
          <Link href={href(lang, '/faq')} className="hover:text-navy-900">{d.nav.faq}</Link>
          <a href="https://github.com/drdixit/noordlijn-touringcars" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-navy-900">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/></svg>
            GitHub
          </a>
          <LangSwitch lang={lang} />
        </div>
      </div>
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo href={href(lang)} />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {items.map((i) => (
            <Link key={i.key} href={i.href} data-testid={`nav-${i.key}`}
              className={cn('px-3 py-2 text-[15px] font-semibold transition-colors', path.startsWith(i.href) ? 'text-signal-600' : 'text-navy-900 hover:text-signal-600')}>{i.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href={href(lang, '/quote')} size="sm" className="hidden sm:inline-flex lg:h-11 lg:px-5" data-testid="header-quote-btn">{d.nav.requestQuote}</ButtonLink>
          <div className="md:hidden"><LangSwitch lang={lang} suffix="-mobile" /></div>
          <button type="button" className="p-2 text-navy-900 lg:hidden" onClick={() => setOpen(!open)} aria-label={d.nav.menu} aria-expanded={open} data-testid="mobile-menu-toggle">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-navy-100 bg-white lg:hidden" data-testid="mobile-menu">
          <nav className="container-site flex flex-col py-2">
            {items.map((i) => (
              <Link key={i.key} href={i.href} onClick={() => setOpen(false)} data-testid={`mobile-nav-${i.key}`} className={cn("border-b border-navy-50 py-3.5 text-base font-semibold", path.startsWith(i.href) ? "text-signal-600" : "text-navy-900")}>{i.label}</Link>
            ))}
            <Link href={href(lang, '/faq')} onClick={() => setOpen(false)} className={cn("border-b border-navy-50 py-3.5 text-base font-semibold", path.startsWith(href(lang, '/faq')) ? "text-signal-600" : "text-navy-900")}>{d.nav.faq}</Link>
            <a href="https://github.com/drdixit/noordlijn-touringcars" target="_blank" rel="noopener noreferrer" className="border-b border-navy-50 py-3.5 flex items-center gap-2 text-base font-semibold text-navy-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/></svg>
              GitHub
            </a>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 py-3.5 text-base text-navy-800"><Phone className="h-4 w-4" />{phone}</a>
          </nav>
        </div>
      )}
    </header>
  );
};
