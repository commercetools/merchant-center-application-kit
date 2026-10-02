import {
  JSX,
  type ReactNode,
  type RefObject,
  type SyntheticEvent,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import type { ApolloError } from '@apollo/client/errors';
import type { TFlags } from '@flopflip/types';
import { useLocation } from 'react-router-dom';
import {
  ApplicationContextProvider,
  useApplicationContext,
  selectUserLanguageFromStorage,
  type TApplicationContext,
} from '@commercetools-frontend/application-shell-connectors';
import { DOMAINS, LOGOUT_REASONS } from '@commercetools-frontend/constants';
import type { TAsyncLocaleDataProps } from '@commercetools-frontend/i18n';
import { AsyncLocaleData } from '@commercetools-frontend/i18n';
import { NotificationsList } from '@commercetools-frontend/react-notifications';
import {
  reportErrorToSentry,
  SentryUserTracker,
} from '@commercetools-frontend/sentry';
import { DIMENSIONS } from '../../constants';
import { TFetchLoggedInUserQuery } from '../../types/generated/mc';
import {
  canPaintShell,
  PERFORMANCE_MARKS,
  resolveLocaleHint,
  selectProjectKeyInContext,
} from '../../utils';
import AppBar from '../app-bar';
import { getBrowserLocale } from '../application-shell-provider/utils';
import ApplicationShellSplitter from '../application-shell-splitter/application-shell-splitter.async';
import ConfigureIntlProvider from '../configure-intl-provider';
import ErrorApologizer from '../error-apologizer';
import FetchProject from '../fetch-project';
import FetchUser from '../fetch-user';
import NavBar from '../navbar';
import PerformanceMark from '../performance-mark';
import RedirectToLogout from '../redirect-to-logout';
import RememberUserLanguage from '../remember-user-language';
import RequestsInFlightLoader from '../requests-in-flight-loader';
import SetupFlopFlipProvider from '../setup-flop-flip-provider';
import ThemeSwitcher from '../theme-switcher';
import ShellMainContent, { MainContainer } from './shell-main-content';

type TApplicationShellAuthenticationProps = {
  featureFlags?: TFlags;
  defaultFeatureFlags?: TFlags;
  applicationMessages: TAsyncLocaleDataProps['applicationMessages'];
  onMenuItemClick?: (event: SyntheticEvent<HTMLAnchorElement>) => void;
  disableRoutePermissionCheck?: boolean;
  render?: () => JSX.Element;
  children?: ReactNode;
};

const getHasUnauthorizedError = (graphQLErrors: ApolloError['graphQLErrors']) =>
  graphQLErrors.find(
    (gqlError) =>
      gqlError.extensions &&
      gqlError.extensions.code &&
      gqlError.extensions.code === 'UNAUTHENTICATED'
  );
const getHasUserBeenDeletedError = (
  graphQLErrors: ApolloError['graphQLErrors']
) =>
  graphQLErrors.find(
    (gqlError) =>
      gqlError.message &&
      // NOTE: The CTP API does not provide an error code in this case.
      gqlError.message.includes('was not found.')
  );

/**
 * This component is rendered whenever the user is considered "authenticated"
 * and contains the "restricted" application part.
 */

export const ApplicationShellAuthenticated = (
  props: TApplicationShellAuthenticationProps
) => {
  /*
    Catalogue locale guessed before `FetchLoggedInUser` resolves
    `user.language`, so the i18n load can start without waiting for it. Why the
    remembered language beats the browser tag, and why it is not mapped, is on
    `resolveLocaleHint`.

    Resolved once per mount. Re-reading it per render would let a stored value
    written mid-session move the hint out from under a load already in flight.
  */
  const [localeHint] = useState(resolveLocaleHint);
  /*
    The first paint waits for the user's own catalogue, so a wrong guess never
    shows up as content in the wrong language. On a hit this costs nothing —
    the guessed catalogue *is* the user's. On a miss it falls back to what the
    shell did before this optimisation: one catalogue load on the skeleton.

    Only the first paint. Later locale changes keep the previous pair on screen
    instead, which is what stops the shell unmounting behind a blank page.
  */
  const hasPaintedShell = useRef(false);
  const applicationEnvironment = useApplicationContext(
    (context) => context.environment
  ) as TApplicationContext<{}>['environment'];
  // TODO: using this hook will subscribe the component to route updates.
  // This is currently useful for detecting a change in the project key
  // from URL ("/" --> "/:projectKey").
  // However, every route change will trigger a re-render. This is probably
  // ok-ish but we might want to look into a more performant solution.
  const location = useLocation();

  const notificationsGlobalRef = useRef<HTMLDivElement>(null);
  const notificationsPageRef = useRef<HTMLDivElement>(null);
  const layoutRefs = useRef<{
    notificationsGlobalRef: RefObject<HTMLDivElement | null>;
    notificationsPageRef: RefObject<HTMLDivElement | null>;
  }>({
    notificationsGlobalRef,
    notificationsPageRef,
  });

  return (
    <FetchUser>
      {({ isLoading: isLoadingUser, user, error }) => {
        if (error) {
          // In case there is an unauthorized error, we redirect to the login page
          if (error.graphQLErrors && Array.isArray(error.graphQLErrors)) {
            const hasUnauthorizedError = getHasUnauthorizedError(
              error.graphQLErrors
            );
            const hasUserBeenDeletedError = getHasUserBeenDeletedError(
              error.graphQLErrors
            );

            if (hasUnauthorizedError || hasUserBeenDeletedError) {
              let logoutReason:
                | (typeof LOGOUT_REASONS)[keyof typeof LOGOUT_REASONS]
                | undefined;
              if (hasUnauthorizedError)
                logoutReason = LOGOUT_REASONS.UNAUTHORIZED;
              else if (hasUserBeenDeletedError)
                logoutReason = LOGOUT_REASONS.DELETED;
              return <RedirectToLogout reason={logoutReason} />;
            }
          }
          // Since we do not know the locale of the user, we pick it from the
          // user's browser to attempt to match the language for the correct translations.

          const userLocale = getBrowserLocale(window);

          return (
            <AsyncLocaleData
              locale={userLocale}
              applicationMessages={props.applicationMessages}
            >
              {({ locale, messages }) => {
                reportErrorToSentry(error, {});
                return (
                  <ConfigureIntlProvider locale={locale} messages={messages}>
                    <ErrorApologizer />
                  </ConfigureIntlProvider>
                );
              }}
            </AsyncLocaleData>
          );
        }

        // Check if user is ct staff, and if so get language selected via staff bar from local storage
        const staffBarLanguage =
          user?.launchdarklyTrackingGroup === 'commercetools' ||
          user?.launchdarklyTrackingGroup === 'mailosaur'
            ? selectUserLanguageFromStorage()
            : undefined;

        const normalizedUser: TFetchLoggedInUserQuery['user'] | undefined = user
          ? {
              ...user,
              // set the staff bar language if applicable
              language: staffBarLanguage ?? user.language,
            }
          : undefined;

        const projectKeyInContext = selectProjectKeyInContext({
          pathname: location.pathname,
          defaultProjectKeyOfUser:
            normalizedUser?.defaultProjectKey ?? undefined,
        });

        return (
          <ApplicationContextProvider
            user={normalizedUser}
            environment={applicationEnvironment}
          >
            {/*
            NOTE: we do not want to load the locale data as long as we do not
            know the user setting. This is important in order to avoid flashing
            of translated content on subsequent re-renders.
            Therefore, as long as there is no locale, the children should consider using the
            `isLoading` prop to decide what to render.
          */}
            <AsyncLocaleData
              // Parse-time hint so the catalogue load does not wait on
              // `FetchLoggedInUser`. `user.language` replaces it on arrival.
              // The hint is mapped to a catalogue locale first: unlike
              // `user.language` it is an arbitrary BCP-47 tag, and reporting
              // one (`en-US`) next to the catalogue it resolves to (`en`)
              // makes react-intl miss every message.
              locale={normalizedUser?.language ?? localeHint}
              applicationMessages={props.applicationMessages}
            >
              {({ isLoading: isLoadingLocaleData, locale, messages }) => {
                // `AsyncLocaleData` reports back the locale it was asked for,
                // so on a hint miss this is still the hint while the user's own
                // catalogue loads — the window the guess could be seen in.
                const canPaint = canPaintShell({
                  isLoadingLocaleData,
                  isLoadingUser,
                  loadedLocale: locale,
                  userLanguage: normalizedUser?.language,
                  hasPaintedShell: hasPaintedShell.current,
                });
                if (canPaint) hasPaintedShell.current = true;

                return (
                  <ConfigureIntlProvider
                    {...(canPaint ? { locale, messages } : {})}
                  >
                    <RememberUserLanguage language={user?.language} />
                    {/* Marked here rather than inside the
                  `ConfigureIntlProvider` implementation, because that component
                  also renders on the unauthenticated, Custom View and error
                  surfaces. */}
                    <PerformanceMark mark={PERFORMANCE_MARKS.INTL_READY} />
                    {/* Measured against `user.language`, not
                    `normalizedUser.language`: the latter carries the staff-bar
                    override, so every commercetools staff member using it would
                    register as a miss and skew a metric that is about real
                    users. */}
                    {user?.language ? (
                      <PerformanceMark
                        mark={
                          // Compared exactly, the same way the paint gate is:
                          // a bucket match would count `de` against `de-AT` as
                          // a hit while the gate still waits for the regional
                          // moment locale, inflating the number the cookie
                          // decision rests on.
                          localeHint === user.language
                            ? PERFORMANCE_MARKS.LOCALE_HINT_HIT
                            : PERFORMANCE_MARKS.LOCALE_HINT_MISS
                        }
                      />
                    ) : null}
                    <SetupFlopFlipProvider
                      user={normalizedUser}
                      projectKey={projectKeyInContext}
                      ldClientSideId={applicationEnvironment.ldClientSideId}
                      flags={props.featureFlags}
                      defaultFlags={props.defaultFeatureFlags}
                    >
                      <ApplicationShellSplitter locale={locale ?? 'en'}>
                        {/* The splitter's Suspense fallback renders these same
                      children, so this mark is written on the fallback pass and
                      does not wait for the lazy chunk to download. */}
                        <PerformanceMark
                          mark={PERFORMANCE_MARKS.SHELL_CHROME_MOUNTED}
                        />
                        <ThemeSwitcher />
                        {/* NOTE: the requests in flight loader will render a loading
                      spinner into the AppBar. */}
                        <RequestsInFlightLoader />
                        <SentryUserTracker user={normalizedUser} />
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
                            <AppBar
                              user={normalizedUser}
                              projectKey={projectKeyInContext}
                            />
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
                                  {({
                                    isLoading: isLoadingProject,
                                    project,
                                  }) => {
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
                                          onMenuItemClick={
                                            props.onMenuItemClick
                                          }
                                          isLoading={isLoading}
                                        />
                                      </ApplicationContextProvider>
                                    );
                                  }}
                                </FetchProject>
                              );
                            })()}
                          </aside>

                          <ShellMainContent
                            isLoadingUser={isLoadingUser}
                            isLoadingLocaleData={isLoadingLocaleData}
                            normalizedUser={normalizedUser}
                            applicationEnvironment={applicationEnvironment}
                            projectKeyInContext={projectKeyInContext}
                            notificationsPageRef={notificationsPageRef}
                            layoutRefs={layoutRefs}
                            disableRoutePermissionCheck={
                              props.disableRoutePermissionCheck
                            }
                            render={props.render}
                          >
                            {props.children}
                          </ShellMainContent>
                        </div>
                      </ApplicationShellSplitter>
                    </SetupFlopFlipProvider>
                  </ConfigureIntlProvider>
                );
              }}
            </AsyncLocaleData>
          </ApplicationContextProvider>
        );
      }}
    </FetchUser>
  );
};
ApplicationShellAuthenticated.displayName = 'ApplicationShellAuthenticated';

export default ApplicationShellAuthenticated;

export { MainContainer };
