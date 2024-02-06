import { css } from '@emotion/react';
import memoize from 'memoize-one';
import { FormattedMessage, useIntl } from 'react-intl';
import type {
  OptionProps,
  ValueContainerProps,
  MenuListProps,
  ControlProps,
} from 'react-select';
import { components } from 'react-select';
import { ProjectStamp } from '@commercetools-frontend/application-components';
import {
  useMcQuery,
  oidcStorage,
} from '@commercetools-frontend/application-shell-connectors';
import type { ApplicationWindow } from '@commercetools-frontend/constants';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import { designTokens } from '@commercetools-uikit/design-system';
import SelectInput from '@commercetools-uikit/select-input';
import Text from '@commercetools-uikit/text';
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
type OptionType = Pick<
  TProject,
  'key' | 'name' | 'suspension' | 'expiry' | 'isProductionProject'
> & {
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
        font-weight: ${designTokens.fontWeight500};
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
    <SelectInput.Option
      {...props}
      css={css`
        display: grid;
        grid-template-columns: 240px 1fr;
      `}
    >
      <div
        css={css`
          word-wrap: break-word;
        `}
      >
        <Text.Body
          fontWeight="medium"
          tone={props.isDisabled ? 'tertiary' : 'inherit'}
        >
          {project.name}
        </Text.Body>
        <Text.Caption tone={props.isDisabled ? 'tertiary' : 'secondary'}>
          {project.key}
        </Text.Caption>
      </div>
      <div
        css={css`
          > div {
            display: grid;
            justify-items: end;
            grid-gap: 4px;
          }
        `}
      >
        <ProjectStamp
          isProductionProject={project.isProductionProject}
          isSuspended={project.suspension && project.suspension.isActive}
          isExpired={project.expiry && project.expiry.isActive}
          willExpire={project.expiry && project.expiry.daysLeft}
          daysLeft={project.expiry.daysLeft}
        />
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
    isProductionProject: project.isProductionProject,
  }))
);

const CustomMenuList = (props: MenuListProps) => {
  return (
    <div>
      <components.MenuList {...props}>{props.children}</components.MenuList>
    </div>
  );
};

const Control = (props: ControlProps) => (
  <components.Control
    {...props}
    css={css`
      min-width: ${designTokens.constraint3};
    `}
  >
    {props.children}
  </components.Control>
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
          Control,
        }}
        isClearable={false}
        backspaceRemovesValue={false}
        placeholder={intl.formatMessage(messages.searchPlaceholder)}
        noOptionsMessage={() => intl.formatMessage(messages.noResults)}
        horizontalConstraint={'auto'}
        appearance="quiet"
        maxMenuHeight={380}
        maxMenuWidth={8}
        minMenuWidth={8}
      />
    </div>
  );
};
ProjectSwitcher.displayName = 'ProjectSwitcher';

export default ProjectSwitcher;
