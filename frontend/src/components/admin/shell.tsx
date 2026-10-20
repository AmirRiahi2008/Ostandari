import type { ReactNode } from 'react';
import AdminHeader from '@/components/template/parts/AdminHeader9ef4c';
import AdminRail from '@/components/template/parts/AdminRail3e246';
import { PageFrame } from '@/components/template/page-frame';
import { templatePreview } from '@/lib/config';
import type { TemplatePage } from '@/types/portal';

export function AdminShell({
  page,
  path,
  children,
}: {
  page: TemplatePage;
  path: string;
  children: ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href={page.css} precedence="design" />
      <PageFrame key={path} page={page} path={path} preview={templatePreview()}>
        <div className="all-website">
          <AdminHeader />
          <div className="sadyar-content">
            <AdminRail />
            <main className="main-content portal-admin-main">{children}</main>
          </div>
        </div>
      </PageFrame>
    </>
  );
}
