import { css } from '@emotion/react';
import memoize from 'memoize-one';
import { FormattedMessage, useIntl } from 'react-intl';
import type {
  OptionProps,
  ValueContainerProps,
  MenuListProps,
} from 'react-select';
import { components } from 'react-select';
import {
  useMcQuery,
  oidcStorage,
} from '@commercetools-frontend/application-shell-connectors';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import { designTokens } from '@commercetools-uikit/design-system';
import { ErrorIcon } from '@commercetools-uikit/icons';
import SelectInput from '@commercetools-uikit/select-input';
import type {
  TProject,
  TFetchUserProjectsQuery,
  TFetchUserProjectsQueryVariables,
} from '../../types/generated/mc';
import { location } from '../../utils/location';
import messages from './messages';
import ProjectsQuery from './project-switcher.mc.graphql';

declare let window: ApplicationWindow;

type Props = {
  projectKey?: string;
};
type OptionType = Pick<TProject, 'key' | 'name' | 'suspension' | 'expiry'> & {
  label: string;
};

const PROJECT_SWITCHER_LABEL_ID = 'project-switcher-label';

export const ValueContainer = ({ ...restProps }: ValueContainerProps) => {
  return (
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
    </div>
  );
};

export const ProjectSwitcherOption = (props: OptionProps) => {
  const project = props.data as OptionType;
  return (
    <SelectInput.Option {...props}>
      <div
        css={css`
          word-wrap: break-word;
        `}
      >
        <div
          css={css`
            color: ${props.isDisabled
              ? designTokens.colorNeutral
              : designTokens.colorAccent};
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
            color: ${props.isDisabled ? designTokens.colorNeutral : 'inherit'};
          `}
        >
          {project.key}
        </div>
        {project.suspension && project.suspension.isActive && (
          <div
            css={css`
              font-size: 11px;
              color: ${designTokens.colorError};
            `}
          >
            <FormattedMessage {...messages.suspended} />
          </div>
        )}
        {project.expiry && project.expiry.isActive && (
          <div
            css={css`
              font-size: 11px;
              color: ${designTokens.colorError};
            `}
          >
            <FormattedMessage {...messages.expired} />
          </div>
        )}
      </div>
    </SelectInput.Option>
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

const CustomMenuList = (props: MenuListProps) => {
  return (
    <div
      css={css`
        width: max-content;
        max-width: ${designTokens.constraint6};
      `}
    >
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </div>
  );
};

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
    <div>
      <AccessibleHidden>
        <span id={PROJECT_SWITCHER_LABEL_ID}>
          <FormattedMessage {...messages.projectsLabel} />
        </span>
      </AccessibleHidden>
      <SelectInput
        value={props.projectKey || ''}
        name="project-switcher"
        aria-labelledby={PROJECT_SWITCHER_LABEL_ID}
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
          ValueContainer,
          MenuList: CustomMenuList,
        }}
        isClearable={false}
        backspaceRemovesValue={false}
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        noOptionsMessage={() => intl.formatMessage(messages.noResults)}
        horizontalConstraint={'auto'}
      />
    </div>
  );
};
ProjectSwitcher.displayName = 'ProjectSwitcher';

export default ProjectSwitcher;
