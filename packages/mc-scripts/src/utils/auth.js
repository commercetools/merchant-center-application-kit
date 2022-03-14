const fetch = require('node-fetch');
const cookie = require('cookie');

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

  const parsedCookie = cookie.parse(response.headers.get('set-cookie'));
  return {
    sessionToken: parsedCookie.mcAccessToken,
    expiresAt: parsedCookie.Expires,
  };
};

module.exports = authenticator;
