import { Suspense } from 'react';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import {
  ProtectedRoute,
  type TProtectedRouteProps,
  type TProtectedProps,
  Protected,
} from './protected-route';

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

type TSuspendedProtectedProps = TProtectedProps & {
  loading?: React.ReactNode;
  fallback?: React.ReactNode;
};

export function SuspendedProtected(props: TSuspendedProtectedProps) {
  return (
    <Suspense fallback={props.loading || <LoadingSpinner />}>
      <Protected {...props} />
    </Suspense>
  );
}
