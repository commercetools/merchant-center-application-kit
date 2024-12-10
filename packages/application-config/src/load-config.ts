import fs from 'node:fs/promises';
import path from 'node:path';
import {
  cosmiconfig,
  defaultLoaders,
  defaultLoadersSync,
  Loader,
} from 'cosmiconfig';
import { TypeScriptLoader } from 'cosmiconfig-typescript-loader';
import { MissingOrInvalidConfigError } from './errors';
import type { JSONSchemaForCustomApplicationConfigurationFiles } from './schemas/generated/custom-application.schema';
import type { JSONSchemaForCustomViewConfigurationFiles } from './schemas/generated/custom-view.schema';

// See the following issues for more context, contributing to failing Jest tests:
//  - Issue: https://github.com/nodejs/node/issues/40058
//  - Resolution: https://github.com/nodejs/node/pull/48510 (Node v20.8.0)
// Copied from @commitlint/load/src/utils/load-config.ts
export const isDynamicAwaitSupported = () => {
  const [major, minor] = process.version
    .replace('v', '')
    .split('.')
    .map((val) => parseInt(val));

  return major >= 20 && minor >= 8;
};

// Is the given directory set up to use ESM (ECMAScript Modules)?
// Copied from @commitlint/load/src/utils/load-config.ts
export const isEsmModule = async (cwd: string) => {
  const packagePath = path.join(cwd, 'package.json');

  try {
    const packageJSON = await fs.readFile(packagePath, {
      encoding: 'utf-8',
    });
    return JSON.parse(packageJSON)?.type === 'module';
  } catch (error) {
    return false;
  }
};

const createExplorerFor = async (configFileName: string) => {
  // Copied from @commitlint/load/src/utils/load-config.ts
  let tsLoaderInstance: Loader | undefined;
  const tsLoader: Loader = (...args) => {
    if (!tsLoaderInstance) {
      tsLoaderInstance = TypeScriptLoader();
    }
    return tsLoaderInstance(...args);
  };

  // If dynamic await is supported (Node >= v20.8.0) or directory uses ESM, support
  // async js/cjs loaders (dynamic import). Otherwise, use synchronous js/cjs loaders.
  const loaders =
    isDynamicAwaitSupported() || (await isEsmModule(process.cwd()))
      ? defaultLoaders
      : defaultLoadersSync;

  return cosmiconfig(configFileName, {
    searchStrategy: 'project',
    searchPlaces: [
      `${configFileName}.js`,
      `${configFileName}.cjs`,
      `${configFileName}.mjs`,
      `${configFileName}.ts`,
    ],
    loaders: {
      '.js': loaders['.js'],
      '.cjs': loaders['.cjs'],
      '.mjs': tsLoader,
      '.ts': tsLoader,
    },
  });
};

export const getConfigPath = async () => {
  const customApplicationExplorer = await createExplorerFor(
    'custom-application-config'
  );
  const customViewExplorer = await createExplorerFor('custom-view-config');
  const customApplicationConfigFile = await customApplicationExplorer.search();
  const customViewConfigFile = await customViewExplorer.search();

  if (!customApplicationConfigFile && !customViewConfigFile) {
    throw new Error(`Missing or invalid configuration file.`);
  }
  return (
    customApplicationConfigFile?.filepath || customViewConfigFile?.filepath
  );
};

export type TLoadConfigResult = {
  filepath: string;
  config:
    | JSONSchemaForCustomApplicationConfigurationFiles
    | JSONSchemaForCustomViewConfigurationFiles;
};

const loadConfig = async (
  applicationPath: string
): Promise<TLoadConfigResult> => {
  const customApplicationExplorer = await createExplorerFor(
    'custom-application-config'
  );
  const customViewExplorer = await createExplorerFor('custom-view-config');
  const customApplicationConfigFile = await customApplicationExplorer.search(
    applicationPath
  );
  const customViewConfigFile = await customViewExplorer.search(applicationPath);
  if (
    (!customApplicationConfigFile || !customApplicationConfigFile.config) &&
    (!customViewConfigFile || !customViewConfigFile.config)
  ) {
    throw new MissingOrInvalidConfigError(
      `Missing or invalid configuration file.`
    );
  }

  if (customApplicationConfigFile && customViewConfigFile) {
    throw new MissingOrInvalidConfigError(
      `Found configuration files for both Custom Application and Custom View. Please remove one of them.`
    );
  }

  return (customViewConfigFile || customApplicationConfigFile)!;
};

export default loadConfig;
