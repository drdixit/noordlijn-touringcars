import type { Lang } from '@/lib/types';
import { getDict, href } from '@/lib/utils';
import { getServices, getSettings, getVehicles } from '@/lib/repo';
import { ServiceCard } from '@/components/site/Cards';
import { CtaBanner, PageHero } from '@/components/site/Sections';

export const generateMetadata = async (props: { params: Promise<{ lang: Lang }> }) => {
  const params = await props.params;
  return { title: getDict(params.lang).services.title };
};

export default async function ServicesPage(props: { params: Promise<{ lang: Lang }> }) {
  const params = await props.params;
  const lang = params.lang;
  const d = getDict(lang);
  const [services, vehicles, settings] = await Promise.all([getServices(), getVehicles(), getSettings()]);
  return (
    <>
      <PageHero title={d.services.title} intro={d.services.intro} crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.services }]} />
      <section className="container-site py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="services-list">
          {services.map((s) => <ServiceCard key={s.id} s={s} lang={lang} vehicleNames={vehicles.filter((v) => s.vehicleIds.includes(v.id)).map((v) => v.name)} />)}
        </div>
      </section>
      <CtaBanner lang={lang} title={d.faqPage.ctaTitle} text={d.home.quickHelp} phone={settings.contact.phone} />
    </>
  );
}

export const instant = false;
