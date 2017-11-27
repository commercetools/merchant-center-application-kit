import React from 'react';
import PropTypes from 'prop-types';
import FetchProject from '../fetch-project';

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
      <FetchProject projectKey={this.props.match.params.projectKey}>
        {(/* { loading, project } */) => (
          <div>
            {/* <Menu /> */}
            {/* <Content /> */}
            {'TODO: this is the project content'}
          </div>
        )}
      </FetchProject>
    );
  }
}
