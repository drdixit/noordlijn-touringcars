import type { Lang } from '@/lib/types';
import { getDict, href } from '@/lib/utils';
import { getSettings, getVehicleCategories, getVehicles } from '@/lib/repo';
import { FleetBrowser } from '@/components/site/FleetBrowser';
import { CtaBanner, PageHero } from '@/components/site/Sections';

export const generateMetadata = ({ params }: { params: { lang: Lang } }) => ({ title: getDict(params.lang).fleet.title });

export default async function VehiclesPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  const d = getDict(lang);
  const [vehicles, categories, settings] = await Promise.all([getVehicles(), getVehicleCategories(), getSettings()]);
  return (
    <>
      <PageHero title={d.fleet.title} intro={d.fleet.intro} crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.vehicles }]} />
      <section className="container-site py-10 sm:py-14"><FleetBrowser lang={lang} vehicles={vehicles} categories={categories} /></section>
      <CtaBanner lang={lang} title={d.faqPage.ctaTitle} text={d.fleet.intro} phone={settings.contact.phone} />
    </>
  );
}
