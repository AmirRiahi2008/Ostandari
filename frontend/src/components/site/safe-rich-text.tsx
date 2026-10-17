'use client';
import { useEffect, useRef } from 'react';
import { setSafeHtml } from '@/lib/dom';
export function SafeRichText({ html, text }: { html: string; text: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (root.current) setSafeHtml(root.current, html);
  }, [html]);
  return (
    <div ref={root} className="portal-rich-text">
      {text}
    </div>
  );
}
