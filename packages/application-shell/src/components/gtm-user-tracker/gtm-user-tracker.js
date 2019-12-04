import React from 'react';
import PropTypes from 'prop-types';
import * as gtm from '../../utils/gtm';

/**
 * This component will let gtm know if any information about the user has
 * changed.
 */

const GtmUserTracker = props => {
  React.useEffect(() => {
    gtm.updateUser(props.user);
  }, [props.user]);
  return null;
};
GtmUserTracker.displayName = 'GtmUserTracker';
GtmUserTracker.propTypes = {
  user: PropTypes.shape({ id: PropTypes.string.isRequired }),
};

export default GtmUserTracker;
