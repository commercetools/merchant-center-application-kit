import { ReactNode, Suspense } from 'react';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

const SuspendedRoute = (props: { children: ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
);

SuspendedRoute.displayName = 'SuspendedRoute';

export default SuspendedRoute;
