import type { MockedResponse } from '@apollo/client/testing';

import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MockedProvider as ApolloMockProvider } from '@apollo/client/testing';
import {
  ProjectExtensionProviderForImageRegex,
  GetProjectExtensionImageRegex,
  useProjectExtensionImageRegex,
} from './project-extension-image-regex';
import FetchProjectExtensionImageRegex from './fetch-project-extension-image-regex.settings.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

jest.mock('@commercetools-frontend/sentry');

const TestComponent = () => {
  const { imageRegex } = useProjectExtensionImageRegex();
  return (
    <>
      <div>{imageRegex?.small?.replace}</div>
      <div>{imageRegex?.thumb?.replace}</div>
    </>
  );
};

const renderComponent = (
  mocks: ReadonlyArray<MockedResponse>,
  skipQuery?: boolean
) =>
  render(
    <ApolloMockProvider mocks={mocks} addTypename={true}>
      <ProjectExtensionProviderForImageRegex skip={skipQuery}>
        <div>
          <GetProjectExtensionImageRegex
            render={(imageRegexContext) => {
              if (imageRegexContext.isLoading) {
                return <div>{'Loading...'}</div>;
              }
              if (!imageRegexContext.imageRegex) {
                return <div>{'Not found'}</div>;
              }
              return <TestComponent />;
            }}
          />
        </div>
      </ProjectExtensionProviderForImageRegex>
    </ApolloMockProvider>
  );
const renderComponentWithoutProvider = () =>
  render(
    <div>
      <GetProjectExtensionImageRegex
        render={(imageRegexContext) => {
          if (imageRegexContext.isLoading) {
            return <div>{'Loading...'}</div>;
          }
          if (!imageRegexContext.imageRegex) {
            return <div>{'Not found'}</div>;
          }
          return <TestComponent />;
        }}
      />
    </div>
  );

describe('rendering', () => {
  describe('when image regex is defined', () => {
    it('should render regex info', async () => {
      renderComponent([
        {
          request: {
            query: FetchProjectExtensionImageRegex,
            context: {
              target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
            },
          },
          result: {
            data: {
              projectExtension: {
                __typename: 'ProjectExtension',
                id: 'p1',
                imageRegex: {
                  __typename: 'ImageRegex',
                  thumb: {
                    __typename: 'ImageRegexOptions',
                    flag: 'gi',
                    replace: '-thumb.jpg',
                    search: '.[^.]+$',
                  },
                  small: null,
                },
              },
            },
          },
        },
      ]);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
      expect(screen.getByText('-thumb.jpg')).toBeInTheDocument();
    });
  });
  describe('when image regex is not defined', () => {
    it('should not render regex info', async () => {
      renderComponent([
        {
          request: {
            query: FetchProjectExtensionImageRegex,
            context: {
              target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
            },
          },
          result: {
            data: {
              projectExtension: {
                __typename: 'ProjectExtension',
                id: 'p1',
                imageRegex: null,
              },
            },
          },
        },
      ]);
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
  describe('when fetching regex settings is skipped', () => {
    it('should not render regex info', () => {
      renderComponent([], true);
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
  describe('when context provider is not defined', () => {
    it('should not render regex info', () => {
      renderComponentWithoutProvider();
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
});
