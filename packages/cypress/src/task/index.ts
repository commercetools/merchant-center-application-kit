import type { ApplicationRuntimeConfig } from '@commercetools-frontend/application-config';

import fs from 'fs';
import path from 'path';
import { getPackages } from '@manypkg/get-packages';
import {
  processConfig,
  MissingOrInvalidConfigError,
} from '@commercetools-frontend/application-config';

type CustomApplicationConfigTaskOptions = {
  entryPointUriPath: string;
  dotfiles?: string[];
};
type AllCustomApplicationConfigs = Record<
  string,
  ApplicationRuntimeConfig['env']
>;

let cachedAllCustomApplicationConfigs: AllCustomApplicationConfigs;

const defaultDotfiles = ['.env', '.env.local'];

const loadEnvironmentVariables = (
  packageDirPath: string,
  options: CustomApplicationConfigTaskOptions
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

const loadAllCustomApplicationConfigs = async (
  options: CustomApplicationConfigTaskOptions
) => {
  if (cachedAllCustomApplicationConfigs) {
    return cachedAllCustomApplicationConfigs;
  }

  const { packages } = await getPackages(process.cwd());
  cachedAllCustomApplicationConfigs =
    packages.reduce<AllCustomApplicationConfigs>((allConfigs, packageInfo) => {
      const processEnv = loadEnvironmentVariables(packageInfo.dir, options);
      try {
        const processedConfig = processConfig({
          disableCache: true,
          processEnv,
          applicationPath: packageInfo.dir,
        });
        console.log(
          `Found Custom Application config for ${packageInfo.packageJson.name}`
        );
        return {
          ...allConfigs,
          [processedConfig.env.entryPointUriPath]: processedConfig.env,
        };
      } catch (error) {
        // Ignore packages that do not have a valid config file, either because
        // the package is not a Custom Application or because the config file
        // is invalid.
        if (error instanceof MissingOrInvalidConfigError) {
          return allConfigs;
        }
        throw error;
      }
    }, {});

  return cachedAllCustomApplicationConfigs;
};

const customApplicationConfig = async (
  options: CustomApplicationConfigTaskOptions
): Promise<ApplicationRuntimeConfig['env']> => {
  const allCustomApplicationConfigs = await loadAllCustomApplicationConfigs(
    options
  );

  const customApplicationConfig =
    allCustomApplicationConfigs[options.entryPointUriPath];

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

export { customApplicationConfig };
