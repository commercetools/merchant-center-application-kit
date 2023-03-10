import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { STORAGE_KEYS } from '../../constants';
import { useMcQuery } from '../../hooks/apollo-hooks';
import type {
  TAmILoggedInQuery,
  TAmILoggedInQueryVariables,
} from '../../types/generated/mc';
import AmILoggedInQuery from './authenticated.mc.graphql';

type RenderFnArgs = { isAuthenticated: boolean };
type Props = {
  render: (args: RenderFnArgs) => JSX.Element;
  children?: never;
};

const AmILoggedIn = (props: Props) => {
  // ...otherwise, we ping a "secured" endpoint in the MC API to see if there is
  // a valid access token. If we get an error, we assume that the user is not
  // authenticated. If we don't get any error, the access token sent with the cookie
  // is valid. We return null while the query is loading.
  const { data, loading, error } = useMcQuery<
    TAmILoggedInQuery,
    TAmILoggedInQueryVariables
  >(AmILoggedInQuery, {
    context: {
      target: GRAPHQL_TARGETS.MERCHANT_CENTER_BACKEND,
      skipTokenRetry: true,
    },
    // NOTE: With `no-cache` the `useQuery` will not trigger a
    // re-render of the `AmILoggedIn` component. Relying on a default
    // fetch policy results in rendering the component without refetching the data
    // which as a result unmounts child components (such as an application).
    //
    // For example:
    // Given the user not authenticated
    // Then the first pass of useQuery returns an exptected error
    // Given the query is triggered again (through `useQuery`)
    // Then the component will re-render
    // Resulting in inconsistent data with the error not being defined
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (!data) {
        // In case the request is 200 but there is no data, we assume
        // there are some errors.
        window.localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
      } else {
        // Even though the login page might set this flag, we just make sure that
        // we do it here as well. This will help in the future when we eventually
        // move the auth service to itw own domain, in which case the local storage
        // is not shared anymore.
        window.localStorage.setItem(
          STORAGE_KEYS.IS_AUTHENTICATED,
          String(true)
        );
      }
    },
    onError: () => {
      // The query fails without the `mcAccessToken`. In this case the caching
      // needs to be unset as otherwise the application will end up in a infinte
      // redirect loop.
      window.localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
    },
  });
  if (error) {
    // No matter what error, we consider it as a failed authentication
    return <>{props.render({ isAuthenticated: false })}</>;
  }
  if (!loading && data && data.amILoggedIn) {
    return <>{props.render({ isAuthenticated: true })}</>;
  }
  return null;
};
AmILoggedIn.displayName = 'AmILoggedIn';

export default AmILoggedIn;
