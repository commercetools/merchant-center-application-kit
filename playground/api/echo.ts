import {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';
import { VercelRequest, VercelResponse } from '@vercel/node';

const sessionAuthVerifier = createSessionAuthVerifier({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  audience: process.env.PLAYGROUND_API_AUDIENCE!,
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
  inferIssuer: true,
});

async function handler(request: VercelRequest, response: VercelResponse) {
  const { url, headers, body } = request;
  try {
    await sessionAuthVerifier(request, response);
  } catch (error) {
    response.status(401).json({
      message: 'Missing or invalid authorization token',
      url,
      headers,
      body,
      error,
    });
    return;
  }
  response.status(200).json({
    message: `Echoing request: ${request.url}`,
    url,
    headers,
    body,
    // @ts-ignore
    session: request.session,
  });
}

export default handler;
