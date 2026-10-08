import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Table = ({ children, testId }: { children: ReactNode; testId?: string }) => (
  <div className="overflow-x-auto border border-navy-100 bg-white">
    <table data-testid={testId} className="w-full min-w-[640px] border-collapse text-sm">{children}</table>
  </div>
);
export const THead = ({ children }: { children: ReactNode }) => <thead className="bg-navy-50 text-left text-xs uppercase tracking-wide text-navy-600"><tr>{children}</tr></thead>;
export const Th = ({ className, ...p }: ThHTMLAttributes<HTMLTableCellElement>) => <th className={cn('whitespace-nowrap px-4 py-2.5 font-semibold', className)} {...p} />;
export const Tr = ({ children, className, onClick, testId }: { children: ReactNode; className?: string; onClick?: () => void; testId?: string }) => (
  <tr data-testid={testId} onClick={onClick} className={cn('border-t border-navy-100', onClick && 'cursor-pointer hover:bg-navy-50/60', className)}>{children}</tr>
);
export const Td = ({ className, ...p }: TdHTMLAttributes<HTMLTableCellElement>) => <td className={cn('px-4 py-3 align-middle text-ink/85', className)} {...p} />;
