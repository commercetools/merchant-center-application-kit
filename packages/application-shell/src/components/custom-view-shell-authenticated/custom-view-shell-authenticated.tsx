import { type ReactNode } from 'react';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import { entryPointUriPathToPermissionKeys } from '@commercetools-frontend/application-config/ssr';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import type {
  ApplicationWindow,
  CustomViewData,
} from '@commercetools-frontend/constants';
import {
  AsyncLocaleData,
  type TAsyncLocaleDataProps,
} from '@commercetools-frontend/i18n';
import { useIsAuthorized } from '@commercetools-frontend/permissions';
import { ThemeProvider } from '@commercetools-uikit/design-system';
import ApplicationLoader from '../application-loader';
import { getBrowserLocale } from '../application-shell-provider/utils';
import ConfigureIntlProvider from '../configure-intl-provider';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';

type TCustomViewWithPermissionCheckProps = {
  customViewId: string;
  children?: ReactNode;
};

const CustomViewWithPermissionCheck = (
  props: TCustomViewWithPermissionCheckProps
) => {
  const permissionKeys = entryPointUriPathToPermissionKeys(props.customViewId);

  // Require View permission to render the application.
  const canView = useIsAuthorized({
    demandedPermissions: [permissionKeys.View],
  });

  if (canView) {
    return <>{props.children}</>;
  }
  return <PageUnauthorized />;
};

type TCustomViewShellAuthenticatedProps = {
  dataLocale: string;
  environment: ApplicationWindow['app'];
  messages: TAsyncLocaleDataProps['applicationMessages'];
  projectKey?: string;
  customViewConfig: CustomViewData;
  children: ReactNode;
};

function CustomViewShellAuthenticated(
  props: TCustomViewShellAuthenticatedProps
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
                              <CustomViewWithPermissionCheck
                                customViewId={props.customViewConfig.id}
                              >
                                {props.children}
                              </CustomViewWithPermissionCheck>
                            </ApplicationContextProvider>
                          );
                        }}
                      </FetchProject>
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

export default CustomViewShellAuthenticated;
