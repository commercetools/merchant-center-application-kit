import { createApolloClient } from '@commercetools-frontend/application-shell';
import {
  renderApp,
  renderAppWithRedux,
} from '@commercetools-frontend/application-shell/test-utils';
import ApplicationRoutes from '../routes';
import { entryPointUriPath } from '../constants';

const mergeWithDefaultOptions = (options = {}) => ({
  ...options,
  environment: {
    ...(options.environment || {}),
    entryPointUriPath,
  },
  apolloClient: createApolloClient(),
  disableApolloMocks: true,
  disableAutomaticEntryPointRoutes: false,
});

const renderApplication = (ui, options) =>
  renderApp(
    <ApplicationRoutes>{ui}</ApplicationRoutes>,
    mergeWithDefaultOptions(options)
  );

const renderApplicationWithRedux = (ui, options = {}) =>
  renderAppWithRedux(ui, mergeWithDefaultOptions(options));

export { renderApplication, renderApplicationWithRedux };
