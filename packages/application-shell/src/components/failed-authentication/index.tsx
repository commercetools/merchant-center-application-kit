import { lazy } from 'react';

const FailedAuthentication = lazy(
  () =>
    import(
      './failed-authentication' /* webpackChunkName: "failed-authentication" */
    )
);

export default FailedAuthentication;
