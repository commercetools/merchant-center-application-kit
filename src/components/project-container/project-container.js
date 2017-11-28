import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import LoadingSpinner from '@commercetools-local/core/components/loading-spinner';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import ProjectNotFound from '../project-not-found';
import ProjectExpired from '../project-expired';
import ProjectSuspended from '../project-suspended';
import ProjectWithoutSettings from '../project-without-settings';

export default class ProjectContainer extends React.PureComponent {
  static displayName = 'ProjectContainer';

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectKey: PropTypes.string,
      }).isRequired,
    }).isRequired,
  };

  render() {
    return (
      <FetchUser>
        {({ isLoading: isLoadingUser, user }) => {
          // TODO: do something if there is an `error`?
          if (isLoadingUser) return <LoadingSpinner />;
          if (user && user.availableProjects.length === 0)
            return <Redirect to="/logout?reason=no-projects" />;

          return (
            <FetchProject projectKey={this.props.match.params.projectKey}>
              {({ isLoading: isLoadingProject, project }) => {
                // TODO: do something if there is an `error`?
                if (isLoadingProject) return <LoadingSpinner />;
                if (!project) return <ProjectNotFound />;
                if (project.suspended) return <ProjectSuspended />;
                if (project.expired) return <ProjectExpired />;
                if (!project.settings) return <ProjectWithoutSettings />;
                return (
                  <div>
                    {/* <Menu /> */}
                    {/* <Content /> */}
                    {'TODO: this is the project content'}
                  </div>
                );
              }}
            </FetchProject>
          );
        }}
      </FetchUser>
    );
  }
}
