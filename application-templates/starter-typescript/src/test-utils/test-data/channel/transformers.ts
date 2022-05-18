import { Transformer, buildField } from '@commercetools-test-data/core';
import type {
  TChannel,
  TChannelGraphql,
} from '@commercetools-test-data/channel/dist/declarations/src/types';

const transformers = {
  default: Transformer<TChannel, TChannelGraphql>('default', {
    buildFields: ['name', 'description', 'address'],
  }),
  rest: Transformer<TChannel, TChannelGraphql>('rest', {
    buildFields: ['name', 'description', 'address'],
  }),
  graphql: Transformer<TChannel, TChannelGraphql>('graphql', {
    replaceFields: ({ fields }) => {
      const name =
        fields.name &&
        buildField(fields.name, 'default', {
          fieldToBuild: 'name',
        }).en;
      const nameAllLocales = (fields.name &&
        buildField(fields.name, 'graphql', {
          fieldToBuild: 'name',
        })) as TChannelGraphql['nameAllLocales'];

      return {
        ...fields,
        name,
        nameAllLocales,
        createdAt: fields.createdAt,
        createdBy: fields.createdBy as TChannelGraphql['createdBy'],
        lastModifiedAt: fields.lastModifiedAt,
        lastModifiedBy:
          fields.lastModifiedBy as TChannelGraphql['lastModifiedBy'],
        __typename: 'Channel',
      };
    },
  }),
};

export default transformers;
