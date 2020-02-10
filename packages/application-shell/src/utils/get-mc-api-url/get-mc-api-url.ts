import { ApplicationWindow } from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

export default function getMcApiUrl(appEnv = window.app) {
  const isServedByProxy = appEnv.servedByProxy;
  const mcApiUrl = appEnv.mcApiUrl;

  if (isServedByProxy && !mcApiUrl) return window.origin;

  return appEnv.mcApiUrl;
}
