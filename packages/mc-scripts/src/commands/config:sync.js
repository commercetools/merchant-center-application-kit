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

  console.log(localCustomAppData);

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
  // TODO: add applicationID to custom-application-config file

  if (!fetchedCustomApplication.organizationExtensionForCustomApplication) {
    console.log(
      "You don't have custom application for this entrypoint. We will create one for you. \n"
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
      console.log({ createdCustomApplication });
      console.log(chalk.green(`Config created successfully.\n`));
      // TODO: add applicationID to custom-application-config file
    }
    return;
  }
  const savedApplicationConfig =
    fetchedCustomApplication.organizationExtensionForCustomApplication
      .application;

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
    applicationId: savedApplicationConfig.id,
  });
  console.log(chalk.green(`Config updated successfully.\n`));
};

configSync().catch((error) => {
  console.error(error);
  process.exit(1);
});
