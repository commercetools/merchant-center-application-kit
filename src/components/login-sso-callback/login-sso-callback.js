import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import jwtDecode from 'jwt-decode';
import * as storage from '@commercetools-local/utils/storage';
import * as sdkActions from '@commercetools-local/sdk/actions';
import { connect } from 'react-redux';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import ApplicationLoader from '../application-loader';
import FailedAuthentication from '../failed-authentication';

export class LoginSSOCallback extends React.PureComponent {
  static displayName = 'LoginSSOCallback';
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.shape({
        organizationId: PropTypes.string.isRequired,
      }).isRequired,
      fragments: PropTypes.shape({
        id_token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    redirectTo: PropTypes.func.isRequired,
    requestAccessToken: PropTypes.func.isRequired,
  };

  state = {
    hasAuthenticationFailed: false,
  };

  componentDidMount() {
    const idToken = this.props.location.fragments.id_token;
    const decodedIdToken = jwtDecode(idToken);
    const nonce = storage.get(CORE_STORAGE_KEYS.NONCE);
    storage.remove(CORE_STORAGE_KEYS.NONCE);

    if (decodedIdToken.nonce !== nonce) {
      this.setAuthenticationFailed(true);
    } else {
      this.props
        .requestAccessToken({
          idToken,
          organization: this.props.location.query.organizationId,
        })
        .then(payload => {
          storage.put(CORE_STORAGE_KEYS.TOKEN, payload.token);
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
  connect(null, mapDispatchToProps)
)(LoginSSOCallback);
