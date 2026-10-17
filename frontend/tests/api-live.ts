import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { forward, SESSION_COOKIE } from '../src/lib/api/proxy';

const password = process.env.TEST_ADMIN_PASSWORD;
if (!password) throw new Error('Set TEST_ADMIN_PASSWORD for the local test backend administrator.');
const checks: { method: string; path: string; status: number }[] = [];
let adminCookie = '';
let citizenCookie = '';
let faqId: number | undefined;
let pollId: number | undefined;
const optionIds: number[] = [];

async function call(method: string, path: string, body?: unknown, cookie = '', expected = 200) {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    Origin: 'http://127.0.0.1:3000',
    Host: '127.0.0.1:3000',
  };
  if (body !== undefined && !(body instanceof FormData))
    headers['Content-Type'] = 'application/json';
  if (cookie) headers.Cookie = cookie;
  const request = new NextRequest('http://127.0.0.1:3000/api/backend/' + path, {
    method,
    headers,
    body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
  });
  const response = await forward(request, path.split('/'));
  const payload = response.status === 204 ? null : await response.json();
  assert.equal(response.status, expected, method + ' ' + path + ': ' + JSON.stringify(payload));
  if (payload) assert.equal(payload.success, expected < 400);
  checks.push({ method, path, status: response.status });
  const session = response.cookies.get(SESSION_COOKIE)?.value;
  return {
    data: payload?.data,
    cookie: session ? SESSION_COOKIE + '=' + encodeURIComponent(session) : '',
  };
}

async function main() {
  try {
    await call('GET', 'health');
    adminCookie = (await call('POST', 'auth/login', { login: 'admin', password })).cookie;
    assert.ok(adminCookie);
    await call('GET', 'auth/me', undefined, adminCookie);
    const faq = await call(
      'POST',
      'admin/faqs',
      {
        question: 'تست اتصال فرانت و لاراول ' + Date.now(),
        answer: 'پاسخ ذخیره‌شده در MySQL',
        locale: 'fa',
        is_active: true,
      },
      adminCookie,
      201,
    );
    faqId = faq.data.id;
    await call('PATCH', 'admin/faqs/' + faqId, { answer: 'پاسخ ویرایش‌شده' }, adminCookie);
    assert.equal((await call('GET', 'faqs/' + faqId)).data.answer, 'پاسخ ویرایش‌شده');
    await call('POST', 'auth/logout', {}, adminCookie, 204);
    await call('GET', 'admin/faqs', undefined, '', 401);
    const challenge = (
      await call('POST', 'auth/otp/request', {
        name: 'کاربر آزمایشی',
        mobile: '09120000111',
        national_code: '1234567891',
      })
    ).data;
    assert.ok(challenge.dev_code, 'Run the test backend in local OTP log mode.');
    citizenCookie = (
      await call('POST', 'auth/otp/verify', {
        challenge_id: challenge.challenge_id,
        code: challenge.dev_code,
      })
    ).cookie;
    assert.equal(
      (await call('GET', 'auth/me', undefined, citizenCookie)).data.person_type,
      'citizen',
    );
    await call('GET', 'admin/faqs', undefined, citizenCookie, 403);
    const ticket = (
      await call(
        'POST',
        'citizen/tickets',
        {
          type: 'governor',
          subject: 'اتصال فرانت',
          body: 'این پیام از مسیر واقعی پراکسی فرانت به دیتابیس MySQL ثبت شد.',
        },
        citizenCookie,
        201,
      )
    ).data;
    assert.equal(
      (await call('GET', 'citizen/tickets/' + ticket.reference, undefined, citizenCookie)).data
        .subject,
      'اتصال فرانت',
    );
    adminCookie = (await call('POST', 'auth/login', { login: 'admin', password })).cookie;
    await call('PATCH', 'admin/tickets/' + ticket.reference, { status: 'review' }, adminCookie);
    await call(
      'POST',
      'admin/tickets/' + ticket.reference + '/messages',
      { body: 'پاسخ آزمایشی کارشناس' },
      adminCookie,
      201,
    );
    const detail = (
      await call('GET', 'citizen/tickets/' + ticket.reference, undefined, citizenCookie)
    ).data;
    assert.equal(detail.messages[0].body, 'پاسخ آزمایشی کارشناس');
    const county = (await call('GET', 'counties')).data[0];
    assert.ok(county);
    const file = new FormData();
    file.set('visibility', 'private');
    file.set(
      'file',
      new Blob(
        [
          Buffer.from(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
            'base64',
          ),
        ],
        { type: 'image/png' },
      ),
      'report.png',
    );
    const image = (await call('POST', 'media', file, citizenCookie, 201)).data;
    assert.equal(image.visibility, 'private');
    const report = (
      await call(
        'POST',
        'citizen/tickets',
        {
          type: 'report',
          category: 'roads',
          county_id: county.id,
          subject: 'گزارش دارای تصویر',
          body: 'تصویر از فرم اصلی با ارسال multipart به Laravel رسیده است.',
          media_ids: [image.id],
        },
        citizenCookie,
        201,
      )
    ).data;
    const reportDetail = (
      await call('GET', 'citizen/tickets/' + report.reference, undefined, citizenCookie)
    ).data;
    assert.equal(reportDetail.media[0].id, image.id);
    pollId = (
      await call(
        'POST',
        'admin/polls',
        { question: 'تست نظرسنجی فرانت', status: 'draft', locale: 'fa' },
        adminCookie,
        201,
      )
    ).data.id;
    for (const title of ['گزینه اول', 'گزینه دوم'])
      optionIds.push(
        (await call('POST', 'admin/poll-options', { poll_id: pollId, title }, adminCookie, 201))
          .data.id,
      );
    await call('PATCH', 'admin/polls/' + pollId, { status: 'active' }, adminCookie);
    assert.equal((await call('GET', 'polls/' + pollId)).data.options.length, 2);
    const vote = (
      await call(
        'POST',
        'polls/' + pollId + '/vote',
        { option_id: optionIds[0] },
        citizenCookie,
        201,
      )
    ).data;
    assert.equal(vote.total_votes, 1);
    assert.equal(
      vote.options.find((option: { id: number }) => option.id === optionIds[0]).percentage,
      100,
    );
    optionIds.length = 0;
    await call('DELETE', 'admin/polls/' + pollId, undefined, adminCookie, 204);
    pollId = undefined;
    await call('DELETE', 'admin/faqs/' + faqId, undefined, adminCookie, 204);
    faqId = undefined;
    console.log(
      JSON.stringify({ all_passed: true, checks: checks.length, responses: checks }, null, 2),
    );
  } finally {
    if (pollId && adminCookie)
      await call('DELETE', 'admin/polls/' + pollId, undefined, adminCookie, 204).catch(() => {});
    if (faqId && adminCookie)
      await call('DELETE', 'admin/faqs/' + faqId, undefined, adminCookie, 204).catch(() => {});
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
