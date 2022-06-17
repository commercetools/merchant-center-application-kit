import {
  setupGlobalErrorListener,
  ApplicationShell,
} from '@commercetools-frontend/application-shell';

// Ensure to setup the global error listener before any React component renders
// in order to catch possible errors on rendering/mounting.
setupGlobalErrorListener();

const EntryPoint = () => {
  return (
    <ApplicationShell
    // ...props
    />
  );
};
