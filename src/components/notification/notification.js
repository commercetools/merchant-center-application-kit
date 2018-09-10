import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName, getDisplayName } from 'recompose';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import {
  CloseBoldIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  SuccessIcon,
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

  return <SuccessIcon theme={props.theme} />;
};
NotificationIcon.displayName = 'NotificationIcon';
NotificationIcon.propTypes = {
  type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
  theme: PropTypes.string.isRequired,
};

export class Notification extends React.PureComponent {
  static displayName = 'Notification';

  static propTypes = {
    type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
    domain: PropTypes.oneOf(Object.values(DOMAINS)).isRequired,
    onCloseClick: PropTypes.func,
    fixed: PropTypes.bool,
    children: PropTypes.node,

    // HoC
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    fixed: false,
  };

  static contextTypes = {
    store: PropTypes.object,
  };

  render() {
    return (
      <div
        className={classnames(
          styles[
            `notification-${this.props.domain}-${this.props.type}-${
              this.props.fixed ? 'fixed' : 'dynamic'
            }`
          ]
        )}
        {...filterDataAttributes(this.props)}
      >
        <div className={styles.content}>{this.props.children}</div>
        {this.props.onCloseClick ? (
          <IconButton
            label={this.props.intl.formatMessage(messages.hideNotification)}
            onClick={this.props.onCloseClick}
            icon={<CloseBoldIcon />}
            size="medium"
          />
        ) : null}
        <div
          className={
            this.props.domain === DOMAINS.SIDE
              ? classnames(
                  styles['icon-type-container'],
                  styles[`icon-type-container--${this.props.type}`]
                )
              : styles.hidden
          }
        >
          <NotificationIcon type={this.props.type} theme="white" />
        </div>
      </div>
    );
  }
}

export default compose(
  setDisplayName(getDisplayName(Notification)),
  injectIntl
)(Notification);
