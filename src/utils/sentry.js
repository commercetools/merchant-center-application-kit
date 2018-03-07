import Raven from 'raven-js';

export const boot = () => {
  if (window.app.env === 'production')
    Raven.config(window.app.tracking.sentry, {
      release: window.app.revision,
      tags: { role: 'frontend' },
      environment: window.app.env,
    }).install();
};

export const updateUser = user => {
  if (user && window.app.env === 'production')
    Raven.setUserContext({
      email: user.email,
      id: user.id,
    });
};

export const stopTrackingUser = () => {
  if (window.app.env === 'production') Raven.setUserContext();
};

// NOTE: only exported for tests => use reportError below for your code
export const createErrorReporter = (
  environment,
  debugLogger = console,
  productionLogger = Raven
) => error => {
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
      productionLogger.captureException(error);
    } else {
      productionLogger.captureMessage(error);
    }

    // Generate a unique ID referring to the last generated Sentry error
    const errorId = productionLogger.lastEventId();

    // The error stack should be available in Sentry, so there is no
    // need to print it in the console as well.
    // We just notify that an error occurred and provide the error ID.
    debugLogger.error(`[SENTRY]: An error occured (ID: ${errorId}).`);
  } else if (environment === 'development') {
    debugLogger.error('[SENTRY]:', error);
  }
};

export const reportError = createErrorReporter(
  window.app.env || process.env.NODE_ENV
);
