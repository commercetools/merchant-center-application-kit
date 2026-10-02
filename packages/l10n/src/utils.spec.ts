import { getSupportedLocale, mapLocaleToIntlLocale } from './utils';

describe('mapLocaleToIntlLocale', () => {
  it.each([
    ['de', 'de'],
    ['de-AT', 'de'],
    ['de-CH', 'de'],
    ['es', 'es'],
    ['es-MX', 'es'],
    ['fr', 'fr-FR'],
    ['fr-FR', 'fr-FR'],
    ['fr-CA', 'fr-FR'],
    ['fr-BE', 'fr-FR'],
    ['pt-BR', 'pt-BR'],
    ['en', 'en'],
    ['en-US', 'en'],
  ])('collapses %s to the %s catalogue', (input, expected) => {
    expect(mapLocaleToIntlLocale(input)).toBe(expected);
  });

  it.each([
    // No `pt` catalogue other than Brazilian, so European Portuguese falls
    // back rather than loading strings for the wrong variant.
    ['pt-PT', 'en'],
    ['ja', 'en'],
  ])('falls %s back to en', (input, expected) => {
    expect(mapLocaleToIntlLocale(input)).toBe(expected);
  });
});

describe('getSupportedLocale', () => {
  // Pins a trap rather than desired behaviour. The check is
  // `locale.startsWith(supportedLocale)` and the supported list carries
  // `fr-FR`, so every French tag except `fr-FR` itself fails it. Anything
  // choosing a translation catalogue must map the raw tag through
  // `mapLocaleToIntlLocale` instead of mapping this function's output, or
  // French users silently get English.
  it.each(['fr', 'fr-CA', 'fr-CH', 'fr-BE'])(
    'degrades %s to the default locale',
    (input) => {
      expect(getSupportedLocale(input)).toBe('en');
    }
  );

  it('keeps fr-FR, which is the one French tag in the supported list', () => {
    expect(getSupportedLocale('fr-FR')).toBe('fr-FR');
  });

  it.each(['de', 'de-AT', 'es-MX'])(
    'keeps %s, whose language tag is in the list bare',
    (input) => {
      expect(getSupportedLocale(input)).toBe(input);
    }
  );
});
