import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Pagination = ({ page, pages, onChange, prevLabel = 'Previous', nextLabel = 'Next' }: { page: number; pages: number; onChange: (p: number) => void; prevLabel?: string; nextLabel?: string }) => {
  if (pages <= 1) return null;
  const cell = 'inline-flex h-10 min-w-10 items-center justify-center border border-navy-200 px-3 text-sm font-semibold transition-colors';
  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1" data-testid="pagination">
      <button type="button" disabled={page === 1} onClick={() => onChange(page - 1)} className={cn(cell, 'gap-1 text-navy-800 hover:bg-navy-50 disabled:opacity-40')} data-testid="pagination-prev">
        <ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline">{prevLabel}</span>
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button key={p} type="button" onClick={() => onChange(p)} aria-current={p === page ? 'page' : undefined} data-testid={`pagination-page-${p}`}
          className={cn(cell, p === page ? 'border-navy-900 bg-navy-900 text-white' : 'text-navy-800 hover:bg-navy-50')}>{p}</button>
      ))}
      <button type="button" disabled={page === pages} onClick={() => onChange(page + 1)} className={cn(cell, 'gap-1 text-navy-800 hover:bg-navy-50 disabled:opacity-40')} data-testid="pagination-next">
        <span className="hidden sm:inline">{nextLabel}</span><ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};
