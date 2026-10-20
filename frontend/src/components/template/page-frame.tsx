'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { mountPortal } from '@/lib/alpine/runtime';
import type { TemplatePage } from '@/types/portal';

export function PageFrame({
  page,
  preview,
  path,
  children,
}: {
  page: TemplatePage;
  preview: boolean;
  path: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    return mountPortal(root.current, { page, preview, path });
  }, [page, preview, path]);
  return (
    <div
      ref={root}
      data-design={page.scope}
      data-preview={String(preview)}
      data-section={page.controller}
      data-admin-view={
        page.controller === 'admin' && page.resource ? (page.editor ? 'editor' : 'list') : undefined
      }
      data-path={path}
      data-page={page.id}
      lang={page.lang}
      dir={page.lang === 'en' ? 'ltr' : 'rtl'}
      className={'min-h-screen w-full font-vazirmatn ' + page.bodyClass}
    >
      {children}
    </div>
  );
}
