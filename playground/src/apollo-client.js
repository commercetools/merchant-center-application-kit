import omit from 'lodash/omit';
import { RestLink } from 'apollo-link-rest';
import { createApolloClient } from '@commercetools-frontend/application-shell';
import { transformLocalizedStringToLocalizedField } from '@commercetools-frontend/l10n';

// TODO: move to `l10n` package.
const applyTransformedLocalizedStrings = (
  objectWithLocalizedStrings,
  fieldNames
) => {
  const transformedFieldDefinitions = fieldNames.reduce(
    (nextTransformed, fieldName) => ({
      ...nextTransformed,
      [fieldName.to]: transformLocalizedStringToLocalizedField(
        objectWithLocalizedStrings[fieldName.from]
      ),
    }),
    {}
  );
  const namesToOmit = fieldNames.map((fieldName) => fieldName.from);
  const objectWithouLocalizedFields = omit(
    objectWithLocalizedStrings,
    namesToOmit
  );
  return {
    ...objectWithouLocalizedFields,
    ...transformedFieldDefinitions,
  };
};

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
