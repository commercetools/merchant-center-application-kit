import Perfume from 'perfume.js';
import { trackTiming } from './utils/gtm';

type TPerfumeNavigationTiming = {
  fetchTime: number;
  workerTime: number;
  totalTime: number;
  downloadTime: number;
  timeToFirstByte: number;
  headerSize: number;
  dnsLookupTime: number;
};
type TPerfumeDataConsumption = {
  beacon: number;
  css: number;
  fetch: number;
  img: number;
  other: number;
  script: number;
  total: number;
  xmlhttprequest: number;
};

// https://github.com/Zizzamia/perfume.js#quick-start
const mapMetricToLabel = (metricName: string) => {
  switch (metricName) {
    case 'storageEstimate':
      return 'storageEstimate';
    case 'fp':
      return 'firstPaint';
    case 'fcp':
      return 'firstContentfulPaint';
    case 'fid':
      return 'firstInputDelay';
    case 'lcp':
      return 'largestContentfulPaint';
    case 'lcpFinal':
      return 'largestContentfulPaintFinal';
    case 'cls':
      return 'cumulativeLayoutShift';
    case 'clsFinal':
      return 'cumulativeLayoutShiftFinal';
    case 'tbt':
      return 'totalBlockingTime';
    case 'tbt5S':
      return 'totalBlockingTime5S';
    case 'tbt10S':
      return 'totalBlockingTime10S';
    case 'tbtFinal':
      return 'totalBlockingTimeFinal';
    default:
      return metricName;
  }
};

const trackPerformance = () => {
  new Perfume({
    analyticsTracker: ({ metricName, data }) => {
      switch (metricName) {
        case 'fp':
        case 'fcp':
        case 'fid':
        case 'lcp':
        case 'lcpFinal':
        case 'cls':
        case 'clsFinal':
        case 'tbt':
        case 'tbt10S':
        case 'tbtFinal': {
          const paintValue = data;
          trackTiming({
            category: 'Loading Performance',
            variable: mapMetricToLabel(metricName),
            value: paintValue,
          });
          break;
        }
        // Navigation Timing collects performance metrics for the life and
        // timings of a network request.
        case 'navigationTiming': {
          const navigationTiming = data as TPerfumeNavigationTiming;
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
          const dataConsumption = data as TPerfumeDataConsumption;
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
