import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Spacings, Text, AngleLeftIcon } from '@commercetools-frontend/ui-kit';
import LogoSVG from '@commercetools-frontend/assets/images/logo.svg';
import { selectProjectKeyFromLocalStorage } from '../../utils';
import UserSettingsMenu from '../user-settings-menu';
import ProjectSwitcher from '../project-switcher';
import LoadingPlaceholder from '../loading-placeholder';
import { REQUESTS_IN_FLIGHT_LOADER_DOM_ID } from '../requests-in-flight-loader/constants';
import messages from './messages';
import styles from './app-bar.mod.css';

const AppBar = props => {
  const previouslyUsedProjectKey = selectProjectKeyFromLocalStorage();
  return (
    <div className={styles['app-bar']} data-test="top-navigation">
      <Spacings.Inline>
        <div className={styles.logo}>
          {!props.user ? (
            <img src={LogoSVG} className={styles['logo-img']} alt="Logo" />
          ) : (
            <Link
              to={`/${previouslyUsedProjectKey ||
                props.user.defaultProjectKey}`}
            >
              <img src={LogoSVG} className={styles['logo-img']} alt="Logo" />
            </Link>
          )}
        </div>

        <div
          id={REQUESTS_IN_FLIGHT_LOADER_DOM_ID}
          className={styles['loader-container']}
        />
      </Spacings.Inline>

      <div className={styles.navigation}>
        <Spacings.Inline scale="m" alignItems="center">
          <div className={styles.switchers}>
            <Spacings.Inline alignItems="center">
              {/* This node is used by a react portal */}
              <div id="locale-switcher" />
              {do {
                if (!props.user) {
                  <LoadingPlaceholder shape="rect" size="s" />;
                }
                // The `<ProjectSwitcher>` should be rendered only if the
                // user is fetched and the user has projects while the app runs in an project context.
                else if (
                  props.user.projects.total > 0 &&
                  props.projectKeyFromUrl
                )
                  <ProjectSwitcher
                    // In this case it's not necessary to check if the `projectKey` param
                    // is included in the list of projects. In such case
                    // the dropdown will still be rendered but no project will be selected.
                    // This is fine becase the user has still the possibility to "switch"
                    // to a project.
                    projectKey={
                      props.projectKeyFromUrl ||
                      previouslyUsedProjectKey ||
                      props.user.defaultProjectKey
                    }
                    total={props.user.projects.total}
                  />;
                else
                  <Text.Detail>
                    <Link
                      to={`/${previouslyUsedProjectKey ||
                        props.user.defaultProjectKey}`}
                    >
                      <Spacings.Inline
                        alignItems="center"
                        data-test="back-to-project"
                      >
                        <AngleLeftIcon theme="green" size="small" />
                        <FormattedMessage {...messages.backToProjectLink} />
                      </Spacings.Inline>
                    </Link>
                  </Text.Detail>;
              }}
            </Spacings.Inline>
          </div>
          <div className={styles.spacer} />
          {props.user ? (
            <UserSettingsMenu
              locale={props.user.language}
              firstName={props.user.firstName}
              lastName={props.user.lastName}
              gravatarHash={props.user.gravatarHash}
              email={props.user.email}
              environment={props.environment}
              DEV_ONLY__loadAppbarMenuConfig={
                props.DEV_ONLY__loadAppbarMenuConfig
              }
            />
          ) : (
            <LoadingPlaceholder shape="dot" size="l" />
          )}
        </Spacings.Inline>
      </div>
    </div>
  );
};
AppBar.displayName = 'AppBar';
AppBar.propTypes = {
  user: PropTypes.shape({
    language: PropTypes.string.isRequired,
    gravatarHash: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    projects: PropTypes.shape({
      total: PropTypes.number.isRequired,
    }).isRequired,
    defaultProjectKey: PropTypes.string.isRequired,
  }),
  projectKeyFromUrl: PropTypes.string,
  environment: PropTypes.shape({
    servedByProxy: PropTypes.bool.isRequired,
  }).isRequired,
  DEV_ONLY__loadAppbarMenuConfig: PropTypes.func,
};

export default AppBar;
