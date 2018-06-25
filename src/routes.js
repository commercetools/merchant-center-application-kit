import React from 'react';
import PropTypes from 'prop-types';

const WelcomeRoutes = props => (
  <h1>{`Welcome to project: ${props.match.params.projectKey}`}</h1>
);
WelcomeRoutes.displayName = 'WelcomeRoutes';
WelcomeRoutes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WelcomeRoutes;
