import Link from 'next/link';
import { cn } from '@/lib/utils';

export const Logo = ({ href, light, sub }: { href: string; light?: boolean; sub?: string }) => (
  <Link href={href} className="flex items-center gap-2.5" data-testid="site-logo">
    <span className="flex h-9 w-9 items-center justify-center bg-navy-900 font-display text-lg font-bold text-white ring-1 ring-white/20">
      N<span className="ml-px mt-3 h-1.5 w-1.5 bg-signal-500" />
    </span>
    <span className="leading-none">
      <span className={cn('block font-display text-lg font-bold tracking-wide', light ? 'text-white' : 'text-navy-900')}>NOORDLIJN</span>
      <span className={cn('block text-[11px] font-medium uppercase tracking-[0.2em]', light ? 'text-white/60' : 'text-ink/50')}>{sub ?? 'Touringcars'}</span>
    </span>
  </Link>
);
