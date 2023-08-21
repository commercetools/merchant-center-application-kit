import { type ReactNode } from 'react';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { ApplicationWindow } from '@commercetools-frontend/constants';
import {
  AsyncLocaleData,
  type TAsyncLocaleDataProps,
} from '@commercetools-frontend/i18n';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import ApplicationLoader from '../application-loader';
import { getBrowserLocale } from '../application-shell-provider/utils';
import ConfigureIntlProvider from '../configure-intl-provider';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';

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
  const browserLocale = getBrowserLocale(window);

  return (
    <FetchUser>
      {({ isLoading, error: fetchUserError, user }) => {
        if (isLoading) {
          return <ApplicationLoader />;
        }

        return (
          <AsyncLocaleData
            locale={user?.language || browserLocale}
            applicationMessages={props.messages}
          >
            {({ isLoading: isLoadingLocaleData, locale, messages }) => {
              return (
                <ConfigureIntlProvider
                  // We do not want to pass the language as long as the locale data
                  // is not loaded.
                  {...(isLoadingLocaleData ? {} : { locale, messages })}
                >
                  <ApplicationContextProvider
                    user={user}
                    environment={props.environment}
                  >
                    <>
                      <ThemeProvider theme="default" />
                      {!props.projectKey && props.children}

                      {Boolean(props.projectKey) && (
                        <FetchProject projectKey={props.projectKey}>
                          {({ isLoading: isProjectLoading, project }) => {
                            if (fetchUserError) {
                              return <PageUnauthorized />;
                            }

                            if (isProjectLoading) {
                              return <ApplicationLoader />;
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
