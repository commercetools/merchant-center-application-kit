import fetch from 'node-fetch';
import userAgent from './user-agent';

type TAuthPayload = {
  email: string;
  password: string;
};

const getAuthToken = async (mcApiUrl: string, payload: TAuthPayload) => {
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

export { getAuthToken };
