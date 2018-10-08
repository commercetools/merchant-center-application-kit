import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// NOTE: the setting somehow is missing, the data is corrupt?
// When we refactor settings, this should not be a concern anymore.
// At the moment, settings are created for projects when the projects
// are being fetched. If for some reason the project setting is not created
// then there is a problem.
// However, the backend should not need to do this anymore. This needs to be
// investigated further when we do the refactoring.
const ProjectWithoutSettings = props => (
  <div>
    {`Unexpected error. The project-setting is missing for project ${
      props.match.params.projectKey
    }. Please contact our support.`}
  </div>
);
ProjectWithoutSettings.displayName = 'ProjectWithoutSettings';
ProjectWithoutSettings.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ProjectWithoutSettings);
