import * as Sentry from '@sentry/react';
// eslint-disable-next-line import/order
import { globalHandlersIntegration } from '@sentry/browser'; // Must import after `@sentry/react`
import type { Extra, Extras, Event } from '@sentry/types';
import history from '@commercetools-frontend/browser-history';
import type { ApplicationWindow } from '@commercetools-frontend/constants';

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

type TReplacements = {
  [name: string]: string;
};
type TSource = {
  [name: string]: unknown;
};

const replaceEventValues = (
  source: TSource,
  replacements: TReplacements
): Event => {
  const replaceEventValue = (prop: string) => {
    source[prop] = replacements[prop];
  };

  for (const prop in source) {
    if (Object.prototype.hasOwnProperty.call(source, prop)) {
      const hasPropReplacement = Object.keys(replacements).includes(prop);

      switch (typeof source[prop]) {
        case 'string':
          if (hasPropReplacement) {
            replaceEventValue(prop);
          }

          break;
        case 'object':
          if (hasPropReplacement) {
            replaceEventValue(prop);
          } else {
            replaceEventValues(source[prop] as TSource, replacements);
          }

          break;
      }
    }
  }

  return source;
};

export const redactUnsafeEventFields = (event: Event) => {
  return replaceEventValues(event as TSource, {
    firstName: '[Redacted]',
    lastName: '[Redacted]',
    email: '[Redacted]',
  });
};

export const boot = () => {
  if (window.app.trackingSentry && window.app.trackingSentry !== 'null') {
    Sentry.init({
      dsn: window.app.trackingSentry,
      release: window.app.revision,
      environment: `${window.app.env}-${window.app.location}`,
      // In order to reduce the noise in sentry we only track errors that come
      // from our code and ignore errors that come from other services
      // https://blog.sentry.io/2017/03/27/tips-for-reducing-javascript-error-noise.html
      allowUrls: [window.app.cdnUrl, window.app.frontendHost],
      // suppress any resize observer errors, see
      // https://github.com/vercel/next.js/discussions/51551
      ignoreErrors: [
        /ResizeObserver loop (limit exceeded|completed with undelivered notifications)/i,
      ],
      integrations: [
        globalHandlersIntegration({
          onunhandledrejection: false,
          onerror: false,
        }),
        Sentry.reactRouterV5BrowserTracingIntegration({
          history,
        }),
      ],
      // Sending 5% of transactions. We can adjust that as we see a need to.
      // Generally we need to find a balance between performance and data volume.
      // If we need more flexible and dynamic way of gathering important samples,
      // we can implement the `tracesSampler` function.
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/sampling/#sampling-transaction-events
      tracesSampleRate: 0.05,
      beforeSend(event) {
        return redactUnsafeEventFields(event);
      },
    });
    const sentryScope = Sentry.getCurrentScope();
    sentryScope.setTag('role', 'frontend');
    sentryScope.setTag('applicationName', window.app.applicationName);
    sentryScope.setTag(
      'service',
      `merchant-center-frontend-${window.app.applicationName}`
    );
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
    } else if (error instanceof ErrorEvent) {
      Sentry.setExtras({
        filename: error.filename,
        lineno: error.lineno,
        colno: error.colno,
        error: error.error,
      });
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
