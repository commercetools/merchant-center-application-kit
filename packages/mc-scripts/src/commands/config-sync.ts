import chalk from 'chalk';
import prompts from 'prompts';
import {
  processConfig,
  type CustomApplicationData,
  type CustomViewData,
} from '@commercetools-frontend/application-config';
import type { TCliCommandConfigSyncOptions } from '../types';
import {
  isCustomViewData,
  checkCustomApplicationStatus,
  checkCustomViewStatus,
  performCreateCustomApplication,
  performUpdateCustomApplication,
  performCreateCustomView,
  performUpdateCustomView,
} from '../utils/config-sync-helpers';
import CredentialsStorage from '../utils/credentials-storage';
import { fetchUserOrganizations } from '../utils/graphql-requests';

const credentialsStorage = new CredentialsStorage();

type TPromptForOrganization = {
  mcApiUrl: string;
  applicationIdentifier: string;
  customViewId?: string;
  entityType: 'Custom Application' | 'Custom View';
};

async function promptForOrganization({
  mcApiUrl,
  applicationIdentifier,
  customViewId,
  entityType,
}: TPromptForOrganization): Promise<{ id: string; name: string }> {
  const userOrganizations = await fetchUserOrganizations({
    mcApiUrl,
    applicationIdentifier,
    customViewId,
  });

  if (userOrganizations.total === 0) {
    throw new Error(
      `It seems you are not an admin of any Organization. Please make sure to be part of the Administrators team of the Organization you want the ${entityType} to be configured to.`
    );
  }

  if (userOrganizations.total === 1) {
    const [organization] = userOrganizations.results;
    return { id: organization.id, name: organization.name };
  }

  const organizationChoices = userOrganizations.results.map((organization) => ({
    title: organization.name,
    value: organization.id,
  }));

  const { organizationId: selectedOrganizationId } = await prompts({
    type: 'select',
    name: 'organizationId',
    message: 'Select an Organization',
    choices: organizationChoices,
    initial: 0,
  });

  if (!selectedOrganizationId) {
    throw new Error(`No Organization selected, aborting.`);
  }

  const organizationName = (
    organizationChoices.find(
      ({ value }) => value === selectedOrganizationId
    ) as {
      title: string;
    }
  ).title;

  return { id: selectedOrganizationId, name: organizationName };
}

type TConfirmAction = {
  message: string;
  dryRun: boolean;
  dryRunMessage: string;
};

async function confirmAction({
  message,
  dryRun,
  dryRunMessage,
}: TConfirmAction): Promise<boolean> {
  const { confirmation } = await prompts({
    type: 'text',
    name: 'confirmation',
    message: [message, dryRun && chalk.gray(dryRunMessage)]
      .filter(Boolean)
      .join('\n'),
    initial: 'yes',
  });

  if (!confirmation || confirmation.toLowerCase().charAt(0) !== 'y') {
    console.log(chalk.red('Aborted.'));
    return false;
  }
  return true;
}

type TCreateOrUpdateCustomApplication = {
  mcApiUrl: string;
  localCustomEntityData: CustomApplicationData;
  applicationIdentifier: string;
  options: TCliCommandConfigSyncOptions;
};

async function createOrUpdateCustomApplication({
  mcApiUrl,
  localCustomEntityData,
  applicationIdentifier,
  options,
}: TCreateOrUpdateCustomApplication) {
  const status = await checkCustomApplicationStatus({
    mcApiUrl,
    entryPointUriPath: localCustomEntityData.entryPointUriPath,
    applicationIdentifier,
    localCustomEntityData,
  });

  if (!status.exists) {
    // Create new Custom Application
    const organization = await promptForOrganization({
      mcApiUrl,
      applicationIdentifier,
      entityType: 'Custom Application',
    });

    const confirmed = await confirmAction({
      message: `You are about to create a new Custom Application in the "${chalk.green(
        organization.name
      )}" organization. Are you sure you want to proceed?`,
      dryRun: options.dryRun,
      dryRunMessage: 'Using "--dry-run", no data will be created.',
    });

    if (!confirmed) return;

    await performCreateCustomApplication({
      mcApiUrl,
      organizationId: organization.id,
      organizationName: organization.name,
      localCustomEntityData,
      applicationIdentifier,
      dryRun: options.dryRun,
    });
    return;
  }

  // Check for changes
  if (!status.configDiff) {
    console.log(chalk.green(`Custom Application up-to-date.`));
    console.log(
      `You can inspect the Custom Application data in the Merchant Center at "${chalk.gray(
        status.link
      )}".`
    );
    return;
  }

  console.log('Changes detected:');
  console.log(status.configDiff);
  console.log();

  const confirmed = await confirmAction({
    message: `You are about to update the Custom Application "${chalk.green(
      localCustomEntityData.entryPointUriPath
    )}" with the changes above. Are you sure you want to proceed?`,
    dryRun: options.dryRun,
    dryRunMessage: 'Using "--dry-run", no data will be updated.',
  });

  if (!confirmed) return;

  await performUpdateCustomApplication({
    mcApiUrl,
    organizationId: status.organizationId,
    applicationId: status.applicationId,
    localCustomEntityData,
    applicationIdentifier,
    dryRun: options.dryRun,
  });
}

type TCreateOrUpdateCustomView = {
  mcApiUrl: string;
  localCustomEntityData: CustomViewData;
  customViewId: string;
  options: TCliCommandConfigSyncOptions;
  applicationIdentifier: string;
};

async function createOrUpdateCustomView({
  mcApiUrl,
  localCustomEntityData,
  customViewId,
  options,
  applicationIdentifier,
}: TCreateOrUpdateCustomView) {
  const status = await checkCustomViewStatus({
    mcApiUrl,
    customViewId,
    applicationIdentifier,
    localCustomEntityData,
  });

  if (!status.exists) {
    // Create new Custom View
    const organization = await promptForOrganization({
      mcApiUrl,
      applicationIdentifier,
      customViewId,
      entityType: 'Custom View',
    });

    const confirmed = await confirmAction({
      message: `You are about to create a new Custom View in the "${chalk.green(
        organization.name
      )}" organization. Are you sure you want to proceed?`,
      dryRun: options.dryRun,
      dryRunMessage: 'Using "--dry-run", no data will be created.',
    });

    if (!confirmed) return;

    await performCreateCustomView({
      mcApiUrl,
      organizationId: organization.id,
      organizationName: organization.name,
      localCustomEntityData,
      applicationIdentifier,
      dryRun: options.dryRun,
    });
    return;
  }

  // Check for changes
  if (!status.configDiff) {
    console.log(chalk.green(`Custom View up-to-date.`));
    console.log(
      `You can inspect the Custom View data in the Merchant Center at "${chalk.gray(
        status.link
      )}".`
    );
    return;
  }

  console.log('Changes detected:');
  console.log(status.configDiff);
  console.log();

  const confirmed = await confirmAction({
    message: `You are about to update the Custom View "${chalk.green(
      localCustomEntityData.defaultLabel
    )}" with the changes above. Are you sure you want to proceed?`,
    dryRun: options.dryRun,
    dryRunMessage: 'Using "--dry-run", no data will be updated.',
  });

  if (!confirmed) return;

  await performUpdateCustomView({
    mcApiUrl,
    organizationId: status.organizationId,
    customViewId: status.customViewId,
    localCustomEntityData,
    applicationIdentifier,
    dryRun: options.dryRun,
  });
}

async function run(options: TCliCommandConfigSyncOptions) {
  const applicationConfig = await processConfig();
  const localCustomEntityData: CustomApplicationData | CustomViewData =
    applicationConfig.data;
  const { mcApiUrl, applicationIdentifier, customViewId } =
    applicationConfig.env;

  console.log(`Using Merchant Center environment "${chalk.green(mcApiUrl)}".`);
  console.log();

  const isSessionValid = credentialsStorage.isSessionValid(mcApiUrl);
  if (!isSessionValid) {
    throw new Error(
      `You don't have a valid session. Please, run the "mc-scripts login" command to authenticate yourself.`
    );
  }

  if (isCustomViewData(localCustomEntityData)) {
    await createOrUpdateCustomView({
      mcApiUrl,
      localCustomEntityData,
      applicationIdentifier,
      customViewId: customViewId || localCustomEntityData.id,
      options,
    });
  } else {
    await createOrUpdateCustomApplication({
      mcApiUrl,
      localCustomEntityData,
      applicationIdentifier,
      options,
    });
  }
}

export default run;
