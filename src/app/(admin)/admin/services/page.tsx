'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import type { Service } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Button, ButtonLink } from '@/components/ui/button';
import { ActiveBadge } from '@/components/ui/custom-badge';
import { Toggle } from '@/components/ui/custom-form';
import { ConfirmDialog } from '@/components/ui/custom-modal';
import { Table, THead, Th, Td, Tr } from '@/components/ui/custom-table';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader, SearchBox } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

export default function AdminServices() {
  const { services, vehicles, upsert, remove, toast } = useAdmin();
  const [q, setQ] = useState('');
  const [del, setDel] = useState<Service | null>(null);
  const list = useMemo(() => services.filter((s) => `${s.title.en} ${s.title.nl}`.toLowerCase().includes(q.toLowerCase())), [services, q]);
  return (
    <>
      <PageHeader title="Services" sub={`${services.filter((s) => s.published).length} of ${services.length} published`} actions={<ButtonLink href="/admin/services/new" variant="secondary" size="sm" data-testid="add-service-btn"><Plus className="h-4 w-4" />Add service</ButtonLink>} />
      <div className="mb-4 flex justify-end"><SearchBox value={q} onChange={setQ} placeholder="Search services…" testId="service-search" /></div>
      {list.length ? (
        <Table testId="services-table">
          <THead><Th>Service</Th><Th>Vehicles</Th><Th className="text-right">From</Th><Th>Status</Th><Th>Published</Th><Th /></THead>
          <tbody>
            {list.map((s) => (
              <Tr key={s.id} testId={`service-row-${s.slug}`}>
                <Td>
                  <Link href={`/admin/services/${s.id}`} className="flex items-center gap-3 hover:underline" data-testid={`service-edit-${s.slug}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {s.image ? <img src={s.image} alt="" className="h-10 w-14 object-cover" /> : <span className="h-10 w-14 bg-navy-100" />}
                    <span><span className="block font-semibold text-navy-900">{s.title.en}</span><span className="text-xs text-ink/50">{s.title.nl}</span></span>
                  </Link>
                </Td>
                <Td className="max-w-[260px] truncate text-ink/65">{vehicles.filter((v) => s.vehicleIds.includes(v.id)).map((v) => v.name).join(', ')}</Td>
                <Td className="text-right">{formatPrice(s.startingPrice, 'en')}</Td>
                <Td><ActiveBadge active={s.published} on="Published" off="Unpublished" /></Td>
                <Td><Toggle checked={s.published} onChange={(p) => { upsert('services', { ...s, published: p }); toast(`${s.title.en} ${p ? 'published' : 'unpublished'}`); }} testId={`service-toggle-${s.slug}`} /></Td>
                <Td className="text-right"><Button variant="ghost" size="sm" onClick={() => setDel(s)} aria-label="Delete" data-testid={`service-delete-${s.slug}`}><Trash2 className="h-4 w-4 text-signal-600" /></Button></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : <EmptyState title="No services found" />}
      <ConfirmDialog open={!!del} onClose={() => setDel(null)} title="Delete service?" text={`${del?.title.en} will be removed.`} onConfirm={() => { if (del) { remove('services', del.id); toast('Service deleted'); } }} />
    </>
  );
}
