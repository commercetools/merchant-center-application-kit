import { showUnexpectedErrorNotification } from '@commercetools-frontend/actions-global';
import { boot as bootSentry } from '@commercetools-frontend/sentry';
import internalReduxStore from '../../configure-store';

// Ensure to initialize Sentry as soon as possible, so that we have the chance
// of catching possible errors.
bootSentry();

export default function setupGlobalErrorListener() {
  // Capture unhandled errors generated from rejected Promises.
  //
  // http://www.2ality.com/2016/04/unhandled-rejections.html
  // https://docs.getsentry.com/hosted/clients/javascript/usage/#promises
  //
  // Note: this currently works only in Chrome, and it might not be needed.
  // We just keep it here as a nice-to-have thing.
  window.addEventListener('unhandledrejection', event => {
    if (process.env.NODE_ENV !== 'production')
      // eslint-disable-next-line no-console
      console.warn(
        'An uncaught promise has been rejected and not properly ' +
          'handled. This is most likely a bug in the software. Please ensure ' +
          'that the promise is correctly handled.'
      );
    internalReduxStore.dispatch(
      showUnexpectedErrorNotification({ error: { message: event.reason } })
    );
  });

  // Capture normal global errors coming from non Promise code.
  window.addEventListener('error', errorEvent => {
    internalReduxStore.dispatch(
      showUnexpectedErrorNotification({ error: errorEvent })
    );
  });
}
