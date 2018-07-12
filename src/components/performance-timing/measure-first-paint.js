import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import snakeCase from 'lodash.snakecase';
import { oneLineTrim, oneLine } from 'common-tags';
import { injectConfiguration } from '../../../../application-shell-connectors/src';
import { reportErrorToSentry } from '../../../../sentry';
import convertToClosestMs from './conversions';
import pushPaintMetrics from './push-paint-metrics';

const metricSummariesEndpoint = '/proxy/mc-metrics/metrics/summaries';

const transformPaintToMcMetrics = ({ paintMeasurement, labels }) => ({
  metricName: oneLineTrim`
    browser
    _duration
    _${snakeCase(paintMeasurement.name)}
    _milliseconds
  `,
  metricValue: convertToClosestMs(paintMeasurement.startTime),
  metricLabels: labels,
});

class MeasureFirstPaint extends React.Component {
  static displayName = 'MeasureFirstPaint';
  static propTypes = {
    applicationLabel: PropTypes.string.isRequired,
    children: PropTypes.node,
    // Injected
    mcApiUrl: PropTypes.string.isRequired,
    browserPerformanceApi: PropTypes.shape({
      getEntriesByType: PropTypes.func.isRequired,
    }).isRequired,
  };
  componentDidMount() {
    // We are using the Performance API, since registering `paint`
    // on the `PerformanceObserver` doesn't give us the startTimes that we need
    // in a timely fashion..
    const convertedMetrics = this.props.browserPerformanceApi
      .getEntriesByType('paint')
      .map(paintMeasurement =>
        transformPaintToMcMetrics({
          paintMeasurement,
          labels: { application: this.props.applicationLabel },
        })
      );

    pushPaintMetrics({
      url: `${this.props.mcApiUrl}${metricSummariesEndpoint}`,
      paintMetrics: convertedMetrics,
    })
      .then(response => {
        if (response.ok) return;
        // when we have reached this point, we assume that the
        // the payload given to us by the MC-backend is an error payload
        response.text().then(assumedErrorPayload => {
          reportErrorToSentry(
            new Error('Unable to push first-paint metrics.'),
            { extra: assumedErrorPayload }
          );
        });
      })
      .catch(assumedNetworkError => {
        reportErrorToSentry(
          new Error(oneLine`
            Unable to push first-paint metrics.
            Assuming there was network error.
          `),
          {
            extra: assumedNetworkError,
          }
        );
      });
  }
  render() {
    return this.props.children;
  }
}

export default compose(
  injectConfiguration(['mcApiUrl'], 'mcApiUrl'),
  withProps({ browserPerformanceApi: window.performance })
)(MeasureFirstPaint);
