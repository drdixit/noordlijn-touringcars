import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Crumb = { label: string; href?: string };

export const Breadcrumbs = ({ items, light }: { items: Crumb[]; light?: boolean }) => (
  <nav aria-label="Breadcrumb" data-testid="breadcrumbs">
    <ol className={cn('flex flex-wrap items-center gap-1 text-sm', light ? 'text-white/70' : 'text-ink/55')}>
      {items.map((c, i) => (
        <li key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
          {c.href ? <Link href={c.href} className={cn('hover:underline', light ? 'hover:text-white' : 'hover:text-navy-900')}>{c.label}</Link> : <span className={light ? 'text-white' : 'text-ink/80'}>{c.label}</span>}
        </li>
      ))}
    </ol>
  </nav>
);
