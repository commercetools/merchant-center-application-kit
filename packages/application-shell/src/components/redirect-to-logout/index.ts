import { lazy } from 'react';

const RedirectToLogout = lazy(
  () =>
    import('./redirect-to-logout' /* webpackChunkName: "redirect-to-logout" */)
);

export default RedirectToLogout;
