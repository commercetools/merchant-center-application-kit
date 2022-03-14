const { promisify } = require('util');
const read = promisify(require('read'));
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const authenticator = require('../utils/auth');
const path = require('path');

const credentialsStorage = new CredentialsStorage();

const login = async () => {
  const applicationConfig = processConfig({
    applicationPath: path.join(__dirname, 'f'),
  });
  const { mcApiUrl } = applicationConfig.env;

  if (credentialsStorage.isSessionValid(mcApiUrl)) {
    console.log(
      `You already have a valid session for the ${mcApiUrl} environment.`
    );
    return;
  }

  const email = await read({ prompt: 'Email: ' });
  const password = await read({ prompt: 'Password: ', silent: true });

  const cookieData = await authenticator(email, password, mcApiUrl);
  credentialsStorage.setToken(cookieData, mcApiUrl);
  console.log(`You've successfully logged into the ${mcApiUrl} environment.`);
};

login().catch((error) => {
  console.error(error);
  process.exit(1);
});
