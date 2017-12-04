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
import ProjectDataLocale from '../project-data-locale';
import styles from './app-bar.mod.css';

// The `<LocaleSwitcher>` should be rendered only if the user and the project
// are fetched, additionally if the project has more than one language.
const LocaleSwitcherForProject = props => {
  if (
    !props.isLoadingUser &&
    props.user &&
    props.user.availableProjects.length > 0 &&
    // We check that the `projectKey` from the router is actually included
    // in the list of available projects.
    Boolean(
      props.user.availableProjects.find(
        project => project.key === props.projectKey
      )
    )
  )
    return (
      <FetchProject projectKey={props.projectKey}>
        {({ isLoading: isLoadingProject, project }) =>
          // Render the `<LocaleSwitcher>` only if the project has more
          // than one language.
          !isLoadingProject && project && project.languages.length > 1 ? (
            <ProjectDataLocale locales={project.languages}>
              {({ locale, setProjectDataLocale }) => (
                <LocaleSwitcher
                  projectDataLocale={locale}
                  setProjectDataLocale={setProjectDataLocale}
                  availableLocales={project.languages}
                />
              )}
            </ProjectDataLocale>
          ) : null
        }
      </FetchProject>
    );
  return null;
};
LocaleSwitcherForProject.displayName = 'LocaleSwitcherForProject';
LocaleSwitcherForProject.propTypes = {
  projectKey: PropTypes.string.isRequired,
  isLoadingUser: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    availableProjects: PropTypes.arrayOf(
      PropTypes.shape({ key: PropTypes.string.isRequired })
    ).isRequired,
  }),
};

// The `<ProjectSwitcher>` should be rendered only if the user is fetched
// and the user has available projects.
const ProjectSwitcherForUser = props =>
  !props.isLoadingUser &&
  props.user &&
  props.user.availableProjects.length > 0 ? (
    <ProjectSwitcher
      // In this case it's not necessary to check if the `projectKey` param
      // is included in the list of available projects. In such case
      // the dropdown will still be rendered but no project will be selected.
      // This is fine becase the user has still the possibility to "switch"
      // to a project.
      projectKey={props.projectKey}
      availableProjects={props.user.availableProjects}
    />
  ) : null;
ProjectSwitcherForUser.displayName = 'ProjectSwitcherForUser';
ProjectSwitcherForUser.propTypes = {
  projectKey: PropTypes.string.isRequired,
  isLoadingUser: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    availableProjects: PropTypes.array.isRequired,
  }),
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
          <FetchUser>
            {({ isLoading, user }) => (
              <Route
                path="/:projectKey"
                render={routerProps => (
                  <Spacings.Inline alignItems="center">
                    <LocaleSwitcherForProject
                      projectKey={routerProps.match.params.projectKey}
                      isLoadingUser={isLoading}
                      user={user}
                    />
                    <ProjectSwitcherForUser
                      projectKey={routerProps.match.params.projectKey}
                      isLoadingUser={isLoading}
                      user={user}
                    />
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

// For testing
export { LocaleSwitcherForProject, ProjectSwitcherForUser };
