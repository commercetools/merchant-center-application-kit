const omit = require('lodash/omit');
const prompts = require('prompts');
const chalk = require('chalk');
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const {
  fetchCustomApplication,
  updateCustomApplication,
  createCustomApplication,
  fetchUserOrganizations,
} = require('../utils/graphql-requests');
const updateApplicationIdInCustomApplicationConfig = require('../utils/update-application-id-in-custom-application-config');

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
    } else {
      if (userOrganizations.total === 1) {
        organizationId = userOrganizations.results[0].id;
        organizationName = userOrganizations.results[0].name;
      } else {
        const organizationChoices = userOrganizations.results.map(
          (organization) => ({
            title: organization.name,
            value: organization.id,
          })
        );

        organizationId = await prompts({
          type: 'select',
          name: 'organizationId',
          message: 'Select Organization',
          choices: organizationChoices,
          initial: 0,
        })['organizationId'];

        organizationName = organizationChoices.find(
          ({ value }) => value === organizationId
        ).title;
      }
    }

    const { confirmation } = await prompts({
      type: 'text',
      name: 'confirmation',
      message: `You are about to create a new Custom Application in the "${organizationName}" organization for the ${mcApiUrl} environment. Are you sure you want to proceed?`,
      initial: 'yes',
    });
    if (confirmation.toLowerCase().charAt(0) !== 'y') {
      console.log(chalk.red('Aborted.'));
    } else {
      const createdCustomApplication = await createCustomApplication({
        mcApiUrl,
        token,
        organizationId,
        data: omit(localCustomAppData, ['id']),
      });
      // update applicationID in the custom-application-config file
      updateApplicationIdInCustomApplicationConfig(createdCustomApplication.id);
      const customAppLink = getMcUrlLink(
        mcApiUrl,
        organizationId,
        createdCustomApplication.id
      );
      console.log(
        chalk.green(
          `Custom Application created.\nThe "applicationId" in your local Custom Application config file has been updated with the application ID.\nYou can see the Custom Application data in the Merchant Center at ${customAppLink}.`
        )
      );
    }
    return;
  }

  // TODO: show diff (followup task)

  const { confirmation } = await prompts({
    type: 'text',
    name: 'confirmation',
    message: `You are about to update the Custom Application "${localCustomAppData.entryPointUriPath}" in the ${mcApiUrl} environment. Are you sure you want to proceed?`,
    initial: 'yes',
  });
  if (confirmation.toLowerCase().charAt(0) !== 'y') {
    console.log(chalk.red('Aborted.'));
    return;
  }
  await updateCustomApplication({
    mcApiUrl,
    token,
    organizationId: fetchedCustomApplication.organizationId,
    data: omit(localCustomAppData, ['id']),
    applicationId: fetchedCustomApplication.application.id,
  });
  const customAppLink = getMcUrlLink(
    mcApiUrl,
    fetchedCustomApplication.organizationId,
    fetchedCustomApplication.application.id
  );
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
