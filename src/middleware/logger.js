import { createLogger } from 'redux-logger';
import * as constants from '@commercetools-local/constants';
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '@commercetools-local/notifications';

export const actionTransformer = action =>
  action &&
  action.type === constants.__LOCAL &&
  action.payload &&
  action.payload.type
    ? {
        ...action.payload,
        type: `LOCAL/${action.meta.plugin}/${action.payload.type}`,
      }
    : action;

const loggerMiddleware = createLogger({
  actionTransformer,
  collapsed: true,
  colors: {
    title: action =>
      /^LOCAL($|\/.*)/.test(action.type) ? '#FFA500' : '#000000',
    prevState: () => '#9E9E9E',
    action: () => '#03A9F4',
    nextState: () => '#4CAF50',
    error: () => '#F20404',
  },
  diff: true,
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
        const ignoredKinds = ['intercom', 'api-error', 'unexpected-error'];
        return !ignoredKinds.includes(payload.kind);
      }
      case constants.__LOCAL:
        return (
          payload &&
          (typeof payload.type === 'string' &&
            !payload.type.startsWith('@@redux-form'))
        );
      default:
        return true;
    }
  },
});

export default loggerMiddleware;
