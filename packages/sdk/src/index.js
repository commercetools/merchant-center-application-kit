import SdkGet from './components/sdk-get';
import * as actions from './actions';

export { default as version } from './version';
export { default as createMiddleware } from './middleware';

const Sdk = {
  Get: SdkGet,
};

export { Sdk, actions };
