'use client';

import { useEffect, useState } from 'react';

export interface HomeSlide {
  id: string;
  title: string;
  image?: string;
  href?: string;
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
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [slides.length, paused, focused, hovered, reduced]);
  const move = (delta: number) =>
    setIndex((value) => (value + delta + slides.length) % slides.length);
  const slideImage = current?.image ? (
    <img
      key={current.image}
      src={current.image}
      alt={current.title || 'اسلاید اطلاع‌رسانی'}
      width={1280}
      height={522}
      fetchPriority="high"
    />
  ) : (
    <span>{current?.title}</span>
  );
  return (
    <section
      className="swiper mySwiper source-slider"
      data-react-slider="true"
      aria-roledescription="اسلایدر"
      aria-label="رویدادها و اطلاع‌رسانی استانداری"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false);
      }}
      onKeyDown={(event) => {
        if (slides.length < 2) return;
        if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? 1 : -1);
        }
      }}
    >
      <div className="swiper-wrapper">
        <div
          className="swiper-slide"
          role="group"
          aria-roledescription="اسلاید"
          aria-label={current ? selected + 1 + ' از ' + slides.length : 'اطلاع‌رسانی'}
        >
          {current ? (
            current.href ? (
              <a
                href={current.href}
                className="source-slide-link"
                aria-label={current.title || 'اسلاید اطلاع‌رسانی'}
              >
                {slideImage}
              </a>
            ) : (
              <div className="source-slide-link">{slideImage}</div>
            )
          ) : (
            <a className="source-slide-link" href="/news">
              درگاه الکترونیکی استانداری مازندران
            </a>
          )}
        </div>
      </div>
      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="swiper-button-prev"
            aria-label="اسلاید قبلی"
            onClick={() => move(-1)}
          />
          <button
            type="button"
            className="swiper-button-next"
            aria-label="اسلاید بعدی"
            onClick={() => move(1)}
          />
          <div className="swiper-pagination">
            {slides.map((slide, number) => (
              <button
                type="button"
                key={slide.id}
                className={
                  'swiper-pagination-bullet' +
                  (selected === number ? ' swiper-pagination-bullet-active' : '')
                }
                aria-label={'نمایش اسلاید ' + (number + 1)}
                aria-pressed={selected === number}
                onClick={() => setIndex(number)}
              />
            ))}
          </div>
          <button
            type="button"
            className="source-slider-pause"
            aria-label={paused ? 'ادامهٔ پخش خودکار' : 'توقف پخش خودکار'}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? '▶' : 'Ⅱ'}
          </button>
        </>
      )}
    </section>
  );
}
