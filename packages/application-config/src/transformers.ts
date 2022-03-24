import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import type { CustomApplicationData } from './types';
import { entryPointUriPathToResourceAccesses } from './formatters';

function transformCustomApplicationConfigToData(
  appConfig: JSONSchemaForCustomApplicationConfigurationFiles
): CustomApplicationData {
  const permissionKeys = entryPointUriPathToResourceAccesses(
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
        name: permissionKeys.view,
        oAuthScopes: appConfig.oAuthScopes.view,
      },
      {
        name: permissionKeys.manage,
        oAuthScopes: appConfig.oAuthScopes.manage,
      },
    ],
    icon: appConfig.icon,
    mainMenuLink: appConfig.mainMenuLink,
    submenuLinks: appConfig.submenuLinks,
  };
}

export { transformCustomApplicationConfigToData };
