import { useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import CustomPanel from '../custom-panel/custom-panel';

/*
  TODO: This types are temporary until we have the proper
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
  type: 'custom-panel' | 'custom-tab';
  typeConfig?: {
    size?: 'small' | 'large';
  };
  locators: string[];
};

type TCustomViewLoaderProps = {
  customView: TCustomView;
  onClose: () => void;
};

const CustomPanelIframe = styled.iframe`
  height: 100%;
  width: 100%;
  border: none;
`;

function CustomViewLoader(props: TCustomViewLoaderProps) {
  const iFrameElement = useRef<HTMLIFrameElement>(null);
  const appContext = useApplicationContext();
  const intercomChannel = useRef(new MessageChannel());

  const onLoadSuccessHandler = useCallback(() => {
    // TODO: Process messages from the right source
    const messageFromIFrameHandler = (event: MessageEvent) => {
      if (!event.data.source || !event.data.source.includes('react-devtools')) {
        console.log('message received from iframe: ', event);
      }
    };

    // Listen for messages from the iFrame
    intercomChannel.current.port1.onmessage = messageFromIFrameHandler;

    // Transfer port2 to the iFrame so it can send messages back privately
    // TODO: Check the right value for the second parameter
    iFrameElement.current?.contentWindow?.postMessage('mc_init', '*', [
      intercomChannel.current.port2,
    ]);

    // Send the initialization message to the iFrame
    intercomChannel.current.port1.postMessage({
      source: 'host-application-name',
      destination: `inapp-extension-${props.customView.id}`,
      eventName: 'hostAcknowledgesIframeLoaded',
      eventData: {
        appContext,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const messageFromIFrameHandler = (event: MessageEvent) => {
      // TODO: Filter messages from the right source
      if (!event.data.source || !event.data.source.includes('react-devtools')) {
        console.log('message received from iframe: ', event);
      }
    };
    // Start listening for messages from the iFrame
    window.addEventListener('message', messageFromIFrameHandler);
    return () => {
      window.removeEventListener('message', messageFromIFrameHandler);
    };
  }, []);

  const onLoadErrorHandler = useCallback((error: unknown) => {
    // TODO: Proper error handling
    console.error('Error loading in-app extension: ', error);
  }, []);

  // Currently we only support custom panels
  if (props.customView.type !== 'custom-panel') {
    // TODO: Proper error handling
    console.error(
      `CustomViewLoader: Provided Custom View has an unsupprted type: ${props.customView.type}`
    );
    return null;
  }

  return (
    <CustomPanel
      title={`Custom View: ${props.customView.defaultLabel}`}
      onClose={props.onClose}
      size={props.customView.typeConfig?.size || 'large'}
    >
      <CustomPanelIframe
        id={`custom-view-${props.customView.id}`}
        ref={iFrameElement}
        title={`Custom View: ${props.customView.defaultLabel}`}
        src={props.customView.url}
        onLoad={onLoadSuccessHandler}
        onError={onLoadErrorHandler}
      />
    </CustomPanel>
  );
}

export default CustomViewLoader;
