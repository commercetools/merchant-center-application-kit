import React from 'react';
import PropTypes from 'prop-types';
import { withUser } from '../fetch-user';
import * as gtm from '../../utils/gtm';

/**
 * This component will let gtm know if any information about the user has
 * changed.
 */

export class GtmUserTracker extends React.PureComponent {
  static displayName = 'GtmUserTracker';
  static propTypes = {
    user: PropTypes.object,
  };
  componentDidMount() {
    // since the user and project could have been loaded from the apollo cache
    // they could be preset already when mounting
    if (this.props.user) this.syncUser();
  }
  componentDidUpdate() {
    if (this.props.user) this.syncUser();
  }
  syncUser = () => {
    gtm.updateUser(this.props.user);
  };
  render() {
    return null;
  }
}

export default withUser(userData => ({ user: userData.user }))(GtmUserTracker);
