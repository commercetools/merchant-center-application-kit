import {
  createApolloContextForProxyForwardTo,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';

const useExternalApiFetcher = () => {
  // Assuming that the `custom-application-config.json` contains the custom value:
  // `{ additionalEnv: { externalApiUrl: 'https://my-custom-app.com/graphql'} }`
  const externalApiUrl = useApplicationContext(
    (context) => context.environment.externalApiUrl
  );
  const { loading, data, error } = useMcQuery(MyQuery, {
    context: createApolloContextForProxyForwardTo({
      // The URL to your external API
      uri: externalApiUrl,
      // Optionally pass custom HTTP headers
      headers: {
        'x-foo': 'bar',
      },
      // Optionally define the audience policy
      audiencePolicy: 'forward-url-full-path',
    }),
  });

  return {
    loading,
    data,
    error,
  };
};
