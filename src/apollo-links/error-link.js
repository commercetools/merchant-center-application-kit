import { onError } from 'apollo-link-error';
import {
  STATUS_CODES,
  LOGOUT_REASONS,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';

/* eslint-disable import/prefer-default-export */
// Checks response from GraphQL in order to scan 401 errors and redirect the
// user to the login page resetting the store and showing the proper message
export const createErrorLink = ({ history, storage }) =>
  onError(({ networkError }) => {
    const token = storage.get(CORE_STORAGE_KEYS.TOKEN);

    if (
      networkError &&
      networkError.statusCode === STATUS_CODES.UNAUTHORIZED &&
      token
    )
      history.push(`/logout?reason=${LOGOUT_REASONS.UNAUTHORIZED}`);
  });
