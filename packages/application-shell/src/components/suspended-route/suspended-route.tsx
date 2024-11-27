import { Suspense } from 'react';
import { Route, type RouteProps } from 'react-router-dom';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const SuspendedRoute = (props: RouteProps) => (
  <Route
    {...props}
    element={
      <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
    }
  />
);

SuspendedRoute.displayName = 'SuspendedRoute';

export default SuspendedRoute;
