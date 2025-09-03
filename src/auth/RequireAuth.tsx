import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { JSX } from 'react';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
  }
  return children;
}