import { useCallback, useEffect, useRef } from 'react';
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

function CustomViewLoader(props: TCustomViewLoaderProps) {
  const iFrameElementRef = useRef<HTMLIFrameElement>(null);
  const dataLocale = useApplicationContext((context) => context.dataLocale);
  const projectKey = useApplicationContext((context) => context.project?.key);
  const featureFlags = useAllFeatureToggles();
  const iFrameCommunicationChannel = useRef(new MessageChannel());
  const showNotification = useShowNotification();
  const intl = useIntl();
  const hasSentInitializationMessages = useRef(false);

  const sendInitializationMessages = useCallback(() => {
    // If we have already sent the initialization messages, do not send them again.
    // The message can be sent either as a response to the CUSTOM_VIEW_READY message
    // or as a result of a setTimeout after 500ms. In any case, this message should be sent only once.
    if (hasSentInitializationMessages.current) {
      return;
    }

    // Transfer port2 to the iFrame so it can send messages back privately
    iFrameElementRef.current?.contentWindow?.postMessage(
      CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_BOOTSTRAP,
      window.location.href,
      [iFrameCommunicationChannel.current.port2]
    );

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

    hasSentInitializationMessages.current = true;
  }, [dataLocale, featureFlags, props.customView, props.hostUrl, projectKey]);

  const messageFromIFrameHandler = useCallback(
    (event: MessageEvent) => {
      if (event.data.origin === window.location.origin) {
        switch (event.data.eventName) {
          case CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_CLOSE:
            props.onClose();
            break;
          // This message will only be sent by custom view shell older than v24.x
          // For backwards compatibility we will send the initialization messages
          // after 500ms if this message was not received by then.
          case CUSTOM_VIEWS_EVENTS_NAMES.CUSTOM_VIEW_READY: {
            sendInitializationMessages();
          }
        }
      }
    },
    [props, sendInitializationMessages]
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

    // This is for backwards compatibility with custom view shell older than v24.0.0
    // where the custom-view-shell does not send the CUSTOM_VIEW_READY message yet.
    setTimeout(() => {
      sendInitializationMessages();
    }, 500);

    // We want the effect to run only once so we don't need the dependencies array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Close the channel when the component unmounts
    const communicationChannel = iFrameCommunicationChannel.current;

    // Listen for messages from the iFrame
    iFrameCommunicationChannel.current!.port1.onmessage =
      messageFromIFrameHandler;
    window.addEventListener('message', messageFromIFrameHandler);

    return () => {
      window.removeEventListener('message', messageFromIFrameHandler);
      communicationChannel?.port1.close();
    };
  }, []);

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
