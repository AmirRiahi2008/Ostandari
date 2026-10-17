export type RecordData = Record<string, unknown> & { id?: number | string };

export interface ApiResult<T = RecordData> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: { total: number; per_page: number; current_page: number; last_page: number };
}

export interface TemplatePage {
  id: string;
  group: string;
  source: string;
  path: string;
  scope: string;
  bodyClass: string;
  title: string;
  lang: string;
  css: string;
  controller: string;
  resource: string;
  defaults: Record<string, string>;
}

export interface PortalUser extends RecordData {
  name: string;
  person_type: string;
  mobile?: string;
  national_code?: string;
  address?: string;
  county_id?: number;
  role?: { name: string; permissions: string[] };
}

export interface PageContext {
  root: HTMLElement;
  page: TemplatePage;
  preview: boolean;
  signal: AbortSignal;
  path: string;
}
