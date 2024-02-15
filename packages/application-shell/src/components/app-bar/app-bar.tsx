import { css } from '@emotion/react';
import { ProjectStamp } from '@commercetools-frontend/application-components';
import { designTokens as uikitDesignTokens } from '@commercetools-uikit/design-system';
import Spacings from '@commercetools-uikit/spacings';
import { CONTAINERS, DIMENSIONS } from '../../constants';
import type { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import { getPreviousProjectKey } from '../../utils';
import BackToProject from '../back-to-project';
import LoadingPlaceholder from '../loading-placeholder';
import ProjectSwitcher from '../project-switcher';
import { REQUESTS_IN_FLIGHT_LOADER_DOM_ID } from '../requests-in-flight-loader/constants';
import UserSettingsMenu from '../user-settings-menu';

type Props = {
  user: TFetchLoggedInUserQuery['user'];
  projectKeyFromUrl?: string;
};

const AppBar = (props: Props) => {
  const previousProjectKey = getPreviousProjectKey(
    props.user?.defaultProjectKey ?? undefined
  );

  const selectedProject = props.user?.projects.results.find(
    (project) => project.key === props.projectKeyFromUrl
  );

  return (
    <div
      css={css`
        background-color: ${uikitDesignTokens.colorSurface};
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
        padding: 0 40px;
        min-height: ${DIMENSIONS.header};
        position: relative;
        width: 100%;
        z-index: 20000;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
      data-test="top-navigation"
    >
      <div
        css={css`
          float: right;
          font-weight: normal;
          font-size: 1rem;
          margin-right: ${uikitDesignTokens.spacing55};
          display: flex;
          align-items: center;
        `}
      >
        <Spacings.Inline scale="m" alignItems="center">
          <div
            css={css`
              display: flex;
              gap: ${uikitDesignTokens.spacing30};
              align-items: center;
            `}
          >
            {(() => {
              if (!props.user) {
                return <LoadingPlaceholder shape="rect" size="s" />;
              }
              // The `<ProjectSwitcher>` should be rendered only if the
              // user is fetched and the user has projects while the app runs in an project context.
              if (props.user.projects.total > 0 && props.projectKeyFromUrl)
                return (
                  <div
                    css={css`
                      display: flex;
                      gap: ${uikitDesignTokens.spacing20};
                      align-items: center;
                    `}
                  >
                    {selectedProject?.isProductionProject && (
                      <div
                        css={css`
                          height: 22px;
                        `}
                      >
                        <ProjectStamp.IsProduction />
                      </div>
                    )}
                    <ProjectSwitcher
                      // In this case it's not necessary to check if the `projectKey` param
                      // is included in the list of projects. In such case
                      // the dropdown will still be rendered but no project will be selected.
                      // This is fine becase the user has still the possibility to "switch"
                      // to a project.
                      projectKey={props.projectKeyFromUrl || previousProjectKey}
                    />
                  </div>
                );
              if (!props.user.defaultProjectKey) return null;
              return <BackToProject projectKey={previousProjectKey} />;
            })()}
            {/* This node is used by a react portal */}
            <div id={CONTAINERS.LOCALE_SWITCHER} />
          </div>
          <Spacings.Inline>
            <div
              id={REQUESTS_IN_FLIGHT_LOADER_DOM_ID}
              css={css`
                display: flex;
                flex: 1;
              `}
            />
          </Spacings.Inline>
        </Spacings.Inline>
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        <div id={CONTAINERS.LEFT_OF_PROFILE}></div>
        {props.user ? (
          <UserSettingsMenu
            language={props.user.language}
            firstName={props.user.firstName}
            lastName={props.user.lastName}
            gravatarHash={props.user.gravatarHash}
            email={props.user.email}
          />
        ) : (
          <LoadingPlaceholder shape="dot" size="l" />
        )}
      </div>
    </div>
  );
};
AppBar.displayName = 'AppBar';

export default AppBar;
