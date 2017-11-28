import querystring from 'querystring';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose, withProps } from 'recompose';
import classnames from 'classnames';
import PrimaryButton from '@commercetools-local/ui-kit/buttons/primary-button';
import {
  LOGOUT_REASONS,
  STORAGE_KEYS as CORE_STORAGE_KEYS,
} from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import client from '@commercetools-local/utils/node-sdk';
import { injectConfiguration } from '@commercetools-local/core/components/configuration';
import Notification from '@commercetools-local/core/components/notification';
import Title from '@commercetools-local/core/components/title';
import InfoDialog from '@commercetools-local/core/components/overlays/info-dialog';
import PublicPageContainer from '../public-page-container';
import LoginBox from '../login-box';
import styles from './login.mod.css';
import messages from './messages';

export class Login extends React.PureComponent {
  static displayName = 'Login';

  static propTypes = {
    location: PropTypes.shape({
      // Can contain following params:
      // - `reason`
      // - `redirectTo`
      search: PropTypes.string,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,

    // Injected
    requestAccessToken: PropTypes.func.isRequired,
    adminCenterUrl: PropTypes.string.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    loading: false,
    email: null,
    password: null,
    countdown: 10,
    showRedirectDialog: null,
    shouldRedirectPasswordForgot: false,
    error: querystring.parse(this.props.location.search.substring(1)).reason,
  };

  componentDidMount = () => {
    this.email.focus();
  };

  componentWillReceiveProps = () => {
    if (
      this.state.error === LOGOUT_REASONS.NO_PROJECTS &&
      !this.state.showRedirectDialog
    )
      this.setState({
        showRedirectDialog: true,
        countdown: 10,
      });
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ loading: true });

    this.props
      .requestAccessToken({
        email: this.state.email,
        password: this.state.password,
      })
      .then(payload => {
        this.setState({ loading: false });
        storage.put(CORE_STORAGE_KEYS.TOKEN, payload.body.token);
        this.props.history.push(
          querystring.parse(this.props.location.search.substring(1))
            .redirectTo || '/'
        );
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: error.message.match(/invalid/i)
            ? LOGOUT_REASONS.INVALID
            : // Unknown error reason. Pass the actual error message.
              // TODO: should we expose this message?
              error.message,
        });
      });
  };

  handleInputChange = event => {
    const { target: { name, value } } = event;
    this.setState({ [name]: value });
  };
  handleKeyPress = event => {
    if (event.keyCode === 13) this.handleSubmit(event);
  };

  renderErrorMessage = () => {
    if (!this.state.error) return null;

    switch (this.state.error) {
      case LOGOUT_REASONS.NO_PROJECTS: {
        const link = (
          <a
            href={`${this.props.adminCenterUrl}/login`}
            target="_blank"
            className={styles.underline}
          >
            <FormattedMessage {...messages.noProjectsLink} />
          </a>
        );
        return (
          <Notification type="error" domain="side" fixed={true}>
            <FormattedMessage {...messages.noProjectsTitle} values={{ link }} />
          </Notification>
        );
      }
      case LOGOUT_REASONS.USER:
        return (
          <Notification type="success" domain="side" fixed={true}>
            <FormattedMessage {...messages.logout} />
          </Notification>
        );
      case LOGOUT_REASONS.UNAUTHORIZED:
        return (
          <Notification type="warning" domain="side" fixed={true}>
            <FormattedMessage {...messages.unauthorized} />
          </Notification>
        );
      case LOGOUT_REASONS.INVALID:
        return (
          <Notification type="error" domain="side" fixed={true}>
            <FormattedMessage {...messages.InvalidCredentials} />
          </Notification>
        );
      default:
        return (
          <Notification type="error" domain="side" fixed={true}>
            {this.state.error.message}
          </Notification>
        );
    }
  };

  renderForgotPasswordModal = () => {
    if (!this.state.shouldRedirectPasswordForgot) return null;

    return this.renderCountdownAlert(
      `${this.props.adminCenterUrl}/reset-password`,
      'forgotPassowordTitle',
      'forgotPassowordSubtitle'
    );
  };

  renderCountdownAlert = (redirectTo, titleKey, subtitleKey) => {
    if (this.state.countdown === 0) {
      clearInterval(this.interval);
      window.location = redirectTo;
    }

    if (this.state.countdown === 10)
      this.interval = setInterval(this.tickCountdown, 1000);

    return (
      <InfoDialog
        isOpen={true}
        overlayClassName={styles.overlay}
        onClose={this.closeRedirectDialog}
      >
        <InfoDialog.Title>
          <FormattedMessage {...messages[titleKey]} />
        </InfoDialog.Title>
        <InfoDialog.Body>
          <FormattedMessage
            {...messages[subtitleKey]}
            values={{ countdown: this.state.countdown }}
          />
        </InfoDialog.Body>
      </InfoDialog>
    );
  };

  redirectToForgotPassword = event => {
    event.preventDefault();
    this.setState({
      shouldRedirectPasswordForgot: true,
      countdown: 10,
    });
  };

  tickCountdown = () => {
    this.setState(prevState => ({
      countdown: prevState.countdown - 1,
    }));
  };

  closeRedirectDialog = () => {
    clearInterval(this.interval);
    this.setState({
      showRedirectDialog: false,
      shouldRedirectPasswordForgot: false,
      countdown: 10,
    });
  };

  render = () => (
    <PublicPageContainer>
      <LoginBox>
        {this.renderForgotPasswordModal()}

        <form
          onSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          method="post"
          className={styles.form}
        >
          {this.renderErrorMessage()}
          <fieldset className={styles.fieldset}>
            <legend className={styles.title}>
              <Title>
                <FormattedMessage {...messages.title} />
              </Title>
            </legend>

            <label className={styles.label} htmlFor="email">
              <FormattedMessage {...messages.email} />
            </label>
            <input
              className={styles['input-text']}
              type="text"
              name="email"
              ref={node => {
                this.email = node;
              }}
              onKeyDown={this.handleKeyPress}
            />

            <label className={styles.label} htmlFor="password">
              <FormattedMessage {...messages.password} />
            </label>
            <input
              className={styles['input-text']}
              type="password"
              name="password"
              onKeyDown={this.handleKeyPress}
            />

            <PrimaryButton
              label={
                this.state.loading
                  ? this.props.intl.formatMessage(messages.validating)
                  : this.props.intl.formatMessage(messages.signin)
              }
              onClick={this.handleSubmit}
            />

            <a
              className={classnames(styles['forgot-pw'], {
                [styles.disabled]: this.state.loading,
              })}
              data-track-component="ForgotPassword"
              data-track-event="click"
              onClick={event =>
                !this.state.loading
                  ? this.redirectToForgotPassword(event)
                  : null
              }
            >
              <FormattedMessage {...messages.forgotPassword} />
            </a>
          </fieldset>
        </form>
      </LoginBox>
    </PublicPageContainer>
  );
}

export default compose(
  withRouter,
  injectIntl,
  injectConfiguration(['adminCenterUrl'], 'adminCenterUrl'),
  withProps({
    requestAccessToken: payload => client.tokens.create(payload),
  })
)(Login);
