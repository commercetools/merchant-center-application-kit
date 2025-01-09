import { Suspense, type ReactNode } from 'react';
import { Route, type RouteProps } from 'react-router-dom';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const SuspendedRoute = (props: RouteProps) => (
  <Route {...props}>
    {/* @ts-ignore FIXME upstream */}
    <Suspense fallback={<LoadingSpinner />}>
      {props.children as ReactNode}
    </Suspense>
  </Route>
);

SuspendedRoute.displayName = 'SuspendedRoute';

export default SuspendedRoute;
