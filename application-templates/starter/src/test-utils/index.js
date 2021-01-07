import React from 'react';
import {
  renderApp,
  renderAppWithRedux,
} from '@commercetools-frontend/application-shell/test-utils';
import { AsyncApplicationRoutes } from '../components/entry-point';

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
    <AsyncApplicationRoutes>{ui}</AsyncApplicationRoutes>,
    mergeWithDefaultOptions(options)
  );

const renderApplicationWithRedux = (ui, options = {}) =>
  renderAppWithRedux(
    <AsyncApplicationRoutes>{ui}</AsyncApplicationRoutes>,
    mergeWithDefaultOptions(options)
  );

export { renderApplication, renderApplicationWithRedux };
