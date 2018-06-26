import { lifecycle, compose } from 'recompose';
import snakeCase from 'lodash.snakecase';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { injectConfiguration } from '@commercetools-frontend/application-shell-connectors';
import { convertToClosestMs } from './conversions';

const BaseComponent = () => null;
BaseComponent.displayName = 'FirstPaintMeasurement';

const metricSummariesEndpoint = '/proxy/mc-metrics/metrics/summaries';

export default compose(
  injectConfiguration(['mcApiUrl'], 'mcApiUrl'),
  lifecycle({
    componentDidMount() {
      // We are using the Performance API, since registering `paint`
      // on the `PerformanceObserver` doesn't give us the startTimes that we need
      // if we follow the pattern of initiating the `PerformanceObserver` upon mount
      const paintMetrics = performance.getEntriesByType('paint');
      const convertedMetrics = paintMetrics.map(paintMetric => ({
        metricName: `mc_frontend_ms_${snakeCase(paintMetric.name)}`,
        metricValue: convertToClosestMs(paintMetric.startTime),
      }));
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
)(BaseComponent);
