'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { PortalUser } from '@/types/portal';

const WorkspaceContext = createContext<PortalUser | null>(null);

export function AdminWorkspaceProvider({
  user,
  children,
}: {
  user: PortalUser | null;
  children: ReactNode;
}) {
  return <WorkspaceContext.Provider value={user}>{children}</WorkspaceContext.Provider>;
}

export function useAdminWorkspace() {
  return useContext(WorkspaceContext);
}
