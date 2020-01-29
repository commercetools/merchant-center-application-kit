import React from 'react';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import ApplicationLoader from '../application-loader';
import ErrorApologizer from '../error-apologizer';

type Props = {
  error?: Error;
  pastDelay: boolean;
};

const AsyncChunkLoader = (props: Props) => {
  React.useEffect(() => {
    if (props.error) {
      reportErrorToSentry(props.error, {});
    }
  }, [props.error]);
  if (props.error) {
    return <ErrorApologizer />;
  }
  // To avoid "Flashing of loading component"
  // https://github.com/jamiebuilds/react-loadable#avoiding-flash-of-loading-component
  if (props.pastDelay) {
    return <ApplicationLoader />;
  }
  return null;
};
AsyncChunkLoader.displayName = 'AsyncChunkLoader';

export default AsyncChunkLoader;
