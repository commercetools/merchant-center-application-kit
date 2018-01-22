import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import LogoSVG from '@commercetools-local/ui-kit/materials/images/logo.svg';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import UserSettingsMenu from '../user-settings-menu';
import ProjectSwitcher from '../project-switcher';
import styles from './app-bar.mod.css';

const AppBar = props => (
  <div className={styles['app-bar']} data-test="top-navigation">
    <Spacings.Inline>
      <div className={styles.logo}>
        <img src={LogoSVG} className={styles['logo-img']} alt="Logo" />
      </div>

      <div
        id="loader-for-requests-in-flight"
        className={styles['loader-container']}
      />
    </Spacings.Inline>

    <div className={styles.navigation}>
      <Spacings.Inline scale="m" alignItems="center">
        <div className={styles.switchers}>
          <Route
            path="/:projectKey"
            render={routerProps => (
              <Spacings.Inline alignItems="center">
                {/* This node is used by a react portal */}
                <div id="locale-switcher" />

                {/* The `<ProjectSwitcher>` should be rendered only if the
                  user is fetched and the user has available projects. */}
                {!props.isLoading &&
                  props.user &&
                  props.user.availableProjects.length > 0 && (
                    <ProjectSwitcher
                      // In this case it's not necessary to check if the `projectKey` param
                      // is included in the list of available projects. In such case
                      // the dropdown will still be rendered but no project will be selected.
                      // This is fine becase the user has still the possibility to "switch"
                      // to a project.
                      projectKey={routerProps.match.params.projectKey}
                      availableProjects={props.user.availableProjects}
                    />
                  )}
              </Spacings.Inline>
            )}
          />
        </div>
        <div className={styles.spacer} />
        {!props.isLoading && (
          <UserSettingsMenu
            firstName={props.user.firstName}
            lastName={props.user.lastName}
            email={props.user.email}
          />
        )}
      </Spacings.Inline>
    </div>
  </div>
);
AppBar.displayName = 'AppBar';
AppBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    availableProjects: PropTypes.array.isRequired,
  }),
};

export default AppBar;
