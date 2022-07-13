import { createApolloClient } from '@commercetools-frontend/application-shell';
import { renderAppWithRedux } from '@commercetools-frontend/application-shell/test-utils';

renderAppWithRedux({
  apolloClient: createApolloClient(),
  // ...
});
