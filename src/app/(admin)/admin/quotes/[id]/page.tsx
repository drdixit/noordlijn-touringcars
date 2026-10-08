'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Mail, Phone, Plus, Send, Trash2 } from 'lucide-react';
import type { Quote, QuoteAdjustment, QuoteStatus } from '@/lib/types';
import { formatDate, formatPrice, uid } from '@/lib/utils';
import { computeQuote, isWeekend } from '@/lib/quoteMath';
import { QUOTE_STATUSES, QuoteStatusBadge, statusLabel } from '@/components/ui/custom-badge';
import { Button } from '@/components/ui/button';
import { Field, Input, Select, Textarea } from '@/components/ui/custom-form';
import { Modal } from '@/components/ui/custom-modal';
import { EmptyState } from '@/components/ui/empty-state';
import { CheckList, PageHeader, Panel } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

const dt = (d: string, t: string) => (d ? `${formatDate(d, 'en', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}${t ? ` · ${t}` : ''}` : '—');

export default function QuoteDetail() {
  const { id } = useParams<{ id: string }>();
  const { quotes, customers, vehicles, services, pricing, upsert, toast } = useAdmin();
  const quote = quotes.find((q) => q.id === decodeURIComponent(id));
  const [adj, setAdj] = useState<null | 'charge' | 'discount'>(null);
  const [adjForm, setAdjForm] = useState({ label: '', amount: '', percent: '' });
  const [note, setNote] = useState('');
  const [sendOpen, setSendOpen] = useState(false);
  if (!quote) return <EmptyState title="Quote not found" action={<Link href="/admin/quotes" className="font-semibold underline">Back to quotes</Link>} />;

  const c = customers.find((x) => x.id === quote.customerId);
  const service = services.find((s) => s.id === quote.serviceId);
  const { lines, total, days } = computeQuote(quote, pricing);
  const save = (patch: Partial<Quote>, msg?: string) => { upsert('quotes', { ...quote, ...patch }); if (msg) toast(msg); };
  const vehicle = vehicles.find((v) => v.id === quote.vehicleId);

  const addAdjustment = () => {
    if (!adj) return;
    const pct = Number(adjForm.percent);
    const amount = pct ? (quote.basePrice * pct) / 100 : Number(adjForm.amount);
    if (!adjForm.label.trim() || !amount) return;
    const a: QuoteAdjustment = { id: uid('a'), type: adj, label: adjForm.label + (pct ? ` (${pct}%)` : ''), amount: Math.round(amount * 100) / 100 };
    save({ adjustments: [...quote.adjustments, a] }, adj === 'charge' ? 'Extra charge added' : 'Discount added');
    setAdj(null); setAdjForm({ label: '', amount: '', percent: '' });
  };

  return (
    <>
      <PageHeader title={quote.id} back="/admin/quotes" sub={`Created ${formatDate(quote.createdAt, 'en')} · ${service?.title.en ?? ''}`}
        actions={<><QuoteStatusBadge status={quote.status} /><Button size="sm" onClick={() => setSendOpen(true)} data-testid="send-quote-btn"><Send className="h-4 w-4" />Send quote</Button></>} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          <Panel title="Trip" testId="quote-trip-panel">
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              {[['Pickup', quote.pickup], ['Destination', quote.destination], ['Departure', dt(quote.departureDate, quote.departureTime)], ['Return', quote.returnDate ? dt(quote.returnDate, quote.returnTime) : 'One way'], ['Passengers', String(quote.passengers)], ['Service', service?.title.en], ['Duration', `${days} day${days > 1 ? 's' : ''}`], ['Weekend', quote.departureDate && isWeekend(quote.departureDate) ? 'Yes (surcharge applies)' : 'No']].map(([k, v]) => (
                <div key={k}><dt className="text-ink/50">{k}</dt><dd className="mt-0.5 font-medium text-navy-900">{v || '—'}</dd></div>
              ))}
            </dl>
            {quote.message && <div className="mt-5 border-l-2 border-navy-200 bg-navy-50 p-3 text-sm text-ink/80"><p className="mb-1 text-xs font-semibold uppercase text-ink/50">Customer message</p><p className="whitespace-pre-line">{quote.message}</p></div>}
          </Panel>

          <Panel title="Vehicle and extras" testId="quote-vehicle-panel">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Assigned vehicle" htmlFor="assign-vehicle">
                <Select id="assign-vehicle" value={quote.vehicleId ?? ''} data-testid="assign-vehicle-select"
                  onChange={(e) => { const v = vehicles.find((x) => x.id === e.target.value); save({ vehicleId: e.target.value || null, basePrice: v ? Math.max(quote.basePrice, v.pricing.startingPrice) : quote.basePrice }, v ? `${v.name} assigned` : 'Vehicle unassigned'); }}>
                  <option value="">Not assigned</option>
                  {vehicles.filter((v) => v.active).map((v) => <option key={v.id} value={v.id}>{v.name} ({v.capacity} seats){v.capacity < quote.passengers ? ' – too small' : ''}</option>)}
                </Select>
              </Field>
              <Field label="Base price (€)" htmlFor="base-price">
                <Input id="base-price" type="number" min={0} value={quote.basePrice} onChange={(e) => save({ basePrice: Number(e.target.value) })} data-testid="base-price-input" />
              </Field>
            </div>
            {vehicle && <p className="mt-2 text-xs text-ink/55">Rates: {formatPrice(vehicle.pricing.pricePerHour, 'en')}/hour · {formatPrice(vehicle.pricing.pricePerKm, 'en', 2)}/km · from {formatPrice(vehicle.pricing.startingPrice, 'en')}</p>}
            {vehicle && vehicle.capacity < quote.passengers && <p className="mt-2 text-sm font-medium text-signal-600" data-testid="capacity-warning">Capacity {vehicle.capacity} is below {quote.passengers} passengers. Consider a larger or second vehicle.</p>}
            <div className="mt-5"><CheckList label="Extras" testId="quote-extras" options={pricing.extras.map((x) => ({ id: x.id, label: x.name.en }))} value={quote.extraIds} onChange={(v) => save({ extraIds: v })} /></div>
          </Panel>

          <Panel title="Internal notes" testId="quote-notes-panel">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for your colleagues…" className="min-h-[44px] sm:min-h-[70px]" data-testid="quote-note-input" />
              <Button variant="secondary" size="sm" className="sm:self-end" disabled={!note.trim()} data-testid="quote-note-add"
                onClick={() => { save({ notes: [{ id: uid('n'), text: note.trim(), author: 'Sanne', date: new Date().toISOString() }, ...quote.notes] }, 'Note added'); setNote(''); }}>Add note</Button>
            </div>
            <ul className="mt-4 space-y-3" data-testid="quote-notes-list">
              {quote.notes.map((n) => <li key={n.id} className="border-l-2 border-signal-500 pl-3 text-sm"><p className="text-ink/85">{n.text}</p><p className="mt-0.5 text-xs text-ink/45">{n.author} · {formatDate(n.date, 'en', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p></li>)}
              {!quote.notes.length && <li className="text-sm text-ink/45">No notes yet.</li>}
            </ul>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Status" testId="quote-status-panel">
            <Select value={quote.status} onChange={(e) => save({ status: e.target.value as QuoteStatus }, `Status changed to ${statusLabel(e.target.value)}`)} data-testid="quote-status-select">
              {QUOTE_STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
            </Select>
          </Panel>
          <Panel title="Pricing" testId="quote-pricing-panel">
            <ul className="space-y-2 text-sm">
              {lines.map((l, i) => {
                const a = l.label !== 'Base price' ? quote.adjustments.find((x) => x.label === l.label) : undefined;
                return (
                  <li key={i} className="flex items-center justify-between gap-3">
                    <span className="text-ink/70">{l.label}</span>
                    <span className="flex items-center gap-2"><span className={l.amount < 0 ? 'text-emerald-700' : 'text-navy-900'}>{formatPrice(l.amount, 'en', 2)}</span>
                      {a && <button type="button" aria-label="Remove" onClick={() => save({ adjustments: quote.adjustments.filter((x) => x.id !== a.id) })} className="text-ink/30 hover:text-signal-600"><Trash2 className="h-3.5 w-3.5" /></button>}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-end justify-between border-t border-navy-100 pt-4"><span className="text-sm font-semibold">Total excl. VAT</span><span className="font-display text-2xl font-bold text-navy-900" data-testid="quote-total">{formatPrice(total, 'en', 2)}</span></div>
            <p className="mt-1 text-right text-xs text-ink/50">incl. 9% VAT: {formatPrice(total * 1.09, 'en', 2)}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => setAdj('charge')} data-testid="add-charge-btn"><Plus className="h-4 w-4" />Extra charge</Button>
              <Button variant="outline" size="sm" onClick={() => setAdj('discount')} data-testid="add-discount-btn"><Plus className="h-4 w-4" />Discount</Button>
            </div>
          </Panel>
          <Panel title="Customer" testId="quote-customer-panel">
            {c ? (
              <div className="text-sm">
                <Link href={`/admin/customers/${c.id}`} className="font-semibold text-navy-900 hover:underline">{c.name}</Link>
                {c.company && <p className="text-ink/60">{c.company}</p>}
                <p className="mt-3 flex items-center gap-2"><Mail className="h-4 w-4 text-ink/40" /><a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a></p>
                <p className="mt-1 flex items-center gap-2"><Phone className="h-4 w-4 text-ink/40" /><a href={`tel:${c.phone}`} className="hover:underline">{c.phone}</a></p>
              </div>
            ) : <p className="text-sm text-ink/50">Unknown customer</p>}
          </Panel>
        </div>
      </div>

      <Modal open={!!adj} onClose={() => setAdj(null)} title={adj === 'charge' ? 'Add extra charge' : 'Add discount'} testId="adjustment-modal"
        footer={<><Button variant="outline" size="sm" onClick={() => setAdj(null)}>Cancel</Button><Button variant="secondary" size="sm" onClick={addAdjustment} data-testid="adjustment-save">Add</Button></>}>
        <div className="grid gap-4">
          {adj === 'discount' && (
            <Field label="Preset" htmlFor="adj-preset">
              <Select id="adj-preset" defaultValue="" data-testid="adjustment-preset" onChange={(e) => { const p = pricing.discounts.find((x) => x.id === e.target.value); if (p) setAdjForm({ label: p.name.en, amount: p.type === 'fixed' ? String(p.value) : '', percent: p.type === 'percent' ? String(p.value) : '' }); }}>
                <option value="">Custom</option>
                {pricing.discounts.filter((x) => x.active).map((x) => <option key={x.id} value={x.id}>{x.name.en} ({x.type === 'percent' ? `${x.value}%` : formatPrice(x.value, 'en')})</option>)}
              </Select>
            </Field>
          )}
          <Field label="Description" htmlFor="adj-label"><Input id="adj-label" value={adjForm.label} onChange={(e) => setAdjForm({ ...adjForm, label: e.target.value })} placeholder={adj === 'charge' ? 'E.g. Parking Paris' : 'E.g. Loyalty discount'} data-testid="adjustment-label" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Amount (€)" htmlFor="adj-amount"><Input id="adj-amount" type="number" min={0} value={adjForm.amount} onChange={(e) => setAdjForm({ ...adjForm, amount: e.target.value, percent: '' })} data-testid="adjustment-amount" /></Field>
            <Field label="or % of base" htmlFor="adj-pct"><Input id="adj-pct" type="number" min={0} value={adjForm.percent} onChange={(e) => setAdjForm({ ...adjForm, percent: e.target.value, amount: '' })} data-testid="adjustment-percent" /></Field>
          </div>
        </div>
      </Modal>

      <Modal open={sendOpen} onClose={() => setSendOpen(false)} title="Send quote to customer" testId="send-quote-modal"
        footer={<><Button variant="outline" size="sm" onClick={() => setSendOpen(false)}>Cancel</Button><Button size="sm" data-testid="send-quote-confirm" onClick={() => { save({ status: quote.status === 'new' || quote.status === 'contacted' ? 'quoted' : quote.status, notes: [{ id: uid('n'), text: `Quote sent to ${c?.email} for ${formatPrice(total, 'en', 2)}`, author: 'System', date: new Date().toISOString() }, ...quote.notes] }, `Quote sent to ${c?.email} (demo)`); setSendOpen(false); }}><Send className="h-4 w-4" />Send</Button></>}>
        <div className="space-y-2 text-sm">
          <p><span className="text-ink/50">To:</span> {c?.name} &lt;{c?.email}&gt;</p>
          <p><span className="text-ink/50">Subject:</span> Your quote {quote.id} – {quote.pickup} → {quote.destination}</p>
          <div className="mt-3 border border-navy-100 bg-navy-50 p-3 text-ink/80">
            Dear {c?.name?.split(' ')[0]}, thank you for your request. For {quote.passengers} passengers on {dt(quote.departureDate, quote.departureTime)}{vehicle ? ` with our ${vehicle.name}` : ''}, the total price is <strong>{formatPrice(total, 'en', 2)}</strong> excl. VAT.
          </div>
          <p className="text-xs text-ink/50">Email sending is simulated in this demo.</p>
        </div>
      </Modal>
    </>
  );
}
