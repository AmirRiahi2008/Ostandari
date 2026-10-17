import { spawn } from 'node:child_process';
import path from 'node:path';
import nextEnv from '@next/env';
import { prepareStandalone } from './prepare-standalone.mjs';

nextEnv.loadEnvConfig(process.cwd());

const standalone = await prepareStandalone();
const server = spawn(process.execPath, [path.join(standalone, 'server.js')], {
  cwd: standalone,
  stdio: 'inherit',
  env: { ...process.env, HOSTNAME: '127.0.0.1', PORT: process.env.PORT ?? '3000' },
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.kill(signal));
server.on('exit', (code) => {
  process.exitCode = code ?? 0;
});
