import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import type { LoaderSync } from 'cosmiconfig';

import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { cosmiconfigSync, defaultLoaders } from 'cosmiconfig';
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
  // Load the JS module using a child process. This is primarly to avoid
  // unwanted behaviors using `@babel/register` in the main process.
  // The loader script does the actual `require` of the given `filePath`
  // and uses `@babel/register` to correctly parse and execute the file.
  // The "required module output" is then written into `stdout` and parsed
  // as JSON.
  const output = execFileSync(
    'node',
    [path.join(packageRootPath, 'scripts/load-js-module.js'), filePath],
    { encoding: 'utf8' }
  );
  return JSON.parse(output);
};

const moduleName = 'custom-application-config';
export const explorer = cosmiconfigSync(moduleName, {
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
