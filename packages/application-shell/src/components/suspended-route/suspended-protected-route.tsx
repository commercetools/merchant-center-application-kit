import { Suspense } from 'react';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ProtectedRoute, type TProtectedRouteProps } from './protected-route';

type TSuspendedProtectedRouteProps = TProtectedRouteProps & {
  loading?: React.ReactNode;
  fallback?: React.ReactNode;
};

const SuspendedProtectedRoute: React.FC<TSuspendedProtectedRouteProps> = ({
  loading = <LoadingSpinner />,
  fallback = <PageUnauthorized />,
  ...routeProps
}) => {
  return (
    <Suspense fallback={loading}>
      <ProtectedRoute fallback={fallback} {...routeProps} />
    </Suspense>
  );
};

export { SuspendedProtectedRoute, type TSuspendedProtectedRouteProps };
