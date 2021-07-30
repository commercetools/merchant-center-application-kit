import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';

import { CLOUD_IDENTIFIERS } from './constants';

export type ConfigOptions = JSONSchemaForCustomApplicationConfigurationFiles;

export type CloudIdentifier =
  typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS];

// The object result after processing the config file
export type ApplicationRuntimeConfig = {
  env: ApplicationWindow['app'];
  headers: JSONSchemaForCustomApplicationConfigurationFiles['headers'];
};
