import { entryPointUriPath, PERMISSIONS } from './src/constants';
import type { ConfigOptions } from '@commercetools-frontend/application-config';

const config: ConfigOptions = {
  entryPointUriPath,
  mainMenuLink: {
    // ...
    permissions: [PERMISSIONS.View],
  },
  // ...
};
export default config;
