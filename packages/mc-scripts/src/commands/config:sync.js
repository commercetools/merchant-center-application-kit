const chalk = require('react-dev-utils/chalk');
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const {
  fetchCustomApplications,
  updateCustomApplicationsConfig,
} = require('../utils/custom-application-requests');

const credentialsStorage = new CredentialsStorage();

const configSync = async () => {
  const applicationConfig = processConfig();
  const { mcApiUrl } = applicationConfig.env;

  if (!credentialsStorage.isSessionValid(mcApiUrl)) {
    throw new Error(
      `You don't have a valid session for the ${mcApiUrl} environment. Please login\n`
    );
  }

  const sessionToken = credentialsStorage.getToken(mcApiUrl);

  const data = await fetchCustomApplications(mcApiUrl, sessionToken);
  console.log(JSON.stringify(data, undefined, 2));

  await updateCustomApplicationsConfig();

  console.log(
    chalk.green(`Config update successful for the ${mcApiUrl} environment.\n`)
  );
};

configSync().catch((error) => {
  console.error(error);
  process.exit(1);
});
