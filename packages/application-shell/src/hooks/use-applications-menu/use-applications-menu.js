import React from 'react';
import { useLazyQuery } from 'react-apollo';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import FetchApplicationsMenu from './fetch-applications-menu.graphql';

const defaultApiUrl = window.location.origin;

const defaultConfig = {
  queryOptions: {},
  skipRemoteQuery: false,
  options: {},
};

const useApplicationsMenu = (config = {}) => {
  const shallowlyMergedConfig = { ...defaultConfig, ...config };

  const [menu, setMenu] = React.useState(null);

  // Memoize the function to get the local config, for local development
  const getDevConfig = React.useCallback(() => {
    const { __DEV_CONFIG__: devConfig } = shallowlyMergedConfig.options;
    if (!devConfig) {
      throw new Error(
        'In development mode, you need to pass `__DEV_CONFIG__` options to `useApplicationsMenu`.'
      );
    }
    return devConfig;
  }, [shallowlyMergedConfig.options]);

  // Trigger loading the menu from local file, for local development
  React.useEffect(() => {
    if (shallowlyMergedConfig.skipRemoteQuery) {
      const devConfig = getDevConfig();
      if (devConfig.menuLoader) {
        devConfig.menuLoader().then(setMenu);
      }
    }
  }, [getDevConfig, shallowlyMergedConfig.skipRemoteQuery]);

  // Prepare to fetch config.
  // We set up the apollo query as lazy, in order to execute it conditionally
  // since hooks cannot be defined conditionally.
  const mcProxyApiUrl = useApplicationContext(
    context => context.environment.mcProxyApiUrl
  );
  const [
    loadMenuData,
    { called: hasApplicationsMenuQueryBeenCalled, data: menuQueryResult },
  ] = useLazyQuery(FetchApplicationsMenu, {
    ...shallowlyMergedConfig.queryOptions,
    fetchPolicy:
      shallowlyMergedConfig.queryOptions.fetchPolicy || 'cache-first',
    context: {
      // Allow to overwrite the API url from `env.json`
      uri: `${mcProxyApiUrl || defaultApiUrl}/api/graphql`,
    },
  });

  // Return the local config
  if (shallowlyMergedConfig.skipRemoteQuery) {
    const devConfig = getDevConfig();
    const fakeGraphqlResponse = menu
      ? {
          [devConfig.menuKey]: Array.isArray(menu) ? menu : [menu],
        }
      : {};
    return fakeGraphqlResponse;
  }

  // Fetch the query remotely
  if (!hasApplicationsMenuQueryBeenCalled) {
    loadMenuData();
    return null;
  }
  return menuQueryResult && menuQueryResult.applicationsMenu;
};

export default useApplicationsMenu;
