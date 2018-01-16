/* global process */
import logger from '@commercetools-local/utils/logger';

export const unwrapError = eventOrMessage =>
  eventOrMessage
    ? eventOrMessage.error || eventOrMessage
    : new Error('unknown-error');

export default function setupGlobalErrorListener(dispatchError) {
  // Capture unhandled errors generated from rejected Promises.
  //
  // http://www.2ality.com/2016/04/unhandled-rejections.html
  // https://docs.getsentry.com/hosted/clients/javascript/usage/#promises
  //
  // Note: this currently works only in Chrome, and it might not be needed.
  // We just keep it here as a nice-to-have thing.
  window.addEventListener('unhandledrejection', event => {
    if (process.env.NODE_ENV !== 'production')
      logger.warn(
        'An uncaught promise has been rejected and not properly ' +
          'handled. This is most likely a bug in the software. Please ensure ' +
          'that the promise is correctly handled.'
      );
    dispatchError(event.reason);
  });

  // Capture normal global errors coming from non Promise code.
  // We have to unwrap the error as the MDN docs state that
  // `onerror` will either be invoked with an event or message.
  window.addEventListener('error', eventOrMessage => {
    dispatchError(unwrapError(eventOrMessage));
  });
}
