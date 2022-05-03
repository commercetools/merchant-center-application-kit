import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';

import { CLOUD_IDENTIFIERS } from './constants';

export type ConfigOptions = JSONSchemaForCustomApplicationConfigurationFiles;

export type CloudIdentifier =
  typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS];

type LocalizedFieldData = {
  locale: string;
  value: string;
};
type CustomApplicationPermissionData = {
  name: string;
  oAuthScopes: string[];
};
type CustomApplicationMenuLinkData = {
  defaultLabel: string;
  labelAllLocales: LocalizedFieldData[];
  permissions: string[];
};
type CustomApplicationSubmenuLinkData = {
  uriPath: string;
  defaultLabel: string;
  labelAllLocales: LocalizedFieldData[];
  permissions: string[];
};
export type CustomApplicationData = {
  id: string;
  entryPointUriPath: string;
  name: string;
  description?: string;
  url: string;
  icon: string;
  permissions: CustomApplicationPermissionData[];
  mainMenuLink: CustomApplicationMenuLinkData;
  submenuLinks: CustomApplicationSubmenuLinkData[];
};

// The object result after processing the config file
export type ApplicationRuntimeConfig<
  AdditionalEnvironmentProperties extends {} = {}
> = {
  data: CustomApplicationData;
  env: AdditionalEnvironmentProperties & ApplicationWindow['app'];
  headers: JSONSchemaForCustomApplicationConfigurationFiles['headers'];
};

export type LoadingConfigOptions = {
  processEnv: NodeJS.ProcessEnv;
  applicationPath: string;
};
