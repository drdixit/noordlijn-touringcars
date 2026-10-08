'use client';
import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Field, Input, Textarea } from '@/components/ui/Form';

export const ContactForm = ({ lang }: { lang: Lang }) => {
  const d = getDict(lang);
  const f = d.form;
  const [v, setV] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((p) => ({ ...p, [k]: e.target.value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!v.name.trim()) x.name = f.errRequired;
    if (!/^\S+@\S+\.\S+$/.test(v.email)) x.email = v.email ? f.errEmail : f.errRequired;
    if (!v.subject.trim()) x.subject = f.errRequired;
    if (!v.message.trim()) x.message = f.errRequired;
    setErr(x);
    if (!Object.keys(x).length) setSent(true);
  };
  if (sent) return (
    <div className="flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-5 text-emerald-900" role="status" data-testid="contact-success">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /><p>{d.contact.sent}</p>
    </div>
  );
  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2" data-testid="contact-form">
      <Field label={f.name} htmlFor="c-name" error={err.name}><Input id="c-name" autoComplete="name" value={v.name} onChange={set('name')} error={err.name} data-testid="contact-name" /></Field>
      <Field label={f.email} htmlFor="c-email" error={err.email}><Input id="c-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} error={err.email} data-testid="contact-email" /></Field>
      <Field label={f.phone} htmlFor="c-phone" hint={d.common.optional}><Input id="c-phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} data-testid="contact-phone" /></Field>
      <Field label={f.subject} htmlFor="c-subject" error={err.subject}><Input id="c-subject" value={v.subject} onChange={set('subject')} error={err.subject} data-testid="contact-subject" /></Field>
      <Field label={f.message} htmlFor="c-message" error={err.message} className="sm:col-span-2"><Textarea id="c-message" rows={5} value={v.message} onChange={set('message')} error={err.message} data-testid="contact-message" /></Field>
      <div className="sm:col-span-2"><Button type="submit" size="lg" data-testid="contact-submit">{f.send}</Button></div>
    </form>
  );
};
