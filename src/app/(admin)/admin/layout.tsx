import { Suspense, type ReactNode } from 'react';
import type { Metadata } from 'next';
import '../../globals.css';
import { fontVars } from '@/lib/fonts';
import { AdminProvider } from '@/components/admin/AdminProvider';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata: Metadata = { title: 'Admin | Noordlijn Touringcars', robots: { index: false } };
export const instant = false;

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body className="font-sans">
        <Suspense fallback={<div className="p-10 text-center">Loading admin...</div>}>
          <AdminProvider><AdminShell>{children}</AdminShell></AdminProvider>
        </Suspense>
      </body>
    </html>
  );
}
