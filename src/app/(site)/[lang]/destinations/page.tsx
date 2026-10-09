import type { Lang } from '@/lib/types';
import { getDict, href } from '@/lib/utils';
import { getDestinations, getSettings } from '@/lib/repo';
import { DestinationCard } from '@/components/site/Cards';
import { CtaBanner, PageHero } from '@/components/site/Sections';

export const generateMetadata = async (props: { params: Promise<{ lang: Lang }> }) => {
  const params = await props.params;
  return { title: getDict(params.lang).destinations.title };
};

export default async function DestinationsPage(props: { params: Promise<{ lang: Lang }> }) {
  const params = await props.params;
  const lang = params.lang;
  const d = getDict(lang);
  const [list, settings] = await Promise.all([getDestinations(), getSettings()]);
  return (
    <>
      <PageHero title={d.destinations.title} intro={d.destinations.intro} crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.destinations }]} />
      <section className="container-site py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6" data-testid="destinations-list">{list.map((x) => <DestinationCard key={x.id} dst={x} lang={lang} />)}</div>
      </section>
      <CtaBanner lang={lang} title={d.faqPage.ctaTitle} text={d.home.quickHelp} phone={settings.contact.phone} />
    </>
  );
}

export const instant = false;
