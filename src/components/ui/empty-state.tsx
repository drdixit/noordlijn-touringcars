import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ title, text, action, testId = 'empty-state' }: { title: string; text?: string; action?: ReactNode; testId?: string }) => (
  <div data-testid={testId} className="flex flex-col items-center border border-dashed border-navy-200 bg-navy-50/50 px-6 py-14 text-center">
    <Inbox className="mb-3 h-8 w-8 text-navy-300" strokeWidth={1.5} />
    <p className="font-display text-lg font-semibold text-navy-900">{title}</p>
    {text && <p className="mt-1 max-w-md text-sm text-ink/60">{text}</p>}
    {action && <div className="mt-5">{action}</div>}
  </div>
);
