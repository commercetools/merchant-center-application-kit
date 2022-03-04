import type { OptionProps, ValueContainerProps } from 'react-select';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type {
  TProject,
  TFetchUserProjectsQuery,
  TFetchUserProjectsQueryVariables,
} from '../../types/generated/mc';

import memoize from 'memoize-one';
import { FormattedMessage, useIntl } from 'react-intl';
import { components } from 'react-select';
import { css } from '@emotion/react';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import SelectInput from '@commercetools-uikit/select-input';
import { ErrorIcon } from '@commercetools-uikit/icons';
import { customProperties } from '@commercetools-uikit/design-system';
import { useMcQuery } from '../../hooks/apollo-hooks';
import { location } from '../../utils/location';
import * as oidcStorage from '../../utils/oidc-storage';
import ProjectsQuery from './project-switcher.mc.graphql';
import messages from './messages';

declare let window: ApplicationWindow;

type Props = {
  projectKey?: string;
};
type OptionType = Pick<TProject, 'key' | 'name' | 'suspension' | 'expiry'> & {
  label: string;
};
type CustomValueContainerProps = ValueContainerProps & {
  projectCount: number;
};

// FIXME: properly expose these static component types from uikit.
type SelectInputWithStaticComponents = {
  ValueContainer: typeof components.ValueContainer;
  Option: typeof components.Option;
};
const SelectInputValueContainer = (
  SelectInput as unknown as SelectInputWithStaticComponents
).ValueContainer;
const SelectInputOption = (
  SelectInput as unknown as SelectInputWithStaticComponents
).Option;

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
      <SelectInputValueContainer {...restProps}>
        {restProps.children}
      </SelectInputValueContainer>
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

export const ProjectSwitcherOption = (props: OptionProps) => {
  const project = props.data as OptionType;
  return (
    <SelectInputOption {...props}>
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
          {project.name}
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
          {project.key}
        </div>
        {project.suspension && project.suspension.isActive && (
          <div
            css={css`
              font-size: 11px;
              color: ${customProperties.colorError};
            `}
          >
            <FormattedMessage {...messages.suspended} />
          </div>
        )}
        {project.expiry && project.expiry.isActive && (
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
    </SelectInputOption>
  );
};

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
  const { loading, data } = useMcQuery<
    TFetchUserProjectsQuery,
    TFetchUserProjectsQueryVariables
  >(ProjectsQuery, {
    onError: reportErrorToSentry,
    context: {
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
      <SelectInput
        value={props.projectKey || ''}
        name="project-switcher"
        aria-labelledby="project-switcher"
        onChange={(event) => {
          const selectedProjectKey = event.target.value as string;
          if (selectedProjectKey !== props.projectKey) {
            if (window.app.__DEVELOPMENT__?.oidc?.authorizeUrl) {
              oidcStorage.setActiveProjectKey(selectedProjectKey);
            }

            // We simply redirect to a "new" browser page, instead of using the
            // history router. This will simplify a lot of things and avoid possible
            // problems like e.g. resetting the store/state.
            redirectTo(`/${selectedProjectKey}`);
          }
        }}
        options={
          data && data.user && mapProjectsToOptions(data.user.projects.results)
        }
        isOptionDisabled={(option) => {
          const project = option as OptionType;
          return project.suspension.isActive || project.expiry.isActive;
        }}
        components={{
          Option: ProjectSwitcherOption,
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
