'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { vehicleCategories } from '@/data/vehicles';
import { ButtonLink } from '@/components/ui/Button';
import { ActiveBadge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Form';
import { Table, THead, Th, Td, Tr } from '@/components/ui/Table';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterTabs, PageHeader, SearchBox } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

export default function AdminVehicles() {
  const { vehicles, upsert, toast } = useAdmin();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const list = useMemo(() => vehicles.filter((v) => (!cat || v.category === cat) && v.name.toLowerCase().includes(q.toLowerCase())), [vehicles, q, cat]);
  return (
    <>
      <PageHeader title="Vehicles" sub={`${vehicles.length} vehicles in the fleet`} actions={<ButtonLink href="/admin/vehicles/new" variant="secondary" size="sm" data-testid="add-vehicle-btn"><Plus className="h-4 w-4" />Add vehicle</ButtonLink>} />
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <FilterTabs testId="vehicle-category-filter" value={cat} onChange={setCat} options={[{ value: '', label: 'All' }, ...vehicleCategories.map((c) => ({ value: c.id as string, label: c.name.en, count: vehicles.filter((v) => v.category === c.id).length }))]} />
        <SearchBox value={q} onChange={setQ} placeholder="Search vehicles…" testId="vehicle-search" />
      </div>
      {list.length ? (
        <Table testId="vehicles-table">
          <THead><Th>Vehicle</Th><Th>Category</Th><Th className="text-right">Capacity</Th><Th className="text-right">From</Th><Th className="text-right">Per hour</Th><Th className="text-right">Per km</Th><Th>Status</Th><Th>Active</Th></THead>
          <tbody>
            {list.map((v) => (
              <Tr key={v.id} testId={`vehicle-row-${v.slug}`}>
                <Td>
                  <Link href={`/admin/vehicles/${v.id}`} className="flex items-center gap-3 font-semibold text-navy-900 hover:underline" data-testid={`vehicle-edit-${v.slug}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {v.images[0] ? <img src={v.images[0]} alt="" className="h-10 w-14 object-cover" /> : <span className="h-10 w-14 bg-navy-100" />}{v.name}
                  </Link>
                </Td>
                <Td>{vehicleCategories.find((c) => c.id === v.category)?.name.en}</Td>
                <Td className="text-right">{v.capacity}</Td>
                <Td className="text-right">{formatPrice(v.pricing.startingPrice, 'en')}</Td>
                <Td className="text-right">{formatPrice(v.pricing.pricePerHour, 'en')}</Td>
                <Td className="text-right">{formatPrice(v.pricing.pricePerKm, 'en', 2)}</Td>
                <Td><ActiveBadge active={v.active} /></Td>
                <Td><Toggle checked={v.active} onChange={(a) => { upsert('vehicles', { ...v, active: a }); toast(`${v.name} ${a ? 'activated' : 'deactivated'}`); }} testId={`vehicle-toggle-${v.slug}`} /></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : <EmptyState title="No vehicles found" action={<ButtonLink href="/admin/vehicles/new" size="sm" variant="secondary">Add vehicle</ButtonLink>} />}
      <p className="mt-3 text-xs text-ink/45">Click a vehicle to edit details, images, features and pricing. <button className="underline" onClick={() => router.push('/admin/pricing')}>Bulk edit prices</button></p>
    </>
  );
}
