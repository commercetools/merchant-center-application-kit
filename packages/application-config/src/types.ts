import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';

import { CLOUD_IDENTIFIERS } from './constants';

export type TJSONSchemaForCustomApplicationConfigurationFiles = JSONSchemaForCustomApplicationConfigurationFiles;

export type CloudIdentifier = typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS];

// Supported environment variables
export type ApplicationConfigEnv = 'production' | 'development';

// The object result after processing the config file
export type ApplicationConfig = {
  env: ApplicationWindow['app'];
  headers: JSONSchemaForCustomApplicationConfigurationFiles['headers'];
};
