'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import type { Destination } from '@/lib/types';
import { Button, ButtonLink } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/custom-modal';
import { Table, THead, Th, Td, Tr } from '@/components/ui/custom-table';
import { EmptyState } from '@/components/ui/empty-state';
import { PageHeader, SearchBox } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

export default function AdminDestinations() {
  const { destinations, remove, toast } = useAdmin();
  const [q, setQ] = useState('');
  const [del, setDel] = useState<Destination | null>(null);
  const list = useMemo(() => destinations.filter((d) => `${d.name.en} ${d.name.nl} ${d.country.en}`.toLowerCase().includes(q.toLowerCase())), [destinations, q]);
  return (
    <>
      <PageHeader title="Destinations" sub={`${destinations.length} destinations`} actions={<ButtonLink href="/admin/destinations/new" variant="secondary" size="sm" data-testid="add-destination-btn"><Plus className="h-4 w-4" />Add destination</ButtonLink>} />
      <div className="mb-4 flex justify-end"><SearchBox value={q} onChange={setQ} placeholder="Search destinations…" testId="destination-search" /></div>
      {list.length ? (
        <Table testId="destinations-table">
          <THead><Th>Destination</Th><Th>Country</Th><Th className="text-right">Distance</Th><Th className="text-right">Services</Th><Th className="text-right">Vehicles</Th><Th className="text-right">Posts</Th><Th /></THead>
          <tbody>
            {list.map((d) => (
              <Tr key={d.id} testId={`destination-row-${d.slug}`}>
                <Td>
                  <Link href={`/admin/destinations/${d.id}`} className="flex items-center gap-3 font-semibold text-navy-900 hover:underline" data-testid={`destination-edit-${d.slug}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {d.image ? <img src={d.image} alt="" className="h-10 w-14 object-cover" /> : <span className="h-10 w-14 bg-navy-100" />}{d.name.en}
                  </Link>
                </Td>
                <Td>{d.country.en}</Td><Td className="text-right">{d.distanceKm} km</Td>
                <Td className="text-right">{d.serviceIds.length}</Td><Td className="text-right">{d.vehicleIds.length}</Td><Td className="text-right">{d.blogIds.length}</Td>
                <Td className="text-right"><Button variant="ghost" size="sm" onClick={() => setDel(d)} aria-label="Delete" data-testid={`destination-delete-${d.slug}`}><Trash2 className="h-4 w-4 text-signal-600" /></Button></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : <EmptyState title="No destinations found" />}
      <ConfirmDialog open={!!del} onClose={() => setDel(null)} title="Delete destination?" text={`${del?.name.en} will be removed.`} onConfirm={() => { if (del) { remove('destinations', del.id); toast('Destination deleted'); } }} />
    </>
  );
}
