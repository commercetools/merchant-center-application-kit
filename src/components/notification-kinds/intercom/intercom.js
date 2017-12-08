import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { DOMAINS } from '@commercetools-local/constants';
import Notification from '@commercetools-local/core/components/notification';
// import { updateUser } from '../../../../actions/user';
// import { setupIntercom } from '../../../../utils/tracking';
import styles from './intercom.mod.css';

const messages = defineMessages({
  title: {
    id: 'GlobalNotification.title',
    description:
      'User logs in for first time and needs to opt-in/opt-out of intercom tracking / Appears for first-time users',
    defaultMessage:
      'In order to constantly improve the Merchant Center experience, we use the {linkToIntercom} analytics services. You can {link} of having this information collected anytime.',
  },
  optOutLink: {
    id: 'GlobalNotification.optOutLink',
    description: 'Text for the "opt-out" action.',
    defaultMessage: 'opt-out',
  },
});

class IntercomNotification extends React.PureComponent {
  static displayName = 'IntercomNotification';

  static propTypes = {
    dismiss: PropTypes.func.isRequired,
    notification: PropTypes.shape({
      id: PropTypes.number.isRequired,
      kind: PropTypes.oneOf(['intercom']).isRequired,
      domain: PropTypes.oneOf([DOMAINS.GLOBAL]).isRequired,
    }),
  };

  static contextTypes = {
    store: PropTypes.object,
  };

  optOutIntercom = () => {
    // this.context.store.dispatch(
    //   updateUser({ tracking_intercom: 'Inactive' }, error => {
    //     if (error) return;
    //     setupIntercom('shutdown');
    //   })
    // );
    this.props.dismiss();
  };

  handleClose = () => {
    // this.context.store.dispatch(
    //   updateUser({ tracking_intercom: 'Active' }, error => {
    //     if (error) return;
    //     setupIntercom('update');
    //   })
    // );
    this.props.dismiss();
  };

  render() {
    return (
      <Notification
        type="info"
        onCloseClick={this.handleClose}
        domain={this.props.notification.domain}
      >
        <FormattedMessage
          {...messages.title}
          values={{
            linkToIntercom: (
              <a
                className={styles.underline}
                href="https://www.intercom.io"
                target="_blank"
                rel="noreferrer noopener"
              >
                {'Intercom'}
              </a>
            ),
            link: (
              <span className={styles.link} onClick={this.optOutIntercom}>
                <FormattedMessage {...messages.optOutLink} />
              </span>
            ),
          }}
        />
      </Notification>
    );
  }
}

export default IntercomNotification;
