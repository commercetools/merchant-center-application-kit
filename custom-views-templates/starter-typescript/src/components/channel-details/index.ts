import { lazy } from 'react';

const ChannelDetails = lazy(
  () => import('./channel-details' /* webpackChunkName: "channel-details" */)
);

export default ChannelDetails;
