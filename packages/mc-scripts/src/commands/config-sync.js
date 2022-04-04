const omit = require('lodash/omit');
const prompts = require('prompts');
const mri = require('mri');
const chalk = require('chalk');
const jsonDiff = require('json-diff');
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const {
  fetchCustomApplication,
  updateCustomApplication,
  createCustomApplication,
  fetchUserOrganizations,
} = require('../utils/graphql-requests');

const flags = mri(process.argv.slice(2), {
  boolean: ['dry-run'],
});

const credentialsStorage = new CredentialsStorage();

const getMcUrlLink = (mcApiUrl, organizationId, applicationId) => {
  const mcUrl = mcApiUrl.replace('mc-api', 'mc');
  const customAppLink = `${mcUrl}/account/organizations/${organizationId}/custom-applications/owned/${applicationId}`;
  return customAppLink;
};

const configSync = async () => {
  const applicationConfig = processConfig();
  const { data: localCustomAppData } = applicationConfig;
  const { mcApiUrl } = applicationConfig.env;

  if (!credentialsStorage.isSessionValid(mcApiUrl)) {
    throw new Error(
      `You don't have a valid session for the ${mcApiUrl} environment. Please, run the "mc-scripts login" command to authenticate yourself.`
    );
  }

  const token = credentialsStorage.getToken(mcApiUrl);
  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    token,
    entryPointUriPath: localCustomAppData.entryPointUriPath,
  });

  if (!fetchedCustomApplication) {
    const userOrganizations = await fetchUserOrganizations({ mcApiUrl, token });

    let organizationId, organizationName;

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
        message: 'Select Organization',
        choices: organizationChoices,
        initial: 0,
      });

      if (!selectedOrganizationId) {
        throw new Error(`No Organization selected, aborting.`);
      }

      organizationId = selectedOrganizationId;
      organizationName = organizationChoices.find(
        ({ value }) => value === organizationId
      ).title;
    }

    const { confirmation } = await prompts({
      type: 'text',
      name: 'confirmation',
      message: `You are about to create a new Custom Application in the "${organizationName}" organization for the ${mcApiUrl} environment. Are you sure you want to proceed?`,
      initial: 'yes',
    });
    if (!confirmation || confirmation.toLowerCase().charAt(0) !== 'y') {
      console.log(chalk.red('Aborted.'));
      return;
    }

    const data = omit(localCustomAppData, ['id']);
    if (flags['dry-run']) {
      console.log(chalk.gray('DRY RUN mode'));
      console.log(
        `A new Custom Application would be created for the Organization ${organizationName} with the following payload:`
      );
      console.log(JSON.stringify(data));
      return;
    }
    const createdCustomApplication = await createCustomApplication({
      mcApiUrl,
      token,
      organizationId,
      data,
    });

    const customAppLink = getMcUrlLink(
      mcApiUrl,
      organizationId,
      createdCustomApplication.id
    );
    console.log(
      chalk.green(
        `Custom Application created.\nThe "applicationId" in your local Custom Application config file should be updated with the application ID: ${createdCustomApplication.id}.\nYou can see the Custom Application data in the Merchant Center at ${customAppLink}.`
      )
    );
    return;
  }

  const customAppLink = getMcUrlLink(
    mcApiUrl,
    fetchedCustomApplication.organizationId,
    fetchedCustomApplication.application.id
  );

  // Sanitize SVG to be consistent with the one in MC
  localCustomAppData.icon = sanitizeSvg(localCustomAppData.icon);

  const configDiff = jsonDiff.diffString(
    fetchedCustomApplication.application,
    localCustomAppData
  );

  if (!configDiff) {
    console.log(
      chalk.green(
        `Custom Application is already up to date.\nYou can see the Custom Application data in the Merchant Center at ${customAppLink}.`
      )
    );
    return;
  }

  console.log(configDiff);

  const { confirmation } = await prompts({
    type: 'text',
    name: 'confirmation',
    message: `You are about to update the Custom Application "${localCustomAppData.entryPointUriPath}" with the changes above, in the ${mcApiUrl} environment. Are you sure you want to proceed?`,
    initial: 'yes',
  });
  if (!confirmation || confirmation.toLowerCase().charAt(0) !== 'y') {
    console.log(chalk.red('Aborted.'));
    return;
  }

  const data = omit(localCustomAppData, ['id']);
  if (flags['dry-run']) {
    console.log(chalk.gray('DRY RUN mode'));
    console.log(
      `The Custom Application ${data.name} would be updated with the following payload:`
    );
    console.log(JSON.stringify(data));
    return;
  }

  await updateCustomApplication({
    mcApiUrl,
    token,
    organizationId: fetchedCustomApplication.organizationId,
    data: omit(localCustomAppData, ['id']),
    applicationId: fetchedCustomApplication.application.id,
  });

  console.log(
    chalk.green(
      `Custom Application updated.\nYou can see the Custom Application data in the Merchant Center at ${customAppLink}.`
    )
  );
};

configSync().catch((error) => {
  console.log(chalk.red(error));
  process.exit(1);
});
