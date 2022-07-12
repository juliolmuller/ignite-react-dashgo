import { ReactNode } from 'react';

import { useCan } from '~/utils/auth';

export interface CanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export function Can({ children, permissions, roles }: CanProps) {
  const canViewContent = useCan({ permissions, roles });

  if (canViewContent) {
    return children;
  }

  return null;
}
