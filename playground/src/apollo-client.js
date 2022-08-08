import { RestLink } from 'apollo-link-rest';
import { createApolloClient } from '@commercetools-frontend/application-shell';
import { applyTransformedLocalizedStrings } from '@commercetools-frontend/l10n';

const restLink = new RestLink({
  uri: window.app.mcApiUrl,
  // https://www.apollographql.com/docs/react/api/link/apollo-link-rest/#response-transforming
  responseTransformer: async (response, typeName) => {
    const data = await response.json();

    switch (typeName) {
      case 'StateQueryResult':
        return {
          ...data,
          results: data.results.map((state) =>
            applyTransformedLocalizedStrings(state, [
              {
                from: 'name',
                to: 'nameAllLocales',
              },
            ])
          ),
        };
      default:
        return data;
    }
  },
});

const configureApollo = () => createApolloClient({ restLink });

export default configureApollo;
