import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Perfume from 'perfume.js';
import snakeCase from 'lodash/snakeCase';
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
  metricValue: convertToClosestMs(paintMeasurement.durationMs),
  metricLabels: labels,
});

/**
 * NOTE:
 *   Perfume has to be created before the component is created.
 *   Otherwise it fails to emit its metircs.
 */
const perfume = new Perfume({
  logging: false,
  firstContentfulPaint: true,
  firstPaint: true,
  timeToInteractive: true,
});

export class MeasureFirstPaint extends React.Component {
  static displayName = 'MeasureFirstPaint';
  static propTypes = {
    application: PropTypes.string.isRequired,
    projectKey: PropTypes.string,
    children: PropTypes.node,
    // connect
    userAgent: PropTypes.string.isRequired,
    pushMetricHistogram: PropTypes.func.isRequired,
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
  // NOTE: The tracker is assigned so others can
  // use it from the outside.
  static tracker = perfume;
  componentDidMount() {
    /**
     * NOTE:
     *   Time to Interactive is an async value emitted by a Promise
     *   on Perfume. Once resolved all other values are statically
     *   available.
     */
    perfume.observeTimeToInteractive.then(timeToInteractiveMs => {
      const paintMetrics = [
        {
          name: 'firstPaint',
          durationMs: MeasureFirstPaint.tracker.firstPaintDuration,
        },
        {
          name: 'firstContentfulPaint',
          durationMs: MeasureFirstPaint.tracker.firstContentfulPaintDuration,
        },
        {
          name: 'timeToInteractive',
          durationMs: timeToInteractiveMs,
        },
      ]
        .filter(paintMeasurement => Boolean(paintMeasurement.durationMs))
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
        this.props.pushMetricHistogram({ payload: paintMetrics }).catch(() => {
          // Error is ignored under the assumption that page is being
          // reloaded whilst the request was being sent or network request was interrupted
        });
      }
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
  pushMetricHistogram: actions.pushMetricHistogram,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasureFirstPaint);
