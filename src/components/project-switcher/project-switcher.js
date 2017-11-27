import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, setDisplayName } from 'recompose';
import Select from 'react-select';
import { FormattedMessage, injectIntl } from 'react-intl';
import classnames from 'classnames';
import { ErrorIcon } from '@commercetools-local/ui-kit/icons';
import styles from './project-switcher.mod.css';
import messages from './messages';

const maxResizableWidth = 225;

export class ProjectSwitcher extends React.PureComponent {
  static displayName = 'ProjectSwitcher';

  static propTypes = {
    projectKey: PropTypes.string.isRequired,
    availableProjects: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,

    // Injected
    windowLocation: PropTypes.shape({
      replace: PropTypes.func.isRequired,
    }).isRequired,
    // Intl
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    isMenuOpen: false,
  };

  componentDidMount() {
    this.resizeDropdown();
  }

  componentDidUpdate() {
    this.resizeDropdown();
  }

  resizeDropdown = () => {
    const element = this.node.querySelector(
      '[data-test=project-switcher__name]'
    );

    if (!element) return;

    const offsetWidth = element.offsetWidth;

    // TODO: find a better way to get those "magic" numbers
    const padding = 10 /* left */ + 65; /* right */
    const border = 2 * 1;

    const calculatedWidth = Math.max(
      offsetWidth + padding + border,
      maxResizableWidth
    );
    this.node.style.width = `${calculatedWidth}px`;
  };

  getProjectName = key => {
    const selectedProject = this.props.availableProjects.find(
      project => project.key === key
    );
    return selectedProject && selectedProject.name;
  };

  handleSelection = ({ key: selectedProjectKey }) => {
    if (selectedProjectKey !== this.props.projectKey)
      // We simply redirect to a "new" browser page, instead of using the
      // history router. This will simplify a lot of things and avoid possible
      // problems like e.g. resetting the store/state.
      this.props.windowLocation.replace(`/${selectedProjectKey}`);
  };

  renderProjectName = () => {
    if (!this.getProjectName(this.props.projectKey)) return null;

    return (
      <span
        data-test="project-switcher__name"
        className={styles['project-name']}
      >
        {this.getProjectName(this.props.projectKey)}
      </span>
    );
  };

  renderLabel = () => (
    <span className={styles['dropdown-container']}>
      {this.renderProjectName()}
      <span className={styles['project-counter']}>
        {this.props.availableProjects.length}
      </span>
    </span>
  );

  handleRenderItemName = item => (
    <div>
      <div
        className={classnames(styles['item-text-main'], {
          [styles['item-text-disabled']]: item.suspended || item.expired,
        })}
      >
        {item.name}
        {(item.suspended || item.expired) && (
          <span className={styles['disabled-icon-container']}>
            <ErrorIcon size="small" />
          </span>
        )}
      </div>
      <div
        className={classnames(styles['item-text-small'], {
          [styles['item-text-disabled']]: item.suspended || item.expired,
        })}
      >
        {item.key}
      </div>
      {item.suspended && (
        <div className={classnames(styles.red, styles['item-text-small'])}>
          <FormattedMessage {...messages.suspended} />
        </div>
      )}
      {item.expired && (
        <div className={classnames(styles.red, styles['item-text-small'])}>
          <FormattedMessage {...messages.expired} />
        </div>
      )}
    </div>
  );

  handleOpen = () => {
    this.setState({ isMenuOpen: true });
  };

  handleClose = () => {
    this.setState({ isMenuOpen: false });
  };

  getRef = node => {
    this.node = node;
  };

  render() {
    return (
      <div
        ref={this.getRef}
        className={classnames(styles['react-select-wrapper'], {
          [styles['is-open']]: this.state.isMenuOpen,
        })}
        data-track-component="ProjectSwitch"
      >
        <Select
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          valueRenderer={this.renderLabel}
          labelKey="name"
          valueKey="key"
          className={styles['react-select-container']}
          value={this.props.projectKey}
          name="project-switcher"
          onChange={this.handleSelection}
          autoBlur={true}
          options={this.props.availableProjects}
          optionRenderer={this.handleRenderItemName}
          clearable={false}
          backspaceRemoves={false}
          searchPromptText={this.props.intl.formatMessage(
            messages.searchPlaceholder
          )}
          noResultsText={this.props.intl.formatMessage(messages.noResults)}
        />
      </div>
    );
  }
}

export default compose(
  setDisplayName('ProjectSwitcher'),
  withProps(() => ({
    // Inject the `window.location` object as a prop, makes it easier to test it.
    // NOTE: passing `window.location.replace` as a prop will cause problems with
    // "hot loader", guessing it's because of the "special" nature of the `window`
    // object? Whatever, passing it like this it works ;)
    windowLocation: window.location,
  })),
  injectIntl
)(ProjectSwitcher);
