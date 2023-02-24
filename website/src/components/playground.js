import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';

const getIframeUrl = (urlPath, isFullScreen = false) => {
  const fullScreenPath = isFullScreen ? '/fullscreen' : '';
  if (process.env.NODE_ENV === 'production') {
    return withPrefix(`/playground/${urlPath}${fullScreenPath}`);
  }
  return `http://localhost:8001/${urlPath}${fullScreenPath}`;
};

const PlaygroundController = (props) => {
  const [iframeHeight, setIframeHeight] = useState(0);
  useEffect(() => {
    const onReceiveMessage = (event) => {
      console.log('Received event message', event);
      if (Array.isArray(event.data)) {
        const [eventSource, value] = event.data;
        switch (eventSource) {
          case 'playground-height':
            setIframeHeight(value);
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener('message', onReceiveMessage);
    return () => {
      window.removeEventListener('message', onReceiveMessage);
    };
  }, [setIframeHeight]);
  return (
    <iframe
      src={getIframeUrl(props.urlPath)}
      height={`${iframeHeight}px`}
      width="100%"
    />
  );
};
PlaygroundController.propTypes = {
  urlPath: PropTypes.string.isRequired,
};

export default PlaygroundController;
