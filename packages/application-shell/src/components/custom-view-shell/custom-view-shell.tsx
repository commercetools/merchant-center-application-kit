import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
  StrictMode,
  type ReactNode,
  RefObject,
  useMemo,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { Route } from 'react-router-dom';
import {
  ModalPageTopBar,
  PageUnauthorized,
  PortalsContainer,
  themesOverrides,
} from '@commercetools-frontend/application-components';
import { CustomViewContextProvider } from '@commercetools-frontend/application-shell-connectors';
import {
  type ApplicationWindow,
  CUSTOM_EXTENSION_TYPES,
  CUSTOM_VIEWS_EVENTS_NAMES,
  CUSTOM_VIEWS_EVENTS_META,
  CustomViewData,
  DOMAINS,
} from '@commercetools-frontend/constants';
import {
  AsyncLocaleData,
  type TAsyncLocaleDataProps,
} from '@commercetools-frontend/i18n';
import { NotificationsList } from '@commercetools-frontend/react-notifications';
import {
  ThemeProvider,
  designTokens,
} from '@commercetools-uikit/design-system';
import ApplicationLoader from '../application-loader/application-loader';
import GlobalStyles from '../application-shell/global-styles';
import ApplicationShellProvider from '../application-shell-provider';
import { getBrowserLocale } from '../application-shell-provider/utils';
import ConfigureIntlProvider from '../configure-intl-provider';
import CustomViewDevHost from '../custom-view-dev-host';
import CustomViewShellAuthenticated from '../custom-view-shell-authenticated';
import { customViewsThemesOverrides } from './custom-view-shell.styles';

declare let window: ApplicationWindow;

type THostContext = {
  hostUrl: string;
  dataLocale: string;
  customViewConfig: CustomViewData;
  projectKey?: string;
};

type THostEventData = {
  source: string;
  destination: string;
  eventName: string;
  eventData: {
    context: THostContext;
  };
};

type TCustomViewShellProps = {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  disableDevHost?: boolean;
  enableReactStrictMode?: boolean;
  children: ReactNode;
};

const browserLocale = getBrowserLocale(window);

type TStrictModeEnablementProps = {
  enableReactStrictMode?: boolean;
  children?: ReactNode;
};

type TNotificationsContainerProps = {
  notificationsGlobalRef: RefObject<HTMLDivElement>;
  notificationsPageRef: RefObject<HTMLDivElement>;
};
function NotificationsContainer(props: TNotificationsContainerProps) {
  return (
    <>
      <div
        ref={props.notificationsGlobalRef}
        role="region"
        aria-live="polite"
        style={{
          gridRow: 1,
          gridColumn: '1/3',
        }}
      >
        <div id="above-top-navigation" />
        <NotificationsList domain={DOMAINS.GLOBAL} />
      </div>
      <div ref={props.notificationsPageRef}>
        <NotificationsList domain={DOMAINS.PAGE} />
      </div>
      <NotificationsList domain={DOMAINS.SIDE} />
    </>
  );
}

const ContentWrapper = styled.div`
  height: 100%;
  padding: ${designTokens.spacing40} 40px;
`;

function StrictModeEnablement(props: TStrictModeEnablementProps) {
  if (props.enableReactStrictMode) {
    return <StrictMode>{props.children}</StrictMode>;
  } else {
    return <>{props.children}</>;
  }
}

/*
  During e2e tests, the Custom View template is built in production mode but still runs on localhost.
  Checking for local production mode is necessary for applying the development host URL,
  creating an environment for testing interaction with the Custom View template.
*/
const isLocalProdMode =
  process.env.NODE_ENV === 'production' && window.app.env === 'development';

function CustomViewShell(props: TCustomViewShellProps) {
  const [hostContext, setHostContext] = useState<THostContext>();
  const iFrameCommunicationPort = useRef<MessagePort>();
  const notificationsGlobalRef = useRef<HTMLDivElement>(null);
  const notificationsPageRef = useRef<HTMLDivElement>(null);
  const layoutRefs = useRef<{
    notificationsGlobalRef: RefObject<HTMLDivElement>;
    notificationsPageRef: RefObject<HTMLDivElement>;
  }>({
    notificationsGlobalRef,
    notificationsPageRef,
  });
  const themeOverrides = useMemo(
    () => ({
      ...themesOverrides.default,
      ...customViewsThemesOverrides.default,
    }),
    []
  );

  const hostMessageHandler = useCallback(
    (event: MessageEvent<THostEventData>) => {
      if (
        event.data.eventName ===
        CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_INITIALIZATION
      ) {
        setHostContext(event.data.eventData.context);
      } else {
        console.warn(
          `CustomViewShell: Unknown received event with name: ${event.data.eventName}`,
          { event }
        );
      }
    },
    []
  );

  const handleClose = useCallback(() => {
    iFrameCommunicationPort.current?.postMessage({
      origin: window.location.origin,
      source: `${CUSTOM_VIEWS_EVENTS_META.CUSTOM_VIEW_KEY_PREFIX}${hostContext?.customViewConfig.id}`,
      destination: CUSTOM_VIEWS_EVENTS_META.HOST_APPLICATION_CODE,
      eventName: CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_CLOSE,
      eventData: {},
    });
  }, [hostContext?.customViewConfig.id]);

  useEffect(() => {
    const bootstrapMessageHandler = (event: MessageEvent) => {
      if (
        (event.origin === window.location.origin ||
          // event.origin is not defined in test environment
          process.env.NODE_ENV === 'test') &&
        event.data === CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_BOOTSTRAP
      ) {
        iFrameCommunicationPort.current = event.ports[0];
        iFrameCommunicationPort.current.onmessage = hostMessageHandler;
        // Once bootstraped, we don't want to listen for global messages anymore.
        // We will only listen to messages coming through the MessageChannel port.
        window.removeEventListener('message', bootstrapMessageHandler);
      } else {
        console.warn(
          'CustomViewShell: Received an event that is not allowed.',
          { event }
        );
      }
    };

    window.addEventListener('message', bootstrapMessageHandler);
    return () => {
      window.removeEventListener('message', bootstrapMessageHandler);
    };
  }, [hostMessageHandler]);

  useEffect(() => {
    // Close the channel when the component unmounts
    return () => {
      iFrameCommunicationPort.current?.close();
      iFrameCommunicationPort.current = undefined;
    };
  }, []);

  if (!hostContext) {
    return <ApplicationLoader showLogo />;
  }

  const hostUrl =
    process.env.NODE_ENV === 'development' || isLocalProdMode
      ? window.app.__DEVELOPMENT__?.customViewHostUrl!
      : hostContext.hostUrl;

  return (
    <div
      css={css`
        height: 100%;
      `}
      data-extension-type={CUSTOM_EXTENSION_TYPES.CUSTOM_VIEW}
    >
      <GlobalStyles />
      <ThemeProvider theme="default" themeOverrides={themeOverrides} />
      <ApplicationShellProvider
        environment={window.app}
        applicationMessages={props.applicationMessages}
        apolloClient={props.apolloClient}
      >
        {({ isAuthenticated }) => {
          if (isAuthenticated) {
            return (
              <CustomViewContextProvider
                hostUrl={hostUrl}
                customViewConfig={hostContext.customViewConfig}
              >
                <CustomViewShellAuthenticated
                  dataLocale={hostContext.dataLocale}
                  environment={window.app}
                  messages={props.applicationMessages}
                  projectKey={hostContext.projectKey}
                  customViewConfig={hostContext.customViewConfig}
                >
                  <PortalsContainer
                    // @ts-ignore
                    ref={layoutRefs}
                  />
                  <NotificationsContainer
                    notificationsGlobalRef={notificationsGlobalRef}
                    notificationsPageRef={notificationsPageRef}
                  />

                  <Route
                    path={`/custom-views/${hostContext.customViewConfig.id}/projects/${hostContext.projectKey}`}
                  >
                    <ModalPageTopBar onClose={handleClose} hidePathLabel />
                    <ContentWrapper>{props.children}</ContentWrapper>
                  </Route>
                </CustomViewShellAuthenticated>
              </CustomViewContextProvider>
            );
          }

          return (
            <AsyncLocaleData
              locale={browserLocale}
              applicationMessages={props.applicationMessages}
            >
              {({ locale, messages }) => (
                <ConfigureIntlProvider locale={locale} messages={messages}>
                  <PageUnauthorized />
                </ConfigureIntlProvider>
              )}
            </AsyncLocaleData>
          );
        }}
      </ApplicationShellProvider>
    </div>
  );
}

const CustomViewShellWrapper = (props: TCustomViewShellProps) => {
  if (
    (process.env.NODE_ENV === 'development' || isLocalProdMode) &&
    !props.disableDevHost
  ) {
    return (
      <StrictModeEnablement enableReactStrictMode={props.enableReactStrictMode}>
        <Suspense fallback={<ApplicationLoader />}>
          <CustomViewDevHost applicationMessages={props.applicationMessages}>
            <CustomViewShell applicationMessages={props.applicationMessages}>
              {props.children}
            </CustomViewShell>
          </CustomViewDevHost>
        </Suspense>
      </StrictModeEnablement>
    );
  }
  return (
    <StrictModeEnablement enableReactStrictMode={props.enableReactStrictMode}>
      <CustomViewShell applicationMessages={props.applicationMessages}>
        {props.children}
      </CustomViewShell>
    </StrictModeEnablement>
  );
};

export default CustomViewShellWrapper;
