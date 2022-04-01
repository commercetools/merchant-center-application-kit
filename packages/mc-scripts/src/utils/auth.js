const fetch = require('node-fetch');
const userAgent = require('./user-agent');

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

  const authToken = await response.json();
  return authToken;
};

exports.getAuthToken = getAuthToken;
