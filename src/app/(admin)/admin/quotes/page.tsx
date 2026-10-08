'use client';
import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { QuoteStatus } from '@/lib/types';
import { formatDate, formatPrice } from '@/lib/utils';
import { computeQuote } from '@/lib/quoteMath';
import { QUOTE_STATUSES, QuoteStatusBadge, statusLabel } from '@/components/ui/custom-badge';
import { Table, THead, Th, Td, Tr } from '@/components/ui/custom-table';
import { EmptyState } from '@/components/ui/empty-state';
import { FilterTabs, PageHeader, SearchBox } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

const short = (iso: string) => formatDate(iso, 'en', { day: 'numeric', month: 'short', year: 'numeric' });

function QuotesList() {
  const { quotes, customers, vehicles, pricing } = useAdmin();
  const router = useRouter();
  const sp = useSearchParams();
  const [status, setStatus] = useState<QuoteStatus | ''>((sp?.get('status') as QuoteStatus) || '');
  const [q, setQ] = useState('');
  const cust = (id: string) => customers.find((c) => c.id === id);
  const list = useMemo(() => quotes.filter((x) => {
    if (status && x.status !== status) return false;
    const s = q.toLowerCase();
    return !s || [x.id, x.pickup, x.destination, cust(x.customerId)?.name, cust(x.customerId)?.company].join(' ').toLowerCase().includes(s);
  }), [quotes, status, q]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <PageHeader title="Quotes" sub={`${quotes.length} quote requests`} />
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterTabs testId="quote-status-filter" value={status} onChange={setStatus} options={[{ value: '' as const, label: 'All', count: quotes.length }, ...QUOTE_STATUSES.map((s) => ({ value: s, label: statusLabel(s), count: quotes.filter((x) => x.status === s).length }))]} />
        <SearchBox value={q} onChange={setQ} placeholder="Search ID, customer, place…" testId="quote-search" />
      </div>
      {list.length ? (
        <Table testId="quotes-table">
          <THead><Th>Quote ID</Th><Th>Customer</Th><Th>Pickup</Th><Th>Destination</Th><Th>Date</Th><Th className="text-right">Pax</Th><Th>Vehicle</Th><Th className="text-right">Est. price</Th><Th>Status</Th><Th>Created</Th></THead>
          <tbody>
            {list.map((x) => (
              <Tr key={x.id} onClick={() => router.push(`/admin/quotes/${x.id}`)} testId={`quote-row-${x.id}`}>
                <Td className="whitespace-nowrap font-semibold text-navy-900">{x.id}</Td>
                <Td><span className="block font-medium">{cust(x.customerId)?.name}</span><span className="text-xs text-ink/50">{cust(x.customerId)?.company}</span></Td>
                <Td>{x.pickup}</Td><Td>{x.destination}</Td><Td className="whitespace-nowrap">{short(x.departureDate)}</Td>
                <Td className="text-right">{x.passengers}</Td><Td className="whitespace-nowrap">{vehicles.find((v) => v.id === x.vehicleId)?.name ?? <span className="text-ink/40">Not assigned</span>}</Td>
                <Td className="whitespace-nowrap text-right font-semibold">{formatPrice(computeQuote(x, pricing).total, 'en')}</Td>
                <Td><QuoteStatusBadge status={x.status} /></Td><Td className="whitespace-nowrap text-ink/55">{short(x.createdAt)}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : <EmptyState title="No quotes match" text="Try another status or search term." />}
    </>
  );
}

export default function QuotesPage() {
  return <Suspense><QuotesList /></Suspense>;
}
