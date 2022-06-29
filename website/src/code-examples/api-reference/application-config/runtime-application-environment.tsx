import type { ApplicationWindow } from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

const EntryPoint = () => (
  <ApplicationShell
    environment={window.app}
    // other props
  />
);
