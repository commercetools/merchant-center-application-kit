import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import qs from 'query-string';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import * as storage from '@commercetools-local/storage';
import * as sdkActions from '@commercetools-frontend/sdk/actions';
import { STORAGE_KEYS } from '../../constants';
import ApplicationLoader from '../application-loader';
import FailedAuthentication from '../failed-authentication';

export class LoginSSOCallback extends React.PureComponent {
  static displayName = 'LoginSSOCallback';
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        organizationId: PropTypes.string.isRequired,
      }).isRequired,
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
    const nonce = storage.get(STORAGE_KEYS.NONCE);
    storage.remove(STORAGE_KEYS.NONCE);

    if (decodedIdToken.nonce !== nonce) {
      this.setAuthenticationFailed(true);
    } else {
      this.props
        .requestAccessToken({
          idToken,
          organization: this.props.location.query.organizationId,
        })
        .then(payload => {
          // Set a flag to indicate that the user has been authenticated
          storage.put(STORAGE_KEYS.IS_AUTHENTICATED, true);
          // Store the IdP Url, useful for redirecting logic on logout.
          storage.put(
            STORAGE_KEYS.IDENTITY_PROVIDER_URL,
            payload.identityProviderUrl
          );

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

const mapDispatchToProps = dispatch => ({
  requestAccessToken: payload =>
    dispatch(sdkActions.post({ uri: `/tokens`, payload })),
});

export default compose(
  withProps(() => ({ redirectTo: target => window.location.replace(target) })),
  connect(
    null,
    mapDispatchToProps
  )
)(LoginSSOCallback);
