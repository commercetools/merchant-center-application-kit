import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import { graphql } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import flowRight from 'lodash/flowRight';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import classnames from 'classnames';
import { SelectInput, ErrorIcon } from '@commercetools-frontend/ui-kit';
import styles from './project-switcher.mod.css';
import ProjectsQuery from './project-switcher.graphql';
import messages from './messages';

export const ValueContainer = props => (
  <div className={styles['value-container']}>
    <div className={styles['value-wrapper']}>
      <SelectInput.ValueContainer {...props}>
        {props.children}
      </SelectInput.ValueContainer>
    </div>
    <span className={styles['project-counter']}>{props.projectCount}</span>
  </div>
);

ValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
  projectCount: PropTypes.number.isRequired,
};

ValueContainer.displayName = 'ValueContainer';

export const Option = props => (
  <SelectInput.Option {...props}>
    <div className={styles['option-container']}>
      <div
        className={classnames(styles['item-text-main'], {
          [styles['item-text-disabled']]:
            (props.data.suspension && props.data.suspension.isActive) ||
            (props.data.expiry && props.data.expiry.isActive),
        })}
      >
        {props.data.name}
        {((props.data.suspension && props.data.suspension.isActive) ||
          (props.data.expiry && props.data.expiry.isActive)) && (
          <span className={styles['disabled-icon-container']}>
            <ErrorIcon size="medium" />
          </span>
        )}
      </div>
      <div
        className={classnames(styles['item-text-small'], {
          [styles['item-text-disabled']]:
            (props.data.suspension && props.data.suspension.isActive) ||
            (props.data.expiry && props.data.expiry.isActive),
        })}
      >
        {props.data.key}
      </div>
      {props.data.suspension && props.data.suspension.isActive && (
        <div className={classnames(styles.red, styles['item-text-small'])}>
          <FormattedMessage {...messages.suspended} />
        </div>
      )}
      {props.data.expiry && props.data.expiry.isActive && (
        <div className={classnames(styles.red, styles['item-text-small'])}>
          <FormattedMessage {...messages.expired} />
        </div>
      )}
    </div>
  </SelectInput.Option>
);

Option.propTypes = {
  data: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    expiry: PropTypes.shape({
      isActive: PropTypes.bool,
    }).isRequired,
    suspension: PropTypes.shape({
      isActive: PropTypes.bool,
    }).isRequired,
  }).isRequired,
};

Option.displayName = 'Option';

const mapProjectsToOptions = defaultMemoize(projects =>
  projects.map(project => ({
    key: project.key,
    name: project.name,
    label: project.name,
    value: project.key,
    suspension: project.suspension,
    expiry: project.expiry,
  }))
);

export class ProjectSwitcher extends React.PureComponent {
  static displayName = 'ProjectSwitcher';

  static propTypes = {
    projectKey: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
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

  redirectTo = targetUrl => window.location.replace(targetUrl);

  getProjectName = key => {
    const selectedProject = this.props.projectsQuery.user.projects.results.find(
      project => project.key === key
    );
    return selectedProject && selectedProject.name;
  };

  handleSelection = ({ target: { value: selectedProjectKey } }) => {
    if (selectedProjectKey !== this.props.projectKey)
      // We simply redirect to a "new" browser page, instead of using the
      // history router. This will simplify a lot of things and avoid possible
      // problems like e.g. resetting the store/state.
      this.redirectTo(`/${selectedProjectKey}`);
  };

  render() {
    if (this.props.projectsQuery.loading) return null;

    return (
      <div
        className={styles['react-select-wrapper']}
        data-track-component="ProjectSwitch"
        data-track-event="click"
      >
        <SelectInput
          value={this.props.projectKey}
          name="project-switcher"
          onChange={this.handleSelection}
          options={
            this.props.projectsQuery.user &&
            mapProjectsToOptions(this.props.projectsQuery.user.projects.results)
          }
          components={{
            Option,
            ValueContainer: props => (
              <ValueContainer
                {...props}
                projectCount={
                  this.props.projectsQuery.user.projects.results.length
                }
              />
            ),
          }}
          isClearable={false}
          backspaceRemovesValue={false}
          placeholder={this.props.intl.formatMessage(
            messages.searchPlaceholder
          )}
          noOptionsMessage={() =>
            this.props.intl.formatMessage(messages.noResults)
          }
        />
      </div>
    );
  }
}

export default flowRight(
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
