import React from 'react';
import PropTypes from 'prop-types';
import { DOMAINS } from '@commercetools-local/constants';
import { withUser } from '../fetch-user';
import * as intercom from '../../utils/intercom';
import { INTERCOM_TRACKING_STATUS } from '../../constants';

/**
 * Intercom should only be booted up once per page load.
 * We also may not boot Intercom for users that have decided to opt out of
 * Intercom. By default the `intercom_status` is PENDING and when the user
 * opts-out it gets set to INACTIVE.
 * Whenever the user opts-in to the `intercom_status` status gets set to ACTIVE
 * on the user and thus this component re-renders and will boot intercom.
 */

export class IntercomBooter extends React.Component {
  static displayName = 'IntercomBooter';
  static propTypes = {
    showNotification: PropTypes.func.isRequired,
    children: PropTypes.node,
    // Injected
    intercomTrackingStatus: PropTypes.oneOf(
      Object.values(INTERCOM_TRACKING_STATUS)
    ),
  };
  static defaultProps = {
    children: null,
  };
  hasBooted = false;
  isNotificationDispatched = false;
  componentDidMount() {
    // since the user and project could have been loaded from the apollo cache
    // they could be preset already when mounting
    this.bootIntercom(this.props.intercomTrackingStatus);
    this.showBanner(this.props.intercomTrackingStatus);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.isBooted) this.bootIntercom(nextProps.intercomTrackingStatus);
    if (!this.isNotificationDispatched)
      this.showBanner(nextProps.intercomTrackingStatus);
  }
  bootIntercom = intercomTrackingStatus => {
    if (intercomTrackingStatus === INTERCOM_TRACKING_STATUS.active) {
      this.hasBooted = true;
      intercom.boot(intercomTrackingStatus);
    }
  };
  showBanner = intercomTrackingStatus => {
    if (intercomTrackingStatus === INTERCOM_TRACKING_STATUS.pending) {
      this.isNotificationDispatched = true;
      this.props.showNotification({
        kind: 'intercom',
        domain: DOMAINS.GLOBAL,
      });
    }
  };
  render() {
    return this.props.children;
  }
}

export default withUser(userData => ({
  intercomTrackingStatus: userData.user && userData.tracking_intercom,
}))(IntercomBooter);
