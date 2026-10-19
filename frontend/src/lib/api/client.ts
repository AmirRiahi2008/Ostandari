import type { ApiResult } from '@/types/portal';

export class ApiError extends Error {
  constructor(
    message: string,
    public status = 500,
    public errors: Record<string, string[]> = {},
    public code?: string,
    public requestId?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body && !(options.body instanceof FormData))
    headers.set('Content-Type', 'application/json');
  let response: Response;
  try {
    response = await fetch('/api/backend/' + path.replace(/^\//, ''), {
      ...options,
      headers,
      credentials: 'same-origin',
      cache: 'no-store',
    });
  } catch (error) {
    if (options.signal?.aborted || (error instanceof Error && error.name === 'AbortError'))
      throw error;
    throw new ApiError(
      'ارتباط مرورگر با سایت قطع شد. اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.',
      0,
      {},
      'NETWORK_ERROR',
    );
  }
  if (response.status === 204) return { success: true, data: null as T };
  let result;
  try {
    result = await response.json();
    if (!result || typeof result !== 'object' || Array.isArray(result))
      throw new Error('invalid response');
  } catch (error) {
    if (options.signal?.aborted) throw error;
    throw new ApiError(
      response.status === 413
        ? 'حجم فایل برای بارگذاری از این مسیر بیش از حد مجاز است.'
        : 'پاسخ معتبری از سایت دریافت نشد. دوباره تلاش کنید.',
      response.ok ? 502 : response.status,
      {},
      'INVALID_RESPONSE',
      response.headers.get('x-request-id') ?? undefined,
    );
  }
  if (!response.ok) {
    const errors = result.errors ?? {};
    const first = Object.values(errors).flat()[0];
    throw new ApiError(
      typeof first === 'string' ? first : (result.message ?? 'دریافت اطلاعات ناموفق بود.'),
      response.status,
      errors,
      result.code,
      result.request_id ?? response.headers.get('x-request-id') ?? undefined,
    );
  }
  return result;
}

export const jsonBody = (value: unknown) => JSON.stringify(value);

export async function upload(
  file: File,
  visibility: 'public' | 'private' = 'private',
  signal?: AbortSignal,
): Promise<number> {
  const body = new FormData();
  body.set('file', file);
  body.set('visibility', visibility);
  return (await api<{ id: number }>('media', { method: 'POST', body, signal })).data.id;
}
