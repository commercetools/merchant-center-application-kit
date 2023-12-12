import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Suspense,
  StrictMode,
  type ReactNode,
} from 'react';
import { ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import { CustomViewContextProvider } from '@commercetools-frontend/application-shell-connectors';
import {
  type ApplicationWindow,
  CUSTOM_VIEWS_EVENTS_NAMES,
  CustomViewData,
} from '@commercetools-frontend/constants';
import {
  AsyncLocaleData,
  type TAsyncLocaleDataProps,
} from '@commercetools-frontend/i18n';
import ApplicationLoader from '../application-loader/application-loader';
import ApplicationShellProvider from '../application-shell-provider';
import { getBrowserLocale } from '../application-shell-provider/utils';
import ConfigureIntlProvider from '../configure-intl-provider';
import CustomViewDevHost from '../custom-view-dev-host';
import CustomViewShellAuthenticated from '../custom-view-shell-authenticated';

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

function StrictModeEnablement(props: TStrictModeEnablementProps) {
  if (props.enableReactStrictMode) {
    return <StrictMode>{props.children}</StrictMode>;
  } else {
    return <>{props.children}</>;
  }
}

function CustomViewShell(props: TCustomViewShellProps) {
  const [hostContext, setHostContext] = useState<THostContext>();
  const iFrameCommunicationPort = useRef<MessagePort>();

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
    process.env.NODE_ENV === 'development'
      ? window.app.__DEVELOPMENT__?.customViewHostUrl!
      : hostContext.hostUrl;

  return (
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
                {props.children}
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
  );
}

const CustomViewShellWrapper = (props: TCustomViewShellProps) => {
  if (process.env.NODE_ENV === 'development' && !props.disableDevHost) {
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
