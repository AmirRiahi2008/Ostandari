'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Progressive reveal; content remains visible when motion or observers are unavailable. */
export function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (
      !node ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.animate?.(
            [
              { opacity: 0.5, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 420, easing: 'ease-out' },
          );
          observer.unobserve(element);
        }
      },
      { threshold: 0.08 },
    );
    node.querySelectorAll('[data-home-reveal]').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="home-experience" ref={root}>
      {children}
    </div>
  );
}
