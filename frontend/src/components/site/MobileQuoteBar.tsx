'use client';
import { usePathname } from 'next/navigation';
import { Phone } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict, href } from '@/lib/utils';
import { ButtonLink } from '@/components/ui/Button';

export const MobileQuoteBar = ({ lang, phone }: { lang: Lang; phone: string }) => {
  const path = usePathname() || '';
  if (path.includes('/quote')) return null;
  const d = getDict(lang);
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-navy-100 bg-white p-3 sm:hidden" data-testid="mobile-quote-bar">
      <a href={`tel:${phone.replace(/\s/g, '')}`} aria-label={d.common.callUs} className="flex h-11 w-12 items-center justify-center border border-navy-200 text-navy-900"><Phone className="h-5 w-5" /></a>
      <ButtonLink href={href(lang, '/quote')} className="flex-1" data-testid="mobile-quote-btn">{d.nav.requestQuote}</ButtonLink>
    </div>
  );
};
