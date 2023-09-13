import chalk from 'chalk';
import prompts from 'prompts';
import { processConfig } from '@commercetools-frontend/application-config';
import { getAuthToken } from '../utils/auth';
import CredentialsStorage from '../utils/credentials-storage';

const credentialsStorage = new CredentialsStorage();

async function run() {
  const applicationConfig = processConfig();
  const { mcApiUrl, applicationId, entryPointUriPath } = applicationConfig.env;

  if (!applicationId && !entryPointUriPath) {
    throw new Error(
      `Missing application identifier and entry point URI path. Make sure you have a Custom Application config file.`
    );
  }

  console.log(`Using Merchant Center environment "${chalk.green(mcApiUrl)}".`);
  console.log();

  if (credentialsStorage.isSessionValid(mcApiUrl)) {
    console.log(`You already have a valid session.`);
    return;
  }

  console.log(`Enter the login credentials:`);

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

  const credentials = await getAuthToken(
    mcApiUrl,
    { email, password },
    { 'x-application-id': `${applicationId}:${entryPointUriPath}` }
  );
  credentialsStorage.setToken(mcApiUrl, credentials);

  console.log(chalk.green(`Login successful.\n`));
}

export default run;
