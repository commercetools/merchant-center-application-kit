import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import LocaleSwitcher from '../locale-switcher';
import WithProjectDataLocale from '../with-project-data-locale';
import WithProject from '../with-project';

export default class ProjectContainer extends React.PureComponent {
  static displayName = 'ProjectContainer';

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectKey: PropTypes.string,
      }).isRequired,
    }).isRequired,
  };

  state = {
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

  render() {
    return (
      <WithProject projectKey={this.props.match.params.projectKey}>
        {({ loading, project }) => (
          <WithProjectDataLocale locales={project && project.languages}>
            {({ locale, setProjectDataLocale }) => (
              <div>
                {this.state.localeSwitcherNode &&
                  // Render <LocaleSwitcher> using a portal
                  ReactDOM.createPortal(
                    !loading && (
                      <LocaleSwitcher
                        projectDataLocale={locale}
                        setProjectDataLocale={setProjectDataLocale}
                        languages={project.languages}
                      />
                    ),
                    this.state.localeSwitcherNode
                  )}

                {/* <Menu /> */}
              </div>
            )}
          </WithProjectDataLocale>
        )}
      </WithProject>
    );
  }
}
