import { entryPointUriPath } from './constants';

const name = 'Test application';

/**
 * @type {import('../../../src/types').ConfigOptions}
 */
const config = {
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
