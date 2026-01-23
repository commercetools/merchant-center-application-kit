/**
 * config:sync:ci - Synchronize Merchant Center customization config (CI mode)
 *
 * Designed for non-interactive CI/CD environments.
 *
 * Environment variables:
 * | Variable                  | Description                                        |
 * |---------------------------|----------------------------------------------------|
 * | MC_ACCESS_TOKEN           | Session token for authentication                   |
 * | MC_USER_NAME              | Email for authentication (with MC_USER_PASSWORD)   |
 * | MC_USER_PASSWORD          | Password for authentication (with MC_USER_NAME)    |
 * | CT_ORGANIZATION_ID        | Organization ID (required if multiple orgs)        |
 * | CT_ORGANIZATION_NAME      | Organization name (required if multiple orgs)      |
 *
 * CLI Options:
 *   --dry-run    Preview changes without applying them
 *
 * Usage:
 *   # Using token + organization name
 *   MC_ACCESS_TOKEN="your-token" \
 *   CT_ORGANIZATION_NAME="First Contact Organization" \
 *   pnpm mc-scripts config:sync:ci
 *
 *   # Using email/password + organization ID
 *   MC_USER_NAME="user@example.com" \
 *   MC_USER_PASSWORD="password" \
 *   CT_ORGANIZATION_ID="abc123" \
 *   pnpm mc-scripts config:sync:ci
 *
 * Output:
 *   On create, outputs the app/view ID to a file in the config directory:
 *   - custom-application-id (for Custom Applications)
 *   - custom-view-id (for Custom Views)
 */

import chalk from 'chalk';
import {
  processConfig,
  getConfigPath,
  type CustomApplicationData,
  type CustomViewData,
} from '@commercetools-frontend/application-config';
import type { TCliCommandConfigSyncCIOptions } from '../types';
import {
  isCustomViewData,
  checkCustomApplicationStatus,
  checkCustomViewStatus,
  performCreateCustomApplication,
  performUpdateCustomApplication,
  performCreateCustomView,
  performUpdateCustomView,
} from '../utils/config-sync-helpers';
import { fetchUserOrganizations } from '../utils/graphql-requests';
import { authenticateForCI } from '../utils/headless-auth';

/**
 * Environment variable names for CI configuration
 */
const ENV_VARS = {
  ORGANIZATION_ID: 'CT_ORGANIZATION_ID',
  ORGANIZATION_NAME: 'CT_ORGANIZATION_NAME',
} as const;

type TResolveOrganization = {
  mcApiUrl: string;
  applicationIdentifier: string;
  customViewId?: string;
};

async function resolveOrganization({
  mcApiUrl,
  applicationIdentifier,
  customViewId,
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

async function handleCustomApplication({
  mcApiUrl,
  localCustomEntityData,
  applicationIdentifier,
  dryRun,
  configFilePath,
}: {
  mcApiUrl: string;
  localCustomEntityData: CustomApplicationData;
  applicationIdentifier: string;
  dryRun: boolean;
  configFilePath: string;
}) {
  const status = await checkCustomApplicationStatus({
    mcApiUrl,
    entryPointUriPath: localCustomEntityData.entryPointUriPath,
    applicationIdentifier,
    localCustomEntityData,
  });

  if (!status.exists) {
    // Create new Custom Application
    const organization = await resolveOrganization({
      mcApiUrl,
      applicationIdentifier,
    });

    await performCreateCustomApplication({
      mcApiUrl,
      organizationId: organization.id,
      organizationName: organization.name,
      localCustomEntityData,
      applicationIdentifier,
      dryRun,
      configFilePath,
    });
    return;
  }

  // Check for changes
  if (!status.configDiff) {
    console.log(chalk.green('Custom Application is up-to-date.'));
    console.log(`URL: ${chalk.gray(status.link)}`);
    return;
  }

  console.log('Changes detected:');
  console.log(status.configDiff);
  console.log();

  await performUpdateCustomApplication({
    mcApiUrl,
    organizationId: status.organizationId,
    applicationId: status.applicationId,
    localCustomEntityData,
    applicationIdentifier,
    dryRun,
  });
}

async function handleCustomView({
  mcApiUrl,
  localCustomEntityData,
  customViewId,
  applicationIdentifier,
  dryRun,
  configFilePath,
}: {
  mcApiUrl: string;
  localCustomEntityData: CustomViewData;
  customViewId: string;
  applicationIdentifier: string;
  dryRun: boolean;
  configFilePath: string;
}) {
  const status = await checkCustomViewStatus({
    mcApiUrl,
    customViewId,
    applicationIdentifier,
    localCustomEntityData,
  });

  if (!status.exists) {
    // Create new Custom View
    const organization = await resolveOrganization({
      mcApiUrl,
      applicationIdentifier,
      customViewId,
    });

    await performCreateCustomView({
      mcApiUrl,
      organizationId: organization.id,
      organizationName: organization.name,
      localCustomEntityData,
      applicationIdentifier,
      dryRun,
      configFilePath,
    });
    return;
  }

  // Check for changes
  if (!status.configDiff) {
    console.log(chalk.green('Custom View is up-to-date.'));
    console.log(`URL: ${chalk.gray(status.link)}`);
    return;
  }

  console.log('Changes detected:');
  console.log(status.configDiff);
  console.log();

  await performUpdateCustomView({
    mcApiUrl,
    organizationId: status.organizationId,
    customViewId: status.customViewId,
    localCustomEntityData,
    applicationIdentifier,
    dryRun,
  });
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
    await handleCustomView({
      mcApiUrl,
      localCustomEntityData,
      customViewId: customViewId || localCustomEntityData.id,
      applicationIdentifier,
      dryRun: options.dryRun,
      configFilePath,
    });
  } else {
    await handleCustomApplication({
      mcApiUrl,
      localCustomEntityData,
      applicationIdentifier,
      dryRun: options.dryRun,
      configFilePath,
    });
  }
}

export default run;
