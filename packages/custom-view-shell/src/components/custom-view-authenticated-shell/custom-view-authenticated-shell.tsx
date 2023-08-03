import { type ReactNode } from 'react';
import {
  ApplicationLoader,
  ConfigureIntlProvider,
  FetchProject,
  FetchUser,
  SetupFlopFlipProvider,
} from '@commercetools-frontend/application-shell';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { ApplicationWindow } from '@commercetools-frontend/constants';
import {
  AsyncLocaleData,
  type TAsyncLocaleDataProps,
} from '@commercetools-frontend/i18n';
import { ThemeProvider } from '@commercetools-uikit/design-system';

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
        if (isLoading) return <ApplicationLoader />;

        // TODO: Render a proper error view
        if (error) return <div>Error: {error.message}</div>;

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
                              if (isProjectLoading)
                                return <ApplicationLoader />;
                              // TODO: Proper herror handling
                              if (projectLoadingError)
                                return (
                                  <div>
                                    Error: {projectLoadingError.message}
                                  </div>
                                );
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
