import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import * as sdkActions from '@commercetools-local/sdk/actions';
import { connect } from 'react-redux';
import { injectConfiguration } from '@commercetools-local/core/components/configuration';

export class VersionCheckSubscriber extends React.PureComponent {
  static displayName = 'VersionCheckSubscriber';

  static propTypes = {
    clientVersion: PropTypes.string,
    fetchServerVersion: PropTypes.func,
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'development')
      this.poll = setInterval(() => {
        this.props.fetchServerVersion().then(
          data => {
            if (data.revision !== this.props.clientVersion)
              // TODO: notify the user that a new version is available
              // Possible options:
              // - show a notification message (global/sidebar)
              // - have a "special" icon in the `TopNavigation` that indicates
              //   a new version is available (e.g. like Chrome does)
              // eslint-disable-next-line no-console
              console.info(
                'VersionCheckSubscriber: New version available, please reload the page'
              );
          },
          error => {
            // eslint-disable-next-line no-console
            console.warn(
              'VersionCheckSubscriber: Could not fetch version.',
              error
            );
          }
        );
      }, 1000 * 60); // 1min
  }

  componentWillUnmount() {
    if (process.env.NODE_ENV !== 'development') clearInterval(this.poll);
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchServerVersion: () => dispatch(sdkActions.get({ uri: '/version' })),
});

export default compose(
  setDisplayName('VersionCheckSubscriber'),
  injectConfiguration(['revision'], 'clientVersion'),
  connect(null, mapDispatchToProps)
)(VersionCheckSubscriber);
