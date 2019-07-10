import React from 'react';
import { shallow } from 'enzyme';
import { windowMocks } from '../../test-utils';
import { STORAGE_KEYS } from '../../constants';
import ProjectDataLocale from './project-data-locale';

const createTestProps = props => ({
  locales: null,
  children: jest.fn(() => <div />),
  ...props,
});

beforeEach(() => {
  windowMocks.localStorage();
});

describe('rendering', () => {
  let props;
  let wrapper;

  describe('when list of locales is not defined', () => {
    beforeEach(() => {
      props = createTestProps();
      wrapper = shallow(<ProjectDataLocale {...props} />);
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
          expect(derivedState).toEqual(
            expect.objectContaining({ locale: 'it' })
          );
        });
        it('should render derive state with locales', () => {
          expect(derivedState).toEqual(
            expect.objectContaining({ locales: nextProps.locales })
          );
        });
      });
      describe('when locale has been already cached', () => {
        beforeEach(() => {
          window.localStorage.getItem.mockReturnValue('de');
          nextProps = { locales: ['it', 'de'] };
          derivedState = ProjectDataLocale.getDerivedStateFromProps(
            nextProps,
            {}
          );
        });
        it('should render derive state with locale "de"', () => {
          expect(derivedState).toEqual(
            expect.objectContaining({ locale: 'de' })
          );
        });
        it('should render derive state with locales', () => {
          expect(derivedState).toEqual(
            expect.objectContaining({ locales: nextProps.locales })
          );
        });
      });
      describe('when cached locale is not listed in the project locales', () => {
        beforeEach(() => {
          window.localStorage.setItem(STORAGE_KEYS.SELECTED_DATA_LOCALE, 'de');
          nextProps = { locales: ['it', 'de'] };
          derivedState = ProjectDataLocale.getDerivedStateFromProps(
            nextProps,
            {}
          );
        });
        it('should render derive state with locale "de"', () => {
          expect(derivedState).toEqual(
            expect.objectContaining({ locale: 'de' })
          );
        });
        it('should render derive state with locales', () => {
          expect(derivedState).toEqual(
            expect.objectContaining({ locales: nextProps.locales })
          );
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
