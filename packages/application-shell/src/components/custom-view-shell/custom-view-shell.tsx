import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import {
  AsyncLocaleData,
  type TAsyncLocaleDataProps,
} from '@commercetools-frontend/i18n';
import ApplicationLoader from '../application-loader/application-loader';
import ApplicationShellProvider from '../application-shell-provider';
import { getBrowserLocale } from '../application-shell-provider/utils';
import ConfigureIntlProvider from '../configure-intl-provider';
import CustomViewAuthenticatedShell from '../custom-view-authenticated-shell';
import { CustomViewContextProvider, TCustomView } from '../custom-view-context';
import { CUSTOM_VIEWS_EVENTS_NAMES } from './constants';

declare let window: ApplicationWindow;

type THostContext = {
  hostUrl: string;
  userLocale: string;
  dataLocale: string;
  customViewConfig: TCustomView;
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
  customViewId: string;
  messages: TAsyncLocaleDataProps['applicationMessages'];
  children: ReactNode;
};

const browserLocale = getBrowserLocale(window);

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
          `CustomViewShell: Unkown received event with name: ${event.data.eventName}`,
          { event }
        );
      }
    },
    []
  );

  useEffect(() => {
    const bootstrapMessageHandler = (event: MessageEvent) => {
      console.log('Custom view shell received message', { event });

      if (
        event.origin === window.location.origin &&
        event.data === CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_BOOTSTRAP
      ) {
        iFrameCommunicationPort.current = event.ports[0];
        iFrameCommunicationPort.current.onmessage = hostMessageHandler;
        // Once bootstraped, we don't want to listen for global messages anymore.
        // We will only listen to messages coming through the MessageChannel port.
        window.removeEventListener('message', bootstrapMessageHandler);
      } else {
        console.warn(
          `CustomViewShell: Received an event that is not allowed: ${event.data}`,
          { event }
        );
      }
    };

    window.addEventListener('message', bootstrapMessageHandler);
    return () => {
      window.removeEventListener('message', bootstrapMessageHandler);
    };
  }, [hostMessageHandler]);

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
            <CustomViewContextProvider config={hostContext.customViewConfig}>
              <CustomViewAuthenticatedShell
                dataLocale={hostContext.dataLocale}
                environment={window.app}
                messages={props.messages}
                projectKey={hostContext.projectKey}
              >
                {props.children}
              </CustomViewAuthenticatedShell>
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
