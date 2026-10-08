'use client';
import { useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Users, Sparkles, Lock } from 'lucide-react';
import type { Extra, Lang } from '@/lib/types';
import { cn, formatDate, formatPrice, getDict, href, t } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '@/components/ui/Form';
import { QuoteSummary } from '@/components/ui/QuoteSummary';

export type QuoteVehicle = { id: string; slug: string; name: string; capacity: number; image: string; startingPrice: number };
export type QuoteService = { id: string; slug: string; title: string; startingPrice: number };
export type QuoteInitial = { pickup: string; destination: string; passengers: string; date: string; time: string; returnDate: string; returnTime: string; serviceId: string; vehicleId: string };
export const QUOTE_STORAGE_KEY = 'noordlijn-demo-quotes';

type Errors = Record<string, string>;

const StepShell = ({ title, children }: { title: string; children: ReactNode }) => (
  <div><h2 className="mb-6 text-2xl font-bold sm:text-3xl">{title}</h2>{children}</div>
);

export const QuoteFlow = ({ lang, services, vehicles, extras, initial }: { lang: Lang; services: QuoteService[]; vehicles: QuoteVehicle[]; extras: Extra[]; initial: QuoteInitial }) => {
  const D = getDict(lang);
  const d = D.quote;
  const f = D.form;
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [trip, setTrip] = useState({ pickup: initial.pickup, destination: initial.destination, passengers: initial.passengers, date: initial.date, time: initial.time, returnDate: initial.returnDate, returnTime: initial.returnTime });
  const [serviceId, setServiceId] = useState(initial.serviceId);
  const [vehicleId, setVehicleId] = useState(initial.vehicleId);
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [additional, setAdditional] = useState('');
  const [contact, setContact] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const pax = Number(trip.passengers) || 0;
  const today = new Date().toISOString().slice(0, 10);
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const service = services.find((s) => s.id === serviceId);
  const recommended = useMemo(() => vehicles.filter((v) => v.capacity >= pax).sort((a, b) => a.capacity - b.capacity)[0], [vehicles, pax]);
  const indicative = (vehicle ?? recommended)?.startingPrice ?? service?.startingPrice;

  const validate = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (!trip.pickup.trim()) e.pickup = f.errRequired;
      if (!trip.destination.trim()) e.destination = f.errRequired;
      if (!pax || pax < 1 || pax > 500) e.passengers = f.errPassengers;
      if (!trip.date) e.date = f.errRequired; else if (trip.date < today) e.date = f.errDate;
      if (!trip.time) e.time = f.errRequired;
      if (trip.returnDate && trip.date && trip.returnDate < trip.date) e.returnDate = f.errReturn;
    }
    if (s === 1 && !serviceId) e.serviceId = d.chooseServiceErr;
    if (s === 3) {
      if (!contact.name.trim()) e.name = f.errRequired;
      if (!/^\S+@\S+\.\S+$/.test(contact.email)) e.email = contact.email ? f.errEmail : f.errRequired;
      if (!contact.phone.trim()) e.phone = f.errRequired; else if (!/^[+\d][\d\s()-]{7,}$/.test(contact.phone)) e.phone = f.errPhone;
    }
    return e;
  };

  const goTo = (s: number) => { setStep(s); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const next = () => {
    const e = validate(step);
    setErrors(e);
    if (Object.keys(e).length === 0) goTo(step + 1);
  };

  const submit = () => {
    setSending(true);
    const ref = `Q-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      const prev = JSON.parse(sessionStorage.getItem(QUOTE_STORAGE_KEY) || '[]');
      sessionStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify([{ ref, trip, serviceId, vehicleId, extraIds, additional, contact, indicative: indicative ?? 0, createdAt: today }, ...prev]));
    } catch { /* storage unavailable */ }
    setTimeout(() => router.push(`${href(lang, '/quote/success')}?ref=${ref}`), 700);
  };

  const setT = (k: keyof typeof trip) => (e: { target: { value: string } }) => setTrip((p) => ({ ...p, [k]: e.target.value }));
  const setC = (k: keyof typeof contact) => (e: { target: { value: string } }) => setContact((p) => ({ ...p, [k]: e.target.value }));
  const unit = (x: Extra) => (x.unit === 'person' ? D.common.perPerson : x.unit === 'day' ? D.common.perDay : D.common.perTrip);
  const dateLine = (dt: string, tm: string) => (dt ? `${formatDate(dt, lang, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}${tm ? `, ${tm}` : ''}` : '');

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        {/* progress */}
        <div className="mb-8" data-testid="quote-progress">
          <p className="mb-2 text-sm font-semibold text-navy-700 sm:hidden">{D.common.next === 'Next' ? 'Step' : 'Stap'} {step + 1} / 5 · {d.steps[step]}</p>
          <div className="h-1.5 bg-navy-100 sm:hidden"><div className="h-full bg-signal-500 transition-all" style={{ width: `${((step + 1) / 5) * 100}%` }} /></div>
          <ol className="hidden grid-cols-5 gap-2 sm:grid">
            {d.steps.map((label, i) => (
              <li key={label} data-testid={`quote-step-indicator-${i + 1}`}>
                <button type="button" disabled={i > step} onClick={() => i < step && goTo(i)} className={cn('flex w-full flex-col gap-2 border-t-4 pt-3 text-left text-sm font-semibold', i < step ? 'border-navy-800 text-navy-800' : i === step ? 'border-signal-500 text-navy-900' : 'border-navy-100 text-ink/40')}>
                  <span className="flex items-center gap-2"><span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-xs', i < step ? 'bg-navy-800 text-white' : i === step ? 'bg-signal-500 text-white' : 'bg-navy-100 text-ink/50')}>{i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}</span>{label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="pb-28 sm:pb-0" data-testid={`quote-step-${step + 1}`}>
          {step === 0 && (
            <StepShell title={d.tripTitle}>
              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={f.pickup} htmlFor="q-pickup" error={errors.pickup}><Input id="q-pickup" value={trip.pickup} onChange={setT('pickup')} placeholder={f.pickupPh} error={errors.pickup} data-testid="quote-pickup" autoComplete="off" /></Field>
                  <Field label={f.destination} htmlFor="q-dest" error={errors.destination}><Input id="q-dest" value={trip.destination} onChange={setT('destination')} placeholder={f.destinationPh} error={errors.destination} data-testid="quote-destination" autoComplete="off" /></Field>
                </div>
                <Field label={f.passengers} htmlFor="q-pax" error={errors.passengers} className="sm:max-w-[200px]"><Input id="q-pax" type="number" inputMode="numeric" min={1} value={trip.passengers} onChange={setT('passengers')} placeholder={f.passengersPh} error={errors.passengers} data-testid="quote-passengers" /></Field>
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  <Field label={f.depDate} htmlFor="q-date" error={errors.date}><Input id="q-date" type="date" min={today} value={trip.date} onChange={setT('date')} error={errors.date} data-testid="quote-date" /></Field>
                  <Field label={f.depTime} htmlFor="q-time" error={errors.time}><Input id="q-time" type="time" value={trip.time} onChange={setT('time')} error={errors.time} data-testid="quote-time" /></Field>
                </div>
                <fieldset className="border-t border-navy-100 pt-5">
                  <legend className="pr-3 text-sm font-semibold text-ink/60">{f.returnOptional}</legend>
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    <Field label={f.retDate} htmlFor="q-rdate" error={errors.returnDate}><Input id="q-rdate" type="date" min={trip.date || today} value={trip.returnDate} onChange={setT('returnDate')} error={errors.returnDate} data-testid="quote-return-date" /></Field>
                    <Field label={f.retTime} htmlFor="q-rtime"><Input id="q-rtime" type="time" value={trip.returnTime} onChange={setT('returnTime')} data-testid="quote-return-time" /></Field>
                  </div>
                </fieldset>
              </div>
            </StepShell>
          )}

          {step === 1 && (
            <StepShell title={d.vehicleTitle}>
              <Field label={d.service} htmlFor="q-service" error={errors.serviceId} className="sm:max-w-md">
                <Select id="q-service" value={serviceId} onChange={(e) => setServiceId(e.target.value)} error={errors.serviceId} data-testid="quote-service-select">
                  <option value="">{d.servicePh}</option>
                  {services.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                </Select>
              </Field>
              <p className="mb-3 mt-8 text-sm font-semibold text-navy-900">{d.vehicle}</p>
              <div className="grid gap-3" role="radiogroup">
                <button type="button" role="radio" aria-checked={!vehicleId} onClick={() => setVehicleId('')} data-testid="quote-vehicle-recommend"
                  className={cn('flex items-center gap-4 border p-4 text-left transition-colors', !vehicleId ? 'border-navy-800 bg-navy-50 ring-1 ring-navy-800' : 'border-navy-200 hover:border-navy-400')}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-navy-900 text-white"><Sparkles className="h-5 w-5" /></span>
                  <span className="flex-1"><span className="block font-semibold text-navy-900">{d.recommend}</span><span className="text-sm text-ink/60">{d.recommendHelp}{recommended && pax > 0 ? ` → ${recommended.name}` : ''}</span></span>
                </button>
                {vehicles.map((v) => {
                  const small = pax > 0 && v.capacity < pax;
                  const sel = vehicleId === v.id;
                  return (
                    <button key={v.id} type="button" role="radio" aria-checked={sel} onClick={() => setVehicleId(v.id)} data-testid={`quote-vehicle-${v.slug}`}
                      className={cn('flex items-center gap-4 border p-3 text-left transition-colors', sel ? 'border-navy-800 bg-navy-50 ring-1 ring-navy-800' : 'border-navy-200 hover:border-navy-400', small && !sel && 'opacity-60')}>
                      <span className="relative h-14 w-20 shrink-0 overflow-hidden bg-navy-100"><Image src={v.image} alt="" fill sizes="80px" className="object-cover" /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-navy-900">{v.name}</span>
                        <span className="flex flex-wrap items-center gap-x-3 text-sm text-ink/60"><span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{v.capacity}</span><span>{D.common.priceFrom} {formatPrice(v.startingPrice, lang)}</span></span>
                      </span>
                      {pax > 0 && <span className={cn('hidden text-xs font-semibold sm:block', small ? 'text-signal-600' : 'text-emerald-700')}>{small ? d.tooSmall : d.fits}</span>}
                    </button>
                  );
                })}
              </div>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell title={d.extrasTitle}>
              <p className="-mt-3 mb-5 text-sm text-ink/60">{d.extrasHelp}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {extras.map((x) => (
                  <Checkbox key={x.id} testId={`quote-extra-${x.id}`} label={t(x.name, lang)} description={x.price ? `${formatPrice(x.price, lang, x.price % 1 ? 2 : 0)} ${unit(x)}` : D.common.free}
                    checked={extraIds.includes(x.id)} onChange={(c) => setExtraIds((p) => (c ? [...p, x.id] : p.filter((i) => i !== x.id)))} />
                ))}
              </div>
              <Field label={d.additional} htmlFor="q-add" hint={D.common.optional} className="mt-6"><Textarea id="q-add" value={additional} onChange={(e) => setAdditional(e.target.value)} placeholder={d.additionalPh} data-testid="quote-additional" /></Field>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell title={d.contactTitle}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={f.name} htmlFor="q-name" error={errors.name}><Input id="q-name" autoComplete="name" value={contact.name} onChange={setC('name')} error={errors.name} data-testid="quote-name" /></Field>
                <Field label={f.company} htmlFor="q-company" hint={D.common.optional}><Input id="q-company" autoComplete="organization" value={contact.company} onChange={setC('company')} data-testid="quote-company" /></Field>
                <Field label={f.email} htmlFor="q-email" error={errors.email}><Input id="q-email" type="email" autoComplete="email" inputMode="email" value={contact.email} onChange={setC('email')} error={errors.email} data-testid="quote-email" /></Field>
                <Field label={f.phone} htmlFor="q-phone" error={errors.phone}><Input id="q-phone" type="tel" autoComplete="tel" inputMode="tel" value={contact.phone} onChange={setC('phone')} error={errors.phone} data-testid="quote-phone" /></Field>
                <Field label={f.message} htmlFor="q-msg" hint={D.common.optional} className="sm:col-span-2"><Textarea id="q-msg" value={contact.message} onChange={setC('message')} data-testid="quote-message" /></Field>
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-ink/50"><Lock className="h-3.5 w-3.5" />{d.privacy}</p>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell title={d.reviewTitle}>
              <QuoteSummary sections={[
                { title: d.steps[0], testId: 'review-trip', onEdit: () => goTo(0), editLabel: D.common.edit, rows: [[f.pickup, trip.pickup], [f.destination, trip.destination], [f.passengers, trip.passengers], [f.depDate, dateLine(trip.date, trip.time)], [f.retDate, dateLine(trip.returnDate, trip.returnTime) || d.oneWay]] },
                { title: d.steps[1], testId: 'review-vehicle', onEdit: () => goTo(1), editLabel: D.common.edit, rows: [[d.service, service?.title], [d.vehicle, vehicle ? vehicle.name : d.recommended]] },
                { title: d.steps[2], testId: 'review-extras', onEdit: () => goTo(2), editLabel: D.common.edit, rows: [[d.steps[2], extraIds.length ? extras.filter((x) => extraIds.includes(x.id)).map((x) => t(x.name, lang)).join(', ') : d.none], [d.additional, additional]] },
                { title: d.steps[3], testId: 'review-contact', onEdit: () => goTo(3), editLabel: D.common.edit, rows: [[f.name, contact.name], [f.company, contact.company], [f.email, contact.email], [f.phone, contact.phone], [f.message, contact.message]] },
              ]} />
            </StepShell>
          )}
        </div>

        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-navy-100 bg-white p-3 sm:static sm:mt-8 sm:border-0 sm:p-0">
          {step > 0 && <Button variant="outline" size="lg" onClick={() => goTo(step - 1)} data-testid="quote-back-btn" className="px-4"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">{D.common.back}</span></Button>}
          {step < 4 && <Button size="lg" onClick={next} className="flex-1 sm:flex-none" data-testid="quote-next-btn">{D.common.next}<ArrowRight className="h-4 w-4" /></Button>}
          {step === 4 && <Button size="lg" onClick={submit} disabled={sending} className="flex-1 sm:flex-none" data-testid="quote-submit-btn">{sending ? d.sending : d.submit}</Button>}
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-28 border border-navy-100 bg-navy-50/60 p-5" data-testid="quote-sidebar">
          <p className="eyebrow">{d.title}</p>
          <dl className="mt-4 space-y-3 text-sm">
            {[[f.pickup, trip.pickup], [f.destination, trip.destination], [f.passengers, trip.passengers], [f.depDate, dateLine(trip.date, trip.time)], [d.service, service?.title], [d.vehicle, vehicle?.name ?? (step > 0 ? d.recommended : '')]].map(([k, v]) => (
              <div key={k}><dt className="text-ink/50">{k}</dt><dd className="font-semibold text-navy-900">{v || '—'}</dd></div>
            ))}
          </dl>
          {indicative !== undefined && pax > 0 && (
            <div className="mt-5 border-t border-navy-200 pt-4"><p className="text-sm text-ink/60">{d.indicative}</p><p className="font-display text-2xl font-bold text-navy-900" data-testid="quote-indicative-price">{formatPrice(indicative, lang)}</p><p className="mt-1 text-xs text-ink/50">{D.common.priceNoteGeneric}</p></div>
          )}
        </div>
      </aside>
    </div>
  );
};
