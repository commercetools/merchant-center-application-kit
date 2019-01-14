import { createLogger } from 'redux-logger';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '@commercetools-frontend/notifications';
import logger from '../utils/logger';

const loggerMiddleware = createLogger({
  logger,
  collapsed: true,
  colors: {
    title: () => '#000000',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  },
  // WARNING: Enabling this option causes huge performance degradation.
  // Only enable if you want detailed debugging.
  diff: false,
  predicate: (getState, action) => {
    if (!action) return false;

    const { type, payload } = action;
    if (!type) return false;

    if (
      type.startsWith('SHOW_') ||
      type.startsWith('HIDE_') ||
      type.startsWith('APOLLO_')
    )
      return false;

    switch (type) {
      case REMOVE_NOTIFICATION:
        return false;
      case ADD_NOTIFICATION: {
        const ignoredKinds = ['api-error', 'unexpected-error'];
        return !ignoredKinds.includes(payload.kind);
      }
      default:
        return true;
    }
  },
});

export default loggerMiddleware;
