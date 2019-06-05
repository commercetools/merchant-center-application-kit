import React from 'react';
import PropTypes from 'prop-types';
import flowRight from 'lodash/flowRight';
import { connect } from 'react-redux';
import { withApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import applicationShellVersion from '../../version';
import * as actions from './actions';

const createVersionMetric = ({ applicationName }) => ({
  metricName: 'versions',
  metricLabels: {
    application: applicationName || 'unknown',
    package_name: '@commercetools-frontend/application-shell',
    package_version: applicationShellVersion,
  },
});

export class VersionTracker extends React.Component {
  static displayName = 'VersionTracker';
  static propTypes = {
    // withApplicationContext
    applicationName: PropTypes.string.isRequired,
    // connect
    pushVersionCounter: PropTypes.func.isRequired,
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
    return null;
  }
}
const mapDispatchToProps = {
  pushVersionCounter: actions.pushVersionCounter,
};
export default flowRight(
  connect(
    null,
    mapDispatchToProps
  ),
  withApplicationContext(({ environment }) => ({
    applicationName: environment.applicationName,
  }))
)(VersionTracker);
