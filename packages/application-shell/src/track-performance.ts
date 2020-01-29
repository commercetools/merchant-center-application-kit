import Perfume, {
  IPerfumeNavigationTiming,
  IPerfumeDataConsumption,
} from 'perfume.js';
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
          const paintValue = duration as number;
          trackTiming({
            category: 'Loading Performance',
            variable: metricName,
            value: paintValue,
          });
          break;
        }
        // Navigation Timing collects performance metrics for the life and
        // timings of a network request.
        case 'navigationTiming': {
          const navigationTiming = data as Required<IPerfumeNavigationTiming>;
          trackTiming({
            category: 'Navigation Timing',
            variable: metricName,
            value: navigationTiming.fetchTime,
            label: 'Fetch time',
          });
          trackTiming({
            category: 'Navigation Timing',
            variable: metricName,
            value: navigationTiming.timeToFirstByte,
            label: 'Time To First Byte',
          });
          trackTiming({
            category: 'Navigation Timing',
            variable: metricName,
            value: navigationTiming.dnsLookupTime,
            label: 'DNS lookup time',
          });
          trackTiming({
            category: 'Navigation Timing',
            variable: metricName,
            value: navigationTiming.totalTime,
            label: 'Total time',
          });
          break;
        }
        // Resource Timing collects performance metrics for document-dependent resources.
        // Stuff like style sheets, scripts, images, et cetera. Perfume helps expose all
        // PerformanceResourceTiming entries and group data data consumption by Kb used.
        // https://zizzamia.github.io/perfume/#/resource-timing/
        case 'dataConsumption': {
          const dataConsumption = data as IPerfumeDataConsumption;
          trackTiming({
            category: 'Resource Timing',
            variable: metricName,
            value: dataConsumption.css,
            label: 'CSS',
          });
          trackTiming({
            category: 'Resource Timing',
            variable: metricName,
            value: dataConsumption.script,
            label: 'Script',
          });
          trackTiming({
            category: 'Resource Timing',
            variable: metricName,
            value: dataConsumption.script,
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
