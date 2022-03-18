const fetch = require('node-fetch');
const createHttpUserAgent = require('@commercetools/http-user-agent');
const pkgJson = require('../../package.json');

const calculateExpirationTime = (expiresIn) => Date.now() + expiresIn * 1000;

const userAgent = createHttpUserAgent({
  name: 'cli-login',
  libraryName: 'mc-scripts',
  libraryVersion: pkgJson.version,
  contactUrl: 'https://git.io/fjuyC', // points to the appkit repo issues
  contactEmail: 'support@commercetools.com',
});

const getAuthToken = async (mcApiUrl, payload) => {
  const response = await fetch(`${mcApiUrl}/tokens/cli`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-user-agent': userAgent,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (error) {}
    const errorMessage = parsed ? parsed.message : text;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return {
    token: data.token,
    expiresAt: calculateExpirationTime(data.expiresIn),
  };
};

exports.getAuthToken = getAuthToken;
