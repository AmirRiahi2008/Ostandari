'use client';

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { api, jsonBody } from '@/lib/api/client';
import { useAdminWorkspace } from '../workspace-provider';
import {
  ticketCategories,
  ticketStatuses,
  ticketTransitions,
  ticketTypes,
  ticketUrgencies,
  type TicketStatus,
} from '@/data/ticket-status';
import {
  reportDate,
  reportOverdue,
  type CitizenReport,
  type ReportOptions,
} from '@/features/admin/reports';

function Attachments({ media }: { media: CitizenReport['media'] }) {
  if (!media?.length) return null;
  return (
    <ul className="reports-attachments" aria-label="پیوست‌ها">
      {media.map((file) => (
        <li key={file.id}>
          <a href={'/api/backend/media/' + file.id + '/download'}>
            دریافت پیوست: {file.original_name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function ReportDetail({
  reference,
  options,
  onClose,
  onChanged,
  onBusy,
  closeLabel = 'بستن جزئیات',
}: {
  reference: string;
  options: ReportOptions | null;
  onClose: () => void;
  onChanged: () => void;
  onBusy: (busy: boolean) => void;
  closeLabel?: string;
}) {
  const readOnly = useAdminWorkspace()?.portal_context?.can_write === false;
  const [record, setRecord] = useState<CitizenReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const abort = useRef<AbortController | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const [status, setStatus] = useState<TicketStatus>('pending');
  const [organization, setOrganization] = useState('');
  const [assignee, setAssignee] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [note, setNote] = useState('');
  const [reply, setReply] = useState('');
  const [internal, setInternal] = useState(false);
  const endpoint = 'admin/reports/' + encodeURIComponent(reference);

  const receive = useCallback((ticket: CitizenReport) => {
    setRecord(ticket);
    setStatus(ticket.status);
    setOrganization(String(ticket.organization_id ?? ''));
    setAssignee(String(ticket.assigned_to ?? ''));
    setUrgency(ticket.urgency);
  }, []);
  const load = useCallback(
    async (signal: AbortSignal) => {
      const result = await api<CitizenReport>(endpoint, { signal });
      if (!signal.aborted) receive(result.data);
    },
    [endpoint, receive],
  );

  useEffect(() => {
    const controller = new AbortController();
    abort.current = controller;
    setLoading(true);
    void load(controller.signal)
      .then(() => {
        if (!controller.signal.aborted) heading.current?.focus();
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [load]);

  async function refresh() {
    if (!abort.current || busyRef.current) return;
    setLoading(true);
    setError('');
    try {
      await load(abort.current.signal);
    } catch (e) {
      if (!abort.current.signal.aborted)
        setError(e instanceof Error ? e.message : 'دریافت جزئیات ناموفق بود.');
    } finally {
      if (!abort.current.signal.aborted) setLoading(false);
    }
  }

  async function save(kind: 'status' | 'message', data: Record<string, unknown>) {
    if (readOnly) return;
    if (!record || !abort.current || busyRef.current) return;
    const signal = abort.current.signal;
    busyRef.current = true;
    setBusy(true);
    onBusy(true);
    setError('');
    setNotice('');
    let committed = false;
    try {
      await api(endpoint + (kind === 'message' ? '/messages' : ''), {
        method: kind === 'message' ? 'POST' : 'PATCH',
        body: jsonBody(data),
        signal,
      });
      committed = true;
      if (signal.aborted) return;
      if (kind === 'message') setReply('');
      else setNote('');
      setNotice(
        kind === 'message'
          ? data.is_internal
            ? 'یادداشت داخلی ثبت شد؛ برای شهروند نمایش داده نمی‌شود.'
            : 'پاسخ ثبت شد و در پنل همان شهروند قابل مشاهده است.'
          : 'اطلاعات رسیدگی و تاریخچهٔ وضعیت ثبت شد.',
      );
      onChanged();
      await load(signal);
    } catch (e) {
      if (!signal.aborted) {
        if (committed) {
          setRecord(null);
          setError(
            'ثبت انجام شد؛ دریافت مجدد جزئیات ناموفق بود. برای دیدن نتیجه «تازه‌سازی جزئیات» را بزنید.',
          );
        } else setError(e instanceof Error ? e.message : 'ثبت انجام نشد.');
      }
    } finally {
      busyRef.current = false;
      if (!signal.aborted) {
        setBusy(false);
        onBusy(false);
      }
    }
  }

  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!record) return;
    const data: Record<string, unknown> = {};
    if (status !== record.status) data.status = status;
    if (organization !== String(record.organization_id ?? ''))
      data.organization_id = Number(organization);
    if (assignee !== String(record.assigned_to ?? ''))
      data.assigned_to = assignee ? Number(assignee) : null;
    if (urgency !== record.urgency) data.urgency = urgency;
    if (note.trim()) data.note = note.trim();
    if (!Object.keys(data).length) {
      setNotice('تغییری برای ذخیره‌کردن وارد نشده است.');
      return;
    }
    void save('status', data);
  }

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (reply.trim()) void save('message', { body: reply.trim(), is_internal: internal });
  }

  const assignees =
    options?.assignees.filter((person) => person.organization_ids.includes(Number(organization))) ??
    [];
  return (
    <section className="reports-detail" aria-labelledby={id + '-title'} aria-busy={loading || busy}>
      <header className="reports-detail-header">
        <h2 id={id + '-title'} ref={heading} tabIndex={-1}>
          {record?.subject ?? 'جزئیات درخواست'}
        </h2>
        <button type="button" className="reports-secondary" onClick={onClose} disabled={busy}>
          {closeLabel}
        </button>
      </header>
      {notice ? (
        <p className="reports-notice" role="status">
          {notice}
        </p>
      ) : null}
      {error ? (
        <p className="reports-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="reports-detail-tools">
        <code dir="ltr">{reference}</code>
        <button
          type="button"
          className="reports-secondary"
          disabled={readOnly || busy || loading}
          onClick={() => void refresh()}
        >
          تازه‌سازی جزئیات
        </button>
      </div>
      {loading ? <p role="status">در حال دریافت جزئیات…</p> : null}
      {record ? (
        <>
          <dl className="reports-facts">
            <div>
              <dt>نوع درخواست</dt>
              <dd>{ticketTypes[record.type]}</dd>
            </div>
            <div>
              <dt>شهروند</dt>
              <dd>{record.owner?.name ?? '—'}</dd>
            </div>
            <div>
              <dt>شهرستان</dt>
              <dd>{record.county?.name ?? 'استان مازندران'}</dd>
            </div>
            <div>
              <dt>موضوع گزارش</dt>
              <dd>
                {record.category
                  ? (ticketCategories[record.category] ?? record.category)
                  : 'پیام مستقیم'}
              </dd>
            </div>
            <div>
              <dt>وضعیت فعلی</dt>
              <dd>
                <span className="reports-badge" data-status={record.status}>
                  {ticketStatuses[record.status]}
                </span>
              </dd>
            </div>
            <div>
              <dt>فوریت فعلی</dt>
              <dd>
                <span className="reports-badge" data-urgency={record.urgency}>
                  {ticketUrgencies[record.urgency]}
                </span>
              </dd>
            </div>
            <div>
              <dt>واحد رسیدگی</dt>
              <dd>{record.organization?.name ?? 'تعیین نشده'}</dd>
            </div>
            <div>
              <dt>کارشناس مسئول</dt>
              <dd>{record.assignee?.name ?? 'تعیین نشده'}</dd>
            </div>
            <div>
              <dt>تاریخ ثبت</dt>
              <dd>{reportDate(record.created_at)}</dd>
            </div>
            <div>
              <dt>مهلت پاسخ</dt>
              <dd>
                {reportDate(record.due_at)}
                {reportOverdue(record) ? (
                  <strong className="reports-overdue">گذشته از مهلت پاسخ</strong>
                ) : null}
              </dd>
            </div>
          </dl>
          <section className="reports-original">
            <h3>متن درخواست شهروند</h3>
            <p>{record.body}</p>
            {record.address ? (
              <p>
                <b>نشانی: </b>
                {record.address}
              </p>
            ) : null}
            <Attachments media={record.media} />
          </section>
          <div className="reports-detail-columns">
            <form
              className="reports-review-form"
              onSubmit={review}
              aria-label="تغییر وضعیت و ارجاع"
            >
              <h3>رسیدگی و ارجاع</h3>
              <fieldset disabled={readOnly || busy || loading}>
                <label>
                  وضعیت
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TicketStatus)}
                  >
                    {[record.status, ...ticketTransitions[record.status]].map((value) => (
                      <option key={value} value={value}>
                        {ticketStatuses[value]}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  واحد رسیدگی
                  <select
                    name="organization_id"
                    required
                    disabled={!options}
                    value={organization}
                    onChange={(e) => {
                      setOrganization(e.target.value);
                      setAssignee('');
                    }}
                  >
                    <option value="">انتخاب واحد</option>
                    {record.organization &&
                    !options?.organizations.some((org) => org.id === record.organization_id) ? (
                      <option value={record.organization_id ?? ''} disabled>
                        {record.organization.name} (غیرقابل انتخاب)
                      </option>
                    ) : null}
                    {options?.organizations.map((org) => (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  کارشناس مسئول
                  <select
                    name="assigned_to"
                    disabled={!options || !organization}
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                  >
                    <option value="">بدون کارشناس مشخص</option>
                    {assignee && !assignees.some((person) => String(person.id) === assignee) ? (
                      <option value={assignee} disabled>
                        {record.assignee?.name ?? 'کارشناس قبلی'} (غیرقابل انتخاب)
                      </option>
                    ) : null}
                    {assignees.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  فوریت
                  <select
                    name="urgency"
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                  >
                    {Object.entries(ticketUrgencies).map(([value, title]) => (
                      <option key={value} value={value}>
                        {title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  یادداشت وضعیت (فقط کارشناسان)
                  <textarea
                    name="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    maxLength={4000}
                    rows={3}
                  />
                </label>
                <p className="reports-help">
                  تغییر وضعیت در تاریخچه ذخیره می‌شود. برای توضیح نتیجه به شهروند، پاسخ جداگانه
                  ارسال کنید.
                </p>
                <button type="submit">ذخیرهٔ رسیدگی</button>
              </fieldset>
            </form>
            <section className="reports-conversation">
              <h3>گفتگو و پاسخ‌ها</h3>
              {record.messages?.length ? (
                <ol className="reports-messages">
                  {record.messages.map((message) => (
                    <li key={message.id} data-internal={message.is_internal}>
                      <header>
                        <strong>{message.author?.name ?? 'کاربر سامانه'}</strong>
                        <span>
                          {message.is_internal ? 'یادداشت داخلی' : 'پیام قابل مشاهده برای شهروند'}
                        </span>
                        <time dateTime={message.created_at}>{reportDate(message.created_at)}</time>
                      </header>
                      <p>{message.body}</p>
                      <Attachments media={message.media} />
                    </li>
                  ))}
                </ol>
              ) : (
                <p>هنوز پاسخی ثبت نشده است.</p>
              )}
              {record.status === 'closed' ? (
                <p className="reports-notice">
                  درخواست بسته شده است. برای ادامهٔ گفتگو، ابتدا وضعیت را به «در حال بررسی» تغییر
                  دهید.
                </p>
              ) : null}
              <form onSubmit={send} aria-label="ارسال پاسخ یا یادداشت داخلی">
                <fieldset disabled={readOnly || busy || loading || record.status === 'closed'}>
                  <label>
                    {internal ? 'متن یادداشت داخلی' : 'متن پاسخ به شهروند'}
                    <textarea
                      name="body"
                      required
                      maxLength={20000}
                      rows={5}
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    />
                  </label>
                  <label className="reports-checkbox">
                    <input
                      type="checkbox"
                      name="is_internal"
                      checked={internal}
                      onChange={(e) => setInternal(e.target.checked)}
                    />
                    این پیام فقط برای کارشناسان باشد
                  </label>
                  <p className="reports-help">
                    {internal
                      ? 'یادداشت داخلی در پنل شهروند نمایش داده نمی‌شود.'
                      : 'این پاسخ و اطلاع تغییر وضعیت در پنل همان شهروند قابل پیگیری است.'}
                  </p>
                  <button type="submit" disabled={!reply.trim()}>
                    {internal ? 'ثبت یادداشت داخلی' : 'ارسال پاسخ به شهروند'}
                  </button>
                </fieldset>
              </form>
            </section>
          </div>
          <section className="reports-history">
            <h3>تاریخچهٔ وضعیت</h3>
            {record.events?.length ? (
              <ol>
                {record.events.map((event) => (
                  <li key={event.id}>
                    <time dateTime={event.created_at}>{reportDate(event.created_at)}</time>
                    <strong>
                      {event.from_status ? ticketStatuses[event.from_status] + ' ← ' : ''}
                      {ticketStatuses[event.to_status]}
                    </strong>
                    {event.note ? <p>{event.note}</p> : null}
                  </li>
                ))}
              </ol>
            ) : (
              <p>رویدادی ثبت نشده است.</p>
            )}
          </section>
        </>
      ) : null}
    </section>
  );
}
