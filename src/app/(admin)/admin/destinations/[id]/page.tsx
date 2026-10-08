'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { EmptyState } from '@/components/ui/empty-state';
import { useAdmin } from '@/components/admin/AdminProvider';
import { DestinationForm, newDestination } from '@/components/admin/DestinationForm';

export default function DestinationEditPage() {
  const { id } = useParams<{ id: string }>();
  const { destinations } = useAdmin();
  const isNew = id === 'new';
  const item = useMemo(() => (isNew ? newDestination() : destinations.find((d) => d.id === id)), [isNew, id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!item) return <EmptyState title="Destination not found" action={<Link href="/admin/destinations" className="font-semibold underline">Back to destinations</Link>} />;
  return <DestinationForm key={item.id} initial={item} isNew={isNew} />;
}
