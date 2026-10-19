import nextEnvironment from '@next/env';

nextEnvironment.loadEnvConfig(process.cwd());
const configured = process.env.BACKEND_URL?.trim();
if (!configured) {
  console.error('BACKEND_URL is missing. Set the Laravel API URL, including /api/v1.');
  process.exitCode = 1;
} else {
  let base;
  try {
    base = new URL(configured.replace(/\/+$/, '') + '/');
    if (
      !['http:', 'https:'].includes(base.protocol) ||
      base.username ||
      base.password ||
      base.search ||
      base.hash
    )
      throw new Error();
  } catch {
    console.error(
      'BACKEND_URL is invalid. Use a plain http(s) API URL without credentials, query or fragment.',
    );
    process.exitCode = 1;
  }
  if (base)
    for (const [path, expected] of [
      ['health', 200],
      ['auth/me', 401],
    ]) {
      const started = Date.now();
      try {
        const response = await fetch(new URL(path, base), {
          headers: { Accept: 'application/json' },
          redirect: 'manual',
          signal: AbortSignal.timeout(15000),
        });
        await response.json();
        const ok = response.status === expected;
        console.log(
          JSON.stringify({
            endpoint: path,
            host: base.hostname,
            status: response.status,
            expected_status: expected,
            elapsed_ms: Date.now() - started,
            json: true,
            ok,
          }),
        );
        if (!ok) process.exitCode = 1;
      } catch (error) {
        console.error(
          JSON.stringify({
            endpoint: path,
            host: base.hostname,
            elapsed_ms: Date.now() - started,
            ok: false,
            error: error.cause?.code ?? error.name,
          }),
        );
        process.exitCode = 1;
      }
    }
}
