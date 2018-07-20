import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import snakeCase from 'lodash.snakecase';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import convertToClosestMs from './conversions';
import * as actions from './actions';

const createPaintMetric = ({ paintMeasurement, labels }) => ({
  metricName: [
    'browser',
    'duration',
    snakeCase(paintMeasurement.name),
    'buckets',
    'milliseconds',
  ].join('_'),
  metricValue: convertToClosestMs(paintMeasurement.startTime),
  metricLabels: labels,
});

export class MeasureFirstPaint extends React.Component {
  static displayName = 'MeasureFirstPaint';
  static propTypes = {
    application: PropTypes.string.isRequired,
    projectKey: PropTypes.string.isRequired,
    children: PropTypes.node,
    // connect
    userAgent: PropTypes.string.isRequired,
    pushMetricHistogram: PropTypes.func.isRequired,
    browserPerformanceApi: PropTypes.shape({
      getEntriesByType: PropTypes.func,
    }).isRequired,
  };
  componentDidMount() {
    // NOTE: Early return if performance API is not availble.
    if (!this.props.browserPerformanceApi.getEntriesByType) return;
    // We are using the Performance API, since registering `paint`
    // on the `PerformanceObserver` doesn't give us the startTimes that we need
    // in a timely fashion..
    const paintMetrics = this.props.browserPerformanceApi
      .getEntriesByType('paint')
      .map(paintMeasurement =>
        createPaintMetric({
          paintMeasurement,
          labels: {
            application: this.props.application,
            user_agent: this.props.userAgent,
            project_key: this.props.projectKey,
          },
        })
      );

    if (paintMetrics.length > 0) {
      this.props
        .pushMetricHistogram({ body: JSON.stringify(paintMetrics) })
        .catch(error => {
          reportErrorToSentry(new Error('Unable to push first-paint metrics'), {
            extra: error,
          });
        });
    }
  }
  render() {
    return this.props.children;
  }
}

const mapStateToProps = () => ({
  // We take this chance to inject this global object to make it easier to test.
  // NOTE: We "safely" get the `getEntriesByType` as it might not be available.
  browserPerformanceApi: window.performance,
  userAgent: window.navigator.userAgent,
});
const mapDispatchToProps = {
  pushMetricHistogram: actions.pushMetricHistogram,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasureFirstPaint);
