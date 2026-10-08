import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { CustomerStatus, PostStatus, QuoteStatus } from '@/lib/types';

type Tone = 'blue' | 'navy' | 'amber' | 'green' | 'gray' | 'red' | 'teal' | 'violet';
const tones: Record<Tone, string> = {
  blue: 'bg-sky-50 text-sky-800 ring-sky-200',
  navy: 'bg-navy-50 text-navy-800 ring-navy-200',
  amber: 'bg-orange-50 text-orange-800 ring-orange-200',
  green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  teal: 'bg-teal-50 text-teal-800 ring-teal-200',
  violet: 'bg-indigo-50 text-indigo-800 ring-indigo-200',
  gray: 'bg-gray-100 text-gray-700 ring-gray-200',
  red: 'bg-signal-50 text-signal-700 ring-signal-100',
};

export const Badge = ({ tone = 'navy', children, testId }: { tone?: Tone; children: ReactNode; testId?: string }) => (
  <span data-testid={testId} className={cn('inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold ring-1 ring-inset', tones[tone])}>{children}</span>
);

const quoteTone: Record<QuoteStatus, Tone> = { new: 'blue', contacted: 'violet', quoted: 'amber', accepted: 'teal', confirmed: 'green', completed: 'gray', cancelled: 'red' };
export const QUOTE_STATUSES = Object.keys(quoteTone) as QuoteStatus[];
export const statusLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const QuoteStatusBadge = ({ status }: { status: QuoteStatus }) => <Badge tone={quoteTone[status]} testId={`quote-status-${status}`}>{statusLabel(status)}</Badge>;

const postTone: Record<PostStatus, Tone> = { draft: 'gray', published: 'green', scheduled: 'amber' };
export const PostStatusBadge = ({ status }: { status: PostStatus }) => <Badge tone={postTone[status]}>{statusLabel(status)}</Badge>;

const custTone: Record<CustomerStatus, Tone> = { lead: 'blue', active: 'green', inactive: 'gray' };
export const CustomerStatusBadge = ({ status }: { status: CustomerStatus }) => <Badge tone={custTone[status]}>{statusLabel(status)}</Badge>;

export const ActiveBadge = ({ active, on = 'Active', off = 'Inactive' }: { active: boolean; on?: string; off?: string }) => <Badge tone={active ? 'green' : 'gray'}>{active ? on : off}</Badge>;
