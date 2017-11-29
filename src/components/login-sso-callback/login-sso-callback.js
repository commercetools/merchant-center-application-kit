import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import jwtDecode from 'jwt-decode';
import * as storage from '@commercetools-local/utils/storage';
import client from '@commercetools-local/utils/node-sdk';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import withParsedLocation from '../with-parsed-location';
import ApplicationLoader from '../application-loader';
import FailedAuthentication from '../failed-authentication';

export class LoginSSOCallback extends React.PureComponent {
  static displayName = 'LoginSSOCallback';
  static propTypes = {
    locationParams: PropTypes.shape({
      id_token: PropTypes.string.isRequired,
      organizationId: PropTypes.string.isRequired,
    }).isRequired,
    redirectTo: PropTypes.func.isRequired,
    requestAccessToken: PropTypes.func.isRequired,
  };

  state = {
    hasAuthenticationFailed: false,
  };

  componentDidMount() {
    const idToken = this.props.locationParams.id_token;
    const decodedIdToken = jwtDecode(idToken);
    const nonce = storage.get(CORE_STORAGE_KEYS.NONCE);
    storage.remove(CORE_STORAGE_KEYS.NONCE);

    if (decodedIdToken.nonce !== nonce) {
      this.setAuthenticationFailed(true);
    } else {
      this.props
        .requestAccessToken({
          idToken,
          organization: this.props.locationParams.organizationId,
        })
        .then(payload => {
          storage.put(CORE_STORAGE_KEYS.TOKEN, payload.body.token);
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
      <ApplicationLoader />
    );
  }
}

export default compose(
  withParsedLocation,
  withProps(() => ({
    requestAccessToken: payload => client.tokens.create(payload),
    redirectTo: target => window.location.replace(target),
  }))
)(LoginSSOCallback);
