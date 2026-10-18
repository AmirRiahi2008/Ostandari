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
    <section className="section" data-react-tabs="true">
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
            {tab.title}
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
          {children[number]}
          <div className="more-container">
            <a className="more-btn" href={tab.href}>
              مشاهده بیشتر
            </a>
            <a className="more-subtitle" href={tab.href}>
              لیست کامل {tab.title}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
