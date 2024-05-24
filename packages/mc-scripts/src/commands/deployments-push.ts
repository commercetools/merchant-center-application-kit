import chalk from 'chalk';
import prompts from 'prompts';
import {
  processConfig,
  type CustomApplicationData,
  type CustomViewData,
} from '@commercetools-frontend/application-config';
import type { TCliCommandPushDeploymentPreviewOptions } from '../types';
import CredentialsStorage from '../utils/credentials-storage';
import {
  fetchCustomApplication,
  updateCustomApplicationDeploymentPreview,
  createCustomApplicationDeploymentPreview,
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

type TPushDeploymentPreviewParams = {
  mcApiUrl: string;
  applicationId: string;
  applicationIdentifier: string;
  isCustomView: boolean;
  localCustomEntityData: CustomApplicationData;
  options: TCliCommandPushDeploymentPreviewOptions;
};

async function pushDeploymentPreview({
  mcApiUrl,
  applicationId,
  applicationIdentifier,
  localCustomEntityData,
  isCustomView,
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

  const mcDeploymentPreviewsLink = getMcUrlLink({
    mcApiUrl,
    organizationId: fetchedCustomApplication.organizationId,
    customEntityId: fetchedCustomApplication.application.id,
    isCustomView,
  });
  if (existingDeploymentPreview) {
    await updateCustomApplicationDeploymentPreview({
      mcApiUrl,
      organizationId: fetchedCustomApplication.organizationId,
      applicationIdentifier,
      deploymentId: existingDeploymentPreview.id,
      data: { url: deploymentUrl },
    });

    console.log(
      chalk.green(
        `Deployment preview with alias "${deploymentAlias}" updated successfully with URL "${deploymentUrl}".`
      )
    );
    console.log(
      chalk.green(
        `You can access the deployment previews at: ${mcDeploymentPreviewsLink}`
      )
    );
  } else {
    await createCustomApplicationDeploymentPreview({
      mcApiUrl,
      organizationId: fetchedCustomApplication.organizationId,
      applicationIdentifier,
      applicationId,
      data: { alias: deploymentAlias, url: deploymentUrl },
    });

    console.log(
      chalk.green(
        `Deployment preview with alias "${deploymentAlias}" created successfully with URL "${deploymentUrl}".`
      )
    );
    console.log(
      chalk.green(
        `You can access the deployment previews at: ${mcDeploymentPreviewsLink}`
      )
    );
  }
}

async function run(options: TCliCommandPushDeploymentPreviewOptions) {
  const applicationConfig = processConfig();
  const localCustomEntityData: CustomApplicationData | CustomViewData =
    applicationConfig.data;
  const { mcApiUrl, applicationIdentifier } = applicationConfig.env;
  const isCustomView = isCustomViewData(localCustomEntityData);

  console.log(`Using Merchant Center environment "${chalk.green(mcApiUrl)}".`);
  console.log();

  const isSessionValid = credentialsStorage.isSessionValid(mcApiUrl);
  if (!isSessionValid) {
    throw new Error(
      `You don't have a valid session. Please, run the "mc-scripts login" command to authenticate yourself.`
    );
  }

  if (isCustomView) {
    throw new Error(
      'Deployments previews are not supported for Custom Views yet.'
    );
  }

  await pushDeploymentPreview({
    mcApiUrl,
    applicationId: localCustomEntityData.id,
    applicationIdentifier,
    localCustomEntityData,
    isCustomView,
    options,
  });
}

export default run;
