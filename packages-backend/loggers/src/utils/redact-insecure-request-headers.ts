import type { Request } from 'express';

const redacted = '[REDACTED]';

function redactInsecureRequestHeaders(request: Request) {
  // Pick the headers that we want to redact, usually headers including sensitive information
  const authHeader = request.header('authorization');
  const cookieHeader = request.header('cookie');

  const redactedHeaders: { authorization?: string; cookie?: string } = {};
  if (authHeader) redactedHeaders.authorization = redacted;
  if (cookieHeader) redactedHeaders.cookie = redacted;

  return {
    ...request.headers,
    ...redactedHeaders,
  };
}

export default redactInsecureRequestHeaders;
