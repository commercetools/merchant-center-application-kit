import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const MyComponent = () => {
  const applicationName = useApplicationContext(
    (context) => context.environment.applicationName
  );
  return <div>{`Welcome to the application ${applicationName}!`}</div>;
};
