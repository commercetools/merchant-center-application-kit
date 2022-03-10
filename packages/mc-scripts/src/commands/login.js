const { promisify } = require('util');
const read = promisify(require('read'));
const fetch = require('node-fetch');
const { processConfig } = require('@commercetools-frontend/application-config');
const CredentialsStorage = require('../utils/credentialsStorage');
const path = require('path');

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

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

  const response = await fetch(`${applicationConfig.env.mcApiUrl}/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status !== 200) {
    const res = await response.json();
    throw new Error(res.message);
  }
  const cookieData = response.headers.get('set-cookie');
  credentialsStorage.update(cookieData);
  successfulLoginMessage(cloudIdentifier);
};

login().catch((error) => {
  console.error(error);
  process.exit(1);
});
