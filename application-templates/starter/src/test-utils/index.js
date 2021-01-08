import React from 'react';
import {
  renderApp,
  renderAppWithRedux,
} from '@commercetools-frontend/application-shell/test-utils';
import ApplicationRoutes from '../routes';

const entryPointUriPath = 'examples-starter';

const mergeWithDefaultOptions = (options = {}) => ({
  ...options,
  environment: {
    ...(options.environment || {}),
    entryPointUriPath,
  },
  disableAutomaticEntryPointRoutes: false,
});

const renderApplication = (ui, options) =>
  renderApp(
    <ApplicationRoutes>{ui}</ApplicationRoutes>,
    mergeWithDefaultOptions(options)
  );

const renderApplicationWithRedux = (ui, options = {}) =>
  renderAppWithRedux(
    <ApplicationRoutes>{ui}</ApplicationRoutes>,
    mergeWithDefaultOptions(options)
  );

export { renderApplication, renderApplicationWithRedux };
