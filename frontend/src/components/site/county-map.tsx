'use client';

import { useId, useState } from 'react';
import { counties, countyPreviewTemplate, officeHref } from '@/data/counties';
import { CountyArtwork } from './county-artwork';
import {
  countyMapViewBox,
  countyMapLabels,
  countyMapLabelHeight,
  countyLabelLeader,
} from '@/data/county-map-layout';

export function CountyMap() {
  const [selected, setSelected] = useState(counties.find((county) => county.slug === 'sari')!);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const id = useId();
  const useTemplate = selected.usesPreviewTemplate || failedImages.includes(selected.slug);
  const image = useTemplate ? countyPreviewTemplate : selected.previewImage;
  const select = (slug: string) => {
    const county = counties.find((item) => item.slug === slug);
    if (county) setSelected(county);
  };
  return (
    <div className="container-naghshe portal-counties source-county-map" id="counties">
      <div className="wrapper">
        <div className="lefttt portal-county-preview" data-preview-county={selected.slug}>
          <CountyArtwork
            key={selected.slug + '-' + String(useTemplate)}
            id="cityImage"
            county={selected}
            image={image}
            template={useTemplate}
            onError={() =>
              setFailedImages((previous) =>
                previous.includes(selected.slug) ? previous : [...previous, selected.slug],
              )
            }
          />
          <div className="portal-county-preview-body">
            <div
              className="portal-county-caption"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              فرمانداری {selected.name}
            </div>
            <a href={officeHref(selected)} className="left-ksks">
              ورود به پرتال {selected.name}
              <span aria-hidden="true">←</span>
            </a>
          </div>
        </div>
        <div className="righttt">
          <h2 className="title">فرمانداری‌ها</h2>
          <p className="portal-map-hint" id={id + '-hint'}>
            برای دیدن فرمانداری، روی نام یا محدودهٔ شهرستان بروید و برای ورود کلیک کنید.
          </p>
          <div
            className="portal-map-viewport"
            tabIndex={0}
            aria-label="نقشهٔ شهرستان‌ها؛ در نمایش کوچک قابل پیمایش افقی است"
          >
            <svg
              className="map"
              viewBox={countyMapViewBox}
              role="group"
              aria-label="نقشه فرمانداری‌های مازندران"
              aria-describedby={id + '-hint'}
            >
              <g className="county-shape-layer">
                {counties.map((county) => (
                  <a
                    key={county.slug}
                    href={officeHref(county)}
                    aria-label={'ورود به فرمانداری ' + county.name}
                    data-county={county.slug}
                    tabIndex={0}
                    className={
                      'county-region' + (selected.slug === county.slug ? ' is-selected' : '')
                    }
                    onMouseEnter={() => setSelected(county)}
                    onPointerEnter={() => setSelected(county)}
                    onFocus={() => setSelected(county)}
                  >
                    <title>{'فرمانداری ' + county.name}</title>
                    <path className="city" d={county.shape} vectorEffect="non-scaling-stroke" />
                  </a>
                ))}
              </g>
              <g className="county-connection-layer" aria-hidden="true">
                {counties.map((county) => {
                  const label = countyMapLabels[county.slug];
                  if (!label.callout) return null;
                  return (
                    <g
                      key={county.slug}
                      className={selected.slug === county.slug ? 'is-selected' : undefined}
                      data-connection-county={county.slug}
                    >
                      <path
                        className="county-label-leader"
                        d={countyLabelLeader(label)}
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle
                        className="county-label-dot"
                        cx={label.anchor[0]}
                        cy={label.anchor[1]}
                        r={2.4}
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  );
                })}
              </g>
              <g className="county-label-layer" aria-hidden="true">
                {counties.map((county) => {
                  const label = countyMapLabels[county.slug];
                  return (
                    <a
                      key={county.slug}
                      href={officeHref(county)}
                      tabIndex={-1}
                      className={
                        'county-map-label' + (selected.slug === county.slug ? ' is-selected' : '')
                      }
                      data-label-county={county.slug}
                      onMouseEnter={() => setSelected(county)}
                      onPointerEnter={() => setSelected(county)}
                      onFocus={() => setSelected(county)}
                    >
                      <rect
                        className="county-label-box"
                        x={label.position[0] - label.width / 2}
                        y={label.position[1] - countyMapLabelHeight / 2}
                        width={label.width}
                        height={countyMapLabelHeight}
                        rx={5}
                        vectorEffect="non-scaling-stroke"
                      />
                      <text
                        className="city-label"
                        x={label.position[0]}
                        y={label.position[1]}
                        textAnchor="middle"
                        dominantBaseline="central"
                        direction="rtl"
                      >
                        {county.name}
                      </text>
                    </a>
                  );
                })}
              </g>
            </svg>
          </div>
          <div className="portal-county-picker">
            <label htmlFor={id + '-select'}>انتخاب فرمانداری</label>
            <select
              id={id + '-select'}
              value={selected.slug}
              onChange={(event) => select(event.target.value)}
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
                <a
                  key={county.slug}
                  href={officeHref(county)}
                  onMouseEnter={() => setSelected(county)}
                  onPointerEnter={() => setSelected(county)}
                  onFocus={() => setSelected(county)}
                  aria-current={selected.slug === county.slug ? 'true' : undefined}
                >
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
