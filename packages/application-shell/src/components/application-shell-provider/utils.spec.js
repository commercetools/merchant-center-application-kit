import { getBrowserLocale } from './utils';

describe('getBrowserLocale', () => {
  let testWindow;
  describe('when the locale is supported by the MC', () => {
    beforeEach(() => {
      testWindow = {
        navigator: {
          language: 'de-DE',
        },
      };
    });
    it('should return the locale', () => {
      expect(getBrowserLocale(testWindow)).toBe('de-DE');
    });
  });
  describe('when locale is not supported by the MC', () => {
    beforeEach(() => {
      testWindow = {
        navigator: {
          language: 'hu',
        },
      };
    });
    it('should return the default locale, `en`', () => {
      expect(getBrowserLocale(testWindow)).toBe('en');
    });
  });
});
