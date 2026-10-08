'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { BlogPost, PostStatus } from '@/lib/types';
import { emptyL, slugify, uid } from '@/lib/utils';
import { Field, Input, Select } from '@/components/ui/Form';
import { ConfirmDialog } from '@/components/ui/Modal';
import { FormActions, ImagesEditor, LocalizedField, PageHeader, Panel } from './AdminUI';
import { useAdmin } from './AdminProvider';

export const newPost = (): BlogPost => ({ id: uid('b'), slug: '', title: emptyL(), excerpt: emptyL(), content: emptyL(), categoryId: 'tips', image: '', author: 'Sanne de Vries', date: new Date().toISOString().slice(0, 10), status: 'draft', featured: false, seoTitle: emptyL(), seoDescription: emptyL() });

export const BlogForm = ({ initial, isNew }: { initial: BlogPost; isNew: boolean }) => {
  const { blogCategories, upsert, remove, toast } = useAdmin();
  const router = useRouter();
  const [p, setP] = useState(initial);
  const [err, setErr] = useState<Record<string, string>>({});
  const [confirm, setConfirm] = useState(false);
  const set = <K extends keyof BlogPost>(k: K, val: BlogPost[K]) => setP((x) => ({ ...x, [k]: val }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!p.title.nl && !p.title.en) x.title = 'Title is required';
    if (p.status === 'scheduled' && p.date <= new Date().toISOString().slice(0, 10)) x.date = 'Scheduled posts need a future date';
    setErr(x);
    if (Object.keys(x).length) return;
    upsert('posts', { ...p, slug: p.slug || slugify(p.title.en || p.title.nl) });
    toast(isNew ? 'Post created' : 'Post saved');
    router.push('/admin/blog');
  };

  return (
    <form onSubmit={submit} noValidate data-testid="blog-form">
      <PageHeader title={isNew ? 'New post' : 'Edit post'} back="/admin/blog" />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-6">
          <Panel title="Article">
            <div className="grid gap-5">
              <LocalizedField label="Title" value={p.title} onChange={(x) => set('title', x)} testId="blog-title" error={err.title} />
              <Field label="Slug" htmlFor="b-slug"><Input id="b-slug" value={p.slug} placeholder={slugify(p.title.en || p.title.nl)} onChange={(e) => set('slug', slugify(e.target.value))} data-testid="blog-slug-input" /></Field>
              <LocalizedField label="Excerpt" value={p.excerpt} onChange={(x) => set('excerpt', x)} multiline rows={2} testId="blog-excerpt" />
              <LocalizedField label="Content" value={p.content} onChange={(x) => set('content', x)} multiline rows={14} testId="blog-content" />
              <p className="-mt-3 text-xs text-ink/50">Separate paragraphs with an empty line. Start a line with “## ” for a heading.</p>
            </div>
          </Panel>
          <Panel title="SEO">
            <div className="grid gap-5">
              <LocalizedField label="SEO title" value={p.seoTitle} onChange={(x) => set('seoTitle', x)} testId="blog-seo-title" />
              <LocalizedField label="SEO description" value={p.seoDescription} onChange={(x) => set('seoDescription', x)} multiline rows={2} testId="blog-seo-description" />
            </div>
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Publishing">
            <div className="grid gap-4">
              <Field label="Status" htmlFor="b-status"><Select id="b-status" value={p.status} onChange={(e) => set('status', e.target.value as PostStatus)} data-testid="blog-status-select"><option value="draft">Draft</option><option value="published">Published</option><option value="scheduled">Scheduled</option></Select></Field>
              <Field label="Publication date" htmlFor="b-date" error={err.date}><Input id="b-date" type="date" value={p.date} onChange={(e) => set('date', e.target.value)} error={err.date} data-testid="blog-date-input" /></Field>
              <Field label="Category" htmlFor="b-cat"><Select id="b-cat" value={p.categoryId} onChange={(e) => set('categoryId', e.target.value)} data-testid="blog-category-select">{blogCategories.map((c) => <option key={c.id} value={c.id}>{c.name.en}</option>)}</Select></Field>
              <Field label="Author" htmlFor="b-author"><Input id="b-author" value={p.author} onChange={(e) => set('author', e.target.value)} data-testid="blog-author-input" /></Field>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={p.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 accent-navy-800" data-testid="blog-featured-checkbox" />Featured article</label>
            </div>
          </Panel>
          <Panel title="Featured image"><ImagesEditor single label="Image" images={p.image ? [p.image] : []} onChange={(x) => set('image', x[0] ?? '')} testId="blog-image" /></Panel>
        </div>
      </div>
      <FormActions testId="blog-form" onCancel={() => router.push('/admin/blog')} saveLabel={isNew ? 'Create post' : 'Save changes'} onDelete={isNew ? undefined : () => setConfirm(true)} />
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} title="Delete post?" text="This article will be removed." onConfirm={() => { remove('posts', p.id); toast('Post deleted'); router.push('/admin/blog'); }} />
    </form>
  );
};
