const readline = require('readline');
const fetch = require('node-fetch');
const fs = require('fs');
const homedir = require('os').homedir();
const { processConfig } = require('@commercetools-frontend/application-config');
const { MC_API_URLS, DEFAULT_CREDENTIALS } = require('../constants');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('close', () => {
  process.exit(0);
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const getEmail = async () => {
  let email = await question('Email: ');
  if (!validateEmail(email)) {
    console.log('Please input a valid email');
    await getEmail();
  }
  return email;
};

const getPassword = async () => {
  return await question('Password: ');
};

const getUpdatedCredentials = (oldCredentials, cloudIdentifier, token) => {
  oldCredentials[cloudIdentifier] = token;
  return JSON.stringify(oldCredentials);
};

const getSuccessMessage = (cloudIdentifier) => {
  console.log(
    `You've successfully logged into the ${cloudIdentifier} environment.`
  );
};

const updateCredential = (cloudIdentifier, token) => {
  const dirpath = `${homedir}/.mcscriptsrc`;
  const filename = 'credentials.json';
  const filePath = `${dirpath}/${filename}`;

  try {
    if (!fs.existsSync(dirpath)) {
      fs.mkdirSync(dirpath);
      const credentials = getUpdatedCredentials(
        DEFAULT_CREDENTIALS,
        cloudIdentifier,
        token
      );
      console.log({ credentials });
      fs.writeFileSync(filePath, credentials);
    } else {
      const data = fs.readFileSync(filePath, 'utf8');
      console.log({ data });
      const credentials = getUpdatedCredentials(
        JSON.parse(data),
        cloudIdentifier,
        token
      );
      fs.writeFileSync(filePath, credentials);
    }
  } catch (err) {
    console.error('An error occured');
  }
};

const login = async () => {
  const applicationConfig = processConfig();
  const cloudIdentifier = applicationConfig.env.cloudIdentifier.toUpperCase();
  const email = await getEmail();
  const password = await getPassword();

  // Checking if the cloud identifier is valid
  if (!MC_API_URLS[cloudIdentifier]) {
    console.log('cloudIdentifier in the applicationConfig is invalid');
    rl.close();
  }

  const response = await fetch(MC_API_URLS[cloudIdentifier], {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.status !== 200) {
    console.log('Invalid email or password');
    rl.close();
  }

  const cookieDate = response.headers.get('set-cookie');
  const cookie = cookieDate.split(';')[0].split('=')[1];
  updateCredential(cloudIdentifier, cookie);
  getSuccessMessage(cloudIdentifier);
  rl.close();
};

login();
