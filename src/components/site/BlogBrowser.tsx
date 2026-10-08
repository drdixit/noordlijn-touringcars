'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { BlogCategory, BlogPost, Lang } from '@/lib/types';
import { cn, formatDate, getDict, href, t } from '@/lib/utils';
import { Input } from '@/components/ui/custom-form';
import { EmptyState } from '@/components/ui/empty-state';
import { Pagination } from '@/components/ui/custom-pagination';
import { BlogCard } from './Cards';

const PER_PAGE = 6;

export const BlogBrowser = ({ lang, posts, categories }: { lang: Lang; posts: BlogPost[]; categories: BlogCategory[] }) => {
  const d = getDict(lang).blog;
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('');
  const [page, setPage] = useState(1);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const filtering = !!q || !!cat;
  const list = useMemo(() => {
    const s = q.toLowerCase();
    return posts.filter((p) => (filtering || p.id !== featured?.id) && (!cat || p.categoryId === cat) && (!s || `${t(p.title, lang)} ${t(p.excerpt, lang)}`.toLowerCase().includes(s)));
  }, [posts, q, cat, lang, filtering, featured]);
  const pages = Math.ceil(list.length / PER_PAGE);
  const visible = list.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const catOf = (id: string) => categories.find((c) => c.id === id);
  const chip = (a: boolean) => cn('h-9 shrink-0 border px-3.5 text-sm font-semibold', a ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-200 text-navy-800 hover:border-navy-400');

  return (
    <div>
      {featured && !filtering && (
        <Link href={href(lang, `/blog/${featured.slug}`)} className="group mb-14 grid gap-6 border-b border-navy-100 pb-14 md:grid-cols-2 md:items-center md:gap-10" data-testid="blog-featured">
          <div className="relative aspect-[16/10] overflow-hidden bg-navy-100"><Image src={featured.image} alt={t(featured.title, lang)} fill priority sizes="(min-width:768px) 50vw, 100vw" className="object-cover" /></div>
          <div>
            <p className="eyebrow">{d.featured} · {t(catOf(featured.categoryId)?.name, lang)}</p>
            <h2 className="mt-3 text-3xl font-bold group-hover:text-signal-600 sm:text-4xl">{t(featured.title, lang)}</h2>
            <p className="mt-4 text-ink/70 md:text-lg">{t(featured.excerpt, lang)}</p>
            <p className="mt-5 text-sm text-ink/55">{d.by} {featured.author} · {formatDate(featured.date, lang)}</p>
          </div>
        </Link>
      )}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0" data-testid="blog-categories">
          <button type="button" className={chip(!cat)} onClick={() => { setCat(''); setPage(1); }} data-testid="blog-cat-all">{d.all}</button>
          {categories.map((c) => <button key={c.id} type="button" className={chip(cat === c.id)} onClick={() => { setCat(c.id); setPage(1); }} data-testid={`blog-cat-${c.id}`}>{t(c.name, lang)}</button>)}
        </div>
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <Input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder={d.search} className="pl-9" data-testid="blog-search" aria-label={d.search} />
        </div>
      </div>
      {visible.length ? (
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-testid="blog-grid">{visible.map((p) => <BlogCard key={p.id} p={p} lang={lang} category={catOf(p.categoryId)} />)}</div>
      ) : <EmptyState title={d.noResults} text={d.noResultsHelp} />}
      <div className="mt-12"><Pagination page={page} pages={pages} onChange={setPage} prevLabel={d.prev} nextLabel={d.next} /></div>
    </div>
  );
};
