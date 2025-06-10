import { Suspense } from 'react';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { ProtectedRoute, type TProtectedRouteProps } from './protected-route';

type TSuspendedProtectedRouteProps = TProtectedRouteProps;

const SuspendedProtectedRoute: React.FC<TSuspendedProtectedRouteProps> = (
  props
) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProtectedRoute {...props} />
    </Suspense>
  );
};

export { SuspendedProtectedRoute, type TSuspendedProtectedRouteProps };
