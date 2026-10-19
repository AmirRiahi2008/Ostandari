import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { CountyMap } from '../src/components/site/county-map';
import { counties, officeHref } from '../src/data/counties';
import {
  countyLabelLeader,
  countyMapBounds,
  countyMapLabelHeight,
  countyMapLabels,
  type CountyMapLabel,
} from '../src/data/county-map-layout';

type Point = readonly [number, number];

// Sample the original SVG curves so geography checks do not rely on label metadata.
function polygon(path: string): Point[] {
  const tokens = path.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?/g)!;
  const points: Point[] = [];
  let current: Point = [0, 0];
  let start: Point = current;
  let command = '';
  let index = 0;
  const number = () => Number(tokens[index++]);
  while (index < tokens.length) {
    if (/^[a-zA-Z]$/.test(tokens[index])) command = tokens[index++];
    const relative = command === command.toLowerCase();
    const point = (): Point => [
      number() + (relative ? current[0] : 0),
      number() + (relative ? current[1] : 0),
    ];
    switch (command.toLowerCase()) {
      case 'm':
        current = point();
        start = current;
        points.push(current);
        command = relative ? 'l' : 'L';
        break;
      case 'l':
        current = point();
        points.push(current);
        break;
      case 'h':
        current = [number() + (relative ? current[0] : 0), current[1]];
        points.push(current);
        break;
      case 'c': {
        const [a, b, end] = [point(), point(), point()];
        for (let step = 1; step <= 24; step++) {
          const t = step / 24;
          const u = 1 - t;
          points.push(
            [0, 1].map(
              (axis) =>
                u ** 3 * current[axis] +
                3 * u ** 2 * t * a[axis] +
                3 * u * t ** 2 * b[axis] +
                t ** 3 * end[axis],
            ) as [number, number],
          );
        }
        current = end;
        break;
      }
      case 'z':
        current = start;
        points.push(start);
        command = '';
        break;
      default:
        assert.fail('Unsupported original map command: ' + command);
    }
  }
  return points;
}

function inside(point: Point, polygon: Point[]): boolean {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [x, y] = point;
    const [ax, ay] = polygon[i];
    const [bx, by] = polygon[j];
    if (ay > y !== by > y && x < ((bx - ax) * (y - ay)) / (by - ay) + ax) result = !result;
  }
  return result;
}

function bounds(label: CountyMapLabel) {
  return {
    left: label.position[0] - label.width / 2,
    right: label.position[0] + label.width / 2,
    top: label.position[1] - countyMapLabelHeight / 2,
    bottom: label.position[1] + countyMapLabelHeight / 2,
  };
}

test('all 22 complete county badges fit inside the map with no overlapping names', () => {
  assert.deepEqual(
    Object.keys(countyMapLabels).sort(),
    counties.map((county) => county.slug).sort(),
  );
  for (const [index, county] of counties.entries()) {
    const box = bounds(countyMapLabels[county.slug]);
    assert.ok(box.left >= countyMapBounds.x + 8, county.slug);
    assert.ok(box.top >= countyMapBounds.y + 8, county.slug);
    assert.ok(box.right <= countyMapBounds.x + countyMapBounds.width - 8, county.slug);
    assert.ok(box.bottom <= countyMapBounds.y + countyMapBounds.height - 8, county.slug);
    for (const other of counties.slice(index + 1)) {
      const next = bounds(countyMapLabels[other.slug]);
      assert.ok(
        box.right + 4 <= next.left ||
          next.right + 4 <= box.left ||
          box.bottom + 4 <= next.top ||
          next.bottom + 4 <= box.top,
        county.slug + ' overlaps ' + other.slug,
      );
    }
  }
});

test('every leader points inside its own original county; unconnected names sit inside their county', () => {
  for (const county of counties) {
    const label = countyMapLabels[county.slug];
    const shape = polygon(county.shape);
    assert.ok(inside(label.anchor, shape), county.slug + ' anchor');
    if (!label.callout) assert.ok(inside(label.position, shape), county.slug + ' name');
  }
});

test('callouts reach their own badge edges without running through any other county name', () => {
  for (const county of counties) {
    const label = countyMapLabels[county.slug];
    const path = countyLabelLeader(label);
    if (!label.callout) {
      assert.equal(path, undefined);
      continue;
    }
    const values = path!.match(/[-+]?(?:\d*\.\d+|\d+)/g)!.map(Number);
    assert.ok(values.every(Number.isFinite), county.slug);
    const points: Point[] = [];
    for (let i = 0; i < values.length; i += 2) points.push([values[i], values[i + 1]]);
    assert.deepEqual(points[0], label.anchor);
    const [x, y] = points.at(-1)!;
    const box = bounds(label);
    assert.ok(
      x >= box.left - 0.01 &&
        x <= box.right + 0.01 &&
        y >= box.top - 0.01 &&
        y <= box.bottom + 0.01,
      county.slug,
    );
    assert.ok(
      Math.min(
        Math.abs(x - box.left),
        Math.abs(x - box.right),
        Math.abs(y - box.top),
        Math.abs(y - box.bottom),
      ) < 0.01,
      county.slug + ' edge',
    );
    for (let i = 1; i < points.length; i++) {
      const [a, b] = [points[i - 1], points[i]];
      const steps = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 4);
      for (const other of counties) {
        if (other === county) continue;
        const target = bounds(countyMapLabels[other.slug]);
        for (let step = 0; step <= steps; step++) {
          const t = step / steps;
          const px = a[0] + (b[0] - a[0]) * t;
          const py = a[1] + (b[1] - a[1]) * t;
          assert.ok(
            px <= target.left || px >= target.right || py <= target.top || py >= target.bottom,
            county.slug + ' crosses ' + other.slug,
          );
        }
      }
    }
  }
});

test('all names paint above every county shape and display their full single-line name and correct destination', () => {
  const document = new JSDOM(renderToStaticMarkup(React.createElement(CountyMap))).window.document;
  const svg = document.querySelector('svg.map')!;
  assert.deepEqual(
    [...svg.children].map((child) => child.getAttribute('class')),
    ['county-shape-layer', 'county-connection-layer', 'county-label-layer'],
  );
  assert.equal(svg.querySelectorAll('.county-map-label').length, 22);
  for (const county of counties) {
    const label = svg.querySelector('[data-label-county="' + county.slug + '"]')!;
    assert.equal(label.querySelector('text')?.textContent, county.name);
    assert.equal(label.querySelector('tspan'), null);
    assert.equal(label.getAttribute('href'), officeHref(county));
    assert.equal(label.getAttribute('tabindex'), '-1');
    assert.equal(label.parentElement?.getAttribute('aria-hidden'), 'true');
    const dot = svg.querySelector('[data-connection-county="' + county.slug + '"] circle');
    const layout = countyMapLabels[county.slug];
    if (layout.callout) {
      assert.equal(Number(dot?.getAttribute('cx')), layout.anchor[0]);
      assert.equal(Number(dot?.getAttribute('cy')), layout.anchor[1]);
    } else assert.equal(dot, null);
  }
});

test('hovering every county name updates the correct preview, region, connection and portal link', async () => {
  const window = new JSDOM('', { url: 'https://ostandari.vercel.app', pretendToBeVisual: true })
    .window;
  for (const name of ['window', 'document', 'HTMLElement', 'Element', 'Node'] as const) {
    Object.defineProperty(globalThis, name, {
      value: name === 'window' ? window : (window as unknown as Record<string, unknown>)[name],
      configurable: true,
    });
  }
  Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', {
    value: true,
    configurable: true,
  });
  const container = window.document.createElement('div');
  window.document.body.append(container);
  const root = createRoot(container);
  await act(async () => root.render(React.createElement(CountyMap)));
  try {
    for (const county of counties) {
      const label = container.querySelector('[data-label-county="' + county.slug + '"]')!;
      await act(async () =>
        label.dispatchEvent(
          new window.MouseEvent('mouseover', {
            bubbles: true,
            relatedTarget: window.document.body,
          }),
        ),
      );
      assert.equal(
        container.querySelector('.portal-county-preview')?.getAttribute('data-preview-county'),
        county.slug,
      );
      assert.equal(
        container.querySelector('.county-region.is-selected')?.getAttribute('data-county'),
        county.slug,
      );
      assert.equal(container.querySelector('.county-map-label.is-selected'), label);
      assert.equal(
        container.querySelector('.portal-county-caption')?.textContent,
        'فرمانداری ' + county.name,
      );
      assert.equal(container.querySelector('.left-ksks')?.getAttribute('href'), officeHref(county));
      const connection = container.querySelector('.county-connection-layer .is-selected');
      assert.equal(
        connection?.getAttribute('data-connection-county'),
        countyMapLabels[county.slug].callout ? county.slug : undefined,
      );
    }
  } finally {
    await act(async () => root.unmount());
    window.close();
  }
});
