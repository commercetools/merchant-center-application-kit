import { Suspense } from 'react';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ProtectedRoute, type TProtectedRouteProps } from './protected-route';

type TSuspendedProtectedRouteProps = TProtectedRouteProps & {
  fallback?: React.ReactNode;
};

const SuspendedProtectedRoute: React.FC<TSuspendedProtectedRouteProps> = ({
  fallback = <LoadingSpinner />,
  ...routeProps
}) => {
  return (
    <Suspense fallback={fallback}>
      <ProtectedRoute {...routeProps} />
    </Suspense>
  );
};

export { SuspendedProtectedRoute, type TSuspendedProtectedRouteProps };
