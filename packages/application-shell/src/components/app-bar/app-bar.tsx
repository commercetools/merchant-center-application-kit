import type { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import type { TApplicationsMenu } from '../../types/generated/proxy';

import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import Spacings from '@commercetools-uikit/spacings';
import { customProperties } from '@commercetools-uikit/design-system';
import LogoSVG from '@commercetools-frontend/assets/images/logo.svg';
import { CONTAINERS } from '../../constants';
import { getPreviousProjectKey } from '../../utils';
import UserSettingsMenu from '../user-settings-menu';
import ProjectSwitcher from '../project-switcher';
import BackToProject from '../back-to-project';
import LoadingPlaceholder from '../loading-placeholder';
import { REQUESTS_IN_FLIGHT_LOADER_DOM_ID } from '../requests-in-flight-loader/constants';

type Props = {
  user: TFetchLoggedInUserQuery['user'];
  projectKeyFromUrl?: string;
  DEV_ONLY__loadAppbarMenuConfig?: () => Promise<TApplicationsMenu['appBar']>;
};

const AppBar = (props: Props) => {
  const previousProjectKey = getPreviousProjectKey(
    props.user && props.user.defaultProjectKey
  );

  return (
    <div
      css={css`
        box-shadow: ${customProperties.shadow1};
        min-height: 43px;
        position: relative;
        width: 100%;
        z-index: 20000;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
      data-test="top-navigation"
    >
      <Spacings.Inline>
        <div
          css={css`
            display: block;
            float: left;
            width: 28px;
            height: 32px;
            margin-left: 20px;
          `}
        >
          {!props.user ? (
            <img src={LogoSVG} width="100%" alt="Logo" />
          ) : (
            <Link to={`/${previousProjectKey || ''}`}>
              <img src={LogoSVG} width="100%" alt="Logo" />
            </Link>
          )}
        </div>

        <div
          id={REQUESTS_IN_FLIGHT_LOADER_DOM_ID}
          css={css`
            display: flex;
            flex: 1;
          `}
        />
      </Spacings.Inline>

      <div
        css={css`
          float: right;
          font-weight: normal;
          font-size: 1rem;
          margin-right: ${customProperties.spacingM};
          display: flex;
          align-items: center;
        `}
      >
        <Spacings.Inline scale="m" alignItems="center">
          <Spacings.Inline alignItems="center">
            {/* This node is used by a react portal */}
            <div id={CONTAINERS.LOCALE_SWITCHER} />
            {(() => {
              if (!props.user) {
                return <LoadingPlaceholder shape="rect" size="s" />;
              }
              // The `<ProjectSwitcher>` should be rendered only if the
              // user is fetched and the user has projects while the app runs in an project context.
              if (props.user.projects.total > 0 && props.projectKeyFromUrl)
                return (
                  <ProjectSwitcher
                    // In this case it's not necessary to check if the `projectKey` param
                    // is included in the list of projects. In such case
                    // the dropdown will still be rendered but no project will be selected.
                    // This is fine becase the user has still the possibility to "switch"
                    // to a project.
                    projectKey={props.projectKeyFromUrl || previousProjectKey}
                  />
                );
              if (!props.user.defaultProjectKey) return null;
              return <BackToProject projectKey={previousProjectKey} />;
            })()}
          </Spacings.Inline>
          <div
            css={css`
              border-left: 1px ${customProperties.colorNeutral90} solid;
              height: 43px;
            `}
          />
          {props.user ? (
            <UserSettingsMenu
              language={props.user.language}
              firstName={props.user.firstName}
              lastName={props.user.lastName}
              gravatarHash={props.user.gravatarHash}
              email={props.user.email}
              DEV_ONLY__loadAppbarMenuConfig={
                props.DEV_ONLY__loadAppbarMenuConfig
              }
            />
          ) : (
            <LoadingPlaceholder shape="dot" size="l" />
          )}
        </Spacings.Inline>
      </div>
    </div>
  );
};
AppBar.displayName = 'AppBar';

export default AppBar;
