import { actions as sdkActions } from '@commercetools-frontend/sdk';

export const fetchStateMachine = id =>
  sdkActions.get({
    uriPrefix: '/proxy/ctp',
    service: 'states',
    options: { id },
  });
