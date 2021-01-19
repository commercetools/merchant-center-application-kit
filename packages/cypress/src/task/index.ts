import type {
  ApplicationConfig,
  TJSONSchemaForCustomApplicationConfigurationFiles,
} from '@commercetools-frontend/application-config';

import fs from 'fs';
import path from 'path';
import { getPackages } from '@manypkg/get-packages';
import { processConfig } from '@commercetools-frontend/application-config';

type CustomApplicationConfigTaskOptions = {
  entryPointUriPath: string;
};
type AllCustomApplicationConfigs = Record<string, ApplicationConfig['env']>;

let cachedAllCustomApplicationConfigs: AllCustomApplicationConfigs;

// TODO: make it configurable?
const dotfiles = ['.env', '.env.local'];
const loadEnvironmentVariables = (packageDirPath: string) => {
  return dotfiles.reduce((mergedEnvs, dotfile) => {
    const envPath = path.join(packageDirPath, dotfile);

    if (!fs.existsSync(envPath)) {
      console.error(`Skipping loading of ${dotfile} from ${packageDirPath}`);
      return mergedEnvs;
    }

    const env = require('dotenv').config({ path: envPath });
    if (env.error) {
      console.error(`Failed to load ${dotfile} from ${packageDirPath}`);
      return mergedEnvs;
    }

    return {
      ...mergedEnvs,
      ...env.parsed,
    };
    // Merge it with the environment variables defined in the current process.
  }, process.env);
};

const loadAllCustomApplicationConfigs = async () => {
  if (cachedAllCustomApplicationConfigs) {
    return cachedAllCustomApplicationConfigs;
  }

  const { packages } = await getPackages(process.cwd());
  cachedAllCustomApplicationConfigs = packages.reduce<AllCustomApplicationConfigs>(
    (allConfigs, packageInfo) => {
      const customAppConfigPath = path.join(
        packageInfo.dir,
        'custom-application-config.json'
      );
      if (!fs.existsSync(customAppConfigPath)) {
        return allConfigs;
      }

      console.log(
        `Reading Custom Application config for ${packageInfo.packageJson.name}`
      );
      const customAppConfigJson: TJSONSchemaForCustomApplicationConfigurationFiles = JSON.parse(
        fs.readFileSync(customAppConfigPath, { encoding: 'utf8' })
      );
      const processEnv = loadEnvironmentVariables(packageInfo.dir);
      const processedConfig = processConfig({
        disableCache: true,
        configJson: customAppConfigJson,
        processEnv,
      });
      return {
        ...allConfigs,
        [processedConfig.env.entryPointUriPath]: processedConfig.env,
      };
    },
    {}
  );

  return cachedAllCustomApplicationConfigs;
};

const customApplicationConfig = async ({
  entryPointUriPath,
}: CustomApplicationConfigTaskOptions): Promise<ApplicationConfig['env']> => {
  const allCustomApplicationConfigs = await loadAllCustomApplicationConfigs();

  const customApplicationConfig =
    allCustomApplicationConfigs[entryPointUriPath];

  if (!customApplicationConfig) {
    throw new Error(
      `Could not find Custom Application config for entry point "${entryPointUriPath}"`
    );
  }

  return customApplicationConfig;
};

export { customApplicationConfig };
