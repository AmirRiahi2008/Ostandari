import test from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { ReportsPanel } from '../src/components/admin/reports/reports-panel';
import { ReportDetail } from '../src/components/admin/reports/report-detail';
import { ReportEditor } from '../src/components/admin/reports/report-editor';
import { resolveReportEditor } from '../src/lib/admin-routes';
import { templates } from '../src/lib/templates';
import { templateViews } from '../src/views';
import { renderReports } from '../src/features/citizen/render';
import { ticketStatuses } from '../src/data/ticket-status';
import {
  reportOverdue,
  reportQuery,
  type CitizenReport,
  type ReportOptions,
} from '../src/features/admin/reports';

const window = new JSDOM('', {
  url: 'https://ostandari.vercel.app/admin/reports',
  pretendToBeVisual: true,
}).window;
for (const name of [
  'window',
  'document',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLTextAreaElement',
  'Element',
  'Node',
  'FormData',
] as const) {
  Object.defineProperty(globalThis, name, {
    value: name === 'window' ? window : (window as unknown as Record<string, unknown>)[name],
    configurable: true,
  });
}
Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', { value: true, configurable: true });
const client = import('react-dom/client');
const originalFetch = globalThis.fetch;
const options: ReportOptions = {
  organizations: [
    { id: 3, name: 'فرمانداری ساری' },
    { id: 4, name: 'ادارهٔ رسیدگی' },
  ],
  counties: [{ id: 2, name: 'ساری' }],
  assignees: [
    { id: 5, name: 'کارشناس پاسخ', organization_ids: [3] },
    { id: 6, name: 'کارشناس اداره', organization_ids: [4] },
  ],
};
function report(): CitizenReport {
  return {
    id: 10,
    reference: '01KA0000000000000000000001',
    subject: 'گزارش پسماند محله',
    body: 'متن شهروند <script>alert(1)</script>',
    type: 'report',
    category: 'waste',
    status: 'pending',
    urgency: 'urgent',
    organization_id: 3,
    assigned_to: null,
    owner: { id: 7, name: 'شهروند نمونه' },
    county: { id: 2, name: 'ساری' },
    organization: options.organizations[0],
    assignee: null,
    address: 'نشانی ثبت‌شده',
    due_at: '2020-01-01T00:00:00Z',
    created_at: '2019-12-25T00:00:00Z',
    updated_at: '2026-10-19T09:00:00Z',
    media: [{ id: 99, original_name: 'پیوست خصوصی.pdf' }],
    messages: [],
    events: [
      {
        id: 1,
        from_status: null,
        to_status: 'pending',
        note: null,
        created_at: '2019-12-25T00:00:00Z',
      },
    ],
  };
}
type Call = { url: URL; method: string; body?: Record<string, unknown> };

function server(initial = report()) {
  const calls: Call[] = [];
  let current = initial;
  let failure = false;
  globalThis.fetch = async (input, init) => {
    const url = new URL(String(input), 'https://ostandari.vercel.app');
    const method = init?.method ?? 'GET';
    const body =
      typeof init?.body === 'string'
        ? (JSON.parse(init.body) as Record<string, unknown>)
        : undefined;
    calls.push({ url, method, body });
    if (failure && url.pathname.endsWith('/reports'))
      return Response.json({ message: 'Forbidden' }, { status: 403 });
    if (url.pathname.endsWith('/reports/options'))
      return Response.json({ success: true, data: options });
    if (url.pathname.endsWith('/reports'))
      return Response.json({
        success: true,
        data: [current],
        meta: {
          current_page: Number(url.searchParams.get('page')),
          last_page: 2,
          total: 21,
          per_page: 20,
        },
        summary: { total: 21, pending: 12, active: 5, overdue: 4 },
      });
    if (method === 'PATCH') {
      const old = current.status;
      current = {
        ...current,
        ...body,
        organization: options.organizations.find(
          (org) => org.id === (body?.organization_id ?? current.organization_id),
        )!,
        events: [
          ...current.events!,
          {
            id: current.events!.length + 1,
            from_status: old,
            to_status: (body?.status ?? old) as CitizenReport['status'],
            note: String(body?.note ?? ''),
            created_at: '2026-10-19T09:05:00Z',
          },
        ],
      };
    }
    if (method === 'POST')
      current = {
        ...current,
        messages: [
          ...current.messages!,
          {
            id: current.messages!.length + 1,
            body: String(body?.body),
            is_internal: Boolean(body?.is_internal),
            author: { id: 5, name: 'کارشناس پاسخ' },
            created_at: '2026-10-19T09:05:00Z',
          },
        ],
      };
    return Response.json({ success: true, data: current });
  };
  return {
    calls,
    fail: (value: boolean) => {
      failure = value;
    },
  };
}

async function mount(element: React.ReactNode) {
  const { createRoot } = await client;
  const container = window.document.createElement('div');
  window.document.body.replaceChildren(container);
  const root = createRoot(container);
  await act(async () => {
    root.render(element);
  });
  return {
    container,
    unmount: async () => {
      await act(async () => root.unmount());
      globalThis.fetch = originalFetch;
    },
  };
}

async function change(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
) {
  await act(async () => {
    const prototype =
      element.tagName === 'TEXTAREA'
        ? window.HTMLTextAreaElement.prototype
        : element.tagName === 'SELECT'
          ? window.HTMLSelectElement.prototype
          : window.HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
    element.dispatchEvent(
      new window.Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }),
    );
  });
}

async function submit(form: HTMLFormElement) {
  await act(async () =>
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })),
  );
}

test('every supplied admin navigation opens the citizen reports page rather than public services', () => {
  let count = 0;
  for (const page of templates.filter((page) => page.group === 'admin')) {
    const document = new JSDOM(
      renderToStaticMarkup(
        React.createElement(templateViews[page.id as keyof typeof templateViews]),
      ),
    ).window.document;
    for (const link of document.querySelectorAll('.portal-module-menu a[href="/admin/reports"]')) {
      assert.equal(link.getAttribute('href'), '/admin/reports', page.path);
      count++;
    }
  }
  assert.ok(count >= 17);
});

test('preview mode never loads private citizen data or substitutes invented report records', async () => {
  const { calls } = server();
  const { container, unmount } = await mount(React.createElement(ReportsPanel, { preview: true }));
  try {
    assert.equal(calls.length, 0);
    assert.match(container.textContent ?? '', /گزارش واقعی بارگیری نمی‌شود/);
    assert.equal(container.querySelector('[data-report-reference]'), null);
  } finally {
    await unmount();
  }
});

test('the reports queue loads real records, scoped choices and statistics and preserves filters during pagination', async () => {
  const { calls } = server();
  const { container, unmount } = await mount(React.createElement(ReportsPanel, { preview: false }));
  try {
    assert.match(container.textContent ?? '', /گزارش پسماند محله/);
    assert.match(container.textContent ?? '', /شهروند نمونه/);
    assert.equal(container.querySelectorAll('.reports-stats strong').length, 4);
    assert.match(container.querySelector('.reports-stats')?.textContent ?? '', /۲۱/);
    const form = container.querySelector<HTMLFormElement>('.reports-filters')!;
    await change(form.querySelector<HTMLInputElement>('[name="q"]')!, 'پسماند');
    await change(form.querySelector<HTMLSelectElement>('[name="status"]')!, 'pending');
    await change(form.querySelector<HTMLSelectElement>('[name="county_id"]')!, '2');
    await submit(form);
    const next = [...container.querySelectorAll<HTMLButtonElement>('button')].find(
      (button) => button.textContent === 'صفحهٔ بعد',
    )!;
    await act(async () => next.click());
    const list = calls.filter((call) => call.url.pathname.endsWith('/reports')).at(-1)!;
    assert.equal(list.url.searchParams.get('page'), '2');
    assert.equal(list.url.searchParams.get('q'), 'پسماند');
    assert.equal(list.url.searchParams.get('county_id'), '2');
    assert.equal(list.url.searchParams.get('status'), 'pending');
    assert.equal(
      calls.some((call) => call.url.pathname.includes('/services')),
      false,
    );
  } finally {
    await unmount();
  }
});

test('permission failures show an error and retry without showing an empty successful queue', async () => {
  const stub = server();
  stub.fail(true);
  const { container, unmount } = await mount(React.createElement(ReportsPanel, { preview: false }));
  try {
    assert.match(container.querySelector('[role="alert"]')?.textContent ?? '', /مجوز رسیدگی/);
    assert.doesNotMatch(container.textContent ?? '', /گزارشی با این فیلترها وجود ندارد/);
    stub.fail(false);
    await act(async () =>
      [...container.querySelectorAll<HTMLButtonElement>('button')]
        .find((button) => button.textContent === 'تلاش دوباره')!
        .click(),
    );
    assert.ok(container.querySelector('[data-report-reference]'));
  } finally {
    await unmount();
  }
});

test('the reports list opens a separate response page with the full conversation and private attachments', async () => {
  server();
  const listing = await mount(React.createElement(ReportsPanel, { preview: false }));
  const link = listing.container.querySelector<HTMLAnchorElement>('[data-report-reference] a')!;
  const reference = resolveReportEditor(new URL(link.href).pathname);
  assert.ok(reference);
  assert.equal(listing.container.querySelector('.reports-detail'), null);
  await listing.unmount();
  server();
  const { container, unmount } = await mount(
    React.createElement(ReportEditor, { reference, preview: false }),
  );
  try {
    assert.equal(window.document.activeElement, container.querySelector('.reports-detail h2'));
    assert.match(
      container.querySelector('.reports-original')?.textContent ?? '',
      /<script>alert\(1\)<\/script>/,
    );
    assert.equal(container.querySelector('.reports-original script'), null);
    assert.equal(
      container.querySelector('.reports-attachments a')?.getAttribute('href'),
      '/api/backend/media/99/download',
    );
    assert.ok(container.querySelector('a[href="/admin/reports"]'));
    assert.match(container.textContent!, /بازگشت به فهرست گزارش‌ها/);
  } finally {
    await unmount();
  }
});

test('public replies and internal notes use the message endpoint separately from status updates and block double submissions', async () => {
  const { calls } = server();
  const { container, unmount } = await mount(
    React.createElement(ReportDetail, {
      reference: report().reference,
      options,
      onClose() {},
      onChanged() {},
      onBusy() {},
    }),
  );
  try {
    const form = container.querySelector<HTMLFormElement>(
      'form[aria-label="ارسال پاسخ یا یادداشت داخلی"]',
    )!;
    await change(form.querySelector<HTMLTextAreaElement>('textarea')!, 'پاسخ شهروند');
    await act(async () => {
      form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
    });
    assert.equal(calls.filter((call) => call.method === 'POST').length, 1);
    assert.deepEqual(calls.find((call) => call.method === 'POST')?.body, {
      body: 'پاسخ شهروند',
      is_internal: false,
    });
    assert.match(container.querySelector('.reports-messages')?.textContent ?? '', /پاسخ شهروند/);
    assert.equal(form.querySelector<HTMLTextAreaElement>('textarea')!.value, '');
    await act(async () => form.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click());
    await change(form.querySelector<HTMLTextAreaElement>('textarea')!, 'یادداشت خصوصی');
    await submit(form);
    assert.equal(calls.filter((call) => call.method === 'PATCH').length, 0);
    assert.equal(calls.filter((call) => call.method === 'POST').at(-1)?.body?.is_internal, true);
    assert.match(
      container.querySelector('[data-internal="true"]')?.textContent ?? '',
      /یادداشت خصوصی/,
    );
  } finally {
    await unmount();
  }
});

test('closed reports disable replies; reopening restores the composer and assignment choices follow their organization', async () => {
  const ticket = report();
  ticket.status = 'closed';
  server(ticket);
  const { container, unmount } = await mount(
    React.createElement(ReportDetail, {
      reference: ticket.reference,
      options,
      onClose() {},
      onChanged() {},
      onBusy() {},
    }),
  );
  try {
    const composer = () =>
      container.querySelector<HTMLFieldSetElement>(
        'form[aria-label="ارسال پاسخ یا یادداشت داخلی"] fieldset',
      )!;
    assert.equal(composer().disabled, true);
    const form = container.querySelector<HTMLFormElement>(
      'form[aria-label="تغییر وضعیت و ارجاع"]',
    )!;
    assert.deepEqual(
      [...form.querySelector<HTMLSelectElement>('[name="status"]')!.options].map(
        (option) => option.value,
      ),
      ['closed', 'review'],
    );
    await change(form.querySelector<HTMLSelectElement>('[name="organization_id"]')!, '4');
    assert.equal(form.querySelector('[name="assigned_to"] option[value="5"]'), null);
    assert.ok(form.querySelector('[name="assigned_to"] option[value="6"]'));
    await change(form.querySelector<HTMLSelectElement>('[name="status"]')!, 'review');
    await submit(form);
    assert.equal(composer().disabled, false);
    assert.match(container.querySelector('.reports-history')?.textContent ?? '', /در حال بررسی/);
  } finally {
    await unmount();
  }
});

test('all six statuses display their actual Persian labels in the citizen tracking panel', () => {
  const root = window.document.createElement('div');
  root.innerHTML = '<div id="reports-list"></div>';
  const records = Object.entries(ticketStatuses).map(([status], index) => ({
    id: index + 1,
    reference: 'REF' + index,
    status,
    subject: status,
  }));
  renderReports(root, records);
  assert.deepEqual(
    [...root.querySelectorAll('.status-badge span')].map((span) => span.textContent),
    Object.values(ticketStatuses),
  );
});

test('overdue excludes completed, rejected and closed records and filter encoding omits empty fields', () => {
  for (const status of ['resolved', 'rejected', 'closed'] as const)
    assert.equal(reportOverdue({ status, due_at: '2020-01-01T00:00:00Z' }), false);
  assert.equal(reportOverdue({ status: 'review', due_at: '2020-01-01T00:00:00Z' }), true);
  const data = new FormData();
  data.set('q', '  متن  ');
  data.set('status', '');
  data.set('overdue', '1');
  assert.equal(reportQuery(data), 'q=%D9%85%D8%AA%D9%86&overdue=1');
});

test('returning to the reports list restores filter controls, API filters and the selected page', async () => {
  window.history.replaceState(
    {},
    '',
    '/admin/reports?status=review&county_id=2&q=selected&order=newest&page=2',
  );
  const service = server();
  const { container, unmount } = await mount(React.createElement(ReportsPanel, { preview: false }));
  try {
    const request = service.calls.find((call) => call.url.pathname.endsWith('/reports'))!;
    assert.equal(request.url.searchParams.get('status'), 'review');
    assert.equal(request.url.searchParams.get('county_id'), '2');
    assert.equal(request.url.searchParams.get('q'), 'selected');
    assert.equal(request.url.searchParams.get('page'), '2');
    assert.equal(
      container.querySelector<HTMLSelectElement>('select[name="status"]')!.value,
      'review',
    );
    assert.equal(
      container.querySelector<HTMLSelectElement>('select[name="county_id"]')!.value,
      '2',
    );
    assert.equal(container.querySelector<HTMLInputElement>('input[name="q"]')!.value, 'selected');
    const editor = new URL(
      container.querySelector<HTMLAnchorElement>('[data-report-reference] a')!.href,
    );
    const back = new URL(editor.searchParams.get('return')!, window.location.origin);
    assert.equal(back.searchParams.get('status'), 'review');
    assert.equal(back.searchParams.get('page'), '2');
  } finally {
    await unmount();
    window.history.replaceState({}, '', '/admin/reports');
  }
});
