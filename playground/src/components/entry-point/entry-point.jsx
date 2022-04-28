import { lazy } from 'react';
import {
  ApplicationShell,
  setupGlobalErrorListener,
} from '@commercetools-frontend/application-shell';
import loadMessages from '../../messages';

// Here we split up the main (app) bundle with the actual application business logic.
// Splitting by route is usually recommended and you can potentially have a splitting
// point for each route. More info at https://reactjs.org/docs/code-splitting.html
const AsyncPlaygroundRoutes = lazy(
  () => import('../../routes' /* webpackChunkName: "app-kit-playground" */)
);

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener();

const EntryPoint = () => (
  <ApplicationShell environment={window.app} applicationMessages={loadMessages}>
    <AsyncPlaygroundRoutes />
  </ApplicationShell>
);
EntryPoint.displayName = 'EntryPoint';

export default EntryPoint;
