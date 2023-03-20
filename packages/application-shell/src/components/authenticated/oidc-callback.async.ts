import { lazy } from 'react';

const OidcCallback = lazy(
  () => import('./oidc-callback' /* webpackChunkName: "oidc-callback" */)
);

export default OidcCallback;
