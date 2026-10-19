import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import '@/styles/public-site.css';
import '@/styles/county-office.css';
import '@/styles/site-navigation.css';
import '@/styles/download-page.css';

export const metadata: Metadata = {
  title: 'استانداری مازندران',
  description: 'پرتال استانداری مازندران',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/design/site/assets/fonts/Vazirmatn-VariableFont_wght.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
