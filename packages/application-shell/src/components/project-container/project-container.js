import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import isNil from 'lodash/isNil';
import { DOMAINS } from '@commercetools-frontend/constants';
import * as storage from '@commercetools-frontend/storage';
import { Notifier } from '@commercetools-frontend/react-notifications';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { STORAGE_KEYS, SUSPENSION_REASONS } from '../../constants';
import ApplicationLoader from '../application-loader';
import LocaleSwitcher from '../locale-switcher';
import ProjectDataLocale from '../project-data-locale';
import FetchProject from '../fetch-project';
import ProjectNotFound from '../project-not-found';
import ProjectExpired from '../project-expired';
import ProjectSuspended from '../project-suspended';
import ErrorApologizer from '../error-apologizer';
import messages from './messages';

// A trial expire notification should be displayed from 2 weeks before the project expires
const minDaysToDisplayNotification = 14;
const maxDaysToDisplayNotification = 0;
const shouldShowNotificationForTrialExpired = daysLeft =>
  !isNil(daysLeft) &&
  daysLeft <= minDaysToDisplayNotification &&
  daysLeft >= maxDaysToDisplayNotification;

export class ProjectContainer extends React.Component {
  static displayName = 'ProjectContainer';
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectKey: PropTypes.string,
      }).isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
      projects: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }).isRequired,
    }),
    environment: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };
  state = {
    hasError: false,
    localeSwitcherNode: null,
  };
  componentDidMount() {
    /**
     * NOTE: in order to render a component into a portal, the portal
     * DOM node needs to exists in the DOM.
     * If we try to get the DOM node by id before the components are
     * actually mounted, we won't find the DOM node, hence we can't render
     * the portal.
     * To work around this issue, we simply wait that the component is
     * mounted, then we render the portal.
     *
     * From the reactjs docs: https://reactjs.org/docs/portals.html
     * "
     *   If a child component requires to be attached to the DOM tree
     *   immediately when mounted, for example to measure a
     *   DOM node, or uses 'autoFocus' in a descendant, add
     *   state to Modal and only render the children when Modal
     *   is inserted in the DOM tree.
     * "
     */
    this.setState({
      localeSwitcherNode: document.getElementById('locale-switcher'),
    });
  }

  componentDidUpdate(prevProps) {
    this.setState(prevState =>
      prevProps.location.pathname !== this.props.location.pathname &&
      prevState.hasError
        ? { hasError: false }
        : null
    );

    // Ensure to sync the `projectKey` from the URL with localStorage.
    const projectKey = this.props.match.params.projectKey;
    storage.put(STORAGE_KEYS.ACTIVE_PROJECT_KEY, projectKey);
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // Note: In development mode componentDidCatch is not based on try-catch
    // to catch exceptions. Thus exceptions caught here will also be caught in
    // the global `error` event listener (setup-global-error-listener.js).
    // see: https://github.com/facebook/react/issues/10474
    reportErrorToSentry(error, { extra: errorInfo });
  }
  // Makes it easier to test
  renderSwitcher = switcherProps => (
    <LocaleSwitcher
      // Be explicit on listing the props so that we can better assert it.
      projectDataLocale={switcherProps.projectDataLocale}
      setProjectDataLocale={switcherProps.setProjectDataLocale}
      availableLocales={switcherProps.availableLocales}
    />
  );

  render() {
    if (this.state.hasError) {
      return <ErrorApologizer />;
    }
    // TODO: do something if there is an `error`?
    if (this.props.user && this.props.user.projects.total === 0)
      return <Redirect to="/logout?reason=no-projects" />;

    return (
      <React.Suspense fallback={<ApplicationLoader />}>
        <FetchProject projectKey={this.props.match.params.projectKey}>
          {({ isLoading: isProjectLoading, project }) => {
            // TODO: do something if there is an `error`?
            if (isProjectLoading) return <ApplicationLoader />;
            if (!project) return <ProjectNotFound />;
            if (project.suspension && project.suspension.isActive)
              return (
                <ProjectSuspended
                  isTemporary={
                    project.suspension.reason ===
                    SUSPENSION_REASONS.TEMPORARY_MAINTENANCE
                  }
                />
              );
            if (project.expiry && project.expiry.isActive)
              return <ProjectExpired />;

            return (
              <ProjectDataLocale locales={project.languages}>
                {({ locale, setProjectDataLocale }) => (
                  <ApplicationContextProvider
                    user={this.props.user}
                    project={project}
                    projectDataLocale={locale}
                    environment={this.props.environment}
                  >
                    <React.Fragment>
                      {shouldShowNotificationForTrialExpired(
                        project.expiry.daysLeft
                      ) && (
                        <Notifier
                          kind="warning"
                          domain={DOMAINS.GLOBAL}
                          text={this.props.intl.formatMessage(
                            messages.trialDaysLeft,
                            { daysLeft: project.expiry.daysLeft }
                          )}
                        />
                      )}
                      {/* Render <LocaleSwitcher> using a portal */}
                      {this.state.localeSwitcherNode &&
                        // Render the `<LocaleSwitcher>` only if the project has more
                        // than one language.
                        project.languages.length > 1 &&
                        ReactDOM.createPortal(
                          this.renderSwitcher({
                            projectDataLocale: locale,
                            setProjectDataLocale,
                            availableLocales: project.languages,
                          }),
                          this.state.localeSwitcherNode
                        )}
                      {/**
                       * NOTE: we don't need to explicitly pass the `locale`,
                       * it's enough to trigger a re-render.
                       * The `locale` can then be read from the localStorage.
                       */}
                      {this.props.render()}
                    </React.Fragment>
                  </ApplicationContextProvider>
                )}
              </ProjectDataLocale>
            );
          }}
        </FetchProject>
      </React.Suspense>
    );
  }
}

export default injectIntl(ProjectContainer);
