import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import type { LoaderSync } from 'cosmiconfig';

import { cosmiconfigSync, defaultLoaders } from 'cosmiconfig';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './custom-application.schema';
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

const getExplorer = (configFileName: string) => {
  return cosmiconfigSync(configFileName, {
    // Restrict the supported file formats / names
    searchPlaces: [
      `.${configFileName}rc`,
      `.${configFileName}.json`,
      `.${configFileName}.js`,
      `.${configFileName}.cjs`,
      `.${configFileName}.mjs`,
      `.${configFileName}.ts`,
      `${configFileName}.json`,
      `${configFileName}.js`,
      `${configFileName}.cjs`,
      `${configFileName}.mjs`,
      `${configFileName}.ts`,
    ],
    loaders: {
      noExt: defaultLoaders['.json'],
      '.js': loadJsModule,
      '.cjs': loadJsModule,
      '.mjs': loadJsModule,
      '.ts': loadJsModule,
    },
  });
};

const customApplicationExplorer = getExplorer('custom-application-config');
const customViewExplorer = getExplorer('custom-view-config');

export const getConfigPath = () => {
  const customApplicationConfigFile = customApplicationExplorer.search();
  const customViewConfigFile = customViewExplorer.search();

  if (!customApplicationConfigFile && !customViewConfigFile) {
    throw new Error(`Missing or invalid configuration file.`);
  }
  return (
    customApplicationConfigFile?.filepath || customViewConfigFile?.filepath
  );
};

const loadConfig = (
  applicationPath: string
): {
  filepath: string;
  config: JSONSchemaForCustomApplicationConfigurationFiles;
} => {
  const customApplicationConfigFile =
    customApplicationExplorer.search(applicationPath);
  const customViewConfigFile = customViewExplorer.search(applicationPath);

  if (
    (!customApplicationConfigFile || !customApplicationConfigFile.config) &&
    (!customViewConfigFile || !customViewConfigFile.config)
  ) {
    throw new MissingOrInvalidConfigError(
      `Missing or invalid configuration file.`
    );
  }
  return (customApplicationConfigFile || customViewConfigFile)!;
};

export default loadConfig;
