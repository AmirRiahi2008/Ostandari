'use client';
import type { ReactNode } from 'react';
import { useAdminWorkspace } from '@/components/admin/workspace-provider';
import { adminModules } from '@/data/admin/modules';
import { adminEditorHref } from '@/lib/admin-routes';
import {
  workspaceCanCreate,
  workspaceModuleAllowed,
  workspaceModuleTitle,
} from '@/lib/admin-workspace';
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
export default function AdminHeader9ef4c() {
  const user = useAdminWorkspace();
  const context = user?.portal_context;
  const create = [
    '/panel/admin/news',
    '/panel/admin/announcements',
    '/panel/admin/slides',
    '/panel/admin/galleries',
    '/panel/admin/members',
    '/panel/admin/services',
    '/panel/admin/forms',
    '/panel/admin/images',
  ].flatMap((path) => {
    const module = adminModules.find((item) => item.path === path);
    return module && workspaceModuleAllowed(module, user) && workspaceCanCreate(module, user)
      ? [module]
      : [];
  });
  const reports = adminModules.find((item) => item.path === '/panel/admin/reports')!;
  return (
    <header className="sadyar-header portal-admin-header" data-admin-header="true">
      <div className="sadyar-header-right makecenter">
        <a
          href={context?.dashboard_path ?? '/panel/admin'}
          className="sadyar-header-right-text portal-admin-brand"
        >
          <span>{context?.type === 'county' ? 'پنل فرمانداری' : 'پنل استانداری'}</span>
          <span className="special-text-header">{context?.county?.name ?? 'مازندران'}</span>
        </a>
        <button
          type="button"
          className="makecenter close-sidebar-button"
          id="clicksidebar"
          aria-label="تغییر اندازهٔ منوی بخش‌ها"
          aria-controls="admin-sidebar"
          aria-expanded="true"
        >
          <Icon>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M15 4v16M18 8h1M18 12h1M18 16h1" />
          </Icon>
        </button>
      </div>
      <nav
        className="sadyar-header-left portal-admin-header-actions"
        aria-label="دسترسی‌های سریع مدیریت"
      >
        {create.length > 0 && (
          <details className="portal-admin-create-menu">
            <summary className="sadyar-header-left-righ-createbtn">
              <Icon>
                <path d="M12 5v14M5 12h14" />
              </Icon>
              <span>افزودن</span>
            </summary>
            <div className="portal-admin-create-options">
              {create.map((module) => (
                <a key={module.path} href={adminEditorHref(module.path)}>
                  {workspaceModuleTitle(module.path, module.title, user)}
                </a>
              ))}
            </div>
          </details>
        )}
        <button
          type="button"
          id="clickforsearch"
          className="header-smallitem makecenter"
          aria-label="جستجو در بخش‌های مدیریت"
          title="جستجوی بخش‌ها"
        >
          <Icon>
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </Icon>
        </button>
        {workspaceModuleAllowed(reports, user) && (
          <a
            href="/panel/admin/reports"
            className="header-smallitem makecenter"
            aria-label="گزارش‌های مردمی"
            title="گزارش‌های مردمی"
          >
            <Icon>
              <path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h4" />
            </Icon>
          </a>
        )}
        <a
          href={context?.public_path ?? '/'}
          className="header-smallitem makecenter"
          aria-label="مشاهدهٔ سایت"
          title="مشاهدهٔ سایت"
        >
          <Icon>
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </Icon>
        </a>
        <button
          type="button"
          id="theme-toggle"
          className="header-smallitem makecenter"
          aria-label="تغییر حالت روشن و تیره"
          title="حالت روشن و تیره"
        >
          <Icon>
            <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />
          </Icon>
        </button>
        <a
          href="/panel/admin/account"
          className="portal-admin-account"
          aria-label="حساب کاربری"
          title="حساب کاربری"
        >
          <Icon>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
          </Icon>
          <span>{user?.name ?? 'حساب کاربری'}</span>
        </a>
      </nav>
    </header>
  );
}
