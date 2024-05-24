import chalk from 'chalk';
import omit from 'lodash/omit';
import prompts from 'prompts';
import {
  processConfig,
  type CustomApplicationData,
  type CustomViewData,
} from '@commercetools-frontend/application-config';
import type {
  TCliCommandConfigSyncOptions,
  TCliCommandPushDeploymentPreviewOptions,
} from '../types';
import CredentialsStorage from '../utils/credentials-storage';
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

const credentialsStorage = new CredentialsStorage();

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
  }/owned/${customEntityId}/deployment-previews`;
  return customEntityLink;
};

const isCustomViewData = (
  data: CustomApplicationData | CustomViewData
): data is CustomViewData =>
  (data as CustomApplicationData).entryPointUriPath === undefined;

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
  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    entryPointUriPath: localCustomEntityData.entryPointUriPath,
    applicationIdentifier,
  });

  if (!fetchedCustomApplication) {
    const userOrganizations = await fetchUserOrganizations({
      mcApiUrl,
      applicationIdentifier,
    });

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

    const data = omit(localCustomEntityData, ['id']);
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
      applicationIdentifier,
    });

    // This check is technically not necessary, as the `graphql-request` client
    // throws an error in case of GraphQL errors.
    // However, the generated TypeScript data related to the GraphQL query has the
    // field typed as optional, thus having an extra check for type correctness.
    if (!createdCustomApplication) {
      throw new Error('Failed to create the Custom Application.');
    }

    const customAppLink = getMcUrlLink({
      mcApiUrl,
      organizationId,
      customEntityId: createdCustomApplication.id,
    });
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
        localCustomEntityData.entryPointUriPath
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

  const data = omit(localCustomEntityData, ['id']);
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
    data: omit(localCustomEntityData, ['id']),
    applicationId: fetchedCustomApplication.application.id,
    applicationIdentifier,
  });

  console.log(chalk.green(`Custom Application updated.`));
  console.log(
    `You can inspect the Custom Application data in the Merchant Center at "${chalk.gray(
      customAppLink
    )}".`
  );
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
  const fetchedCustomView = await fetchCustomView({
    mcApiUrl,
    customViewId,
    applicationIdentifier,
  });

  if (!fetchedCustomView) {
    const userOrganizations = await fetchUserOrganizations({
      mcApiUrl,
      customViewId,
      applicationIdentifier,
    });

    let organizationId: string, organizationName: string;

    if (userOrganizations.total === 0) {
      throw new Error(
        `It seems you are not an admin of any Organization. Please make sure to be part of the Administrators team of the Organization you want the Custom View to be configured to.`
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
        `You are about to create a new Custom View in the "${chalk.green(
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

    const data = omit(localCustomEntityData, ['id']);
    if (options.dryRun) {
      console.log();
      console.log(
        `The following payload would be used to create a new Custom View.`
      );
      console.log();
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
      return;
    }
    const createdCustomView = await createCustomView({
      mcApiUrl,
      organizationId,
      data,
      applicationIdentifier,
    });

    // This check is technically not necessary, as the `graphql-request` client
    // throws an error in case of GraphQL errors.
    // However, the generated TypeScript data related to the GraphQL query has the
    // field typed as optional, thus having an extra check for type correctness.
    if (!createdCustomView) {
      throw new Error('Failed to create the Custom View.');
    }

    const customViewLink = getMcUrlLink({
      mcApiUrl,
      organizationId,
      customEntityId: createdCustomView.id,
      isCustomView: true,
    });
    console.log(
      chalk.green(
        `Custom View created.\nPlease update the "env.production.customViewId" field in your local Custom View config file with the following value: "${chalk.green(
          createdCustomView.id
        )}".`
      )
    );
    console.log(
      `You can inspect the Custom View data in the Merchant Center at "${chalk.gray(
        customViewLink
      )}".`
    );
    return;
  }

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
    console.log(chalk.green(`Custom View up-to-date.`));
    console.log(
      `You can inspect the Custom View data in the Merchant Center at "${chalk.gray(
        customViewLink
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
      `You are about to update the Custom View "${chalk.green(
        localCustomEntityData.defaultLabel
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

  const data = omit(localCustomEntityData, ['id']);
  if (options.dryRun) {
    console.log();
    console.log(
      `The following payload would be used to update the Custom View "${chalk.green(
        data.defaultLabel
      )}".`
    );
    console.log();
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
    return;
  }

  await updateCustomView({
    mcApiUrl,
    organizationId: fetchedCustomView.organizationId,
    data: omit(localCustomEntityData, ['id']),
    customViewId: fetchedCustomView?.customView?.id || '',
    applicationIdentifier,
  });

  console.log(chalk.green(`Custom View updated.`));
  console.log(
    `You can inspect the Custom View data in the Merchant Center at "${chalk.gray(
      customViewLink
    )}".`
  );
}

type TPushDeploymentPreviewParams = {
  mcApiUrl: string;
  applicationId: string;
  applicationIdentifier: string;
  localCustomEntityData: CustomApplicationData;
  options: TCliCommandPushDeploymentPreviewOptions;
};

async function pushDeploymentPreview({
  mcApiUrl,
  applicationId,
  localCustomEntityData,
  applicationIdentifier,
  options,
}: TPushDeploymentPreviewParams) {
  /*
    1. Check if the Custom Application exists in the Merchant Center.
    2. Ask for the alias and URL of the deployment preview.
    3. Check whether it exists a deployment preview with the same alias.
    4. If it exists, ask for confirmation to update it.
    5. If it doesn't exist, ask for confirmation to create it.
  */

  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    entryPointUriPath: localCustomEntityData.entryPointUriPath,
    applicationIdentifier,
  });

  if (!fetchedCustomApplication) {
    throw new Error(
      `The Custom Application "${applicationIdentifier}" does not exist in the Merchant Center.`
    );
  }

  const { deploymentAlias } = await prompts({
    type: 'text',
    name: 'deploymentAlias',
    message: [
      `What's the alias for the deployment preview? (my-alias)`,
      options.dryRun &&
        chalk.gray('Using "--dry-run", no deployment preview will be created.'),
    ]
      .filter(Boolean)
      .join('\n'),
    validate: (value) => value && value.length > 2,
  });

  const existingDeploymentPreview = fetchedCustomApplication.deployments.find(
    (deployment) => deployment.alias === deploymentAlias
  );

  if (existingDeploymentPreview) {
    const { aliasOverrideConfirmation } = await prompts({
      type: 'confirm',
      name: 'aliasOverrideConfirmation',
      message: [
        `The alias "${chalk.green(
          deploymentAlias
        )}" already exists. Do you want to proceed??`,
        'The URL you will provide will override the existing one.',
        options.dryRun &&
          chalk.gray(
            'Using "--dry-run", no deployment preview will be created.'
          ),
      ]
        .filter(Boolean)
        .join('\n'),
      initial: false,
    });

    if (!aliasOverrideConfirmation) {
      console.log(chalk.red('Aborted.'));
      return;
    }
  }

  const { deploymentUrl } = await prompts({
    type: 'text',
    name: 'deploymentUrl',
    message: [
      `What's the URL for the deployment preview?`,
      options.dryRun &&
        chalk.gray('Using "--dry-run", no deployment preview will be created.'),
    ]
      .filter(Boolean)
      .join('\n'),
    validate: (value) => value && value.length > 2,
  });

  if (options.dryRun) {
    const message = existingDeploymentPreview
      ? `The existing deployment preview with alias "${deploymentAlias}" would have been updated with this url: "${deploymentUrl}".`
      : `A new deployment preview with alias "${deploymentAlias}" would have been created with this url: "${deploymentUrl}".`;
    console.log(`\n${message}\n`);
    return;
  }

  // if (existingDeploymentPreview) {
  //   await updateCustomApplication({
  //     mcApiUrl,
  //     organizationId: fetchedCustomApplication.organizationId,
  //     data: {
  //       ...fetchedCustomApplication.application,
  //       deployments: fetchedCustomApplication.deployments.map((deployment) =>
  //         deployment.alias === deploymentAlias
  //           ? { ...deployment, url: deploymentUrl }
  //           : deployment
  //       ),
  //     },
  //     applicationId,
  //     applicationIdentifier,
  //   });
  // } else {
  //   await updateCustomApplication({
  //     mcApiUrl,
  //     organizationId: fetchedCustomApplication.organizationId,
  //     data: {
  //       ...fetchedCustomApplication.application,
  //       deployments: [
  //         ...fetchedCustomApplication.deployments,
  //         { alias: deploymentAlias, url: deploymentUrl },
  //       ],
  //     },
  //     applicationId,
  //     applicationIdentifier,
  //   });
  // }
}

async function run(options: TCliCommandPushDeploymentPreviewOptions) {
  const applicationConfig = processConfig();
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
    throw new Error(
      'Deployments previews are not supported for Custom Views yet.'
    );
  }

  if (isCustomViewData(localCustomEntityData)) {
    createOrUpdateCustomView({
      mcApiUrl,
      localCustomEntityData,
      applicationIdentifier,
      customViewId: customViewId || localCustomEntityData.id,
      options,
    });
  } else {
    createOrUpdateCustomApplication({
      mcApiUrl,
      localCustomEntityData,
      applicationIdentifier,
      options,
    });
  }
}

export default run;
