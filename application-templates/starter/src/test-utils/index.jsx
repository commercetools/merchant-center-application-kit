import { createApolloClient } from '@commercetools-frontend/application-shell';
import {
  renderApp,
  renderAppWithRedux,
} from '@commercetools-frontend/application-shell/test-utils';
import ApplicationRoutes from '../routes';
import { entryPointUriPath } from '../constants';

const mergeWithDefaultOptions = (options = {}) => {
  return {
    ...options,
    environment: {
      ...(options.environment || {}),
      entryPointUriPath,
    },
    apolloClient: createApolloClient(),
  };
};

const renderApplication = (ui, options) =>
  renderApp(ui, mergeWithDefaultOptions(options));

const renderApplicationWithRedux = (ui, options) =>
  renderAppWithRedux(ui, mergeWithDefaultOptions(options));

const renderApplicationWithRoutes = (options) =>
  renderApplication(<ApplicationRoutes />, options);

const renderApplicationWithRoutesAndRedux = (options) =>
  renderApplicationWithRedux(<ApplicationRoutes />, options);

export {
  renderApplication,
  renderApplicationWithRedux,
  renderApplicationWithRoutes,
  renderApplicationWithRoutesAndRedux,
};
