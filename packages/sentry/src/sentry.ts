import type { ApplicationWindow } from '@commercetools-frontend/constants';
import type { Extra, Extras } from '@sentry/types';

import * as Sentry from '@sentry/browser';
declare let window: ApplicationWindow;

type ReportableEvent = ErrorEvent | PromiseRejectionEvent;
type Reportable = Error | ReportableEvent | string;

const makeErrorToCapture = (error: Error | ReportableEvent) => {
  if (error instanceof Error) return error;
  if (error instanceof ErrorEvent) return new Error(error.message);
  return new Error(
    JSON.stringify(error.reason || 'Unhandled rejection without a reason')
  );
};

const sendErrorToSentry = (error: Reportable) => {
  if (typeof error === 'string') return Sentry.captureMessage(error);
  const errorToCapture = makeErrorToCapture(error);
  return Sentry.captureException(errorToCapture);
};

export const boot = () => {
  if (window.app.trackingSentry) {
    Sentry.init({
      dsn: window.app.trackingSentry,
      release: window.app.revision,
      environment: `${window.app.env}-${window.app.location}`,
      // in order to reduce the noise in sentry we only track errors that come
      // from our code and ignore errors that come from other services
      // https://blog.sentry.io/2017/03/27/tips-for-reducing-javascript-error-noise.html
      allowUrls: [window.app.cdnUrl, window.app.frontendHost],
      // we don't need default Sentry's global handlers, because we  add default ones
      integrations: [
        new Sentry.Integrations.GlobalHandlers({
          onunhandledrejection: false,
          onerror: false,
        }),
      ],
    });
    Sentry.configureScope((scope) => {
      scope.setTag('role', 'frontend');
    });
  }
};

const isExtraAsObject = (
  extrasOrExtra: Extra | Extras
): extrasOrExtra is Extras => typeof extrasOrExtra === 'object';

export const reportErrorToSentry = (
  error: Reportable,
  extraInfo?: { extra?: Extra | Extras },
  getIsEnabled?: () => boolean
): string | undefined => {
  const isEnabled = getIsEnabled
    ? getIsEnabled()
    : Boolean(window.app.trackingSentry);

  if (typeof error === 'string' && !isEnabled) {
    console.warn(
      '[SENTRY]: You called "reportErrorToSentry" with a string argument. ' +
        '"Error" objects should be preferred so that a stack-trace can be made available in Sentry. ' +
        'See: https://docs.sentry.io/clients/javascript/usage/#try-catch'
    );
  }

  if (isEnabled) {
    if (extraInfo?.extra) {
      if (isExtraAsObject(extraInfo.extra)) {
        // See https://docs.sentry.io/platforms/javascript/react/
        Sentry.setExtras(extraInfo.extra);
      } else {
        Sentry.setExtra('extra', extraInfo.extra);
      }
    }
    // Generate a unique ID referring to the last generated Sentry error
    const errorId = sendErrorToSentry(error);

    // The error stack should be available in Sentry, so there is no
    // need to print it in the console as well.
    // We just notify that an error occurred and provide the error ID.
    console.error(`[SENTRY]: An error occured (ID: ${errorId}).`);
    return errorId;
  }

  console.error('[SENTRY]:', error);
  return undefined;
};
