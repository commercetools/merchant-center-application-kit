import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';

import { cosmiconfigSync, defaultLoaders } from 'cosmiconfig';

const moduleName = 'custom-application-config';
const explorer = cosmiconfigSync(moduleName, {
  // Restrict the supported file formats / names
  searchPlaces: [
    `.${moduleName}rc`,
    `.${moduleName}.json`,
    `${moduleName}.json`,
  ],
  loaders: {
    noExt: defaultLoaders['.json'],
  },
});

let cachedConfig: JSONSchemaForCustomApplicationConfigurationFiles | undefined;
const loadConfig = ():
  | JSONSchemaForCustomApplicationConfigurationFiles
  | undefined => {
  if (cachedConfig) {
    return cachedConfig;
  }
  const configFile = explorer.search();
  if (configFile && configFile.config) {
    cachedConfig = configFile.config;
  }
  return cachedConfig;
};

export default loadConfig;
