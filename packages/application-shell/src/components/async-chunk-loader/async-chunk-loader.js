import React from 'react';
import PropTypes from 'prop-types';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import ApplicationLoader from '../application-loader';
import ErrorApologizer from '../error-apologizer';

class AsyncChunkLoader extends React.PureComponent {
  static displayName = 'AsyncChunkLoader';
  static propTypes = {
    // Injected by `react-loadable`
    error: PropTypes.object,
    pastDelay: PropTypes.bool.isRequired,
  };
  componentDidMount() {
    if (this.props.error) reportErrorToSentry(this.props.error, {});
  }
  componentDidUpdate(prevProps) {
    if (prevProps.error !== this.props.error)
      reportErrorToSentry(this.props.error, {});
  }
  render() {
    if (this.props.error) return <ErrorApologizer />;
    // To avoid "Flashing of loading component"
    // https://github.com/jamiebuilds/react-loadable#avoiding-flash-of-loading-component
    if (this.props.pastDelay) return <ApplicationLoader />;
    return null;
  }
}

export default AsyncChunkLoader;
