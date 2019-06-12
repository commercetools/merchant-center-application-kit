import * as Sentry from '@sentry/browser';

export const boot = () => {
  if (window.app.trackingSentry) {
    Sentry.init({
      dsn: window.app.trackingSentry,
      release: window.app.revision,
      environment: `${window.app.env}-${window.app.location}`,
      // in order to reduce the noise in sentry we only track errors that come
      // from our code and ignore errors that come from other services
      // https://blog.sentry.io/2017/03/27/tips-for-reducing-javascript-error-noise.html
      whitelistUrls: [window.app.cdnUrl, window.app.frontendHost],
    });
    Sentry.configureScope(scope => {
      scope.setTag('role', 'frontend');
    });
  }
};

export const reportErrorToSentry = (
  error: Error | string,
  extraInfo?: { extra?: object | string },
  getIsEnabled?: () => boolean
) => {
  const isEnabled = getIsEnabled ? getIsEnabled() : window.app.trackingSentry;

  if (error instanceof Error === false && !isEnabled) {
    console.warn(
      '[SENTRY]: You called "reportErrorToSentry" with an argument that is not an instance of "Error". ' +
        '"Error" should be preferred so that a stack-trace can be made available in sentry. ' +
        'See: https://docs.sentry.io/clients/javascript/usage/#try-catch'
    );
  }

  if (isEnabled) {
    // logs error to sentry
    Sentry.withScope(scope => {
      if (extraInfo && extraInfo.extra) {
        if (typeof extraInfo.extra === 'object') {
          // See https://docs.sentry.io/platforms/javascript/react/
          scope.setExtras(extraInfo.extra);
        } else {
          scope.setExtra('extra', extraInfo.extra);
        }
      }
      // Generate a unique ID referring to the last generated Sentry error
      const errorId =
        error instanceof Error
          ? Sentry.captureException(error)
          : Sentry.captureMessage(error);

      // The error stack should be available in Sentry, so there is no
      // need to print it in the console as well.
      // We just notify that an error occurred and provide the error ID.
      console.error(`[SENTRY]: An error occured (ID: ${errorId}).`);
    });
  } else {
    console.error('[SENTRY]:', error);
  }
};
