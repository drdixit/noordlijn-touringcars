import { CheckCircle2, Phone } from 'lucide-react';
import type { Lang } from '@/lib/types';
import { getDict, href } from '@/lib/utils';
import { getSettings } from '@/lib/repo';
import { ButtonLink } from '@/components/ui/Button';

export default async function QuoteSuccess({ params, searchParams }: { params: { lang: Lang }; searchParams: { ref?: string } }) {
  const lang = params.lang;
  const d = getDict(lang);
  const settings = await getSettings();
  return (
    <section className="container-site flex justify-center py-16 sm:py-24">
      <div className="w-full max-w-xl border border-navy-100 bg-white p-6 text-center sm:p-10" data-testid="quote-success">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" strokeWidth={1.5} />
        <h1 className="mt-5 text-3xl font-bold sm:text-4xl" data-testid="quote-success-title">{d.quote.successTitle}</h1>
        <p className="mt-4 text-ink/70 sm:text-lg">{d.quote.successText}</p>
        {searchParams.ref && (
          <p className="mt-6 inline-block bg-navy-50 px-4 py-2 text-sm">{d.quote.reference}: <span className="font-display text-lg font-bold text-navy-900" data-testid="quote-reference">{searchParams.ref}</span></p>
        )}
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink/65"><Phone className="h-4 w-4" />{d.quote.urgent} <a href={`tel:${settings.contact.phone.replace(/\s/g, '')}`} className="font-semibold text-navy-900">{settings.contact.phone}</a></p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={href(lang)} variant="secondary" data-testid="quote-success-home">{d.quote.backHome}</ButtonLink>
          <ButtonLink href={href(lang, '/vehicles')} variant="outline">{d.common.viewVehicles}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
