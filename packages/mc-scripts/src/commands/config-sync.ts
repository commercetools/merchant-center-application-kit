import chalk from 'chalk';
import omit from 'lodash/omit';
import prompts from 'prompts';
import {
  processConfig,
  type CustomApplicationData,
} from '@commercetools-frontend/application-config';
import type { TCliCommandConfigSyncOptions } from '../types';
import CredentialsStorage from '../utils/credentials-storage';
import getConfigDiff from '../utils/get-config-diff';
import {
  fetchCustomApplication,
  updateCustomApplication,
  createCustomApplication,
  fetchUserOrganizations,
} from '../utils/graphql-requests';

const credentialsStorage = new CredentialsStorage();

const getMcUrlLink = (
  mcApiUrl: string,
  organizationId: string,
  applicationId: string
) => {
  const mcUrl = mcApiUrl.replace('mc-api', 'mc');
  const customAppLink = `${mcUrl}/account/organizations/${organizationId}/custom-applications/owned/${applicationId}`;
  return customAppLink;
};

async function run(options: TCliCommandConfigSyncOptions) {
  const applicationConfig = processConfig();
  const { data: localCustomAppData } = applicationConfig;
  const { mcApiUrl } = applicationConfig.env;

  console.log(`Using Merchant Center environment "${chalk.green(mcApiUrl)}".`);
  console.log();

  const isSessionValid = credentialsStorage.isSessionValid(mcApiUrl);
  if (!isSessionValid) {
    throw new Error(
      `You don't have a valid session. Please, run the "mc-scripts login" command to authenticate yourself.`
    );
  }

  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    entryPointUriPath: localCustomAppData.entryPointUriPath,
  });

  if (!fetchedCustomApplication) {
    const userOrganizations = await fetchUserOrganizations({ mcApiUrl });

    let organizationId: string, organizationName: string;

    if (userOrganizations.total === 0) {
      throw new Error(
        `It seems you are not an admin of any Organization. Please make sure to be part of the Administrators team of the Organization you want the Custom Application to be configured to.`
      );
    }

    if (userOrganizations.total === 1) {
      const [organization] = userOrganizations.results;
      organizationId = organization.id;
      organizationName = organization.name;
    } else {
      const organizationChoices = userOrganizations.results.map(
        (organization) => ({
          title: organization.name,
          value: organization.id,
        })
      );

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

      organizationId = selectedOrganizationId;
      organizationName = (
        organizationChoices.find(({ value }) => value === organizationId) as {
          title: string;
        }
      ).title;
    }

    const { confirmation } = await prompts({
      type: 'text',
      name: 'confirmation',
      message: [
        `You are about to create a new Custom Application in the "${chalk.green(
          organizationName
        )}" organization. Are you sure you want to proceed?`,
        options.dryRun &&
          chalk.gray('Using "--dry-run", no data will be created.'),
      ]
        .filter(Boolean)
        .join('\n'),
      initial: 'yes',
    });
    if (!confirmation || confirmation.toLowerCase().charAt(0) !== 'y') {
      console.log(chalk.red('Aborted.'));
      return;
    }

    const data = omit(localCustomAppData, ['id']);
    if (options.dryRun) {
      console.log();
      console.log(
        `The following payload would be used to create a new Custom Application.`
      );
      console.log();
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
      return;
    }
    const createdCustomApplication = await createCustomApplication({
      mcApiUrl,
      organizationId,
      data,
    });

    // This check is technically not necessary, as the `graphql-request` client
    // throws an error in case of GraphQL errors.
    // However, the generated TypeScript data related to the GraphQL query has the
    // field typed as optional, thus having an extra check for type correctness.
    if (!createdCustomApplication) {
      throw new Error('Failed to create the Custom Application.');
    }

    const customAppLink = getMcUrlLink(
      mcApiUrl,
      organizationId,
      createdCustomApplication.id
    );
    console.log(
      chalk.green(
        `Custom Application created.\nPlease update the "env.production.applicationId" field in your local Custom Application config file with the following value: "${chalk.green(
          createdCustomApplication.id
        )}".`
      )
    );
    console.log(
      `You can inspect the Custom Application data in the Merchant Center at "${chalk.gray(
        customAppLink
      )}".`
    );
    return;
  }

  const customAppLink = getMcUrlLink(
    mcApiUrl,
    fetchedCustomApplication.organizationId,
    fetchedCustomApplication.application.id
  );

  const configDiff = getConfigDiff(
    fetchedCustomApplication.application as CustomApplicationData,
    localCustomAppData
  );

  if (!configDiff) {
    console.log(chalk.green(`Custom Application up-to-date.`));
    console.log(
      `You can inspect the Custom Application data in the Merchant Center at "${chalk.gray(
        customAppLink
      )}".`
    );
    return;
  }

  console.log('Changes detected:');
  console.log(configDiff);
  console.log();

  const { confirmation } = await prompts({
    type: 'text',
    name: 'confirmation',
    message: [
      `You are about to update the Custom Application "${chalk.green(
        localCustomAppData.entryPointUriPath
      )}" with the changes above. Are you sure you want to proceed?`,
      options.dryRun &&
        chalk.gray('Using "--dry-run", no data will be updated.'),
    ]
      .filter(Boolean)
      .join('\n'),
    initial: 'yes',
  });
  if (!confirmation || confirmation.toLowerCase().charAt(0) !== 'y') {
    console.log(chalk.red('Aborted.'));
    return;
  }

  const data = omit(localCustomAppData, ['id']);
  if (options.dryRun) {
    console.log();
    console.log(
      `The following payload would be used to update the Custom Application "${chalk.green(
        data.entryPointUriPath
      )}".`
    );
    console.log();
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
    return;
  }

  await updateCustomApplication({
    mcApiUrl,
    organizationId: fetchedCustomApplication.organizationId,
    data: omit(localCustomAppData, ['id']),
    applicationId: fetchedCustomApplication.application.id,
  });

  console.log(chalk.green(`Custom Application updated.`));
  console.log(
    `You can inspect the Custom Application data in the Merchant Center at "${chalk.gray(
      customAppLink
    )}".`
  );
}

export default run;
