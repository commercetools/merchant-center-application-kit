const { promisify } = require('util');
const read = promisify(require('read'));
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const authenticator = require('../utils/auth');

const credentialsStorage = new CredentialsStorage();

const login = async () => {
  const applicationConfig = processConfig();
  const { mcApiUrl } = applicationConfig.env;

  if (credentialsStorage.isSessionValid(mcApiUrl)) {
    console.log(
      `You already have a valid session for the ${mcApiUrl} environment.`
    );
    return;
  }

  const email = await read({ prompt: 'Email: ' });
  const password = await read({ prompt: 'Password: ', silent: true });

  const sessionData = await authenticator({ email, password, mcApiUrl });
  credentialsStorage.setToken(mcApiUrl, sessionData);
  console.log(`Login successful for the ${mcApiUrl} environment.`);
};

login().catch((error) => {
  console.error(error);
  process.exit(1);
});
