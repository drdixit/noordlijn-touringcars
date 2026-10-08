import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../../globals.css';
import { fontVars } from '@/lib/fonts';
import { AdminProvider } from '@/components/admin/AdminProvider';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata: Metadata = { title: 'Admin | Noordlijn Touringcars', robots: { index: false } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body className="font-sans">
        <AdminProvider><AdminShell>{children}</AdminShell></AdminProvider>
      </body>
    </html>
  );
}
