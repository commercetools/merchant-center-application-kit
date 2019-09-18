import React from 'react';
import {
  render,
  RenderResult,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import {
  MockedProvider as ApolloMockProvider,
  MockedProviderProps,
} from '@apollo/react-testing';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import {
  ProjectExtensionProviderForImageRegex,
  GetProjectExtensionImageRegex,
  TImageRegexContext,
} from './project-extension-image-regex';
import FetchProjectExtensionImageRegex from './fetch-project-extension-image-regex.settings.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';

jest.mock('@commercetools-frontend/sentry');

type TestProps = {
  imageRegex: TImageRegexContext['imageRegex'];
};
const TestComponent = (props: TestProps) => (
  <>
    <div>
      {props.imageRegex &&
        props.imageRegex.small &&
        props.imageRegex.small.replace}
    </div>
    <div>
      {props.imageRegex &&
        props.imageRegex.thumb &&
        props.imageRegex.thumb.replace}
    </div>
  </>
);

const renderComponent = (mocks: MockedProviderProps['mocks']) =>
  render(
    <ApolloMockProvider mocks={mocks} addTypename={true}>
      <ProjectExtensionProviderForImageRegex>
        <div>
          <GetProjectExtensionImageRegex
            render={imageRegexContext => {
              if (imageRegexContext.isLoading) {
                return <div>{'Loading...'}</div>;
              }
              if (!imageRegexContext.imageRegex) {
                return <div>{'Not found'}</div>;
              }
              return (
                <TestComponent imageRegex={imageRegexContext.imageRegex} />
              );
            }}
          />
        </div>
      </ProjectExtensionProviderForImageRegex>
    </ApolloMockProvider>
  );

describe('rendering', () => {
  let rendered: RenderResult;

  describe('when image regex is defined', () => {
    beforeEach(() => {
      rendered = renderComponent([
        {
          request: {
            query: FetchProjectExtensionImageRegex,
            variables: {
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
    });
    it('should render regex info', async () => {
      await waitForElementToBeRemoved(() => rendered.getByText('Loading...'));
      expect(rendered.queryByText('-thumb.jpg')).toBeInTheDocument();
    });
  });
  describe('when image regex is not defined', () => {
    beforeEach(() => {
      rendered = renderComponent([
        {
          request: {
            query: FetchProjectExtensionImageRegex,
            variables: {
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
    });
    it('should not render regex info', async () => {
      await waitForElementToBeRemoved(() => rendered.getByText('Loading...'));
      expect(rendered.queryByText('Not found')).toBeInTheDocument();
    });
  });
  describe('when request fails', () => {
    beforeEach(() => {
      rendered = renderComponent([
        {
          request: {
            query: FetchProjectExtensionImageRegex,
            variables: {
              target: GRAPHQL_TARGETS.SETTINGS_SERVICE,
            },
          },
          error: new Error('Oops'),
        },
      ]);
    });
    it('should report error to sentry', async () => {
      await waitForElementToBeRemoved(() => rendered.getByText('Loading...'));
      expect(rendered.queryByText('Not found')).toBeInTheDocument();
      expect(reportErrorToSentry).toHaveBeenCalled();
    });
  });
});
