import { lazy } from 'react';

const LocaleSwitcher = lazy(
  () => import('./locale-switcher' /* webpackChunkName: "locale-switcher" */)
);

export default LocaleSwitcher;
