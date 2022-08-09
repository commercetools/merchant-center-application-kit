// NOTE: Copied from `@application-shell-connectors`.
// TODO: Remove this version once the change in the connectors has been released.
import type { ApplicationWindow } from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

const mcHostnameRegex = /^mc(-(\d){4,})?\.(.*)$/;
const mcPreviewHostnameRegex = /^.*\.mc-preview\.(.*)$/;

const getMcOriginTld = (host: string) => {
  if (host.match(mcPreviewHostnameRegex)) {
    return host.replace(mcPreviewHostnameRegex, '$1');
  }
  return host.replace(mcHostnameRegex, '$3');
};

const getMcApiUrlFromOrigin = (origin: string) => {
  const url = new URL(origin);
  const originTld = getMcOriginTld(url.host);
  return `${url.protocol}//mc-api.${originTld}`;
};

const parseAsBoolean = (value: string | boolean) =>
  value === true || value === 'true';

function getMcApiUrl(
  environment: ApplicationWindow['app'] = window.app,
  origin: string = window.origin
): string {
  const isServedByProxy = parseAsBoolean(environment.servedByProxy);

  /**
   * Prefer using the origin URL for the MC API based on the origin value
   * of the browser's `window.location`.
   * This ensures that the application always uses the correct URL associated
   * with that environment, instead of relying on the config value.
   */
  if (isServedByProxy) {
    return getMcApiUrlFromOrigin(origin);
  }

  return environment.mcApiUrl;
}

export default getMcApiUrl;
