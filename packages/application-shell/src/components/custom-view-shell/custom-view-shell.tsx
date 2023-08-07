import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import ApplicationShellProvider from '../application-shell-provider';
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
    const initializationMessageHandler = (event: MessageEvent) => {
      console.log('Custom view shell received message', { event });

      if (
        event.origin === window.location.origin &&
        event.data === CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_BOOTSTRAP
      ) {
        iFrameCommunicationPort.current = event.ports[0];
        iFrameCommunicationPort.current.onmessage = hostMessageHandler;
        // Once initialized, we don't want to listen for global messages anymore.
        // We will only listen to messages coming through the MessageChannel port.
        window.removeEventListener('message', initializationMessageHandler);
      } else {
        console.warn(
          `CustomViewShell: Received an event that is not allowed: ${event.data}`,
          { event }
        );
      }
    };

    window.addEventListener('message', initializationMessageHandler);
    return () => {
      window.removeEventListener('message', initializationMessageHandler);
    };
  }, [hostMessageHandler]);

  // TODO: Render a proper loading indicator
  if (!hostContext) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
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

        // TODO: Render a proper error view
        return <h2>User not authenticated</h2>;
      }}
    </ApplicationShellProvider>
  );
}

export default CustomViewShell;
