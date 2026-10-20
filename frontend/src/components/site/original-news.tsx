'use client';

import { useState } from 'react';

export type OriginalNewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  href: string;
  image?: string;
  type: string;
};

export function OriginalNews({ items }: { items: OriginalNewsItem[] }) {
  const [type, setType] = useState('all');
  const tabs = [
    { id: 'all', title: 'همه', shape: 'right-flat' },
    { id: 'announcement', title: 'اطلاعیه', shape: 'both-slanted' },
    { id: 'news', title: 'اخبار', shape: 'both-slanted' },
    { id: 'resolution', title: 'مصوبات', shape: 'left-flat' },
  ];
  const visible = type === 'all' ? items : items.filter((item) => item.type === type);
  return (
    <div className="akhbar-scroll-wrapper">
      <div className="tabs" aria-label="فیلتر اخبار">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={'tab ' + tab.shape + (type === tab.id ? ' active' : '')}
            aria-pressed={type === tab.id}
            onClick={() => setType(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="akhbar-scroll-div" aria-live="polite">
        {visible.map((item) => (
          <a
            className={'akhbar-container' + (!item.image ? ' source-without-image' : '')}
            href={item.href}
            key={item.id}
          >
            {item.image && <img src={item.image} alt="" width={100} height={80} loading="lazy" />}
            <div className="akhbar-left">
              <div className="akhbar-header">
                <span className="akhbar-btn">
                  {tabs.find((tab) => tab.id === item.type)?.title ?? 'اخبار'}
                </span>
                <time className="akhbar-date">{item.date}</time>
              </div>
              <div className="akhbar-onvan">{item.title}</div>
              <div className="akhbar-date">{item.excerpt}</div>
            </div>
          </a>
        ))}
        {!visible.length && <p className="source-empty">مطلبی در این بخش منتشر نشده است.</p>}
      </div>
    </div>
  );
}

export function OriginalCountyNews({
  news,
  announcements,
  county,
  newsUnavailable = false,
  announcementsUnavailable = false,
}: {
  news: OriginalNewsItem[];
  announcements: OriginalNewsItem[];
  county: string;
  newsUnavailable?: boolean;
  announcementsUnavailable?: boolean;
}) {
  const [active, setActive] = useState(0);
  const items = active === 0 ? news : announcements;
  return (
    <div className="cb2-center">
      <div className="news-top">
        <div className="news-tabs2">
          <div
            className="news-tab-slider"
            style={{ transform: 'translateX(' + (active === 0 ? 0 : -100) + '%)' }}
          />
          {['اخبار', 'اطلاعیه‌ها'].map((title, number) => (
            <button
              type="button"
              className={'news-tab-btn' + (active === number ? ' active' : '')}
              aria-pressed={active === number}
              key={title}
              onClick={() => setActive(number)}
            >
              {title}
            </button>
          ))}
        </div>
        <span className="news-count-pill">فرمانداری {county}</span>
      </div>
      <div className="news-list2" aria-live="polite">
        {items.map((item) => (
          <a className="news-card2" href={item.href} key={item.id}>
            <div className="thumb">
              {item.image && <img src={item.image} alt="" loading="lazy" />}
              <span className="cat-badge">{active === 0 ? 'اخبار' : 'اطلاعیه'}</span>
            </div>
            <div className="content">
              <h4>{item.title}</h4>
              <p>{item.excerpt}</p>
              <div className="meta">
                <time>{item.date}</time>
              </div>
            </div>
            <span className="go-arrow" aria-hidden="true">
              ↖
            </span>
          </a>
        ))}
        {!items.length && (
          <p className="source-empty">
            {(active === 0 ? newsUnavailable : announcementsUnavailable)
              ? 'ارتباط با سرویس اطلاعات برقرار نشد. لطفاً دوباره تلاش کنید.'
              : 'مطلبی برای فرمانداری ' + county + ' در این بخش منتشر نشده است.'}
          </p>
        )}
      </div>
    </div>
  );
}
