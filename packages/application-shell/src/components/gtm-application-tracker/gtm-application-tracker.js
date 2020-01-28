import React from 'react';
import PropTypes from 'prop-types';
import * as gtm from '../../utils/gtm';

const GtmApplicationTracker = props => {
  React.useEffect(() => {
    gtm.trackApplicationName(props.applicationName);
    gtm.trackProjectKey(props.projectKey);
  }, [props.applicationName, props.projectKey]);
  return null;
};
GtmApplicationTracker.displayName = 'GtmApplicationTracker';
GtmApplicationTracker.propTypes = {
  applicationName: PropTypes.string.isRequired,
  projectKey: PropTypes.string,
};

export default GtmApplicationTracker;
