import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const useIsServedByProxy = () => {
  const servedByProxy = useApplicationContext(
    (context) => context.environment.servedByProxy
  );
  return servedByProxy;
};

export default useIsServedByProxy;
