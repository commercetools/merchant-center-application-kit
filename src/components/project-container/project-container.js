import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import omit from 'lodash.omit';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import LoadingSpinner from '@commercetools-local/ui-kit/loading-spinner';
import LocaleSwitcher from '../locale-switcher';
import ProjectDataLocale from '../project-data-locale';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import Menu from '../menu';
import ProjectNotFound from '../project-not-found';
import ProjectExpired from '../project-expired';
import ProjectSuspended from '../project-suspended';
import ProjectWithoutSettings from '../project-without-settings';
import styles from './project-container.mod.css';

class ProjectContainer extends React.Component {
  static displayName = 'ProjectContainer';
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectKey: PropTypes.string,
      }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
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
    // Ensure to cache the projectKey, in case it changes.
    const cachedProjectKey = storage.get(CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY);
    if (cachedProjectKey !== this.props.match.params.projectKey)
      storage.put(
        CORE_STORAGE_KEYS.ACTIVE_PROJECT_KEY,
        this.props.match.params.projectKey
      );
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
    return (
      <FetchUser>
        {({ isLoading: isLoadingUser, user }) => {
          // TODO: do something if there is an `error`?
          if (isLoadingUser) return <LoadingSpinner />;
          if (user && user.availableProjects.length === 0)
            return <Redirect to="/logout?reason=no-projects" />;

          return (
            <FetchProject projectKey={this.props.match.params.projectKey}>
              {({ isLoading: isLoadingProject, project }) => {
                // TODO: do something if there is an `error`?
                if (isLoadingProject) return <LoadingSpinner />;
                if (!project) return <ProjectNotFound />;
                if (project.suspended) return <ProjectSuspended />;
                if (project.expired) return <ProjectExpired />;
                if (!project.settings) return <ProjectWithoutSettings />;

                return (
                  <ProjectDataLocale locales={project.languages}>
                    {({ locale, setProjectDataLocale }) => (
                      <div className={styles['page-with-menu-layout']}>
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
                        <aside>
                          <Menu
                            location={this.props.location}
                            menuItems={this.props.menuItems}
                            projectKey={this.props.match.params.projectKey}
                            projectPermissions={omit(project.permissions, [
                              '__typename',
                            ])}
                          />
                        </aside>
                        <main>
                          {/**
                           * NOTE: we don't need to explicitly pass the `locale`,
                           * it's enough to trigger a re-render.
                           * The `locale` can then be read from the localStorage.
                           */}
                          {this.props.render()}
                        </main>
                      </div>
                    )}
                  </ProjectDataLocale>
                );
              }}
            </FetchProject>
          );
        }}
      </FetchUser>
    );
  }
}

export default ProjectContainer;
