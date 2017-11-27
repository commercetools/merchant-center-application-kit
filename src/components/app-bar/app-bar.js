import React from 'react';
import PropTypes from 'prop-types';
import LogoSVG from '@commercetools-local/ui-kit/materials/images/logo.svg';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import UserSettingsMenu from '../user-settings-menu';
import ProjectSwitcher from '../project-switcher';
import FetchUser from '../fetch-user';
import styles from './app-bar.mod.css';

const AppBar = props => (
  <header className={styles['top-navigation']} data-test="top-navigation">
    <div className={styles.logo}>
      <img src={LogoSVG} className={styles['logo-img']} alt="Logo" />
    </div>

    <div id="loading-spinner" className={styles['loader-container']} />

    <div className={styles.navigation}>
      <Spacings.Inline scale="m" alignItems="center">
        <div className={styles.switchers}>
          {props.match.params.projectKey && (
            <Spacings.Inline alignItems="center">
              {/* This node is used by a react portal */}
              <div id="locale-switcher" />

              <FetchUser>
                {({ isLoading, user }) =>
                  isLoading ? null : (
                    <ProjectSwitcher
                      projectKey={props.match.params.projectKey}
                      availableProjects={user.availableProjects}
                    />
                  )
                }
              </FetchUser>
            </Spacings.Inline>
          )}
        </div>
        <div className={styles.spacer} />
        <Spacings.Inline alignItems="center">
          <UserSettingsMenu />
        </Spacings.Inline>
      </Spacings.Inline>
    </div>
  </header>
);

AppBar.displayName = 'AppBar';
AppBar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default AppBar;
