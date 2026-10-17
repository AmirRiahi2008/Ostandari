import type { NextRequest } from 'next/server';
import { forward } from '@/lib/api/proxy';

async function handle(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, (await context.params).path);
}

export { handle as GET, handle as POST, handle as PATCH, handle as PUT, handle as DELETE };
