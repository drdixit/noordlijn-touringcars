import type { Lang } from '@/lib/types';
import { getDict, href } from '@/lib/utils';
import { getBlogCategories, getPublishedPosts } from '@/lib/repo';
import { BlogBrowser } from '@/components/site/BlogBrowser';
import { PageHero } from '@/components/site/Sections';

export const generateMetadata = async (props: { params: Promise<{ lang: Lang }> }) => {
  const params = await props.params;
  return { title: getDict(params.lang).blog.title };
};

export default async function BlogPage(props: { params: Promise<{ lang: Lang }> }) {
  const params = await props.params;
  const lang = params.lang;
  const d = getDict(lang);
  const [posts, cats] = await Promise.all([getPublishedPosts(), getBlogCategories()]);
  return (
    <>
      <PageHero title={d.blog.title} intro={d.blog.intro} crumbs={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.blog }]} />
      <section className="container-site py-12 sm:py-16"><BlogBrowser lang={lang} posts={posts} categories={cats} /></section>
    </>
  );
}
