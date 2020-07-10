import type { ApplicationConfig } from './types';

import { cosmiconfigSync, defaultLoaders } from 'cosmiconfig';

const moduleName = 'applicationconfig';
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

let cachedConfig: ApplicationConfig | undefined;
const loadConfig = (): ApplicationConfig | undefined => {
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
