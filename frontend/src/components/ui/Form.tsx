import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const base = 'w-full rounded border bg-white px-3 text-[15px] text-ink placeholder:text-ink/40 transition-colors focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-100 disabled:bg-navy-50';
const state = (err?: string) => (err ? 'border-signal-500' : 'border-navy-200 hover:border-navy-300');

export const Label = ({ htmlFor, children, hint }: { htmlFor?: string; children: ReactNode; hint?: string }) => (
  <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-navy-900">
    <span>{children}</span>
    {hint && <span className="text-xs font-normal text-ink/50">{hint}</span>}
  </label>
);

export const FieldError = ({ error, id }: { error?: string; id?: string }) =>
  error ? <p id={id} role="alert" className="mt-1.5 text-sm text-signal-600">{error}</p> : null;

export const Field = ({ label, htmlFor, error, hint, children, className }: { label: string; htmlFor?: string; error?: string; hint?: string; children: ReactNode; className?: string }) => (
  <div className={className}>
    <Label htmlFor={htmlFor} hint={hint}>{label}</Label>
    {children}
    <FieldError error={error} id={htmlFor ? `${htmlFor}-error` : undefined} />
  </div>
);

export const Input = ({ error, className, ...rest }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) => (
  <input aria-invalid={!!error} className={cn(base, 'h-11', state(error), className)} {...rest} />
);

export const Textarea = ({ error, className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) => (
  <textarea aria-invalid={!!error} className={cn(base, 'min-h-[110px] py-2.5', state(error), className)} {...rest} />
);

export const Select = ({ error, className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) => (
  <select aria-invalid={!!error} className={cn(base, 'h-11 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23263B5A%27 stroke-width=%272.5%27%3E%3Cpath d=%27m6 9 6 6 6-6%27/%3E%3C/svg%3E")] bg-[length:12px] bg-[right_12px_center] bg-no-repeat pr-9', state(error), className)} {...rest}>
    {children}
  </select>
);

export const Checkbox = ({ label, description, checked, onChange, testId }: { label: string; description?: string; checked: boolean; onChange: (v: boolean) => void; testId?: string }) => (
  <label className={cn('flex cursor-pointer items-start gap-3 rounded border p-3.5 transition-colors', checked ? 'border-navy-700 bg-navy-50' : 'border-navy-200 hover:border-navy-300')}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} data-testid={testId} className="mt-0.5 h-5 w-5 shrink-0 accent-navy-800" />
    <span>
      <span className="block text-[15px] font-semibold text-navy-900">{label}</span>
      {description && <span className="mt-0.5 block text-sm text-ink/60">{description}</span>}
    </span>
  </label>
);

export const Toggle = ({ checked, onChange, label, testId }: { checked: boolean; onChange: (v: boolean) => void; label?: string; testId?: string }) => (
  <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} data-testid={testId} className="inline-flex items-center gap-2 text-sm">
    <span className={cn('relative h-5 w-9 rounded-full transition-colors', checked ? 'bg-emerald-600' : 'bg-navy-200')}>
      <span className={cn('absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform', checked ? 'translate-x-4' : 'translate-x-0.5')} />
    </span>
    {label && <span className="text-ink/80">{label}</span>}
  </button>
);
