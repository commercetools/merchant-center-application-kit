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
    it('should render <AppShellProviderForProjectDataLocale> with locale "en"', () => {
      expect(wrapper.find('AppShellProviderForProjectDataLocale')).toHaveProp(
        'locale',
        'en'
      );
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
});

describe('lifecycle', () => {
  describe('getDerivedStateFromProps', () => {
    let derivedState;
    let nextProps;
    describe('when list of locales is defined', () => {
      describe('when locale is not cached yet', () => {
        beforeEach(() => {
          nextProps = { locales: ['it', 'de'] };
          derivedState = ProjectDataLocale.getDerivedStateFromProps(
            nextProps,
            {}
          );
        });
        it('should render derive state with locale "it"', () => {
          expect(derivedState).toEqual({ locale: 'it' });
        });
      });
      describe('when locale has been already cached', () => {
        beforeEach(() => {
          storage.put(CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE, 'de');
          nextProps = { locales: ['it', 'de'] };
          derivedState = ProjectDataLocale.getDerivedStateFromProps(
            nextProps,
            {}
          );
        });
        it('should render derive state with locale "de"', () => {
          expect(derivedState).toEqual({ locale: 'de' });
        });
      });
      describe('when cached locale is not listed in the project locales', () => {
        beforeEach(() => {
          storage.put(CORE_STORAGE_KEYS.SELECTED_DATA_LOCALE, 'de');
          nextProps = { locales: ['it', 'de'] };
          derivedState = ProjectDataLocale.getDerivedStateFromProps(
            nextProps,
            {}
          );
        });
        it('should render derive state with locale "de"', () => {
          expect(derivedState).toEqual({ locale: 'de' });
        });
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
