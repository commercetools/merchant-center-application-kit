const { promisify } = require('util');
const read = promisify(require('read'));
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentials-storage');
const authenticator = require('../utils/auth');

const successfulLoginMessage = (cloudIdentifier) => {
  console.log(
    `You've successfully logged into the ${cloudIdentifier} environment.`
  );
  process.exit(0);
};

const login = async () => {
  const applicationConfig = processConfig();
  const cloudIdentifier = applicationConfig.env.location;
  const credentialsStorage = new CredentialsStorage(cloudIdentifier);

  if (credentialsStorage.isSessionValid()) {
    successfulLoginMessage(cloudIdentifier);
  }

  const email = await read({ prompt: 'Email: ' });
  const password = await read({ prompt: 'Password: ', silent: true });

  const cookieData = await authenticator(
    email,
    password,
    applicationConfig.env.mcApiUrl
  );
  credentialsStorage.update(cookieData);
  successfulLoginMessage(cloudIdentifier);
};

login().catch((error) => {
  console.error(error);
  process.exit(1);
});
