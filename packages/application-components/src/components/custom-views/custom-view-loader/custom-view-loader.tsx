import { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  DOMAINS,
  NOTIFICATION_KINDS_PAGE,
} from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import CustomPanel from '../custom-panel/custom-panel';
import messages from './messages';

type TCustomViewIframeMessage = {
  source: string;
  destination: string;
  eventName: string;
  eventData: Record<string, unknown>;
};

/*
  TODO: These types are temporary until we have the proper
  ones generated from the Settings schema
*/
export type TPermissionGroup = {
  name: string;
  oAuthScopes: string[];
};

export type TCustomView = {
  id: string;
  defaultLabel: string;
  labelAllLocales: Record<string, string>;
  url: string;
  type: 'CustomPanel' | 'CustomTab';
  typeConfig?: {
    size?: 'SMALL' | 'LARGE';
  };
  locators: string[];
};

type TCustomViewLoaderProps = {
  customView: TCustomView;
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

const CustomPanelIframe = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

function CustomViewLoader(props: TCustomViewLoaderProps) {
  const iFrameElementRef = useRef<HTMLIFrameElement>(null);
  const appContext = useApplicationContext();
  const iFrameCommunicationChannel = useRef(new MessageChannel());
  const showNotification = useShowNotification();
  const intl = useIntl();
  const panelSize = (props.customView.typeConfig?.size?.toLocaleLowerCase() ||
    'large') as Lowercase<'SMALL' | 'LARGE'>;

  const messageFromIFrameHandler = useCallback((event: MessageEvent) => {
    if (event.data.origin === window.location.origin) {
      console.log('message received from iframe port: ', event);
    }
  }, []);

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

    // Listen for messages from the iFrame
    iFrameCommunicationChannel.current.port1.onmessage =
      messageFromIFrameHandler;

    // Transfer port2 to the iFrame so it can send messages back privately
    iFrameElementRef.current?.contentWindow?.postMessage(
      'mc_init',
      window.location.href,
      [iFrameCommunicationChannel.current.port2]
    );

    // Send the initialization message to the iFrame
    iFrameCommunicationChannel.current.port1.postMessage({
      source: 'mc-host-application',
      destination: `custom-view-${props.customView.id}`,
      eventName: 'hostAcknowledgesIframeLoaded',
      eventData: {
        context: {
          userLocale: appContext.user?.locale,
          dataLocale: appContext.dataLocale,
          projectKey: appContext.project?.key,
        },
      },
    } as TCustomViewIframeMessage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Currently we only support custom panels
  if (props.customView.type !== 'CustomPanel') {
    reportErrorToSentry(
      new Error(
        `CustomViewLoader: Provided Custom View has an unsupported type: ${props.customView.type}`
      )
    );
    return null;
  }

  return (
    <CustomPanel
      title={`Custom View: ${props.customView.defaultLabel}`}
      onClose={props.onClose}
      size={panelSize}
    >
      <CustomPanelIframe
        id={`custom-view-${props.customView.id}`}
        key={`custom-view-${props.customView.id}`}
        ref={iFrameElementRef}
        title={`Custom View: ${props.customView.defaultLabel}`}
        src={props.customView.url}
        onLoad={onLoadSuccessHandler}
      />
    </CustomPanel>
  );
}

export default CustomViewLoader;
