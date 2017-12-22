import React from 'react';
import PropTypes from 'prop-types';
import { withUser } from '../fetch-user';
import * as intercom from '../../utils/intercom';

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
    if (!props.userData.isLoading && !this.hasBooted) {
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
