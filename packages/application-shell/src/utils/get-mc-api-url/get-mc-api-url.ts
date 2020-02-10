import { ApplicationWindow } from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

export default function getMcApiUrl(appEnv = window.app) {
  return appEnv.mcApiUrl;
}
