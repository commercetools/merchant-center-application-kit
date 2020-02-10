import { ApplicationWindow } from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

const getMcApiUrlFromOrigin = () => {
  const url = new URL(window.origin);
  const mcApiUrlHost = url.host.replace('mc.', 'mc-api.');

  return `${url.protocol}//${mcApiUrlHost}`;
};

export default function getMcApiUrl(appEnv = window.app) {
  const isServedByProxy = appEnv.servedByProxy;
  const mcApiUrl = appEnv.mcApiUrl;

  if (isServedByProxy && !mcApiUrl) return getMcApiUrlFromOrigin();

  return appEnv.mcApiUrl;
}
