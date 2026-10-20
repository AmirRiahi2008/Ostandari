'use client';
import { useEffect, useState } from 'react';
import { adminModules } from '@/data/admin/modules';
import { adminSections } from '@/data/admin/sections';

export function AdminModuleMenu() {
  const [query, setQuery] = useState('');
  const [path, setPath] = useState('');
  const [permissions, setPermissions] = useState<string[] | null>(null);
  useEffect(() => {
    setPath(window.location.pathname);
    const receive = (event: Event) => {
      const values = (event as CustomEvent).detail?.role?.permissions;
      if (Array.isArray(values)) setPermissions(values);
    };
    document.addEventListener('portal:admin-user', receive);
    return () => document.removeEventListener('portal:admin-user', receive);
  }, []);
  const modules = adminModules.filter(
    (module) =>
      (!permissions || permissions.includes('*') || permissions.includes(module.permission)) &&
      (module.title + ' ' + module.description).includes(query.trim()),
  );
  return (
    <nav className="portal-module-menu" aria-label="همهٔ بخش‌های مدیریت">
      <a
        className="portal-menu-home"
        href="/admin"
        aria-current={path === '/admin' ? 'page' : undefined}
      >
        داشبورد مدیریت
      </a>
      <label className="portal-menu-search">
        پیدا کردن بخش
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="نام بخش…"
        />
      </label>
      {adminSections.map((section) => {
        const children = modules.filter((module) => module.section === section.id);
        if (!children.length) return null;
        return (
          <details
            key={section.id}
            open={
              Boolean(query) ||
              children.some((module) => path === module.path || path.startsWith(module.path + '/'))
            }
          >
            <summary>
              {section.title}
              <span>{children.length.toLocaleString('fa-IR')}</span>
            </summary>
            <div>
              {children.map((module) => (
                <a
                  key={module.path}
                  href={module.path}
                  aria-current={
                    path === module.path || path.startsWith(module.path + '/') ? 'page' : undefined
                  }
                >
                  {module.title}
                </a>
              ))}
            </div>
          </details>
        );
      })}
      {!modules.length && <p role="status">بخشی پیدا نشد.</p>}
      <div className="portal-menu-footer">
        <a href="/admin/account">حساب کاربری</a>
        <a href="/">مشاهدهٔ سایت</a>
        <a href="/admin/logout">خروج</a>
      </div>
    </nav>
  );
}
