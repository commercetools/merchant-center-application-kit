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
const loadLocalesMock = jest.fn(
  (locale: string, cb: (error?: Error, data?: Candies) => void) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        cb(undefined, candies[locale]);
      }, 10);
    })
);
const errorLoadingLocalesMock = jest.fn(
  (_locale: string, cb: (error?: Error, data?: Candies) => void) =>
    new Promise(reject => {
      setTimeout(() => {
        reject();
        cb(new Error('Oops'));
      }, 10);
    })
);

// https://github.com/testing-library/react-hooks-testing-library/blob/ebf8460716ac59618cffdc16094c534a3ca59ffe/docs/usage/advanced-hooks.md#act-warning
const patchActWarningUntilReactSixteenPointNine = async (
  run: () => Promise<void>
) => {
  const originalError = console.error;
  console.error = jest.fn();
  try {
    await run();
  } finally {
    console.error = originalError;
  }
};

describe('loading data', () => {
  it('should load data via hook', async () =>
    patchActWarningUntilReactSixteenPointNine(async () => {
      const useL10n = createL10NHook<Candies>(loadLocalesMock);
      const { result, waitForNextUpdate } = renderHook<unknown, Result>(() =>
        useL10n('en')
      );
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).not.toBeDefined();
      expect(result.current.error).not.toBeDefined();

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual(candies.en);
      expect(result.current.error).not.toBeDefined();
    }));
});
describe('error loading data', () => {
  it('should return error and report error to sentry', async () =>
    patchActWarningUntilReactSixteenPointNine(async () => {
      const useL10n = createL10NHook<Candies>(errorLoadingLocalesMock);
      const { result, waitForNextUpdate } = renderHook<unknown, Result>(() =>
        useL10n('en')
      );
      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).not.toBeDefined();
      expect(result.current.error).not.toBeDefined();

      await waitForNextUpdate();

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).not.toBeDefined();
      expect(result.current.error).toEqual(
        expect.objectContaining({ message: 'Oops' })
      );
      expect(reportErrorToSentry).toHaveBeenCalledWith(new Error('Oops'));
    }));
});
