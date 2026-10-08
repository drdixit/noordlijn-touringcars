'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import type { CustomerStatus } from '@/lib/types';
import { formatDate, formatPrice, uid } from '@/lib/utils';
import { computeQuote } from '@/lib/quoteMath';
import { QuoteStatusBadge } from '@/components/ui/custom-badge';
import { Button } from '@/components/ui/button';
import { Field, Input, Select, Textarea } from '@/components/ui/custom-form';
import { Table, THead, Th, Td, Tr } from '@/components/ui/custom-table';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader, Panel } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

export default function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { customers, quotes, pricing, upsert, toast } = useAdmin();
  const c = customers.find((x) => x.id === id);
  const [note, setNote] = useState('');
  if (!c) return <EmptyState title="Customer not found" action={<Link href="/admin/customers" className="font-semibold underline">Back to customers</Link>} />;
  const cq = quotes.filter((q) => q.customerId === c.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const active = cq.filter((q) => !['completed', 'cancelled'].includes(q.status));
  const previous = cq.filter((q) => ['completed', 'cancelled'].includes(q.status));
  const revenue = cq.filter((q) => ['confirmed', 'completed'].includes(q.status)).reduce((s, q) => s + computeQuote(q, pricing).total, 0);
  const set = (k: 'name' | 'company' | 'email' | 'phone', v: string) => upsert('customers', { ...c, [k]: v });

  const QuoteTable = ({ list, testId }: { list: typeof cq; testId: string }) => list.length ? (
    <Table testId={testId}>
      <THead><Th>Quote</Th><Th>Trip</Th><Th>Date</Th><Th className="text-right">Total</Th><Th>Status</Th></THead>
      <tbody>{list.map((q) => (
        <Tr key={q.id} onClick={() => router.push(`/admin/quotes/${q.id}`)} testId={`customer-quote-${q.id}`}>
          <Td className="font-semibold text-navy-900">{q.id}</Td><Td>{q.pickup} → {q.destination}</Td>
          <Td className="whitespace-nowrap">{formatDate(q.departureDate, 'en', { day: 'numeric', month: 'short', year: 'numeric' })}</Td>
          <Td className="text-right">{formatPrice(computeQuote(q, pricing).total, 'en')}</Td><Td><QuoteStatusBadge status={q.status} /></Td>
        </Tr>
      ))}</tbody>
    </Table>
  ) : <p className="text-sm text-ink/50">None.</p>;

  return (
    <>
      <PageHeader title={c.name} sub={`${c.company || 'Private customer'} · customer since ${formatDate(c.createdAt, 'en')}`} back="/admin/customers" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <Panel title="Quote history" testId="customer-quote-history"><QuoteTable list={active} testId="customer-active-quotes" /></Panel>
          <Panel title="Previous requests" testId="customer-previous"><QuoteTable list={previous} testId="customer-previous-quotes" /></Panel>
          <Panel title="Internal notes" testId="customer-notes">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add an internal note…" className="min-h-[44px]" data-testid="customer-note-input" />
              <Button variant="secondary" size="sm" className="sm:self-end" disabled={!note.trim()} data-testid="customer-note-add"
                onClick={() => { upsert('customers', { ...c, notes: [{ id: uid('n'), text: note.trim(), author: 'Sanne', date: new Date().toISOString() }, ...c.notes] }); setNote(''); toast('Note added'); }}>Add note</Button>
            </div>
            <ul className="mt-4 space-y-3">
              {c.notes.map((n) => <li key={n.id} className="border-l-2 border-signal-500 pl-3 text-sm"><p>{n.text}</p><p className="text-xs text-ink/45">{n.author} · {formatDate(n.date, 'en', { day: 'numeric', month: 'short', year: 'numeric' })}</p></li>)}
              {!c.notes.length && <li className="text-sm text-ink/45">No notes yet.</li>}
            </ul>
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Customer information" testId="customer-info">
            <div className="grid gap-4">
              <Field label="Name" htmlFor="cu-name"><Input id="cu-name" value={c.name} onChange={(e) => set('name', e.target.value)} data-testid="customer-name-input" /></Field>
              <Field label="Company" htmlFor="cu-company"><Input id="cu-company" value={c.company} onChange={(e) => set('company', e.target.value)} /></Field>
              <Field label="Email" htmlFor="cu-email"><Input id="cu-email" type="email" value={c.email} onChange={(e) => set('email', e.target.value)} /></Field>
              <Field label="Phone" htmlFor="cu-phone"><Input id="cu-phone" value={c.phone} onChange={(e) => set('phone', e.target.value)} /></Field>
              <Field label="Status" htmlFor="cu-status"><Select id="cu-status" value={c.status} onChange={(e) => { upsert('customers', { ...c, status: e.target.value as CustomerStatus }); toast('Status updated'); }} data-testid="customer-status-select"><option value="lead">Lead</option><option value="active">Active</option><option value="inactive">Inactive</option></Select></Field>
            </div>
          </Panel>
          <Panel title="Summary">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-ink/50">Requests</dt><dd className="font-display text-2xl font-bold">{cq.length}</dd></div>
              <div><dt className="text-ink/50">Booked value</dt><dd className="font-display text-2xl font-bold">{formatPrice(revenue, 'en')}</dd></div>
            </dl>
          </Panel>
        </div>
      </div>
    </>
  );
}
