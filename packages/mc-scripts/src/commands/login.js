const { promisify } = require('util');
const read = promisify(require('read'));
const mri = require('mri');
const chalk = require('react-dev-utils/chalk');
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const { getAuthToken } = require('../utils/auth');

const flags = mri(process.argv.slice(2));

const credentialsStorage = new CredentialsStorage();

const login = async () => {
  const applicationConfig = processConfig();
  const { mcApiUrl } = applicationConfig.env;

  if (credentialsStorage.isSessionValid(mcApiUrl)) {
    console.log(
      `You already have a valid session for the ${mcApiUrl} environment.\n`
    );
    return;
  }

  const email = await read({ prompt: 'Email: ' });
  const password = await read({ prompt: 'Password (hidden): ', silent: true });

  const credentials = await getAuthToken(mcApiUrl, {
    email,
    password,
    projectKey: flags['project-key'],
  });
  credentialsStorage.setToken(mcApiUrl, credentials);
  console.log(
    chalk.green(`Login successful for the ${mcApiUrl} environment.\n`)
  );
};

login().catch((error) => {
  console.error(error);
  process.exit(1);
});
