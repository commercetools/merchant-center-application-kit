import { lifecycle, compose } from 'recompose';
import snakeCase from 'lodash.snakecase';
import oneLineTrim from 'common-tags/lib/oneLineTrim';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { injectConfiguration } from '@commercetools-frontend/application-shell-connectors';
import convertToClosestMs from './conversions';

const MeasureFirstPaint = () => null;
MeasureFirstPaint.displayName = 'MeasureFirstPaint';

const metricSummariesEndpoint = '/proxy/mc-metrics/metrics/summaries';

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

export default compose(
  injectConfiguration(['mcApiUrl'], 'mcApiUrl'),
  lifecycle({
    componentDidMount() {
      // We are using the Performance API, since registering `paint`
      // on the `PerformanceObserver` doesn't give us the startTimes that we need
      // if we follow the pattern of initiating the `PerformanceObserver` upon mount
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
      }).catch(error => {
        reportErrorToSentry(new Error('Unable to push first-paint metrics'), {
          extra: error,
        });
      });
    },
  })
)(MeasureFirstPaint);
