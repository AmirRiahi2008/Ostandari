import { BackendError, backendJson, backendRequest } from '@/lib/api/backend';
import type { BackendPolicy } from '@/lib/api/backend';
import type { PortalUser } from '@/types/portal';

/** An unavailable auth service is not an expired session and must never grant access. */
export async function readAdminSession(
  token: string,
  limits?: BackendPolicy,
): Promise<PortalUser | null> {
  const { response, requestId } = await backendRequest(
    'auth/me',
    {
      headers: { Accept: 'application/json', Authorization: 'Bearer ' + token },
    },
    limits,
  );
  const result = await backendJson(response, requestId);
  if (response.status === 401 || response.status === 403) return null;
  if (!response.ok)
    throw new BackendError(
      'BACKEND_UPSTREAM_ERROR',
      response.status === 429 ? 429 : 503,
      requestId,
    );
  const user = result.data as
    | { id?: unknown; person_type?: unknown; is_active?: boolean; role?: { permissions?: unknown } }
    | undefined;
  if (!user || !user.id || typeof user.person_type !== 'string')
    throw new BackendError('BACKEND_INVALID_RESPONSE', 502, requestId);
  const valid =
    user.person_type !== 'citizen' &&
    user.is_active !== false &&
    Array.isArray(user.role?.permissions) &&
    user.role.permissions.length > 0 &&
    user.role.permissions.every((permission) => typeof permission === 'string');
  return valid ? (user as PortalUser) : null;
}

export async function validAdminSession(token: string, limits?: BackendPolicy): Promise<boolean> {
  return Boolean(await readAdminSession(token, limits));
}
