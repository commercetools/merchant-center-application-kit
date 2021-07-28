import { useEffect } from 'react';
import * as gtm from '../../utils/gtm';

type Props = {
  applicationName: string;
  projectKey?: string;
  userBusinessRole?: string;
};

const GtmApplicationTracker = (props: Props) => {
  useEffect(() => {
    gtm.trackApplicationName(props.applicationName);
    gtm.trackProjectKey(props.projectKey);
    gtm.trackUserBusinessRole(props.userBusinessRole);
  }, [props.applicationName, props.projectKey, props.userBusinessRole]);
  return null;
};
GtmApplicationTracker.displayName = 'GtmApplicationTracker';

export default GtmApplicationTracker;
