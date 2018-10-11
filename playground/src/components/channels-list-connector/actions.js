import { createRequestBuilder } from '@commercetools/api-request-builder';
import * as sdkActions from '@commercetools-frontend/sdk/actions';

export const getChannelsUri = (options, meta) => {
  const requestBuilder = createRequestBuilder({ projectKey: meta.projectKey });
  const service = requestBuilder.productProjectionsSearch;
  service.page(options.page).perPage(options.perPage);
  return service.build();
};

export const fetchChannels = (requestOptions, meta) =>
  sdkActions.get({
    service: 'channels',
    uri: getChannelsUri(requestOptions, meta),
  });
