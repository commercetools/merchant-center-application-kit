const fetch = require('node-fetch');
const cookie = require('cookie');

const getSessionData = async ({ email, password, mcApiUrl }) => {
  const response = await fetch(`${mcApiUrl}/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      throw new Error(error);
    }
    const errorMessage = parsed ? parsed.message : text;
    throw new Error(errorMessage);
  }

  const parsedCookie = cookie.parse(response.headers.get('set-cookie'));
  return {
    sessionToken: parsedCookie.mcAccessToken,
    expiresAt: parsedCookie.Expires,
  };
};

module.exports = getSessionData;
