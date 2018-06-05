import React from 'react';
import PropTypes from 'prop-types';
import { DOMAINS } from '@commercetools-local/constants';
import Notification from '../../notification';

const GenericNotification = props => (
  <Notification
    type={props.notification.kind}
    onCloseClick={props.dismiss}
    domain={props.notification.domain}
  >
    {props.notification.text}
  </Notification>
);

GenericNotification.displayName = 'GenericNotification';
GenericNotification.propTypes = {
  dismiss: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    kind: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
    domain: PropTypes.oneOf(Object.values(DOMAINS)).isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default GenericNotification;
