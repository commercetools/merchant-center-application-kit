import { ApplicationShell } from '@commercetools-frontend/application-shell';

const loadMessages = async (locale) => {
  // ...
};

const AsyncApplicationRoutes = React.lazy(
  () => import('../../routes' /* webpackChunkName: "avengers" */)
);

const EntryPoint = () => (
  <ApplicationShell environment={window.app} applicationMessages={loadMessages}>
    <AsyncApplicationRoutes />
  </ApplicationShell>
);

export default EntryPoint;
