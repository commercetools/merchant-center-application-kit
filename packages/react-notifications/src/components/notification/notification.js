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
  if (props.type === 'error') return <ErrorIcon theme={props.theme} />;
  if (props.type === 'info') return <InfoIcon theme={props.theme} />;
  if (props.type === 'warning') return <WarningIcon theme={props.theme} />;

  return <CheckBoldIcon theme={props.theme} />;
};
NotificationIcon.displayName = 'NotificationIcon';
NotificationIcon.propTypes = {
  type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
  theme: PropTypes.string.isRequired,
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
      <NotificationIcon type={props.type} theme="white" />
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
