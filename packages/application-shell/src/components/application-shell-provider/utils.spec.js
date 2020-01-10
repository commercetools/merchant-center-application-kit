import { getBrowserLocale } from './utils';

describe('getBrowserLocale', () => {
  describe('when the locale is supported by the MC', () => {
    it('should return the locale', () => {
      expect(getBrowserLocale({ navigator: { language: 'de-DE' } })).toBe(
        'de-DE'
      );
    });
  });
  describe('when locale is not supported by the MC', () => {
    it('should return the default locale, `en`', () => {
      expect(getBrowserLocale({ navigator: { language: 'hu' } })).toBe('en');
    });
  });
});
