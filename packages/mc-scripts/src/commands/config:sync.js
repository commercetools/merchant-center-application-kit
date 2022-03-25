const omit = require('lodash/omit');
const { promisify } = require('util');
const read = promisify(require('read'));
const chalk = require('react-dev-utils/chalk');
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const {
  fetchCustomApplication,
  updateCustomApplication,
  createCustomApplication,
} = require('../utils/custom-application-requests');
const updateApplicationIdInCustomApplicationConfig = require('../utils/update-application-id-in-custom-application-config');

const credentialsStorage = new CredentialsStorage();

const configSync = async () => {
  const applicationConfig = processConfig();
  const { data: localCustomAppData } = applicationConfig;
  const { mcApiUrl, location } = applicationConfig.env;

  if (!credentialsStorage.isSessionValid(mcApiUrl)) {
    throw new Error(
      `You don't have a valid session for the ${mcApiUrl} environment. Please, run the “mc-scripts login” to login\n`
    );
  }

  const token = credentialsStorage.getToken(mcApiUrl);
  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    token,
    entryPointUriPath: localCustomAppData.entryPointUriPath,
  });

  // This is temporary. We will replace the code below by fetching the organizations the user belongs to.
  const organizationId = await read({
    prompt: 'What is your OrganizationId?: ',
  });
  if (!fetchedCustomApplication) {
    console.log(
      `You are about to create the configuration for organization with id ${organizationId} for the ${location} environment.`
    );
    const userResponse = await read({ prompt: 'Is this OK? ', default: 'yes' });
    if (userResponse.toLowerCase().charAt(0) !== 'y') {
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
          `You have successfully created the configuration for organization with id ${organizationId} for the ${location} environment. Your local configuration has been updated with the new created application identifier: ${createdCustomApplication.id}.\n`
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
    `You are about to update the configuration for organization with id ${organizationId} for the ${location} environment.`
  );
  const userResponse = await read({ prompt: 'Is this OK? ', default: 'yes' });
  if (userResponse.toLowerCase().charAt(0) !== 'y') {
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
      `You have successfully updated the configuration for organization with id ${organizationId} for the ${location} environment.`
    )
  );
};

configSync().catch((error) => {
  console.error(error);
  process.exit(1);
});
