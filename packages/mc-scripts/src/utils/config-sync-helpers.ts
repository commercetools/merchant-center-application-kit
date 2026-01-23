import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import omit from 'lodash/omit';
import type {
  CustomApplicationData,
  CustomViewData,
} from '@commercetools-frontend/application-config';
import {
  getCustomApplicationConfigDiff,
  getCustomViewConfigDiff,
} from './get-config-diff';
import {
  fetchCustomApplication,
  fetchCustomView,
  updateCustomApplication,
  updateCustomView,
  createCustomApplication,
  createCustomView,
} from './graphql-requests';

type TGetMcUrlLink = {
  mcApiUrl: string;
  organizationId: string;
  customEntityId: string;
  isCustomView?: boolean;
};

export const getMcUrlLink = ({
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

export const isCustomViewData = (
  data: CustomApplicationData | CustomViewData
): data is CustomViewData =>
  (data as CustomApplicationData).entryPointUriPath === undefined;

type TWriteIdToFile = {
  configFilePath: string;
  id: string;
  isCustomView: boolean;
};

export const writeIdToFile = ({
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

type TCreateCustomApplicationOptions = {
  mcApiUrl: string;
  organizationId: string;
  organizationName: string;
  localCustomEntityData: CustomApplicationData;
  applicationIdentifier: string;
  dryRun: boolean;
  configFilePath?: string;
};

export async function performCreateCustomApplication({
  mcApiUrl,
  organizationId,
  organizationName,
  localCustomEntityData,
  applicationIdentifier,
  dryRun,
  configFilePath,
}: TCreateCustomApplicationOptions): Promise<string | null> {
  console.log(
    `Creating Custom Application in organization "${chalk.green(
      organizationName
    )}"...`
  );

  const data = omit(localCustomEntityData, ['id']);

  if (dryRun) {
    console.log();
    console.log('Dry run - would create Custom Application with:');
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
    return null;
  }

  const createdCustomApplication = await createCustomApplication({
    mcApiUrl,
    organizationId,
    data,
    applicationIdentifier,
  });

  if (!createdCustomApplication) {
    throw new Error('Failed to create the Custom Application.');
  }

  const customAppLink = getMcUrlLink({
    mcApiUrl,
    organizationId,
    customEntityId: createdCustomApplication.id,
  });

  console.log(chalk.green('Custom Application created successfully.'));
  console.log(`ID: ${chalk.cyan(createdCustomApplication.id)}`);
  console.log(
    `Please update the "env.production.applicationId" field in your local Custom Application config file with the ID above.`
  );
  console.log(`URL: ${chalk.gray(customAppLink)}`);

  if (configFilePath) {
    writeIdToFile({
      configFilePath,
      id: createdCustomApplication.id,
      isCustomView: false,
    });
  }

  return createdCustomApplication.id;
}

type TUpdateCustomApplicationOptions = {
  mcApiUrl: string;
  organizationId: string;
  applicationId: string;
  localCustomEntityData: CustomApplicationData;
  applicationIdentifier: string;
  dryRun: boolean;
};

export async function performUpdateCustomApplication({
  mcApiUrl,
  organizationId,
  applicationId,
  localCustomEntityData,
  applicationIdentifier,
  dryRun,
}: TUpdateCustomApplicationOptions): Promise<void> {
  const data = omit(localCustomEntityData, ['id']);

  if (dryRun) {
    console.log();
    console.log(
      `Dry run - would update Custom Application "${chalk.green(
        data.entryPointUriPath
      )}" with:`
    );
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
    return;
  }

  console.log('Updating Custom Application...');

  await updateCustomApplication({
    mcApiUrl,
    organizationId,
    data,
    applicationId,
    applicationIdentifier,
  });

  const customAppLink = getMcUrlLink({
    mcApiUrl,
    organizationId,
    customEntityId: applicationId,
  });

  console.log(chalk.green('Custom Application updated successfully.'));
  console.log(`URL: ${chalk.gray(customAppLink)}`);
}

type TCreateCustomViewOptions = {
  mcApiUrl: string;
  organizationId: string;
  organizationName: string;
  localCustomEntityData: CustomViewData;
  applicationIdentifier: string;
  dryRun: boolean;
  configFilePath?: string;
};

export async function performCreateCustomView({
  mcApiUrl,
  organizationId,
  organizationName,
  localCustomEntityData,
  applicationIdentifier,
  dryRun,
  configFilePath,
}: TCreateCustomViewOptions): Promise<string | null> {
  console.log(
    `Creating Custom View in organization "${chalk.green(organizationName)}"...`
  );

  const data = omit(localCustomEntityData, ['id']);

  if (dryRun) {
    console.log();
    console.log('Dry run - would create Custom View with:');
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
    return null;
  }

  const createdCustomView = await createCustomView({
    mcApiUrl,
    organizationId,
    data,
    applicationIdentifier,
  });

  if (!createdCustomView) {
    throw new Error('Failed to create the Custom View.');
  }

  const customViewLink = getMcUrlLink({
    mcApiUrl,
    organizationId,
    customEntityId: createdCustomView.id,
    isCustomView: true,
  });

  console.log(chalk.green('Custom View created successfully.'));
  console.log(`ID: ${chalk.cyan(createdCustomView.id)}`);
  console.log(
    `Please update the "env.production.customViewId" field in your local Custom View config file with the ID above.`
  );
  console.log(`URL: ${chalk.gray(customViewLink)}`);

  if (configFilePath) {
    writeIdToFile({
      configFilePath,
      id: createdCustomView.id,
      isCustomView: true,
    });
  }

  return createdCustomView.id;
}

type TUpdateCustomViewOptions = {
  mcApiUrl: string;
  organizationId: string;
  customViewId: string;
  localCustomEntityData: CustomViewData;
  applicationIdentifier: string;
  dryRun: boolean;
};

export async function performUpdateCustomView({
  mcApiUrl,
  organizationId,
  customViewId,
  localCustomEntityData,
  applicationIdentifier,
  dryRun,
}: TUpdateCustomViewOptions): Promise<void> {
  const data = omit(localCustomEntityData, ['id']);

  if (dryRun) {
    console.log();
    console.log(
      `Dry run - would update Custom View "${chalk.green(
        data.defaultLabel
      )}" with:`
    );
    console.log(chalk.gray(JSON.stringify(data, null, 2)));
    return;
  }

  console.log('Updating Custom View...');

  await updateCustomView({
    mcApiUrl,
    organizationId,
    data,
    customViewId,
    applicationIdentifier,
  });

  const customViewLink = getMcUrlLink({
    mcApiUrl,
    organizationId,
    customEntityId: customViewId,
    isCustomView: true,
  });

  console.log(chalk.green('Custom View updated successfully.'));
  console.log(`URL: ${chalk.gray(customViewLink)}`);
}

type TCheckCustomApplicationDiff = {
  mcApiUrl: string;
  entryPointUriPath: string;
  applicationIdentifier: string;
  localCustomEntityData: CustomApplicationData;
};

export async function checkCustomApplicationStatus({
  mcApiUrl,
  entryPointUriPath,
  applicationIdentifier,
  localCustomEntityData,
}: TCheckCustomApplicationDiff) {
  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    entryPointUriPath,
    applicationIdentifier,
  });

  if (!fetchedCustomApplication) {
    return { exists: false as const };
  }

  const configDiff = getCustomApplicationConfigDiff(
    fetchedCustomApplication.application as CustomApplicationData,
    localCustomEntityData
  );

  const customAppLink = getMcUrlLink({
    mcApiUrl,
    organizationId: fetchedCustomApplication.organizationId,
    customEntityId: fetchedCustomApplication.application.id,
  });

  return {
    exists: true as const,
    organizationId: fetchedCustomApplication.organizationId,
    applicationId: fetchedCustomApplication.application.id,
    configDiff,
    link: customAppLink,
  };
}

type TCheckCustomViewDiff = {
  mcApiUrl: string;
  customViewId: string;
  applicationIdentifier: string;
  localCustomEntityData: CustomViewData;
};

export async function checkCustomViewStatus({
  mcApiUrl,
  customViewId,
  applicationIdentifier,
  localCustomEntityData,
}: TCheckCustomViewDiff) {
  const fetchedCustomView = await fetchCustomView({
    mcApiUrl,
    customViewId,
    applicationIdentifier,
  });

  if (!fetchedCustomView) {
    return { exists: false as const };
  }

  const configDiff = getCustomViewConfigDiff(
    fetchedCustomView.customView as unknown as CustomViewData,
    localCustomEntityData
  );

  const customViewLink = getMcUrlLink({
    mcApiUrl,
    organizationId: fetchedCustomView.organizationId,
    customEntityId: fetchedCustomView?.customView?.id || '',
    isCustomView: true,
  });

  return {
    exists: true as const,
    organizationId: fetchedCustomView.organizationId,
    customViewId: fetchedCustomView?.customView?.id || '',
    configDiff,
    link: customViewLink,
  };
}
