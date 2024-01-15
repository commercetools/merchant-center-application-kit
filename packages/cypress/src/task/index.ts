import fs from 'fs';
import path from 'path';
import { getPackages } from '@manypkg/get-packages';
import {
  type ApplicationRuntimeConfig,
  processConfig,
  MissingOrInvalidConfigError,
} from '@commercetools-frontend/application-config';
import { CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH } from '@commercetools-frontend/constants';

type CustomEntityConfigTaskOptions = {
  entryPointUriPath: string;
  dotfiles?: string[];
  packageName?: string;
};
type AllCustomEntityConfigs = Record<string, ApplicationRuntimeConfig['env']>;

let cachedAllCustomEntityConfigs: AllCustomEntityConfigs;

const defaultDotfiles = ['.env', '.env.local'];

const loadEnvironmentVariables = (
  packageDirPath: string,
  options: CustomEntityConfigTaskOptions
) => {
  const dotfiles = options.dotfiles ?? defaultDotfiles;
  return dotfiles.reduce((mergedEnvs, dotfile) => {
    const envPath = path.join(packageDirPath, dotfile);

    if (!fs.existsSync(envPath)) {
      return mergedEnvs;
    }

    const env = require('dotenv').config({ path: envPath });
    if (env.error) {
      console.error(`Failed to load environment variables from ${envPath}`);
      return mergedEnvs;
    }

    console.log(`Loading environment variables from ${envPath}`);
    return {
      ...mergedEnvs,
      ...env.parsed,
    };
    // Merge it with the environment variables defined in the current process.
  }, process.env);
};

const loadAllCustomEntityConfigs = async (
  options: CustomEntityConfigTaskOptions
) => {
  if (cachedAllCustomEntityConfigs) {
    return cachedAllCustomEntityConfigs;
  }

  const { packages } = await getPackages(process.cwd());
  cachedAllCustomEntityConfigs = packages.reduce<AllCustomEntityConfigs>(
    (allConfigs, packageInfo) => {
      const processEnv = loadEnvironmentVariables(packageInfo.dir, options);
      try {
        const processedConfig = processConfig({
          disableCache: true,
          processEnv,
          applicationPath: packageInfo.dir,
        });
        const isCustomViewConfig = Boolean(processedConfig.env.customViewId);

        console.log(
          `Found Custom ${
            isCustomViewConfig ? 'View' : 'Application'
          } config for ${packageInfo.packageJson.name}`
        );

        const customEntityConfigCacheKey = isCustomViewConfig
          ? `${processedConfig.env.entryPointUriPath}-${packageInfo.packageJson.name}`
          : processedConfig.env.entryPointUriPath;

        return {
          ...allConfigs,
          [customEntityConfigCacheKey]: processedConfig.env,
        };
      } catch (error) {
        // Ignore packages that do not have a valid config file, either because
        // the package is not a Custom Entity or because the config file
        // is invalid.
        if (error instanceof MissingOrInvalidConfigError) {
          return allConfigs;
        }
        throw error;
      }
    },
    {}
  );

  return cachedAllCustomEntityConfigs;
};

const customApplicationConfig = async (
  options: CustomEntityConfigTaskOptions
): Promise<ApplicationRuntimeConfig['env']> => {
  const allCustomEntityConfigs = await loadAllCustomEntityConfigs(options);

  const customApplicationConfig =
    allCustomEntityConfigs[options.entryPointUriPath];

  if (!customApplicationConfig) {
    throw new Error(
      `Could not find Custom Application config for entry point "${options.entryPointUriPath}"`
    );
  }

  console.log(
    `Using Custom Application config for "${options.entryPointUriPath}"`
  );
  return customApplicationConfig;
};

const customViewConfig = async (
  options: Omit<CustomEntityConfigTaskOptions, 'entryPointUriPath'>
): Promise<ApplicationRuntimeConfig['env']> => {
  const allCustomEntityConfigs = await loadAllCustomEntityConfigs({
    ...options,
    entryPointUriPath: CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH,
  });

  const customViewConfig =
    allCustomEntityConfigs[
      `${CUSTOM_VIEW_HOST_ENTRY_POINT_URI_PATH}-${options.packageName}`
    ];

  if (!customViewConfig) {
    throw new Error(`Could not find Custom View config`);
  }

  console.log(`Using Custom View config for "${options.packageName}"`);
  return customViewConfig;
};

export { customApplicationConfig, customViewConfig };
