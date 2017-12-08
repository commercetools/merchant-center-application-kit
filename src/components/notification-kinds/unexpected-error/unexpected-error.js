import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DOMAINS } from '@commercetools-local/constants';
import { messages } from '@commercetools-local/core/components/api-error';
import Notification from '@commercetools-local/core/components/notification';

class UnexpectedErrorNotification extends React.PureComponent {
  static displayName = 'UnexpectedErrorNotification';

  static propTypes = {
    dismiss: PropTypes.func.isRequired,
    notification: PropTypes.shape({
      id: PropTypes.number.isRequired,
      domain: PropTypes.oneOf([DOMAINS.PAGE]).isRequired,
      kind: PropTypes.oneOf(['unexpected-error']).isRequired,
      values: PropTypes.shape({ errorId: PropTypes.string }),
    }),
  };

  static contextTypes = {
    intl: PropTypes.object,
    store: PropTypes.object,
  };

  render() {
    return (
      <Notification
        type="error"
        domain={this.props.notification.domain}
        onCloseClick={this.props.dismiss}
      >
        <FormattedMessage {...messages.General} />
        {this.props.notification.values.errorId && <br />}
        {this.props.notification.values.errorId && (
          <span>{`ID (${this.props.notification.values.errorId})`}</span>
        )}
      </Notification>
    );
  }
}

export default UnexpectedErrorNotification;
