import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
// import type { LoaderSync } from 'cosmiconfig';

import { cosmiconfigSync, defaultLoaders } from 'cosmiconfig';
// import get from 'lodash/get';

// const loadJsModule: LoaderSync = (filePath) => {
//   // Load JS modules using Babel, as we need to load
//   // the config synchronously with `require`, no `await import`.
//   require('@babel/register')({
//     babelrc: false,
//     extensions: ['.js', '.cjs', '.mjs', '.ts'],
//     presets: ['@commercetools-frontend/babel-preset-mc-app'],
//   });
//   const result = require(filePath);
//   return get(result, 'default', result);
// };

const moduleName = 'custom-application-config';
const explorer = cosmiconfigSync(moduleName, {
  // Restrict the supported file formats / names
  searchPlaces: [
    `.${moduleName}rc`,
    `.${moduleName}.json`,
    `.${moduleName}.js`,
    `.${moduleName}.cjs`,
    `.${moduleName}.mjs`,
    `.${moduleName}.ts`,
    `${moduleName}.json`,
    `${moduleName}.js`,
    `${moduleName}.cjs`,
    `${moduleName}.mjs`,
    `${moduleName}.ts`,
  ],
  loaders: {
    noExt: defaultLoaders['.json'],
    // '.js': loadJsModule,
    // '.cjs': loadJsModule,
    // '.mjs': loadJsModule,
    // '.ts': loadJsModule,
  },
});

const loadConfig = (
  applicationPath: string
): JSONSchemaForCustomApplicationConfigurationFiles | undefined => {
  const configFile = explorer.search(applicationPath);
  return configFile?.config;
};

export default loadConfig;
