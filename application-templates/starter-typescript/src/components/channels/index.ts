import { lazy } from 'react';

const Channels = lazy(
  () => import('./channels' /* webpackChunkName: "channels" */)
);

export default Channels;
