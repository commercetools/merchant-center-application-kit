import * as sdkActions from '@commercetools-frontend/sdk/actions';

// eslint-disable-next-line import/prefer-default-export
export const pushMetricSummary = ({ body }) =>
  sdkActions.post({
    uri: '/proxy/mc-metrics/metrics/summaries',
    payload: body,
  });
