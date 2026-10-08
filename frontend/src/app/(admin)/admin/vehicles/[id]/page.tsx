'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAdmin } from '@/components/admin/AdminProvider';
import { VehicleForm, newVehicle } from '@/components/admin/VehicleForm';

export default function VehicleEditPage() {
  const { id } = useParams<{ id: string }>();
  const { vehicles } = useAdmin();
  const isNew = id === 'new';
  const item = useMemo(() => (isNew ? newVehicle() : vehicles.find((v) => v.id === id)), [isNew, id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!item) return <EmptyState title="Vehicle not found" action={<Link href="/admin/vehicles" className="font-semibold underline">Back to vehicles</Link>} />;
  return <VehicleForm key={item.id} initial={item} isNew={isNew} />;
}
