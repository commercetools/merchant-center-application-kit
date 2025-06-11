import { Suspense, type ReactNode } from 'react';
import { Route, type RouteProps } from 'react-router-dom';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

type TSuspendedRouteProps = Omit<RouteProps, 'children'> & {
  children: ReactNode;
};

const SuspendedRoute = (props: TSuspendedRouteProps) => (
  <Route {...props}>
    <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
  </Route>
);

SuspendedRoute.displayName = 'SuspendedRoute';

export { SuspendedRoute };
