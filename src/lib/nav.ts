import type { Lang } from './types';
import { getDict, href } from './utils';

export const navItems = (lang: Lang) => {
  const d = getDict(lang).nav;
  return [
    { key: 'services', label: d.services, href: href(lang, '/services') },
    { key: 'vehicles', label: d.vehicles, href: href(lang, '/vehicles') },
    { key: 'destinations', label: d.destinations, href: href(lang, '/destinations') },
    { key: 'about', label: d.about, href: href(lang, '/about') },
    { key: 'blog', label: d.blog, href: href(lang, '/blog') },
    { key: 'contact', label: d.contact, href: href(lang, '/contact') },
  ];
};
