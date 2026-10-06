import { type JSX, type ReactNode, type RefObject } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PortalsContainer } from '@commercetools-frontend/application-components';
import type { TApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  DOMAINS,
  PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS,
  PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS_IN_PROJECT_CONTEXT,
  STATIC_URL_PATHS,
  isProjectKeylessApplicationEntryPoint,
  isProjectKeylessApplicationEntryPointInProjectContext,
} from '@commercetools-frontend/constants';
import { NotificationsList } from '@commercetools-frontend/react-notifications';
import { DIMENSIONS, NAVBAR } from '../../constants';
import { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import { getPreviousProjectKey, PERFORMANCE_MARKS } from '../../utils';
import ApplicationEntryPoint from '../application-entry-point';
import ApplicationLoader from '../application-loader';
import PerformanceMark from '../performance-mark';
import ProjectContainer from '../project-container';
import RedirectToProjectCreate from '../redirect-to-project-create';
import RouteCatchAll from '../route-catch-all';

export const MainContainer = styled.main`
  grid-column: 2/3;
  grid-row: 3/4;

  /*
    Allow the this flex child to grow smaller than its smallest content.
    This is needed when there is a really wide text inside that would stretch
    this node to be wider than the parent.
  */
  min-width: 0;
  overflow-x: hidden;
  overflow-y: scroll;

  /*
    layout the children. There will always be the page and side notification
    about the actual content. The content should stretch to fill the rest of
    the page.
  */
  display: flex;
  flex-direction: column;

  /*
    set position to relative to layout notifications and modals
  */
  position: relative;
`;

type TShellMainContentProps = {
  isLoadingUser: boolean;
  isLoadingLocaleData: boolean;
  normalizedUser: TFetchLoggedInUserQuery['user'] | undefined;
  applicationEnvironment: TApplicationContext<{}>['environment'];
  projectKeyInContext?: string;
  notificationsPageRef: RefObject<HTMLDivElement | null>;
  layoutRefs: unknown;
  disableRoutePermissionCheck?: boolean;
  render?: () => JSX.Element;
  children?: ReactNode;
};

/**
 * The routed content area of the authenticated shell.
 *
 * Extracted from `ApplicationShellAuthenticated` so that the chrome around it
 * can be composed either below or above the locale boundary without
 * duplicating this tree.
 */
export const ShellMainContent = (props: TShellMainContentProps) => {
  const {
    isLoadingUser,
    isLoadingLocaleData,
    normalizedUser,
    applicationEnvironment,
    projectKeyInContext,
    notificationsPageRef,
    layoutRefs,
  } = props;

  return (
    <>
      {isLoadingUser || isLoadingLocaleData ? (
        <MainContainer role="main" data-mc-content>
          <ApplicationLoader />
        </MainContainer>
      ) : (
        <MainContainer role="main" data-mc-content>
          <PerformanceMark mark={PERFORMANCE_MARKS.CONTENT_RENDERED} />
          <div ref={notificationsPageRef}>
            <NotificationsList domain={DOMAINS.PAGE} />
          </div>
          <NotificationsList domain={DOMAINS.SIDE} />
          <div
            css={css`
              flex-grow: 1;
              display: flex;
              flex-direction: column;
              position: relative;

              /*
            This is only necessary because we have an intermediary <div> wrapping the
            <View> component that is used to wrap every content-view. This intermediary
            <div> is solely used for adding the tracking context to the content-view.
            However, this could be done by passing the tracking context to the <View>
            and let it do the layout, so we can avoid laying our from the outside as we
            do here.
          */
              > *:not(:first-of-type) {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
              }
            `}
          >
            <PortalsContainer
              // @ts-ignore
              ref={layoutRefs}
              offsetTop={DIMENSIONS.header}
              offsetLeft={
                projectKeyInContext ? NAVBAR.widthLeftNavigation : '0px'
              }
              offsetLeftOnExpandedMenu={
                projectKeyInContext
                  ? NAVBAR.widthLeftNavigationWhenExpanded
                  : '0px'
              }
            />
            <Switch>
              <Route
                path="/profile"
                render={() => (
                  <Redirect to={`/${STATIC_URL_PATHS.ACCOUNT}/profile`} />
                )}
              />

              <Route
                path={PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS.filter(
                  (entryPointUriPath) =>
                    !isProjectKeylessApplicationEntryPointInProjectContext(
                      entryPointUriPath
                    )
                ).map((entryPointUriPath) => `/${entryPointUriPath}`)}
              >
                {
                  /**
                   * In case the AppShell uses the `render` function, we assume it's one of two cases:
                   * 1. The application does not use `children` and therefore implements the routes including
                   * the <RouteCatchAll> (this is the "legacy" behavior).
                   * 2. It's the account application, which always uses `render` and therefore should render as normal.
                   *
                   * In case the AppShell uses the `children` function, we can always assume that
                   * it's a normal Custom Application and that it should trigger a force reload.
                   */
                  props.render ? <>{props.render()}</> : <RouteCatchAll />
                }
              </Route>
              <Route
                path={PROJECT_KEYLESS_APPLICATION_ENTRY_POINTS_IN_PROJECT_CONTEXT.map(
                  (entryPointUriPath) => `/${entryPointUriPath}`
                )}
              >
                {isProjectKeylessApplicationEntryPointInProjectContext(
                  applicationEnvironment.entryPointUriPath
                ) ? (
                  <ApplicationEntryPoint
                    environment={applicationEnvironment}
                    // There is no project in ApplicationContext on this
                    // path, so the default View-permission check cannot
                    // succeed. Access is gated in the app via a user flag.
                    disableRoutePermissionCheck
                    render={props.render}
                  >
                    {props.children}
                  </ApplicationEntryPoint>
                ) : props.render ? (
                  /**
                   * Same as `/account`: a `render` app implements its own
                   * catch-all. A `children` Custom Application must reload
                   * so the proxy can hand the request to agent-sphere.
                   */
                  <>{props.render()}</>
                ) : (
                  <RouteCatchAll />
                )}
              </Route>
              {/* Project routes */}
              <Route exact={true} path="/">
                {(() => {
                  const entryPointUriPath =
                    applicationEnvironment.entryPointUriPath;
                  const previousProjectKey = getPreviousProjectKey(
                    normalizedUser?.defaultProjectKey ?? undefined
                  );

                  /**
                   * NOTE:
                   *   Given the application does not run on a `/:projectKey` route
                   *   (e.g. `agent-sphere`), the application redirects to its own
                   *   entry point instead of to a project.
                   *   Given the user has not been loaded a loading spinner is shown.
                   *   Given the user was not working on a project previously nor has a default
                   *   project, the user will be prompted to create one.
                   *   Given the user was working on a project previously or has a default
                   *   project, the application will redirect to that project.
                   */
                  if (
                    isProjectKeylessApplicationEntryPoint(entryPointUriPath)
                  ) {
                    return <Redirect to={`/${entryPointUriPath}`} />;
                  }
                  if (!normalizedUser) return <ApplicationLoader />;
                  if (!previousProjectKey) return <RedirectToProjectCreate />;
                  return <Redirect to={`/${previousProjectKey}`} />;
                })()}
              </Route>
              <Route exact={false} path="/:projectKey">
                <ProjectContainer
                  user={normalizedUser}
                  environment={applicationEnvironment}
                  disableRoutePermissionCheck={
                    props.disableRoutePermissionCheck
                  }
                  // This effectively renders the
                  // children, which is the application
                  // specific part
                  render={props.render}
                >
                  {props.children}
                </ProjectContainer>
              </Route>
            </Switch>
          </div>
        </MainContainer>
      )}
    </>
  );
};
ShellMainContent.displayName = 'ShellMainContent';

export default ShellMainContent;
