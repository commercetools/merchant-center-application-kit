import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { actions as sdkActions } from '@commercetools-frontend/sdk';
import { Spacings, PrimaryButton } from '@commercetools-frontend/ui-kit';
import { LOGOUT_REASONS } from '@commercetools-frontend/constants';
import * as storage from '@commercetools-frontend/storage';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { Notification } from '@commercetools-frontend/react-notifications';
import InfoDialog from '../../from-core/info-dialog';
import Title from '../../from-core/title';
import { STORAGE_KEYS } from '../../constants';
import PublicPageContainer from '../public-page-container';
import LoginBox from '../login-box';
import styles from './login.mod.css';
import messages from './messages';

const defaultTargetUrl = window.location.origin;

export class Login extends React.PureComponent {
  static displayName = 'Login';

  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        reason: PropTypes.string,
        redirectTo: PropTypes.string,
      }).isRequired,
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
    error: this.props.location.query.reason,
  };

  redirectTo = targetUrl => {
    window.location.replace(targetUrl);
  };

  componentDidMount = () => {
    this.email.focus();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return prevState.error === LOGOUT_REASONS.NO_PROJECTS &&
      !prevState.showRedirectDialog
      ? {
          showRedirectDialog: true,
          countdown: 10,
        }
      : null;
  }

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
      .then(() => {
        this.setState({ loading: false });
        // Set a flag to indicate that the user has been authenticated
        storage.put(STORAGE_KEYS.IS_AUTHENTICATED, true);
        // Ensure to remove the IdP Url value from local storage, as in this
        // case login is not done through SSO.
        storage.remove(STORAGE_KEYS.LOGIN_STRATEGY);
        // Redirect to a `redirectTo` url, if present, otherwise to defaul route
        const nextTargetUrl = this.props.location.query.redirectTo;
        // Inspect the target url to see if the host is one of commercetools
        try {
          const nextTargetUrlObject = new URL(nextTargetUrl);
          if (nextTargetUrlObject.hostname === window.location.hostname) {
            // We force a browser redirect, to let the proxy server handle
            // the new request URL.
            this.redirectTo(nextTargetUrl);
          } else {
            // If the redirect url does not match the hostname, we discard it and
            // redirect to the root path.
            this.redirectTo(defaultTargetUrl);
          }
        } catch (error) {
          // Fallback to normal redirect, in case the target url cannot be parsed
          this.redirectTo(defaultTargetUrl);
        }
      })
      .catch(error => {
        if (error) {
          // We are sure that the API always return one error in this case,
          // therefore it's safe to access the first error in the list.
          const code = error.errors && error.errors[0] && error.errors[0].code;
          if (code === 'LockedAccount') {
            this.props.history.push('/login/locked');
          } else {
            this.setState({
              loading: false,
              error: LOGOUT_REASONS.INVALID,
            });
          }
        }
      });
  };

  handleInputChange = event => {
    const {
      target: { name, value },
    } = event;
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
            <Spacings.Stack scale="m">
              <legend className={styles.title}>
                <Title>
                  <FormattedMessage {...messages.title} />
                </Title>
              </legend>

              <Spacings.Stack scale="m">
                <Spacings.Stack scale="s">
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
                </Spacings.Stack>
                <Spacings.Stack scale="s">
                  <label className={styles.label} htmlFor="password">
                    <FormattedMessage {...messages.password} />
                  </label>
                  <input
                    className={styles['input-text']}
                    type="password"
                    name="password"
                    onKeyDown={this.handleKeyPress}
                  />
                </Spacings.Stack>
              </Spacings.Stack>

              <div>
                <PrimaryButton
                  label={
                    this.state.loading
                      ? this.props.intl.formatMessage(messages.validating)
                      : this.props.intl.formatMessage(messages.signin)
                  }
                  onClick={this.handleSubmit}
                />
              </div>

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
            </Spacings.Stack>
          </fieldset>
        </form>
      </LoginBox>
    </PublicPageContainer>
  );
}

const mapDispatchToProps = dispatch => ({
  requestAccessToken: payload =>
    dispatch(sdkActions.post({ uri: `/tokens`, payload })),
});

export default compose(
  injectIntl,
  withApplicationContext(({ environment }) => ({
    adminCenterUrl: environment.adminCenterUrl,
  })),
  connect(
    null,
    mapDispatchToProps
  )
)(Login);
