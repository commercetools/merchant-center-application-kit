import { Suspense, type ReactNode } from 'react';
import { Route as LegacyRoute, type RouteProps } from 'react-router-dom';
import { CompatRoute as Route } from 'react-router-dom-v5-compat';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

type TSuspendedRouteProps = Omit<RouteProps, 'children'> & {
  children: ReactNode;
  compat?: boolean;
};

const SuspendedRoute = (props: TSuspendedRouteProps) => {
  if (props.compat) {
    return (
      <Route
        {...props}
        element={
          <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
        }
      />
    );
  } else {
    return (
      <LegacyRoute {...props}>
        <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
      </LegacyRoute>
    );
  }
};

SuspendedRoute.displayName = 'SuspendedRoute';

export { SuspendedRoute };
