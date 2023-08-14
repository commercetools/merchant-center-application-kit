import { type ReactNode } from 'react';
import {
  PageNotFound,
  PageUnauthorized,
} from '@commercetools-frontend/application-components';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { ApplicationWindow } from '@commercetools-frontend/constants';
import {
  AsyncLocaleData,
  type TAsyncLocaleDataProps,
} from '@commercetools-frontend/i18n';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import ApplicationLoader from '../application-loader';
import ConfigureIntlProvider from '../configure-intl-provider';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import SetupFlopFlipProvider from '../setup-flop-flip-provider';

type TCustomViewAuthenticatedShellProps = {
  dataLocale: string;
  environment: ApplicationWindow['app'];
  messages: TAsyncLocaleDataProps['applicationMessages'];
  projectKey?: string;
  children: ReactNode;
};

function CustomViewAuthenticatedShell(
  props: TCustomViewAuthenticatedShellProps
) {
  return (
    <FetchUser>
      {({ isLoading, error, user }) => {
        if (isLoading) {
          return <ApplicationLoader />;
        }

        if (error) {
          return <PageUnauthorized />;
        }

        return (
          <AsyncLocaleData
            locale={user!.language}
            applicationMessages={props.messages}
          >
            {({ messages: loadedMessages }) => {
              return (
                <ConfigureIntlProvider
                  locale={user!.language}
                  messages={loadedMessages}
                >
                  <ApplicationContextProvider
                    user={user}
                    environment={props.environment}
                  >
                    <SetupFlopFlipProvider
                      user={user}
                      projectKey={props.projectKey}
                      ldClientSideId={props.environment.ldClientSideId}
                      // flags={props.featureFlags}
                      // defaultFlags={props.defaultFeatureFlags}
                    >
                      <>
                        <ThemeProvider theme="default" />
                        {!props.projectKey && props.children}

                        {Boolean(props.projectKey) && (
                          <FetchProject projectKey={props.projectKey}>
                            {({
                              isLoading: isProjectLoading,
                              error: projectLoadingError,
                              project,
                            }) => {
                              if (isProjectLoading) {
                                return <ApplicationLoader />;
                              }
                              if (projectLoadingError) {
                                return <PageNotFound />;
                              }
                              return (
                                <ApplicationContextProvider
                                  user={user}
                                  project={project}
                                  projectDataLocale={props.dataLocale}
                                  environment={props.environment}
                                >
                                  {props.children}
                                </ApplicationContextProvider>
                              );
                            }}
                          </FetchProject>
                        )}
                      </>
                    </SetupFlopFlipProvider>
                  </ApplicationContextProvider>
                </ConfigureIntlProvider>
              );
            }}
          </AsyncLocaleData>
        );
      }}
    </FetchUser>
  );
}

export default CustomViewAuthenticatedShell;
