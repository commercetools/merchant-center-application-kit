import { lazy } from 'react';

const Welcome = lazy(
  () => import('./welcome' /* webpackChunkName: "welcome" */)
);

export default Welcome;
