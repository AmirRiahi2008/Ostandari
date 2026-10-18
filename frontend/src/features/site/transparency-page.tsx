import { transparencyCards, transparencySteps } from '@/data/transparency';
import { articleHref, canUseSnapshot, officialRead, officialSite } from './official-data';
import type { PublicRecord } from '@/lib/public-content';

export async function TransparencyContent() {
  const [tenders, contracts] = await Promise.all([
    officialRead('tenders?per_page=5&locale=fa'),
    officialRead('contracts?per_page=5&locale=fa'),
  ]);
  const tenderItems: PublicRecord[] = Array.isArray(tenders.data)
    ? tenders.data
    : canUseSnapshot(tenders.unavailable)
      ? officialSite.news.filter((item) => item.type === 'tender')
      : [];
  const contractItems: PublicRecord[] = Array.isArray(contracts.data) ? contracts.data : [];
  return (
    <>
      <div className="section1-samane">
        <div className="top-section1-samane">
          <h3>سامانه شفافیت استانداری مازندران</h3>
        </div>
        <div className="bottom-section1-samane">
          <div className="steps-container">
            {transparencySteps.map((item, index) => (
              <div className="source-step-wrap" key={item.id}>
                <a className="step" href={item.href}>
                  <span>{item.title}</span>
                </a>
                {index < transparencySteps.length - 1 && (
                  <div className="line">
                    <div className="dot" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section3-samane">
        <div className="x9z-portal-wrapper">
          <div className="x9z-portal-grid">
            {transparencyCards.map((item) => (
              <a className="x9z-portal-card" href={item.href} key={item.id}>
                <div className="x9z-portal-icon">
                  <img className="immg2" src={item.icon} alt="" loading="lazy" />
                </div>
                <div className="x9z-portal-title">{item.title}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="section4-samane">
        {[
          { title: 'آخرین مناقصات ثبت شده؛', items: tenderItems, href: '/tenders' },
          { title: 'آخرین قراردادهای ثبت شده', items: contractItems, href: '/contracts' },
        ].map((section) => (
          <section className="box" key={section.href}>
            <h2 className="title">{section.title}</h2>
            <ul className="list">
              {section.items.map((item) => (
                <li key={String(item.id ?? item.slug)}>
                  <a href={articleHref(item)}>{item.title}</a>
                </li>
              ))}
              {!section.items.length && <li>مطلبی در این بخش منتشر نشده است.</li>}
            </ul>
            <a href={section.href}>مشاهدهٔ همه</a>
          </section>
        ))}
      </div>
    </>
  );
}
