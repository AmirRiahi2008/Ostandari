import { quickLinks } from '@/data/public-navigation';
export function LinkGrid() {
  return (
    <div className="portal-link-grid">
      {quickLinks.map(([label, href]) => (
        <a key={href} href={href}>
          {label}
          <span aria-hidden="true">←</span>
        </a>
      ))}
    </div>
  );
}
