const omit = require('lodash/omit');
const mri = require('mri');
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

const flags = mri(process.argv.slice(2));

const configSync = async () => {
  if (!flags.organizationId) {
    throw Error('organizationId argument is required.');
  }

  const { organizationId } = flags;
  const applicationConfig = processConfig();
  const { data: localCustomAppData } = applicationConfig;
  const { mcApiUrl } = applicationConfig.env;

  if (!credentialsStorage.isSessionValid(mcApiUrl)) {
    throw new Error(
      `You don't have a valid session for the ${mcApiUrl} environment. Please login\n`
    );
  }

  const token = credentialsStorage.getToken(mcApiUrl);
  const fetchedCustomApplication = await fetchCustomApplication({
    mcApiUrl,
    token,
    entryPointUriPath: localCustomAppData.entryPointUriPath,
  });

  if (!fetchedCustomApplication) {
    console.log(
      "You don't have custom application for this entrypoint. We will create one for you."
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
      console.log(chalk.green(`Config created successfully.\n`));
      // update applicationID in the custom-application-config file
      updateApplicationIdInCustomApplicationConfig(createdCustomApplication.id);
    }
    return;
  }
  // update applicationID in the custom-application-config file
  updateApplicationIdInCustomApplicationConfig(
    fetchedCustomApplication.application.id
  );

  // TODO: show diff (followup)
  const userResponse = await read({
    prompt:
      'Are you sure your want to overwrite your remote config with the local config? ',
    default: 'yes',
  });
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
  console.log(chalk.green(`Config updated successfully.\n`));
};

configSync().catch((error) => {
  console.error(error);
  process.exit(1);
});
