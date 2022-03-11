const { promisify } = require('util');
const read = promisify(require('read'));
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentialsStorage');
const authenticator = require('../utils/auth');
const validateEmail = require('../utils/validateEmail');

const getEmail = async () => {
  let email = await read({ prompt: 'Email: ' });
  if (!validateEmail(email)) {
    console.log('Please input a valid email');
    email = await getEmail();
  }
  return email;
};

const getPassword = async () => {
  return await read({ prompt: 'Password: ', silent: true });
};

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

  const email = await getEmail();
  const password = await getPassword();

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
