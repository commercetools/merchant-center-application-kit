import { createRequestBuilder } from '@commercetools/api-request-builder';
import { actions as sdkActions } from '@commercetools-frontend/sdk';

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
