import { MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import type { Json } from '@commercetools-frontend/sdk';

import { actions as sdkActions } from '@commercetools-frontend/sdk';

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
