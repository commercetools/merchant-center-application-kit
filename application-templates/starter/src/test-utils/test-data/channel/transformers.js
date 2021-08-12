import { Transformer, buildField } from '@commercetools-test-data/core';

const transformers = {
  default: Transformer('default', {
    buildFields: ['name', 'description', 'address'],
  }),
  rest: Transformer('rest', {
    buildFields: ['name', 'description', 'address'],
  }),
  graphql: Transformer('graphql', {
    replaceFields: ({ fields }) => {
      const name =
        fields.name &&
        buildField(fields.name, 'default', {
          fieldToBuild: 'name',
        }).en;
      const nameAllLocales =
        fields.name &&
        buildField(fields.name, 'graphql', {
          fieldToBuild: 'name',
        });
      const address =
        fields.address &&
        buildField(fields.address, 'graphql', {
          fieldToBuild: 'address',
        });

      return {
        ...fields,
        name,
        nameAllLocales,
        address,
        createdAt: fields.createdAt?.toISOString(),
        lastModifiedAt: fields.lastModifiedAt?.toISOString(),
        __typename: 'Channel',
      };
    },
  }),
};

export default transformers;
