import React from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import { graphql } from 'react-apollo';
import { FormattedMessage, useIntl } from 'react-intl';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import classnames from 'classnames';
import { SelectInput, ErrorIcon } from '@commercetools-frontend/ui-kit';
import styles from './project-switcher.mod.css';
import ProjectsQuery from './project-switcher.graphql';
import messages from './messages';

export const ProjectSwitcherValueContainer = props => (
  <div className={styles['value-container']}>
    <div className={styles['value-wrapper']}>
      <SelectInput.ValueContainer {...props}>
        {props.children}
      </SelectInput.ValueContainer>
    </div>
    <span className={styles['project-counter']}>{props.projectCount}</span>
  </div>
);

ProjectSwitcherValueContainer.displayName = 'ProjectSwitcherValueContainer';
ProjectSwitcherValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
  projectCount: PropTypes.number.isRequired,
};

export const ProjectSwitcherOption = props => (
  <SelectInput.Option {...props}>
    <div className={styles['option-container']}>
      <div
        className={classnames(styles['item-text-main'], {
          [styles['item-text-disabled']]: props.isDisabled,
        })}
      >
        {props.data.name}
        {props.isDisabled && (
          <span className={styles['disabled-icon-container']}>
            <ErrorIcon size="medium" />
          </span>
        )}
      </div>
      <div
        className={classnames(styles['item-text-small'], {
          [styles['item-text-disabled']]: props.isDisabled,
        })}
      >
        {props.data.key}
      </div>
      {props.data.suspension && props.data.suspension.isActive && (
        <div
          className={classnames(
            styles['item-text-error'],
            styles['item-text-small']
          )}
        >
          <FormattedMessage {...messages.suspended} />
        </div>
      )}
      {props.data.expiry && props.data.expiry.isActive && (
        <div
          className={classnames(
            styles['item-text-error'],
            styles['item-text-small']
          )}
        >
          <FormattedMessage {...messages.expired} />
        </div>
      )}
    </div>
  </SelectInput.Option>
);
ProjectSwitcherOption.displayName = 'ProjectSwitcherOption';
ProjectSwitcherOption.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
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

const redirectTo = targetUrl => window.location.replace(targetUrl);

const ProjectSwitcher = props => {
  const intl = useIntl();

  if (props.projectsQuery.loading) return null;

  return (
    <div
      className={styles['react-select-wrapper']}
      data-track-component="ProjectSwitch"
      data-track-event="click"
    >
      <SelectInput
        value={props.projectKey}
        name="project-switcher"
        aria-labelledby="project-switcher"
        onChange={event => {
          const selectedProjectKey = event.target.value;
          if (selectedProjectKey !== props.projectKey)
            // We simply redirect to a "new" browser page, instead of using the
            // history router. This will simplify a lot of things and avoid possible
            // problems like e.g. resetting the store/state.
            redirectTo(`/${selectedProjectKey}`);
        }}
        options={
          props.projectsQuery.user &&
          mapProjectsToOptions(props.projectsQuery.user.projects.results)
        }
        isOptionDisabled={option =>
          option.suspension.isActive || option.expiry.isActive
        }
        components={{
          // eslint-disable-next-line react/display-name
          Option: optionsProps => <ProjectSwitcherOption {...optionsProps} />,
          // eslint-disable-next-line react/display-name
          ValueContainer: valueContainerProps => (
            <ProjectSwitcherValueContainer
              {...valueContainerProps}
              projectCount={props.projectsQuery.user.projects.results.length}
            />
          ),
        }}
        isClearable={false}
        backspaceRemovesValue={false}
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        noOptionsMessage={() => intl.formatMessage(messages.noResults)}
      />
    </div>
  );
};
ProjectSwitcher.displayName = 'ProjectSwitcher';
ProjectSwitcher.propTypes = {
  projectKey: PropTypes.string.isRequired,
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

export default graphql(ProjectsQuery, {
  name: 'projectsQuery',
  options: () => ({
    onError: reportErrorToSentry,
    variables: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
    },
  }),
})(ProjectSwitcher);
