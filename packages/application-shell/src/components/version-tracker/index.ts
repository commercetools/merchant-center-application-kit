import { lazy } from 'react';

const VersionTracker = lazy(
  () => import('./version-tracker' /* webpackChunkName: "version-tracker" */)
);

export default VersionTracker;
