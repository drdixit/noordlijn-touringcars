import type { ReactNode } from 'react';
import { Pencil } from 'lucide-react';

export type SummarySection = { title: string; rows: [string, ReactNode][]; onEdit?: () => void; editLabel?: string; testId?: string };

export const QuoteSummary = ({ sections }: { sections: SummarySection[] }) => (
  <div className="divide-y divide-navy-100 border border-navy-100 bg-white" data-testid="quote-summary">
    {sections.map((s) => (
      <section key={s.title} className="p-4 sm:p-5" data-testid={s.testId}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold">{s.title}</h3>
          {s.onEdit && (
            <button type="button" onClick={s.onEdit} data-testid={s.testId ? `${s.testId}-edit` : undefined} className="inline-flex items-center gap-1 text-sm font-semibold text-navy-700 hover:text-signal-600">
              <Pencil className="h-3.5 w-3.5" />{s.editLabel ?? 'Edit'}
            </button>
          )}
        </div>
        <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {s.rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-dashed border-navy-100 pb-2 sm:block sm:border-0 sm:pb-0">
              <dt className="text-sm text-ink/55">{k}</dt>
              <dd className="text-right text-[15px] font-medium text-navy-900 sm:text-left">{v || '—'}</dd>
            </div>
          ))}
        </dl>
      </section>
    ))}
  </div>
);
