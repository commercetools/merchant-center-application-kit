import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
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
  }, [mergedConfig.options]);

  // Trigger loading the menu from local file, for local development
  React.useEffect(() => {
    if (mergedConfig.skipRemoteQuery) {
      const devConfig = getDevConfig();
      if (devConfig.menuLoader) {
        devConfig.menuLoader().then(setMenu);
      }
    }
  }, [getDevConfig, mergedConfig.skipRemoteQuery]);

  // Prepare to fetch config.
  // We set up the apollo query as lazy, in order to execute it conditionally
  // since hooks cannot be defined conditionally.
  const environment = useApplicationContext(context => context.environment);
  const [loadMenuData, { called, data }] = useLazyQuery(FetchApplicationsMenu, {
    ...mergedConfig.queryOptions,
    fetchPolicy: mergedConfig.queryOptions.fetchPolicy || 'cache-first',
    context: {
      // Allow to overwrite the API url from `env.json`
      uri: `${environment.mcProxyApiUrl || defaultApiUrl}/api/graphql`,
    },
  });

  // Return the local config
  if (mergedConfig.skipRemoteQuery) {
    const devConfig = getDevConfig();
    const fakeGraphqlResponse = menu
      ? {
          [devConfig.menuKey]: Array.isArray(menu) ? menu : [menu],
        }
      : {};
    return fakeGraphqlResponse;
  }

  // Fetch the query remotely
  if (!called) {
    loadMenuData();
    return null;
  }
  return data && data.applicationsMenu;
};

export default useApplicationsMenu;
