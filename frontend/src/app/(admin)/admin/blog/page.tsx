'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import type { BlogPost, PostStatus } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Button, ButtonLink } from '@/components/ui/Button';
import { PostStatusBadge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Form';
import { ConfirmDialog } from '@/components/ui/Modal';
import { Table, THead, Th, Td, Tr } from '@/components/ui/Table';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterTabs, PageHeader, SearchBox } from '@/components/admin/AdminUI';
import { useAdmin } from '@/components/admin/AdminProvider';

export default function AdminBlog() {
  const { posts, blogCategories, remove, toast } = useAdmin();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<PostStatus | ''>('');
  const [cat, setCat] = useState('');
  const [del, setDel] = useState<BlogPost | null>(null);
  const list = useMemo(() => posts.filter((p) => (!status || p.status === status) && (!cat || p.categoryId === cat) && `${p.title.en} ${p.title.nl} ${p.author}`.toLowerCase().includes(q.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date)), [posts, q, status, cat]);
  const count = (s: PostStatus) => posts.filter((p) => p.status === s).length;
  return (
    <>
      <PageHeader title="Blog" sub={`${posts.length} posts`} actions={<ButtonLink href="/admin/blog/new" variant="secondary" size="sm" data-testid="add-post-btn"><Plus className="h-4 w-4" />New post</ButtonLink>} />
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <FilterTabs testId="post-status-filter" value={status} onChange={setStatus} options={[{ value: '' as const, label: 'All', count: posts.length }, { value: 'published' as const, label: 'Published', count: count('published') }, { value: 'scheduled' as const, label: 'Scheduled', count: count('scheduled') }, { value: 'draft' as const, label: 'Draft', count: count('draft') }]} />
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={cat} onChange={(e) => setCat(e.target.value)} className="h-10 sm:w-48" data-testid="post-category-filter"><option value="">All categories</option>{blogCategories.map((c) => <option key={c.id} value={c.id}>{c.name.en}</option>)}</Select>
          <SearchBox value={q} onChange={setQ} placeholder="Search posts…" testId="post-search" />
        </div>
      </div>
      {list.length ? (
        <Table testId="posts-table">
          <THead><Th>Title</Th><Th>Category</Th><Th>Author</Th><Th>Date</Th><Th>Status</Th><Th /></THead>
          <tbody>
            {list.map((p) => (
              <Tr key={p.id} testId={`post-row-${p.slug}`}>
                <Td><Link href={`/admin/blog/${p.id}`} className="font-semibold text-navy-900 hover:underline" data-testid={`post-edit-${p.slug}`}>{p.title.en || p.title.nl}</Link><span className="block text-xs text-ink/50">/{p.slug}</span></Td>
                <Td>{blogCategories.find((c) => c.id === p.categoryId)?.name.en}</Td><Td>{p.author}</Td>
                <Td className="whitespace-nowrap">{formatDate(p.date, 'en', { day: 'numeric', month: 'short', year: 'numeric' })}</Td>
                <Td><PostStatusBadge status={p.status} /></Td>
                <Td className="text-right"><Button variant="ghost" size="sm" onClick={() => setDel(p)} aria-label="Delete" data-testid={`post-delete-${p.slug}`}><Trash2 className="h-4 w-4 text-signal-600" /></Button></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      ) : <EmptyState title="No posts found" text="Try a different filter or create a new post." action={<ButtonLink href="/admin/blog/new" size="sm" variant="secondary">New post</ButtonLink>} />}
      <ConfirmDialog open={!!del} onClose={() => setDel(null)} title="Delete post?" text={`“${del?.title.en}” will be removed.`} onConfirm={() => { if (del) { remove('posts', del.id); toast('Post deleted'); } }} />
    </>
  );
}
