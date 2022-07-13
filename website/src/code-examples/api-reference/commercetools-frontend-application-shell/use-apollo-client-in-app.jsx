import {
  createApolloClient,
  ApplicationShell,
} from '@commercetools-frontend/application-shell';

const apolloClient = createApolloClient({
  cache: {
    // Your custom configuration, according to the Apollo cache documentation.
    // https://www.apollographql.com/docs/react/caching/cache-configuration/
  },
});

const EntryPoint = () => {
  return (
    <ApplicationShell
      apolloClient={apolloClient}
      // ...other props
    />
  );
};
