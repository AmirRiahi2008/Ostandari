import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/styles/globals.css';
import '@/styles/public-site.css';
import '@/styles/county-office.css';
import '@/styles/site-navigation.css';
import '@/styles/download-page.css';
import '@/styles/admin-reports.css';
import '@/styles/admin-cms.css';
import '@/styles/admin-pages.css';
import '@/styles/rich-text-album.css';
import '@/styles/authentication.css';
import '@/styles/content-article.css';

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
