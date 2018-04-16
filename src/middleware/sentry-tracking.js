/* global process */
import Raven from 'raven-js';
import { ADD_NOTIFICATION } from '@commercetools-local/notifications';
import logger from '@commercetools-local/utils/logger';

// Note: this middleware should be placed before the middleware that
// handles the notifications.
export default () => next => action => {
  if (!action) return next(action);

  if (
    action.type === ADD_NOTIFICATION &&
    action.payload.kind === 'unexpected-error'
  ) {
    const {
      meta: { error },
    } = action;

    // Check that the `error` is set
    if (!error && process.env.NODE_ENV !== 'production')
      logger.error('Missing error object when dispatching unexpected error.');

    if (process.env.NODE_ENV !== 'production') return next(action);

    // Send the error to Sentry
    Raven.captureException(error);
    // Generate a unique ID referring to the last generated Sentry error
    const errorId = Raven.lastEventId();

    // The error stack should be available in Sentry, so there is no
    // need to print it in the console as well.
    // We just notify that an error occured and provide the error ID.
    logger.error(`An error occured (ID: ${errorId}).`);

    // Inject the generated errorId into the notification values,
    // in order to display it in the notification message.
    return next({
      ...action,
      payload: {
        ...action.payload,
        values: {
          ...action.payload.values,
          errorId,
        },
      },
    });
  }
  return next(action);
};
