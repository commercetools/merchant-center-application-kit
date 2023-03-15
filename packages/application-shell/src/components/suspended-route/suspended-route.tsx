import { Suspense } from 'react';
import { Route, type RouteProps } from 'react-router-dom';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const SuspendedRoute = <Path extends string = string>(
  props: RouteProps<Path>
) => (
  <Route {...props}>
    <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
  </Route>
);

SuspendedRoute.displayName = 'SuspendedRoute';

export default SuspendedRoute;
