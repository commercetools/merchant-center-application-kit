import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import qs from 'query-string';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { localStorage, sessionStorage } from '@commercetools-frontend/storage';
import { actions as sdkActions } from '@commercetools-frontend/sdk';
import { STORAGE_KEYS } from '../../constants';
import ApplicationLoader from '../application-loader';
import FailedAuthentication from '../failed-authentication';

const loadSessionState = key => {
  const sessionState = sessionStorage.get(key);
  if (sessionState) {
    try {
      return JSON.parse(sessionState);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `Cannot parse session state for "${key}".\n${sessionState}`
        );
      }
    }
  }
  return null;
};

export class LoginSSOCallback extends React.PureComponent {
  static displayName = 'LoginSSOCallback';
  static propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
    }).isRequired,
    redirectTo: PropTypes.func.isRequired,
    requestAccessToken: PropTypes.func.isRequired,
  };

  state = {
    hasAuthenticationFailed: false,
  };

  componentDidMount() {
    const fragments = qs.parse(this.props.location.hash.substring(1));
    const idToken = fragments.id_token;
    const decodedIdToken = jwtDecode(idToken);
    // Validate the nonce.
    // By trying to load the related session state, we can implicitly check if
    // the nonce is correct or not.
    const nonceKey = `${STORAGE_KEYS.NONCE}_${decodedIdToken.nonce}`;
    const sessionState = loadSessionState(nonceKey);
    // Clear the nonce, we don't need it anymore
    sessionStorage.remove(nonceKey);

    if (!sessionState) {
      this.setAuthenticationFailed(true);
    } else {
      this.props
        .requestAccessToken({
          idToken,
          organizationId: sessionState.organizationId,
        })
        .then(payload => {
          // Set a flag to indicate that the user has been authenticated
          localStorage.put(STORAGE_KEYS.IS_AUTHENTICATED, true);
          // Store the IdP Url, useful for redirecting logic on logout.
          localStorage.put(STORAGE_KEYS.LOGIN_STRATEGY, payload.loginStrategy);

          this.props.redirectTo('/');
        })
        .catch(() => {
          this.setAuthenticationFailed(true);
        });
    }
  }

  setAuthenticationFailed = hasAuthenticationFailed => {
    this.setState({ hasAuthenticationFailed });
  };

  render() {
    return this.state.hasAuthenticationFailed ? (
      <FailedAuthentication />
    ) : (
      <ApplicationLoader showLogo={true} />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  requestAccessToken: payload =>
    dispatch(sdkActions.post({ uri: `/tokens/sso`, payload })),
});

export default compose(
  withProps(() => ({ redirectTo: target => window.location.replace(target) })),
  connect(
    null,
    mapDispatchToProps
  )
)(LoginSSOCallback);
