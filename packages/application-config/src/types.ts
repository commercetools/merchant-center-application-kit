import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';

import { CLOUD_IDENTIFIERS } from './constants';

// The config as defined in the JSON schema
export type ApplicationConfig = JSONSchemaForCustomApplicationConfigurationFiles;
// Supported environment variables
export type ApplicationConfigEnv = 'production' | 'development';

export type Scalar = number | boolean | string;
export type JSONConfig = {
  [key: string]: Scalar | Scalar[] | JSONConfig[] | JSONConfig;
};

export type CloudIdentifier = typeof CLOUD_IDENTIFIERS[keyof typeof CLOUD_IDENTIFIERS];

// The object result after processing the config file
export type ApplicationConfigResult = {
  env: ApplicationWindow['app'];
  headers: JSONSchemaForCustomApplicationConfigurationFiles['headers'];
};
