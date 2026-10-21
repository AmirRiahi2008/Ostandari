'use client';
import { useEffect, useRef, useState } from 'react';
import type { NavigationItem } from '@/data/official-navigation';
import { OriginalIcon, type OriginalIconName } from './original-icons';

export function DirectMenu({
  item,
  icon,
  onOpen,
}: {
  item: NavigationItem;
  icon: OriginalIconName;
  onOpen: () => void;
}) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const focusPanel = useRef(false);
  const panelId = 'direct-menu-' + item.id;
  function show() {
    onOpen();
    setOpen(true);
  }
  useEffect(() => {
    if (!open) return;
    if (focusPanel.current) {
      focusPanel.current = false;
      root.current?.querySelector<HTMLAnchorElement>('.source-direct-panel a')?.focus();
    }
    const closeOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);
  return (
    <div
      className={'menu-item source-direct-menu' + (open ? ' is-open' : '')}
      ref={root}
      onMouseEnter={show}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.stopPropagation();
          setOpen(false);
          button.current?.focus();
        }
        if (event.key === 'ArrowDown' && event.target === button.current) {
          event.preventDefault();
          focusPanel.current = true;
          show();
        }
      }}
    >
      <div className="rast">
        <OriginalIcon name={icon} />
        <a href={item.href}>{item.title}</a>
        {item.children.length > 0 && (
          <button
            ref={button}
            type="button"
            className="source-direct-toggle"
            aria-label={'زیرمنوی ' + item.title}
            aria-controls={panelId}
            aria-expanded={open}
            onClick={() => (open ? setOpen(false) : show())}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}
      </div>
      {item.children.length > 0 && (
        <div
          id={panelId}
          className="source-direct-panel"
          hidden={!open}
          role="region"
          aria-label={item.title}
        >
          <div className="source-mega-heading">
            <div>
              <span>بخش‌های پرتال</span>
              <h2>{item.title}</h2>
            </div>
            <a href={item.href}>
              مشاهدهٔ همه <span aria-hidden="true">←</span>
            </a>
          </div>
          <div className="source-direct-grid">
            {item.children.map((child) => (
              <div key={child.id}>
                <a className="source-direct-title" href={child.href}>
                  {child.title}
                  <span aria-hidden="true">←</span>
                </a>
                {child.children.map((link) => (
                  <a className="source-direct-child" key={link.id} href={link.href}>
                    {link.title}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
