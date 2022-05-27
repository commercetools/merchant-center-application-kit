import prompts from 'prompts';
import chalk from 'chalk';
import { processConfig } from '@commercetools-frontend/application-config';
import CredentialsStorage from '../utils/credentials-storage';
import { getAuthToken } from '../utils/auth';

const credentialsStorage = new CredentialsStorage();

async function run() {
  const applicationConfig = processConfig();
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
}

export default run;
