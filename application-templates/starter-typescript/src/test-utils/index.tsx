import type { ReactElement } from 'react';
import { createApolloClient } from '@commercetools-frontend/application-shell';
import {
  renderApp,
  renderAppWithRedux,
  type TRenderAppOptions,
  type TRenderAppWithReduxOptions,
} from '@commercetools-frontend/application-shell/test-utils';
import ApplicationRoutes from '../routes';
import { entryPointUriPath } from '../constants';

const mergeWithDefaultOptions = (
  options: Partial<TRenderAppOptions> | Partial<TRenderAppWithReduxOptions> = {}
): Partial<TRenderAppOptions> | Partial<TRenderAppWithReduxOptions> => ({
  ...options,
  environment: {
    ...(options.environment || {}),
    entryPointUriPath,
  },
  apolloClient: createApolloClient(),
});

const renderApplication = (
  ui: ReactElement,
  options: Partial<TRenderAppOptions>
) => renderApp(ui, mergeWithDefaultOptions(options));

const renderApplicationWithRedux = (
  ui: ReactElement,
  options: Partial<TRenderAppWithReduxOptions>
) => renderAppWithRedux(ui, mergeWithDefaultOptions(options));

const renderApplicationWithRoutes = (options: Partial<TRenderAppOptions>) =>
  renderApplication(<ApplicationRoutes />, options);

const renderApplicationWithRoutesAndRedux = (
  options: Partial<TRenderAppWithReduxOptions>
) => renderApplicationWithRedux(<ApplicationRoutes />, options);

export {
  renderApplication,
  renderApplicationWithRedux,
  renderApplicationWithRoutes,
  renderApplicationWithRoutesAndRedux,
};
