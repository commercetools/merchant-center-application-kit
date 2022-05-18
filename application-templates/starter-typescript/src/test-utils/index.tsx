import type { ReactNode } from 'react';
import { createApolloClient } from '@commercetools-frontend/application-shell';
import {
  renderApp,
  renderAppWithRedux,
  type TRenderAppOptions,
  type TRenderAppWithReduxOptions,
  // type TRenderAppResult,
  // type TRenderAppWithReduxResult,
} from '@commercetools-frontend/application-shell/test-utils';
import ApplicationRoutes from '../routes';
import { entryPointUriPath } from '../constants';

export type TRenderAppPartialOptions = Partial<TRenderAppOptions>;
export type TRenderAppWithReduxPartialOptions =
  Partial<TRenderAppWithReduxOptions>;

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

export const renderApplication = (
  ui: ReactNode,
  options: Partial<TRenderAppOptions>
) =>
  renderApp(
    <ApplicationRoutes>{ui}</ApplicationRoutes>,
    mergeWithDefaultOptions(options)
  );

export const renderApplicationWithRedux = (
  ui: ReactNode,
  options: Partial<TRenderAppWithReduxOptions> = {}
) =>
  renderAppWithRedux(
    <ApplicationRoutes>{ui}</ApplicationRoutes>,
    mergeWithDefaultOptions(options)
  );
