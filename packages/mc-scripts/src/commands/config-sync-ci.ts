/**
 * config:sync:ci - Synchronize Merchant Center customization config (CI mode)
 *
 * Designed for non-interactive CI/CD environments.
 *
 * Environment variables:
 * | Variable                  | Description                                        |
 * |---------------------------|----------------------------------------------------|
 * | MC_CLI_TOKEN              | Session token for authentication                   |
 * | MC_CLI_EMAIL              | Email for authentication (with MC_CLI_PASSWORD)    |
 * | MC_CLI_PASSWORD           | Password for authentication (with MC_CLI_EMAIL)    |
 * | MC_CLI_ORGANIZATION_ID    | Organization ID (required if multiple orgs)        |
 * | MC_CLI_ORGANIZATION_NAME  | Organization name (required if multiple orgs)      |
 *
 * CLI Options:
 *   --dry-run    Preview changes without applying them
 *
 * Usage:
 *   # Using token + organization name
 *   MC_CLI_TOKEN="your-token" \
 *   MC_CLI_ORGANIZATION_NAME="First Contact Organization" \
 *   pnpm mc-scripts config:sync:ci
 *
 *   # Using email/password + organization ID
 *   MC_CLI_EMAIL="user@example.com" \
 *   MC_CLI_PASSWORD="password" \
 *   MC_CLI_ORGANIZATION_ID="abc123" \
 *   pnpm mc-scripts config:sync:ci
 *
 * Output:
 *   On create, outputs the app/view ID to a file in the config directory:
 *   - custom-application-id (for Custom Applications)
 *   - custom-view-id (for Custom Views)
 */

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import omit from 'lodash/omit';
import {
  processConfig,
  getConfigPath,
  type CustomApplicationData,
  type CustomViewData,
} from '@commercetools-frontend/application-config';
import type { TCliCommandConfigSyncCIOptions } from '../types';
import {
  getCustomApplicationConfigDiff,
  getCustomViewConfigDiff,
} from '../utils/get-config-diff';
import {
  fetchCustomApplication,
  fetchCustomView,
  updateCustomApplication,
  updateCustomView,
  createCustomApplication,
  createCustomView,
  fetchUserOrganizations,
} from '../utils/graphql-requests';
import { authenticateForCI } from '../utils/headless-auth';

/**
 * Environment variable names for CI configuration
 */
const ENV_VARS = {
  ORGANIZATION_ID: 'MC_CLI_ORGANIZATION_ID',
  ORGANIZATION_NAME: 'MC_CLI_ORGANIZATION_NAME',
} as const;

type TGetMcUrlLink = {
  mcApiUrl: string;
  organizationId: string;
  customEntityId: string;
  isCustomView?: boolean;
};

const getMcUrlLink = ({
  mcApiUrl,
  organizationId,
  customEntityId,
  isCustomView,
}: TGetMcUrlLink) => {
  const mcUrl = mcApiUrl.replace('mc-api', 'mc');
  const customEntityLink = `${mcUrl}/account/organizations/${organizationId}/custom-${
    isCustomView ? 'views' : 'applications'
  }/owned/${customEntityId}`;
  return customEntityLink;
};

const isCustomViewData = (
  data: CustomApplicationData | CustomViewData
): data is CustomViewData =>
  (data as CustomApplicationData).entryPointUriPath === undefined;

type TWriteIdToFile = {
  configFilePath: string;
  id: string;
  isCustomView: boolean;
};

const writeIdToFile = ({
  configFilePath,
  id,
  isCustomView,
}: TWriteIdToFile) => {
  const configDir = path.dirname(configFilePath);
  const fileName = isCustomView ? 'custom-view-id' : 'custom-application-id';
  const filePath = path.join(configDir, fileName);
  fs.writeFileSync(filePath, id, 'utf-8');
  console.log(chalk.green(`Created ID written to "${filePath}".`));
};

type TResolveOrganization = {
  mcApiUrl: string;
  applicationIdentifier: string;
  customViewId?: string;
  entityType: 'Custom Application' | 'Custom View';
};

async function resolveOrganization({
  mcApiUrl,
  applicationIdentifier,
  customViewId,
  entityType,
}: TResolveOrganization): Promise<{ id: string; name: string }> {
  const userOrganizations = await fetchUserOrganizations({
    mcApiUrl,
    applicationIdentifier,
    customViewId,
  });

  if (userOrganizations.total === 0) {
    throw new Error(
      `No organizations found. Please ensure you are an admin of at least one Organization.`
    );
  }

  // Check if organization was provided via environment variables
  const organizationId = process.env[ENV_VARS.ORGANIZATION_ID];
  const organizationName = process.env[ENV_VARS.ORGANIZATION_NAME];

  if (organizationId) {
    const matchingOrg = userOrganizations.results.find(
      (org) => org.id === organizationId
    );
    if (!matchingOrg) {
      throw new Error(
        `Organization with ID "${organizationId}" (from ${ENV_VARS.ORGANIZATION_ID}) not found or you don't have admin access to it.`
      );
    }
    return { id: matchingOrg.id, name: matchingOrg.name };
  }

  if (organizationName) {
    const matchingOrg = userOrganizations.results.find(
      (org) => org.name === organizationName
    );
    if (!matchingOrg) {
      throw new Error(
        `Organization with name "${organizationName}" (from ${ENV_VARS.ORGANIZATION_NAME}) not found or you don't have admin access to it.`
      );
    }
    return { id: matchingOrg.id, name: matchingOrg.name };
  }

  // If only one organization, use it automatically
  if (userOrganizations.total === 1) {
    const [organization] = userOrganizations.results;
    console.log(
      `Using organization "${chalk.green(
        organization.name
      )}" (only one available).`
    );
    return { id: organization.id, name: organization.name };
  }

  // Multiple organizations and none specified - error in CI mode
  const orgNames = userOrganizations.results
    .map((org) => `  - "${org.name}" (ID: ${org.id})`)
    .join('\n');
  throw new Error(
    `Multiple organizations found. Please specify one using ${ENV_VARS.ORGANIZATION_ID} or ${ENV_VARS.ORGANIZATION_NAME} environment variable:\n${orgNames}`
  );
}

type TCreateOrUpdateCustomApplication = {
  mcApiUrl: string;
  localCustomEntityData: CustomApplicationData;
  applicationIdentifier: string;
  options: TCliCommandConfigSyncCIOptions;
  configFilePath: string;
};

async function createOrUpdateCustomApplication({
  mcApiUrl,
  localCustomEntityData,
  applicationIdentifier,
  options,
  configFilePath,
}: TCreateOrUpdateCustomApplication) {
  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    entryPointUriPath: localCustomEntityData.entryPointUriPath,
    applicationIdentifier,
  });

  if (!fetchedCustomApplication) {
    // Create new Custom Application
    const organization = await resolveOrganization({
      mcApiUrl,
      applicationIdentifier,
      entityType: 'Custom Application',
    });

    console.log(
      `Creating Custom Application in organization "${chalk.green(
        organization.name
      )}"...`
    );

    if (options.dryRun) {
      const data = omit(localCustomEntityData, ['id']);
      console.log();
      console.log('Dry run - would create Custom Application with:');
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
      return;
    }

    const createdCustomApplication = await createCustomApplication({
      mcApiUrl,
      organizationId: organization.id,
      data: omit(localCustomEntityData, ['id']),
      applicationIdentifier,
    });

    if (!createdCustomApplication) {
      throw new Error('Failed to create the Custom Application.');
    }

    const customAppLink = getMcUrlLink({
      mcApiUrl,
      organizationId: organization.id,
      customEntityId: createdCustomApplication.id,
    });

    console.log(chalk.green('Custom Application created successfully.'));
    console.log(`ID: ${chalk.cyan(createdCustomApplication.id)}`);
    console.log(`URL: ${chalk.gray(customAppLink)}`);

    writeIdToFile({
      configFilePath,
      id: createdCustomApplication.id,
      isCustomView: false,
    });
    return;
  }

  // Update existing Custom Application
  const customAppLink = getMcUrlLink({
    mcApiUrl,
    organizationId: fetchedCustomApplication.organizationId,
    customEntityId: fetchedCustomApplication.application.id,
  });

  const configDiff = getCustomApplicationConfigDiff(
    fetchedCustomApplication.application as CustomApplicationData,
    localCustomEntityData
  );

  if (!configDiff) {
    console.log(chalk.green('Custom Application is up-to-date.'));
    console.log(`URL: ${chalk.gray(customAppLink)}`);
    return;
  }

  console.log('Changes detected:');
  console.log(configDiff);
  console.log();

  if (options.dryRun) {
    const data = omit(localCustomEntityData, ['id']);
    console.log('Dry run - would update Custom Application with:');
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
    return;
  }

  console.log('Updating Custom Application...');

  await updateCustomApplication({
    mcApiUrl,
    organizationId: fetchedCustomApplication.organizationId,
    data: omit(localCustomEntityData, ['id']),
    applicationId: fetchedCustomApplication.application.id,
    applicationIdentifier,
  });

  console.log(chalk.green('Custom Application updated successfully.'));
  console.log(`URL: ${chalk.gray(customAppLink)}`);
}

type TCreateOrUpdateCustomView = {
  mcApiUrl: string;
  localCustomEntityData: CustomViewData;
  customViewId: string;
  options: TCliCommandConfigSyncCIOptions;
  applicationIdentifier: string;
  configFilePath: string;
};

async function createOrUpdateCustomView({
  mcApiUrl,
  localCustomEntityData,
  customViewId,
  options,
  applicationIdentifier,
  configFilePath,
}: TCreateOrUpdateCustomView) {
  const fetchedCustomView = await fetchCustomView({
    mcApiUrl,
    customViewId,
    applicationIdentifier,
  });

  if (!fetchedCustomView) {
    // Create new Custom View
    const organization = await resolveOrganization({
      mcApiUrl,
      applicationIdentifier,
      customViewId,
      entityType: 'Custom View',
    });

    console.log(
      `Creating Custom View in organization "${chalk.green(
        organization.name
      )}"...`
    );

    if (options.dryRun) {
      const data = omit(localCustomEntityData, ['id']);
      console.log();
      console.log('Dry run - would create Custom View with:');
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
      return;
    }

    const createdCustomView = await createCustomView({
      mcApiUrl,
      organizationId: organization.id,
      data: omit(localCustomEntityData, ['id']),
      applicationIdentifier,
    });

    if (!createdCustomView) {
      throw new Error('Failed to create the Custom View.');
    }

    const customViewLink = getMcUrlLink({
      mcApiUrl,
      organizationId: organization.id,
      customEntityId: createdCustomView.id,
      isCustomView: true,
    });

    console.log(chalk.green('Custom View created successfully.'));
    console.log(`ID: ${chalk.cyan(createdCustomView.id)}`);
    console.log(`URL: ${chalk.gray(customViewLink)}`);

    writeIdToFile({
      configFilePath,
      id: createdCustomView.id,
      isCustomView: true,
    });
    return;
  }

  // Update existing Custom View
  const customViewLink = getMcUrlLink({
    mcApiUrl,
    organizationId: fetchedCustomView.organizationId,
    customEntityId: fetchedCustomView?.customView?.id || '',
    isCustomView: true,
  });

  const configDiff = getCustomViewConfigDiff(
    fetchedCustomView.customView as unknown as CustomViewData,
    localCustomEntityData
  );

  if (!configDiff) {
    console.log(chalk.green('Custom View is up-to-date.'));
    console.log(`URL: ${chalk.gray(customViewLink)}`);
    return;
  }

  console.log('Changes detected:');
  console.log(configDiff);
  console.log();

  if (options.dryRun) {
    const data = omit(localCustomEntityData, ['id']);
    console.log('Dry run - would update Custom View with:');
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
    return;
  }

  console.log('Updating Custom View...');

  await updateCustomView({
    mcApiUrl,
    organizationId: fetchedCustomView.organizationId,
    data: omit(localCustomEntityData, ['id']),
    customViewId: fetchedCustomView?.customView?.id || '',
    applicationIdentifier,
  });

  console.log(chalk.green('Custom View updated successfully.'));
  console.log(`URL: ${chalk.gray(customViewLink)}`);
}

async function run(options: TCliCommandConfigSyncCIOptions) {
  const applicationConfig = await processConfig();
  const localCustomEntityData: CustomApplicationData | CustomViewData =
    applicationConfig.data;
  const { mcApiUrl, applicationIdentifier, customViewId } =
    applicationConfig.env;

  console.log(`Environment: ${chalk.green(mcApiUrl)}`);

  // Authenticate for CI
  console.log('Authenticating...');
  try {
    await authenticateForCI({ mcApiUrl });
    console.log(chalk.green('Authentication successful.'));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    throw error;
  }

  console.log();

  // Get config file path for ID output
  const configFilePath = await getConfigPath();
  if (!configFilePath) {
    throw new Error('Could not determine config file path.');
  }

  if (isCustomViewData(localCustomEntityData)) {
    await createOrUpdateCustomView({
      mcApiUrl,
      localCustomEntityData,
      applicationIdentifier,
      customViewId: customViewId || localCustomEntityData.id,
      options,
      configFilePath,
    });
  } else {
    await createOrUpdateCustomApplication({
      mcApiUrl,
      localCustomEntityData,
      applicationIdentifier,
      options,
      configFilePath,
    });
  }
}

export default run;
