import { lazy } from 'react';

const RedirectToLogin = lazy(
  () =>
    import('./redirect-to-login' /* webpackChunkName: "redirect-to-login" */)
);

export default RedirectToLogin;
