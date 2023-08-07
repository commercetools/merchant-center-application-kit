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

declare let window: ApplicationWindow;

type THostContext = {
  hostUrl: string;
  userLocale: string;
  dataLocale: string;
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

// We only want to listen for events coming from the same origin (parent window)
const isEventAllowed = (
  event: MessageEvent<THostEventData>,
  customViewId: string
) =>
  event.origin === window.location.origin &&
  event.data.source === 'mc-host-application' &&
  event.data.destination === `custom-view-${customViewId}`;

function CustomViewShell(props: TCustomViewShellProps) {
  const [hostContext, setHostContext] = useState<THostContext>();
  const iFrameCommunicationPort = useRef<MessagePort>();

  const hostMessageHandler = useCallback(
    (event: MessageEvent<THostEventData>) => {
      if (
        isEventAllowed(event, props.customViewId) &&
        event.data.eventName === 'custom-view-initialization'
      ) {
        setHostContext(event.data.eventData.context);
      }
    },
    [props.customViewId]
  );

  useEffect(() => {
    const initializationMessageHandler = (event: MessageEvent) => {
      console.log('Custom view shell received message', { event });

      if (
        event.origin === window.location.origin &&
        event.data === 'custom-view-bootstrap'
      ) {
        iFrameCommunicationPort.current = event.ports[0];
        iFrameCommunicationPort.current.onmessage = hostMessageHandler;
        // Once initialized, we don't want to listen for global messages anymore.
        // We will only listen to messages coming through the MessageChannel port.
        window.removeEventListener('message', initializationMessageHandler);
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
          <CustomViewAuthenticatedShell
            dataLocale={hostContext.dataLocale}
            environment={window.app}
            messages={props.messages}
            projectKey={hostContext.projectKey}
          >
            {props.children}
          </CustomViewAuthenticatedShell>;
        }

        // TODO: Render a proper error view
        return <h2>Not authenticated</h2>;
      }}
    </ApplicationShellProvider>
  );
}

export default CustomViewShell;
