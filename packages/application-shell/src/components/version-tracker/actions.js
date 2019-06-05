import { actions as sdkActions } from '@commercetools-frontend/sdk';

// eslint-disable-next-line import/prefer-default-export
export const pushVersionCounter = ({ payload }) =>
  sdkActions.post({
    uri: '/proxy/mc-metrics/metrics/counters',
    payload: JSON.stringify(payload),
  });
