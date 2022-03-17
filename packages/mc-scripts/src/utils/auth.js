const fetch = require('node-fetch');

const calculateExpirationTime = (expiresIn) => Date.now() + expiresIn * 1000;

const getAuthToken = async (mcApiUrl, payload) => {
  const response = await fetch(`${mcApiUrl}/tokens/cli`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
