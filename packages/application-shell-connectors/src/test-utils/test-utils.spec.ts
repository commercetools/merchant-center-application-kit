import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import {
  createFetchProjectExtensionImageRegexMock,
  createGraphqlResponseForProjectExtensionImageRegexQuery,
} from './test-utils';

describe('createFetchProjectExtensionImageRegexMock', () => {
  it('should create mock', () => {
    const mock = createFetchProjectExtensionImageRegexMock({
      result: {
        data: createGraphqlResponseForProjectExtensionImageRegexQuery({
          projectExtension: {
            __typename: 'ProjectExtension',
            id: 'project-extension-id',
            imageRegex: {
              __typename: 'ImageRegex',
              small: {
                __typename: 'ImageRegexOptions',
                flag: 'gi',
                replace: '-small.jpg',
                search: '.[^.]+$',
              },
              thumb: undefined,
            },
          },
        }),
      },
    });
    expect(mock).toEqual(
      expect.objectContaining({
        request: expect.objectContaining({
          context: expect.objectContaining({
            target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
          }),
        }),
        result: {
          data: expect.objectContaining({
            projectExtension: expect.objectContaining({
              imageRegex: expect.objectContaining({
                small: expect.objectContaining({
                  replace: '-small.jpg',
                }),
              }),
            }),
          }),
        },
      })
    );
  });
});
