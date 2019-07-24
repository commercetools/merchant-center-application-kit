import React from 'react';
import PropTypes from 'prop-types';
import { DOMAINS } from '@commercetools-frontend/constants';
import Notification from '../../notification';
import ApiErrorMessage from '../api-error-message';

const ApiErrorNotification = props => (
  <Notification
    type="error"
    domain={props.notification.domain}
    onCloseClick={props.dismiss}
  >
    <ul>
      {props.notification.values.errors.map((error, idx) => {
        if (!error.code && process.env.NODE_ENV !== 'production') {
          /**
           * NOTE: This is an API error which usually contains
           * a `code` property such as `DuplicateField` or `InvalidOperation`.
           * If this `code` does not exist the API is not conforming to its
           * own error specification.
           */
          // eslint-disable-next-line no-console
          console.error('Unknown API error', error);
        }
        return (
          <li key={idx}>
            <ApiErrorMessage error={error} />
          </li>
        );
      })}
    </ul>
  </Notification>
);
ApiErrorNotification.displayName = 'ApiErrorNotification';
ApiErrorNotification.propTypes = {
  dismiss: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    domain: PropTypes.oneOf([DOMAINS.PAGE]).isRequired,
    kind: PropTypes.oneOf(['api-error']).isRequired,
    values: PropTypes.shape({
      errors: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.string,
          message: PropTypes.string,
        })
      ).isRequired,
    }),
  }),
};

export default ApiErrorNotification;
