import React from 'react';
import * as gtm from '../../utils/gtm';

type Props = {
  applicationName?: string;
  projectKey?: string;
};

const GtmApplicationTracker = (props: Props) => {
  React.useEffect(() => {
    gtm.trackApplicationName(props.applicationName);
    gtm.trackProjectKey(props.projectKey);
  }, [props.applicationName, props.projectKey]);
  return null;
};
GtmApplicationTracker.displayName = 'GtmApplicationTracker';

export default GtmApplicationTracker;
