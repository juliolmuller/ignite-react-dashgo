import { useAuth } from '~/contexts';

export interface UseCanProps {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UseCanProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  if (!permissions?.length && !roles?.length) {
    return false;
  }

  if (permissions?.length) {
    const hasAllPermissions = permissions.every((permission) => {
      return user?.permissions.includes(permission);
    });

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles?.length) {
    const hasAnyRole = roles.some((role) => {
      return user?.roles.includes(role);
    });

    if (!hasAnyRole) {
      return false;
    }
  }

  return true;
}
