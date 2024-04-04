import {
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  StrictMode,
} from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import type { TFlags } from '@flopflip/types';
import { Switch } from 'react-router-dom';
import type { Dispatch } from 'redux';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import internalReduxStore from '../../configure-store';
import version from '../../version';
import ApplicationShellAuthenticated from '../application-shell-authenticated/application-shell-authenticated';
import ApplicationShellProvider from '../application-shell-provider';
import RedirectToLogin from '../redirect-to-login';
import RedirectToLogout from '../redirect-to-logout';
import SuspendedRoute from '../suspended-route';
import GlobalStyles from './global-styles';

type TApplicationShellProps = {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  /**
   * NOTE: the environment value passed here is usually `window.app`.
   * This object usually contains values as string and will be "transformed"
   * to a real object with proper scalar values in the ApplicationShell.
   * To keep the types simple, we assign here the already coerced type object.
   * This should be fine, as consumers of the application can use the
   * `ApplicationWindow` type from the `@commercetools-frontend/constants` package
   * to type cast it:
   *
   * ```tsx
   * import { ApplicationWindow } from '@commercetools-frontend/constants';
   *
   * declare let window: ApplicationWindow;
   *
   * <ApplicationShell environment={window.app} />
   * ```
   */
  environment: TApplicationContext<{}>['environment'];
  featureFlags?: TFlags;
  defaultFeatureFlags?: TFlags;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  onRegisterErrorListeners?: (args: { dispatch: Dispatch }) => void;
  onMenuItemClick?: (event: SyntheticEvent<HTMLAnchorElement>) => void;
  disableRoutePermissionCheck?: boolean;
  enableReactStrictMode?: boolean;
  render?: () => JSX.Element;
  children?: ReactNode;
};

type TStrictModeEnablementProps = {
  enableReactStrictMode?: boolean;
  children?: ReactNode;
};

const StrictModeEnablement = (props: TStrictModeEnablementProps) => {
  if (props.enableReactStrictMode) {
    return <StrictMode>{props.children}</StrictMode>;
  } else {
    return <>{props.children}</>;
  }
};

const ApplicationShell = (props: TApplicationShellProps) => {
  useEffect(() => {
    props.onRegisterErrorListeners?.({
      dispatch: internalReduxStore.dispatch,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- run only once, when component mounts

  return (
    <StrictModeEnablement enableReactStrictMode={props.enableReactStrictMode}>
      <GlobalStyles />
      <ApplicationShellProvider
        apolloClient={props.apolloClient}
        environment={props.environment}
        applicationMessages={props.applicationMessages}
      >
        {({ isAuthenticated }) => {
          if (isAuthenticated) {
            return (
              <Switch>
                <SuspendedRoute path="/logout">
                  <RedirectToLogout />
                </SuspendedRoute>
                <SuspendedRoute>
                  <ApplicationShellAuthenticated
                    defaultFeatureFlags={props.defaultFeatureFlags}
                    featureFlags={props.featureFlags}
                    render={props.render}
                    applicationMessages={props.applicationMessages}
                    onMenuItemClick={props.onMenuItemClick}
                    disableRoutePermissionCheck={
                      props.disableRoutePermissionCheck
                    }
                  >
                    {props.children}
                  </ApplicationShellAuthenticated>
                </SuspendedRoute>
              </Switch>
            );
          }
          return <RedirectToLogin />;
        }}
      </ApplicationShellProvider>
    </StrictModeEnablement>
  );
};
ApplicationShell.displayName = 'ApplicationShell';
ApplicationShell.version = version;

export default ApplicationShell;
