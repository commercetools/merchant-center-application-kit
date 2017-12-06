import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import omit from 'lodash.omit';
import LoadingSpinner from '@commercetools-local/core/components/loading-spinner';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import Menu from '../menu';
import ProjectNotFound from '../project-not-found';
import ProjectExpired from '../project-expired';
import ProjectSuspended from '../project-suspended';
import ProjectWithoutSettings from '../project-without-settings';

class ProjectContainer extends React.PureComponent {
  static displayName = 'ProjectContainer';
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectKey: PropTypes.string,
      }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
    children: PropTypes.element.isRequired,
  };
  state = {
    hasError: false,
  };
  componentDidCatch(/* error, info */) {
    this.setState({ hasError: true });
    // NOTE: track the error
  }
  render() {
    if (this.state.hasError) {
      // NOTE: implement proper error view
      return (
        <div style={{ backgroundColor: 'red', color: 'white' }}>
          <h2 style={{ color: 'white' }}>
            {'Uh-oh, something went wrong in this main area.'}
          </h2>
          <p>
            {
              'You can still click around, navigate to another view or reload the page. If the error persists please contact our support.'
            }
          </p>
        </div>
      );
    }
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
                  <div style={{ display: 'inline-flex' }}>
                    <Menu
                      location={this.props.location}
                      menuItems={this.props.menuItems}
                      projectKey={this.props.match.params.projectKey}
                      projectPermissions={omit(project.permissions, [
                        '__typename',
                      ])}
                    />
                    {/* <Content /> */}
                    {'TODO: this is the project content'}
                    {this.props.children}
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

export default ProjectContainer;
