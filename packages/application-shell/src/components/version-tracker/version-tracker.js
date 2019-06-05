import React from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import { connect } from 'react-redux';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import applicationShellVersion from '../../version';
import pkg from '../../../package.json';
import * as actions from './actions';

const createVersionMetric = ({ applicationName }) => ({
  metricName: 'versions',
  metricLabels: {
    application: applicationName || 'unknown',
    package_name: pkg.name,
    package_version: applicationShellVersion,
  },
});

export class VersionTracker extends React.Component {
  static displayName = 'VersionTracker';
  static propTypes = {
    // withApplicationContext
    applicationName: PropTypes.string.isRequired,
    children: PropTypes.node,
    // connect
    userAgent: PropTypes.string.isRequired,
    pushVersionCounter: PropTypes.func.isRequired,
  };
  static defaultProps = {
    /**
     * NOTE:
     *   In the e.g. application-account runs out of a `projectKey` context.
     *   In order to not have `"undefined"` in our Prometheus metrics we
     *   send an empty string whenever no `projectKey` is passed.
     */
    projectKey: '',
  };
  componentDidMount() {
    this.props
      .pushVersionCounter({
        payload: createVersionMetric({
          applicationName: this.props.applicationName,
        }),
      })
      .catch(() => {
        // Error is ignored under the assumption that page is being
        // reloaded whilst the request was being sent or network request was interrupted
      });
  }
  render() {
    return this.props.children;
  }
}

const mapStateToProps = () => ({
  userAgent: window.navigator.userAgent,
});
const mapDispatchToProps = {
  pushVersionCounter: actions.pushVersionCounter,
};
export default flowRight(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withApplicationContext(({ environment }) => ({
    applicationName: environment.applicationName,
  }))
)(VersionTracker);
