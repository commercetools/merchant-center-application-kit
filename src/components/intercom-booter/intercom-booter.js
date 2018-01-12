import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as globalActions from '@commercetools-local/actions-global';
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
    user: PropTypes.object,
    children: PropTypes.node,
    // Injected
    showNotification: PropTypes.func.isRequired,
  };
  static defaultProps = {
    children: null,
  };
  hasBooted = false;
  isNotificationDispatched = false;
  componentDidMount() {
    // since the user and project could have been loaded from the apollo cache
    // they could be preset already when mounting
    this.bootIntercom(this.props.user);
    this.showBanner(this.props.user);
  }
  componentWillReceiveProps(nextProps) {
    this.bootIntercom(nextProps.user);
    this.showBanner(nextProps.user);
  }
  bootIntercom = user => {
    if (
      !this.isBooted &&
      user &&
      user.tracking_intercom === INTERCOM_TRACKING_STATUS.active
    ) {
      this.hasBooted = true;
      intercom.boot(user);
    }
  };
  showBanner = user => {
    if (
      !this.isNotificationDispatched &&
      user &&
      user.tracking_intercom === INTERCOM_TRACKING_STATUS.pending
    ) {
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

export default compose(
  withUser(),
  connect(null, { showNotification: globalActions.showNotification })
)(IntercomBooter);
