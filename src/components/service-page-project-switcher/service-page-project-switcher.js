import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ProjectSwitcher from '../project-switcher';
import FetchUser from '../fetch-user';
import styles from './service-page-project-switcher.mod.css';

export const ServicePageProjectSwitcher = props => (
  <div className={styles.container}>
    <FetchUser>
      {({ isLoading, user }) =>
        !isLoading && user && user.projects.total > 0 ? (
          <ProjectSwitcher
            // In this case it's not necessary to check if the `projectKey` param
            // is included in the list of projects. In such case
            // the dropdown will still be rendered but no project will be selected.
            // This is fine becase the user has still the possibility to "switch"
            // to a project.
            projectKey={props.match.params.projectKey}
            total={user.projects.total}
          />
        ) : null
      }
    </FetchUser>
  </div>
);
ServicePageProjectSwitcher.displayName = 'ServicePageProjectSwitcher';
ServicePageProjectSwitcher.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ServicePageProjectSwitcher);
