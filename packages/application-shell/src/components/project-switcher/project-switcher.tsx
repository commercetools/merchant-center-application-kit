import type { OptionProps, ValueContainerProps } from 'react-select';
import type {
  TProject,
  TFetchUserProjectsQuery,
  TFetchUserProjectsQueryVariables,
} from '../../types/generated/mc';

import React from 'react';
import memoize from 'memoize-one';
import { useQuery } from '@apollo/client/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { css } from '@emotion/core';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import SelectInput from '@commercetools-uikit/select-input';
import { ErrorIcon } from '@commercetools-uikit/icons';
import { customProperties } from '@commercetools-uikit/design-system';
import { location } from '../../utils/location';
import ProjectsQuery from './project-switcher.mc.graphql';
import messages from './messages';

type Props = {
  projectKey?: string;
};
type OptionType = Pick<TProject, 'key' | 'name' | 'suspension' | 'expiry'> & {
  label: string;
};
type CustomValueContainerProps = ValueContainerProps<OptionType> & {
  projectCount: number;
};

export const ProjectSwitcherValueContainer = ({
  projectCount,
  ...restProps
}: CustomValueContainerProps) => (
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
      <SelectInput.ValueContainer {...restProps}>
        {restProps.children}
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
      {projectCount}
    </span>
  </div>
);

export const ProjectSwitcherOption = (props: OptionProps<OptionType>) => (
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

const mapProjectsToOptions = memoize((projects) =>
  projects.map((project: TProject) => ({
    key: project.key,
    name: project.name,
    label: project.name,
    value: project.key,
    suspension: project.suspension,
    expiry: project.expiry,
  }))
);

const redirectTo = (targetUrl: string) => location.replace(targetUrl);

const ProjectSwitcher = (props: Props) => {
  const intl = useIntl();
  const { loading, data } = useQuery<
    TFetchUserProjectsQuery,
    TFetchUserProjectsQueryVariables
  >(ProjectsQuery, {
    onError: reportErrorToSentry,
    variables: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
    },
  });

  if (loading) return null;

  return (
    <div
      css={css`
        width: 225px;
      `}
      data-track-component="ProjectSwitch"
      data-track-event="click"
    >
      <SelectInput<OptionType>
        value={props.projectKey || ''}
        name="project-switcher"
        aria-labelledby="project-switcher"
        onChange={(event) => {
          const selectedProjectKey = event.target.value;
          if (selectedProjectKey !== props.projectKey)
            // We simply redirect to a "new" browser page, instead of using the
            // history router. This will simplify a lot of things and avoid possible
            // problems like e.g. resetting the store/state.
            redirectTo(`/${selectedProjectKey}`);
        }}
        options={
          data && data.user && mapProjectsToOptions(data.user.projects.results)
        }
        isOptionDisabled={(option) =>
          option.suspension.isActive || option.expiry.isActive
        }
        components={{
          // eslint-disable-next-line react/display-name
          Option: (optionsProps) => <ProjectSwitcherOption {...optionsProps} />,
          // eslint-disable-next-line react/display-name
          ValueContainer: (valueContainerProps) => (
            <ProjectSwitcherValueContainer
              {...valueContainerProps}
              projectCount={
                (data && data.user && data.user.projects.results.length) || 0
              }
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

export default ProjectSwitcher;
