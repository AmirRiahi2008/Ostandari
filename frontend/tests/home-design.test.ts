import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import postcss from 'postcss';
import { JSDOM } from 'jsdom';
import { mountHomeMotion } from '../src/features/site/home-motion';

function motionFixture(reduced = false, supported = true) {
  const window = new JSDOM(
    `
    <header><a href="/">هدر</a></header>
    <main class="source-main source-home"><div class="home-experience">
      <div class="source-slider">بنر</div>
      <section data-home-reveal><h2>اخبار</h2><a data-home-item href="/news">خبر</a></section>
      <section data-home-reveal>فرمانداری‌ها</section>
    </div></main><footer>فوتر</footer>
  `,
    { pretendToBeVisual: true },
  ).window;
  const root = window.document.querySelector<HTMLElement>('.home-experience')!;
  const listeners = new Set<() => void>();
  const records: { element: Element; cancelled: boolean; options: KeyframeAnimationOptions }[] = [];
  const observers: Observer[] = [];
  let reduce = reduced;
  const preference = {
    get matches() {
      return reduce;
    },
    addEventListener(_name: string, listener: () => void) {
      listeners.add(listener);
    },
    removeEventListener(_name: string, listener: () => void) {
      listeners.delete(listener);
    },
  };
  Object.defineProperty(window, 'matchMedia', { value: () => preference });
  class Observer {
    elements = new Set<Element>();
    disconnected = false;
    constructor(private callback: IntersectionObserverCallback) {
      observers.push(this);
    }
    observe(element: Element) {
      this.elements.add(element);
    }
    unobserve(element: Element) {
      this.elements.delete(element);
    }
    disconnect() {
      this.disconnected = true;
      this.elements.clear();
    }
    reveal(element: Element, intersects = true) {
      this.callback(
        [{ target: element, isIntersecting: intersects } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
    }
  }
  if (supported) {
    Object.defineProperty(window, 'IntersectionObserver', { value: Observer });
    Object.defineProperty(window.Element.prototype, 'animate', {
      value(this: Element, _frames: Keyframe[], options: KeyframeAnimationOptions) {
        const record = { element: this, cancelled: false, options };
        records.push(record);
        return {
          finished: new Promise(() => {}),
          cancel() {
            record.cancelled = true;
          },
        };
      },
    });
  }
  return {
    window,
    root,
    records,
    observers,
    listeners,
    changePreference(value: boolean) {
      reduce = value;
      listeners.forEach((listener) => listener());
    },
  };
}

test('homepage reveals are limited to content, run once on intersection and release their observer', () => {
  const fixture = motionFixture();
  const { root, records, observers } = fixture;
  const cleanup = mountHomeMotion(root);
  try {
    assert.equal(observers.length, 1);
    assert.equal(observers[0].elements.size, 2);
    assert.equal(records.length, 0);
    const section = root.querySelector('section')!;
    observers[0].reveal(section, false);
    assert.equal(records.length, 0);
    observers[0].reveal(section);
    assert.equal(records.length, 2);
    assert.ok(records.every((record) => root.contains(record.element)));
    assert.ok(records.every((record) => !record.element.matches('.source-slider, header, footer')));
    assert.ok(records.every((record) => Number(record.options.duration) <= 620));
    assert.equal(observers[0].elements.has(section), false);
    observers[0].reveal(section);
    assert.equal(records.length, 2);
  } finally {
    cleanup();
    assert.equal(observers[0].disconnected, true);
    assert.ok(records.every((record) => record.cancelled));
    assert.equal(fixture.listeners.size, 0);
    fixture.window.close();
  }
});

test('changing reduced-motion preferences cancels running effects and does not replay visited sections', () => {
  const fixture = motionFixture(true);
  const cleanup = mountHomeMotion(fixture.root);
  try {
    assert.equal(fixture.observers.length, 0);
    fixture.changePreference(false);
    const first = fixture.root.querySelector('section')!;
    fixture.observers[0].reveal(first);
    assert.equal(fixture.records.length, 2);
    fixture.changePreference(true);
    assert.ok(fixture.records.every((record) => record.cancelled));
    fixture.changePreference(false);
    assert.equal(fixture.observers.at(-1)!.elements.size, 1);
    fixture.observers.at(-1)!.reveal(first);
    assert.equal(fixture.records.length, 2);
  } finally {
    cleanup();
    fixture.window.close();
  }
});

test('unsupported motion APIs leave every homepage section and link visible and usable', () => {
  const fixture = motionFixture(false, false);
  const cleanup = mountHomeMotion(fixture.root);
  try {
    assert.equal(fixture.observers.length, 0);
    for (const section of fixture.root.querySelectorAll<HTMLElement>('section')) {
      assert.equal(section.hidden, false);
      assert.notEqual(fixture.window.getComputedStyle(section).opacity, '0');
    }
    assert.equal(fixture.root.querySelector('a')!.getAttribute('href'), '/news');
  } finally {
    cleanup();
    fixture.window.close();
  }
});

test('homepage CSS is scoped to its content and preserves the complete slide image', () => {
  const sheet = postcss.parse(fs.readFileSync('public/styles/home-page.css', 'utf8'));
  sheet.walkRules((rule) => {
    if (rule.parent?.type === 'atrule' && rule.parent.name === 'keyframes') return;
    for (const selector of rule.selectors) {
      assert.ok(selector.startsWith('.source-home .home-experience'), selector);
      assert.doesNotMatch(
        selector,
        /\.header-container|\[data-react-header\]|\.desktop-menu|\[data-source-footer\]/,
      );
    }
  });
  assert.ok(
    sheet.nodes.some(
      (node) =>
        node.type === 'atrule' &&
        node.name === 'media' &&
        node.params === '(prefers-reduced-motion: reduce)',
    ),
  );
  const window = new JSDOM(`
    <div data-section="site" data-design="design-site-4ef1b18102d366">
      <main class="source-main source-home"><div class="home-experience">
        <div class="container-body"><div class="container-body-center"></div><div class="container-body-right"><div class="source-slider"><div class="swiper-slide"><img></div></div></div></div>
        <div class="container-peyvand"><div class="mz-portal-wrapper"><div class="mz-links-grid"><a class="mz-link-btn">پیوند</a></div></div></div>
      </div></main>
    </div>
  `).window;
  try {
    for (const file of [
      'public/design/pages/design-site-4ef1b18102d366.css',
      'src/styles/public-site.css',
      'public/styles/home-page.css',
    ]) {
      const style = window.document.createElement('style');
      style.textContent = fs.readFileSync(file, 'utf8');
      window.document.head.append(style);
    }
    const style = (selector: string) =>
      window.getComputedStyle(window.document.querySelector(selector)!);
    assert.equal(style('.container-body').display, 'grid');
    assert.equal(style('.mz-portal-wrapper').display, 'grid');
    assert.equal(style('.mz-link-btn').width, '100%');
    assert.equal(style('.container-body-center').boxSizing, 'border-box');
    assert.equal(style('.source-slider img').objectFit, 'contain');
  } finally {
    window.close();
  }
});
