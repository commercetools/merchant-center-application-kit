import {
  transformLocalizedFieldToLocalizedString,
  applyTransformedLocalizedFields,
  localize,
} from './localize';

describe('applyTransformedLocalizedFields', () => {
  describe('when entity contains list of locale fields', () => {
    it('should inject localized string object field and remove outdated key', () => {
      expect(
        applyTransformedLocalizedFields(
          {
            id: '1',
            nameAllLocales: [
              { locale: 'en', value: 'CD' },
              { locale: 'de', value: 'CD' },
            ],
          },
          [{ from: 'nameAllLocales', to: 'name' }]
        )
      ).toEqual({ id: '1', name: { en: 'CD', de: 'CD' } });
    });
  });
  describe('when entity does not contain list of locale fields', () => {
    it('should inject localized string object field as null and remove outdated key', () => {
      expect(
        applyTransformedLocalizedFields({ id: '1' }, [
          { from: 'nameAllLocales', to: 'name' },
        ])
      ).toEqual({ id: '1', name: null });
    });
  });

  describe('when array of locale fields is empty', () => {
    it('should not change entity shape', () => {
      expect(
        applyTransformedLocalizedFields({ id: '1', version: 2 }, [])
      ).toEqual({ id: '1', version: 2 });
    });
  });
});

describe('transformLocalizedFieldToLocalizedString', () => {
  describe('when array is not defined', () => {
    it('should return null', () => {
      expect(transformLocalizedFieldToLocalizedString()).toBe(null);
    });
  });
  describe('when array is empty', () => {
    it('should return null', () => {
      expect(transformLocalizedFieldToLocalizedString([])).toBe(null);
    });
  });
  describe('when array is defined', () => {
    it('should return LocalizedString object', () => {
      expect(
        transformLocalizedFieldToLocalizedString([
          { locale: 'en', value: 'Hello' },
          { locale: 'it', value: 'Ciao' },
        ])
      ).toEqual({ en: 'Hello', it: 'Ciao' });
    });
  });
});

describe('localize', () => {
  describe('when entity was not provided', () => {
    it('should return empty string', () => {
      expect(
        localize({
          locale: 'en',
          key: 'name',
          obj: undefined,
        })
      ).toBe('');
    });
  });
  describe('when entity does not have requested localized string', () => {
    it('should return empty string', () => {
      expect(
        localize({
          obj: { name: undefined },
          locale: 'en',
          key: 'name',
        })
      ).toBe('');
    });
  });
  describe('when localized string does not have any translations', () => {
    it('should return default fallback value', () => {
      expect(
        localize({
          obj: {
            localizedStringKey: {
              en: '',
            },
          },
          key: 'localizedStringKey',
          locale: 'de',
        })
      ).toBe('');
    });
    it('should return custom fallback value', () => {
      expect(
        localize({
          obj: {
            localizedStringKey: {
              en: '',
            },
          },
          key: 'localizedStringKey',
          locale: 'de',
          fallback: 'custom fallback',
        })
      ).toBe('custom fallback');
    });
  });

  describe('when localized string has prefered locale', () => {
    it('should return translation', () => {
      expect(
        localize({
          obj: {
            localizedStringKey: {
              'de-AT': 'a translation',
            },
          },
          key: 'localizedStringKey',
          locale: 'de-AT',
        })
      ).toBe('a translation');
    });
  });

  describe('when localized sring has primary locale matching preferred (extended) langauge', () => {
    it('should return translation', () => {
      expect(
        localize({
          obj: {
            localizedStringKey: {
              de: 'a primary translation',
            },
          },
          locale: 'de-AT',
          key: 'localizedStringKey',
        })
      ).toBe('a primary translation');
    });
  });

  describe('when preferred locale was not provided', () => {
    it('should fallback to the first locale according to fallback order', () => {
      expect(
        localize({
          obj: {
            localizedStringKey: {
              ru: '',
              fr: 'fr translation',
              en: 'en translation',
              it: 'it translation',
            },
          },
          key: 'localizedStringKey',
          // @ts-ignore
          locale: undefined,
          fallbackOrder: ['it', 'fr'],
        })
      ).toBe('it translation (IT)');
    });
  });

  describe('when localized string does not have locales related to preferred locale', () => {
    it('should fallback to the first non-empty locale', () => {
      expect(
        localize({
          obj: {
            localizedStringKey: {
              ru: '',
              fr: 'fr translation',
              en: 'en translation',
              it: 'it translation',
            },
          },
          key: 'localizedStringKey',
          locale: 'jp',
        })
      ).toBe('fr translation (FR)');
    });
  });

  describe('when localized string has locale from provided desired fallback locales order', () => {
    it('should return first non-empty translation', () => {
      expect(
        localize({
          obj: {
            localizedStringKey: {
              ru: '',
              fr: 'fr translation',
              en: 'en translation',
              it: 'it translation',
            },
          },
          key: 'localizedStringKey',
          fallbackOrder: ['ru', 'it'],
          locale: 'de-AT',
        })
      ).toBe('it translation (IT)');
    });
  });

  describe('when localized string is missing locales from provided desired fallback locales order', () => {
    it('should fallback to first present locale', () => {
      expect(
        localize({
          obj: {
            localizedStringKey: {
              ru: '',
              fr: 'fr translation',
              en: 'en translation',
              it: 'it translation',
            },
          },
          key: 'localizedStringKey',
          locale: 'de-AT',
          fallbackOrder: ['ru', 'pl'],
        })
      ).toBe('fr translation (FR)');
    });
  });
});
