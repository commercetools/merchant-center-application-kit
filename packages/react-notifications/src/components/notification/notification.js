import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames';
import {
  CloseBoldIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CheckBoldIcon,
  IconButton,
} from '@commercetools-frontend/ui-kit';
import { DOMAINS } from '@commercetools-frontend/constants';
import filterDataAttributes from '../../utils/filter-data-attributes';
import styles from './notification.mod.css';
import messages from './messages';

const NotificationIcon = props => {
  if (props.type === 'error') return <ErrorIcon color={props.color} />;
  if (props.type === 'info') return <InfoIcon color={props.color} />;
  if (props.type === 'warning') return <WarningIcon color={props.color} />;

  return <CheckBoldIcon color={props.color} />;
};
NotificationIcon.displayName = 'NotificationIcon';
NotificationIcon.propTypes = {
  type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
  color: PropTypes.string.isRequired,
};

const Notification = props => (
  <div
    className={classnames(
      styles[
        `notification-${props.domain}-${props.type}-${
          props.fixed ? 'fixed' : 'dynamic'
        }`
      ]
    )}
    {...filterDataAttributes(props)}
  >
    <div className={styles.content}>{props.children}</div>
    {props.onCloseClick ? (
      <div>
        <FormattedMessage {...messages.hideNotification}>
          {label => (
            <IconButton
              label={label}
              onClick={props.onCloseClick}
              icon={<CloseBoldIcon />}
              size="medium"
            />
          )}
        </FormattedMessage>
      </div>
    ) : null}
    <div
      className={
        props.domain === DOMAINS.SIDE
          ? classnames(
              styles['icon-type-container'],
              styles[`icon-type-container--${props.type}`]
            )
          : styles.hidden
      }
    >
      <NotificationIcon type={props.type} color="surface" />
    </div>
  </div>
);
Notification.displayName = 'Notification';
Notification.propTypes = {
  type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
  domain: PropTypes.oneOf(Object.values(DOMAINS)).isRequired,
  onCloseClick: PropTypes.func,
  fixed: PropTypes.bool,
  children: PropTypes.node,
};
Notification.defaultProps = {
  fixed: false,
};

export default Notification;
