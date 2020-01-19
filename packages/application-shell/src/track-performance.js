import Perfume from 'perfume.js';
import { trackTiming } from './utils/gtm';

const trackPerformance = () => {
  new Perfume({
    logging: false,
    dataConsumption: true,
    largestContentfulPaint: true,
    analyticsTracker: ({ metricName, data, duration }) => {
      switch (metricName) {
        case 'firstPaint':
        case 'firstContentfulPaint':
        case 'firstInputDelay':
        case 'largestContentfulPaint': {
          trackTiming({
            category: 'Loading Performance',
            variable: metricName,
            value: duration,
          });
          break;
        }
        // Navigation Timing collects performance metrics for the life and
        // timings of a network request.
        case 'navigationTiming': {
          trackTiming({
            category: 'Navigation Timing',
            variable: metricName,
            value: data.fetchTime,
            label: 'Fetch time',
          });
          trackTiming({
            category: 'Navigation Timing',
            variable: metricName,
            value: data.timeToFirstByte,
            label: 'Time To First Byte',
          });
          trackTiming({
            category: 'Navigation Timing',
            variable: metricName,
            value: data.dnsLookupTime,
            label: 'DSN lookup time',
          });
          trackTiming({
            category: 'Navigation Timing',
            variable: metricName,
            value: data.totalTime,
            label: 'Total time',
          });
          break;
        }
        // Resource Timing collects performance metrics for document-dependent resources.
        // Stuff like style sheets, scripts, images, et cetera. Perfume helps expose all
        // PerformanceResourceTiming entries and group data data consumption by Kb used.
        // https://zizzamia.github.io/perfume/#/resource-timing/
        case 'dataConsumption': {
          trackTiming({
            category: 'Resource Timing',
            variable: metricName,
            value: data.css,
            label: 'CSS',
          });
          trackTiming({
            category: 'Resource Timing',
            variable: metricName,
            value: data.script,
            label: 'Script',
          });
          trackTiming({
            category: 'Resource Timing',
            variable: metricName,
            value: data.script,
            label: 'Total ',
          });
          break;
        }
        default:
          break;
      }
    },
  });
};

export default trackPerformance();
