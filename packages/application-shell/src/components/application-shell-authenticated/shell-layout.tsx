import { type ReactNode, type RefObject } from 'react';
import { css } from '@emotion/react';
import {
  ApplicationContextProvider,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS } from '@commercetools-frontend/constants';
import { NotificationsList } from '@commercetools-frontend/react-notifications';
import { SentryUserTracker } from '@commercetools-frontend/sentry';
import { DIMENSIONS } from '../../constants';
import { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import { PERFORMANCE_MARKS } from '../../utils';
import AppBar from '../app-bar';
import FetchProject from '../fetch-project';
import NavBar from '../navbar';
import PerformanceMark from '../performance-mark';
import RequestsInFlightLoader from '../requests-in-flight-loader';
import ThemeSwitcher from '../theme-switcher';

type TShellLayoutProps = {
  isLoadingUser: boolean;
  isLoadingLocaleData: boolean;
  locale?: string;
  normalizedUser: TFetchLoggedInUserQuery['user'] | undefined;
  applicationEnvironment: TApplicationContext<{}>['environment'];
  projectKeyInContext?: string;
  notificationsGlobalRef: RefObject<HTMLDivElement | null>;
  onMenuItemClick?: (event: React.SyntheticEvent<HTMLAnchorElement>) => void;
  /** The routed content area, rendered into the grid's main cell. */
  children: ReactNode;
};

/**
 * The chrome of the authenticated shell: the grid, the AppBar and the NavBar.
 *
 * Extracted from `ApplicationShellAuthenticated` so the chrome can be composed
 * either below the locale boundary (today) or above it, without duplicating
 * this tree. The content area is passed in as `children` because that is the
 * part that differs between the two compositions.
 */
export const ShellLayout = (props: TShellLayoutProps) => {
  const {
    isLoadingUser,
    isLoadingLocaleData,
    locale,
    normalizedUser,
    applicationEnvironment,
    projectKeyInContext,
    notificationsGlobalRef,
  } = props;

  return (
    <>
      {/* The splitter's Suspense fallback renders these same
    children, so this mark is written on the fallback pass and
    does not wait for the lazy chunk to download. */}
      <PerformanceMark mark={PERFORMANCE_MARKS.SHELL_CHROME_MOUNTED} />
      <ThemeSwitcher />
      {/* NOTE: the requests in flight loader will render a loading
    spinner into the AppBar. */}
      <RequestsInFlightLoader />
      <SentryUserTracker user={normalizedUser ?? undefined} />
      <div
        css={css`
          height: 100vh;
          display: grid;
          grid-template-rows: auto ${DIMENSIONS.header} 1fr;
          grid-template-columns: min-content 1fr;
        `}
      >
        <div
          ref={notificationsGlobalRef}
          role="region"
          aria-live="polite"
          css={css`
            grid-row: 1;
            grid-column: 1/3;
          `}
        >
          <div id="above-top-navigation" />
          <NotificationsList domain={DOMAINS.GLOBAL} />
        </div>

        <header
          css={css`
            grid-row: '2/3';
            grid-column: '2/3';
          `}
        >
          <AppBar user={normalizedUser} projectKey={projectKeyInContext} />
        </header>

        <aside
          css={css`
            grid-column: 1/2;
            grid-row: 2/4;
            overflow: hidden;
          `}
        >
          {(() => {
            // The <NavBar> should only be rendered within a project
            // context, therefore when there is a `projectKey`.
            // On `/account` routes there is none, so we don't render it.
            // NOTE: for paths that run in a project context without
            // carrying the `projectKey` in the URL (e.g. `/agent-sphere`),
            // the key is resolved from the previously used project.
            if (!projectKeyInContext) return null;
            return (
              <FetchProject projectKey={projectKeyInContext}>
                {({ isLoading: isLoadingProject, project }) => {
                  const isLoading =
                    isLoadingUser ||
                    isLoadingLocaleData ||
                    isLoadingProject ||
                    !locale ||
                    !project;

                  return (
                    <ApplicationContextProvider
                      user={normalizedUser}
                      environment={applicationEnvironment}
                      // NOTE: do not pass the `project` into the application context.
                      // The permissions for the Navbar are resolved separately, within
                      // a different React context.
                    >
                      <NavBar
                        applicationLocale={locale}
                        projectKey={projectKeyInContext}
                        project={project}
                        environment={applicationEnvironment}
                        onMenuItemClick={props.onMenuItemClick}
                        isLoading={isLoading}
                      />
                    </ApplicationContextProvider>
                  );
                }}
              </FetchProject>
            );
          })()}
        </aside>

        {props.children}
      </div>
    </>
  );
};
ShellLayout.displayName = 'ShellLayout';

export default ShellLayout;
