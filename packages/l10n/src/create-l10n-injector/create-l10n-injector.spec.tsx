import { renderHook } from '@testing-library/react-hooks';
import { reportErrorToSentry } from '@commercetools-frontend/sentry';
import { createL10NHook } from './create-l10n-injector';

jest.mock('@commercetools-frontend/sentry');

type Candy = Record<number, string>;
type Candies = Record<string, Candy>;
type Result = {
  isLoading: boolean;
  data?: Candies;
  error?: Error;
};
const candies: Candies = {
  en: {
    1: 'sugar',
    2: 'fruit',
    3: 'gummy-bears',
  },
  de: {
    1: 'zucker',
    2: 'obst',
    3: 'gummibär',
  },
};
const loadLocalesMock = jest.fn((locale: string) =>
  Promise.resolve(candies[locale])
);
const errorLoadingLocalesMock = jest.fn(() =>
  Promise.reject(new Error('Oops'))
);

describe('loading data', () => {
  it('should load data via hook', async () => {
    const useL10n = createL10NHook<Candies>(loadLocalesMock);
    const { result, waitForNextUpdate } = renderHook<unknown, Result>(() =>
      useL10n('en')
    );
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual({});
    expect(result.current.error).not.toBeDefined();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(candies.en);
    expect(result.current.error).not.toBeDefined();
  });
});
describe('error loading data', () => {
  it('should return error and report error to sentry', async () => {
    const useL10n = createL10NHook<Candies>(errorLoadingLocalesMock);
    const { result, waitForNextUpdate } = renderHook<unknown, Result>(() =>
      useL10n('en')
    );
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toEqual({});
    expect(result.current.error).not.toBeDefined();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({});
    expect(result.current.error).toEqual(
      expect.objectContaining({ message: 'Oops' })
    );
    expect(reportErrorToSentry).toHaveBeenCalledWith(new Error('Oops'));
  });
});
