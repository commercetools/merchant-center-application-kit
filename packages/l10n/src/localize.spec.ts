import {
  transformLocalizedFieldToLocalizedString,
  applyTransformedLocalizedFields,
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
