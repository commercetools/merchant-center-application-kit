import { actions as sdkActions } from '@commercetools-frontend/sdk';

// eslint-disable-next-line import/prefer-default-export
export const pushDependencyVersionCounter = ({ payload }) =>
  sdkActions.post({
    uri: '/metrics/counters',
    uriPrefix: '/proxy/mc-metrics',
    payload: JSON.stringify(payload),
  });
