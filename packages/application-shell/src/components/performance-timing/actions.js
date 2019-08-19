import { actions as sdkActions } from '@commercetools-frontend/sdk';

// eslint-disable-next-line import/prefer-default-export
export const pushMetricHistogram = ({ payload }) =>
  sdkActions.post({
    uri: '/metrics/histograms',
    uriPrefix: '/proxy/mc-metrics',
    payload: JSON.stringify(payload),
  });
