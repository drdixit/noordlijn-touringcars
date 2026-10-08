import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'bg-signal-500 text-white hover:bg-signal-600 active:bg-signal-700',
  secondary: 'bg-navy-900 text-white hover:bg-navy-800',
  outline: 'border border-navy-200 bg-white text-navy-900 hover:border-navy-400 hover:bg-navy-50',
  ghost: 'text-navy-800 hover:bg-navy-50',
  white: 'bg-white text-navy-900 hover:bg-navy-50',
  danger: 'bg-white border border-signal-100 text-signal-600 hover:bg-signal-50',
};
const sizes: Record<Size, string> = { sm: 'h-9 px-3 text-sm', md: 'h-11 px-5 text-[15px]', lg: 'h-12 px-6 text-base' };

export const btnClass = (variant: Variant = 'primary', size: Size = 'md', extra = '') =>
  cn('inline-flex items-center justify-center gap-2 rounded font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap', variants[variant], sizes[size], extra);

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size };

export const Button = ({ variant, size, className, type = 'button', ...rest }: BtnProps) => (
  <button type={type} className={btnClass(variant, size, className)} {...rest} />
);

export const ButtonLink = ({ href, variant, size, className, children, ...rest }: { href: string; variant?: Variant; size?: Size; className?: string; children: ReactNode; 'data-testid'?: string }) => (
  <Link href={href} className={btnClass(variant, size, className)} {...rest}>{children}</Link>
);
