import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { templatePreview } from '@/lib/config';

export const LOCAL_ADMIN_COOKIE = 'ostan_local_admin';
export const LOCAL_SESSION_SECONDS = 8 * 60 * 60;

export function localAdminEnabled(host: string | null): boolean {
  if (!templatePreview() || !host) return false;
  try {
    return ['127.0.0.1', 'localhost', '[::1]'].includes(new URL('http://' + host).hostname);
  } catch {
    return false;
  }
}
function sessionKey(): Buffer {
  if (process.env.LOCAL_ADMIN_SECRET)
    return createHash('sha256').update(process.env.LOCAL_ADMIN_SECRET).digest();
  const directory = path.join(process.cwd(), '.next', 'cache');
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const file = path.join(directory, 'portal-local-session.key');
  try {
    writeFileSync(file, randomBytes(32), { flag: 'wx', mode: 0o600 });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
  }
  const key = readFileSync(file);
  if (key.length !== 32) throw new Error('Invalid local session key');
  return key;
}
function digest(value: string): Buffer {
  return createHash('sha256').update(value).digest();
}
export function localCredentials(login: unknown, password: unknown): boolean {
  return (
    typeof login === 'string' &&
    typeof password === 'string' &&
    timingSafeEqual(digest(login), digest('admin')) &&
    timingSafeEqual(digest(password), digest('admin'))
  );
}
export function createLocalSession(now = Date.now(), key = sessionKey()): string {
  const payload = Buffer.from(
    JSON.stringify({
      role: 'local_admin',
      exp: Math.floor(now / 1000) + LOCAL_SESSION_SECONDS,
      nonce: randomBytes(16).toString('hex'),
    }),
  ).toString('base64url');
  return payload + '.' + createHmac('sha256', key).update(payload).digest('base64url');
}
export function validLocalSession(
  token: string | undefined,
  now = Date.now(),
  key?: Buffer,
): boolean {
  if (!token || token.length > 1024) return false;
  const [payload, signature, ...rest] = token.split('.');
  if (!payload || !signature || rest.length) return false;
  try {
    const expected = createHmac('sha256', key ?? sessionKey())
      .update(payload)
      .digest();
    const received = Buffer.from(signature, 'base64url');
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return (
      data.role === 'local_admin' &&
      Number.isInteger(data.exp) &&
      data.exp > Math.floor(now / 1000) &&
      data.exp <= Math.floor(now / 1000) + LOCAL_SESSION_SECONDS &&
      typeof data.nonce === 'string'
    );
  } catch {
    return false;
  }
}
