import React from 'react';
import { shallow } from 'enzyme';
import { _setData } from '@commercetools-local/utils/storage';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import InjectProjectLocale, {
  getSelectedDataLocale,
  defaultDataLocale,
} from './inject-project-locale';

jest.mock('@commercetools-local/utils/storage');

describe('rendering', () => {
  let enhancedComponentWrapper;
  let localeKey;
  let selectedLocale;
  describe('with default locale key', () => {
    beforeEach(() => {
      selectedLocale = 'de';
      _setData({ [CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE]: selectedLocale });
      const BaseComponent = () => <div>{'test'}</div>;
      BaseComponent.displayName = 'BaseComponent';
      const EnhancedComponent = InjectProjectLocale()(() => <BaseComponent />);
      enhancedComponentWrapper = shallow(<EnhancedComponent />);
    });
    describe('InjectProjectLocale', () => {
      it('should have pass selected locale as the prop `language`', () => {
        expect(enhancedComponentWrapper).toHaveProp('language', selectedLocale);
      });
    });
  });
  describe('with provided locale key', () => {
    beforeEach(() => {
      selectedLocale = 'it';
      localeKey = 'locale';
      _setData({ [CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE]: selectedLocale });
      const BaseComponent = () => <div>{'test'}</div>;
      BaseComponent.displayName = 'BaseComponent';
      const EnhancedComponent = InjectProjectLocale(localeKey)(() => (
        <BaseComponent />
      ));
      enhancedComponentWrapper = shallow(<EnhancedComponent />);
    });
    describe('InjectProjectLocale', () => {
      it('should have pass selected locale as the passed localeKey', () => {
        expect(enhancedComponentWrapper).toHaveProp(localeKey, selectedLocale);
      });
    });
  });
});

describe('helpers', () => {
  describe('getSelectedDataLocale', () => {
    let selectedLocale;
    describe('with a locale is available on `localestorage`', () => {
      beforeEach(() => {
        selectedLocale = 'de';
        _setData({ [CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE]: selectedLocale });
      });
      it('should get selected locale', () => {
        expect(getSelectedDataLocale()).toBe(selectedLocale);
      });
    });
    describe('with no locale available on `localestorage`', () => {
      beforeEach(() => {
        _setData({});
      });
      it('should default to the default locale', () => {
        expect(getSelectedDataLocale()).toBe(defaultDataLocale);
      });
    });
  });
});
