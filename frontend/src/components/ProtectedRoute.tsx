import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';

export function ProtectedRoute(props: PropsWithChildren) {
  const token = localStorage.getItem('tkk_lms_access_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{props.children}</>;
}
