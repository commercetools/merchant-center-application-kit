import type { QueryFunctionOptions } from '@apollo/client/react';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import type {
  ApplicationWindow,
  ApplicationMenuLinksForDevelopmentConfig,
  TLocalizedField,
} from '@commercetools-frontend/constants';
import type {
  TNavbarMenu,
  TFetchApplicationsMenuQuery,
  TFetchApplicationsMenuQueryVariables,
} from '../../types/generated/proxy';

import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { useMcQuery } from '../../hooks/apollo-hooks';
import FetchApplicationsMenu from './fetch-applications-menu.proxy.graphql';

const supportedLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN', 'ja'];

export type MenuKey = 'appBar' | 'navBar';
export type MenuLoaderResult<Key extends MenuKey> = Key extends 'appBar'
  ? TFetchApplicationsMenuQuery['applicationsMenu']['appBar']
  : Key extends 'navBar'
  ? TFetchApplicationsMenuQuery['applicationsMenu']['navBar']
  : never;
export type Config<Key extends MenuKey> = {
  environment: TApplicationContext<{}>['environment'];
  queryOptions?: QueryFunctionOptions;
  /**
   * @deprecated The `menu.json` file has been deprecated in favor of defining the menu links
   * in the custom application config file.
   */
  loadMenuConfig?: () => Promise<MenuLoaderResult<Key>>;
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
/**
 * Transform menu links defined in the `menu.json` to the `FetchApplicationsMenu` schema.
 * This is only needed for development.
 * @deprecated The `menu.json` file has been deprecated in favor of defining the menu links
 * in the custom application config file.
 */
const mapLegacyMenuJsonToGraphQLQueryResult = <Key extends MenuKey>(
  menuKey: Key,
  menuJson: MenuLoaderResult<Key>
): TFetchApplicationsMenuQuery => {
  return {
    applicationsMenu: {
      __typename: 'ApplicationsMenu',
      // @ts-ignore: to suppress `featureToggle` error.
      navBar:
        menuKey === 'navBar'
          ? menuJson.map((data) => {
              const menuLink = data as TNavbarMenu;
              return {
                __typename: 'NavbarMenu',
                shouldRenderDivider: false,
                key: menuLink.uriPath,
                uriPath: menuLink.uriPath,
                icon: menuLink.icon,
                labelAllLocales: mapLabelAllLocalesWithDefaults(
                  menuLink.labelAllLocales,
                  // There is no `defaultValue`, so we pick the first in the list.
                  menuLink.labelAllLocales[0].value
                ),
                permissions: menuLink.permissions,
                // @ts-ignore: not defined in schema, as it's only used internally.
                featureToggle: menuLink.featureToggle ?? null,
                // @ts-ignore: not defined in schema, as it's only used internally.
                menuVisibility: menuLink.menuVisibility ?? null,
                // @ts-ignore: not defined in schema, as it's only used internally.
                actionRights: menuLink.actionRights ?? null,
                // @ts-ignore: not defined in schema, as it's only used internally.
                dataFences: menuLink.dataFences ?? null,
                submenu: menuLink.submenu.map((submenuLink) => ({
                  __typename: 'BaseMenu',
                  key: `${menuLink.uriPath}-${submenuLink.uriPath}`,
                  uriPath: submenuLink.uriPath,
                  labelAllLocales: mapLabelAllLocalesWithDefaults(
                    submenuLink.labelAllLocales
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
              };
            })
          : [],
      // @ts-ignore: to suppress `featureToggle` error.
      appBar:
        menuKey === 'appBar'
          ? menuJson.map((menuLink) => ({
              __typename: 'BaseMenu',
              key: menuLink.uriPath,
              uriPath: menuLink.uriPath,
              labelAllLocales: mapLabelAllLocalesWithDefaults(
                menuLink.labelAllLocales
              ),
              permissions: menuLink.permissions,
              // @ts-ignore: not defined in schema, as it's only used internally.
              featureToggle: menuLink.featureToggle ?? null,
            }))
          : [],
    },
  };
};

function useApplicationsMenu<Key extends MenuKey>(
  menuKey: Key,
  config: Config<Key>
): MenuLoaderResult<Key> | undefined {
  const apolloClient = useApolloClient();
  const mcProxyApiUrl = useApplicationContext(
    (context) => context.environment.mcProxyApiUrl
  );
  const queryOptions = config.queryOptions || {};

  // Fetch all menu links from the GraphQL API in the Merchant Center Proxy.
  // For local development, we don't fetch data from the remote server but use
  // only the configuration for the menu links defined for the application.
  // To do so, we manually write the data in the Apollo cache and use the
  // `fetchPolicy: cache-only` to instruct Apollo to read the data from the cache.
  const { data: menuQueryResult } = useMcQuery<
    TFetchApplicationsMenuQuery,
    TFetchApplicationsMenuQueryVariables
  >(FetchApplicationsMenu, {
    ...queryOptions,
    fetchPolicy: config.environment.servedByProxy
      ? queryOptions.fetchPolicy || 'cache-first'
      : 'cache-only',
    variables: {},
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
    } else if (!config.environment.servedByProxy && config.loadMenuConfig) {
      config.loadMenuConfig().then((menuConfig) => {
        const menuJson = Array.isArray(menuConfig) ? menuConfig : [menuConfig];
        const applicationMenu = mapLegacyMenuJsonToGraphQLQueryResult<MenuKey>(
          menuKey,
          menuJson
        );
        apolloClient.writeQuery({
          query: FetchApplicationsMenu,
          data: applicationMenu,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Make sure to run this effect only once, otherwise we might end up in an infinite loop!

  if (menuQueryResult && menuQueryResult.applicationsMenu) {
    return menuQueryResult.applicationsMenu[menuKey] as MenuLoaderResult<Key>;
  }

  return;
}

export default useApplicationsMenu;
