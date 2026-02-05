"use client";

import { useBlogTracking } from '@/hooks/useBlogTracking';
import { type ReactNode } from 'react';

interface BlogArticleTrackerProps {
  slug: string;
  title: string;
  category: string;
  content: string;
  locale?: string;
  authorName?: string;
  children: ReactNode;
}

export function BlogArticleTracker({
  slug,
  title,
  category,
  content,
  locale,
  authorName,
  children,
}: BlogArticleTrackerProps) {
  const { articleRef } = useBlogTracking({
    slug,
    title,
    category,
    content,
    locale,
    authorName,
  });

  return (
    <article ref={articleRef} className="container mx-auto max-w-3xl">
      {children}
    </article>
  );
}
