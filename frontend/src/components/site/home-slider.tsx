'use client';

import { useEffect, useState } from 'react';

export interface HomeSlide {
  id: string;
  title: string;
  image?: string;
  href: string;
}

export function HomeSlider({ slides }: { slides: HomeSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(true);
  const selected = index % Math.max(1, slides.length);
  const current = slides[selected];

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || paused || focused || hovered || reduced) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [slides.length, paused, focused, hovered, reduced]);

  if (!current)
    return (
      <section className="public-slider">
        <div className="public-slide-image">
          <span>درگاه الکترونیکی استانداری مازندران</span>
        </div>
        <div className="public-slide-caption">
          <a href="/news">اخبار و اطلاعیه‌ها ←</a>
        </div>
      </section>
    );
  const move = (delta: number) =>
    setIndex((value) => (value + delta + slides.length) % slides.length);
  return (
    <section
      className="public-slider"
      aria-roledescription="اسلایدر"
      aria-label="رویدادها و اطلاع‌رسانی استانداری"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          move(1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      <div
        className="public-slide"
        role="group"
        aria-roledescription="اسلاید"
        aria-label={selected + 1 + ' از ' + slides.length}
      >
        <a href={current.href} className="public-slide-image" aria-label={current.title}>
          {current.image ? (
            <img
              key={current.image}
              src={current.image}
              alt={current.title}
              width={1280}
              height={522}
              fetchPriority="high"
            />
          ) : (
            <span>{current.title}</span>
          )}
        </a>
        <div
          className="public-slide-caption"
          aria-live={paused || focused || hovered || reduced ? 'polite' : 'off'}
        >
          <a href={current.href}>{current.title}</a>
        </div>
      </div>
      {slides.length > 1 && (
        <div className="public-slider-controls">
          <button type="button" onClick={() => move(-1)} aria-label="اسلاید قبلی">
            →
          </button>
          <div className="public-slider-dots">
            {slides.map((slide, number) => (
              <button
                type="button"
                key={slide.id}
                aria-label={'نمایش اسلاید ' + (number + 1)}
                aria-pressed={number === selected}
                onClick={() => setIndex(number)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? 'ادامهٔ پخش خودکار' : 'توقف پخش خودکار'}
            aria-pressed={paused}
          >
            {paused ? '▶' : 'Ⅱ'}
          </button>
          <button type="button" onClick={() => move(1)} aria-label="اسلاید بعدی">
            ←
          </button>
        </div>
      )}
    </section>
  );
}
