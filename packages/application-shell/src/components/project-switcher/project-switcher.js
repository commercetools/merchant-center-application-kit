import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { graphql } from 'react-apollo';
import { FormattedMessage, useIntl } from 'react-intl';
import { css } from '@emotion/core';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  SelectInput,
  ErrorIcon,
  customProperties,
} from '@commercetools-frontend/ui-kit';
import ProjectsQuery from './project-switcher.graphql';
import messages from './messages';

export const ProjectSwitcherValueContainer = props => (
  <div
    css={css`
      display: flex;
      flex: 1;
      align-items: center;
    `}
  >
    <div
      css={css`
        flex: 1;
      `}
    >
      <SelectInput.ValueContainer {...props}>
        {props.children}
      </SelectInput.ValueContainer>
    </div>
    <span
      css={css`
        width: 22px;
        height: 22px;
        border-radius: 100%;
        background: ${customProperties.colorAccent40};
        color: ${customProperties.colorSurface};
        font-size: 0.9rem;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {props.projectCount}
    </span>
  </div>
);

ProjectSwitcherValueContainer.displayName = 'ProjectSwitcherValueContainer';
ProjectSwitcherValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
  projectCount: PropTypes.number.isRequired,
};

export const ProjectSwitcherOption = props => (
  <SelectInput.Option {...props}>
    <div
      css={css`
        word-wrap: break-word;
      `}
    >
      <div
        css={css`
          color: ${props.isDisabled
            ? customProperties.colorNeutral
            : customProperties.colorAccent};
        `}
      >
        {props.data.name}
        {props.isDisabled && (
          <span
            css={css`
              font-size: 1.5rem;
              display: flex;
            `}
          >
            <ErrorIcon size="medium" />
          </span>
        )}
      </div>
      <div
        css={css`
          font-size: 11px;
          color: ${props.isDisabled
            ? customProperties.colorNeutral
            : 'inherit'};
        `}
      >
        {props.data.key}
      </div>
      {props.data.suspension && props.data.suspension.isActive && (
        <div
          css={css`
            font-size: 11px;
            color: ${customProperties.colorError};
          `}
        >
          <FormattedMessage {...messages.suspended} />
        </div>
      )}
      {props.data.expiry && props.data.expiry.isActive && (
        <div
          css={css`
            font-size: 11px;
            color: ${customProperties.colorError};
          `}
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

const mapProjectsToOptions = memoize(projects =>
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
      css={css`
        width: 225px;
      `}
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
