import fetch from 'unfetch';
import React from 'react';
import PropTypes from 'prop-types';
import snakeCase from 'lodash.snakecase';
import { oneLine, oneLineTrim } from 'common-tags';
import { injectConfiguration } from '../../../../application-shell-connectors/src';
import { reportErrorToSentry } from '../../../../sentry';
import convertToClosestMs from './conversions';

const transformPaintToMcMetrics = ({ paintMetric, labels }) => ({
  metricName: oneLineTrim`
    browser
    _duration
    _${snakeCase(paintMetric.name)}
    _milliseconds
  `,
  metricValue: convertToClosestMs(paintMetric.startTime),
  metricLabels: labels,
});

const metricSummariesEndpoint = '/proxy/mc-metrics/metrics/summaries';

class MeasureFirstPaint extends React.Component {
  static displayName = 'MeasureFirstPaint';
  static propTypes = {
    applicationLabel: PropTypes.string.isRequired,
    mcApiUrl: PropTypes.string.isRequired,
  };
  componentDidMount() {
    // We are using the Performance API, since registering `paint`
    // on the `PerformanceObserver` doesn't give us the startTimes that we need
    // in a timely fashion..
    const convertedMetrics = performance
      .getEntriesByType('paint')
      .map(paintMetric =>
        transformPaintToMcMetrics({
          paintMetric,
          labels: { application: this.props.applicationLabel },
        })
      );

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    fetch(`${this.props.mcApiUrl}${metricSummariesEndpoint}`, {
      method: 'POST',
      body: JSON.stringify(convertedMetrics),
      credentials: 'include',
      headers,
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
    return null;
  }
}

export default injectConfiguration(['mcApiUrl'], 'mcApiUrl')(MeasureFirstPaint);
