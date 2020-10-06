import type { QueryFunctionOptions } from '@apollo/client/react';
import type {
  TFetchApplicationsMenuQuery,
  TFetchApplicationsMenuQueryVariables,
} from '../../types/generated/proxy';

import React from 'react';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useMcLazyQuery } from '../../hooks/apollo-hooks';
import FetchApplicationsMenu from './fetch-applications-menu.proxy.graphql';

export type MenuKey = 'appBar' | 'navBar';
export type MenuLoaderResult<Key extends MenuKey> = Key extends 'appBar'
  ? TFetchApplicationsMenuQuery['applicationsMenu']['appBar']
  : Key extends 'navBar'
  ? TFetchApplicationsMenuQuery['applicationsMenu']['navBar']
  : never;
type BaseConfig = {
  queryOptions?: QueryFunctionOptions;
  skipRemoteQuery?: boolean;
};
export type Config<Key extends MenuKey> = BaseConfig & {
  loadMenuConfig?: () => Promise<MenuLoaderResult<Key>>;
};

const defaultApiUrl = window.location.origin;

function useApplicationsMenu<Key extends MenuKey>(
  menuKey: Key,
  config: Config<Key> = {}
) {
  const [menu, setMenu] = React.useState<MenuLoaderResult<Key>>();

  // Trigger loading the menu from local file, for local development
  React.useEffect(() => {
    if (config.skipRemoteQuery === true && config.loadMenuConfig && !menu) {
      config.loadMenuConfig().then(setMenu);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Make sure to run this effect only once, otherwise we might end up in an infinite loop!

  // Prepare to fetch config.
  // We set up the apollo query as lazy, in order to execute it conditionally
  // since hooks cannot be defined conditionally.
  const mcProxyApiUrl = useApplicationContext(
    (context) => context.environment.mcProxyApiUrl
  );
  const queryOptions = config.queryOptions || {};
  const [
    loadMenuData,
    { called: hasApplicationsMenuQueryBeenCalled, data: menuQueryResult },
  ] = useMcLazyQuery<
    TFetchApplicationsMenuQuery,
    TFetchApplicationsMenuQueryVariables
  >(FetchApplicationsMenu, {
    ...queryOptions,
    fetchPolicy: queryOptions.fetchPolicy || 'cache-first',
    variables: {},
    context: {
      // Allow to overwrite the API url from application config
      uri: `${mcProxyApiUrl || defaultApiUrl}/api/graphql`,
      skipGraphQlTargetCheck: true,
    },
  });

  // Return the local config
  if (config.skipRemoteQuery === true) {
    const fakeGraphqlResponse = menu
      ? Array.isArray(menu)
        ? menu
        : [menu]
      : undefined;
    return fakeGraphqlResponse;
  }

  // Fetch the query remotely
  if (!hasApplicationsMenuQueryBeenCalled) {
    loadMenuData();
    return;
  }

  if (menuQueryResult && menuQueryResult.applicationsMenu) {
    return menuQueryResult.applicationsMenu[menuKey];
  }

  return;
}

export default useApplicationsMenu;
