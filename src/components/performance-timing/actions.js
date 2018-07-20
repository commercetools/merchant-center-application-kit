import * as sdkActions from '@commercetools-frontend/sdk/actions';

// eslint-disable-next-line import/prefer-default-export
export const pushMetricHistogram = ({ body }) =>
  sdkActions.post({
    uri: '/proxy/mc-metrics/metrics/histograms',
    payload: body,
  });
