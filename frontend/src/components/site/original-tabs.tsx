'use client';

import { useId, useRef, useState, type ReactNode } from 'react';

export function OriginalTabs({
  tabs,
  children,
  initial = 0,
}: {
  tabs: { title: string; href: string }[];
  children: ReactNode[];
  initial?: number;
}) {
  const [index, setIndex] = useState(initial);
  const id = 'source-tabs-' + useId().replace(/:/g, '');
  const list = useRef<HTMLDivElement>(null);
  return (
    <section className="section source-managers" data-react-tabs="true" aria-label="مدیران استان">
      <div className="manager-tabs" role="tablist" aria-label="گروه مدیران" ref={list}>
        {tabs.map((tab, number) => (
          <button
            type="button"
            role="tab"
            className={'tab-btn' + (index === number ? ' active' : '')}
            id={id + '-tab-' + number}
            aria-selected={index === number}
            aria-controls={id + '-panel-' + number}
            tabIndex={index === number ? 0 : -1}
            key={tab.title}
            onClick={() => setIndex(number)}
            onKeyDown={(event) => {
              const movement = event.key === 'ArrowLeft' ? 1 : event.key === 'ArrowRight' ? -1 : 0;
              if (!movement && !['Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const target =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? tabs.length - 1
                    : (index + movement + tabs.length) % tabs.length;
              setIndex(target);
              list.current?.querySelectorAll<HTMLButtonElement>('[role=tab]')[target]?.focus();
            }}
          >
            <span>{tab.title}</span>
          </button>
        ))}
      </div>
      {tabs.map((tab, number) => (
        <div
          role="tabpanel"
          id={id + '-panel-' + number}
          aria-labelledby={id + '-tab-' + number}
          className={'tab-content' + (index === number ? ' active' : '')}
          hidden={index !== number}
          key={tab.title}
        >
          <div className="source-manager-items">
            {children[number]}
            <a className="more-card" href={tab.href} aria-label={'لیست کامل ' + tab.title}>
              <div className="more-card-inner">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <h3>مشاهده بیشتر</h3>
                <p>لیست کامل {tab.title}</p>
              </div>
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
