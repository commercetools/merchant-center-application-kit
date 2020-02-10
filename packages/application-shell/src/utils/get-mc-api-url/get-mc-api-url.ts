import { ApplicationWindow } from '@commercetools-frontend/constants';

declare let window: ApplicationWindow;

export default function getMcApiUrl() {
  return window.app.mcApiUrl;
}
