import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { FetchProjectExtensionImageRegex } from '../components/project-extension-image-regex/fetch-project-extension-image-regex.settings.graphql';
import type {
  Maybe,
  TFetchProjectExtensionImageRegexQuery,
} from '../types/generated/settings';

export const createGraphqlResponseForProjectExtensionImageRegexQuery = (
  customResponse: Partial<TFetchProjectExtensionImageRegexQuery> = {}
) => ({
  projectExtension: {
    __typename: 'ProjectExtension',
    id: 'project-extension-id',
    imageRegex: {
      __typename: 'ImageRegex',
      thumb: {
        __typename: 'ImageRegexOptions',
        flag: 'gi',
        replace: '-thumb.jpg',
        search: '.[^.]+$',
      },
      small: {
        __typename: 'ImageRegexOptions',
        flag: 'gi',
        replace: '-small.jpg',
        search: '.[^.]+$',
      },
    },
  },
  ...customResponse,
});

export const createFetchProjectExtensionImageRegexMock = (
  customMock: Partial<{
    result: Maybe<{
      data: Maybe<
        ReturnType<
          typeof createGraphqlResponseForProjectExtensionImageRegexQuery
        >
      >;
    }>;
  }> = {}
) => ({
  request: {
    query: FetchProjectExtensionImageRegex,
    context: {
      target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
    },
  },
  result: {
    data: createGraphqlResponseForProjectExtensionImageRegexQuery(),
  },
  ...customMock,
});
