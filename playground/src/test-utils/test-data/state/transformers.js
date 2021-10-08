import { Transformer, buildField } from '@commercetools-test-data/core';

const transformers = {
  default: Transformer('default', {
    buildFields: ['name', 'description'],
  }),
  rest: Transformer('rest', {
    buildFields: ['name', 'description'],
  }),
  graphql: Transformer('graphql', {
    replaceFields: ({ fields }) => {
      const name =
        (fields.name &&
          buildField(fields.name, 'default', {
            fieldToBuild: 'name',
          }).en) ??
        null;
      const nameAllLocales =
        fields.name &&
        buildField(fields.name, 'graphql', {
          fieldToBuild: 'name',
        });
      const description =
        (fields.description &&
          buildField(fields.description, 'default', {
            fieldToBuild: 'description',
          }).en) ??
        null;
      const descriptionAllLocales =
        fields.description &&
        buildField(fields.description, 'graphql', {
          fieldToBuild: 'description',
        });
      return {
        ...fields,
        name,
        nameAllLocales,
        description,
        descriptionAllLocales,
        __typename: 'State',
      };
    },
  }),
};

export default transformers;
