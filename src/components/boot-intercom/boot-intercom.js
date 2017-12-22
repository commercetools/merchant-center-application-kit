import React from 'react';
import PropTypes from 'prop-types';
import { withUser } from '../fetch-user';
import * as intercom from '../../utils/intercom';
import { INTERCOM_TRACKING_STATUS } from '../../constants';

/**
 * Intercom should only be booted up once per page load.
 * We also may not boot Intercom for users that have decided to opt out of
 * Intercom. By default the `intercom_status` is PENDING and when the yser
 * opts-out it gets set to INACTIVE.
 * Whenever the user opts-in to the `intercom_status` status gets set to ACTIVE
 * on the user and thus this component rerenders and will boot intercom.
 */

export class BootIntercom extends React.Component {
  static displayName = 'BootIntercom';
  static propTypes = {
    userData: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      user: PropTypes.object,
    }),
  };
  hasBooted = false;
  componentDidMount() {
    // since the user and project could have been loaded from the apollo cache
    // they could be preset already when mounting
    this.bootIntercom(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.bootIntercom(nextProps);
  }
  bootIntercom = props => {
    if (
      !this.hasBooted &&
      !props.userData.isLoading &&
      props.userData.user.tracking_intercom === INTERCOM_TRACKING_STATUS.active
    ) {
      intercom.boot(props.userData.user);
      this.hasBooted = true;
    }
  };
  render() {
    return null;
  }
}

export default withUser(userData => ({
  userData: {
    isLoading: userData.isLoading,
    user: userData.user,
  },
}))(BootIntercom);
