import { CustomApplicationData } from './types';

export const getCustomApplicationDevelopmentConfig = (
  configurationData: CustomApplicationData
) => ({
  menuLinks: {
    icon: configurationData.icon,
    ...configurationData.mainMenuLink,
    submenuLinks: configurationData.submenuLinks,
  },
  // @ts-expect-error: the `accountLinks` is not explicitly typed as it's only used by the account app.
  accountLinks: appConfig.accountLinks,
});

export const getCustomApplicationProductionConfig = (
  configurationData: CustomApplicationData
) => ({
  applicationName: configurationData.name,
  entryPointUriPath: configurationData.entryPointUriPath,
});
