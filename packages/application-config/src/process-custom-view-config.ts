import { CustomViewData } from './types';

export const getCustomViewDevelopmentConfig = (
  configurationData: CustomViewData
) => ({
  customViewType: configurationData.type,
  customViewTypeSettings: configurationData.typeSettings,
  customViewHostUrl: configurationData.hostUrl,
});

export const getCustomViewProductionConfig = (
  configurationData: CustomViewData
) => ({
  customViewId: configurationData.id,
});
