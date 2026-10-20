'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { mountHomeMotion } from '@/features/site/home-motion';

export function HomeExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) return mountHomeMotion(root.current);
  }, []);
  return (
    <div className="home-experience" ref={root}>
      {children}
    </div>
  );
}
