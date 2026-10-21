'use client';
import { useEffect, useId, useState } from 'react';
import { adminModules } from '@/data/admin/modules';
import { adminSections } from '@/data/admin/sections';
import { useAdminWorkspace } from './workspace-provider';
import { workspaceModuleAllowed, workspaceModuleTitle } from '@/lib/admin-workspace';
import { normalizeAdminSearch } from '@/lib/admin-search';
export function AdminModuleMenu() {
  const user = useAdminWorkspace();
  const [query, setQuery] = useState('');
  const [path, setPath] = useState('');
  const [opened, setOpened] = useState<string[]>([]);
  const [restored, setRestored] = useState(false);
  const [permissions, setPermissions] = useState<string[] | null>(null);
  const id = useId();
  const storageKey = 'portal-menu-groups:' + (user?.portal_context?.organization_id ?? 'main');
  useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    let saved: unknown;
    try {
      saved = JSON.parse(sessionStorage.getItem(storageKey) ?? '[]');
    } catch {}
    const valid = Array.isArray(saved)
      ? saved.filter(
          (value) =>
            typeof value === 'string' && adminSections.some((section) => section.id === value),
        )
      : [];
    const active = adminModules.find(
      (module) => currentPath === module.path || currentPath.startsWith(module.path + '/'),
    )?.section;
    setOpened(active ? [...new Set([...valid, active])] : valid);
    setRestored(true);
  }, [storageKey]);
  useEffect(() => {
    if (user) return;
    const receive = (event: Event) => {
      const values = (event as CustomEvent).detail?.role?.permissions;
      if (Array.isArray(values)) setPermissions(values);
    };
    document.addEventListener('portal:admin-user', receive);
    return () => document.removeEventListener('portal:admin-user', receive);
  }, [user]);
  const modules = adminModules.filter(
    (module) =>
      module.showInNavigation &&
      workspaceModuleAllowed(module, user) &&
      (!permissions || permissions.includes('*') || permissions.includes(module.permission)) &&
      normalizeAdminSearch(
        workspaceModuleTitle(module.path, module.title, user) + ' ' + module.description,
      ).includes(normalizeAdminSearch(query)),
  );
  const current = (value: string) => path === value || path.startsWith(value + '/');
  const dashboard = user?.portal_context?.dashboard_path ?? '/admin';
  return (
    <nav className="portal-module-menu" aria-label="همهٔ بخش‌های مدیریت">
      <a
        className="portal-menu-home"
        href={dashboard}
        aria-current={path === dashboard ? 'page' : undefined}
      >
        {user?.portal_context?.type === 'county'
          ? 'داشبورد فرمانداری ' + user.portal_context.county?.name
          : 'داشبورد مدیریت'}
      </a>
      <label className="portal-menu-search">
        پیدا کردن بخش
        <input
          type="search"
          data-admin-menu-search="true"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="مثلاً اخبار یا استاندار…"
        />
      </label>
      {adminSections.map((section) => {
        const children = modules.filter((module) => module.section === section.id);
        if (!children.length) return null;
        const active = children.some((module) => current(module.path));
        return (
          <details
            key={section.id}
            data-menu-group={section.id}
            open={Boolean(query.trim()) || opened.includes(section.id) || (!restored && active)}
            onToggle={(event) => {
              if (!restored || query.trim()) return;
              const open = event.currentTarget.open;
              setOpened((previous) => {
                const next = open
                  ? [...new Set([...previous, section.id])]
                  : previous.filter((value) => value !== section.id);
                try {
                  sessionStorage.setItem(storageKey, JSON.stringify(next));
                } catch {}
                return next;
              });
            }}
          >
            <summary aria-controls={id + '-' + section.id}>
              {section.title}
              <span>{children.length.toLocaleString('fa-IR')}</span>
            </summary>
            <div id={id + '-' + section.id}>
              {children.map((module) => (
                <a
                  key={module.path}
                  href={module.path}
                  aria-current={current(module.path) ? 'page' : undefined}
                >
                  {workspaceModuleTitle(module.path, module.title, user)}
                </a>
              ))}
            </div>
          </details>
        );
      })}
      {!modules.length && <p role="status">بخشی پیدا نشد. نام دیگری جستجو کنید.</p>}
      <div className="portal-menu-footer">
        <a href="/admin/account">حساب کاربری</a>
        <a href={user?.portal_context?.public_path ?? '/'}>مشاهدهٔ سایت</a>
        <a href="/admin/logout">خروج از حساب</a>
      </div>
    </nav>
  );
}
