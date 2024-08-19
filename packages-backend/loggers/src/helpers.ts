import type { Request } from 'express';
import type { TAccessLoggerOptions } from './types';

const parseIps = (request: Request) => {
  const forwardedFor = request.headers['x-forwarded-for'];

  if (!forwardedFor) {
    return [];
  }

  const remoteAddresses = Array.isArray(forwardedFor)
    ? forwardedFor
    : forwardedFor.split(',');

  return remoteAddresses;
};

const createAccessLogSkipper =
  (options: TAccessLoggerOptions) => (request: Request) => {
    if (Boolean(options.silent)) {
      return true;
    }
    const hasMatchingIgnoreUrl = (options.ignoreUrls ?? []).some(
      (uriPathOrRegex) => {
        if (typeof uriPathOrRegex === 'string') {
          return request.originalUrl === uriPathOrRegex;
        }
        return request.originalUrl.match(uriPathOrRegex);
      }
    );
    return hasMatchingIgnoreUrl;
  };

const mapRequestMetadata = (request: Request) => {
  try {
    const remoteAddress = request.socket?.remoteAddress;
    const proxyIps = parseIps(request);
    const [clientIp] = proxyIps;
    return {
      clientIp: clientIp ?? remoteAddress,
      proxyIps,
      hostname: request.socket ? request.hostname : undefined,
      ...(remoteAddress ? { remoteAddress } : {}),
    };
  } catch (error) {
    console.error(`Failed to parse request metadata`, error);
    return {};
  }
};

export { parseIps, createAccessLogSkipper, mapRequestMetadata };
