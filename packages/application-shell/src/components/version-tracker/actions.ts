import { actions as sdkActions, Json } from '@commercetools-frontend/sdk';
import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';

// eslint-disable-next-line import/prefer-default-export
export const pushDependencyVersionCounter = ({
  payload,
}: {
  payload: Json[];
}) =>
  sdkActions.post({
    uri: '/metrics/counters',
    mcApiProxyTarget: MC_API_PROXY_TARGETS.MC_METRICS,
    payload: JSON.stringify(payload),
  });
