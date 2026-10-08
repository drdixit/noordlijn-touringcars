'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { EmptyState } from '@/components/ui/empty-state';
import { useAdmin } from '@/components/admin/AdminProvider';
import { ServiceForm, newService } from '@/components/admin/ServiceForm';

export default function ServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const { services } = useAdmin();
  const isNew = id === 'new';
  const item = useMemo(() => (isNew ? newService() : services.find((s) => s.id === id)), [isNew, id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!item) return <EmptyState title="Service not found" action={<Link href="/admin/services" className="font-semibold underline">Back to services</Link>} />;
  return <ServiceForm key={item.id} initial={item} isNew={isNew} />;
}
