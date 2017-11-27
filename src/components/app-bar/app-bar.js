import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import LogoSVG from '@commercetools-local/ui-kit/materials/images/logo.svg';
import Spacings from '@commercetools-local/ui-kit/materials/spacings';
import UserSettingsMenu from '../user-settings-menu';
import LocaleSwitcher from '../locale-switcher';
import ProjectSwitcher from '../project-switcher';
import FetchUser from '../fetch-user';
import FetchProject from '../fetch-project';
import WithProjectDataLocale from '../with-project-data-locale';
import styles from './app-bar.mod.css';

// The `<LocaleSwitcher>` should be rendered only if the user and the project
// are fetched, additionally if the project has more than one language.
const LocaleSwitcherForProject = props => (
  <FetchUser>
    {({ isLoading: isLoadingUser, user }) => {
      if (
        !isLoadingUser &&
        user &&
        user.availableProjects.length > 0 &&
        // We check that the `projectKey` from the router is actually included
        // in the list of available projects.
        Boolean(
          user.availableProjects.find(
            project => project.key === props.match.params.projectKey
          )
        )
      )
        return (
          <FetchProject projectKey={props.match.params.projectKey}>
            {({ isLoading: isLoadingProject, project }) =>
              // Render the `<LocaleSwitcher>` only if the project has more
              // than one language.
              !isLoadingProject && project && project.languages.length > 1 ? (
                <WithProjectDataLocale locales={project.languages}>
                  {({ locale, setProjectDataLocale }) => (
                    <LocaleSwitcher
                      projectDataLocale={locale}
                      setProjectDataLocale={setProjectDataLocale}
                      availableLocales={project.languages}
                    />
                  )}
                </WithProjectDataLocale>
              ) : null
            }
          </FetchProject>
        );
      return null;
    }}
  </FetchUser>
);
LocaleSwitcherForProject.displayName = 'LocaleSwitcherForProject';
LocaleSwitcherForProject.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

// The `<ProjectSwitcher>` should be rendered only if the user is fetched
// and the user has available projects.
const ProjectSwitcherForUser = props => (
  <FetchUser>
    {({ isLoading, user }) =>
      !isLoading && user && user.availableProjects.length > 0 ? (
        <ProjectSwitcher
          // In this case it's not necessary to check if the `projectKey` param
          // is included in the list of available projects. In such case
          // the dropdown will still be rendered but no project will be selected.
          // This is fine becase the user has still the possibility to "switch"
          // to a project.
          projectKey={props.match.params.projectKey}
          availableProjects={user.availableProjects}
        />
      ) : null
    }
  </FetchUser>
);
ProjectSwitcherForUser.displayName = 'ProjectSwitcherForUser';
ProjectSwitcherForUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectKey: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const AppBar = () => (
  <header className={styles['top-navigation']} data-test="top-navigation">
    <div className={styles.logo}>
      <img src={LogoSVG} className={styles['logo-img']} alt="Logo" />
    </div>

    <div id="loading-spinner" className={styles['loader-container']} />

    <div className={styles.navigation}>
      <Spacings.Inline scale="m" alignItems="center">
        <div className={styles.switchers}>
          <Spacings.Inline alignItems="center">
            <Route path="/:projectKey" component={LocaleSwitcherForProject} />
            <Route path="/:projectKey" component={ProjectSwitcherForUser} />
          </Spacings.Inline>
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

// For testing
export { LocaleSwitcherForProject, ProjectSwitcherForUser };
