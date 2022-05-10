const prompts = require('prompts');
const chalk = require('chalk');
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const { getAuthToken } = require('../utils/auth');

const credentialsStorage = new CredentialsStorage();

const login = async () => {
  const applicationConfig = await processConfig();
  const { mcApiUrl } = applicationConfig.env;

  if (credentialsStorage.isSessionValid(mcApiUrl)) {
    console.log(
      `You already have a valid session for the ${mcApiUrl} environment.\n`
    );
    return;
  }

  const { email } = await prompts({
    type: 'text',
    name: 'email',
    message: 'Email',
  });
  const { password } = await prompts({
    type: 'invisible',
    name: 'password',
    message: 'Password (hidden)',
  });

  if (!email || !password) {
    throw new Error(`Missing email or password values. Aborting.`);
  }

  const credentials = await getAuthToken(mcApiUrl, {
    email,
    password,
  });
  credentialsStorage.setToken(mcApiUrl, credentials);

  console.log(
    chalk.green(`Login successful for the ${mcApiUrl} environment.\n`)
  );
};

login().catch((error) => {
  console.log(chalk.red(error));
  process.exit(1);
});
