'use client';
import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAdmin } from '@/components/admin/AdminProvider';
import { BlogForm, newPost } from '@/components/admin/BlogForm';

export default function BlogEditPage() {
  const { id } = useParams<{ id: string }>();
  const { posts } = useAdmin();
  const isNew = id === 'new';
  const item = useMemo(() => (isNew ? newPost() : posts.find((p) => p.id === id)), [isNew, id]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!item) return <EmptyState title="Post not found" action={<Link href="/admin/blog" className="font-semibold underline">Back to blog</Link>} />;
  return <BlogForm key={item.id} initial={item} isNew={isNew} />;
}
