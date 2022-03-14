const fetch = require('node-fetch');

const authenticator = async ({ email, password, mcApiUrl }) => {
  const response = await fetch(`${mcApiUrl}/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const rawResponseError = await response.text();
    const errorMessage = JSON.parse(rawResponseError)['message'];
    throw new Error(errorMessage);
  }

  return response.headers.get('set-cookie');
};

module.exports = authenticator;
