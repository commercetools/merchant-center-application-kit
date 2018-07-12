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
    'milliseconds',
  ].join('_'),
  metricValue: convertToClosestMs(paintMeasurement.startTime),
  metricLabels: labels,
});

class MeasureFirstPaint extends React.Component {
  static displayName = 'MeasureFirstPaint';
  static propTypes = {
    applicationLabel: PropTypes.string.isRequired,
    children: PropTypes.node,
    // Injected
    pushMetricSummary: PropTypes.func.isRequired,
    browserPerformanceApi: PropTypes.shape({
      getEntriesByType: PropTypes.func.isRequired,
    }).isRequired,
  };
  componentDidMount() {
    // We are using the Performance API, since registering `paint`
    // on the `PerformanceObserver` doesn't give us the startTimes that we need
    // in a timely fashion..
    const paintMetrics = this.props.browserPerformanceApi
      .getEntriesByType('paint')
      .map(paintMeasurement =>
        createPaintMetric({
          paintMeasurement,
          labels: { application: this.props.applicationLabel },
        })
      );

    this.props.pushMetricSummary({ body: paintMetrics }).catch(error => {
      reportErrorToSentry(new Error('Unable to push first-paint metrics'), {
        extra: error,
      });
    });
  }
  render() {
    return this.props.children;
  }
}

const mapStateToProps = () => ({
  // We take this chance to inject this global object
  // to make it easier to test.
  browserPerformanceApi: window.performance,
});
const mapDispatchToProps = {
  pushMetricSummary: actions.pushMetricSummary,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasureFirstPaint);
