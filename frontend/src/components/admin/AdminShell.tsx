'use client';
import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bus, ExternalLink, FileText, Gauge, Layers, LayoutList, Map, Menu, MessageSquareQuote, Tags, Users, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/site/Logo';
import { useAdmin } from './AdminProvider';

const nav = [
  { href: '/admin', label: 'Dashboard', icon: Gauge },
  { href: '/admin/quotes', label: 'Quotes', icon: MessageSquareQuote },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/vehicles', label: 'Vehicles', icon: Bus },
  { href: '/admin/pricing', label: 'Pricing', icon: Tags },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/destinations', label: 'Destinations', icon: Map },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/content', label: 'Content', icon: LayoutList },
];

const NavList = ({ onNav }: { onNav?: () => void }) => {
  const path = usePathname() || '';
  const { quotes } = useAdmin();
  const newCount = quotes.filter((q) => q.status === 'new').length;
  return (
    <nav className="flex flex-col gap-0.5 p-3">
      {nav.map(({ href, label, icon: I }) => {
        const active = href === '/admin' ? path === '/admin' : path.startsWith(href);
        return (
          <Link key={href} href={href} onClick={onNav} data-testid={`admin-nav-${label.toLowerCase()}`}
            className={cn('flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors', active ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white')}>
            <I className="h-4 w-4" />{label}
            {label === 'Quotes' && newCount > 0 && <span className="ml-auto rounded bg-signal-500 px-1.5 text-xs font-semibold text-white" data-testid="admin-nav-new-count">{newCount}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export const AdminShell = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col bg-navy-950 lg:flex" data-testid="admin-sidebar">
        <div className="border-b border-white/10 px-5 py-4"><Logo href="/admin" light sub="Admin" /></div>
        <NavList />
        <Link href="/nl" target="_blank" className="mt-auto flex items-center gap-2 border-t border-white/10 px-6 py-4 text-sm text-white/60 hover:text-white" data-testid="admin-view-site"><ExternalLink className="h-4 w-4" />View website</Link>
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 bg-navy-950/50 lg:hidden" onClick={() => setOpen(false)}>
          <aside className="h-full w-64 bg-navy-950" onClick={(e) => e.stopPropagation()} data-testid="admin-mobile-sidebar">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><Logo href="/admin" light sub="Admin" /><button onClick={() => setOpen(false)} aria-label="Close" className="text-white"><X className="h-5 w-5" /></button></div>
            <NavList onNav={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-navy-100 bg-white px-4 sm:px-6">
          <button className="text-navy-900 lg:hidden" onClick={() => setOpen(true)} aria-label="Menu" data-testid="admin-menu-toggle"><Menu className="h-5 w-5" /></button>
          <p className="hidden text-sm text-ink/50 sm:block">Demo mode · changes are kept until you refresh</p>
          <div className="flex items-center gap-3 text-sm"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-100 font-semibold text-navy-800">SV</span><span className="hidden font-medium sm:inline">Sanne de Vries</span></div>
        </header>
        <main className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};
