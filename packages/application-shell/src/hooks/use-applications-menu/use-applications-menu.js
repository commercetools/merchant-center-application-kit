import React from 'react';
import { useQuery } from 'react-apollo';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import FetchApplicationsMenu from './fetch-applications-menu.graphql';

const defaultApiUrl = window.location.origin;

const defaultConfig = {
  queryOptions: {},
  skipRemoteQuery: false,
  options: {},
};

const useApplicationsMenu = (config = {}) => {
  const mergedConfig = { ...defaultConfig, ...config };

  const [menu, setMenu] = React.useState(null);

  // Memoize the function to get the local config, for local development
  const getDevConfig = React.useCallback(() => {
    const { __DEV_CONFIG__: devConfig } = mergedConfig.options;
    if (!devConfig) {
      throw new Error(
        'In development mode, you need to pass `__DEV_CONFIG__` options to `useApplicationsMenu`.'
      );
    }
    return devConfig;
  }, [config]);

  // Trigger loading the menu from local file, for local development
  React.useEffect(() => {
    if (mergedConfig.skipRemoteQuery) {
      const devConfig = getDevConfig();
      if (devConfig.menuLoader) {
        devConfig.menuLoader().then(setMenu);
      }
    }
  }, [config]);

  if (mergedConfig.skipRemoteQuery) {
    const devConfig = getDevConfig();
    const fakeGraphqlResponse = menu
      ? {
          [devConfig.menuKey]: Array.isArray(menu) ? menu : [menu],
        }
      : {};
    return fakeGraphqlResponse;
  }

  // Fetch the config remotely
  const environment = useApplicationContext(context => context.environment);
  const { data } = useQuery(FetchApplicationsMenu, {
    ...mergedConfig.queryOptions,
    fetchPolicy: mergedConfig.queryOptions.fetchPolicy || 'cache-first',
    context: {
      // Allow to overwrite the API url from `env.json`
      uri: `${environment.mcProxyApiUrl || defaultApiUrl}/api/graphql`,
    },
  });
  return data && data.applicationsMenu;
};

export default useApplicationsMenu;
