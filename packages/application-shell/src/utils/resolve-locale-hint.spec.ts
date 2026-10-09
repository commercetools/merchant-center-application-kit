import canPaintShell from './can-paint-shell';
import { writeLastUserLanguage } from './last-user-language';
import resolveLocaleHint from './resolve-locale-hint';

const setBrowserLanguage = (language: string) => {
  Object.defineProperty(window.navigator, 'language', {
    configurable: true,
    value: language,
  });
};

describe('resolveLocaleHint', () => {
  afterEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('maps the browser tag on a first visit', () => {
    setBrowserLanguage('en-US');
    expect(resolveLocaleHint()).toBe('en');
  });

  // `getSupportedLocale` degrades these to `en` because the supported list
  // carries `fr-FR`; mapping directly is what keeps French browsers French.
  it('keeps a French browser on the French catalogue', () => {
    setBrowserLanguage('fr-CA');
    expect(resolveLocaleHint()).toBe('fr-FR');
  });

  it('prefers the remembered language over the browser tag', () => {
    setBrowserLanguage('en-US');
    writeLastUserLanguage('de');
    expect(resolveLocaleHint()).toBe('de');
  });

  // The precision the second load needs: `de-AT` resolves to the `de` message
  // catalogue but to its own moment chunk, so the tag has to survive.
  it('keeps a remembered regional tag intact', () => {
    setBrowserLanguage('en-US');
    writeLastUserLanguage('de-AT');
    expect(resolveLocaleHint()).toBe('de-AT');
  });

  it('falls back to the browser tag when the store throws', () => {
    setBrowserLanguage('de-DE');
    // Swapping the whole object rather than spying on `getItem`: a spy on
    // jsdom's `localStorage` survives both `mockRestore` and
    // `restoreAllMocks`, and a surviving spy returns `undefined` for every
    // key — which looks exactly like an empty store and would quietly make
    // every later case pass for the wrong reason.
    const real = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => {
          throw new Error('blocked');
        },
      },
    });
    try {
      expect(resolveLocaleHint()).toBe('de');
    } finally {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: real,
      });
    }
  });
});

// The point of the whole change: a returning user's hint has to be the locale
// their own language resolves to, or the shell holds the first paint for a
// second catalogue load and the speedup never arrives. Tested as a pair
// because each half looked right on its own while the chain was broken.
describe('a returning user hits the hint', () => {
  // Pinned so these cases cannot accidentally pass off the browser tag.
  beforeEach(() => setBrowserLanguage('en-US'));
  afterEach(() => window.localStorage.clear());

  it.each(['en', 'de', 'es', 'fr-FR', 'pt-BR', 'de-AT', 'en-GB'])(
    'paints immediately for a user whose language is %s',
    (language) => {
      writeLastUserLanguage(language);
      const hint = resolveLocaleHint();

      expect(
        canPaintShell({
          isLoadingLocaleData: false,
          isLoadingUser: false,
          hasPaintedShell: false,
          // `AsyncLocaleData` reports back the locale it was asked for, which
          // on a hit is the hint.
          loadedLocale: hint,
          userLanguage: language,
        })
      ).toBe(true);
    }
  );

  it('holds when the user changed language since the last visit', () => {
    writeLastUserLanguage('de');
    const hint = resolveLocaleHint();

    expect(
      canPaintShell({
        isLoadingLocaleData: false,
        isLoadingUser: false,
        hasPaintedShell: false,
        loadedLocale: hint,
        userLanguage: 'es',
      })
    ).toBe(false);
  });
});
