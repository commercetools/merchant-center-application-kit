import { actions as sdkActions } from '@commercetools-frontend/sdk';

export const fetchStateMachine = id =>
  sdkActions.get({
    service: 'states',
    options: { id },
  });
