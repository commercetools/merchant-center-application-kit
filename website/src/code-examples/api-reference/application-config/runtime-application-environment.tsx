import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';

declare const window: typeof Window & {
  app: TApplicationContext<{}>['environment'];
};

const EntryPoint = () => (
  <ApplicationShell
    environment={window.app}
    // other props
  />
);
