import { ReactNode, Suspense, useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import ReactDOM from 'react-dom';
import { useIntl } from 'react-intl';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import type { TProviderProps } from '@commercetools-frontend/application-shell-connectors';
import { ApplicationContextProvider } from '@commercetools-frontend/application-shell-connectors';
import {
  DOMAINS,
  LOGOUT_REASONS,
  STORAGE_KEYS,
} from '@commercetools-frontend/constants';
import { Notifier } from '@commercetools-frontend/react-notifications';
import { CONTAINERS, SUSPENSION_REASONS } from '../../constants';
import type { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import ApplicationEntryPoint from '../application-entry-point';
import ApplicationLoader from '../application-loader';
import ErrorBoundary from '../error-boundary';
import FetchProject from '../fetch-project';
import LocaleSwitcher from '../locale-switcher';
import ProjectDataLocale from '../project-data-locale';
import ProjectExpired from '../project-expired';
import ProjectNotFound from '../project-not-found';
import ProjectNotInitialized from '../project-not-initialized';
import ProjectSuspended from '../project-suspended';
import RedirectToProjectCreate from '../redirect-to-project-create';
import messages from './messages';

type QueryParams = {
  projectKey?: string;
};
type TProjectContainerProps = {
  user: TFetchLoggedInUserQuery['user'];
  environment: TProviderProps<{ enableSignUp?: boolean }>['environment'];
  disableRoutePermissionCheck?: boolean;
  render?: () => JSX.Element;
  children?: ReactNode;
};

// A trial expire notification should be displayed from 2 weeks before the project expires
const minDaysToDisplayNotification = 14;
const maxDaysToDisplayNotification = 0;
const shouldShowNotificationForTrialExpired = (daysLeft?: number) =>
  !isNil(daysLeft) &&
  daysLeft <= minDaysToDisplayNotification &&
  daysLeft >= maxDaysToDisplayNotification;

const ProjectContainer = (props: TProjectContainerProps) => {
  const intl = useIntl();
  const location = useLocation();
  const match = useRouteMatch<QueryParams>();
  const [localeSwitcherNode, setLocaleSwitcherNode] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    /**
     * NOTE: in order to render a component into a portal, the portal
     * DOM node needs to exists in the DOM.
     * If we try to get the DOM node by id before the components are
     * actually mounted, we won't find the DOM node, hence we can't render
     * the portal.
     * To work around this issue, we simply wait that the component is
     * mounted, then we render the portal.
     *
     * From the reactjs docs: https://reactjs.org/docs/portals.html
     * "
     *   If a child component requires to be attached to the DOM tree
     *   immediately when mounted, for example to measure a
     *   DOM node, or uses 'autoFocus' in a descendant, add
     *   state to Modal and only render the children when Modal
     *   is inserted in the DOM tree.
     * "
     */
    setLocaleSwitcherNode(document.getElementById(CONTAINERS.LOCALE_SWITCHER));
  }, [setLocaleSwitcherNode]);

  const projectKey = match.params.projectKey;
  useEffect(() => {
    // Ensure to sync the `projectKey` from the URL with localStorage.
    if (projectKey) {
      window.localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_KEY, projectKey);
    }
  }, [projectKey]);

  const hasNoProjects = props.user && props.user.projects.total === 0;
  /**
   * Given the user does not have any projects and account creation (sign up) is not yet
   * enabled the user will be logged out.
   *
   * Given the user does not have project (and as a result is not part of an organization)
   * the account application gets control over render. If any other application
   * is requested to render a full page redirect (to have the proxy serve the request) occurs
   * given the application is served by the proxy.
   *    Given the application is not served by the proxy we do not perform a redirect as
   *    otherwise a redirect loop can occur as no application is able to handle the route.
   */
  if (
    hasNoProjects &&
    props.environment.enableSignUp !== true &&
    props.environment.servedByProxy
  )
    return <Redirect to={`/logout?reason=${LOGOUT_REASONS.NO_PROJECTS}`} />;
  if (hasNoProjects && props.environment.enableSignUp)
    return (
      <Switch>
        <Route path="/account">{props.render?.()}</Route>
        <Route>
          <RedirectToProjectCreate />
        </Route>
      </Switch>
    );

  return (
    <ErrorBoundary pathname={location.pathname}>
      <Suspense fallback={<ApplicationLoader />}>
        <FetchProject
          skip={!props.user || !props.user.defaultProjectKey}
          projectKey={projectKey}
        >
          {({ isLoading: isProjectLoading, project }) => {
            // TODO: do something if there is an `error`?
            if (isProjectLoading) return <ApplicationLoader />;
            if (!project) return <ProjectNotFound />;
            if (project.suspension && project.suspension.isActive)
              return (
                <ProjectSuspended
                  isTemporary={
                    project.suspension.reason ===
                    SUSPENSION_REASONS.TEMPORARY_MAINTENANCE
                  }
                />
              );
            if (project.expiry && project.expiry.isActive)
              return <ProjectExpired />;
            if (project.initialized === false) return <ProjectNotInitialized />;

            return (
              <ProjectDataLocale locales={project.languages}>
                {({ locale, setProjectDataLocale }) => (
                  <ApplicationContextProvider
                    user={props.user}
                    project={project}
                    projectDataLocale={locale}
                    environment={props.environment}
                  >
                    <>
                      {shouldShowNotificationForTrialExpired(
                        project.expiry.daysLeft ?? undefined
                      ) && (
                        <Notifier
                          kind="warning"
                          domain={DOMAINS.GLOBAL}
                          text={intl.formatMessage(messages.trialDaysLeft, {
                            daysLeft: project.expiry.daysLeft || 0,
                          })}
                        />
                      )}
                      {/* Render <LocaleSwitcher> using a portal */}
                      {localeSwitcherNode &&
                        // Render the `<LocaleSwitcher>` only if the project has more
                        // than one language.
                        project.languages.length > 1 &&
                        ReactDOM.createPortal(
                          <LocaleSwitcher
                            // Be explicit on listing the props so that we can better assert it.
                            projectDataLocale={locale}
                            setProjectDataLocale={setProjectDataLocale}
                            availableLocales={project.languages}
                          />,
                          localeSwitcherNode
                        )}
                      {/**
                       * NOTE: we don't need to explicitly pass the `locale`,
                       * it's enough to trigger a re-render.
                       * The `locale` can then be read from the localStorage.
                       */}
                      <ApplicationEntryPoint
                        environment={props.environment}
                        disableRoutePermissionCheck={
                          props.disableRoutePermissionCheck
                        }
                        render={props.render}
                      >
                        {props.children}
                      </ApplicationEntryPoint>
                    </>
                  </ApplicationContextProvider>
                )}
              </ProjectDataLocale>
            );
          }}
        </FetchProject>
      </Suspense>
    </ErrorBoundary>
  );
};
ProjectContainer.displayName = 'ProjectContainer';

export default ProjectContainer;
