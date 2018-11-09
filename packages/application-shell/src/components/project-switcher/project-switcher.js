import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import { compose, withProps, setDisplayName } from 'recompose';
import { graphql } from 'react-apollo';
import Select from 'react-select';
import { FormattedMessage, injectIntl } from 'react-intl';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import classnames from 'classnames';
import { ErrorIcon } from '@commercetools-frontend/ui-kit';
import styles from './project-switcher.mod.css';
import ProjectsQuery from './project-switcher.graphql';
import messages from './messages';

const maxResizableWidth = 225;

const mapProjectsToOptions = defaultMemoize(projects =>
  projects.map(project => ({
    key: project.key,
    name: project.name,
    suspension: project.suspension,
    expiry: project.expiry,
  }))
);

export class ProjectSwitcher extends React.PureComponent {
  static displayName = 'ProjectSwitcher';

  static propTypes = {
    projectKey: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    // withProps
    redirectTo: PropTypes.func.isRequired,
    // injectIntl
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    // graphql
    projectsQuery: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.shape({
        message: PropTypes.string.isRequired,
      }),
      user: PropTypes.shape({
        projects: PropTypes.shape({
          results: PropTypes.arrayOf(
            PropTypes.shape({
              key: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
              suspension: PropTypes.shape({
                isActive: PropTypes.bool.isRequired,
              }),
              expiry: PropTypes.shape({
                isActive: PropTypes.bool.isRequired,
              }),
            })
          ),
        }),
      }),
    }),
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
    if (this.props.projectsQuery.loading) return;

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
    const selectedProject = this.props.projectsQuery.user.projects.results.find(
      project => project.key === key
    );
    return selectedProject && selectedProject.name;
  };

  handleSelection = ({ key: selectedProjectKey }) => {
    if (selectedProjectKey !== this.props.projectKey)
      // We simply redirect to a "new" browser page, instead of using the
      // history router. This will simplify a lot of things and avoid possible
      // problems like e.g. resetting the store/state.
      this.props.redirectTo(`/${selectedProjectKey}`);
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
      <span className={styles['project-counter']}>{this.props.total}</span>
    </span>
  );

  handleRenderItemName = project => (
    <div>
      <div
        className={classnames(styles['item-text-main'], {
          [styles['item-text-disabled']]:
            (project.suspension && project.suspension.isActive) ||
            (project.expiry && project.expiry.isActive),
        })}
      >
        {project.name}
        {((project.suspension && project.suspension.isActive) ||
          (project.expiry && project.expiry.isActive)) && (
          <span className={styles['disabled-icon-container']}>
            <ErrorIcon size="medium" />
          </span>
        )}
      </div>
      <div
        className={classnames(styles['item-text-small'], {
          [styles['item-text-disabled']]:
            (project.suspension && project.suspension.isActive) ||
            (project.expiry && project.expiry.isActive),
        })}
      >
        {project.key}
      </div>
      {project.suspension && project.suspension.isActive && (
        <div className={classnames(styles.red, styles['item-text-small'])}>
          <FormattedMessage {...messages.suspended} />
        </div>
      )}
      {project.expiry && project.expiry.isActive && (
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
    if (this.props.projectsQuery.loading) return null;
    return (
      <div
        ref={this.getRef}
        className={classnames(styles['react-select-wrapper'], {
          [styles['is-open']]: this.state.isMenuOpen,
        })}
        data-track-component="ProjectSwitch"
        data-track-event="click"
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
          options={
            this.props.projectsQuery.user &&
            mapProjectsToOptions(this.props.projectsQuery.user.projects.results)
          }
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
    redirectTo: targetUrl => window.location.replace(targetUrl),
  })),
  graphql(ProjectsQuery, {
    name: 'projectsQuery',
    options: () => ({
      variables: {
        target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      },
    }),
  }),
  injectIntl
)(ProjectSwitcher);
