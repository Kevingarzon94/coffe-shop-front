import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Spinner } from '@/shared/components/ui';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
