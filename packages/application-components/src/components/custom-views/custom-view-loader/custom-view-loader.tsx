import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useAllFeatureToggles } from '@flopflip/react-broadcast';
import { useIntl } from 'react-intl';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  CUSTOM_VIEWS_EVENTS_NAMES,
  CUSTOM_VIEWS_EVENTS_META,
  DOMAINS,
  NOTIFICATION_KINDS_PAGE,
  CustomViewData,
} from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import ModalPage from '../../modal-pages/internals/modal-page';
import messages from './messages';

type TCustomViewIframeMessage = {
  source: string;
  destination: string;
  eventName: string;
  eventData: Record<string, unknown>;
};

type TCustomViewLoaderProps = {
  customView: CustomViewData;
  hostUrl?: string;
  onClose: () => void;
};

const isIframeReady = (iFrameElementRef: HTMLIFrameElement) => {
  try {
    return iFrameElementRef?.contentWindow?.document.readyState === 'complete';
  } catch {
    // Trying to access the contentWindow of a cross-origin iFrame will throw an error.
    // We are not supposed to even get here because the iFrame must use
    // a URL from our very same domain (the custom view is proxied through our http-proxy service).
    return false;
  }
};

const ContentWrapper = styled.div`
  height: 100%;
`;

const CustomPanelIframe = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

function useIFrameInitializationEffect({
  iFrameRef,
  onInitialized,
  maxAttempts = 10,
  pollInterval = 500,
}: {
  iFrameRef: React.RefObject<HTMLIFrameElement | null>;
  onInitialized: () => void;
  maxAttempts?: number;
  pollInterval?: number;
}) {
  const [shouldStartPolling, setShouldStartPolling] = useState(false);
  const attemptsRef = useRef(0);

  const startPolling = useCallback(() => {
    setShouldStartPolling(true);
  }, []);

  const stopPolling = useCallback(() => {
    setShouldStartPolling(false);
  }, []);

  useEffect(() => {
    if (!shouldStartPolling) return;

    attemptsRef.current = 0;
    let timeoutId: NodeJS.Timeout;

    const pollForAppLoader = () => {
      const iFrameDocument = iFrameRef.current?.contentWindow?.document;
      const appLoaderElement = iFrameDocument?.getElementById('app-loader');

      attemptsRef.current++;

      if (attemptsRef.current > maxAttempts) {
        console.log(
          '[CustomViewLoader] max polling attempts reached. Failed to initialize iFrame.'
        );
        stopPolling();
        return;
      }

      if (!appLoaderElement) {
        console.log(
          '[CustomViewLoader] no app-loader yet, not sending initialization messages.'
        );

        return;
      }

      if (appLoaderElement) {
        console.log(
          '[CustomViewLoader] app-loader found, sending initialization messages.'
        );
        onInitialized();
        stopPolling();
        return;
      }

      timeoutId = setTimeout(pollForAppLoader, pollInterval);
    };

    pollForAppLoader();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    shouldStartPolling,
    iFrameRef,
    onInitialized,
    stopPolling,
    maxAttempts,
    pollInterval,
  ]);

  return { startPolling, stopPolling };
}

function CustomViewLoader(props: TCustomViewLoaderProps) {
  console.log('[CustomViewLoader] CustomViewLoader render');
  const iFrameElementRef = useRef<HTMLIFrameElement>(null);
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const projectKey = useApplicationContext((context) => context.project?.key);
  const featureFlags = useAllFeatureToggles();
  const iFrameCommunicationChannel = useRef(new MessageChannel());
  const showNotification = useShowNotification();
  const intl = useIntl();

  const sendInitializationMessages = useCallback(() => {
    // Transfer port2 to the iFrame so it can send messages back privately
    iFrameElementRef.current?.contentWindow?.postMessage(
      CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_BOOTSTRAP,
      window.location.href,
      [iFrameCommunicationChannel.current.port2]
    );
    console.log('[CustomViewLoader] sent bootstrap message to iFrame');

    // Send the initialization message to the iFrame
    iFrameCommunicationChannel.current.port1.postMessage({
      source: CUSTOM_VIEWS_EVENTS_META.HOST_APPLICATION_CODE,
      destination: `${CUSTOM_VIEWS_EVENTS_META.CUSTOM_VIEW_KEY_PREFIX}${props.customView.id}`,
      eventName: CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_INITIALIZATION,
      eventData: {
        context: {
          dataLocale,
          projectKey,
          featureFlags,
          customViewConfig: props.customView,
          hostUrl: props.hostUrl || window.location.href,
        },
      },
    } as TCustomViewIframeMessage);
    console.log('[CustomViewLoader] sent initialization message to iFrame');
  }, [dataLocale, featureFlags, props.customView, props.hostUrl, projectKey]);

  // Use the custom hook for iframe initialization polling
  const {
    startPolling: startPollingForIFrameInitialization,
    stopPolling: stopPollingForIFrameInitialization,
  } = useIFrameInitializationEffect({
    iFrameRef: iFrameElementRef,
    onInitialized: sendInitializationMessages,
  });

  const messageFromIFrameHandler = useCallback(
    (event: MessageEvent) => {
      if (event.data.origin === window.location.origin) {
        switch (event.data.eventName) {
          case CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_CLOSE:
            props.onClose();
            break;
        }
      }
    },
    [props]
  );

  // onLoad handler is called from the iFrame even where the URL is not valid
  // (blocked by CORS, 404, etc.) so we need to make sure the iFrame is ready
  const onLoadSuccessHandler = useCallback(() => {
    // Show error and block if the iFrame is not ready
    // (error loading it)
    if (!isIframeReady(iFrameElementRef.current!)) {
      showNotification({
        domain: DOMAINS.PAGE,
        kind: NOTIFICATION_KINDS_PAGE.error,
        text: intl.formatMessage(messages.loadError),
      });
      return;
    }
    console.log('[CustomViewLoader] iFrame is ready');

    // Listen for messages from the iFrame
    iFrameCommunicationChannel.current.port1.onmessage =
      messageFromIFrameHandler;

    startPollingForIFrameInitialization();

    // We want the effect to run only once so we don't need the dependencies array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Close the channel when the component unmounts
    const communicationChannel = iFrameCommunicationChannel.current;
    return () => {
      stopPollingForIFrameInitialization();
      communicationChannel?.port1.close();
    };
  }, [stopPollingForIFrameInitialization]);

  // Currently we only support custom panels
  if (props.customView.type !== 'CustomPanel') {
    reportErrorToSentry(
      new Error(
        `CustomViewLoader: Provided Custom View has an unsupported type: ${props.customView.type}. Supported types: ['CustomPanel'].`
      )
    );
    return null;
  }
  const panelSize = (props.customView.typeSettings?.size?.toLocaleLowerCase() ||
    'large') as Lowercase<'SMALL' | 'LARGE'>;
  const iFrameUrl = [
    window.location.origin,
    'custom-views',
    props.customView.id,
    'projects',
    projectKey,
  ].join('/');

  return (
    <ModalPage
      isOpen
      onClose={props.onClose}
      size={panelSize === 'small' ? 10 : 30}
      title={`Custom View: ${props.customView.defaultLabel}`}
      hideTopBar
    >
      <ContentWrapper>
        <CustomPanelIframe
          id={`custom-view-${props.customView.id}`}
          key={`custom-view-${props.customView.id}`}
          title={`Custom View: ${props.customView.defaultLabel}`}
          ref={iFrameElementRef}
          src={iFrameUrl}
          onLoad={onLoadSuccessHandler}
        />
      </ContentWrapper>
    </ModalPage>
  );
}

export default CustomViewLoader;
