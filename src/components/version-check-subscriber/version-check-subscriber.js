/* global process */
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { http } from '@commercetools-local/utils/node-sdk';
import logger from '@commercetools-local/utils/logger';
import { injectConfiguration } from '@commercetools-local/core/components/configuration';

const makeRequest = (url, callback) => {
  http(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response =>
      response.text().then(responseText => {
        if (response.ok) callback(null, JSON.parse(responseText));
        else callback(responseText);
      })
    )
    .catch(error => {
      callback(error);
    });
};

export class VersionCheckSubscriber extends React.PureComponent {
  static displayName = 'VersionCheckSubscriber';

  static propTypes = {
    clientVersion: PropTypes.string,
    fetchServerVersion: PropTypes.func,
  };

  static defaultProps = {
    // By defining the default value here, we can easily pass a mock function
    // in the tests.
    fetchServerVersion: makeRequest,
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== 'development')
      this.poll = setInterval(() => {
        this.props.fetchServerVersion('/version', (error, data) => {
          if (error) return;
          if (data.revision !== this.props.clientVersion)
            // TODO: notify the user that a new version is available
            // Possible options:
            // - show a notification message (global/sidebar)
            // - have a "special" icon in the `TopNavigation` that indicates
            //   a new version is available (e.g. like Chrome does)
            logger.info('New version available, please reload the page');
        });
      }, 1000 * 60); // 1min
  }

  componentWillUnmount() {
    if (process.env.NODE_ENV !== 'development') clearInterval(this.poll);
  }

  render() {
    return null;
  }
}

export default compose(
  setDisplayName('VersionCheckSubscriber'),
  injectConfiguration(['revision'], 'clientVersion')
)(VersionCheckSubscriber);
