'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CustomerStatus } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { CustomerStatusBadge } from '@/components/ui/custom-badge';
import { Table, THead, Th, Td, Tr } from '@/components/ui/custom-table';
import { EmptyState } from '@/components/ui/empty-state';
import { FilterTabs, PageHeader, SearchBox } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

export default function AdminCustomers() {
  const { customers, quotes } = useAdmin();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<CustomerStatus | ''>('');
  const rows = useMemo(() => customers.map((c) => {
    const cq = quotes.filter((x) => x.customerId === c.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return { c, count: cq.length, last: cq[0]?.createdAt };
  }).filter(({ c }) => (!status || c.status === status) && `${c.name} ${c.company} ${c.email}`.toLowerCase().includes(q.toLowerCase())), [customers, quotes, q, status]);
  return (
    <>
      <PageHeader title="Customers & leads" sub={`${customers.length} contacts`} />
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <FilterTabs testId="customer-status-filter" value={status} onChange={setStatus} options={[{ value: '' as const, label: 'All' }, { value: 'lead' as const, label: 'Leads' }, { value: 'active' as const, label: 'Active' }, { value: 'inactive' as const, label: 'Inactive' }]} />
        <SearchBox value={q} onChange={setQ} placeholder="Search name, company, email…" testId="customer-search" />
      </div>
      {rows.length ? (
        <Table testId="customers-table">
          <THead><Th>Name</Th><Th>Company</Th><Th>Email</Th><Th>Phone</Th><Th className="text-right">Requests</Th><Th>Last request</Th><Th>Status</Th></THead>
          <tbody>
            {rows.map(({ c, count, last }) => (
              <Tr key={c.id} onClick={() => router.push(`/admin/customers/${c.id}`)} testId={`customer-row-${c.id}`}>
                <Td className="font-semibold text-navy-900">{c.name}</Td><Td>{c.company || '—'}</Td><Td>{c.email}</Td><Td className="whitespace-nowrap">{c.phone}</Td>
                <Td className="text-right">{count}</Td><Td className="whitespace-nowrap">{last ? formatDate(last, 'en', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</Td>
                <Td><CustomerStatusBadge status={c.status} /></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : <EmptyState title="No customers found" />}
    </>
  );
}
