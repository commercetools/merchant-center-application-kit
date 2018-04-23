import Raven from 'raven-js';

export const boot = () => {
  if (window.app.env === 'production')
    Raven.config(window.app.tracking.sentry, {
      release: window.app.revision,
      tags: { role: 'frontend' },
      environment: window.app.env,
      // in order to reduce the noise in sentry we only track errors that come
      // from our code and ignore errors that come from e.g. intercom
      // https://blog.sentry.io/2017/03/27/tips-for-reducing-javascript-error-noise.html
      whitelistUrls: [window.app.cdnUrl, window.app.frontendHost],
    }).install();
};

export const updateUser = user => {
  if (user && window.app.env === 'production') {
    // to avoid sending personal data to sentry we anonymize the email address
    // by only sending the domain part or the email
    const emailTld = user.email.split('@')[1];
    Raven.setUserContext({
      email: `xxx@${emailTld}`,
      id: user.id,
    });
  }
};

export const stopTrackingUser = () => {
  if (window.app.env === 'production') Raven.setUserContext();
};

// NOTE: only exported for tests => use reportError below for your code
export const createSentryErrorReporter = (
  environment,
  debugLogger = console,
  productionLogger = Raven
) => (error, extraInfo) => {
  if (error instanceof Error === false && environment === 'development') {
    debugLogger.warn(
      '[SENTRY]: You called "sentry.reportError" with an argument that is not an instance of "Error". ' +
        '"Error" should be preferred so that a stack-trace can be made available in sentry. ' +
        'See: https://docs.sentry.io/clients/javascript/usage/#try-catch'
    );
  }

  if (environment === 'production') {
    // logs error to sentry
    if (error instanceof Error) {
      productionLogger.captureException(error, extraInfo);
    } else {
      productionLogger.captureMessage(error, extraInfo);
    }

    // Generate a unique ID referring to the last generated Sentry error
    const errorId = productionLogger.lastEventId();

    // The error stack should be available in Sentry, so there is no
    // need to print it in the console as well.
    // We just notify that an error occurred and provide the error ID.
    debugLogger.error(`[SENTRY]: An error occured (ID: ${errorId}).`);
  } else {
    debugLogger.error('[SENTRY]:', error);
  }
};

export const reportErrorToSentry = createSentryErrorReporter(
  window.app.env || process.env.NODE_ENV
);
