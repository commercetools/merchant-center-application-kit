import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch } from 'recompose';
import { withProject } from '../fetch-project';
import { withUser } from '../fetch-user';
import * as intercom from '../../utils/intercom';

/**
 * This component will let intercom know if any information about the user has
 * changed. Also, it takes care of letting intercom know which organization the
 * project belongs to that the user is looking at. In case the user is on a
 * non-project specific route (like `/profile`) no organization information is
 * sent.
 */

export class IntercomUserTracker extends React.PureComponent {
  static displayName = 'IntercomUserTracker';
  static propTypes = {
    // Only used for the `withProject` HOC
    projectKey: PropTypes.string,
    // Injected
    user: PropTypes.object,
    organization: PropTypes.object,
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
    intercom.updateUser({
      ...this.props.user,
      ...(this.props.organization
        ? { organization: this.props.organization }
        : {}),
    });
  };
  render() {
    return null;
  }
}

export default compose(
  withUser(userData => ({ user: userData && userData.user })),
  branch(
    props => props.projectKey,
    withProject(
      props => props.projectKey,
      projectData => ({
        organization:
          projectData && projectData.project && projectData.project.owner,
      })
    )
  )
)(IntercomUserTracker);
