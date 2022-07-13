import {
  createApolloContextForProxyForwardTo,
  useMcQuery,
} from '@commercetools-frontend/application-shell';
import Text from '@commercetools-uikit/text';
import HelloWorldQuery from './hello-world.graphql';

const HelloWorld = () => {
  const { loading, data, error } = useMcQuery<
    THelloWorldQueryData,
    THelloWorldQueryVariables
  >(HelloWorldQuery, {
    context: createApolloContextForProxyForwardTo({
      uri: 'https://my-custom-app.com/graphql',
    }),
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return <Text.Headline as="h1">{data.title}</Text.Headline>;
};
