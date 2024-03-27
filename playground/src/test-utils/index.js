import { createApolloClient } from '@commercetools-frontend/application-shell';
import { renderAppWithRedux } from '@commercetools-frontend/application-shell/test-utils';
import { entryPointUriPath } from '../constants';

const mergeWithDefaultOptions = (options = {}) => ({
  ...options,
  environment: {
    ...(options.environment || {}),
    entryPointUriPath,
  },
  apolloClient: createApolloClient(),
});

const renderApplicationWithRedux = (ui, options = {}) =>
  renderAppWithRedux(
    ui,
    mergeWithDefaultOptions({
      ...options,
      flags: {},
    })
  );

export { renderApplicationWithRedux };
