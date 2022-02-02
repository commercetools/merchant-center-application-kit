import type { QueryFunctionOptions } from '@apollo/client/react';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import type {
  ApplicationWindow,
  ApplicationMenuLinksForDevelopmentConfig,
  TLocalizedField,
} from '@commercetools-frontend/constants';
import type {
  TFetchApplicationsMenuQuery,
  TFetchApplicationsMenuQueryVariables,
} from '../../types/generated/proxy';

import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useMcLazyQuery } from '../../hooks/apollo-hooks';
import FetchApplicationsMenu from './fetch-applications-menu.proxy.graphql';

const supportedLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN', 'ja'];

export type MenuKey = 'appBar' | 'navBar';
export type MenuLoaderResult<Key extends MenuKey> = Key extends 'appBar'
  ? TFetchApplicationsMenuQuery['applicationsMenu']['appBar']
  : Key extends 'navBar'
  ? TFetchApplicationsMenuQuery['applicationsMenu']['navBar']
  : never;
export type Config = {
  environment: TApplicationContext<{}>['environment'];
  queryOptions?: {
    onError?: QueryFunctionOptions['onError'];
  };
};

const defaultApiUrl = window.location.origin;

const mapLabelAllLocalesWithDefaults = (
  labelAllLocales: TLocalizedField[],
  defaultLabel?: string
): Array<{ __typename: 'LocalizedField' } & TLocalizedField> => {
  let mappedLabelAllLocales = labelAllLocales;
  if (defaultLabel) {
    // Map all supported locales with the given localized labels.
    // If a locale is not defined in the config, we use the `default` label as the value.
    // This is only needed for development as we're trying to map two different schemas.
    mappedLabelAllLocales = supportedLocales.map((supportedLocale) => {
      const existingField = labelAllLocales.find(
        (field) => field.locale === supportedLocale
      );
      if (existingField) return existingField;
      return {
        locale: supportedLocale,
        value: defaultLabel,
      };
    });
  }

  // Add the `__typename`.
  return mappedLabelAllLocales.map((field) => ({
    __typename: 'LocalizedField',
    ...field,
  }));
};
/**
 * Transform menu links defined in the `custom-application-config.json` to the `FetchApplicationsMenu` schema.
 * This is only needed for development.
 */
const mapApplicationMenuConfigToGraqhQLQueryResult = (
  applicationConfig: ApplicationWindow['app']
): TFetchApplicationsMenuQuery => {
  const entryPointUriPath = applicationConfig.entryPointUriPath;
  const menuLinks = applicationConfig.__DEVELOPMENT__?.menuLinks;
  // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
  const accountLinks = (applicationConfig.__DEVELOPMENT__?.accountLinks! ??
    []) as ApplicationMenuLinksForDevelopmentConfig['submenuLinks'];

  return {
    applicationsMenu: {
      __typename: 'ApplicationsMenu',
      navBar: menuLinks
        ? [
            {
              __typename: 'NavbarMenu',
              shouldRenderDivider: false,
              key: entryPointUriPath,
              uriPath: entryPointUriPath,
              icon: menuLinks.icon,
              labelAllLocales: mapLabelAllLocalesWithDefaults(
                menuLinks.labelAllLocales,
                menuLinks.defaultLabel
              ),
              permissions: menuLinks.permissions,
              // @ts-ignore: not defined in schema, as it's only used internally.
              featureToggle: menuLinks.featureToggle ?? null,
              // @ts-ignore: not defined in schema, as it's only used internally.
              menuVisibility: menuLinks.menuVisibility ?? null,
              // @ts-ignore: not defined in schema, as it's only used internally.
              actionRights: menuLinks.actionRights ?? null,
              // @ts-ignore: not defined in schema, as it's only used internally.
              dataFences: menuLinks.dataFences ?? null,
              submenu: menuLinks.submenuLinks.map((submenuLink) => ({
                __typename: 'BaseMenu',
                key: `${entryPointUriPath}-${submenuLink.uriPath}`,
                // The `uriPath` of each submenu link is supposed to be defined relative
                // to the entry point URI path.
                // However, when rendering the link, we need to provide the full uri path.
                // Special case when the value is `/`: it means that the link is supposed to be
                // treated the same as the entry point uri path. In this case, the return value
                // should not contain any unnecessary trailing slash and therefore we return the
                // main value `entryPointUriPath`.
                uriPath:
                  submenuLink.uriPath === '/'
                    ? entryPointUriPath
                    : `${entryPointUriPath}/${submenuLink.uriPath}`,
                labelAllLocales: mapLabelAllLocalesWithDefaults(
                  submenuLink.labelAllLocales,
                  submenuLink.defaultLabel
                ),
                permissions: submenuLink.permissions,
                // @ts-ignore: not defined in schema, as it's only used internally.
                featureToggle: submenuLink.featureToggle ?? null,
                // @ts-ignore: not defined in schema, as it's only used internally.
                menuVisibility: submenuLink.menuVisibility ?? null,
                // @ts-ignore: not defined in schema, as it's only used internally.
                actionRights: submenuLink.actionRights ?? null,
                // @ts-ignore: not defined in schema, as it's only used internally.
                dataFences: submenuLink.dataFences ?? null,
              })),
            },
          ]
        : [],
      appBar: accountLinks.map((menuLink) => ({
        __typename: 'BaseMenu',
        key: menuLink.uriPath,
        uriPath: menuLink.uriPath,
        labelAllLocales: mapLabelAllLocalesWithDefaults(
          menuLink.labelAllLocales,
          menuLink.defaultLabel
        ),
        permissions: menuLink.permissions,
        // @ts-ignore: not defined in schema, as it's only used internally.
        featureToggle: menuLink.featureToggle ?? null,
      })),
    },
  };
};

function useApplicationsMenu<Key extends MenuKey>(
  menuKey: Key,
  config: Config
): MenuLoaderResult<Key> | undefined {
  const apolloClient = useApolloClient();
  const mcProxyApiUrl = useApplicationContext(
    (context) => context.environment.mcProxyApiUrl
  );

  // Fetch all menu links from the GraphQL API in the Merchant Center Proxy.
  // For local development, we don't fetch data from the remote server but use
  // only the configuration for the menu links defined for the application.
  // To do so, we manually write the data in the Apollo cache and use the
  // `fetchPolicy: cache-only` to instruct Apollo to read the data from the cache.
  // NOTE: we lazily execute the query to ensure that (for development) we can
  // write the data into the cache BEFORE the query attempts to read from it.
  // If not, Apollo throws an error like `Can't find field 'applicationMenu' on ROOT_QUERY object`.
  const [executeQuery, { data: menuQueryResult, called }] = useMcLazyQuery<
    TFetchApplicationsMenuQuery,
    TFetchApplicationsMenuQueryVariables
  >(FetchApplicationsMenu, {
    onError: config.queryOptions?.onError,
    fetchPolicy: config.environment.servedByProxy
      ? 'cache-first'
      : 'cache-only',
    context: {
      // Allow to overwrite the API url from application config
      uri: `${mcProxyApiUrl || defaultApiUrl}/api/graphql`,
      skipGraphQlTargetCheck: true,
    },
  });

  // For development, we read the menu data from the configuration file and
  // write it into the Apollo cache.
  useEffect(() => {
    if (
      config.environment.__DEVELOPMENT__ &&
      (config.environment.__DEVELOPMENT__.menuLinks ||
        // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
        config.environment.__DEVELOPMENT__.accountLinks)
    ) {
      const applicationMenu = mapApplicationMenuConfigToGraqhQLQueryResult(
        config.environment
      );
      apolloClient.writeQuery({
        query: FetchApplicationsMenu,
        data: applicationMenu,
      });
    }

    if (!called) {
      executeQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Make sure to run this effect only once, otherwise we might end up in an infinite loop!

  if (menuQueryResult && menuQueryResult.applicationsMenu) {
    return menuQueryResult.applicationsMenu[menuKey] as MenuLoaderResult<Key>;
  }

  return;
}

export default useApplicationsMenu;
