import { TMessageTranslationsAsync } from '@commercetools-frontend/i18n/src/async-locale-data/async-locale-data';
import { getMcOrigin, resolveApplicationMessages } from './helpers';

describe.each`
  mcApiUrl                                               | mcUrl                                                   | realMcUrl
  ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc.europe-west1.gcp.commercetools.com'}      | ${'https://mc.europe-west1.gcp.commercetools.com'}
  ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://mc-1234.europe-west1.gcp.commercetools.com'} | ${'https://mc-1234.europe-west1.gcp.commercetools.com'}
  ${'https://mc-api.europe-west1.gcp.commercetools.com'} | ${'https://avengers.app'}                               | ${'https://mc.europe-west1.gcp.commercetools.com'}
`('Get real MC origin if URL is $mcUrl', ({ mcApiUrl, mcUrl, realMcUrl }) => {
  it(`should return real MC URL ${realMcUrl}`, () => {
    expect(
      getMcOrigin(
        mcApiUrl,
        // @ts-ignore: fake `window`-like object
        { location: new URL(mcUrl) }
      )
    ).toBe(realMcUrl);
  });
});

describe('resolveApplicationMessages', () => {
  it('should return provided messages if received', () => {
    const customAppMessages = jest.fn();

    let applicationMessages = resolveApplicationMessages(customAppMessages);
    expect(applicationMessages).toBe(customAppMessages);

    applicationMessages = resolveApplicationMessages(customAppMessages, []);
    expect(applicationMessages).toBe(customAppMessages);

    applicationMessages = resolveApplicationMessages(customAppMessages, [
      'en',
      'de',
    ]);
    expect(applicationMessages).toBe(customAppMessages);
  });

  it('should return default loader if no messages are received and there are available locales', async () => {
    const defaultI18n = { foo: 'baz' };
    const deI18n = { foo: 'bar' };
    const mockLoadError = new Error('i18n load error');
    const mockConsoleWarn = (msg: string) => {
      expect(msg).toEqual(
        expect.stringContaining(
          'Something went wrong while loading the app messages for error'
        )
      );
    };
    jest.mock('../../i18n/data/en.json', () => defaultI18n, { virtual: true });
    jest.mock('../../i18n/data/de.json', () => deI18n, { virtual: true });
    jest.mock(
      '../../i18n/data/error.json',
      () => {
        throw mockLoadError;
      },
      { virtual: true }
    );
    console.warn = jest.fn(mockConsoleWarn);

    const defaultAsyncMessagesLoader = resolveApplicationMessages(undefined, [
      'de',
      'error',
    ]) as TMessageTranslationsAsync;

    let translations = await defaultAsyncMessagesLoader('de');
    expect(translations).toEqual(deI18n);

    translations = await defaultAsyncMessagesLoader('es');
    expect(translations).toEqual(defaultI18n);

    translations = await defaultAsyncMessagesLoader('error');
    expect(translations).toEqual({});
  });

  it('should throw an error if nor messages are received nor locales are available', () => {
    const errorMessage = 'Invalid i18n configuration';

    expect(() => resolveApplicationMessages()).toThrowError(errorMessage);
    expect(() => resolveApplicationMessages(undefined, [])).toThrowError(
      errorMessage
    );
  });
});
