import {
  transformLocalizedFieldToString,
  injectTransformedLocalizedFields,
} from './localize';

describe('injectTransformedLocalizedFields', () => {
  describe('when entity contains list of locale fields', () => {
    it('should inject localized string object field and remove outdated key', () => {
      expect(
        injectTransformedLocalizedFields(
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
        injectTransformedLocalizedFields({ id: '1' }, [
          { from: 'nameAllLocales', to: 'name' },
        ])
      ).toEqual({ id: '1', name: null });
    });
  });

  describe('when array of locale fields is empty', () => {
    it('should not change entity shape', () => {
      expect(
        injectTransformedLocalizedFields({ id: '1', version: 2 }, [])
      ).toEqual({ id: '1', version: 2 });
    });
  });
});

describe('transformLocalizedFieldToString', () => {
  describe('when array is not defined', () => {
    it('should return null', () => {
      expect(transformLocalizedFieldToString()).toBe(null);
    });
  });
  describe('when array is empty', () => {
    it('should return null', () => {
      expect(transformLocalizedFieldToString([])).toBe(null);
    });
  });
  describe('when array is defined', () => {
    it('should return LocalizedString object', () => {
      expect(
        transformLocalizedFieldToString([
          { locale: 'en', value: 'Hello' },
          { locale: 'it', value: 'Ciao' },
        ])
      ).toEqual({ en: 'Hello', it: 'Ciao' });
    });
  });
});
