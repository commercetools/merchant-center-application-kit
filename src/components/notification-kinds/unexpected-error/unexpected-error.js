import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DOMAINS } from '@commercetools-local/constants';
import apiErrorMessages from '../api-error-message/messages';
import Notification from '../../notification';

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

  render() {
    return (
      <Notification
        type="error"
        domain={this.props.notification.domain}
        onCloseClick={this.props.dismiss}
      >
        <FormattedMessage {...apiErrorMessages.General} />
        {this.props.notification.values.errorId && <br />}
        {this.props.notification.values.errorId && (
          <span>{`ID (${this.props.notification.values.errorId})`}</span>
        )}
      </Notification>
    );
  }
}

export default UnexpectedErrorNotification;
