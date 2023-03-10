import { lazy } from 'react';

const ErrorApologizer = lazy(
  () => import('./error-apologizer' /* webpackChunkName: "error-apologizer" */)
);

export default ErrorApologizer;
