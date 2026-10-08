export const instant = false;
import type { Lang } from '@/lib/types';
import { getDict, href, t } from '@/lib/utils';
import { getDestination, getPricing, getServices, getVehicles } from '@/lib/repo';
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import { QuoteFlow } from '@/components/site/QuoteFlow';

export const generateMetadata = async (props: { params: Promise<{ lang: Lang }> }) => {
  const params = await props.params;
  return { title: getDict(params.lang).quote.title };
};

type SP = Record<string, string | undefined>;

export default async function QuotePage(props: { params: Promise<{ lang: Lang }>; searchParams: Promise<SP> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const lang = params.lang;
  const d = getDict(lang);
  const [services, vehicles, pricing] = await Promise.all([getServices(), getVehicles(), getPricing()]);
  const sp = (k: string) => searchParams[k] ?? '';
  const dest = searchParams.destination_slug ? await getDestination(searchParams.destination_slug) : undefined;
  const v = vehicles.find((x) => x.slug === sp('vehicle'));
  const initial = {
    pickup: sp('pickup'), destination: dest ? t(dest.name, lang) : sp('destination'), passengers: sp('passengers') || (v ? String(v.capacity) : ''),
    date: sp('date'), time: sp('time'), returnDate: sp('returnDate'), returnTime: sp('returnTime'),
    serviceId: services.find((s) => s.slug === sp('service'))?.id ?? '', vehicleId: v?.id ?? '',
  };
  return (
    <div className="bg-white">
      <div className="border-b border-navy-100 bg-navy-50">
        <div className="container-site py-6 sm:py-10">
          <Breadcrumbs items={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.quote.title }]} />
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl" data-testid="page-title">{d.quote.title}</h1>
          <p className="mt-2 text-ink/65 sm:text-lg">{d.quote.intro}</p>
        </div>
      </div>
      <div className="container-site py-8 sm:py-12">
        <QuoteFlow lang={lang} initial={initial} extras={pricing.extras}
          services={services.map((s) => ({ id: s.id, slug: s.slug, title: t(s.title, lang), startingPrice: s.startingPrice }))}
          vehicles={vehicles.map((x) => ({ id: x.id, slug: x.slug, name: x.name, capacity: x.capacity, image: x.images[0], startingPrice: x.pricing.startingPrice }))} />
      </div>
    </div>
  );
}
