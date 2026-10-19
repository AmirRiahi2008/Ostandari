import type { ApiResult } from '@/types/portal';
import type { TicketStatus, ticketTypes, ticketUrgencies } from '@/data/ticket-status';

export type NamedRecord = { id: number; name: string };
export type ReportOptions = {
  organizations: NamedRecord[];
  counties: NamedRecord[];
  assignees: (NamedRecord & { organization_ids: number[] })[];
};
type Attachment = { id: number; original_name: string };
export type CitizenReport = {
  id: number;
  reference: string;
  subject: string;
  body?: string;
  type: keyof typeof ticketTypes;
  category: string | null;
  status: TicketStatus;
  urgency: keyof typeof ticketUrgencies;
  organization_id: number | null;
  assigned_to: number | null;
  owner: NamedRecord | null;
  county: NamedRecord | null;
  organization: NamedRecord | null;
  assignee: NamedRecord | null;
  address?: string | null;
  due_at: string | null;
  created_at: string;
  updated_at: string;
  messages_count?: number;
  media?: Attachment[];
  messages?: {
    id: number;
    body: string;
    is_internal: boolean;
    created_at: string;
    author: NamedRecord | null;
    media?: Attachment[];
  }[];
  events?: {
    id: number;
    from_status: TicketStatus | null;
    to_status: TicketStatus;
    note: string | null;
    created_at: string;
  }[];
};
export type ReportsResponse = ApiResult<CitizenReport[]> & {
  summary: { total: number; pending: number; active: number; overdue: number };
};

export function reportDate(value?: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '—'
    : date.toLocaleString('fa-IR', {
        timeZone: 'Asia/Tehran',
        dateStyle: 'medium',
        timeStyle: 'short',
      });
}

export function reportOverdue(report: Pick<CitizenReport, 'status' | 'due_at'>): boolean {
  return (
    !['resolved', 'rejected', 'closed'].includes(report.status) &&
    Boolean(report.due_at && new Date(report.due_at).getTime() < Date.now())
  );
}

export function reportQuery(form: FormData): string {
  const params = new URLSearchParams();
  for (const key of [
    'q',
    'status',
    'type',
    'urgency',
    'county_id',
    'from',
    'to',
    'order',
    'overdue',
  ]) {
    const value = String(form.get(key) ?? '').trim();
    if (value) params.set(key, value);
  }
  return params.toString();
}
