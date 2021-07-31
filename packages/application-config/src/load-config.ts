import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schema';
import type { LoaderSync } from 'cosmiconfig';

import { execFileSync } from 'child_process';
import path from 'path';
import { cosmiconfigSync, defaultLoaders } from 'cosmiconfig';

const loadJsModule: LoaderSync = (filePath) => {
  // Load the JS module using a child process. This is primarly to avoid
  // unwanted behaviors using `@babel/register` in the main process.
  // The loader script does the actual `require` of the given `filePath`
  // and uses `@babel/register` to correctly parse and execute the file.
  // The "required module output" is then written into `stdout` and parsed
  // as JSON.
  const output = execFileSync(
    path.join(__dirname, 'loaders/js-module.js'),
    [filePath],
    { encoding: 'utf8' }
  );
  return JSON.parse(output);
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

const loadConfig = (
  applicationPath: string
): JSONSchemaForCustomApplicationConfigurationFiles | undefined => {
  const configFile = explorer.search(applicationPath);
  return configFile?.config;
};

export default loadConfig;
