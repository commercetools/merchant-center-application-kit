import type { RenderResult } from '@testing-library/react';
import type { MockedResponse } from '@apollo/client/testing';
import type { TImageRegexContext } from './project-extension-image-regex';

import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { MockedProvider as ApolloMockProvider } from '@apollo/client/testing';
import {
  ProjectExtensionProviderForImageRegex,
  GetProjectExtensionImageRegex,
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
              return (
                <TestComponent imageRegex={imageRegexContext.imageRegex} />
              );
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
          return <TestComponent imageRegex={imageRegexContext.imageRegex} />;
        }}
      />
    </div>
  );

describe('rendering', () => {
  let rendered: RenderResult;

  describe('when image regex is defined', () => {
    beforeEach(() => {
      rendered = renderComponent([
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
    });
    it('should render regex info', async () => {
      await waitForElementToBeRemoved(() => rendered.queryByText('Loading...'));
      expect(rendered.getByText('-thumb.jpg')).toBeInTheDocument();
    });
  });
  describe('when image regex is not defined', () => {
    beforeEach(() => {
      rendered = renderComponent([
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
    });
    it('should not render regex info', async () => {
      await waitForElementToBeRemoved(() => rendered.queryByText('Loading...'));
      expect(rendered.getByText('Not found')).toBeInTheDocument();
    });
  });
  describe('when fetching regex settings is skipped', () => {
    beforeEach(() => {
      rendered = renderComponent([], true);
    });
    it('should not render regex info', () => {
      expect(rendered.getByText('Not found')).toBeInTheDocument();
    });
  });
  describe('when context provider is not defined', () => {
    beforeEach(() => {
      rendered = renderComponentWithoutProvider();
    });
    it('should not render regex info', () => {
      expect(rendered.getByText('Not found')).toBeInTheDocument();
    });
  });
});
