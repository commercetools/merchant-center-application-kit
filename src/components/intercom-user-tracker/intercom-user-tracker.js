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

export class IntercomUserTracker extends React.Component {
  static displayName = 'IntercomUserTracker';
  static propTypes = {
    projectKey: PropTypes.string,
    userData: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      user: PropTypes.object,
    }),
    projectData: PropTypes.shape({
      isLoading: PropTypes.bool.isRequired,
      project: PropTypes.object,
    }),
  };
  shouldComponentUpdate(nextProps) {
    return (
      (this.props.projectKey &&
        nextProps.projectKey &&
        nextProps.projectData.project !== this.props.projectData.project) ||
      nextProps.userData.user !== this.props.userData.user
    );
  }
  componentDidMount() {
    // since the user and project could have been loaded from the apollo cache
    // they could be preset already when mounting
    this.updateUser(this.props);
  }
  componentWillUpdate(nextProps) {
    // call in componentWillUpdate rather than in componentWillReceiveProps
    // because willUpdate will only run if shouldComponentUpdate returned true
    // componentWillReceiveProps will always run
    this.updateUser(nextProps);
  }
  updateUser = props => {
    if (!props.userData.isLoading) {
      if (props.projectKey && !props.projectData.isLoading) {
        intercom.updateUser({
          ...props.userData.user,
          organization: props.projectData.project.owner,
        });
      } else {
        intercom.updateUser(props.userData.user);
      }
    }
  };
  render() {
    return null;
  }
}

export default compose(
  withUser(userData => ({
    userData: {
      isLoading: userData.isLoading,
      user: userData.user,
    },
  })),
  branch(
    props => props.projectKey,
    withProject(
      props => props.projectKey,
      projectData => ({
        projectData: {
          isLoading: projectData.isLoading,
          project: projectData.project,
        },
      })
    )
  )
)(IntercomUserTracker);
