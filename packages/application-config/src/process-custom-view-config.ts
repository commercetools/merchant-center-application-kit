import { JSONSchemaForCustomViewConfigurationFiles } from './custom-view.schema';
import { CustomViewData } from './types';

export const getCustomViewDevelopmentConfig = (
  configurationData: CustomViewData,
  appConfig: JSONSchemaForCustomViewConfigurationFiles
) => ({
  customViewConfig: configurationData,
  customViewHostUrl: appConfig.env.development.hostUrl,
});

export const getCustomViewProductionConfig = (
  configurationData: CustomViewData
) => ({
  customViewId: configurationData.id,
});
