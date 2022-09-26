import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import type { CustomApplicationData } from './types';
import {
  entryPointUriPathToResourceAccesses,
  formatEntryPointUriPathToResourceAccessKey,
} from './formatters';
import {
  validateEntryPointUriPath,
  validateSubmenuLinks,
  validateAdditionalOAuthScopes,
} from './validations';
import sanitizeSvg from './sanitize-svg';

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

type TResourceAccessPermissionName<PermissionName extends string = ''> =
  | `view${Capitalize<PermissionName>}`
  | `manage${Capitalize<PermissionName>}`;

type TImplicitCustomApplicationResourceAccesses<
  PermissionName extends string = ''
> = Record<TResourceAccessPermissionName<PermissionName>, string[]>;

function transformCustomApplicationConfigToData(
  appConfig: JSONSchemaForCustomApplicationConfigurationFiles
): CustomApplicationData {
  validateEntryPointUriPath(appConfig);
  validateSubmenuLinks(appConfig);
  validateAdditionalOAuthScopes(appConfig);

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
  }, {} as TImplicitCustomApplicationResourceAccesses<PermissionName>);

  const additionalPermissionNames =
    appConfig.additionalOAuthScopes?.map(({ name }) => name) || [];

  const permissionKeys = entryPointUriPathToResourceAccesses(
    appConfig.entryPointUriPath,
    additionalPermissionNames
  );

  const additionalPermissions = (
    Object.keys(
      additionalResourceAccessKeyToOauthScopeMap || []
    ) as TResourceAccessPermissionName<PermissionName>[]
  ).map((additionalResourceAccessKey) => ({
    name: permissionKeys[additionalResourceAccessKey],
    oAuthScopes:
      additionalResourceAccessKeyToOauthScopeMap[additionalResourceAccessKey],
  }));

  return {
    id: appConfig.env.production.applicationId,
    name: appConfig.name,
    description: appConfig.description,
    entryPointUriPath: appConfig.entryPointUriPath,
    url: appConfig.env.production.url,
    permissions: [
      {
        name: permissionKeys.view,
        oAuthScopes: appConfig.oAuthScopes.view,
      },
      {
        name: permissionKeys.manage,
        oAuthScopes: appConfig.oAuthScopes.manage,
      },
      ...additionalPermissions,
    ],
    icon: sanitizeSvg(appConfig.icon),
    mainMenuLink: appConfig.mainMenuLink,
    submenuLinks: appConfig.submenuLinks.map((submenuLink) => ({
      ...submenuLink,
      uriPath: computeUriPath(submenuLink.uriPath, appConfig.entryPointUriPath),
    })),
  };
}

export { transformCustomApplicationConfigToData };
