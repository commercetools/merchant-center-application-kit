import { createRequestBuilder } from '@commercetools/api-request-builder';
import { actions as sdkActions } from '@commercetools-frontend/sdk';
import { actionTypes } from '../../reducers/cache';

export const setStateMachines = payload => ({
  type: actionTypes.SET_STATE_MACHINES,
  payload,
});

export const getStateMachinesUri = (options, meta) => {
  const requestBuilder = createRequestBuilder({ projectKey: meta.projectKey });
  const service = requestBuilder.states;
  service.page(options.page).perPage(options.perPage);
  return service.build();
};

export const fetchStateMachines = (requestOptions, meta) =>
  sdkActions.get({
    service: 'states',
    uri: getStateMachinesUri(requestOptions, meta),
  });
