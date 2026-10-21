'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { mountPortal } from '@/lib/alpine/runtime';
import type { TemplatePage } from '@/types/portal';
import { useAdminWorkspace } from '@/components/admin/workspace-provider';

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
  const workspace = useAdminWorkspace()?.portal_context;
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
      data-can-write={workspace ? String(workspace.can_write) : undefined}
      data-workspace-home={workspace?.dashboard_path}
      data-workspace-login={workspace?.login_path}
      data-workspace-name={workspace?.organization_name ?? undefined}
      data-organization-id={workspace?.organization_id ?? undefined}
      data-organization-type={workspace?.type}
      data-workspace-global={workspace ? String(workspace.is_global) : undefined}
      data-page={page.id}
      lang={page.lang}
      dir={page.lang === 'en' ? 'ltr' : 'rtl'}
      className={'min-h-screen w-full font-vazirmatn ' + page.bodyClass}
    >
      {children}
    </div>
  );
}
