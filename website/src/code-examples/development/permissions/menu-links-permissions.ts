import type { ConfigOptions } from '@commercetools-frontend/application-config';
import { entryPointUriPath, PERMISSIONS } from './src/constants';

const config: ConfigOptions = {
  entryPointUriPath,
  mainMenuLink: {
    permissions: [PERMISSIONS.View],
  },
  // ...
};
export default config;
