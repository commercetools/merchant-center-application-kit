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
  withProjectExtensionImageRegex,
  TImageRegexContext,
} from './project-extension-image-regex';
import FetchProjectExtensionImageRegex from './fetch-project-extension-image-regex.settings.graphql';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import type { ComponentType } from 'react';

jest.mock('@commercetools-frontend/sentry');

type TBasicTestComponentProps = {
  imageRegexData: TImageRegexContext;
};

const BasicTestComponent = (props: TBasicTestComponentProps) => {
  const { imageRegex } = useProjectExtensionImageRegex();
  if (props.imageRegexData.isLoading) {
    return <div>{'Loading...'}</div>;
  }
  if (!props.imageRegexData.imageRegex) {
    return <div>{'Not found'}</div>;
  }
  return (
    <>
      <div>{imageRegex?.small?.replace}</div>
      <div>{imageRegex?.thumb?.replace}</div>
    </>
  );
};

const HookTestComponent = () => {
  const imageRegexData = useProjectExtensionImageRegex();
  return <BasicTestComponent imageRegexData={imageRegexData} />;
};

const WrappedTestComponent =
  withProjectExtensionImageRegex<TBasicTestComponentProps>()(
    BasicTestComponent
  ) as ComponentType<unknown>;

const RenderPropTestComponent = () => {
  return (
    <GetProjectExtensionImageRegex
      render={(imageRegexData) => (
        <BasicTestComponent imageRegexData={imageRegexData} />
      )}
    />
  );
};

const renderTestComponent = ({
  Component,
  mocks,
  skipQuery = false,
  includeProvider = true,
}: {
  Component: ComponentType<unknown>;
  mocks: ReadonlyArray<MockedResponse>;
  skipQuery?: boolean;
  includeProvider?: boolean;
}) => {
  if (!includeProvider) {
    return render(<Component />);
  }
  return render(
    <ApolloMockProvider mocks={mocks} addTypename={true}>
      <ProjectExtensionProviderForImageRegex skip={skipQuery}>
        <Component />
      </ProjectExtensionProviderForImageRegex>
    </ApolloMockProvider>
  );
};

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe.each([
  [HookTestComponent],
  [WrappedTestComponent],
  [RenderPropTestComponent],
])('rendering #%#', (Component) => {
  describe('when image regex is defined', () => {
    it('should render regex info', async () => {
      renderTestComponent({
        Component,
        mocks: [
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
        ],
      });
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
      expect(screen.getByText('-thumb.jpg')).toBeInTheDocument();
    });
  });
  describe('when image regex is not defined', () => {
    it('should not render regex info', async () => {
      renderTestComponent({
        Component,
        mocks: [
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
        ],
      });
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
  describe('when fetching regex settings is skipped', () => {
    it('should not render regex info', () => {
      renderTestComponent({ Component, mocks: [], skipQuery: true });
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
  describe('when context provider is not defined', () => {
    it('should not render regex info', () => {
      renderTestComponent({ Component, mocks: [], includeProvider: false });
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });
});
