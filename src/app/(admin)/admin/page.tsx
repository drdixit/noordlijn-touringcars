'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate, formatPrice } from '@/lib/utils';
import { computeQuote } from '@/lib/quoteMath';
import { QuoteStatusBadge } from '@/components/ui/custom-badge';
import { PageHeader, Panel, StatCard } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';
import { Table, THead, Th, Td, Tr } from '@/components/ui/custom-table';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { quotes, vehicles, services, posts, customers, pricing } = useAdmin();
  const router = useRouter();
  const [todayDate, setTodayDate] = useState<string>('');
  
  useEffect(() => {
    setTodayDate(new Date().toISOString());
  }, []);
  
  const by = (s: string[]) => quotes.filter((q) => s.includes(q.status)).length;
  const pipeline = quotes.filter((q) => ['quoted', 'accepted'].includes(q.status)).reduce((s, q) => s + computeQuote(q, pricing).total, 0);
  const upcoming = quotes.filter((q) => q.status === 'confirmed').sort((a, b) => a.departureDate.localeCompare(b.departureDate));
  const cust = (id: string) => customers.find((c) => c.id === id);
  return (
    <>
      <PageHeader title="Dashboard" sub={todayDate ? `Overview for ${formatDate(todayDate, 'en')}` : 'Overview'} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4" data-testid="dashboard-stats">
        <StatCard label="New quote requests" value={by(['new'])} sub="Waiting for first contact" href="/admin/quotes?status=new" testId="stat-new-quotes" />
        <StatCard label="Pending quotes" value={by(['contacted', 'quoted', 'accepted'])} sub={`${formatPrice(pipeline, 'en')} in open quotes`} href="/admin/quotes" testId="stat-pending-quotes" />
        <StatCard label="Confirmed bookings" value={by(['confirmed'])} sub="Upcoming trips" href="/admin/quotes?status=confirmed" testId="stat-confirmed" />
        <StatCard label="Customers" value={customers.length} sub={`${customers.filter((c) => c.status === 'lead').length} new leads`} href="/admin/customers" testId="stat-customers" />
        <StatCard label="Total vehicles" value={vehicles.length} sub={`${vehicles.filter((v) => v.active).length} active`} href="/admin/vehicles" testId="stat-vehicles" />
        <StatCard label="Active services" value={services.filter((s) => s.published).length} sub={`of ${services.length}`} href="/admin/services" testId="stat-services" />
        <StatCard label="Blog posts" value={posts.length} sub={`${posts.filter((p) => p.status === 'published').length} published`} href="/admin/blog" testId="stat-posts" />
        <StatCard label="Completed trips" value={by(['completed'])} sub="This year" testId="stat-completed" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Panel title="Latest quote requests" actions={<Link href="/admin/quotes" className="text-sm font-semibold text-navy-700 hover:underline">View all</Link>} className="[&>div]:p-0" testId="dashboard-latest-quotes">
          <Table>
            <THead><Th>Quote</Th><Th>Customer</Th><Th>Trip</Th><Th>Date</Th><Th>Status</Th></THead>
            <tbody>
              {quotes.slice(0, 6).map((q) => (
                <Tr key={q.id} onClick={() => router.push(`/admin/quotes/${q.id}`)} testId={`dashboard-quote-${q.id}`}>
                  <Td className="font-semibold text-navy-900">{q.id}</Td><Td>{cust(q.customerId)?.name}</Td>
                  <Td className="max-w-[220px] truncate">{q.pickup} → {q.destination}</Td><Td className="whitespace-nowrap">{formatDate(q.departureDate, 'en', { day: 'numeric', month: 'short', year: 'numeric' })}</Td>
                  <Td><QuoteStatusBadge status={q.status} /></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Panel>
        <Panel title="Upcoming confirmed trips" testId="dashboard-upcoming">
          <ul className="divide-y divide-navy-100">
            {upcoming.map((q) => (
              <li key={q.id} className="py-3 first:pt-0 last:pb-0">
                <Link href={`/admin/quotes/${q.id}`} className="block hover:text-signal-600">
                  <p className="text-sm font-semibold text-navy-900">{q.pickup} → {q.destination}</p>
                  <p className="text-xs text-ink/55">{formatDate(q.departureDate, 'en')} · {q.passengers} pax · {vehicles.find((v) => v.id === q.vehicleId)?.name ?? 'No vehicle'}</p>
                </Link>
              </li>
            ))}
            {!upcoming.length && <li className="text-sm text-ink/55">No confirmed trips.</li>}
          </ul>
        </Panel>
      </div>
    </>
  );
}
