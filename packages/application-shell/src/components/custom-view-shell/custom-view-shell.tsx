import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { PageUnauthorized } from '@commercetools-frontend/application-components';
import {
  type ApplicationWindow,
  CUSTOM_VIEWS_EVENTS_NAMES,
} from '@commercetools-frontend/constants';
import {
  AsyncLocaleData,
  type TAsyncLocaleDataProps,
} from '@commercetools-frontend/i18n';
import type { TCustomView } from '../../types/generated/settings';
import ApplicationLoader from '../application-loader/application-loader';
import ApplicationShellProvider from '../application-shell-provider';
import { getBrowserLocale } from '../application-shell-provider/utils';
import ConfigureIntlProvider from '../configure-intl-provider';
import { CustomViewContextProvider } from '../custom-view-context';
import CustomViewShellAuthenticated from '../custom-view-shell-authenticated';

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

<<<<<<< HEAD
const browserLocale = getBrowserLocale(window);

||||||| parent of 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
// We only want to listen for events coming from the same origin (parent window)
const isEventAllowed = (
  event: MessageEvent<THostEventData>,
  customViewId: string
) =>
  event.origin === window.location.origin &&
  event.data.source === 'mc-host-application' &&
  event.data.destination === `custom-view-${customViewId}`;

=======
>>>>>>> 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
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
<<<<<<< HEAD
      } else {
        console.warn(
          `CustomViewShell: Unknown received event with name: ${event.data.eventName}`,
          { event }
        );
||||||| parent of 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
=======
      } else {
        console.warn(
          `CustomViewShell: Unknown received event with name: ${event.data.eventName}`,
          { event }
        );
>>>>>>> 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
      }
    },
    []
  );

  useEffect(() => {
    const bootstrapMessageHandler = (event: MessageEvent) => {
      if (
        event.origin === window.location.origin &&
        event.data === CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_BOOTSTRAP
      ) {
        iFrameCommunicationPort.current = event.ports[0];
        iFrameCommunicationPort.current.onmessage = hostMessageHandler;
        // Once bootstraped, we don't want to listen for global messages anymore.
        // We will only listen to messages coming through the MessageChannel port.
<<<<<<< HEAD
        window.removeEventListener('message', bootstrapMessageHandler);
      } else {
        console.warn(
          'CustomViewShell: Received an event that is not allowed.',
          { event }
        );
||||||| parent of 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
        window.removeEventListener('message', initializationMessageHandler);
=======
        window.removeEventListener('message', initializationMessageHandler);
      } else {
        console.warn(
          `CustomViewShell: Received an event that is not allowed: ${event.data}`,
          { event }
        );
>>>>>>> 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
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
<<<<<<< HEAD
          return (
            <CustomViewContextProvider config={hostContext.customViewConfig}>
              <CustomViewShellAuthenticated
                dataLocale={hostContext.dataLocale}
                environment={window.app}
                messages={props.messages}
                projectKey={hostContext.projectKey}
              >
                {props.children}
              </CustomViewShellAuthenticated>
            </CustomViewContextProvider>
          );
||||||| parent of 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
          <CustomViewAuthenticatedShell
            dataLocale={hostContext.dataLocale}
            environment={window.app}
            messages={props.messages}
            projectKey={hostContext.projectKey}
          >
            {props.children}
          </CustomViewAuthenticatedShell>;
=======
          return (
            <CustomViewAuthenticatedShell
              dataLocale={hostContext.dataLocale}
              environment={window.app}
              messages={props.messages}
              projectKey={hostContext.projectKey}
            >
              <CustomViewContextProvider
                customViewConfig={hostContext.customViewConfig}
                hostUrl={hostContext.hostUrl}
              >
                {props.children}
              </CustomViewContextProvider>
            </CustomViewAuthenticatedShell>
          );
>>>>>>> 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
        }

<<<<<<< HEAD
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
||||||| parent of 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
        // TODO: Render a proper error view
        return <h2>Not authenticated</h2>;
=======
        // TODO: Render a proper error view
        return <h2>User not authenticated</h2>;
>>>>>>> 2f4cd301f (refactor(application-shell): refactor custom view shell to use the new specialized context)
      }}
    </ApplicationShellProvider>
  );
}

export default CustomViewShell;
