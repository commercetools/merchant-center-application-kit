import fs from 'fs';
import getInObject from 'lodash/get';
import { transformSync } from '@babel/core';
import { cosmiconfigSync, defaultLoaders, type LoaderSync } from 'cosmiconfig';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import { MissingOrInvalidConfigError } from './errors';

/**
 * Custom JS module loader.
 * This loader is used to load Custom Application config files that are not JSON files,
 * for example any JS or TS files.
 * To load the file, we need to make sure that we use our Babel preset to allow parsing
 * the file with the supported features. TypeScript files are also loaded via the preset.
 * Futhermore, we need to load the config file as a module, meaning that the exported
 * Custom Application config can potentially contain JS functions.
 * To do that, we need to first compile the file via Babel and then `require` it via Node.
 * To keep things simple, we write a temporary file to the file system with the compiled code,
 * require it and remove the compiled file again.
 */
const loadJsModule: LoaderSync = (filePath, content) => {
  // Compile the config file with our Babel preset.
  const transformResult = transformSync(content, {
    filename: filePath,
    babelrc: false,
    presets: [
      require.resolve('@commercetools-frontend/babel-preset-mc-app/production'),
    ],
  });

  if (!transformResult?.code) {
    throw new Error(
      `Failed to read Custom Application config file "${filePath}".`
    );
  }

  const compiledConfigFilePath = `${filePath}.compiled`;
  // Write the compiled config file.
  fs.writeFileSync(compiledConfigFilePath, transformResult.code, {
    encoding: 'utf8',
  });

  // Require the compiled module.
  const moduleExport = require(compiledConfigFilePath);

  // Remove the compiled module.
  fs.rmSync(compiledConfigFilePath, { force: true });

  // In case we are loading an ES module, we need to pick the `default` export.
  return getInObject(moduleExport, 'default', moduleExport);
};

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
    '.js': loadJsModule,
    '.cjs': loadJsModule,
    '.mjs': loadJsModule,
    '.ts': loadJsModule,
  },
});

export const getConfigPath = () => {
  const configFile = explorer.search();
  if (!configFile) {
    throw new Error(
      `Missing or invalid Custom Application configuration file.`
    );
  }
  return configFile.filepath;
};

const loadConfig = (
  applicationPath: string
): JSONSchemaForCustomApplicationConfigurationFiles => {
  const configFile = explorer.search(applicationPath);

  if (!configFile || !configFile.config) {
    throw new MissingOrInvalidConfigError(
      `Missing or invalid Custom Application configuration file.`
    );
  }
  return configFile.config;
};

export default loadConfig;
