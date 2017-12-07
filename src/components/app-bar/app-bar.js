import React from 'react';
import { Route } from 'react-router-dom';
import LogoSVG from '@commercetools-local/ui-kit/materials/images/logo.svg';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import UserSettingsMenu from '../user-settings-menu';
import ProjectSwitcher from '../project-switcher';
import FetchUser from '../fetch-user';
import styles from './app-bar.mod.css';

const AppBar = () => (
  <header className={styles['top-navigation']} data-test="top-navigation">
    <div className={styles.logo}>
      <img src={LogoSVG} className={styles['logo-img']} alt="Logo" />
    </div>

    <div
      id="loader-for-requests-in-flight"
      className={styles['loader-container']}
    />

    <div className={styles.navigation}>
      <Spacings.Inline scale="m" alignItems="center">
        <div className={styles.switchers}>
          <FetchUser>
            {({ isLoading, user }) => (
              <Route
                path="/:projectKey"
                render={routerProps => (
                  <Spacings.Inline alignItems="center">
                    {/* This node is used by a react portal */}
                    <div id="locale-switcher" />

                    {/* The `<ProjectSwitcher>` should be rendered only if the
                      user is fetched and the user has available projects. */}
                    {!isLoading &&
                      user &&
                      user.availableProjects.length > 0 && (
                        <ProjectSwitcher
                          // In this case it's not necessary to check if the `projectKey` param
                          // is included in the list of available projects. In such case
                          // the dropdown will still be rendered but no project will be selected.
                          // This is fine becase the user has still the possibility to "switch"
                          // to a project.
                          projectKey={routerProps.match.params.projectKey}
                          availableProjects={user.availableProjects}
                        />
                      )}
                  </Spacings.Inline>
                )}
              />
            )}
          </FetchUser>
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

export default AppBar;
