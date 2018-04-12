import React from 'react';
import { shallow } from 'enzyme';
import { STORAGE_KEYS as CORE_STORAGE_KEYS } from '@commercetools-local/constants';
import * as storage from '@commercetools-local/utils/storage';
import ProjectDataLocale from './project-data-locale';

jest.mock('@commercetools-local/utils/storage');

const createTestProps = props => ({
  locales: null,
  children: jest.fn(() => <div />),
  ...props,
});

describe('rendering', () => {
  let props;
  let wrapper;

  describe('when list of locales is not defined', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ProjectDataLocale {...props} />);
    });
    it('should render <SetProjectDataLocale> with locale "en"', () => {
      expect(wrapper.find('SetProjectDataLocale')).toHaveProp('locale', 'en');
    });
    it('should call render function with default locale "en"', () => {
      expect(props.children).toHaveBeenCalledWith(
        expect.objectContaining({ locale: 'en' })
      );
    });
    it('should call render function with setter function', () => {
      expect(props.children).toHaveBeenCalledWith(
        expect.objectContaining({
          setProjectDataLocale: wrapper.instance().handleSetProjectDataLocale,
        })
      );
    });
  });

  describe('when list of locales is defined', () => {
    describe('when locale is not cached yet', () => {
      beforeEach(() => {
        props = createTestProps();
        wrapper = shallow(<ProjectDataLocale {...props} />);
        wrapper.setProps({ locales: ['it', 'de'] });
      });
      it('should render <SetProjectDataLocale> with locale "it"', () => {
        expect(wrapper.find('SetProjectDataLocale')).toHaveProp('locale', 'it');
      });
      it('should call render function with first locale from the list', () => {
        expect(props.children).toHaveBeenCalledWith(
          expect.objectContaining({ locale: 'it' })
        );
      });
    });
    describe('when locale has been already cached', () => {
      beforeEach(() => {
        storage.put(CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE, 'de');
        props = createTestProps();
        wrapper = shallow(<ProjectDataLocale {...props} />);
        wrapper.setProps({ locales: ['it', 'de'] });
      });
      it('should render <SetProjectDataLocale> with locale "de"', () => {
        expect(wrapper.find('SetProjectDataLocale')).toHaveProp('locale', 'de');
      });
      it('should call render function with the locale from the cache', () => {
        expect(props.children).toHaveBeenCalledWith(
          expect.objectContaining({ locale: 'de' })
        );
      });
    });
    describe('when cached locale is not listed in the project locales', () => {
      beforeEach(() => {
        storage.put(CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE, 'de');
        props = createTestProps();
        wrapper = shallow(<ProjectDataLocale {...props} />);
        wrapper.setProps({ locales: ['it', 'en'] });
      });
      it('should render <SetProjectDataLocale> with locale "it"', () => {
        expect(wrapper.find('SetProjectDataLocale')).toHaveProp('locale', 'it');
      });
      it('should call render function with first locale from the list', () => {
        expect(props.children).toHaveBeenCalledWith(
          expect.objectContaining({ locale: 'it' })
        );
      });
    });
  });
});

describe('interactions', () => {
  let props;
  let wrapper;
  describe('updating the project data locale', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ProjectDataLocale {...props} />);
      wrapper.instance().handleSetProjectDataLocale('de');
    });
    it('should update the state with the new locale', () => {
      expect(wrapper).toHaveState('locale', 'de');
    });
  });
});
