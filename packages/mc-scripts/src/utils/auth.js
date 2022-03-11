const fetch = require('node-fetch');

const authenticator = async (email, password, mcApiUrl) => {
  const response = await fetch(`${mcApiUrl}/tokens`, {
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

  return response.headers.get('set-cookie');
};

module.exports = authenticator;
