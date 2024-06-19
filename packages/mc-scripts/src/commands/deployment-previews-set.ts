import chalk from 'chalk';
import prompts from 'prompts';
import {
  processConfig,
  type CustomApplicationData,
  type CustomViewData,
} from '@commercetools-frontend/application-config';
import type { TCliCommandSetDeploymentPreviewOptions } from '../types';
import CredentialsStorage from '../utils/credentials-storage';
import {
  fetchCustomApplication,
  updateCustomApplicationDeploymentPreview,
  createCustomApplicationDeploymentPreview,
} from '../utils/graphql-requests';

const credentialsStorage = new CredentialsStorage();

const validateUrl = (url = ''): boolean => {
  try {
    const urlSchema = new URL(url);
    return ['http:', 'https:'].includes(urlSchema.protocol);
  } catch (error) {
    return false;
  }
};

const validateAlias = (alias = '') => {
  try {
    new URL(`https://${alias}.commercetools.com/`);
    return true;
  } catch (error) {
    return false;
  }
};

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

type TSetDeploymentPreviewParams = {
  mcApiUrl: string;
  applicationId: string;
  applicationIdentifier: string;
  isCustomView: boolean;
  localCustomEntityData: CustomApplicationData;
  options: TCliCommandSetDeploymentPreviewOptions;
};

async function setDeploymentPreview({
  mcApiUrl,
  applicationId,
  applicationIdentifier,
  localCustomEntityData,
  isCustomView,
  options,
}: TSetDeploymentPreviewParams) {
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
      `The Custom Application "${applicationIdentifier}" does not exist in the Merchant Center. Please create a Custom Application first before configuring deployment previews.`
    );
  }

  let deploymentAlias = options.alias;
  // If the alias was not provided as an argument to the script, let's ask for it.
  if (!deploymentAlias) {
    const { alias } = await prompts({
      type: 'text',
      name: 'alias',
      message: [
        `Enter the alias for the deployment preview`,
        options.dryRun &&
          chalk.gray(
            'Using "--dry-run", no deployment preview will be created.'
          ),
      ]
        .filter(Boolean)
        .join('\n'),
      validate: (value) => validateAlias(value),
    });
    deploymentAlias = alias as string;
  }

  const existingDeploymentPreview =
    fetchedCustomApplication.application.deployments.find(
      (deployment) => deployment.alias === deploymentAlias
    );

  if (!options.alias && !options.url && existingDeploymentPreview) {
    const { aliasOverrideConfirmation } = await prompts({
      type: 'confirm',
      name: 'aliasOverrideConfirmation',
      message: [
        `The alias "${chalk.green(
          deploymentAlias
        )}" already exists. Do you want to proceed and update the URL?`,
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

  let deploymentUrl = options.url;
  if (!deploymentUrl) {
    const { url } = await prompts({
      type: 'text',
      name: 'url',
      message: [
        `Enter the URL for the deployment preview`,
        options.dryRun &&
          chalk.gray(
            'Using "--dry-run", no deployment preview will be created.'
          ),
      ]
        .filter(Boolean)
        .join('\n'),
      validate: (value) => validateUrl(value),
    });
    deploymentUrl = url as string;
  }

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

async function run(options: TCliCommandSetDeploymentPreviewOptions) {
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
    throw new Error('Deployments previews are not supported for Custom Views.');
  }

  await setDeploymentPreview({
    mcApiUrl,
    applicationId: localCustomEntityData.id,
    applicationIdentifier,
    localCustomEntityData,
    isCustomView,
    options,
  });
}

export default run;
