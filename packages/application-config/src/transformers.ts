import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import type { CustomApplicationData } from './types';
import { entryPointUriPathToPermissionKeys } from './formatters';

function transformCustomApplicationConfigToData(
  appConfig: JSONSchemaForCustomApplicationConfigurationFiles
): CustomApplicationData {
  const permissionKeys = entryPointUriPathToPermissionKeys(
    appConfig.entryPointUriPath
  );

  return {
    id: appConfig.env.production.applicationId,
    name: appConfig.name,
    description: appConfig.description,
    entryPointUriPath: appConfig.entryPointUriPath,
    url: appConfig.env.production.url,
    permissions: [
      {
        name: permissionKeys.View,
        oAuthScopes: appConfig.oAuthScopes.view,
      },
      {
        name: permissionKeys.Manage,
        oAuthScopes: appConfig.oAuthScopes.manage,
      },
    ],
    icon: appConfig.icon,
    mainMenuLink: appConfig.mainMenuLink,
    submenuLinks: appConfig.submenuLinks,
  };
}

export { transformCustomApplicationConfigToData };
