import fs from 'fs';
import path from 'path';
import { cosmiconfigSync, defaultLoaders, type LoaderSync } from 'cosmiconfig';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import { MissingOrInvalidConfigError } from './errors';

// Helper function to find the package root path from the current location,
// for instance in respect to both source files and dist files.
const findPackageRootPath = (dir: string): string => {
  const packageJsonPath = path.join(dir, 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    return dir;
  }
  const parentDir = path.join(dir, '..');
  return findPackageRootPath(parentDir);
};

const loadJsModule: LoaderSync = (filePath) => {
  const packageRootPath = findPackageRootPath(
    // Start from the parent folder
    path.join(__dirname, '..')
  );
  // Load the JS module using a separate module loader. This is primarly to avoid
  // unwanted behaviors using `@babel/register` in the main process.
  // The loader script does the actual `require` of the given `filePath`
  // and uses `@babel/register` to correctly parse and execute the file.
  const requireModule = require(path.join(
    packageRootPath,
    'loaders/load-js-module'
  ));
  return requireModule(filePath);
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
