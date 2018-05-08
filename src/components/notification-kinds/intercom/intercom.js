import PropTypes from 'prop-types';
import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import { GRAPHQL_TARGETS, DOMAINS } from '@commercetools-local/constants';
import Notification from '@commercetools-local/core/components/notification';
import { injectConfiguration } from '@commercetools-local/core/components/configuration';
import { INTERCOM_TRACKING_STATUS } from '../../../constants';
import ChangeIntercomStatus from './intercom.graphql';
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

export class IntercomNotification extends React.PureComponent {
  static displayName = 'IntercomNotification';

  static propTypes = {
    dismiss: PropTypes.func.isRequired,
    notification: PropTypes.shape({
      id: PropTypes.number.isRequired,
      kind: PropTypes.oneOf(['intercom']).isRequired,
      domain: PropTypes.oneOf([DOMAINS.GLOBAL]).isRequired,
    }),
    showUnexpectedErrorNotification: PropTypes.func.isRequired,
    // Injected
    changeIntercomStatus: PropTypes.func.isRequired,
    environmentName: PropTypes.string.isRequired,
  };

  handleMutationError = error => {
    // Show an error message
    // The fn also logs to sentry using the sentry-tracking middleware
    this.props.showUnexpectedErrorNotification({ error });
  };

  handleOptOutLinkClick = () => {
    this.props
      .changeIntercomStatus({
        variables: {
          target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
          status: INTERCOM_TRACKING_STATUS.inactive,
        },
      })
      .then(() => {
        this.props.dismiss();
        // no need to shut down intercom manually since the users intercom
        // tracking status was pending before this notification was shown
        // intercom never got booted in the first place
      })
      .catch(error => this.handleMutationError(error));
  };

  handleCloseNotification = () => {
    this.props
      .changeIntercomStatus({
        variables: {
          target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
          status: INTERCOM_TRACKING_STATUS.active,
        },
      })
      .then(() => {
        this.props.dismiss();
      })
      .catch(error => this.handleMutationError(error));
  };

  render() {
    return (
      <Notification
        type="info"
        onCloseClick={this.handleCloseNotification}
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
              <span
                className={styles.link}
                onClick={this.handleOptOutLinkClick}
              >
                <FormattedMessage {...messages.optOutLink} />
              </span>
            ),
          }}
        />
      </Notification>
    );
  }
}

export default compose(
  graphql(ChangeIntercomStatus, { name: 'changeIntercomStatus' }),
  injectConfiguration(['env'], 'environmentName')
)(IntercomNotification);
