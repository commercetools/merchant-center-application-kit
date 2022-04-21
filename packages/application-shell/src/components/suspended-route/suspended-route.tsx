import { Suspense, type ReactNode } from 'react';
import { Route } from 'react-router-dom';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

type SuspendedRouteProps = {
  children: ReactNode;
  path?: string;
};

const SuspendedRoute = (props: SuspendedRouteProps) => (
  <Route {...props}>
    <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
  </Route>
);

SuspendedRoute.displayName = 'SuspendedRoute';

export default SuspendedRoute;
