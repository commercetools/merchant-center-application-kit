import { fireEvent, render, screen } from '@testing-library/react';
import * as sdkActions from '../../actions';
import type { Props } from './sdk-get';
import { SdkGet } from './sdk-get';

const createTestProps = (custom: Partial<Props> = {}) => ({
  dispatch: jest.fn(() => Promise.resolve({})),
  actionCreator: () => sdkActions.get({ uri: '/foo/bar' }),
  actionCreatorArgs: [],
  shouldRefetch: () => false,
  onSuccess: jest.fn(),
  onError: jest.fn(),
  render: jest.fn(),
  ...custom,
});

describe('rendering', () => {
  it('should fetch data and render it', async () => {
    const props = createTestProps();
    render(
      <SdkGet
        {...props}
        dispatch={() => Promise.resolve({ status: 'ok' })}
        render={({ isLoading, result, error }) => {
          if (isLoading) return <div>Loading ...</div>;
          if (error) return <div>Error: {error}</div>;
          return <div>{JSON.stringify(result)}</div>;
        }}
      />
    );
    await screen.findByText(JSON.stringify({ status: 'ok' }));
  });
});
describe('rendering with error', () => {
  it('should fetch data and render error message', async () => {
    const props = createTestProps();
    render(
      <SdkGet
        {...props}
        dispatch={() => Promise.reject({ message: 'oops' })}
        render={({ isLoading, result, error }) => {
          if (isLoading) return <div>Loading ...</div>;
          if (error) return <div>Error: {error.message}</div>;
          return <div>{JSON.stringify(result)}</div>;
        }}
      />
    );
    await screen.findByText(`Error: oops`);
  });
});
describe('rendering and refetching', () => {
  let count = 1;
  it('should fetch data and render it', async () => {
    const props = createTestProps();
    render(
      <SdkGet
        {...props}
        dispatch={() => Promise.resolve({ count })}
        render={({ isLoading, result, error, refresh }) => {
          if (isLoading) return <div>Loading ...</div>;
          if (error) return <div>Error: {error}</div>;
          return (
            <div>
              <div>{JSON.stringify(result)}</div>;
              <button
                onClick={() => {
                  count += 1;
                  refresh();
                }}
              >
                Refresh
              </button>
            </div>
          );
        }}
      />
    );
    await screen.findByText(JSON.stringify({ count: 1 }));
    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
    await screen.findByText(JSON.stringify({ count: 2 }));
  });
});
