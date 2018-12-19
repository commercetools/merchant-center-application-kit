import createMiddleware from './src/middleware';
import * as actions from './src/actions';
import createSdkGet from './src/components/sdk-get';

const Sdk = {
  Get: createSdkGet(),
};

export { createMiddleware, actions, Sdk, createSdkGet };
