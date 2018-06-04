import React from 'react';
import PropTypes from 'prop-types';
import { DOMAINS } from '@commercetools-local/constants';
import ApiError from '@commercetools-local/core/components/api-error';
import Notification from '@commercetools-local/core/components/notification';

class ApiErrorNotification extends React.PureComponent {
  static displayName = 'ApiErrorNotification';

  static propTypes = {
    dismiss: PropTypes.func.isRequired,
    notification: PropTypes.shape({
      id: PropTypes.number.isRequired,
      domain: PropTypes.oneOf([DOMAINS.PAGE]).isRequired,
      kind: PropTypes.oneOf(['api-error']).isRequired,
      values: PropTypes.shape({
        message: PropTypes.string,
        errors: PropTypes.arrayOf(
          PropTypes.shape({
            code: PropTypes.string.isRequired,
            message: PropTypes.string,
          })
        ),
      }),
    }),
  };

  renderApiErrors = errors => (
    <ul>
      {errors.map((error, idx) => {
        if (!error.code) {
          /**
           * NOTE: This is an API error which usually contains
           * a `code` property such as `DuplicateField` or `InvalidOperation`.
           * If this `code` does not exist the API is not conforming to its
           * own error specification.
           */
          if (process.env.NODE_ENV !== 'production')
            // eslint-disable-next-line no-console
            console.error('Unknown API error', error);

          if (error.message) return <li key={idx}>{error.message}</li>;
          return null;
        }
        return (
          <li key={idx}>
            <ApiError error={error} />
          </li>
        );
      })}
    </ul>
  );

  render() {
    return (
      <Notification
        type="error"
        domain={this.props.notification.domain}
        onCloseClick={this.props.dismiss}
      >
        {this.renderApiErrors(this.props.notification.values.errors)}
      </Notification>
    );
  }
}

export default ApiErrorNotification;
