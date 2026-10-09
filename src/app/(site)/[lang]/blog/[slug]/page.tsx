import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Lang } from '@/lib/types';
import { formatDate, getDict, href, t } from '@/lib/utils';
import { getBlogCategories, getPost, getPublishedPosts, getSettings } from '@/lib/repo';
import { Breadcrumbs } from '@/components/ui/breadcrumb';
import { BlogCard } from '@/components/site/Cards';
import { ArticleBody, CtaBanner } from '@/components/site/Sections';

export async function generateStaticParams() {
  return (await getPublishedPosts()).flatMap((p) => ['nl', 'en'].map((lang) => ({ lang, slug: p.slug })));
}
export async function generateMetadata(props: { params: Promise<{ lang: Lang; slug: string }> }) {
  const params = await props.params;
  const p = await getPost(params.slug);
  return p ? { title: t(p.seoTitle, params.lang) || t(p.title, params.lang), description: t(p.seoDescription, params.lang) } : {};
}

export default async function BlogDetail(props: { params: Promise<{ lang: Lang; slug: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const p = await getPost(params.slug);
  if (!p) notFound();
  const d = getDict(lang);
  const [all, cats, settings] = await Promise.all([getPublishedPosts(), getBlogCategories(), getSettings()]);
  const cat = cats.find((c) => c.id === p.categoryId);
  const related = [...all.filter((x) => x.id !== p.id && x.categoryId === p.categoryId), ...all.filter((x) => x.id !== p.id && x.categoryId !== p.categoryId)].slice(0, 3);
  return (
    <>
      <article className="container-site max-w-[860px] py-8 sm:py-12" data-testid="blog-article">
        <Breadcrumbs items={[{ label: d.breadcrumb.home, href: href(lang) }, { label: d.nav.blog, href: href(lang, '/blog') }, { label: t(p.title, lang) }]} />
        <p className="eyebrow mt-8" data-testid="blog-category">{t(cat?.name, lang)}</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl" data-testid="page-title">{t(p.title, lang)}</h1>
        <p className="mt-4 text-sm text-ink/60" data-testid="blog-meta">{d.blog.by} <span className="font-semibold text-ink/80">{p.author}</span> · <time dateTime={p.date}>{formatDate(p.date, lang)}</time></p>
        <div className="relative my-8 aspect-[16/9] overflow-hidden bg-navy-100"><Image src={p.image} alt={t(p.title, lang)} fill priority sizes="860px" className="object-cover" /></div>
        <p className="mb-6 text-xl leading-relaxed text-navy-900">{t(p.excerpt, lang)}</p>
        <ArticleBody text={t(p.content, lang)} />
      </article>
      {related.length > 0 && (
        <section className="border-t border-navy-100 bg-navy-50 py-14" data-testid="blog-related">
          <div className="container-site">
            <h2 className="mb-8 text-2xl font-bold sm:text-3xl">{d.common.relatedPosts}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <BlogCard key={r.id} p={r} lang={lang} category={cats.find((c) => c.id === r.categoryId)} />)}</div>
          </div>
        </section>
      )}
      <CtaBanner lang={lang} title={t(settings.homepage.ctaTitle, lang)} text={t(settings.homepage.ctaText, lang)} phone={settings.contact.phone} />
    </>
  );
}

export const instant = false;
