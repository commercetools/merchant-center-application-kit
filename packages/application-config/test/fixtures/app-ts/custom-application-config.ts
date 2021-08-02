import type { ConfigOptions } from '../../../src/types';
import { entryPointUriPath } from './constants';

const name = 'Test application';

const config: ConfigOptions = {
  name,
  cloudIdentifier: 'gcp-eu',
  entryPointUriPath,
  env: {
    production: {
      url: 'https://test.com',
    },
  },
};

export default config;
