import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';

interface StoredUser {
  roles?: string[];
}

export function AdminRoute(props: PropsWithChildren) {
  const token = localStorage.getItem('tkk_lms_access_token');
  const rawUser = localStorage.getItem('tkk_lms_user');
  const user = rawUser ? (JSON.parse(rawUser) as StoredUser) : null;
  const isAdmin = Boolean(user?.roles?.includes('admin'));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/student/dashboard" replace />;
  }

  return <>{props.children}</>;
}
