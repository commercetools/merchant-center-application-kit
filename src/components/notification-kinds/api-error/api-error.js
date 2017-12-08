import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DOMAINS } from '@commercetools-local/constants';
import ApiError, {
  messages,
} from '@commercetools-local/core/components/api-error';
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
        source: PropTypes.string,
        message: PropTypes.string,
        statusCode: PropTypes.number,
        body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      }),
    }),
  };

  static contextTypes = {
    intl: PropTypes.object,
    store: PropTypes.object,
  };

  renderApiError = notification => {
    const { values } = notification;

    if (
      typeof values.body === 'string' ||
      !{}.hasOwnProperty.call(values.body, 'errors') ||
      !Array.isArray(values.body.errors)
    )
      return <FormattedMessage {...messages.General} />;

    return (
      <ul>
        {values.body.errors.map((error, i) => {
          if (!error.code) {
            // There should not be a case like this, but if so
            // we log / report the error and don't show anything.
            if (process.env.NODE_ENV !== 'production')
              // eslint-disable-next-line no-console
              console.error('Unknown error', error);

            if (error.message) return <li key={i}>{error.message}</li>;
            return null;
          }
          return (
            <li key={i}>
              <ApiError error={error} />
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    return (
      <Notification
        type="error"
        domain={this.props.notification.domain}
        onCloseClick={this.props.dismiss}
      >
        {this.renderApiError(this.props.notification)}
      </Notification>
    );
  }
}

export default ApiErrorNotification;
