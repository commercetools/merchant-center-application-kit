import middleware from './middleware';
import * as actions from './actions';
import SdkGet from './components/sdk-get';

const Sdk = {
  Get: SdkGet,
};

export { middleware, actions, Sdk };
