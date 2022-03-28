const omit = require('lodash/omit');
const prompts = require('prompts');
const chalk = require('react-dev-utils/chalk');
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

const configSync = async () => {
  const applicationConfig = processConfig();
  const { data: localCustomAppData } = applicationConfig;
  const { mcApiUrl, location } = applicationConfig.env;

  if (!credentialsStorage.isSessionValid(mcApiUrl)) {
    throw new Error(
      `You don't have a valid session for the ${mcApiUrl} environment. Please, run the “mc-scripts login” to login.`
    );
  }

  const token = credentialsStorage.getToken(mcApiUrl);
  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    token,
    entryPointUriPath: localCustomAppData.entryPointUriPath,
  });

  const userOrganizations = await fetchUserOrganizations({ mcApiUrl, token });

  const organizationChoices = userOrganizations.results.map((organization) => ({
    title: organization.name,
    value: organization.id,
  }));

  const { organizationId } = await prompts({
    type: 'select',
    name: 'organizationId',
    message: 'Select Organization',
    choices: organizationChoices,
    initial: 0,
  });

  const organizationName = organizationChoices.filter(
    ({ value }) => value === organizationId
  )[0]['title'];

  if (!fetchedCustomApplication) {
    console.log(
      `You are about to create the configuration in the ${organizationName} organization in environment ${location}.`
    );
    const { confirmation } = await prompts({
      type: 'text',
      name: 'confirmation',
      message: 'Is this OK?',
      initial: 'yes',
    });
    if (confirmation.toLowerCase().charAt(0) !== 'y') {
      console.log('Aborted.');
    } else {
      const createdCustomApplication = await createCustomApplication({
        mcApiUrl,
        token,
        organizationId,
        data: omit(localCustomAppData, ['id']),
      });
      // update applicationID in the custom-application-config file
      updateApplicationIdInCustomApplicationConfig(createdCustomApplication.id);
      console.log(
        chalk.green(
          `You have successfully created the configuration in the ${organizationName} organization in environment ${location}. Your local configuration has also been updated with the newly created application identifier: ${createdCustomApplication.id}.`
        )
      );
    }
    return;
  }
  // update applicationID in the custom-application-config file
  updateApplicationIdInCustomApplicationConfig(
    fetchedCustomApplication.application.id
  );

  // TODO: show diff (followup)

  console.log(
    `You are about to update the configuration in the ${organizationName} organization in environment ${location}.`
  );
  const { confirmation } = await prompts({
    type: 'text',
    name: 'confirmation',
    message: 'Is this OK?',
    initial: 'yes',
  });
  if (confirmation.toLowerCase().charAt(0) !== 'y') {
    console.log('Aborted.');
    return;
  }
  await updateCustomApplication({
    mcApiUrl,
    token,
    organizationId,
    data: omit(localCustomAppData, ['id']),
    applicationId: fetchedCustomApplication.application.id,
  });
  console.log(
    chalk.green(
      `You have successfully updated the configuration in the ${organizationName} organization in environment ${location}.`
    )
  );
};

configSync().catch((error) => {
  console.error(error);
  process.exit(1);
});
