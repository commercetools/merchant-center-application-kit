import { lazy } from 'react';

const RouteCatchAll = lazy(
  () => import('./route-catch-all' /* webpackChunkName: "route-catch-all" */)
);

export default RouteCatchAll;
