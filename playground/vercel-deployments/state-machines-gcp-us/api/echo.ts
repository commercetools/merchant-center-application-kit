// NOTE: this file is duplicated in both gcp-eu/us deployment folders
/* eslint-disable import/no-unresolved */
// @ts-ignore
import { NowRequest, NowResponse } from '@vercel/node';
import {
  createSessionAuthVerifier,
  CLOUD_IDENTIFIERS,
} from '@commercetools-backend/express';

const sessionAuthVerifier = createSessionAuthVerifier({
  audience: process.env.PLAYGROUND_API_AUDIENCE,
  issuer: CLOUD_IDENTIFIERS.GCP_EU,
  inferIssuer: true,
});

export default async (request: NowRequest, response: NowResponse) => {
  const { url, headers, body } = request;
  try {
    await sessionAuthVerifier(request, response);
  } catch (error) {
    response.status(401).json({
      message: 'Missing or invalid authorization token',
      url,
      headers,
      body,
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
};
