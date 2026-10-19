/** Server-side transport. Never import this module from a client component. */
export type BackendCode =
  | 'BACKEND_CONFIG_ERROR'
  | 'BACKEND_TIMEOUT'
  | 'BACKEND_UNREACHABLE'
  | 'BACKEND_INVALID_RESPONSE'
  | 'BACKEND_UPSTREAM_ERROR'
  | 'BACKEND_REQUEST_ABORTED';

const messages: Record<BackendCode, string> = {
  BACKEND_CONFIG_ERROR: 'تنظیمات ارتباط با سرور کامل نیست. مدیر سامانه باید تنظیمات را بررسی کند.',
  BACKEND_TIMEOUT: 'پاسخ سرور طول کشید. کمی بعد دوباره تلاش کنید.',
  BACKEND_UNREACHABLE: 'ارتباط با سرور موقتاً برقرار نشد. کمی بعد دوباره تلاش کنید.',
  BACKEND_INVALID_RESPONSE: 'پاسخ معتبری از سرور دریافت نشد. دوباره تلاش کنید.',
  BACKEND_UPSTREAM_ERROR: 'سرور موقتاً قادر به انجام درخواست نیست. کمی بعد دوباره تلاش کنید.',
  BACKEND_REQUEST_ABORTED: 'درخواست لغو شد.',
};

export class BackendError extends Error {
  constructor(
    public code: BackendCode,
    public status: number,
    public requestId: string = crypto.randomUUID(),
  ) {
    super(messages[code]);
    this.name = 'BackendError';
  }
}

export type BackendPolicy = {
  totalMs: number;
  attemptMs: number;
  attempts: number;
  delayMs: number;
};
const policy: BackendPolicy = { totalMs: 45000, attemptMs: 14500, attempts: 3, delayMs: 200 };
const transientStatuses = new Set([502, 503, 504]);
const permanentCodes = /CERT|TLS|SSL|ERR_INVALID|ENOTFOUND/;

export function backendUrl(endpoint: string): URL {
  const configured = process.env.BACKEND_URL?.trim();
  const base = configured || (process.env.VERCEL === '1' ? '' : 'http://127.0.0.1:8000/api/v1');
  try {
    const url = new URL(base);
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    )
      throw new Error('invalid configuration');
    url.pathname = url.pathname.replace(/\/+$/, '') + '/';
    if (
      !endpoint ||
      endpoint.startsWith('/') ||
      endpoint.includes('\\') ||
      /^[a-z]+:/i.test(endpoint)
    )
      throw new Error('invalid endpoint');
    const result = new URL(endpoint, url);
    if (result.origin !== url.origin || !result.pathname.startsWith(url.pathname))
      throw new Error('invalid endpoint');
    return result;
  } catch {
    throw new BackendError('BACKEND_CONFIG_ERROR', 503);
  }
}

function causeCode(error: unknown): string {
  if (!error || typeof error !== 'object') return '';
  const source = error as { code?: unknown; cause?: unknown; name?: unknown };
  return typeof source.code === 'string'
    ? source.code.replace(/[^A-Z0-9_]/g, '').slice(0, 80)
    : source.cause
      ? causeCode(source.cause)
      : String(source.name ?? '').slice(0, 40);
}

function diagnostic(
  event: string,
  url: URL,
  method: string,
  requestId: string,
  attempt: number,
  started: number,
  code: string,
) {
  // Deliberately omit query strings, bodies, cookies, tokens and raw exception messages.
  console.warn(
    JSON.stringify({
      event,
      method,
      host: url.hostname,
      path: url.pathname,
      request_id: requestId,
      attempt,
      elapsed_ms: Date.now() - started,
      code,
    }),
  );
}

async function pause(ms: number, signal?: AbortSignal | null): Promise<void> {
  if (signal?.aborted) throw new BackendError('BACKEND_REQUEST_ABORTED', 499);
  await new Promise<void>((resolve, reject) => {
    const finish = () => {
      signal?.removeEventListener('abort', abort);
      resolve();
    };
    const timer = setTimeout(finish, ms);
    const abort = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
      reject(new BackendError('BACKEND_REQUEST_ABORTED', 499));
    };
    signal?.addEventListener('abort', abort, { once: true });
  });
}

/** A bounded retry is allowed only for reads. A write is sent exactly once. */
export async function backendRequest(
  endpoint: string,
  options: RequestInit = {},
  limits: BackendPolicy = policy,
): Promise<{ response: Response; requestId: string }> {
  const requestId = crypto.randomUUID();
  const method = (options.method ?? 'GET').toUpperCase();
  let url: URL;
  try {
    url = backendUrl(endpoint);
  } catch (error) {
    console.warn(
      JSON.stringify({
        event: 'backend.failed',
        method,
        request_id: requestId,
        code: 'BACKEND_CONFIG_ERROR',
      }),
    );
    if (error instanceof BackendError) error.requestId = requestId;
    throw error;
  }
  const read = ['GET', 'HEAD'].includes(method);
  const maximum = read ? Math.max(1, Math.min(limits.attempts, 3)) : 1;
  const started = Date.now();
  const parent = options.signal;
  for (let attempt = 1; attempt <= maximum; attempt++) {
    if (parent?.aborted) throw new BackendError('BACKEND_REQUEST_ABORTED', 499, requestId);
    const remaining = limits.totalMs - (Date.now() - started);
    if (remaining <= 0) throw new BackendError('BACKEND_TIMEOUT', 504, requestId);
    const controller = new AbortController();
    let timedOut = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let abort = () => {};
    try {
      const timeout = new Promise<never>((_, reject) => {
        abort = () => {
          controller.abort();
          reject(new BackendError('BACKEND_REQUEST_ABORTED', 499, requestId));
        };
        parent?.addEventListener('abort', abort, { once: true });
        timer = setTimeout(
          () => {
            timedOut = true;
            controller.abort();
            reject(new BackendError('BACKEND_TIMEOUT', 504, requestId));
          },
          Math.min(remaining, read ? limits.attemptMs : limits.totalMs),
        );
      });
      const response = await Promise.race([
        (async () => {
          const upstream = await fetch(url, {
            ...options,
            method,
            signal: controller.signal,
            cache: 'no-store',
            redirect: 'manual',
          });
          // Keep the timeout active while reading the body, including downloads.
          const body =
            method === 'HEAD' || [204, 205, 304].includes(upstream.status)
              ? null
              : await upstream.arrayBuffer();
          return new Response(body, { status: upstream.status, headers: upstream.headers });
        })(),
        timeout,
      ]);
      if (read && transientStatuses.has(response.status) && attempt < maximum) {
        diagnostic(
          'backend.retry',
          url,
          method,
          requestId,
          attempt,
          started,
          'HTTP_' + response.status,
        );
      } else {
        if (response.status >= 500)
          diagnostic(
            'backend.upstream_error',
            url,
            method,
            requestId,
            attempt,
            started,
            'HTTP_' + response.status,
          );
        return { response, requestId };
      }
    } catch (cause) {
      const failure = parent?.aborted
        ? new BackendError('BACKEND_REQUEST_ABORTED', 499, requestId)
        : timedOut || (cause instanceof Error && cause.name === 'TimeoutError')
          ? new BackendError('BACKEND_TIMEOUT', 504, requestId)
          : cause instanceof BackendError
            ? cause
            : new BackendError('BACKEND_UNREACHABLE', 503, requestId);
      const retry =
        read &&
        attempt < maximum &&
        failure.code !== 'BACKEND_REQUEST_ABORTED' &&
        !permanentCodes.test(causeCode(cause));
      diagnostic(
        retry ? 'backend.retry' : 'backend.failed',
        url,
        method,
        requestId,
        attempt,
        started,
        causeCode(cause) || failure.code,
      );
      if (!retry) throw failure;
    } finally {
      clearTimeout(timer);
      parent?.removeEventListener('abort', abort);
    }
    const delay = Math.min(limits.delayMs * attempt, limits.totalMs - (Date.now() - started));
    if (delay > 0) await pause(delay, parent);
  }
  throw new BackendError('BACKEND_TIMEOUT', 504, requestId);
}

export async function backendJson(
  response: Response,
  requestId: string,
): Promise<Record<string, unknown>> {
  try {
    const value: unknown = await response.json();
    if (!value || typeof value !== 'object' || Array.isArray(value))
      throw new Error('invalid JSON object');
    return value as Record<string, unknown>;
  } catch {
    throw new BackendError('BACKEND_INVALID_RESPONSE', 502, requestId);
  }
}
