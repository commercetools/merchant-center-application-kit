import { Suspense, type ReactNode } from 'react';
import type { RouteProps } from 'react-router-dom';
import { CompatRoute as Route } from 'react-router-dom-v5-compat';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

type TSuspendedRouteProps = Omit<RouteProps, 'children'> & {
  children: ReactNode;
};

const SuspendedRoute = (props: TSuspendedRouteProps) => (
  <Route
    {...props}
    element={
      <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
    }
  />
);

SuspendedRoute.displayName = 'SuspendedRoute';

export { SuspendedRoute };
