import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
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
  customViewId?: string;
  customViewHostUrl?: string;
  messages: TAsyncLocaleDataProps['applicationMessages'];
  children: ReactNode;
};

const browserLocale = getBrowserLocale(window);

function CustomViewShell(props: TCustomViewShellProps) {
  const [hostContext, setHostContext] = useState<THostContext>();
  const iFrameCommunicationPort = useRef<MessagePort>();
  const hostUrl = hostContext?.hostUrl || props.customViewHostUrl || '';

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

  return (
    <ApplicationShellProvider
      environment={window.app}
      applicationMessages={props.messages}
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
                messages={props.messages}
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
            applicationMessages={props.messages}
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

export default CustomViewShell;
