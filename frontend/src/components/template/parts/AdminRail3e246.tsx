'use client';
import { AdminModuleMenu } from '@/components/admin/module-menu';
import { useAdminWorkspace } from '@/components/admin/workspace-provider';
export default function AdminRail3e246() {
  const user = useAdminWorkspace();
  return (
    <>
      <aside className="sidebar" id="admin-sidebar" aria-label="منوی بخش‌های مدیریت">
        <div className="sidebar-contents">
          <div className="portal-admin-profile">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M3 23v-3a9 9 0 0 1 18 0v3" />
            </svg>
            <div>
              <strong>{user?.name ?? 'مدیر سامانه'}</strong>
              <span>{user?.portal_context?.organization_name ?? 'مدیریت پرتال'}</span>
            </div>
          </div>
          <AdminModuleMenu />
        </div>
      </aside>
      <button
        type="button"
        id="sidebarDarkBg"
        className="dark-background-tablet portal-sidebar-backdrop"
        aria-label="بستن منوی بخش‌ها"
        tabIndex={-1}
      />
    </>
  );
}
