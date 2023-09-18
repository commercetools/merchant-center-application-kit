import { LOADED_CONFIG_TYPES } from './constants';
import {
  entryPointUriPathToResourceAccesses,
  formatEntryPointUriPathToResourceAccessKey,
} from './formatters';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schemas/generated/custom-application.schema';
import type { JSONSchemaForCustomViewConfigurationFiles } from './schemas/generated/custom-view.schema';
import type {
  LoadedConfigType,
  CustomApplicationData,
  CustomViewData,
} from './types';
import type {
  TCustomViewPermission,
  TCustomViewType,
  TCustomViewTypeSettings,
} from './types/generated/settings';
import {
  validateEntryPointUriPath,
  validateSubmenuLinks,
  validateAdditionalOAuthScopes,
} from './validations';

// The `uriPath` of each submenu link is supposed to be defined relative
// to the `entryPointUriPath`. Computing the full path is done internally to keep
// the configuration simple.
const computeUriPath = (uriPath: string, entryPointUriPath: string) => {
  // In case the `uriPath` is only `/`, it means that the link is supposed to be
  // treated the same as the main application path. In this case, the return value
  // should not contain any unnecessary trailing slash and therefore we use the `entryPointUriPath`.
  if (uriPath === '/') return entryPointUriPath;
  // In case the `uriPath` is already configured including the `entryPointUriPath`,
  // we return the `uriPath` as-is.
  if (uriPath.startsWith(`${entryPointUriPath}/`)) return uriPath;
  // Return the full path including the `entryPointUriPath` as a prefix.
  return `${entryPointUriPath}/${uriPath}`;
};

const getPermissions = (
  appConfig:
    | JSONSchemaForCustomApplicationConfigurationFiles
    | JSONSchemaForCustomViewConfigurationFiles
) => {
  const additionalResourceAccessKeyToOauthScopeMap = (
    appConfig.additionalOAuthScopes || []
  ).reduce((previousOauthScope, { name, view, manage }) => {
    const formattedResourceKey =
      formatEntryPointUriPathToResourceAccessKey(name);
    return {
      ...previousOauthScope,
      [`view${formattedResourceKey}`]: view,
      [`manage${formattedResourceKey}`]: manage,
    };
  }, {} as Record<string, string[]>);

  const additionalPermissionNames =
    appConfig.additionalOAuthScopes?.map(({ name }) => name) || [];

  const permissionKeys = entryPointUriPathToResourceAccesses(
    (appConfig as JSONSchemaForCustomApplicationConfigurationFiles)
      .entryPointUriPath ||
      (appConfig as JSONSchemaForCustomViewConfigurationFiles).env.production
        .customViewId,
    additionalPermissionNames
  ) as Record<string, string>;

  const additionalPermissions = Object.keys(
    additionalResourceAccessKeyToOauthScopeMap
  ).map((additionalResourceAccessKey) => ({
    name: permissionKeys[additionalResourceAccessKey],
    oAuthScopes:
      additionalResourceAccessKeyToOauthScopeMap[additionalResourceAccessKey],
  }));

  return [
    {
      name: permissionKeys.view,
      oAuthScopes: appConfig.oAuthScopes.view,
    },
    {
      name: permissionKeys.manage,
      oAuthScopes: appConfig.oAuthScopes.manage,
    },
    ...additionalPermissions,
  ];
};

function transformCustomApplicationConfigToData(
  appConfig: JSONSchemaForCustomApplicationConfigurationFiles
): CustomApplicationData {
  validateEntryPointUriPath(appConfig);
  validateSubmenuLinks(appConfig);
  validateAdditionalOAuthScopes(appConfig);

  return {
    id: appConfig.env.production.applicationId,
    name: appConfig.name,
    description: appConfig.description,
    entryPointUriPath: appConfig.entryPointUriPath,
    url: appConfig.env.production.url,
    permissions: getPermissions(appConfig),
    icon: appConfig.icon,
    mainMenuLink: appConfig.mainMenuLink,
    submenuLinks: appConfig.submenuLinks.map((submenuLink) => ({
      ...submenuLink,
      uriPath: computeUriPath(submenuLink.uriPath, appConfig.entryPointUriPath),
    })),
  };
}

function transformCustomViewConfigToData(
  customViewConfig: JSONSchemaForCustomViewConfigurationFiles
): CustomViewData {
  validateAdditionalOAuthScopes(customViewConfig);

  return {
    id: customViewConfig.env.production.customViewId,
    defaultLabel: customViewConfig.name,
    labelAllLocales: customViewConfig.labelAllLocales,
    description: customViewConfig.description,
    url: customViewConfig.env.production.url,
    permissions: getPermissions(customViewConfig) as TCustomViewPermission[],
    locators: customViewConfig.locators,
    type: customViewConfig.type as TCustomViewType,
    typeSettings: customViewConfig.typeSettings as TCustomViewTypeSettings,
  };
}

export function transformConfigurationToData(
  configType: LoadedConfigType,
  configuration:
    | JSONSchemaForCustomApplicationConfigurationFiles
    | JSONSchemaForCustomViewConfigurationFiles
): CustomApplicationData | CustomViewData {
  if (configType === LOADED_CONFIG_TYPES.CUSTOM_APPLICATION) {
    return transformCustomApplicationConfigToData(
      configuration as JSONSchemaForCustomApplicationConfigurationFiles
    );
  } else if (configType === LOADED_CONFIG_TYPES.CUSTOM_VIEW) {
    return transformCustomViewConfigToData(
      configuration as JSONSchemaForCustomViewConfigurationFiles
    );
  } else {
    throw new Error(`Invalid config type: ${configType}`);
  }
}
