import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import LoadingSpinner from '@commercetools-local/ui-kit/loading-spinner';
import LocaleSwitcher from '../locale-switcher';
import ProjectDataLocale from '../project-data-locale';
import FetchProject from '../fetch-project';
import ProjectNotFound from '../project-not-found';
import ProjectExpired from '../project-expired';
import ProjectSuspended from '../project-suspended';
import ProjectWithoutSettings from '../project-without-settings';

class ProjectContainer extends React.Component {
  static displayName = 'ProjectContainer';
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectKey: PropTypes.string,
      }).isRequired,
    }).isRequired,
    isLoadingUser: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      availableProjects: PropTypes.array.isRequired,
    }),
    // A callback function to sync the projectKey with a parent component.
    setProjectKey: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
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
  componentDidUpdate() {
    const cachedProjectKey = storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
    let nextProjectKey = cachedProjectKey;
    // Ensure to cache the projectKey, in case it changes.
    if (cachedProjectKey !== this.props.match.params.projectKey) {
      nextProjectKey = this.props.match.params.projectKey;
      storage.put(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY, nextProjectKey);
    }
    // This callback should always be called, as we want to keep it in sync with
    // the projectKey currently active. It's the responsibility of the caller
    // to actually "be smart" and check if the given projectKey changed or not.
    this.props.setProjectKey(nextProjectKey);
  }
  componentDidCatch(/* error, info */) {
    this.setState({ hasError: true });
    // NOTE: track the error
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
      // NOTE: implement proper error view
      return (
        <div style={{ backgroundColor: 'red', color: 'white' }}>
          <h2 style={{ color: 'white' }}>
            {'Uh-oh, something went wrong in this main area.'}
          </h2>
          <p>
            {
              'You can still click around, navigate to another view or reload the page. If the error persists please contact our support.'
            }
          </p>
        </div>
      );
    }
    // TODO: do something if there is an `error`?
    if (this.props.isLoadingUser) return <LoadingSpinner />;
    if (this.props.user && this.props.user.availableProjects.length === 0)
      return <Redirect to="/logout?reason=no-projects" />;

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

export default ProjectContainer;
