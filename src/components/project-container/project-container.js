import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import isNil from 'lodash.isnil';
import { DOMAINS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/storage';
import Notifier from '@commercetools-local/core/components/notifier';
import LoadingSpinner from '@commercetools-local/ui-kit/loading-spinner';
import { reportErrorToSentry } from '@commercetools-local/sentry';
import { STORAGE_KEYS } from '../../constants';
import LocaleSwitcher from '../locale-switcher';
import ProjectDataLocale from '../project-data-locale';
import FetchProject from '../fetch-project';
import ProjectNotFound from '../project-not-found';
import ProjectExpired from '../project-expired';
import ProjectSuspended from '../project-suspended';
import ProjectWithoutSettings from '../project-without-settings';
import ErrorApologizer from '../error-apologizer';
import messages from './messages';

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
    isLoadingUser: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      availableProjects: PropTypes.array.isRequired,
    }),
    render: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
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
    this.setState(
      prevState =>
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
    if (this.props.isLoadingUser) return <LoadingSpinner />;
    if (this.props.user && this.props.user.availableProjects.length === 0)
      return <Redirect to="/logout?reason=no-projects" />;

    // A trial expire notification should be displayed from 2 weeks before the project expires
    const minDaysToDisplayNotification = 14;
    const maxDaysToDisplayNotification = 0;

    return (
      <FetchProject projectKey={this.props.match.params.projectKey}>
        {({ isLoading: isProjectLoading, project }) => {
          // TODO: do something if there is an `error`?
          if (isProjectLoading) return <LoadingSpinner />;
          if (!project) return <ProjectNotFound />;
          if (project.suspended) return <ProjectSuspended />;
          if (project.expired) return <ProjectExpired />;
          if (!project.settings) return <ProjectWithoutSettings />;

          return (
            <ProjectDataLocale locales={project.languages}>
              {({ locale, setProjectDataLocale }) => (
                <React.Fragment>
                  {!isNil(project.trialDaysLeft) &&
                    project.trialDaysLeft <= minDaysToDisplayNotification &&
                    project.trialDaysLeft >= maxDaysToDisplayNotification && (
                      <Notifier
                        kind="warning"
                        domain={DOMAINS.GLOBAL}
                        text={this.props.intl.formatMessage(
                          messages.trialDaysLeft,
                          { daysLeft: project.trialDaysLeft }
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
              )}
            </ProjectDataLocale>
          );
        }}
      </FetchProject>
    );
  }
}

export default injectIntl(ProjectContainer);
