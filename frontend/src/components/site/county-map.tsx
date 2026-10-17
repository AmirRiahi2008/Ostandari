'use client';

import { useId, useState } from 'react';
import { counties, officeHref } from '@/data/counties';

export function CountyMap() {
  const [selected, setSelected] = useState(counties.find((county) => county.slug === 'nur')!);
  const id = useId();
  return (
    <div className="container-naghshe portal-counties" id="counties">
      <div className="wrapper">
        <div className="lefttt portal-county-preview">
          <img id="cityImage" src={selected.image} alt="تصویر پرتال در طرح اصلی" loading="lazy" />
          <div className="portal-county-caption" aria-live="polite">
            فرمانداری {selected.name}
          </div>
          <a href={officeHref(selected)} className="left-ksks">
            ورود به پرتال {selected.name}
          </a>
        </div>
        <div className="righttt">
          <h2 className="title">فرمانداری‌ها</h2>
          <p className="portal-map-hint" id={id + '-hint'}>
            شهرستان موردنظر را روی نقشه یا از فهرست انتخاب کنید.
          </p>
          <div
            className="portal-map-viewport"
            tabIndex={0}
            aria-label="نقشه؛ در نمایش کوچک قابل پیمایش افقی است"
          >
            <svg
              className="map"
              viewBox="0 0 650 290"
              role="group"
              aria-label="نقشه فرمانداری‌های مازندران"
              aria-describedby={id + '-hint'}
            >
              {counties.map((county) => (
                <a
                  key={county.slug}
                  href={officeHref(county)}
                  aria-label={'ورود به فرمانداری ' + county.name}
                  data-county={county.slug}
                  className={
                    'county-region' + (selected.slug === county.slug ? ' is-selected' : '')
                  }
                  onMouseEnter={() => setSelected(county)}
                  onFocus={() => setSelected(county)}
                >
                  <title>{'فرمانداری ' + county.name}</title>
                  <path className="city" d={county.shape} />
                  <text
                    className="city-label"
                    x={county.label[0]}
                    y={county.label[1]}
                    textAnchor="middle"
                  >
                    {county.name}
                  </text>
                </a>
              ))}
            </svg>
          </div>
          <div className="portal-county-picker">
            <label htmlFor={id + '-select'}>انتخاب فرمانداری</label>
            <select
              id={id + '-select'}
              value={selected.slug}
              onChange={(event) =>
                setSelected(counties.find((county) => county.slug === event.target.value)!)
              }
            >
              {counties.map((county) => (
                <option key={county.slug} value={county.slug}>
                  {county.name}
                </option>
              ))}
            </select>
            <a className="portal-button" href={officeHref(selected)}>
              ورود به فرمانداری
            </a>
          </div>
          <details className="portal-county-directory">
            <summary>فهرست همهٔ فرمانداری‌ها</summary>
            <div className="portal-county-list">
              {counties.map((county) => (
                <a key={county.slug} href={officeHref(county)}>
                  {county.name}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
