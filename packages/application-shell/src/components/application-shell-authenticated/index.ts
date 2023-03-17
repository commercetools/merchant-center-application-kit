import { lazy } from 'react';

const ApplicationShellAuthenticated = lazy(
  () =>
    import(
      './application-shell-authenticated' /* webpackChunkName: "application-shell-authenticated" */
    )
);

export default ApplicationShellAuthenticated;
