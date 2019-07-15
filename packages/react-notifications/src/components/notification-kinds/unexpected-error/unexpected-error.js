import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DOMAINS } from '@commercetools-frontend/constants';
import apiErrorMessages from '../api-error-message/messages';
import Notification from '../../notification';

const UnexpectedErrorNotification = props => (
  <Notification
    type="error"
    domain={props.notification.domain}
    onCloseClick={props.dismiss}
  >
    <FormattedMessage {...apiErrorMessages.General} />
    {props.notification.values.errorId && <br />}
    {props.notification.values.errorId && (
      <span>{`ID (${props.notification.values.errorId})`}</span>
    )}
  </Notification>
);
UnexpectedErrorNotification.displayName = 'UnexpectedErrorNotification';
UnexpectedErrorNotification.propTypes = {
  dismiss: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    domain: PropTypes.oneOf([DOMAINS.PAGE]).isRequired,
    kind: PropTypes.oneOf(['unexpected-error']).isRequired,
    values: PropTypes.shape({ errorId: PropTypes.string }),
  }),
};

export default UnexpectedErrorNotification;
